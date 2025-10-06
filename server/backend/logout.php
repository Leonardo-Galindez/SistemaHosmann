<?php
// logout.php

session_start();         // Iniciar sesión para poder destruirla
session_unset();         // Eliminar todas las variables de sesión
session_destroy();       // Destruir la sesión

// Redirigir al login
header("Location: ../../index.php");
exit();
