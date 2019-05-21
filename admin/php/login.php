<?php
	
	
    if(isset($_POST["submit"]))//It only can be executed if "submit" exists
    {
        $username=$_POST["username"];
        $passw=$_POST["password"];
		session_start();
		$_SESSION["userName"]="123@qq.com";
		$_SESSION["role"] ="admin";
	?>
   <script>


	window.location.href="booking.php";
   </script>
<?php
    }
?>