
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>calendar</title>

<style type="text/css">
*{margin:0;padding:0;list-style-type:none;}
a,img{border:0;}
body{font:12px/180% Arial, Helvetica, sans-serif, "";}
.container{width:940px;margin:0 auto;}
</style>
    <link rel="stylesheet" href="../css/fullcalendar_c.css">
    <link rel="stylesheet" href="../css/fullcalendar.print_c.css" media='print'>
    <link rel="stylesheet" href="../css/index_c.css" type="text/css">
    <link rel="stylesheet" href="../css/style_c.css">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">


<?php
include('head_c.php');
?>
</head>
<body>


<div class="container" style="width: auto; height: auto">
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
