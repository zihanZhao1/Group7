<?php
    include("conn.php");
    session_start();

    function getDateForSpecificDayBetweenDates($startDate,$endDate,$day_number){
        $endDate = strtotime($endDate);
        $date_array = array();
        $days=array('1'=>'Monday','2' => 'Tuesday','3' => 'Wednesday','4'=>'Thursday','5' =>'Friday','6' => 'Saturday','7'=>'Sunday');
        for($i = strtotime($days[$day_number], strtotime($startDate)); $i <= $endDate; $i = strtotime('+1 week', $i))
        $date_array[]=date('Y-m-d',$i);

        return $date_array;
    }

    if(isset($_POST["action"])){
        if($_POST["action"] == "insert"){
            
            $arr = getDateForSpecificDayBetweenDates($_POST["sd"],$_POST["ed"],$_POST["wd"]);
            if($arr == null){
                echo "<script>alert('There is no such weekday between the dates you choose');</script>";
                echo "<meta http-equiv='refresh' content='0'>";
            }else{
                $query="insert into sei_course(C_ID,name,F_ID,start_date,end_date,start_time,end_time,week) values('".$_POST["cid"]."','".$_POST["cn"]."','".$_POST["f"]."','".$_POST["sd"]."','".$_POST["ed"]."','".$_POST["st"]."','".$_POST["et"]."','".$_POST["wd"]."')";
                $statement = $pdo->prepare($query);
                $statement->execute();
                
                foreach($arr as $key => $value) {
                    $start_datetime = $arr[$key]." ".$_POST["st"].":00";
                    $end_datetime = $arr[$key]." ".$_POST["et"].":00";

                    $fname = $pdo->query("select name from sei_facility where F_ID = '".$_POST["f"]."' ")->fetch(PDO::FETCH_ASSOC);
                    if($fname == 'Athletics Track'){
                        $query1="insert into sei_booking(U_ID,F_ID,C_ID,start,end,count,Avb) values('".$_SESSION["userId"]."','".$_POST["f"]."','".$_POST["cid"]."','$start_datetime','$end_datetime ',20,'Yes')";
                        $statement1 = $pdo->prepare($query1);
                        $statement1->execute();
                    }else{
                        $fnum = $pdo->query("select capability from sei_facility where F_ID = '".$_POST["f"]."' ")->fetch(PDO::FETCH_ASSOC);
                        $num = implode("",$fnum);
                        $query2="insert into sei_booking(U_ID,F_ID,C_ID,start,end,count,Avb) values('".$_SESSION["userId"]."','".$_POST["f"]."','".$_POST["cid"]."','$start_datetime','$end_datetime','$num','Yes')";
                        $statement2 = $pdo->prepare($query2);
                        $statement2->execute();
                    }
                }
            echo '<p>Course inserted...</p>';
            }
        }
        if($_POST["action"] == "fetch_single"){
            $query = "SELECT * FROM sei_course WHERE C_ID = '".$_POST["id"]."'";
            $statement = $pdo->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll();
            foreach($result as $row)
            {
                $output['cid'] = $row['C_ID'];
                $output['cn'] = $row['name'];
                $output['f'] = $row['F_ID'];
                $output['sd'] = $row['start_date'];
                $output['ed'] = $row['end_date'];
                $output['st'] = $row['start_time'];
                $output['et'] = $row['end_time'];
            }
            echo json_encode($output);
        }
        if($_POST["action"] == "update"){
            
            $arr = getDateForSpecificDayBetweenDates($_POST["sd"],$_POST["ed"],$_POST["wd"]);
            if($arr == null){
                echo "<script>alert('There is no such weekday between the dates you choose');</script>";
                echo "<meta http-equiv='refresh' content='0'>";
            }else{
                $query = "UPDATE sei_course SET name = '".$_POST["cn"]."',F_ID = '".$_POST["f"]."',start_date = '".$_POST["sd"]."',end_date = '".$_POST["ed"]."',start_time = '".$_POST["st"]."', end_time = '".$_POST["et"]."', week = '".$_POST["wd"]."' WHERE C_ID = '".$_POST["hidden_id"]."'";
                $statement = $pdo->prepare($query);
                $statement->execute();

                $query1 = "DELETE FROM sei_booking WHERE C_ID = '".$_POST["hidden_id"]."'";
                $statement1 = $pdo->prepare($query1);
                $statement1->execute();

                foreach($arr as $key => $value) {
                    $start_datetime = $arr[$key]." ".$_POST["st"].":00";
                    $end_datetime = $arr[$key]." ".$_POST["et"].":00";
                    $fname = $pdo->query("select name from sei_facility where F_ID = '".$_POST["f"]."' ")->fetch(PDO::FETCH_ASSOC);
                    if($fname == 'Athletics Track'){
                        $query2 = "insert into sei_booking (U_ID,F_ID,C_ID,start,end,count,Avb) values('".$_SESSION["userId"]."','".$_POST["f"]."', '".$_POST["hidden_id"]."','$start_datetime','$end_datetime','20','yes')";
                        $statement2 = $pdo->prepare($query2);
                        $statement2->execute();
                    }else{
                        $fnum = $pdo->query("select capability from sei_facility where F_ID = '".$_POST["f"]."' ")->fetch(PDO::FETCH_ASSOC);
                        $num = implode("",$fnum);
                        $query3 = "insert into sei_booking (U_ID,F_ID,C_ID,start,end,count,Avb) values('".$_SESSION["userId"]."','".$_POST["f"]."', '".$_POST["hidden_id"]."','$start_datetime','$end_datetime','$num','yes')";
                        $statement3 = $pdo->prepare($query3);
                        $statement3->execute();
                    }
                }
            }
            echo '<p>Data Updated</p>';
        }
        if($_POST["action"] == "delete")
        {
            $query = "DELETE FROM sei_course WHERE C_ID = '".$_POST["id"]."'";
            $statement = $pdo->prepare($query);
            $statement->execute();

            $query1 = "DELETE FROM sei_booking WHERE C_ID = '".$_POST["id"]."'";
            $statement1 = $pdo->prepare($query1);
            $statement1->execute();
            echo '<p>Data Deleted</p>';
        }
    }
?>
