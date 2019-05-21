<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  //require_once "functions.php";


  if(isset($_POST['email'])){
    require"conn.php";


    $email=$_POST['email'];

    //var_dump($_POST);
    $sql="SELECT U_ID FROM sei_user WHERE email='$email'";
    $query=$pdo->query($sql);

    $num_rows=$query->rowCount();
    if($num_rows>0){


    	$token=generateNewString();

	    $pdo->query("UPDATE sei_user SET token='$token', tokenExpire=DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE email='$email'" );

      /*
      require_once "phpmailer/phpmailer.php";
      require_once "phpmailer/Exception.php";
      */

      require '../phpmailer/vendor/autoload.php';

      $mail = new PHPMailer(true);                              // Passing `true` enables exceptions

          //Server settings


          $mail->SMTPDebug = 0;                                 // Enable verbose debug output
          $mail->isSMTP();                                      // Set mailer to use SMTP
          $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
          $mail->SMTPAuth = true;                               // Enable SMTP authentication
          $mail->Username = 'durhamsportteam@gmail.com';                 // SMTP username
          $mail->Password = 'qwer6666';                           // SMTP password
          $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
          $mail->Port = 587;                                    // TCP port to connect to



          $mail->setFrom('durhamsportteam@gmail.com', 'Durham Sport Team');
          $mail->addAddress($email);
          $mail->Subject = 'Reset Password';
          $mail->isHTML(true);
          $mail->Body    = "
            Please click on the link below to reset your password (The link will expire in 5 minutes.):<br><br>

            <a href='resetPassword.php?email=$email&token=$token'>Click here:</a><br>http://localhost/Group7/DUS_user/php/resetPassword.php?email=$email&token=$token
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
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/index.css">
    <script src="../js/jquery.min.js"></script>
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
</head>
<body>
    <div class="container" style="margin-top:50px;">
        <?php include("head.php"); ?>
        <div class="row justify-content-center">
        <div class="col-md-6 col-md-offset-3" align="center">
            <br>
            <form action="login.php" onsubmit="alert('Please check your inbox and verify your email address!')" method="post">
                <h1 style="color:#742e68;">Reset Password</h1>
                <hr>
                <p align="left"><font color="red">*</font><b>Please Enter Your Emaill Address:</b>
                </p>
                <input class="form-control" id="email" placeholder="Email Address..." required><br>
                <br><br>
                <input type="submit" class="btn btn-primary" value="Reset Password" id="reset">
                <p id="response"></p>
                <br><br>
            </form>
            </div>
        </div>
    </div>
    <?php include("foot.php");?>
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
        <?php logoutBlock(); ?>
    </script>
</body>
</html>
