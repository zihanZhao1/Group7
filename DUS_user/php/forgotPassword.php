<?php
  include_once "head_user.php";
  use PHPMailer\PHPMailer\PHPMailer;
  require_once "functions.php";

  var_dump($_POST);
  if(isset($_POST['reset'])){
    require"conn.php";


    $email=$_POST['email'];

    var_dump($_POST);
    $sql="SELECT U_ID FROM SEI_User WHERE email='$email'";
    $query=$pdo->query($sql);

    $num_rows=$query->rowCount();
    if($num_rows>0){


    	$token=generateNewString();

	    $pdo->query("UPDATE SEI_User SET token='$token', tokenExpire=DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE email='$email'" );

      /*
      require_once "phpmailer/phpmailer.php";
      require_once "phpmailer/Exception.php";
      */

      require '../phpmailer/vendor/autoload.php';


      $mail->setFrom('chenchang1995.96@gmail.com', 'Durham Sport Team');
      $mail->addAddress($email);
      $mail->Subject = 'Reset Password';
      $mail->isHTML(true);
      $mail->Body    = "
            Please click on the link below to reset your password:<br><br>

            <a href='http://localhost/Facility/resetPassword.php?email=$email&token=$token'>Click here</a>http://localhost/Facility/resetPassword.php?email=$email&token=$token
            ";
      if ($mail->send())
          exit (json_encode(array('status' =>1 , "msg"=>"Verification needed. We'll send a code to your email to verify your identity. Please check your Email Inbox!")));
      else {
        exit (json_encode(array('status' =>0 , "msg"=>"Error! Please try again!")));
      }

  }else {
      exit (json_encode(array("status" =>0 , "msg"=>'Please check your inputs!')));
  }
}
 ?>


<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Forgot Password System</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
  <div class="container" style="margin-top:100px;">
    <div class="row justify-content-center">
      <div class="col-md-6 col-md-offset-3" align="center">
        <br>
        <br>

  <form action="login.php"  method="post">
          <h1 style="color:#742e68;">Reset Password</h1>
          <hr>
        <p align="left"><font color="red">*</font><b>Please Enter Your Emaill Address:</b>
        </p>
        <input class="form-control" id="email" placeholder="Email Address..." required><br>
        <br><br>
        <input type="button" class="btn btn-primary" value="Reset Password" id="reset"><p id="response"></p>
        <br><br>

      </form>


      </div>
    </div>
   </div>
   <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
   <script type="text/javascript">
    var email = $("#email");

    $(document).ready(function (){
      $('.btn-primary').on('click',function(){
        if(email.val()!= ""){
           email.css('border','1px solid green');

          $.ajax({
            url:'forgotPassword.php',
            method:'POST',
            dataType:'json',
            data:{
              email:email.val()
            },success: function (response){
              if(!response.success)
                 $("#response").html(response.msg).css('color',"red");
              else {
                 $("#response").html(response.msg).css('color',"green");
              }
            }

          });
        }else {
          email.css('border','1px solid red');
        }
      });
    });
    </script>
</body>
</html>
