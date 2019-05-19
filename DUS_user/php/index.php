<html> <!--<![endif]-->
<head>
    <title>Our Facilities - Durham University</title>
</head>

<body class="home">
<div class="container-fluid">

    <?php
    include 'conn.php';
    include 'facility.php';
    require_once 'head.html';
    ?>
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
                        $statement = $pdo->query( "select * from sei_facility;");
                        while ($f = $statement->fetch(PDO::FETCH_ASSOC)) {
                            $fac = new facility($f['F_ID'],$f['name'],$f['info']);
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once 'foot.html'?>
</div>
</body>
</html>