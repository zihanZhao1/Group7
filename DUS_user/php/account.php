<?php
   $msg="";
   require"conn.php";

   if (isset($_POST['submit']))
   {
      $newName=$_POST["newName"];
      $newPassword=$_POST["newPassword"];
      $newContactNumber=$_POST["newContactNumber"];
      $userName=$_SESSION['userName'];



      if ($newName!="")
        {  $sqlupdateText="UPDATE sei_user SET name ='$newName'WHERE email='$userName'";
          $sql=$pdo->query($sqlupdateText);}

      if($newPassword!=""){
        $hashedPassword=password_hash($newPassword,PASSWORD_BCRYPT);
        $sqlupdateText="UPDATE sei_user SET password='$hashedPassword' WHERE email='$userName'";
        $sql=$pdo->query($sqlupdateText);}

      if($newContactNumber==""){
        $sqlupdateText="UPDATE sei_user SET tel='$newContactNumber' WHERE email='$userName'";
        $sql=$pdo->query($sqlupdateText);}


   }
 ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="../css/style.css">
      <link rel="stylesheet" href="../css/index.css">
      <script src="../js/jquery.min.js"></script>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Account - Durham University</title>
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
    <?php include "head.php"; ?>
      <div class="row justify-content-center">
        <div class="col-md-6 col-md-offset-3" align="center">
          <img src="" alt="">
        <br>
        <br>

        <form action="account.php" method="post">
          <h1 style="color:#742e68;">Security</h1>
          <p></p>
          <hr>
                <p align="left"><b>New Name :</b>
                <input style="height:30px;"  class="form-control" type="text" placeholder= "Your current name: <?php echo $_SESSION["name"]?> " name="newName">
                </p>
                <p align="left"><b>New Password:</b>
                <input style="height:30px;"  class="form-control" type="password" placeholder="Please enter your new password! "  name="newPassword" >
                </p>
                <p align="left"><b>New Contact Number:</b>
                <input style="height:30px;"  class="form-control" type="number" placeholder="Your current contact number: <?php echo $_SESSION["tel"]?> "  name="newContactNumber">
                </p>
                <br>
                <button type="submit" class="btn btn-primary" name="submit" >Save</button>
                <?php if ($msg != "") echo $msg . "<br><br>" ?>
            <br>
            <br>
          </form>
         </div>
        </div>
      </div>
      <script> <?php logoutBlock(); ?></script>
<?php include("foot.php");?>
  </body>
</html>
