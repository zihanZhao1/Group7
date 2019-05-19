<?php

session_start();
include 'conn.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//$uid = $_SESSION['user'];
$uid = 1;
$Fid = $_SESSION['facility'];
$num = $_SESSION['num'];
$date = $_SESSION['date'];

$book = array();
for ($i = 0; $i < count($_POST['bookTime']); $i++) {
    $tmp = explode(":", $_POST['bookTime'][$i]);
    array_push($book, $tmp[0]);
}
asort($book);

$start = array();
array_push($start, $book[0]);
for ($i = 1; $i < count($book); $i++) {
    if ($book[$i - 1] + 1 != ($book[$i])) {
        array_push($start, $book[$i]);
    }
}

$end = array();
if(count($start)!=1){
    $j = 1;
    for ($i = 1; $i < count($book); $i++) {
        if ($book[$i] == $start[$j]) {
            array_push($end, $book[$i - 1] + 1);
            $j++;
        }
    }
}
array_push($end, $book[count($book) - 1] + 1);

$result = $pdo->query("select price from sei_facility where F_ID = $Fid");
$row = $result->fetch(PDO::FETCH_ASSOC);
$fprice = $row['price'];
$price = 0;

for ($i = 0; $i < count($start); $i++) {
    $price = $price + $fprice * ($end[$i] - $start[$i]);
    $startDate = date('Y-m-d H:i:s', strtotime($date)+60*60*$start[$i]);
    $endDate = date('Y-m-d H:i:s', strtotime($date)+60*60*$end[$i]);
    echo $startDate." ".$endDate."<br>";
    $sql = "INSERT INTO `sei_booking`(`U_ID`, `F_ID`, `E_ID`, `C_ID`, `start`, `end`, `count`, `Avb`)
VALUES ($uid,$Fid,null,null,'$startDate','$endDate',$num,'yes')";
    $insert = $pdo->exec($sql);
}

if ($insert) {
    $row3 = $pdo->query("select name from sei_user where U_ID = '$uid'")->fetch(PDO::FETCH_ASSOC);
    $name = $row3['name'];

    $row4 = $pdo->query("select name from sei_facility where F_ID = $Fid")->fetch(PDO::FETCH_ASSOC);
    $fname = $row4['name'];

    require 'phpmailer/vendor/autoload.php';

    $mail = new PHPMailer(true);
    try {
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'gba78769df@gmail.com';
        $mail->Password = 'mc081229snake';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        $mail->setFrom('gba78769df@gmail.com', 'Ce Ma');
        $mail->addAddress('gba78769df@gmail.com', 'Ce Ma');
        $mail->addReplyTo('gba78769df@gmail.com', 'Ce Ma');

        $body = '<html>
                <body>
                <h2>Booking Details<h2>
                <hr>
                <p>Student Name:' . $name . '</p>
                <p>Student ID:' . $uid . '</p>
                <p>Activity loaction:' . $fname . '</p>
                <p>Date:' . $date . '</p>
                <p>Start Time:' . $stime . '</p>
                <p>End Time:' . $etime . '</p>
                <p>Total Price:' . $price . '</p>
                </body>
                </html>';
        //Content
        $mail->isHTML(true);
        $mail->Subject = 'DUS booking';
        $mail->Body = $body;
        $mail->AltBody = strip_tags($body);
        $mail->send();

    } catch (Exception $e) {
        $sql = "delete from sei_booking where B_ID = '$bid'";
        $pdo->exec($sql);
        $message = "Fail to book!";
        echo "<script>alert('$message');window.location.href='booking.php';</script>", $mail->ErrorInfo;
    }
} else {
    $message = "Fail to book!";
//    echo "<script>alert('$message');window.location.href='booking.php';</script>";
}
