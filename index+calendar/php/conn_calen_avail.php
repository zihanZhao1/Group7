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

$sql = "select * from sei_facility where F_ID=$Fid;";
$statement = $pdo->query($sql);
$f = $statement->fetch(PDO::FETCH_ASSOC);
$maxCap = $f['capability'];
$remain = array();
$num = 0;

if (isset($_GET['date'])) {
    $_SESSION['date'] = $_GET['date'];
}

if (isset($_GET['num'])) {
    $num = $_GET['num'];
    $maxCap = $maxCap-$num;
}

$date = $_SESSION['date'];
$takenNum = array();

$sql = "select * from sei_booking where F_ID=$Fid;";
$statement = $pdo->query($sql);
$start = new DateTime();
$end = new DateTime();

while ($booking = $statement->fetch(PDO::FETCH_ASSOC)) {
    $start = $booking['start'];
//        echo "test".$start;
    if ($booking['Avb']=='Yes'&&isSameDays($start, $date)) {
        $end = $booking['end'];
        $startHour = (int)strtotime($start) % 86400 / 3600 + 2;
        $endHour = (int)strtotime($end) % 86400 / 3600 + 2;
        for ($i = $startHour; $i < $endHour; $i++) {
            $takenNum[$i] = $takenNum[$i] + $booking['count'];
        }
    }
}

//    echo json_encode($remainNum);

for ($i = 7; $i < 23; $i++) {
    $remainNum = $maxCap - $takenNum[$i];
    if ($i < 10) {
        $temp['start'] = $date . " 0$i:00:00";
        if ($i + 1 == 10) {
            $temp['end'] = $date . " 10:00:00";
        } else {
            $end = $i + 1;
            $temp['end'] = $date . " 0$end:00:00";
        }
    } else {
        $end = $i + 1;
        $temp['start'] = $date . " $i:00:00";
        $temp['end'] = $date . " $end:00:00";
    }

    $temp['title'] = $remainNum;
//        $temp['allDay'] = false;
    array_push($remain, $temp);

}

echo "<form>";
echo "<h3>$date</h3>";
foreach ($remain as $r) {
    if ($r['title'] > 0) {
        if($num!=0){
            echo "<p><input type='checkbox' id='book'>" . $r['start'] . ' - ' . $r['end']."</input></p>";
        }
        else{
            echo "<p><input type='checkbox' id='book'>" . $r['start'] . ' - ' . $r['end'] . '  ' . "Remain: " . $r['title'] . "</input></p>";
        }
    }
}
echo "
<input type='submit' value='Submit' class=\"btn btn-primary\">
</form>";

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
