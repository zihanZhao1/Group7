<html> <!--<![endif]-->
<head>
    <title>DUS News - Durham University</title>
</head>
<?php
include 'conn.php';
require_once 'head_user.php';
?>
<body class="home">
<div class="container-fluid">
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
    <?php require_once 'foot.php'?>
</body>
</html>