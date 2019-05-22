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
      
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div class="dropdown-divider"></div>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent"  style="height: auto;">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="facility.php">Facilities<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="course.php">Courses</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="calendar_All.php">Calendar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="news.php">News</a>
                </li>
            </ul>
           
        </div>
    </nav>
<script>

    <?php
    var_dump($_SESSION);
    if (isset($_SESSION["userName"])) {
      echo 'document.getElementById("login").style.display="none";';
      echo 'document.getElementById("register").style.display="none";';
      echo 'document.getElementById("logout").style.display="block";';
    }
    ?>
</script>
