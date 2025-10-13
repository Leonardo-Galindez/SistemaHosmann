<?php
require_once '../conection-bd.php'; // conexión PDO

// === CONFIGURACIÓN DEL CORREO ===
$hostname = '{imap.gmail.com:993/imap/ssl}INBOX';
$username = 'leonardo.galindez@est.fi.uncoma.edu.ar';
$password = '44237998';

// === CONFIGURACIÓN FTP (subida al hosting cPanel) ===
$ftp_host = "smartform.com.ar";
$ftp_user = "smartform";
$ftp_pass = "nfsf858-2761";
$ftp_path = "/public_html/hosmann/SistemaHosmann/server/backend/modules/uploads/"; // ruta destino

try {
    $inbox = imap_open($hostname, $username, $password) or die('❌ No se pudo conectar al correo Gmail.');

    // Buscar correos no leídos
    $emails = imap_search($inbox, 'UNSEEN');
    if (!$emails) {
        echo "No hay correos nuevos.\n";
        imap_close($inbox);
        exit;
    }

    foreach ($emails as $email_number) {
        $overview = imap_fetch_overview($inbox, $email_number, 0)[0];
        $subject = imap_utf8($overview->subject ?? '');
        $from = $overview->from ?? '';

        // Solo procesar si proviene de notificaciones@smartform.com.ar
        if (stripos($from, 'notificaciones@smartform.com.ar') === false) {
            echo "Correo ignorado: remitente no autorizado ($from)\n";
            imap_setflag_full($inbox, $email_number, "\\Seen");
            continue;
        }

        // Buscar número idRespuesta en el asunto
        if (!preg_match('/\b(\d{2,})\b/', $subject, $matches)) {
            echo "Asunto sin ID válido: $subject\n";
            imap_setflag_full($inbox, $email_number, "\\Seen");
            continue;
        }
        $idRespuesta = $matches[1];
        echo "Correo válido (idRespuesta: $idRespuesta)\n";

        // Buscar adjuntos
        $structure = imap_fetchstructure($inbox, $email_number);
        $attachments = [];

        if (isset($structure->parts) && count($structure->parts)) {
            for ($i = 0; $i < count($structure->parts); $i++) {
                $part = $structure->parts[$i];
                if (isset($part->disposition) && strtolower($part->disposition) === 'attachment') {
                    $filename = $part->dparameters[0]->value ?? ('archivo_' . time());
                    $data = imap_fetchbody($inbox, $email_number, $i + 1);

                    if ($part->encoding == 3) $data = base64_decode($data);
                    elseif ($part->encoding == 4) $data = quoted_printable_decode($data);

                    $attachments[] = [
                        'filename' => $filename,
                        'data' => $data
                    ];
                }
            }
        }

        // Subir adjunto por FTP
        $conn = ftp_ssl_connect($ftp_host);
        if (!$conn) die("Error al conectar con el FTP\n");
        ftp_login($conn, $ftp_user, $ftp_pass);
        ftp_pasv($conn, true);

        foreach ($attachments as $adj) {
            $nombreArchivo = time() . '_' . preg_replace('/\s+/', '_', $adj['filename']);
            $tempPath = sys_get_temp_dir() . '/' . $nombreArchivo;
            file_put_contents($tempPath, $adj['data']);

            $remotePath = $ftp_path . $nombreArchivo;
            if (ftp_put($conn, $remotePath, $tempPath, FTP_BINARY)) {
                echo "Archivo subido a hosting: $nombreArchivo\n";

                // Actualizar BD
                $stmt = $pdo->prepare("UPDATE parte SET pdf = :pdf WHERE idRespuesta = :idRespuesta");
                $stmt->execute([
                    ':pdf' => 'uploads/' . $nombreArchivo,
                    ':idRespuesta' => $idRespuesta
                ]);
                echo "PDF vinculado a parte $idRespuesta\n";
            } else {
                echo "Error al subir $nombreArchivo al servidor\n";
            }
            unlink($tempPath);
        }

        ftp_close($conn);
        imap_setflag_full($inbox, $email_number, "\\Seen");
    }

    imap_close($inbox);
    echo "Proceso finalizado.\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
