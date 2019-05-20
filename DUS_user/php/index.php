<html> <!--<![endif]-->
<head>
    <title>Our Facilities - Durham University</title>
</head>

<body class="home">
<div class="container-fluid">

    <?php
    include 'conn.php';
    include 'facility.php';
    require_once 'head_user.php';
    ?>
    <div id="content" class="row-fluid">
        <div class="span3 pages">
            <ul>
                <li class='navcurrent'><h3>News</h3></li>
                <?php
                $statement = $pdo->query('select * from sei_news;');
                while ($n = $statement->fetch(PDO::FETCH_ASSOC)) {
                    $nid = $n['N_ID'];
                    $ntitle = $n['title'];
                    echo "<li class='sideways'><a href='news_view.php?id=$nid'>$ntitle</a></li>";
                }
                ?>
            </ul>
        </div>
        <div class="span9">
            <div class="content">
                <h1>Our Facilities</h1>
                <div id="content173370" class="contentblock contentblock-content-grid-display">
                    <div class="layout_boxed">
                        <?php
                        $statement = $pdo->query("select * from sei_facility;");
                        while ($f = $statement->fetch(PDO::FETCH_ASSOC)) {
                            $fac = new facility($f['F_ID'], $f['name'], $f['info']);
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once 'foot.php' ?>
</div>
</body>
</html>