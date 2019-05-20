<?php
session_start();
session_destroy();
$_POST=array();
header('Location:login.php')
 ?>
