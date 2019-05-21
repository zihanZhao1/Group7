<?php

$dbms = 'mysql';
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'XSEI';
$dsn = "$dbms:host=$db_host;dbname=$db_name";
GlOBAL $pdo;
try {
    $pdo = new PDO($dsn, $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo"successfully";
} catch (Exception $e) {
    echo "Error!:" . $e->getMessage() . '<br>';
}
?>
