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

$sql = "select * from SEI_Booking;";
$statement = $pdo->query($sql);

$tmpBooking = array();
$tmpAct = array();
while ($booking = $statement->fetch(PDO::FETCH_ASSOC)) {
    $ID = $booking['EC_ID'];
    if($booking['className']=='course'){
        $statementCourse = $pdo->query("select * from SEI_Course where C_ID = $ID");
        $course = $statementCourse->fetch(PDO::FETCH_ASSOC);
        $booking['title'] = $course['title'];
        array_push($tmpAct, $booking);
        continue;
    }
    elseif ($booking['className'] == 'event'){
        $statementEvent = $pdo->query("select * from SEI_Event where E_ID = $ID");
        $event = $statementEvent->fetch(PDO::FETCH_ASSOC);
        $booking['title']=$event['title'];
        $booking['url']=$event['url'];
        array_push($tmpAct, $booking);
        continue;
    }
    else{
        $booking['title'] = "Booked";
        array_push($tmpBooking,$booking);
    }
}

$tmpBooking = json_encode($tmpBooking);
$tmpAct = json_encode($tmpAct);

echo "var allBooking = $tmpBooking
var allActivity = $tmpAct";
