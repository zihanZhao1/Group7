<?php
    include("connection.php");
    if(isset($_POST["action"])){
        if($_POST["action"] == "insert"){
            $query="insert into sei_course(name,time,weeks,start) values('".$_POST["cn"]."','".$_POST["st"]."','".$_POST["d"]."','".$_POST["sd"]."')";
            $statement = $conn->prepare($query);
            $statement->execute();
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
                $output['st'] = $row['time'];
                $output['d'] = $row['weeks'];
                $output['sd'] = $row['start'];
            }
            echo json_encode($output);
        }
        if($_POST["action"] == "update"){
            $query = "UPDATE sei_course SET name = '".$_POST["cn"]."',time = '".$_POST["st"]."',weeks = '".$_POST["d"]."',start = '".$_POST["sd"]."' WHERE C_ID = '".$_POST["hidden_id"]."'";
            $statement = $conn->prepare($query);
            $statement->execute();
            echo '<p>Data Updated</p>';
        }
        if($_POST["action"] == "delete")
        {
            $query = "DELETE FROM sei_course WHERE C_ID = '".$_POST["id"]."'";
            $statement = $conn->prepare($query);
            $statement->execute();
            echo '<p>Data Deleted</p>';
        }
    }    
?>
   