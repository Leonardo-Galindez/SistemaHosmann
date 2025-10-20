<?php
require_once '../../conection-bd.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

try {
    // === Validar datos obligatorios ===
    if (empty($_POST['id'])) {
        echo json_encode([
            "success" => false,
            "message" => "Falta el parámetro 'id' del usuario."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    $id         = (int) $_POST['id'];
    $nombre     = trim($_POST['nombre'] ?? '');
    $apellido   = trim($_POST['apellido'] ?? '');
    $telefono   = trim($_POST['telefono'] ?? '');
    $correo     = trim($_POST['correo'] ?? '');
    $password   = trim($_POST['password'] ?? '');
    $tipo       = trim($_POST['tipo'] ?? '');

    if (empty($nombre) || empty($apellido) || empty($correo) || empty($tipo)) {
        echo json_encode([
            "success" => false,
            "message" => "Faltan campos obligatorios."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // === Validar formato del correo ===
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "success" => false,
            "message" => "El formato del correo no es válido."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // === Verificar existencia del usuario ===
    $check = $pdo->prepare("SELECT id FROM usuario WHERE id = :id");
    $check->execute([':id' => $id]);
    if ($check->rowCount() === 0) {
        echo json_encode([
            "success" => false,
            "message" => "Usuario no encontrado."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // === Armar consulta dinámica (según si cambia o no la contraseña) ===
    if (!empty($password)) {
        $hashed = password_hash($password, PASSWORD_BCRYPT);
        $query = "
            UPDATE usuario
            SET nombre = :nombre,
                apellido = :apellido,
                telefono = :telefono,
                correo = :correo,
                tipo = :tipo,
                password = :password,
                fechaEdicion = NOW()
            WHERE id = :id
        ";
    } else {
        $query = "
            UPDATE usuario
            SET nombre = :nombre,
                apellido = :apellido,
                telefono = :telefono,
                correo = :correo,
                tipo = :tipo,
                fechaEdicion = NOW()
            WHERE id = :id
        ";
    }

    $stmt = $pdo->prepare($query);

    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':apellido', $apellido);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':tipo', $tipo);

    if (!empty($password)) {
        $stmt->bindParam(':password', $hashed);
    }

    $stmt->execute();

    // === Respuesta ===
    echo json_encode([
        "success" => true,
        "message" => "Usuario actualizado correctamente."
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al actualizar el usuario: " . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>
