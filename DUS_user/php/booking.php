<?php
include("conn.php");
?>
<html>
<head>
    <link rel="stylesheet" href="../css/fullcalendar.css">
    <link rel="stylesheet" href="../css/fullcalendar.print.css" media='print'>
    <link rel="stylesheet" href="../css/index.css" type="text/css">
    <link rel="stylesheet" href="../css/style.css">
    <script src="../js/jquery.min.js"></script>
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
    <?php require_once 'head_user.php' ?>
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
                echo "<h3>Booking $fname</h3>";
                ?>

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

                <form class="date_form">
                    <h4>Date: </h4>
                    <input type="date" name="date" id="date"><br>
                    <input class="btn btn-primary" type="submit" value="View Valid Time" name="date">
                </form>

                <form class="num_form" name="f">
                    <h4>Place for:(how many people)</h4>
                    <input type="number" id="num" name="num"><br>
                    <input type="submit" value="Confirm" class="btn btn-primary"><br>
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
        <h3 align="center">Your bookings</h3>
        <table border="1" width="100%" cellpadding="10" cellspacing="10">
            <tr>
                <td>Facility</td>
                <td>Start</td>
                <td>End</td>
                <td>Count</td>
                <td>Delete</td>
            </tr>
            <?php
            //                $user = $_SESSION['username'];
            $user = 1;
            $res = $pdo->query("SELECT  `B_ID` ,  `start` ,  `end` ,  `count` , sei_facility.name
FROM  `sei_booking` , sei_facility
WHERE sei_booking.U_ID =1
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

<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="../js/fullcalendar.min.js"></script>
<script src="conn_calendar.php"></script>
<script type="text/javascript" src="../js/calendar_mwd.js"></script>
</body>
</html>