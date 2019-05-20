
<?php
  include_once "head_user.php";
?>
<div class="container-fluid">

  <?php
  require_once "functions.php";
  //var_dump($_POST);

    require"conn.php";

if(count($_POST)>0){
    $search=$_POST['search'];
    $search=filter_var($search,FILTER_SANITIZE_STRING);

    $column=$_POST['column'];
    $column=filter_var($column,FILTER_SANITIZE_STRING);}

if(count($_POST)>0){
      if($column == "" || ($column != "price" && $column !="content" && $column !="date" && $column !="name" && $column !="overall" && $column !="title" ))
        $column = "overall";

      if ($column == "title"){
      $sql="SELECT E_ID,title,start,end_time FROM sei_event WHERE UPPER ($column) LIKE UPPER('%$search%')";
      sqltodataEvent($sql);
      }

      if ($column == "name"){
      $sql="SELECT C_ID,name,weeks,times,start FROM sei_course WHERE UPPER ($column) LIKE UPPER('%$search%')";
      sqltodataCourse($sql);
      }

      if ($column == "name"){
      $sql="SELECT F_ID,name,capability,open,close,price,img,info FROM sei_facility WHERE UPPER ($column) LIKE UPPER('%$search%')";
      sqltodataFacility($sql);
    }

    if ($column == "content"||$column=="title"){
      $sql="SELECT N_ID,title,times,content FROM sei_news WHERE UPPER ($column) LIKE UPPER('%$search%')";
      sqltodataContent($sql);
    }




    if ($column == "overall"){
      $sql="SELECT E_ID,title,start,end_time FROM sei_event WHERE UPPER (title) LIKE UPPER ('%$search%')";
      sqltodataEvent($sql);

      $sql="SELECT C_ID,name,weeks,times,start FROM sei_course WHERE UPPER (name) LIKE UPPER ('%$search%')";
      sqltodataCourse($sql);

      $sql="SELECT F_ID,name,capability,open,close,price,img,info FROM sei_facility WHERE  UPPER (name) LIKE UPPER ('%$search%')";
      sqltodataFacility($sql);

      $sql="SELECT N_ID,title,times,content FROM sei_news WHERE  UPPER(content) LIKE  UPPER('%$search%') OR UPPER (title) LIKE UPPER ('%$search%')";
      sqltodataContent($sql);

    }
    }
    
     require "foot.php";

?>

</div>
