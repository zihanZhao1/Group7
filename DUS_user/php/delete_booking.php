<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/20
 * Time: 17:39
 */

include 'conn.php';

$Bid = $_GET['id'];
$sql = "DELETE FROM  `sei_booking` WHERE  `B_ID` =$Bid";
$delete = $pdo->exec($sql);

if ($delete){
    echo "<script>alert('Sucessfully deleted'),
window.location.href='booking.php?id=0';</script>";
}else{
    echo "<script>alert('Delete failed!'),
window.location.href='booking.php?id=0';</script>";
}