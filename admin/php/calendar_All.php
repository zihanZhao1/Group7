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
<title>calendar</title>
    <meta charset="UTF-8">
    <title>Our Facilities - Durham University</title>
    <link rel="stylesheet" href="../css/fullcalendar_c.css">
    <link rel="stylesheet" href="../css/fullcalendar.print_c.css" media='print'>
    <link rel="stylesheet" href="../css/index_c.css" type="text/css">
    <link rel="stylesheet" href="../css/style_c.css">
    <script src="../js/jquery.min.js"></script>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>
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


<div class="container-fluid" >
<?php
require_once('head_c.php');
?>
	<div class="content">
		<div class="row-fluid">
			<div class="span12">
				<div class="box">
					<div class="box-head">
				<h3>Calendar</h3>				
					</div>
					<form action="manageCalendar.php" method="post"> 
					<label> </label> 
					<select name="jumpMenu" id="jumpMenu"> 
					
					 <option value="0">ALL</option> 
					<option value="1">Squash courts</option> 
					<option value="2">Aerobics room</option> 
					<option value="3">Tennis</option> 
					<option value="4">Athletics track</option> 
					</select> 
					<input type="submit" value="Search!" />
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

<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="../js/fullcalendar.min.js"></script>
<script type="text/javascript" src="../js/script_ALL.js"></script>
</body>
</html>