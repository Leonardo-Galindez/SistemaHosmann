<?php
require_once '../../conection-bd.php'; // conexión PDO

// === CONFIGURACIÓN DEL CORREO (cuenta cPanel) ===
$hostname = '{mail.smartform.com.ar:993/imap/ssl}INBOX';
$username = 'prueba@smartform.com.ar';
$password = 'Prueba-55*';

// === CONFIGURACIÓN FTP ===
$ftp_host = "smartform.com.ar";
$ftp_user = "smartform";
$ftp_pass = "nfsf858-2761";
$ftp_path = "/public_html/hosmann/SistemaHosmann/server/backend/modules/uploads/";

try {
    $inbox = imap_open($hostname, $username, $password);
    if (!$inbox) {
        exit;
    }

    $emails = imap_search($inbox, 'UNSEEN');
    if (!$emails) {
        imap_close($inbox);
        exit;
    }

    foreach ($emails as $email_number) {
        $overview = imap_fetch_overview($inbox, $email_number, 0)[0];
        $subject = imap_utf8($overview->subject ?? '');
        $from = $overview->from ?? '';

        // Validar remitente
        if (stripos($from, 'notificaciones@smartform.com.ar') === false) {
            imap_setflag_full($inbox, $email_number, "\\Seen");
            continue;
        }

        // Extraer ID del asunto (ejemplo: "Parte Diario Hosmann - 17552")
        if (!preg_match('/Hosmann\s*-\s*(\d{2,})/', $subject, $matches)) {
            imap_setflag_full($inbox, $email_number, "\\Seen");
            continue;
        }
        $idRespuesta = $matches[1];

        // Buscar adjuntos
        $structure = imap_fetchstructure($inbox, $email_number);
        $attachments = [];

        if (isset($structure->parts) && count($structure->parts)) {
            for ($i = 0; $i < count($structure->parts); $i++) {
                $part = $structure->parts[$i];
                if (isset($part->disposition) && strtolower($part->disposition) === 'attachment') {
                    $data = imap_fetchbody($inbox, $email_number, $i + 1);
                    if ($part->encoding == 3) $data = base64_decode($data);
                    elseif ($part->encoding == 4) $data = quoted_printable_decode($data);

                    $attachments[] = $data;
                }
            }
        }

        if (empty($attachments)) {
            imap_setflag_full($inbox, $email_number, "\\Seen");
            continue;
        }

        // Subir adjuntos al FTP
        $conn = ftp_ssl_connect($ftp_host);
        if (!$conn) exit;

        if (!ftp_login($conn, $ftp_user, $ftp_pass)) exit;
        ftp_pasv($conn, true);

        $nombreArchivo = "ParteDiario-" . $idRespuesta . ".pdf";
        $tempPath = sys_get_temp_dir() . '/' . $nombreArchivo;
        file_put_contents($tempPath, $attachments[0]);

        $remotePath = $ftp_path . $nombreArchivo;
        if (ftp_put($conn, $remotePath, $tempPath, FTP_BINARY)) {
            $stmt = $pdo->prepare("UPDATE parte SET pdf = :pdf WHERE idRespuesta = :idRespuesta");
            $stmt->execute([
                ':pdf' => $nombreArchivo,
                ':idRespuesta' => $idRespuesta
            ]);
        }

        unlink($tempPath);
        ftp_close($conn);
        imap_setflag_full($inbox, $email_number, "\\Seen");
    }

    imap_close($inbox);

} catch (Exception $e) {
    // Silencioso: no guarda logs ni imprime errores
    exit;
}
?>
