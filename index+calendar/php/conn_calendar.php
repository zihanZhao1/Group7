<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/11
 * Time: 19:32
 */

include 'conn.php';
//session_start();
//$Uid = $_SESSION['user'];
$Uid = 1;
$statement = $pdo->query("select * from sei_booking where U_ID = $Uid;");

$tmpBooking = array();

while ($booking = $statement->fetch(PDO::FETCH_ASSOC)) {

    $booking['title'] = "Booked";
    array_push($tmpBooking, $booking);

}

$tmpBooking = json_encode($tmpBooking);

echo "var allBooking = $tmpBooking";
