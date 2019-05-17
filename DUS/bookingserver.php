<?php
    use PHPMailer\PHPMailer\PHPMailer; 
    use PHPMailer\PHPMailer\Exception; 

    if(isset($_POST['submit'])){
        $uid = 1;
        $facility = $_POST['facility'];
        $date = $_POST['date'];
        $stime = $_POST['stime'];
        $etime = $_POST['etime'];

        $result = $conn->query("select price from sei_facility where F_ID = '".$_POST['facility']."'");
        $row = $result->fetch(PDO::FETCH_ASSOC);
        $fprice = $row['price'];

        $start = strtotime($date ." ".$stime );
        $end = strtotime($date ." ".$etime );
        $diff = $end - $start;
        $hours = $diff / ( 60 * 60 );

        $price = $fprice*$hours;

        $sql = "INSERT INTO sei_booking(U_ID,F_ID,EC_ID,start_date,end_date,start_time,end_time,price,cap) VALUES ('$uid','$facility',null,'$date','$date','$stime','$etime','$price',1);";
        $insert = $conn->exec($sql);

        if($insert){

            $row3 = $conn->query("select name from sei_user where U_ID = '$uid'")->fetch(PDO::FETCH_ASSOC);
            $name = $row3['name'];

            $row4 = $conn->query("select name from sei_facility where F_ID = '".$_POST['facility']."'")->fetch(PDO::FETCH_ASSOC);
            $fname = $row4['name'];

            require 'phpmailer/vendor/autoload.php';

            $mail = new PHPMailer(true);                            
            try {                    
                $mail->SMTPDebug = 0;                      
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';                
                $mail->SMTPAuth = true;                     
                $mail->Username = 'gba78769df@gmail.com';               
                $mail->Password = 'mc081229snake'; 
                $mail->SMTPSecure = 'tls';                   
                $mail->Port = 587; 
                $mail->SMTPOptions = array(
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    )
                );
                
                $mail->setFrom('gba78769df@gmail.com', 'Ce Ma'); 
                $mail->addAddress('gba78769df@gmail.com', 'Ce Ma');   
                $mail->addReplyTo('gba78769df@gmail.com', 'Ce Ma'); 
                
                $body = '<html>
                <body>
                <h2>Booking Details<h2>
                <hr>
                <p>Student Name:'.$name.'</p>
                <p>Student ID:'.$uid.'</p>
                <p>Activity loaction:'.$fname.'</p>
                <p>Date:'.$date.'</p>
                <p>Start Time:'.$stime.'</p>
                <p>End Time:'.$etime.'</p>
                <p>Total Price:'.$price.'</p>
                </body>
                </html>'; 
                //Content 
                $mail->isHTML(true);                                 
                $mail->Subject = 'DUS booking'; 
                $mail->Body = $body; 
                $mail->AltBody = strip_tags($body); 
                $mail->send(); 
                
            } catch (Exception $e) { 
                $sql = "delete from sei_booking where B_ID = '$bid'";
                $conn->exec($sql);
                $message="Fail to book!";
                echo "<script>alert('$message');window.location.href='booking.php';</script>", $mail->ErrorInfo; 
            }  
        }else{
            $message="Fail to book!";
            echo "<script>alert('$message');window.location.href='booking.php';</script>";
        } 
    }else{
        unset($_POST['submit']);
    }
?>