<?php
require_once '../conection-bd.php';
header('Content-Type: application/json; charset=utf-8');

try {
    // Leer datos del cuerpo (JSON)
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || !isset($data['nroParte'])) {
        echo json_encode(["error" => "Datos incompletos o inválidos."]);
        exit;
    }

    $sql = "
        UPDATE parte
        SET
            fecha = :fecha,
            cliente = :cliente,
            ejecutante = :ejecutante,
            equipo = :equipo,
            tipoEquipo = :tipoEquipo,
            kmRecorridos = :kmRecorridos,
            cantidadViajes = :cantidadViajes,
            dia = :dia,
            lugar = :lugar,
            descripcion = :descripcion,
            horaInicio = :horaInicio,
            horaFin = :horaFin,
            cantidadHoras = :cantidadHoras,
            observaciones = :observaciones,
            kmRepaso = :kmRepaso,
            lugarMotiniveladora = :lugarMotiniveladora,
            viajesCisterna = :viajesCisterna,
            lugarCisterna = :lugarCisterna,
            destinoBatea = :destinoBatea,
            viajesBatea = :viajesBatea,
            m3Batea = :m3Batea,
            ltsgasoil = :ltsgasoil,
            detalle = :detalle
        WHERE nroParte = :nroParte
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':fecha' => $data['fecha'] ?? null,
        ':cliente' => $data['cliente'] ?? null,
        ':ejecutante' => $data['ejecutante'] ?? null,
        ':equipo' => $data['equipo'] ?? null,
        ':tipoEquipo' => $data['tipoEquipo'] ?? null,
        ':kmRecorridos' => $data['kmRecorridos'] ?? null,
        ':cantidadViajes' => $data['cantidadViajes'] ?? null,
        ':dia' => $data['dia'] ?? null,
        ':lugar' => $data['lugar'] ?? null,
        ':descripcion' => $data['descripcion'] ?? null,
        ':horaInicio' => $data['horaInicio'] ?? null,
        ':horaFin' => $data['horaFin'] ?? null,
        ':cantidadHoras' => $data['cantidadHoras'] ?? null,
        ':observaciones' => $data['observaciones'] ?? null,
        ':kmRepaso' => $data['kmRepaso'] ?? null,
        ':lugarMotiniveladora' => $data['lugarMotiniveladora'] ?? null,
        ':viajesCisterna' => $data['viajesCisterna'] ?? null,
        ':lugarCisterna' => $data['lugarCisterna'] ?? null,
        ':destinoBatea' => $data['destinoBatea'] ?? null,
        ':viajesBatea' => $data['viajesBatea'] ?? null,
        ':m3Batea' => $data['m3Batea'] ?? null,
        ':ltsgasoil' => $data['ltsgasoil'] ?? null,
        ':nroParte' => $data['nroParte'],
        ':detalle' => $data['detalle'] ?? null
    ]);

    echo json_encode(["success" => true, "message" => "Parte actualizado correctamente."]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Error al actualizar: " . $e->getMessage()]);
}
