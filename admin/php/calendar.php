<?php
include("database.php");
session_start();
if(isset($_SESSION['type'])){
	$type = $_SESSION['type'];
}
else{
	$type = 0;
}

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
		$events=$pdo->query("select SEI_Facility.name,SEI_booking.start,SEI_booking.end from SEI_Facility,SEI_booking where SEI_Facility.F_ID = SEI_booking.F_ID AND SEI_Facility.name = 'Squash Courts';");
		$res = $events->fetchALL();
		$data = json_encode($res);
        echo $data;
        break;
	case 2:
		$events=$pdo->query("select SEI_Facility.name,SEI_booking.start,SEI_booking.end from SEI_Facility,SEI_booking where SEI_Facility.F_ID = SEI_booking.F_ID AND SEI_Facility.name = 'Aerobics Room';");
		$res = $events->fetchALL();
		$data = json_encode($res);
        echo $data;
        break;
	case 3:
		$events=$pdo->query("select SEI_Facility.name,SEI_booking.start,SEI_booking.end from SEI_Facility,SEI_booking where SEI_Facility.F_ID = SEI_booking.F_ID AND SEI_Facility.name = 'Tennis';");
		$res = $events->fetchALL();
		$data = json_encode($res);
        echo $data;
        break;
	case 4:
		$events=$pdo->query("select SEI_Facility.name,SEI_booking.start,SEI_booking.end from SEI_Facility,SEI_booking where SEI_Facility.F_ID = SEI_booking.F_ID AND SEI_Facility.name = 'Athletics Track';");
		$res = $events->fetchALL();
		$data = json_encode($res);
        echo $data;
        break;
    default:
        echo "";        
}
?>