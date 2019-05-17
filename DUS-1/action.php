<?php
    include("connection.php");

    function getDateForSpecificDayBetweenDates($startDate,$endDate,$day_number){
        $endDate = strtotime($endDate);
        $days=array('1'=>'Monday','2' => 'Tuesday','3' => 'Wednesday','4'=>'Thursday','5' =>'Friday','6' => 'Saturday','7'=>'Sunday');
        for($i = strtotime($days[$day_number], strtotime($startDate)); $i <= $endDate; $i = strtotime('+1 week', $i))
        $date_array[]=date('Y-m-d',$i);

        return $date_array;
    }

    if(isset($_POST["action"])){
        if($_POST["action"] == "insert"){
            
            $query="insert into sei_course(C_ID,name,F_ID,start_date,end_date,start_time,end_time,week) values('".$_POST["cid"]."','".$_POST["cn"]."','".$_POST["f"]."','".$_POST["sd"]."','".$_POST["ed"]."','".$_POST["st"]."','".$_POST["et"]."','".$_POST["wd"]."')";
            $statement = $conn->prepare($query);
            $statement->execute();
            
            $arr = getDateForSpecificDayBetweenDates($_POST["sd"],$_POST["ed"],$_POST["wd"]);
            
            
            foreach($arr as $key => $value) { 
                $query1="insert into sei_booking(U_ID,F_ID,EC_ID,start_date,end_date,start_time,end_time,price,cap) values('Trainer','".$_POST["f"]."','".$_POST["cid"]."','$arr[$key]','$arr[$key]','".$_POST["st"]."','".$_POST["et"]."',0,'Full')";
                echo $query1;
                $statement1 = $conn->prepare($query1);
                $statement1->execute();
            } 
            echo '<p>Course inserted...</p>';
        }
        if($_POST["action"] == "fetch_single"){
            $query = "SELECT * FROM sei_course WHERE C_ID = '".$_POST["id"]."'";
            $statement = $conn->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll();
            foreach($result as $row)
            {
                $output['cid'] = $row['C_ID'];
                $output['cn'] = $row['name'];
                $output['f'] = $row['F_ID'];
                $output['sd'] = $row['start_date'];
                $output['ed'] = $row['end_date'];
                $output['wd'] = $row['week'];
                $output['st'] = $row['start_time'];
                $output['et'] = $row['end_time'];
            }
            echo json_encode($output);
        }
        if($_POST["action"] == "update"){
            $query = "UPDATE sei_course SET name = '".$_POST["cn"]."',F_ID = '".$_POST["f"]."',start_date = '".$_POST["sd"]."',end_date = '".$_POST["ed"]."',start_time = '".$_POST["st"]."', end_time = '".$_POST["et"]."' WHERE C_ID = '".$_POST["hidden_id"]."'";
            $statement = $conn->prepare($query);
            $statement->execute();
            
            $query1 = "DELETE FROM sei_booking WHERE EC_ID = '".$_POST["hidden_id"]."'";
            $statement1 = $conn->prepare($query1);
            $statement1->execute();
            
            $arr = getDateForSpecificDayBetweenDates($_POST["sd"],$_POST["ed"],$_POST["wd"]);
            
            foreach($arr as $key => $value) { 
                $query2 = "insert into sei_booking(U_ID,F_ID,EC_ID,start_date,end_date,start_time,end_time,price,cap) values('Trainer','".$_POST["f"]."','".$_POST["hidden_id"]."','$arr[$key]','$arr[$key]','".$_POST["st"]."','".$_POST["et"]."',0,'Full')";
                $statement2 = $conn->prepare($query2);
                $statement2->execute();
            } 
            echo '<p>Data Updated</p>';
        }
        if($_POST["action"] == "delete")
        {
            $query = "DELETE FROM sei_course WHERE C_ID = '".$_POST["id"]."'";
            $statement = $conn->prepare($query);
            $statement->execute();
            
            $query1 = "DELETE FROM sei_booking WHERE EC_ID = '".$_POST["id"]."'";
            $statement1 = $conn->prepare($query1);
            $statement1->execute();
            echo '<p>Data Deleted</p>';
        }
    }    
?>
   