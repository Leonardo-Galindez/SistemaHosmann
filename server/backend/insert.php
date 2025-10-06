<?php
require_once __DIR__ . '/../conection-bd.php';

$hash = password_hash("admin-55*", PASSWORD_BCRYPT);

$sql = "INSERT INTO usuario (nombre, apellido, correo, password, tipo)
        VALUES ('admin', 'admin', 'admin@hosmann.com.ar', :hash, 'admin')";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(":hash", $hash);
$stmt->execute();

echo "Usuario admin creado con contraseña encriptada.";
