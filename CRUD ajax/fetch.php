<?php
    include("connection.php");
    $query = "select * from sei_course";
    $statement = $conn->prepare($query);
    $statement->execute();
    $result = $statement->fetchAll();
    $total_row = $statement->rowCount();
    $output = '
    <table class="table table-striped table-bordered">
        <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Start Time</th>
            <th>Duration(Weeks)</th>
            <th>Start date</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    ';
    if($total_row > 0){
        foreach($result as $row){
            $output .= '
            <tr>
                <td>'.$row["C_ID"].'</td>
                <td>'.$row["name"].'</td>
                <td>'.$row["time"].'</td>
                <td>'.$row["weeks"].'</td>
                <td>'.$row["start"].'</td>
                <td>
                    <button type="button" name="edit" class="btn btn-info btn-xs edit" id="'.$row["C_ID"].'">Edit</button>
                </td>
                <td>
                    <button type="button" name="delete" class="btn btn-danger btn-xs delete" id="'.$row["C_ID"].'">Delete</button>
                </td>
            </tr>
                ';
        }
    }else{
       $output .= '
       <tr>
            <td colspan="4" align="center">Data not found</td>
       </tr>
       ';
    }
    $output .= '</table>';
    echo $output;
    
?>