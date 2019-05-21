
<?php
  function logoutBlock(){
    if(isset($_SESSION["userName"])){
      echo 'document.getElementById("login").style.display="none";';
      echo 'document.getElementById("register").style.display="none";';
      echo 'document.getElementById("logout").style.display="block";';
      echo 'document.getElementById("myAccount").style.display="block";';

    }
  }


  function generateNewString($len=10){
    $token="fjslgjfJALKNLJKFDNL129";
    $token1=str_shuffle($token);
    $token2=substr($token1,0,$len);

    return $token2;
  }

  function redirectToLoginPage(){
    header('Location:login.php');
    exit();
  }


  class TableRows extends RecursiveIteratorIterator {
    function __construct($it) {
        parent::__construct($it, self::LEAVES_ONLY);
    }

    function current() {
        return "<td style='width:150px;border:1px solid black;'>" . parent::current(). "</td>";
    }

    function beginChildren() {
        echo "<tr>";
    }

    function endChildren() {
        echo "</tr>" . "\n";
    }
  }
  function sqltodataEvent($sql){

    require"conn.php";
    $query=$pdo->query($sql);
    $num_rows=$query->rowCount();
    if($num_rows>0){
      echo "<table class='table'>";
      echo "<thead class='thead-dark'><tr><th>ID</th><th>Title</th><th>Start Time</th><th>End Time</th></tr><thead>";

      $stmt=$pdo->prepare($sql);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
       echo $v;}

       echo "</table>";


    }else {
      //echo "Your search query does not match any data!";
    }
  }

  function sqltodataCourse($sql){

    require"conn.php";
    $query=$pdo->query($sql);
    $num_rows=$query->rowCount();
    if($num_rows>0){
      echo "<table class='table'>";
      echo "<thead class='thead-dark'><tr><th>ID</th><th>Name</th><th>Weeks</th><th>Times</th><th>Start Times</th></tr><thead>";


      $stmt=$pdo->prepare($sql);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
       echo $v;}

       echo "</table>";


    }else {
      //echo "Your search query does not match any data!";
    }
  }


  function sqltodataFacility($sql){

    require"conn.php";
    $query=$pdo->query($sql);
    $num_rows=$query->rowCount();
    if($num_rows>0){
      echo "<table class='table'>";
      echo "<thead class='thead-dark'><tr><th>ID</th><th>Name</th><th>Capability</th><th>Open Times</th><th>Close Times</th><th>Price</th><th>Image</th><th>Info</th></tr><thead>";


      $stmt=$pdo->prepare($sql);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
       echo $v;}

       echo "</table>";


    }else {
      //echo "Your search query does not match any data!";
    }
  }

  function sqltodataContent($sql){

    require"conn.php";
    $query=$pdo->query($sql);
    $num_rows=$query->rowCount();
    if($num_rows>0){
      echo "<table class='table'>";
      echo "<thead class='thead-dark'><tr><th>ID</th><th>Name</th><th>Times</th><th>Content</th></tr><thead>";

      $stmt=$pdo->prepare($sql);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
       echo $v;}

       echo "</table>";


    }else {
      //echo "Your search query does not match any data!";
    }
  }
 ?>
