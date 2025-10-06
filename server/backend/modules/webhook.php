<?php
require_once '../../conection-bd.php';

// Función para registrar logs en un archivo
function escribirLog($mensaje)
{
    $archivo = __DIR__ . '/debug.log';
    $fecha = date('Y-m-d H:i:s');
    file_put_contents($archivo, "[$fecha] $mensaje\n", FILE_APPEND);
}
// Leer JSON
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Verificar errores en el JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    die("Error en el JSON recibido: " . json_last_error_msg());
}

// Validar estructura
if (!isset($data['NombreFormulario']) || !isset($data['Respuestas'])) {
    die("Faltan datos en la solicitud.");
}

// Inicializar variables
$idRespuesta = '-';
$nroParte = '-';
$fecha = '-';
$ejecutante = '-';
$equipo = [];
$ltsgasoil = 0.00;
$tipoEquipo = '-';
$kmRecorridos = 0;
$cantidadViajes = 0;
$dia = '-';
$lugar = '-';
$descripcion = '-';
$horaInicio = "00:00:00";
$horaFin = "00:00:00";
$cantidadHoras = 0;
$observaciones = '-';
$kmRepaso = 0;
$lugarMotiniveladora = '-';
$viajesCisterna = 0;
$lugarCisterna = '-';
$destinoBatea = '-';
$viajesBatea = 0;
$m3Batea = 0.00;
$estado = 'PENDIENTE';
$pdf = '-';
$cliente = '-';
$tipoCarga = '-';
$cantCarga = 0.00;
$cantDescarga = 0.00;
$cantera = '-';

// Procesar respuestas
$idRespuesta = isset($data['Id']) ? $data['Id'] : '';
foreach ($data['Respuestas'] as $respuesta) {
    if (!isset($respuesta['Pregunta']))
        continue;

    switch ($respuesta['Pregunta']) {
        case 'Cliente':
            $cliente = $respuesta['RespuestaTexto'];
            break;
        case 'Fecha':
            $fechaISO = str_replace('T', ' ', $respuesta['RespuestaFecha']);
            $fecha = date('Y-m-d', strtotime($fechaISO));
            break;
        case 'Equipo':
            foreach ($respuesta["ListaValores"] as $valor) {
                $equipo[] = $valor["Texto"];
            }
            break;
        case 'Km recorridos':
            $kmRecorridos = $respuesta['RespuestaNumero'];
            break;
        case 'Cantidad de viajes':
            $cantidadViajes = $respuesta['RespuestaNumero'];
            break;
        case 'Ejecutante':
            $ejecutante = $respuesta['RespuestaTexto'];
            break;
        case 'Dia':
            $dia = $respuesta['RespuestaTexto'];
            break;
        case 'Lugar':
            $lugar = $respuesta['RespuestaTexto'];
            break;
        case 'Descripcion':
            $descripcion = $respuesta['RespuestaTexto'];
            break;
        case 'Hora de Inicio':
            $horaInicio = substr($respuesta['RespuestaHora'], 0, 8);
            break;
        case 'Hora de Fin':
            $horaFin = substr($respuesta['RespuestaHora'], 0, 8);
            break;
        case 'Cantidad horas':
            $cantidadHoras = $respuesta['RespuestaDecimal'];
            break;
        case 'Observaciones':
            $observaciones = $respuesta['RespuestaTexto'];
            break;
        case 'Tipo Equipo':
            $tipoEquipo = $respuesta['RespuestaTexto'];
            break;
        case 'Cantera':
            $cantera = $respuesta['RespuestaTexto'];
            break;
        case 'KM DE REPASO':
            $kmRepaso = $respuesta['RespuestaNumero'];
            break;
        case 'LUGAR MOTONIVELADORA':
            $lugarMotiniveladora = $respuesta['RespuestaTexto'];
            break;
        case 'LUGAR CISTERNA':
            $lugarCisterna = $respuesta['RespuestaTexto'];
            break;
        case 'DESTINO':
            $destinoBatea = $respuesta['RespuestaTexto'];
            break;
        case 'cantidad de viajes':
            $viajesBatea = $respuesta['RespuestaNumero'];
            break;
        case 'Ingrese cantidad de viajes':
            $viajesCisterna = $respuesta['RespuestaNumero'];
            break;
        case 'M3':
            $m3Batea = $respuesta['RespuestaDecimal'];
            break;
        case 'Cantidad carga':
            $cantCarga = $respuesta['RespuestaDecimal'];
            break;
        case 'Cantidad descarga':
            $cantDescarga = $respuesta['RespuestaDecimal'];
            break;
        case 'Litros gasoil':
            $ltsgasoil = $respuesta['RespuestaDecimal'];
            break;
    }
}

// Guardar equipo como JSON
$equipoJSON = json_encode($equipo);

try {
    $nroParte = isset($data['Folio']) ? $data['Folio'] : '';

    $stmt = $pdo->prepare("
        INSERT INTO parte (
            nroParte, idRespuesta, fecha, ejecutante, equipo, 
            ltsgasoil, tipoEquipo, kmRecorridos, cantidadViajes, dia, lugar, 
            descripcion, horaInicio, horaFin, cantidadHoras, observaciones, 
            kmRepaso, lugarMotiniveladora, viajesCisterna, lugarCisterna, 
            destinoBatea, viajesBatea, m3Batea, estado, pdf, cliente, tipoCarga, 
            cantCarga, cantDescarga, cantera
        ) VALUES (
            :nroParte, :idRespuesta, :fecha, :ejecutante, :equipo,
            :ltsgasoil, :tipoEquipo, :kmRecorridos, :cantidadViajes, :dia, :lugar,
            :descripcion, :horaInicio, :horaFin, :cantidadHoras, :observaciones,
            :kmRepaso, :lugarMotiniveladora, :viajesCisterna, :lugarCisterna,
            :destinoBatea, :viajesBatea, :m3Batea, :estado, :pdf, :cliente, :tipoCarga,
            :cantCarga, :cantDescarga, :cantera
        )
    ");

    $stmt->execute([
        ':nroParte' => $nroParte,
        ':idRespuesta' => $idRespuesta,
        ':fecha' => $fecha,
        ':ejecutante' => $ejecutante,
        ':equipo' => $equipoJSON,
        ':ltsgasoil' => $ltsgasoil,
        ':tipoEquipo' => $tipoEquipo,
        ':kmRecorridos' => $kmRecorridos,
        ':cantidadViajes' => $cantidadViajes,
        ':dia' => $dia,
        ':lugar' => $lugar,
        ':descripcion' => $descripcion,
        ':horaInicio' => $horaInicio,
        ':horaFin' => $horaFin,
        ':cantidadHoras' => $cantidadHoras,
        ':observaciones' => $observaciones,
        ':kmRepaso' => $kmRepaso,
        ':lugarMotiniveladora' => $lugarMotiniveladora,
        ':viajesCisterna' => $viajesCisterna,
        ':lugarCisterna' => $lugarCisterna,
        ':destinoBatea' => $destinoBatea,
        ':viajesBatea' => $viajesBatea,
        ':m3Batea' => $m3Batea,
        ':estado' => $estado,
        ':pdf' => $pdf,
        ':cliente' => $cliente,
        ':tipoCarga' => $tipoCarga,
        ':cantCarga' => $cantCarga,
        ':cantDescarga' => $cantDescarga,
        ':cantera' => $cantera
    ]);

    echo json_encode(["status" => "success", "message" => "Parte registrada correctamente"]);
} catch (PDOException $e) {
    escribirLog("Error al ejecutar la consulta: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Error al ejecutar la consulta: " . $e->getMessage()]);
}
?>