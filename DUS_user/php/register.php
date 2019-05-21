<?php
$msg="";
require"conn.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$msg = "";

if (isset($_POST['submit']))
{
    //collect the data with $_POST
    $name=$_POST["name"];
    $email=$_POST["email"];
    $password=$_POST["password"];
    $password1=$_POST["password1"];
    $telNumber=$_POST["telNumber"];

    if ($name == ""|| $email == ""|| $password != $password1)
        $msg="please check your inputs!";
    else{
        $sql = $pdo->query("SELECT U_ID FROM sei_user WHERE email='$email'");
        $num_rows=$sql->rowCount();
        //var_dump($num_rows);
        if($num_rows>0){
            $msg="Email already exists in the database!";
        }else{
            $token='sdlfdkfhgDSJKFAHUS123987!@';
            $token=str_shuffle($token);
            $token=substr($token,0,10);

            $hashedPassword=password_hash($password,PASSWORD_BCRYPT);

            $sql="INSERT INTO sei_user (name,email,password,isEmailConfirmed,token,tel) VALUES(:name,:message,:hashedPassword,'0',:token,:telNumber)";
            $query=$pdo->prepare($sql);
            $query->execute(array(
                ':name' => $name,
                ':message'=> $email,
                ':hashedPassword'=> $hashedPassword,
                ':token'=>$token,
                ':telNumber'=>$telNumber
            ));

            require '../phpmailer/vendor/autoload.php';

            $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
            try {
                //Server settings


                $mail->SMTPDebug = 0;                                 // Enable verbose debug output
                $mail->isSMTP();                                      // Set mailer to use SMTP
                $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
                $mail->SMTPAuth = true;                               // Enable SMTP authentication
                $mail->Username = 'durhamsportteam@gmail.com';                 // SMTP username
                $mail->Password = 'qwer6666';                           // SMTP password
                $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                $mail->Port = 587;                                    // TCP port to connect to

                //Recipients
                $mail->setFrom('durhamsportteam@gmail.com', 'Durham Sport Team');
                $mail->addAddress($email, $name);   // Add a recipient

                //Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'Please verify email!';
                $mail->Body    = "
                          Please click on the link below:<br><br>

                          <a href='http://localhost/dashboard/DUS_user_v1/php/confirm.php?email=$email&token=$token'>Click here</a>";
                if($mail->send())
                    $msg="You have been registered! Please verify your email!";
                else
                    $msg="Erro!Please try again!";

            } catch (Exception $e) {
                echo 'Message could not be sent.';
                echo 'Mailer Error: ' . $mail->ErrorInfo;
            }


        }
    }
}
?>

<html>
<head>
    <title>Register</title>
    <meta charset="UTF-8">
     <link rel="stylesheet" href="../css/index.css" type="text/css">
    <link rel="stylesheet" href="../css/style.css">
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
    <div class="container" style="margin-top:20px; height: 800px;">
        <?php include "head.php"; ?>
        <div class="row justify-content-center">
            <div class="col-md-6 col-md-offset-3" align="center">
                <?php if ($msg != "") echo "<p> <font color=red size='4px'>  $msg . <br><br> </font></p>"; ?>

                <!--  Sign Up form-->
                <form action="register.php"  method="post">
                    <h1 style="color:#742e68;">Register</h1>
                    <p style="color:#742e68;">Please fill in this form to create an account.</p>
                    <hr>
                    <p align="left"><font color="red">*</font><b>Name:</b>
                        <input style="height:30px;" class="form-control"  type="text" placeholder="Enter Name..." name="name" required>
                    </p>
                    <p align="left"><font color="red">*</font><b>Email:</b>
                        <td><input style="height:30px;" class="form-control" type="email" placeholder="Enter Email..." name="email" required>
                    </p>
                    <p align="left"><font color="red">*</font><b>Contact Number:</b>
                        <input style="height:30px;" class="form-control" type="number" placeholder="Enter Contact Number..." name="telNumber" required>
                    </p>
                    <p align="left"><font color="red">*</font><b>Password:</b>
                        <input style="height:30px;" class="form-control" type="password" placeholder="Enter Password..." name="password" required>
                    </p>
                    <p align="left"><font color="red">*</font><b>Repeat Password:</b>
                        <input style="height:30px;" class="form-control" type="password" placeholder="Repeat Password..." name="password1" required>
                    </p>
                    <br>
                    <button type="submit" class="btn btn-primary" name="submit" style="background:#742e68; border:0px;">Register</button>
                    <!--<button type="button" class="btn btn-primary" name="cancel" style="background-color: indigo; border:0px;" >Cancel</button>-->
                </form>
                <p align=left style="font-size:14px">By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>
                <p align=left style="font-size:14px">Already a member? <a href="login.php">Sign in</a></p>

            </div>
        </div>
    </div>
    <?php include "foot.php";?>
</body>
</html>
