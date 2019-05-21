<?php	
	session_start();
	$role = $_SESSION["role"];
	if ($role == "admin") {
		
}else{
  ?>
   <script>

    alert('You are not admin！');

	window.location.href="../../user/php/index.php";
   </script>
<?php
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Calendar</title>

<style type="text/css">
*{margin:0;padding:0;list-style-type:none;}
a,img{border:0;}
body{font:12px/180% Arial, Helvetica, sans-serif, "";}
.container{width:940px;margin:0 auto;}
</style>

<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/fullcalendar.css">
<link rel="stylesheet" href="../css/fullcalendar.print.css" media='print'>


<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="../js/fullcalendar.min.js"></script>
<script type="text/javascript" src="../js/script_Athletics.js"></script>
<script type="text/javascript"> 
<!-- 
function F_jumpMenu(targ,selObj,restore){ //v3.0 
eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'"); 
if (restore) selObj.selectedIndex=0; 
} 
//--> 
</script>
</head>
<body>


<div class="container">
	<div class="content">
		<div class="row-fluid">
			<div class="span12">
				<div class="box">
					<div class="box-head">
						<h3><li><a href="facility.php">Back</a></li></h3>	
					</div>
					<form action="" method="get"> 
					<label> </label> 
					<select name="jumpMenu" id="jumpMenu"
					 onchange="F_jumpMenu('parent',this,0)"> 
					 <option >Athletics Track</option> 
					 <option value="calendar_All.php">ALL</option>
					<option value="Squash_Courts.php">Squash courts</option> 
					<option value="Aerobics_Room.php">Aerobics room</option> 
					<option value="Tennis.php">Tennis</option>  
					</select> 
					</form> 
					<!-- <div id="" > <br/>  </div> -->
					<!--canlendar-->
					<div class="box-content box-nomargin">
						<div class="calendar"></div>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>

<?php
require_once('foot.php');
?>

</body>
</html>
