<?php
include("database.php");
$type = $_POST["type"];
//
switch($type)
{
	case 0:
		$events=$pdo->query("select SEI_Facility.name,SEI_booking.start,SEI_booking.end from SEI_Facility,SEI_booking where SEI_Facility.F_ID = SEI_booking.F_ID;");
		$res = $events->fetchALL();
		$data = json_encode($res);
        echo $data;
        break;
	case 1:
		$events=$pdo->query("select SEI_Facility.name,SEI_booking.start,SEI_booking.end from SEI_Facility,SEI_booking where SEI_Facility.F_ID = SEI_booking.F_ID AND SEI_Facility.F_ID = 1123;");
		$res = $events->fetchALL();
		$data = json_encode($res);
        echo $data;
        break;
	case 2:
		$events=$pdo->query("select SEI_Facility.name,SEI_booking.start,SEI_booking.end from SEI_Facility,SEI_booking where SEI_Facility.F_ID = SEI_booking.F_ID AND SEI_Facility.F_ID = 1124;");
		$res = $events->fetchALL();
		$data = json_encode($res);
        echo $data;
        break;
	case 3:
		$events=$pdo->query("select SEI_Facility.name,SEI_booking.start,SEI_booking.end from SEI_Facility,SEI_booking where SEI_Facility.F_ID = SEI_booking.F_ID AND SEI_Facility.F_ID = 1125;");
		$res = $events->fetchALL();
		$data = json_encode($res);
        echo $data;
        break;
	case 4:
		$events=$pdo->query("select SEI_Facility.name,SEI_booking.start,SEI_booking.end from SEI_Facility,SEI_booking where SEI_Facility.F_ID = SEI_booking.F_ID AND SEI_Facility.F_ID = 1126;");
		$res = $events->fetchALL();
		$data = json_encode($res);
        echo $data;
        break;
    default:
        echo "";        
}
?>