<?php
// api/login.php
header('Content-Type: application/json');

// incluir conexión
require_once __DIR__ . '/../conection-bd.php';

// Leer JSON del frontend
$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// Validar entrada
if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Correo y contraseña son obligatorios"]);
    exit;
}

try {
    // Buscar usuario por correo
    $stmt = $pdo->prepare("SELECT id, nombre, apellido, correo, password, tipo 
                           FROM usuario 
                           WHERE correo = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch();

    if ($usuario && password_verify($password, $usuario['password'])) {
        session_start();
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_tipo'] = $usuario['tipo'];

        echo json_encode([
            "success" => true,
            "message" => "Login exitoso",
            "user" => [
                "id" => $usuario['id'],
                "nombre" => $usuario['nombre'],
                "apellido" => $usuario['apellido'],
                "correo" => $usuario['correo'],
                "tipo" => $usuario['tipo']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error en el servidor"]);
}
