<?php
include("database.php");
$type = $_POST["type"];
//
switch($type)
{
    
	case 0:
		$res=$pdo->query("select B_ID,sei_booking.F_ID,sei_facility.name,start,end,Avb  from sei_booking,sei_facility where Avb = 'no' and sei_booking.F_ID = sei_facility.F_ID and U_ID = '8888';");
		$result = $res->fetchALL();
		$data = json_encode($result);
        echo $data;
        break;
	case 1:
		$blocks = $_POST["str"];
		$block = explode(",",$blocks);
					
		$num = count($block)-1; 
		for($i=0;$i<$num;$i++){ 
			$pdo->query("DELETE FROM sei_booking where B_ID = '$block[$i]';");
		}
		echo "successfully deleted!";
        break;
	case 2:
		$F_ID = $_POST["F_ID"];
		$start = $_POST["start"];
		$end = $_POST["end"];
		$pdo->query("INSERT INTO `sei_booking` (`B_ID`, `U_ID`, `F_ID`, `E_ID`, `C_ID`, `start`, `end`, `count`, `Avb`) VALUES (default,8888,'$F_ID', NULL, Null, '$start', '$end', 0, 'no');");
		echo "Added successfully!";
		break;
	
    default:
        echo "";        
}
?>