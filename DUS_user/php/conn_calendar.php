<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/11
 * Time: 19:32
 */

include 'conn.php';
session_start();
$Uid = $_SESSION['user'];
//$Uid = 1;

$tmpBooking = array();

$Fid = $_SESSION['facility'];

if ($Fid != 0)
    $booking = $pdo->query("select * from sei_booking where U_ID = $Uid and F_ID=$Fid;");
else {
    $booking = $pdo->query("select * from sei_booking where U_ID = $Uid;");
}


foreach ($booking as $b) {
    $Fid = $b['F_ID'];
    $Fsql = "select * from sei_facility where F_ID = $Fid;";
    $fac = $pdo->query($Fsql)->fetch(PDO::FETCH_ASSOC);

    $b['title'] = $fac['name'] . ' num: ' . $b['count'];
    array_push($tmpBooking, $b);
}

$tmpBooking = json_encode($tmpBooking);

echo "var allBooking = $tmpBooking";
