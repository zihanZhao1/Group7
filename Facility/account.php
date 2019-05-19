<?php
 include_once "../php/head.php";


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
          <p></p>
          <hr>
                <p align="left"><font color="red">*</font><b>New Name :</b>
                <input style="height:30px;"  class="form-control" type="text" placeholder="Enter Email" name="newName">
                </p>

                <p align="left"><font color="red">*</font><b>New Password:</b>
                <input style="height:30px;"  class="form-control" type="password" placeholder="Enter Password" name="newPassword" >
                </p>

                <p align="left"><font color="red">*</font><b>New Contact Number:</b>
                <input style="height:30px;"  class="form-control" type="number" placeholder="Enter Password" name="newContactNumber" >
                </p>

                <br>
                <br>
                <button type="submit" class="btn btn-primary" name="submit" >Save</button>

                
            </p>
                  <?php if ($msg != "") echo $msg . "<br><br>" ?>
            <br>
            <br>



  </body>
</html>
