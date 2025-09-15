<?php
// config/db.php

$host = "127.0.0.1";
$DB_NAME = "smartform_hosmann";  
$DB_USER = "smartform_hosmann";           
$DB_PASS = "Hosmann-55*";              

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    // Respuesta en JSON si falla
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión: " . $e->getMessage()
    ]);
    exit;
}
