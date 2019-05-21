<?php
session_start();
require "functions.php";
?>

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

<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" style="color:#742e68;" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-user-circle" aria-hidden="false" style="font-size: 34px; color:#742e68;"></i>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="login" href="login.php">Log In</a>
            <a class="dropdown-item" id="register" href="register.php">Register</a>
            <a class="dropdown-item" id="logout" style="display:none;" href="logout.php">Log
                Out</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" id="myAccount" style="display:none;" href="account.php">My Account</a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent"  style="height: auto;">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Facilities<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="events.html">Events</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="course.php">Courses</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="help.php">Help</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="aboutus.php">About Us</a>
                </li>
            </ul>
            <form method="post" action="search.php" onsubmit="return checkSearch();" class="form-inline my-2 my-lg-0">
                <input id="search" class="form-control mr-sm-2" type="text" placeholder="Search..." aria-label="Search"
                       style="height: 35px; border-radius:5px; margin-top: 4px;" name="search">

                <select id="column" name="column" class="custom-select"
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
        </div>
    </nav>
<script>
  function checkSearch(){
    if($("#search").val()==""){
      alert("please enter inputs.");
      return false;
    }
    else {
      return true;
    }
  }
    <?php
    var_dump($_SESSION);
    if (isset($_SESSION["userName"])) {
      echo 'document.getElementById("login").style.display="none";';
      echo 'document.getElementById("register").style.display="none";';
      echo 'document.getElementById("logout").style.display="block";';
    }
    ?>
</script>
