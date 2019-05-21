<html> <!--<![endif]-->
<head>
    <meta charset="UTF-8">
    <title>Our Facilities - Durham University</title>
    <link rel="stylesheet" href="../css/index.css" type="text/css">
    <link rel="stylesheet" href="../css/style.css">
    <script src="../js/jquery.min.js"></script>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body class="home">
<div class="container-fluid">

    <?php
    include 'conn.php';
    include 'facility.php';
    include 'head.php';
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
    <?php include 'foot.php' ?>
</div>
</body>
</html>
