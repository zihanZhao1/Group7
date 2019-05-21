<?php
  require_once "functions.php";
  require "conn.php";
  $msg = "";

  if(isset($_GET['email']) && isset($_GET['token'])){

    $email=$_GET['email'];
    $token=$_GET['token'];

      $sql=$pdo->query("SELECT U_ID FROM sei_user WHERE email='$email' AND token='$token' AND token<>'' AND tokenExpire > NOW()");

      $num_rows=$sql->rowCount();
      if($num_rows>0){
        $newPassword=generateNewString();
        $newPasswordEncrypted =password_hash($newPassword, PASSWORD_BCRYPT);
        $pdo->query("UPDATE sei_user SET token='', password='$newPasswordEncrypted' WHERE email='$email'");

        //echo "Your New Password is $newPassword <br> <a href='login.php'>Click Here To Log In</a>";
      }
      else
      echo "Error! Please try again!";
    }

    if(isset($_POST['reset']))
    {
      $newPassword1=$_POST["newPassword"];
      $cPassword=$_POST["confirmPassword"];

      if($newPassword1!=$cPassword)
          $msg="Passwords do not match!";
          else{
            $hashedPassword=password_hash($newPassword,PASSWORD_BCRYPT);
            $sql="INSERT INTO sei_user (passwordl) VALUES (:password)";
            $query=$pdo->prepare($sql);
            $query->execute(array(
              ':password' => $hashedPassword
            ));
            $msg="You have successfully changed your password! Please go to the login page!";

          }
    }
 ?>

 <!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <title>Reset Password</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="../css/team-durham.css" type="text/css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="../css/index.css" type="text/css"> -->
        <link rel="stylesheet" href="../css/style.css">
        <script src="../js/jquery.min.js"></script>
    </head>
    <body>
        <div class="container" style="margin-top:20px;">
            <?php include 'head.php'; ?>
            <div class="row justify-content-center">
                <div class="col-md-6 col-md-offset-3" align="center">
                    <img src="" alt="">
                    <br>
                    <br>

                    <form action="login.php" onsubmit="alert('Please go to the login page!')"  method="post">
                        <h1 style="color:#742e68;"> Reset Password</h1>
                        <p></p>
                        <hr>
                        <p align="left"><font color="red">*</font><b>New Password:</b>
                            <input style="height:30px;"  class="form-control" type="password" placeholder="New Password" name="newPassword" required >
                        </p>

                        <p align="left"><font color="red">*</font><b>Confirm Password:</b>
                            <input style="height:30px;"  class="form-control" type="password" placeholder="Repeat Password" name="confirmPassword" required >
                        </p>

                        <br>
                        <br>
                        <button type="submit" class="btn btn-primary" name="reset" >Reset Password</button>

                        <?php if ($msg != "") echo $msg . "<br><br>" ?>

                        <br>
                    </form>
                </div>
            </div>
        </div>

        <?php include "foot.php"; ?>
        <script> <?php logoutBlock(); ?> </script>
    </body>
</html>
