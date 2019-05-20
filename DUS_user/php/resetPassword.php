<?php
  require_once "functions.php";
  require "conn.php";

  if(isset($_GET['email']) && isset($_GET['token'])){

    $email=$_GET['email'];
    $token=$_GET['token'];

      $sql=$conn->query("SELECT U_ID FROM SEI_User WHERE email='$email' AND token='$token' AND token<>'' AND tokenExpire > NOW()");

      $num_rows=$sql->rowCount();
      if($num_rows>0){
        $newPassword=generateNewString();
        $newPasswordEncrypted =password_hash($newPassword, PASSWORD_BCRYPT);
        $conn->query("UPDATE SEI_User SET token='', password='$newPasswordEncrypted' WHERE email='$email'");

        echo "Your New Password is $newPassword <br> <a href='login.php'>Click Here To Log In</a>";
      }else
      echo "1";
          //redirectToLoginPage();
  }else{
    echo "2";
  //  redirectToLoginPage();
  }


 ?>
