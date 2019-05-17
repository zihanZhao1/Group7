<?php                                 
    include("connection.php");
?>
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Our Facilities - Durham University</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="css/index.css" type="text/css">
        <link rel="stylesheet" href="css/style.css" type="text/css">       
        <script src="js/jquery.min.js"></script>  
        <script> 
            if ( window.history.replaceState ) {
                window.history.replaceState( null, null, window.location.href );
            }
        </script>
    </head>
    <body  class="home">
	<div class="container-fluid">
		<div id="header" class="row-fluid">
            <div class="span12">
		      <h1>
                  <a href="/" class="pull-right">
				    <img width="140" src="img/durham-university-logo-white.png" alt="Durham University" class="durham-university-logo">
                  </a>
                  <a href="/" class="pull-left">
                      <img src="img/teamdurham.png" alt="Team Durham" class="team-durham-logo" />
                  </a>
                  <a href="/" class="team-durham-slogan">
                      <span class="light">Durham University</span><br/>Sport<br/><br/>
                      <span class="slogan">Enabling Exceptional People to do Exceptional Things</span>
                  </a>
                </h1>
            </div>
        </div>	
        <div id="navigation" class="row-fluid">
            <div class="span12">
                <ul class="nav nav-pills">
                    <li><a href="#0">Home</a></li>
                    <li><a href="#1">Facilities</a></li>
                    <li><a href="#2">Courses</a></li>
                    <li><a href="#3">Calendar</a></li>
                    <li><a href="#4">Help</a></li>
                    <li><a href="#5">About Us</a></li>
                </ul>
            </div>
        </div>	
        <div class="container">

            <div class="first-box">
                <p>Booking Now</p>
                <form id="f" method="post">
                    <label>Email: </label>
                    <input type="email" name="email" style="margin-left: 20px;"><br>
                    <label>Facility: </label>
                    <?php
                        $result = $conn->query("select F_ID, name from sei_facility");
                       
                        echo " <select id='facility' name='facility' style='margin-left: 20px;'>";

                        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                            unset($id, $name);
                            $id = $row['F_ID'];
                            $name = $row['name']; 
                            echo '<option style="display:none;"></option>';
                            echo '<option value="'.$id.'">'.$id.','.$name.'</option>';
                        }
                        echo "</select>";
                    ?><br>
                    <label>Date: </label>
                    <input type="date" name="date" id="cdate" style="margin-left: 20px;"><br>
                    <label>Start Time: </label>
                    <input type="time" id="stime" name="stime" style="margin-left: 20px;">
                    <label>End Time:</label>
                    <input type="time" id="etime" name="etime" style="margin-left: 20px;"><br>
                    <input type="button" name="confirm" id="confirm" value="Confirm" class="btn btn-primary" style="margin-left: 20px;"><br>
                    <?php include("bookingserver.php")?>
                </form>
            </div>
        </div>
            
        <script>
            $("#confirm").click(validateForm);
            function validateForm() {
                var a = document.forms["f"]["email"].value;
                var b = document.forms["f"]["facility"].value;
                var c = document.forms["f"]["date"].value;
                var d = document.forms["f"]["stime"].value;
                var e = document.forms["f"]["etime"].value;
                
                if (a == "") {
                    alert("Email must be filled out");
                    return false;
                }else if(b == "") {
                    alert("You have to choose a facility");
                    return false;
                }else if (c == "") {
                    alert("Date must be filled out");
                    return false;
                }else if (d == "") {
                    alert("Start time must be filled out");
                    return false;
                }else if (e == "") {
                    alert("End time must be filled out");
                    return false;
                }
                timeCheck();
            }
            
            function timeCheck(){
                var date = $("input#cdate").val();
                var s_time = $("input#stime").val();
                var e_time = $("input#etime").val();
                var f_id = $("select#facility").val();
                $.ajax({
                    url:'timeCheck.php',
                    type:"POST",
                    data:{date,s_time,e_time,f_id},
                    success:function(rep){
                        if(rep == "OK"){
                            confirm("Succussfully booked!The email of details of your booking has been send to you.");
                            //document.f.submit();
                            $("#f").submit();
                        }else{
                            alert(rep);
                        }
                    }
                });
            }
            
            $(function(){
                var date_now = new Date();

                var year = date_now.getFullYear();
               
                var month = date_now.getMonth()+1 < 10 ? "0"+(date_now.getMonth()+1) : (date_now.getMonth()+1);
               
                var date = date_now.getDate() < 10 ? "0"+date_now.getDate() : date_now.getDate();
                
                $("#cdate").attr("min",year+"-"+month+"-"+date);
            })
        
            $(document).ready(function(){
               $("#etime").change(function () {
                    var startTime = document.getElementById("stime").value;
                    var endTime = document.getElementById("etime").value;
                    var startDate = new Date('1970-01-01T' + startTime + 'Z');
                    var endDate = new Date('1970-01-01T' + endTime + 'Z');

                    if ((Date.parse(startDate) >= Date.parse(endDate))) {
                        alert("End time should be greater than Start time");
                        document.getElementById("etime").value = "";
                }
        }); 
            });
        </script>
        </div>
        <div class="container-fluid no-border">
            <div id="footer" class="row-fluid">
                <div class="span12">

                </div>
            </div>
        </div>
    </body>
</html>