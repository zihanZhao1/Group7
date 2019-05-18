<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$uid = $_SESSION['user'];
$facility = $_SESSION['facility'];

$tmpArr = explode('-', $_POST['book']);
$start = $tmpArr[0];
$end = $tmpArr[1];

$result = $conn->query("select price from sei_facility where F_ID = '" . $_POST['facility'] . "'");
$row = $result->fetch(PDO::FETCH_ASSOC);
$fprice = $row['price'];

$start = strtotime($date . " " . $start);
$end = strtotime($date . " " . $end);
$diff = $end - $start;
$hours = $diff / (60 * 60);

$price = $fprice * $hours;

$sql = "INSERT INTO `sei_booking`(`U_ID`, `F_ID`, `E_ID`, `C_ID`, `start`, `end`, `count`, `Avb`) 
VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],'Yes')";
$insert = $conn->exec($sql);

if ($insert) {

    $row3 = $conn->query("select name from sei_user where U_ID = '$uid'")->fetch(PDO::FETCH_ASSOC);
    $name = $row3['name'];

    $row4 = $conn->query("select name from sei_facility where F_ID = '" . $_POST['facility'] . "'")->fetch(PDO::FETCH_ASSOC);
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
        $conn->exec($sql);
        $message = "Fail to book!";
        echo "<script>alert('$message');window.location.href='booking.php';</script>", $mail->ErrorInfo;
    }
} else {
    $message = "Fail to book!";
    echo "<script>alert('$message');window.location.href='booking.php';</script>";
}
