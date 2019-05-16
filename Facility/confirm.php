<?php
  function redirect(){
    header('Location:login.php');
    exit();
  }
  if(!isset($_GET['email'])|| !isset($_GET['token'])){
    redirect();
  }else {
    require"conn.php";

    $email=$_GET['email'];
    $token=$_GET['token'];

    $sql=$conn->query("SELECT U_ID FROM SEI_User WHERE email='$email' AND token='$token' AND isEmailConfirmed=0");
    $num_rows=$sql->rowCount();
    if($num_rows>0){
      $sql="UPDATE SEI_User SET isEmailConfirmed=1, token='' WHERE email=?";
      $query=$conn->prepare($sql);
      $query->execute(array($email));
      echo'Your email has been verified! You can log in now!';
      redirect();
    }else {
      redirect();
    }
  }


 ?>
