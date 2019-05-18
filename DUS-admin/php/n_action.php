<?php
session_start();
require_once('database.php');
if (isset($_POST["operate"]) && $_POST["operate"] == "addNews") {
    $title = $_POST["title"];
    $time = $_POST["time"];
    $content = $_POST["content"];
    $statement = $pdo->query("insert into sei_news (title,time,content) 
values ('$title','$time','$content')");
    echo 'News inserted...';
}

if (isset($_POST["operate"]) && $_POST["operate"] == "showNews") {
    $id = $_POST['nameID'];
    $sql = "Select * from sei_news where N_ID='$id'";
    $result = $pdo->query($sql);
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo json_encode($row);
    }
}

if (isset($_POST["operate"]) && $_POST["operate"] == "editNews") {
    $N_ID = $_POST["nameID"];
    $title = $_POST["title"];
    $time = $_POST["time"];
    $content = $_POST["content"];
    $statement = $pdo->query("UPDATE sei_news SET title='$title',time='$time',content='$content' WHERE N_ID='$N_ID'");
    echo 'News edited...';
}


if (isset($_POST['delete_mul'])) {
    $numberOfCheckbox = count($_POST['checkboxes']);
    $i = 0;
    while ($i < $numberOfCheckbox) {
        $keyToDelete = $_POST['checkboxes'][$i];
        $row = $pdo->query("DELETE  FROM sei_news WHERE N_ID = '$keyToDelete';");
        $i++;
    }
    if ($row) {
        echo "<script>alert('success')
    {window.location.href ='news.php';}</script>";
    } else {
        echo "<script>alert('fail')
    {window.location.href ='news.php;}</script>";
    }
}
?>