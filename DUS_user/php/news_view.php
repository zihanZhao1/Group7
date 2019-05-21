<html> <!--<![endif]-->
<head>
    <title>DUS News - Durham University</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/index.css">
    <script src="../js/jquery.min.js"></script>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="../css/team-durham.css" type="text/css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

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
include 'conn.php';
?>
<body class="home">
<div class="container-fluid">
    <?php include 'head.php'?>
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
            <div id="content" class="row-fluid">
                <div class="content">
                    <?php
                    $nID = $_GET['id'];
                    $statement = $pdo->query("select * from sei_news where N_ID = $nID;");
                    $news = $statement->fetch(PDO::FETCH_ASSOC);
                    $n_UID = $news['U_ID'];
                    $nTime = $news['time'];
                    $nContent = $news['content'];
                    $nTitle = $news['title'];
                    echo "<h1>$nTitle</h1>";

                    $author = $pdo->query("select * from sei_user where U_ID = $n_UID;")->fetch(PDO::FETCH_ASSOC);
                    $name = $author['name'];
                    echo "<p>Author: $name</p>";
                    echo "<p>Date:$nTime</p>";
                    echo "<p>$nContent</p>"
                    ?>
                </div>
            </div>
        </div>
    </div>
    </div>
    <?php include 'foot.php'?>
</body>
</html>