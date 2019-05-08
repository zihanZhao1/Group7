<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/8
 * Time: 22:59
 */
$dbms = 'mysql';
$db_host = 'mysql.dur.ac.uk';
$db_user = 'vfjs52';
$db_password = 'caxt43on';
$db_name = 'Xvfjs52_...';
$dsn = "$dbms:host=$db_host;dbname=$db_name";
GlOBAL $pdo;
try {
    $pdo = new PDO($dsn, $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("Error!:" . $e->getMessage() . '<br>');
}