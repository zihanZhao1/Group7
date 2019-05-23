<?php
session_start();
require_once('database.php');
if (isset($_POST["operate"]) && $_POST["operate"] == "addBooking") {
    $F_ID = $_POST["F_ID"];
    $start = $_POST["start"];
    $end = $_POST["end"];
    $count = $_POST["count"];
    $Avb = $_POST["Avb"];
    $U_ID = $_POST["U_ID"];
    $statement = $pdo->query("insert into sei_booking (F_ID,start,end,count,Avb,U_ID) 
values ('$F_ID','$start','$end','$count','$Avb','$U_ID')");
    echo 'Booking inserted...';
}

if (isset($_POST["operate"]) && $_POST["operate"] == "showBooking") {
    $id = $_POST['nameID'];
    $sql = "Select * from sei_booking,sei_facility where B_ID='$id'";
    $result = $pdo->query($sql);
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo json_encode($row);
    }
}

if (isset($_POST["operate"]) && $_POST["operate"] == "editBooking") {
    $B_ID = $_POST["nameID"];
    $F_ID = $_POST["F_ID"];
    $start = $_POST["start"];
    $end = $_POST["end"];
    $count = $_POST["count"];
    $Avb = $_POST["Avb"];
    $U_ID = $_POST["U_ID"];
    $statement = $pdo->query("UPDATE sei_booking SET F_ID='$F_ID',start='$start',end='$end',count='$count',Avb='$Avb',U_ID='$U_ID' WHERE B_ID='$B_ID'");
    echo 'Booking updated...';
}


if (isset($_POST['delete_mul'])) {
    $numberOfCheckbox = count($_POST['checkboxes']);
    $i = 0;
    while ($i < $numberOfCheckbox) {
        $keyToDelete = $_POST['checkboxes'][$i];
        $row = $pdo->query("DELETE  FROM sei_booking WHERE B_ID = '$keyToDelete';");
        $i++;
    }
    if ($row) {
        echo "<script>alert('success')
    {window.location.href ='booking.php';}</script>";
    } else {
        echo "<script>alert('fail')
    {window.location.href ='booking.php;}</script>";
    }
}
?>