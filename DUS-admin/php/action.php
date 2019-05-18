<?php
session_start();
require_once('database.php');
if (isset($_POST["operate"]) && $_POST["operate"] == "addCourse") {
    $name = $_POST["name"];
    $time = $_POST["time"];
    $weeks = $_POST["weeks"];
    $start = $_POST["start"];
    $statement = $pdo->query("insert into sei_course (name,time,weeks,start) 
values ('$name','$time','$weeks','$start')");
    echo 'Course inserted...';
}

if (isset($_POST["operate"]) && $_POST["operate"] == "showCourse") {
    $id = $_POST['nameID'];
    $sql = "Select * from sei_course where C_ID='$id'";
    $result = $pdo->query($sql);
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo json_encode($row);
    }
}

if (isset($_POST["operate"]) && $_POST["operate"] == "editCourse") {
    $C_ID = $_POST["nameID"];
    $name = $_POST["name"];
    $time = $_POST["time"];
    $weeks = $_POST["weeks"];
    $start = $_POST["start"];
    $statement = $pdo->query("UPDATE sei_course SET name='$name',time='$time',weeks='$weeks',start='$start' WHERE C_ID='$C_ID'");
    echo 'Course inserted...';
}


if (isset($_POST['delete_mul'])) {
    $numberOfCheckbox = count($_POST['checkboxes']);
    $i = 0;
    while ($i < $numberOfCheckbox) {
        $keyToDelete = $_POST['checkboxes'][$i];
        $row = $pdo->query("DELETE  FROM sei_course WHERE C_ID = '$keyToDelete';");
        $i++;
    }
    if ($row) {
        echo "<script>alert('success')
    {window.location.href ='course.php';}</script>";
    } else {
        echo "<script>alert('fail')
    {window.location.href ='course.php;}</script>";
    }
}
?>