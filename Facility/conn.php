<?php

$dbms = 'mysql';
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'SE';
$dsn = "$dbms:host=$db_host;dbname=$db_name";
GlOBAL $pdo;
try {
    $conn = new PDO($dsn, $db_user, $db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo"successfully";
} catch (Exception $e) {
    echo "Error!:" . $e->getMessage() . '<br>';
}
