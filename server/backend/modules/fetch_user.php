<?php
// get-user-type.php
session_start();
header('Content-Type: application/json; charset=utf-8');

// Si no hay sesión activa
if (!isset($_SESSION['usuario_id']) || !isset($_SESSION['usuario_tipo'])) {
    echo json_encode([
        "success" => false,
        "message" => "No hay un usuario logueado."
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// Devolver tipo y datos básicos del usuario
echo json_encode([
    "success" => true,
    "usuario" => [
        "id" => $_SESSION['usuario_id'],
        "tipo" => $_SESSION['usuario_tipo']
    ]
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
