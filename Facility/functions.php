<?php

  function generateNewString($len=10){
    $token="fjslgjfJALKNLJKFDNL129";
    $token=str_shuffle($token);
    $token=substr($token,0,$len);

    return $token;
  }

  function redirectToLoginPage(){
    header('Location:login.php');
    exit();
  }

  function sqltodataEvent($sql){

    require"conn.php";
    $query=$conn->query($sql);
    $num_rows=$query->rowCount();
    if($num_rows>0){
      echo "<table style='border: solid 1px black;'>";
      echo "<tr><th>Name</th><th>Start Time</th><th>End Time</th></tr>";

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
      $stmt=$conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
       echo $v;}

       echo "</table>";


    }else {
      echo "Your search query does not match any data!";
    }
  }

  function sqltodataCourse($sql){

    require"conn.php";
    $query=$conn->query($sql);
    $num_rows=$query->rowCount();
    if($num_rows>0){
      echo "<table style='border: solid 1px black;'>";
      echo "<tr><th>Name</th><th>Weeks</th></tr>";

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
      $stmt=$conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
       echo $v;}

       echo "</table>";


    }else {
      echo "Your search query does not match any data!";
    }
  }


  function sqltodataFacility($sql){

    require"conn.php";
    $query=$conn->query($sql);
    $num_rows=$query->rowCount();
    if($num_rows>0){
      echo "<table style='border: solid 1px black;'>";
      echo "<tr><th>Name</th><th>Weeks</th></tr>";

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
      $stmt=$conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
       echo $v;}

       echo "</table>";


    }else {
      echo "Your search query does not match any data!";
    }
  }

  function sqltodataContent($sql){

    require"conn.php";
    $query=$conn->query($sql);
    $num_rows=$query->rowCount();
    if($num_rows>0){
      echo "<table style='border: solid 1px black;'>";
      echo "<tr><th>Name</th><th>Weeks</th></tr>";

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
      $stmt=$conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
       echo $v;}

       echo "</table>";


    }else {
      echo "Your search query does not match any data!";
    }
  }
 ?>
