<?php
session_start();
if(isset($_POST['jumpMenu'])){
	$_SESSION['type'] = $_POST['jumpMenu'];
}
?>
   <script>


	window.location.href="calendar_All.php";
   </script>
<?php
?>