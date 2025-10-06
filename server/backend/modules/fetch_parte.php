<?php
require_once '../../conection-bd.php';
session_start();

header('Content-Type: application/json; charset=utf-8');
// Verificar si se envió el parámetro ID
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(["error" => "Falta el parámetro 'id'"]);
    exit;
}

$id = $_GET['id'];

try {

    // Consulta preparada
    $sql = "
    SELECT
        nroParte,
        idRespuesta,
        fecha,
        ejecutante,
        equipo,
        ltsgasoil,
        tipoEquipo,
        kmRecorridos,
        cantidadViajes,
        dia,
        lugar,
        descripcion,
        horaInicio,
        horaFin,
        cantidadHoras,
        observaciones,
        kmRepaso,
        lugarMotiniveladora,
        viajesCisterna,
        lugarCisterna,
        destinoBatea,
        viajesBatea,
        m3Batea,
        estado,
        pdf,
        cliente,
        tipoCarga,
        cantCarga,
        cantDescarga,
        cantera,
        detalle
    FROM parte
    WHERE nroParte = :id
    LIMIT 1
";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    // Verificar si hay resultado
    if ($stmt->rowCount() > 0) {
        $remito = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($remito, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } else {
        echo json_encode(["error" => "Remito no encontrado"]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
}