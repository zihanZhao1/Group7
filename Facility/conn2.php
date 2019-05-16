<html>
<body>
<?php
$servername = "mysql.dur.ac.uk";
$username = "jvlb22";
$password = "w98hen";
$dbname="Cjvlb22_SE";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      echo"successfully"  ;
 }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }


?>
</body>
</html>
