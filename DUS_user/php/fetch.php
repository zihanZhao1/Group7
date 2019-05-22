<?php
include("conn.php");
session_start();
$query = "select * from sei_course";
$statement = $pdo->prepare($query);
$statement->execute();
$result = $statement->fetchAll();
$total_row = $statement->rowCount();
$output = '
    <table name="ctable" id="ctable" class="table table-striped table-bordered">
        <tr>
        <th>Course ID</th>
        <th>Course Name</th>
        <th>Facility</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Week</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>
    ';

if ($total_row > 0) {
    $weekday = array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
    foreach ($result as $row) {
        $query1 = "select * from sei_facility where F_ID = '" . $row["F_ID"] . "'";
        $statement1 = $pdo->prepare($query1);
        $statement1->execute();
        $result1 = $statement1->fetch();
        $output .= '
            <tr>
                <td id=' . $row["C_ID"] . '>' . $row["C_ID"] . '</td>
                <td>' . $row["name"] . '</td>
                <td>' . $result1["name"] . '</td>
                <td>' . $row["start_date"] . '</td>
                <td>' . $row["end_date"] . '</td>
                <td>' . $row["start_time"] . '</td>
                <td>' . $row["end_time"] . '</td>
                <td>' . $weekday[$row["week"] - 1] . '</td>
                <td>';

        if (!isset($_SESSION["role"]) || $_SESSION["role"] == "") {
            $output .= "This is available for trainers";
        } elseif ($_SESSION["role"] == "trainer") {
            $output .= '<button type="button" name="edit" class="btn btn-info btn-xs edit" id="' . $row["C_ID"] . '">Edit</button>';
        } elseif ($_SESSION["role"] == "user") {
            $output .= "This is available for trainers";
        }
        $output .= '</td>
                <td>';
        if (!isset($_SESSION["role"]) || $_SESSION["role"] == "") {
            $output .= "This is available for trainers";
        } elseif ($_SESSION["role"] == "trainer") {
            $output .= '<button type="button" name="delete" class="btn btn-danger btn-xs delete" id="' . $row["C_ID"] . '">Delete</button>';
        } elseif ($_SESSION["role"] == "user") {
            $output .= "This is available for trainers";
        }
        $output .= '</td></tr>';
    }
} else {
    $output .= '
        <tr>
            <td colspan="4" align="center">Data not found</td>
        </tr>
        ';
}
$output .= '</table>
    ';

echo $output;
?>
