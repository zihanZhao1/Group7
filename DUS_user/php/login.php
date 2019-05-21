<?php
  //session_start();
   include 'head.php';
  $msg="";
  require"conn.php";
  if (isset($_POST['submit']))
  {
        $email=$_POST["email"];
        $password=$_POST["password"];


        if ($email == ""|| $password == "")
            $msg="please enter your inputs!";
            else{
              $sql = $pdo->query("SELECT U_ID, password,name,isEmailConfirmed,role,tel FROM sei_user WHERE email='$email'");
              $num_rows=$sql->rowCount();
              //var_dump($num_rows);
              if($num_rows>0){
                $data = $sql->fetch();
                if(password_verify($password, $data['password'])){
                  if($data['isEmailConfirmed']==0)
                    $msg="Please verify your email!";
                  else{
                      $_SESSION["userName"]=$email;
                      $_SESSION["userId"]=$data['U_ID'];
                      $_SESSION["role"] = $data['role'];
                      $_SESSION["name"]=$data['name'];
                      $_SESSION["tel"]=$data['tel'];

                      if($data['role']=="admin")

                      echo '<script> window.location.href="../../admin/php/facility.php";</script>';



                      elseif($data['role']=="trainer"){
                        echo '<script> window.location.href="course.php";</script>';
                      }
                      else{

                      echo '<script> window.location.href="index.php";</script>';
                      }
                    }
                }else
                  $msg="Please check your password!";

              }else{
                $msg="You have not been registered!";
            }
          }
        }




  ?>

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Log In</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/index.css">
    <script src="../js/jquery.min.js"></script>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="../css/team-durham.css" type="text/css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>
    <div class="container">

        <div class="row justify-content-center">
            <div class="col-md-6 col-md-offset-3" align="center">
                <br>
                <br>
                <!--  Sign Up form-->
                <form action="Login.php"  method="post">
                    <h1 style="color:#742e68;">Log In</h1>
                    <p></p>
                    <hr>
                    <p align="left"><font color="red">*</font><b>Email:</b>
                        <input style="height:30px;"  class="form-control" type="email" placeholder="Enter Email..." name="email" required>
                    </p>

                    <p align="left"><font color="red">*</font><b>Password:</b>
                        <input style="height:30px;"  class="form-control" type="password" placeholder="Enter Password..." name="password" required>
                    </p>
                    <br>
                    <br>
                    <button type="submit" class="btn btn-primary" name="submit" >Log In</button>

                    <p><a class="forgot" href="forgotPassword.php" rel="noopener" style="color:#aab8c2; background=transparent">Forgot Password?</a>
                    </p>
                    <?php if ($msg != "") echo $msg . "<br><br>" ?>
                    <br>
                    <br>
                </form>
            </div>
        </div>
    </div>


<script>
<?php
logoutBlock();
 ?>
</script>

<?php include "foot.php"; ?>
</body>
</html>
