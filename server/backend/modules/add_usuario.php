<?php
require_once '../../conection-bd.php'; // Usa tu conexión PDO
header('Content-Type: application/json; charset=utf-8');

try {
    // Obtener los datos del formulario (esperando que vengan por POST)
    $nombre   = $_POST['nombre'] ?? '';
    $apellido = $_POST['apellido'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $correo   = $_POST['correo'] ?? '';
    $password = $_POST['password'] ?? '';
    $tipo     = $_POST['tipo'] ?? '';

    // Validar campos obligatorios
    if (empty($nombre) || empty($apellido) || empty($correo) || empty($password) || empty($tipo)) {
        echo json_encode([
            "success" => false,
            "message" => "Faltan campos obligatorios."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // Encriptar la contraseña
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Fechas
    $fechaActual = date('Y-m-d H:i:s');

    // Consulta SQL (uso de parámetros preparados)
    $query = "
        INSERT INTO usuario
            (nombre, apellido, telefono, correo, password, tipo, fechaCreacion, fechaEdicion)
        VALUES 
            (:nombre, :apellido, :telefono, :correo, :password, :tipo, :fechaCreacion, :fechaEdicion)
    ";

    $stmt = $pdo->prepare($query);

    $stmt->execute([
        ':nombre'        => $nombre,
        ':apellido'      => $apellido,
        ':telefono'      => $telefono,
        ':correo'        => $correo,
        ':password'      => $passwordHash,
        ':tipo'          => $tipo,
        ':fechaCreacion' => $fechaActual,
        ':fechaEdicion'  => $fechaActual
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Usuario registrado correctamente."
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al registrar usuario: " . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>
