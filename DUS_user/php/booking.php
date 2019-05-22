<?php
include("conn.php");
?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Our Facilities - Durham University</title>
    <link rel="stylesheet" href="../css/fullcalendar.css">
    <link rel="stylesheet" href="../css/fullcalendar.print.css" media='print'>
    <link rel="stylesheet" href="../css/index.css" type="text/css">
    <link rel="stylesheet" href="../css/style.css">
    <script src="../js/jquery.min.js"></script>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
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
    <script>
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    </script>
    <script>
        $(document).ready(function () {
            //ready is once all the HTML has loaded
            $(".date_form").on('submit', function (e) {
                e.preventDefault();
                var day = $(".date_form").serialize();
                var url = 'booking_cap.php';
                $.ajax({
                    url: url,
                    data: day,
                    method: 'get',
                    success: function (data) {
                        $('.content').html(data);
                    },
                    fail: function fail() {
                        alert("Failed")
                    },
                });
            });

            $(".num_form").on('submit', function (e) {
                e.preventDefault();
                var num = $(".num_form").serialize();
                var url = 'booking_cap.php';
                $.ajax({
                    url: url,
                    data: num,
                    method: 'get',
                    success: function (data) {
                        $('.content').html(data);
                    },
                    fail: function fail() {
                        alert("Failed")
                    },
                });
            });
        })
    </script>
</head>

<body class="home">
<div class="container-fluid">
    <?php require_once 'head.php';
    if (!isset($_SESSION['userId'])) {
        echo "<script> alert('Please login'),window.location.href='login.php'</script>";
    }
    ?>
    <div id="content" class="row-fluid">
        <div class="span4 pages">
            <div style="margin-left: 20px">
                <?php
                //                if($_SESSION==null){
                //                    header("location:login.php");
                //                }
                //                echo $_SESSION['name'];
                //                    if ($_GET["id"] == null) {
                //                        header("location: index.php");
                //                    }
                $Fid = $_GET["id"];
                $_SESSION['facility'] = $Fid;
                $sql = "select * from sei_facility where F_ID = $Fid;";
                $statement = $pdo->query($sql);
                $f = $statement->fetch(PDO::FETCH_ASSOC);
                $fname = $f['name'];
                $maxCap = $f['capability'];
                echo "<h3>Booking $fname</h3><br>";
                ?>

                <form class="date_form">
                    <h4>Date: </h4>
                    <input type="date" name="date" id="date"><br>
                    <input class="btn btn-primary" type="submit" value="View Valid Time" name="date">
                </form>

                <form class="num_form" name="f">
                    <h4>Place for:(how many people)</h4>
                    <input type="number" id="num" name="num"><br>
                    <input type="submit" value="Confirm" class="btn btn-primary">
                </form>
            </div>
        </div>

        <div class="span8 extra">
            <div class="container" style="width: auto; height: auto">
                <div class="content">
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="box">
                                <div class="box-head">
                                    <h2>My Bookings</h2>

                                    <form class="booking_form">
                                        <select name="id">
                                            <option value="0">View All</option>
                                            <option value="1123">Squash Courts</option>
                                            <option value="1124">Aerobics Room</option>
                                            <option value="1125">Tennis</option>
                                            <option value="1126">Athletics Track</option>
                                        </select>
                                        <input class="btn btn-primary" type="submit" value="View My Bookings">
                                    </form>

                                </div>
                                <div class="box-content box-nomargin">
                                    <div class="calendar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h3 align="center">Your bookings record</h3>
        <table border="1" width="100%" cellpadding="10" cellspacing="10">
            <tr>
                <td>Facility</td>
                <td>Start</td>
                <td>End</td>
                <td>Count</td>
                <td>Delete</td>
            </tr>
            <?php
            $user = $_SESSION['userId'];
            //            $user = 1;
            $res = $pdo->query("SELECT  `B_ID` ,  `start` ,  `end` ,  `count` , sei_facility.name
            FROM  `sei_booking` , sei_facility
            WHERE sei_booking.U_ID =$user
            AND sei_facility.F_ID = sei_booking.F_ID;");
            foreach ($res as $row) {
                echo "<tr>";
                echo "<td>" . $row["name"] . "</td>";
                echo "<td>" . $row["start"] . "</td>";
                echo "<td>" . $row["end"] . "</td>";
                echo "<td>" . $row["count"] . "</td>";
                echo "<td><button type='button' class='btn btn-primary'><a href='delete_booking.php?id={$row['B_ID']}'>Delete</a></button ></td>";
            }
            ?>
        </table>

    </div>
</div>
<?php require_once 'foot.php' ?>
<script>
    $(document).ready(function(){
        $('#d').on('submit',function(event){
            event.preventDefault();
            var error_d = '';

            if($('#date').val()==''){
                error_d = 'Date is required';
                $('#error_d').text(error_d);
                $('#date').css('border-color','#cc0000');
            }else{
                error_d = '';
                $('#error_d').text(error_d);
                $('#date').css('border-color','');
            }
        });

        $('#f').on('submit',function(event){
            event.preventDefault();
            var error_n = '';

            if($('#num').val()==''){
                error_n = 'Number of players is required';
                $('#error_n').text(error_n);
                $('#num').css('border-color','#cc0000');
            }else{
                error_n = '';
                $('#error_n').text(error_n);
                $('#num').css('border-color','');
            }
        });
    });
</script>
<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="../js/fullcalendar.min.js"></script>
<script src="conn_calendar.php"></script>
<script type="text/javascript" src="../js/calendar_mwd.js"></script>
</body>
</html>
