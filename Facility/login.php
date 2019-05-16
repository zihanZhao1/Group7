<?php
  $msg="";
  require"conn.php";
  if (isset($_POST['submit']))
  {
        $email=$_POST["email"];
        $password=$_POST["password"];


        if ($email == ""|| $password == "")
            $msg="please enter your inputs!";
            else{
              $sql = $conn->query("SELECT U_ID, password,isEmailConfirmed FROM SEI_User WHERE email='$email'");
              $num_rows=$sql->rowCount();
              //var_dump($num_rows);
              if($num_rows>0){
                $data = $sql->fetch();
                if(password_verify($password, $data['password'])){
                  if($data['isEmailConfirmed']==0)
                    $msg="Please verify your email!";
                    else{
                      $msg="You have been logged in";
                      //这段要改成login之后的页面
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
        <img src="logo.png"><br><br>
<!--  Sign Up form-->
  <form action="Login.php"  method="post">
    <h1>Log In</h1>
    <p></p>
    <hr>
    <table>
      <tr>
          <td align="left"><font color="red">*</font><b>Email:</b></td>
          <td><input  class="form-control" type="email" placeholder="Enter Email" name="email" required></td>
      </tr>
      <tr>
          <td align="left"><font color="red">*</font><b>Password:</b></td>
          <td><input  class="form-control" type="password" placeholder="Enter Password" name="password" required></td>
      </tr>
            <?php if ($msg != "") echo $msg . "<br><br>" ?>
      <br>
      <br>
      <tr>
        <td><button type="submit" class="btn btn-primary" name="submit" >Log In</button></td>
      </tr>

      </table>
    </form>
  </div>
 </div>
</div>




</body>
</html>
