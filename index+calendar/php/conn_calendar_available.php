<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/17
 * Time: 14:43
 */

include 'conn.php';

session_start();
$Fid = $_SESSION['facility'];

$sql = "select * from SEI_Facility where F_ID=$Fid;";
$statement = $pdo->query($sql);
$f = $statement->fetch(PDO::FETCH_ASSOC);
$maxCap = $f['capability'];

$date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_STRING);

if (isset($date)) {
    $_SESSION['date']=$date;
    $fullyBooked = array();
    $remainNum = array();

        $mc = $maxCap;
        $sql = "select * from SEI_Booking where F_ID=$Fid;";
        $statement = $pdo->query($sql);
        $start = new DateTime();
        $end  = new DateTime();

        while ($booking = $statement->fetch(PDO::FETCH_ASSOC)) {
            $start = $booking['start'];
            if(!isDiffDays($start,$date)){
                $end = $booking['end'];
                $startHour = (int)strtotime($start)%86400/3600;
                $endHour = (int)strtotime($end)%86400/3600;
                for($i = $startHour;$i<$endHour;$i++){
                    $remainNum[$i]++;
                }
            }
        }
        echo $remainNum;

//        $temp['start'] = $date;
//        $temp['end'] = $date;
//        $temp['remain'] = "Remain: "+$sum;
//        $temp['backgroundColor'] = "white";
//        array_push($remain, $temp);
//
//    $remain = json_encode($remain);
//    echo $remain;

    header("location:/");
} else {
    include 'conn_calendar.php';
//    echo "fail";
}

//判断两天是否是同一天
function isDiffDays($last_date,$this_date){
    if(($last_date['year']===$this_date['year'])&&($this_date['yday']===$last_date['yday'])){
        return FALSE;
    }else{
        return TRUE;
    }
}
