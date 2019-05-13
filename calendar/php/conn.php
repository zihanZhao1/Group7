<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/11
 * Time: 19:32
 */

$dbms = 'mysql';
$db_host = 'mysql.dur.ac.uk';
$db_user = 'vfjs52';
$db_password = 'caxt43on';
$db_name = 'Xvfjs52_...';
$dsn = "$dbms:host=$db_host;dbname=$db_name";

try {
    $pdo = new PDO($dsn, $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("Error!:" . $e->getMessage() . '<br>');
}

$sql = "select * from SEI_Event;";
$statement = $pdo->query($sql);
$tmp = array();
while ($events = $statement->fetch(PDO::FETCH_ASSOC)) {
    array_push($tmp, $events);
}
$tmp = json_encode($tmp);

echo "var allEvents = $tmp";
