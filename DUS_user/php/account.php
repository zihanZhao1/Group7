<?php
 include_once "head.php";

   $msg="";
   require"conn.php";

   if (isset($_POST['submit']))
   {
      $newName=$_POST["newName"];
      $newPassword=$_POST["newPassword"];
      $newContactNumber=$_POST["newContactNumber"];
      $userName=$_SESSION['userName'];



      if ($newName!="")
        {  $sqlupdateText="UPDATE SEI_User SET name ='$newName'WHERE email='$userName'";
          $sql=$pdo->query($sqlupdateText);}

      if($newPassword!=""){
        $hashedPassword=password_hash($newPassword,PASSWORD_BCRYPT);
        $sqlupdateText="UPDATE SEI_User SET password='$hashedPassword' WHERE email='$userName'";
        $sql=$pdo->query($sqlupdateText);}

      if($newContactNumber==""){
        $sqlupdateText="UPDATE SEI_User SET tel='$newContactNumber' WHERE email='$userName'";
        $sql=$pdo->query($sqlupdateText);}


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

        <form action="account.php" method="post">
          <h1 style="color:#742e68;"> Security</h1>
          <p></p>
          <hr>
                <p align="left"><b>New Name :</b>
                <input style="height:30px;"  class="form-control" type="text" placeholder="Enter New Name..." name="newName">
                </p>

                <p align="left"><b>New Password:</b>
                <input style="height:30px;"  class="form-control" type="password" placeholder="Enter New Password..." name="newPassword" >
                </p>

                <p align="left"><b>New Contact Number:</b>
                <input style="height:30px;"  class="form-control" type="number" placeholder="Enter Password" name="newContactNumber" >
                </p>

                <br>
                <br>
                <button type="submit" class="btn btn-primary" name="submit" >Save</button>


            </p>
                  <?php if ($msg != "") echo $msg . "<br><br>" ?>
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
