<?php

    $db_host = 'localhost';
    $db_name = 'dus';
    $db_user = 'root';
    $db_pass = '';

    try{
        $conn = new PDO("mysql:host=$db_host;dbname=$db_name",$db_user,$db_pass);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
        echo "Connection failed: " . $e->getMessage();
    }
