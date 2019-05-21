<?php
include("database.php");
$type = $_POST["type"];
//	
	session_start();
	$role = $_SESSION["role"];
	$email = $_SESSION["userName"];
	if ($role == "admin") {
		
}else{
  ?>
   <script>

    alert('You are not admin！');

	window.location.href="../../user/php/index.php";
   </script>
<?php
}
switch($type)
{
    
	case 0:
		$res=$pdo->query("select B_ID,sei_booking.F_ID,sei_facility.name,start,end,Avb  from sei_booking,sei_facility where Avb = 'no' and sei_booking.F_ID = sei_facility.F_ID;");
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
		$aID=$pdo->query("select U_ID from sei_user where Email = '$email' and role = '$role';");
			$res = $aID->fetch();
			$adminID = $res[0];
		$pdo->query("INSERT INTO `sei_booking` (`B_ID`, `U_ID`, `F_ID`, `E_ID`, `C_ID`, `start`, `end`, `count`, `Avb`) VALUES (default,'$adminID','$F_ID', NULL, Null, '$start', '$end', 0, 'no');");
		echo "successfully added!";;
		break;
	
    default:
        echo "";        
}
?>