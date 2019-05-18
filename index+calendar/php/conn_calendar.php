<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/11
 * Time: 19:32
 */

include 'conn.php';

$sql = "select * from sei_booking;";
$statement = $pdo->query($sql);

$tmpBooking = array();
$tmpAct = array();
while ($booking = $statement->fetch(PDO::FETCH_ASSOC)) {
    $E_ID = $booking['E_ID'];
    $C_ID = $booking['C_ID'];
    if($E_ID==null){
        $statementCourse = $pdo->query("select * from sei_course where C_ID = $C_ID");
        $course = $statementCourse->fetch(PDO::FETCH_ASSOC);
        $booking['title'] = "Course ".$C_ID;
        array_push($tmpAct, $booking);
        continue;
    }
    elseif ($C_ID==null){
        $statementEvent = $pdo->query("select * from sei_event where E_ID = $E_ID");
        $event = $statementEvent->fetch(PDO::FETCH_ASSOC);
        $booking['title']="Event ".$E_ID;
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
