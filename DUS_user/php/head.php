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
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="../css/team-durham.css" type="text/css">
    <link rel="stylesheet" href="../css/index.css" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<?php
session_start();
require "functions.php";
?>

<body class="home">
<!--  -->
<!--  -->
<div class="container-fluid">
    <div id="header" class="row-fluid">
        <div class="span12">
            <h1>
                <a href="/" class="pull-right">
                    <img width="140" src="../img/durham-university-logo-white.png" alt="Durham University"
                         class="durham-university-logo">
                </a>
                <a href="/" class="pull-left">
                    <img src="../img/teamdurham.png" alt="Team Durham" class="team-durham-logo"/>
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
                <li><a href="booking.php?id=0">Booking</a></li>
                <li><a href="help.html">Help</a></li>
                <li style="margin-right:auto!important"><a href="help.html">Help</a></li>
                <li style="margin-right:auto!important">
                    <form method="post" action="search.php" class="form-inline mt-2 mt-md-0">

                        <input class="form-control mr-sm-2" type="text" placeholder="Search..." aria-label="Search"
                               style="height: 35px; border-radius:5px; margin-top: 4px;" name="search">

                        <select name="column" class="custom-select"
                                style="border-radius: 5px;margin-top:5px;font-size:12px; height:35px">
                            <option value="select">Select Filter</option>
                            <option value="title">Title</option>
                            <option value="name">Name</option>
                            <option value="date">Date</option>
                            <option value="content">Content</option>
                            <option value="overall">Overall</option>
                        </select>
                        <button type="sumbit" name="submit"
                                style="border-radius: 50px;margin-top: 5px;margin-left: 5px;border-top-width: 1px;padding-top: 5px;padding-bottom: 6px;padding-right: 9px;padding-left: 9px;">
                            <i class="fa fa-search"></i></button>

                    </form>
                </li>
                <li>
                    <div class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle"
                           style="background:#321f20; border:0px; box-shadow:none; webkit-box-shadow:none; margin-top:5px;"
                           href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false">
                            ...
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" id="login" href="login.php">Log In</a>
                            <a class="dropdown-item" id="register" href="register.php">Register</a>
                            <a class="dropdown-item" id="logout" style="display:none;" href="logout.php">Log
                                Out</a>
                            <a class="dropdown-item" id="logout" href="account.php">My Account</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<script>
    <?php
    if (isset($_SESSION["userName"])) {
        echo 'document.getElementById("login").style.display="none";';
        echo 'document.getElementById("logout").style.display="block";';
    }
    ?>
</script>
</body>
</html>