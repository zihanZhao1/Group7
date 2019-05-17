<?php
include("php/connection.php");
?>
<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Our Facilities - Durham University</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="css/team-durham.css" type="text/css">
    <link rel="stylesheet" href="css/index.css" type="text/css">
    <link rel="stylesheet" href="css/style.css" type="text/css">
    <script src="js/jquery.min.js"></script>
    <script>
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    </script>
</head>

<body class="home">
<!--  -->
<div class="container-fluid">
    <div id="header" class="row-fluid">
        <div class="span12">
            <h1>
                <a href="/" class="pull-right">
                    <img width="140" src="img/durham-university-logo-white.png" alt="Durham University"
                         class="durham-university-logo">
                </a>
                <a href="/" class="pull-left">
                    <img src="img/teamdurham.png" alt="Team Durham" class="team-durham-logo"/>
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
                <li><a href="index.php">Facilities</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="course.html">Courses</a></li>
                <li><a href="calendar.html">Calendar</a></li>
                <li><a href="Booking.html">Booking</a></li>
                <li><a href="help.html">Help</a></li>
            </ul>
        </div>
    </div>

    <div class="container">
        <div class="first-box">
            <p>Booking Now</p>
            <form name="f" method="post">
                <label>Email: </label>
                <input type="email" name="email" style="margin-left: 20px;"><br>
                <label>Facility: </label>
                <?php
                $result = $conn->query("select F_ID, name from sei_facility");

                echo " <select name='facility' style='margin-left: 20px;'>";

                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    unset($id, $name);
                    $id = $row['F_ID'];
                    $name = $row['name'];
                    echo '<option style="display:none;"></option>';
                    echo '<option value="' . $id . '">' . $id . ',' . $name . '</option>';
                }
                echo "</select>";
                ?><br>
                <label>Date: </label>
                <input type="date" name="date" id="cdate" style="margin-left: 20px;"><br>
                <label>Start Time: </label>
                <select name="stime" style="margin-left: 20px;">
                    <option selected="selected" style='display: none' value=''></option>
                    <option>09:00:00</option>
                    <option>10:00:00</option>
                    <option>11:00:00</option>
                    <option>12:00:00</option>
                    <option>13:00:00</option>
                    <option>14:00:00</option>
                    <option>15:00:00</option>
                    <option>16:00:00</option>
                    <option>17:00:00</option>
                    <option>18:00:00</option>
                    <option>19:00:00</option>
                    <option>20:00:00</option>
                </select><br>
                <label>End Time:</label>
                <select name="etime" style="margin-left: 20px;">
                    <option selected="selected" style='display: none' value=''></option>
                    <option>10:00:00</option>
                    <option>11:00:00</option>
                    <option>12:00:00</option>
                    <option>13:00:00</option>
                    <option>14:00:00</option>
                    <option>15:00:00</option>
                    <option>16:00:00</option>
                    <option>17:00:00</option>
                    <option>18:00:00</option>
                    <option>19:00:00</option>
                    <option>20:00:00</option>
                    <option>21:00:00</option>
                </select><br>
                <input type="submit" name="submit" value="Confirm" onclick="return validateForm();"
                       class="btn btn-primary" style="margin-left: 20px;"><br>
                <p1 style='margin-left: 20px;'>Please make sure the number of players is lower than capacity.</p1>
                <?php include("php/bookingserver.php") ?>
            </form>
        </div>
    </div>

    <script>
        function validateForm() {
            var a = document.forms["f"]["email"].value;
            var b = document.forms["f"]["facility"].value;
            var c = document.forms["f"]["date"].value;
            var d = document.forms["f"]["stime"].value;
            var e = document.forms["f"]["etime"].value;

            if (a == "") {
                alert("Email must be filled out");
                return false;
            } else if (b == "") {
                alert("You have to choose a facility");
                return false;
            } else if (c == "") {
                alert("Date must be filled out");
                return false;
            } else if (d == "") {
                alert("Start time must be filled out");
                return false;
            } else if (e == "") {
                alert("End time must be filled out");
                return false;
            } else {
                confirm("Succussfully booked!The email of details of your booking has been send to you.");
                document.f.submit();
            }
        }

        $(function () {
            var date_now = new Date();

            var year = date_now.getFullYear();

            var month = date_now.getMonth() + 1 < 10 ? "0" + (date_now.getMonth() + 1) : (date_now.getMonth() + 1);

            var date = date_now.getDate() < 10 ? "0" + date_now.getDate() : date_now.getDate();

            $("#cdate").attr("min", year + "-" + month + "-" + date);
        })

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