<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/17
 * Time: 14:43
 */

error_reporting(0);
include 'conn.php';

session_start();
$Fid = $_SESSION['facility'];

$f = $pdo->query("select * from sei_facility where F_ID=$Fid;")->fetch(PDO::FETCH_ASSOC);
$maxCap = $f['capability'];
$tmpMC = $maxCap;
$num = 0;

if (isset($_GET['date'])) {
    $_SESSION['date'] = $_GET['date'];
}
$date = $_SESSION['date'];

if (isset($_GET['num'])) {
    $_SESSION['num'] = $_GET['num'];
    $num = $_SESSION['num'];
}

if($num>$maxCap){
    echo "<h3>Sorry, our max capability is: ".$tmpMC."</h3>";
    exit();
}

$maxCap = $maxCap - $num;

$sql = "select * from sei_booking where F_ID=$Fid;";
$statement = $pdo->query($sql);
$start = new DateTime();
$end = new DateTime();
$takenNum = array();

while ($booking = $statement->fetch(PDO::FETCH_ASSOC)) {
    $start = $booking['start'];
    if ($booking['Avb'] == 'yes' && isSameDays($start, $date)) {
        $end = $booking['end'];
        $startHour = (int)strtotime($start) % 86400 / 3600 + 2;
        $endHour = (int)strtotime($end) % 86400 / 3600 + 2;
        for ($i = $startHour; $i < $endHour; $i++) {
            $takenNum[$i] = $takenNum[$i] + $booking['count'];
        }
    }
}

//    echo json_encode($remainNum);
$remain = array();
for ($i = 7; $i < 23; $i++) {
    $remainNum = $maxCap - $takenNum[$i];
    $end = $i + 1;
    $temp['start'] = "$i:00:00";
    $temp['end'] = "$end:00:00";
//    }

    $temp['title'] = $remainNum;

//        $temp['allDay'] = false;
    array_push($remain, $temp);
}

echo "<form action='bookingserver.php' method='post'>";
echo "<h3>$date</h3>";

$isNULL = TRUE;
foreach ($remain as $r) {
    if ($r['title'] >= 0) {
        if ($num != 0) {
            $temp = $r['start'] . ' - ' . $r['end'];
            echo "<p><input type='checkbox' name='bookTime[]' value='$temp'>$temp</input></p>";
        } else {
            echo "<p>" . $r['start'] . ' - ' . $r['end'] . '  ' . "Remain: " . $r['title'] . "</p>";
        }
        $isNULL = False;
    }
}
if ($isNULL){
    exit("<h3>Sorry, we don't have enough place for you.<br>Please choose another date.</h3>");
}
if($num!=0){
    echo "<input type='submit' value='Submit' class='btn btn-primary'>";
}

echo "</form>";

function isSameDays($last_date, $this_date)
{
    $last_date = strtotime($last_date);
    $this_date = strtotime($this_date);
    $last_date = date('Y-m-d', $last_date);
    $this_date = date('Y-m-d', $this_date);
    if ($this_date != $last_date) {
        return FALSE;
    } else {
        return TRUE;
    }
}
