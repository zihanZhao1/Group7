<?php
session_start();
require_once('database.php');

function getDateForSpecificDayBetweenDates($startDate,$endDate,$day_number){
    $endDate = strtotime($endDate);
    $days=array('1'=>'Monday','2' => 'Tuesday','3' => 'Wednesday','4'=>'Thursday','5' =>'Friday','6' =>     'Saturday','7'=>'Sunday');
    for($i = strtotime($days[$day_number], strtotime($startDate)); $i <= $endDate; $i = strtotime('+1 week', $i))
        $date_array[]=date('Y-m-d',$i);

    return $date_array;
}

if (isset($_POST["operate"]) && $_POST["operate"] == "addCourse") {
    $name = $_POST["name"];
    $fid = $_POST["fid"];
    $sdate = $_POST["sdate"];
    $edate = $_POST["edate"];
    $stime = $_POST["stime"];
    $etime = $_POST["etime"];
    $week = $_POST["week"];
    $query="insert into sei_course(C_ID,name,F_ID,start_date,end_date,start_time,end_time,week) values(default,'$name','$fid','$sdate','$edate','$stime','$etime','$week')";
    $statement = $pdo->prepare($query);
    $statement->execute();
	$cid = $pdo->lastInsertId();
    $arr = getDateForSpecificDayBetweenDates($sdate,$edate,$week);

    foreach($arr as $key => $value){
        $start_datetime = $arr[$key]." ".$_POST["stime"].":00";
        $end_datetime = $arr[$key]." ".$_POST["etime"].":00";
        $fname = $pdo->query("select name from sei_facility where F_ID = '$fid' ")->fetch(PDO::FETCH_ASSOC);
        if($fname == 'Athletics Track'){
            $query1="insert into sei_booking(U_ID,F_ID,C_ID,start,end,count,Avb) values('8888','$fid','$cid','$start_datetime','$end_datetime ',20,'no')";
			echo $query1;
            $statement1 = $pdo->prepare($query1);
            $statement1->execute();
        }else{
            $fnum = $pdo->query("select capability from sei_facility where F_ID = '$fid' ")->fetch(PDO::FETCH_ASSOC);
            $num = implode("",$fnum);
            $query2="insert into sei_booking(U_ID,F_ID,C_ID,start,end,count,Avb) values('8888','$fid','$cid','$start_datetime','$end_datetime','$num','yes')";
            $statement2 = $pdo->prepare($query2);
            $statement2->execute();
        }
    }
    echo 'Course inserted...';
}


if (isset($_POST["operate"]) && $_POST["operate"] == "showCourse") {
    $id = $_POST['nameID'];
    $sql = "Select * from sei_course where C_ID='$id'";
    $result = $pdo->query($sql);
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo json_encode($row);
    }
}

if (isset($_POST["operate"]) && $_POST["operate"] == "editCourse") {
    $C_ID = $_POST["nameID"];
    $name = $_POST["name"];
    $fid = $_POST["fid"];
    $sdate = $_POST["sdate"];
    $edate = $_POST["edate"];
    $stime = $_POST["stime"];
    $etime = $_POST["etime"];
    $week = $_POST["week"];
    
    $query = "UPDATE sei_course SET name = '$name',F_ID = '$fid',start_date = '$sdate',end_date = '$edate',start_time = '$stime', end_time = '$etime', week = '$week' WHERE C_ID = '$C_ID'";
    $statement = $pdo->prepare($query);
    $statement->execute();

            $query1 = "DELETE FROM sei_booking WHERE C_ID = '$C_ID'";
            $statement1 = $pdo->prepare($query1);
            $statement1->execute();

            $arr = getDateForSpecificDayBetweenDates($sdate,$edate,$week);

            foreach($arr as $key => $value) {
                $start_datetime = $arr[$key]." ".$_POST["stime"].":00";
                $end_datetime = $arr[$key]." ".$_POST["etime"].":00";
                $fname = $pdo->query("select name from sei_facility where F_ID = '$fid' ")->fetch(PDO::FETCH_ASSOC);
                if($fname == 'Athletics Track'){
                    $query2 = "insert into sei_booking (U_ID,F_ID,C_ID,start,end,count,Avb) values('8888','$fid', ' $C_ID','$start_datetime','$end_datetime','20','no')";
                    $statement2 = $pdo->prepare($query2);
                    $statement2->execute();
                }else{
                    $fnum = $pdo->query("select capability from sei_facility where F_ID = '$fid' ")->fetch(PDO::FETCH_ASSOC);
                    $num = implode("",$fnum);
                    $query3 = "insert into sei_booking (U_ID,F_ID,C_ID,start,end,count,Avb) values('8888','$fid', ' $C_ID','$start_datetime','$end_datetime','$num','yes')";
                    $statement3 = $pdo->prepare($query3);
                    $statement3->execute();
                }
            }
    echo 'Course updated...';
}


if (isset($_POST['delete_mul'])) {
    $numberOfCheckbox = count($_POST['checkboxes']);
    $i = 0;
    while ($i < $numberOfCheckbox) {
        $keyToDelete = $_POST['checkboxes'][$i];
        $row = $pdo->query("DELETE  FROM sei_course WHERE C_ID = '$keyToDelete';");
        $i++;
    }
    if ($row) {
        echo "<script>alert('success')
    {window.location.href ='course.php';}</script>";
    } else {
        echo "<script>alert('fail')
    {window.location.href ='course.php;}</script>";
    }
}
?>
			