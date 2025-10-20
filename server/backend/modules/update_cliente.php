<?php
require_once '../../conection-bd.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

try {
    // === Validar ID obligatorio ===
    if (empty($_POST['id'])) {
        echo json_encode([
            "success" => false,
            "message" => "Falta el parámetro 'id' del cliente."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    $id = (int) $_POST['id'];
    $razonSocial = trim($_POST['razonSocial'] ?? '');
    $cuit = trim($_POST['cuit'] ?? '');
    $correo = trim($_POST['correo'] ?? '');
    $direccion = trim($_POST['direccion'] ?? '');

    // === Verificar existencia del cliente ===
    $check = $pdo->prepare("SELECT id FROM cliente WHERE id = :id");
    $check->execute([':id' => $id]);
    if ($check->rowCount() === 0) {
        echo json_encode([
            "success" => false,
            "message" => "Cliente no encontrado."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // === Actualizar cliente (sin requerir campos obligatorios) ===
    $query = "
        UPDATE cliente
        SET 
            cuit = :cuit,
            razonSocial = :razonSocial,
            correo = :correo,
            direccion = :direccion,
            fechaEdicion = NOW()
        WHERE id = :id
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':cuit', $cuit);
    $stmt->bindParam(':razonSocial', $razonSocial);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':direccion', $direccion);
    $stmt->execute();

    echo json_encode([
        "success" => true,
        "message" => "Cliente actualizado correctamente."
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al actualizar el cliente: " . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>
