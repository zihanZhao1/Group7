<html>
    <head>
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/index.css">
        <script src="../js/jquery.min.js"></script>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Our Facilities - Durham University</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>

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
    <body class="home"> 
        <div class="container-fluid">
            <?php include("head.php");?>
            <div id="content" class="row-fluid">
                <div class="span2 pages">
                    <ul>
                        <li class='navcurrent'><h3>Squash Court</h3></li>
                    </ul>
                </div>
                <div class="span10">
                    <?php 
                    include "conn.php";
                    $id = $_GET['id'];
                    $row = $pdo->query("select name,capability,info,price from sei_facility where F_ID = $id")->fetch(PDO::FETCH_ASSOC);
                    $fname = $row['name'];
                    $cap = $row['capability'];
                    $price = $row['price'];
                    $intro = $row['info'];
                    ?>
                    <table class="table table-hover" border= "3" style="width:60%; margin:auto"><img src="../img/Squash-Courts.jpg" alt="Squash-Courts" style="width:170px;height:170px;margin-left:15px;float: right;">
                        <tbody>
                            <tr>
                              <th scope="row">Facility ID</th>
                              <td><?php echo $id; ?></td>
                            </tr>
                            <tr>
                              <th scope="row">Capacity</th>
                              <td><?php echo $cap; ?></td>
                            </tr>
                            <tr>
                              <th scope="row">Price(per hour)</th>
                              <td><?php echo $price; ?></td>
                            </tr>
                            <tr>
                              <th scope="row">Brief Introduction</th>
                              <td><?php echo $intro; ?></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <?php include("foot.php");?>
        </div>
    </body>
</html>