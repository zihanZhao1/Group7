<?php
  //session_start();
  include_once "head_user.php";



  $msg="";
  require"conn.php";
  if (isset($_POST['submit']))
  {
        $email=$_POST["email"];
        $password=$_POST["password"];


        if ($email == ""|| $password == "")
            $msg="please enter your inputs!";
            else{
              $sql = $pdo->query("SELECT U_ID, password,isEmailConfirmed,role FROM SEI_User WHERE email='$email'");
              $num_rows=$sql->rowCount();
              //var_dump($num_rows);
              if($num_rows>0){
                $data = $sql->fetch();
                if(password_verify($password, $data['password'])){
                  if($data['isEmailConfirmed']==0)
                    $msg="Please verify your email!";
                  else{
                      $_SESSION["userName"]=$email;

                      if($data['role']=="admin")
                      //header(logo.php);
                      //admin 登陸頁面
                      //echo "<script> location.replace('http://locahost/Group7/DUS_user/php/admin.php');<script>";
                      $msg="admin homepage";
                      else($data['role']=="trainer"){
                        echo "<script> location.replace('http://locahost/Group7/DUS_user/php/course.php');<script>";
                      }
                      else{
                      $msg="You have been logged in!";
                       //redirectToLoginPage();
                      //header('Location:search.php');
                        //user 登陸頁面
                        //echo "<script> location.replace('http://locahost/Group7/DUS_user/php/facility.php');<script>";
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
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>

  <div class="container" style="margin-top:100px;">
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
if(isset($_SESSION["userName"])){

  echo 'document.getElementById("login").style.display="none";';
  echo 'document.getElementById("register").style.display="none";';
  echo 'document.getElementById("logout").style.display="block";';

}
 ?>
</script>

<?php
 require "foot.php";
 ?>
</body>
</html>
