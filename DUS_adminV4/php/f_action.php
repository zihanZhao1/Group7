<?php
session_start();
require_once('database.php');
if (isset($_POST["operate"]) && $_POST["operate"] == "addFacility") {
    $name = $_POST["name"];
    $img = $_POST["img"];
    $price = $_POST["price"];
    $capability = $_POST["capability"];
    $open = $_POST["open"];
    $close = $_POST["close"];
    $info = $_POST["info"];
    $statement = $pdo->query("insert into sei_facility (name,img,price,capability,open,close,info) values ('$name','$img','$price','$capability','$open','$close','$info')");
    echo 'Facility inserted...';
}

if (isset($_POST["operate"]) && $_POST["operate"] == "showFacility") {
    $id = $_POST['nameID'];
    $sql = "Select * from sei_facility where F_ID='$id'";
    $result = $pdo->query($sql);
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo json_encode($row);
    }
}

if (isset($_POST["operate"]) && $_POST["operate"] == "editFacility") {
    $F_ID = $_POST["nameID"];
    $name = $_POST["name"];
    $img = $_POST["img"];
    $price = $_POST["price"];
    $capability = $_POST["capability"];
    $open = $_POST["open"];
    $close = $_POST["close"];
    $info = $_POST["info"];
    $statement = $pdo->query("UPDATE sei_facility SET name='$name',img='$img',price='$price',capability='$capability',open='$open',close='$close',info='$info' WHERE F_ID='$F_ID'");
    echo ' Facility edited...';
}


if (isset($_POST['delete_mul'])) {
    $numberOfCheckbox = count($_POST['checkboxes']);
    $i = 0;
    while ($i < $numberOfCheckbox) {
        $keyToDelete = $_POST['checkboxes'][$i];
        $row = $pdo->query("DELETE  FROM sei_facility WHERE F_ID = '$keyToDelete';");
        $i++;
    }
    if ($row) {
        echo "<script>alert('success')
    {window.location.href ='facility.php';}</script>";
    } else {
        echo "<script>alert('fail')
    {window.location.href ='facility.php;}</script>";
    }
}
?>