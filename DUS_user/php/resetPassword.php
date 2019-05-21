<?php
  include_once "head_user.php";
  require_once "functions.php";
  require "conn.php";
$msg = "";

  if(isset($_GET['email']) && isset($_GET['token'])){

    $email=$_GET['email'];
    $token=$_GET['token'];

      $sql=$pdo->query("SELECT U_ID FROM SEI_User WHERE email='$email' AND token='$token' AND token<>'' AND tokenExpire > NOW()");

      $num_rows=$sql->rowCount();
      if($num_rows>0){
        $newPassword=generateNewString();
        $newPasswordEncrypted =password_hash($newPassword, PASSWORD_BCRYPT);
        $pdo->query("UPDATE SEI_User SET token='', password='$newPasswordEncrypted' WHERE email='$email'");

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
            $sql="INSERT INTO SEI_User (passwordl) VALUES (:password)";
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
     <meta charset="utf-8">
     <title></title>
   </head>
   <body>
     <div class="container" style="margin-top:100px;">
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
             </p>

             <br>
             <br>
           </form>
          </div>
         </div>
       </div>

 <?php
  require "foot.php";
  ?>
   </body>
 </html>
