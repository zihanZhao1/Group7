<?php
    include("connection.php");
    
    if(isset($_POST["action"])){
        if($_POST["action"] == "insert"){
            $query="insert into sei_course(name,F_ID,start_date,end_date,start_time,end_time) values('".$_POST["cn"]."','".$_POST["f"]."','".$_POST["sd"]."','".$_POST["ed"]."','".$_POST["st"]."','".$_POST["et"]."')";
            $statement = $conn->prepare($query);
            $statement->execute();
            
            $query1="insert into sei_booking(U_ID,F_ID,EC_ID,start_date,end_date,start_time,end_time,price,cap) values('Trainer','".$_POST["f"]."','".$_POST["hidden_id"]."',null,null,'".$_POST["st"]."','".$_POST["et"]."',0,'Full')";
            $statement1 = $conn->prepare($query1);
            $statement1->execute();

           // $query2="update sei_booking set start_date = '$wdate',end_date = '$wdate' where EC_ID = '".$_POST["hidden_id"]."'";
           // $statement2 = $conn->prepare($query1);
           //$statement2->execute();
       
            echo '<p>Course inserted...</p>';
        }
        if($_POST["action"] == "fetch_single"){
            $query = "SELECT * FROM sei_course WHERE C_ID = '".$_POST["id"]."'";
            $statement = $conn->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll();
            foreach($result as $row)
            {
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
            $query = "UPDATE sei_course SET name = '".$_POST["cn"]."',F_ID = '".$_POST["f"]."',start_date = '".$_POST["sd"]."',end_date = '".$_POST["ed"]."',start_time = '".$_POST["st"]."', end_time = '".$_POST["et"]."' WHERE C_ID = '".$_POST["hidden_id"]."'";
            $statement = $conn->prepare($query);
            $statement->execute();
            echo '<p>Data Updated</p>';
        }
        if($_POST["action"] == "delete")
        {
            $query = "DELETE FROM sei_course WHERE C_ID = '".$_POST["id"]."'";
            $statement = $conn->prepare($query);
            $statement->execute();
            
            $query1 = "DELETE FROM sei_booking WHERE EC_ID = '".$_POST["id"]."'";
            $statement1 = $conn->prepare($query);
            $statement1->execute();
            echo '<p>Data Deleted</p>';
        }
    }    
?>
   