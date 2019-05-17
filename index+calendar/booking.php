<?php
include("php/conn.php");
session_start();
?>
<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Our Facilities - Durham University</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="css/index.css" type="text/css">
    <link rel="stylesheet" href="css/style.css" type="text/css">
    <link rel="stylesheet" href="css/fullcalendar.css">
    <link rel="stylesheet" href="css/fullcalendar.print.css" media='print'>
    <script src="js/jquery.min.js"></script>
    <script>
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    </script>
    <script>
        $(document).ready(function () {
            //ready is once all the HTML has loaded
            $(".date_form").on('submit', function (e) {
                e.preventDefault();
                var param = $(".date_form").serialize();
                console.log(param);
                $.ajax({
                    url: 'php/conn_calendar_available.php',
                    data: param,
                    method: 'post',
                    success: function (date) {
                        // data;
                        $('.date_form').html(date)
                        $('.calendar').html("");
                        var allActivity = date
                        for (var i = 0; i < allActivity.length; i++) {
                            allActivity[i].allDay = false
                        }
                        if ($('.calendar').length > 0) {
                            $('.calendar').fullCalendar({
                                header: {
                                    left: 'prev,next,today',
                                    center: 'title',
                                    right: 'agendaDay'
                                },
                                buttonText: {
                                    today: 'Today'
                                },
                                allDaySlot:false,
                                minTime:7,
                                maxTime:23,
                                editable: false,
                                events: allActivity,
                                defaultView: 'Day',
                            });
                        }
                    },
                    fail: function fail() {
                        alert("Failed");
                    },
                });
            });
        })
    </script>
</head>
<body class="home">
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
                <li><a href="#0">Home</a></li>
                <li><a href="#1">Facilities</a></li>
                <li><a href="#2">Courses</a></li>
                <li><a href="#3">Calendar</a></li>
                <li><a href="#4">Help</a></li>
                <li><a href="#5">About Us</a></li>
            </ul>
        </div>
    </div>

    <div id="content" class="row-fluid">
        <div class="span4 pages">
            <div style="margin-left: 20px">
                <form class="date_form" name="f">
                    <h4>Date: </h4>
                    <input type="date" name="date" id="date"><br>
                    <input class="btn btn-primary" type="submit" name="submit" value="View">
                </form>

                <form name="f" method="post">
                    <?php
                    //                if($_SESSION==null){
                    //                    header("location:login.php");
                    //                }
                    //                echo $_SESSION['name'];
                    if ($_GET["id"] == null) {
                        header("location: index.php");
                    }
                    $Fid = $_GET["id"];
                    $_SESSION['facility'] = $Fid;
                    $sql = "select * from SEI_Facility where F_ID = $Fid;";
                    $statement = $pdo->query($sql);
                    $f = $statement->fetch(PDO::FETCH_ASSOC);
                    $fname = $f['name'];
                    echo "<h3>Booking $fname</h3>";
                    ?>

                    <h4>Start Time: </h4>
                    <input type="time" id="stime" name="stime">

                    <h4>End Time:</h4>
                    <input type="time" id="etime" name="etime"><br>

                    <h4>Place for:(how many people)</h4>
                    <input type="number" id="num" name="num"><br>

                    <input type="submit" name="submit" value="Confirm" onclick="return validateForm();"
                           class="btn btn-primary"><br>

                    <p1 style='margin-left: 20px;'>* Please make sure the number of players is lower than capacity.</p1>
                    <?php include("php/bookingserver.php") ?>
                </form>
            </div>
        </div>

        <div class="span8 extra">
            <div class="container" style="width: auto; height: auto">
                <div class="content">
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="box">
                                <div class="box-head">
                                    <h2>Calendar</h2>
                                </div>
                                <div class="box-content box-nomargin">
                                    <div class="calendar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

        $(document).ready(function () {
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
            <ul class="nav nav-pills">
                <li><a href='https://www.dur.ac.uk/contactform2/?pageid=59579'>Comments &amp; Questions</a></li>
                <li><a href='https://www.dur.ac.uk/about/terms/'>Disclaimer</a></li>
                <li><a href='https://www.dur.ac.uk/about/trading_name/'>Trading Name</a></li>
                <li><a href="https://www.dur.ac.uk/about/cookies/">Cookie usage policy</a></li>
                <li><a href="https://www.dur.ac.uk/ig/dp/privacy/">Privacy Notices</a></li>
                <li class="status">Team Durham is part of Durham University. &nbsp; Updated: 10th May 2019</li>
            </ul>

            <script type="text/javascript">
                var _gaq = _gaq || [];
                if (typeof MAP_ON_PAGE !== 'undefined' && MAP_ON_PAGE) {
                    document.write('<' + 'script src="//maps.google.com/maps/api/js?sensor=false"' + ' type="text/javascript"><' + '/script>');
                }
            </script>

<!--            <script type="text/javascript" src="//www.dur.ac.uk/js/scripts.min.js"></script>-->
            <noscript>
                <iframe src="//www.googletagmanager.com/ns.html?id=GTM-W9Q3S4"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>
            </noscript>
            <script>(function (w, d, s, l, i) {
                    w[l] = w[l] || [];
                    w[l].push({
                        'gtm.start':
                            new Date().getTime(), event: 'gtm.js'
                    });
                    var f = d.getElementsByTagName(s)[0],
                        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                    j.async = true;
                    j.src =
                        '//www.googletagmanager.com/gtm.js?id=' + i + dl;
                    f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-W9Q3S4');</script>
        </div>
    </div>
</div>
</div>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/fullcalendar.min.js"></script>
<script src="php/conn_calendar_available.php"></script>
<script type="text/javascript" src="js/calendar_mwd.js"></script>
</body>
</html>