<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/11
 * Time: 19:32
 */

include 'conn.php';

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
