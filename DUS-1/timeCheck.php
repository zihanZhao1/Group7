<?php 
    include("connection.php");
    if($_POST['f_id'] !== "10004"){
        $sql = "select count(*) from sei_booking where not(start_time > '".$_POST['e_time']."' or end_time < '".$_POST['s_time']."') and F_ID = '".$_POST['f_id']."' and start_date = '".$_POST['date']."' ;";

        $statement = $conn->prepare($sql);
        $statement->execute();
        $check = $statement->fetch(PDO::FETCH_ASSOC);
    
        if($check["count(*)"] == "0"){
            echo "OK";
        }else{
            echo "The time range has been booked!";
        }
    }else{
        $sql1 = "select count(*) from sei_booking where F_ID = '".$_POST['f_id']."' and start_date = '".$_POST['date']."' and start_time = '".$_POST['s_time']."' and end_time = '".$_POST['e_time']."';";
    
        $statement1 = $conn->prepare($sql1);
        $statement1->execute();
        $check1 = $statement1->fetch(PDO::FETCH_ASSOC);
        $count = sizeof($check1);

        if($count <= 20){
            echo "OK";
        }else{
            echo "This facility is not available to book for this date.";
        }
        
    }
    

    
?>