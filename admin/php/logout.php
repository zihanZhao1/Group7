<?php
    session_start();
    header('Content-type:text/html;charset=utf-8');
    if(isset($_SESSION['userId'])&& $_SESSION['userId']!=''){
            session_unset();//free all session variable
            session_destroy();//Destroy all data in a session
            setcookie(session_name(),'',time()-3600);//Destroy the card number with the client
			?>
			 <script>
			window.location.href="../../user/php/index.php";
			</script>
  <?php
        }
		
?>
			<script>
			window.location.href="../../user/php/index.php";
			</script>