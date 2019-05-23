<?php
$db_host = 'mysql:host=localhost';
$db_name = 'dbname=XSEI';
$db_user = 'root';
$db_pass = '';
try{
    $pdo = new PDO($db_host.';'.$db_name, $db_user, $db_pass);
    // set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}
?>
