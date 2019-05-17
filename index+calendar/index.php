<?php
include 'php/conn.php';
include 'facility.php'
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

    <div id="content" class="row-fluid">
        <div class="span3 pages">
            <ul>
                <li class='navcurrent'><h3> Our Facilities</h3></li>
                <li class='sideways'><a href="/events/">Events</a></li>
                <li class='sideways'><a href="/facilities/durham/">Maiden Castle</a></li>
                <li class='sideways'><a href="/about/facilities/durham/contactus/">Contact Us</a></li>
            </ul>
            <ul>
                <li class='navcurrent'><h3>News</h3></li>
                <li class='sideways'><a href="/events/">Events</a></li>
                <li class='sideways'><a href="/facilities/durham/">Maiden Castle</a></li>
                <li class='sideways'><a href="/queenscampus/">Queen's Campus</a></li>
                <li class='sideways'><a href="/about/facilities/durham/contactus/">Contact Us</a></li>
            </ul>
        </div>
        <div class="span9">
            <div class="content">
                <h1>Our Facilities</h1>
                <div id="content173370" class="contentblock contentblock-content-grid-display">
                    <div class="layout_boxed">
                        <?php
                        $sql = "select * from SEI_Facility;";
                        $statement = $pdo->query($sql);
                        while ($f = $statement->fetch(PDO::FETCH_ASSOC)) {
                            $fac = new facility($f['F_ID'],$f['name'],$f['info'],$f['url']);
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
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

                <script type="text/javascript" src="//www.dur.ac.uk/js/scripts.min.js"></script>
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
</body>
</html>