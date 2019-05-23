

<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>PHP Search Form</title>
    <link rel="stylesheet" href="../css/index.css" type="text/css">
    <link rel="stylesheet" href="../css/style.css">
    <script src="../js/jquery.min.js"></script>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="../css/team-durham.css" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>
<?php require_once "head.php";

//var_dump($_POST);
require"conn.php";
//var_dump($_POST);
if(count($_POST)>0){
    $search=$_POST['search'];
    $search=filter_var($search,FILTER_SANITIZE_STRING);
    $column=$_POST['column'];
    $column=filter_var($column,FILTER_SANITIZE_STRING);}
if(count($_POST)>0){
    if($column == "" || ($column != "price" && $column !="content" && $column !="date" && $column !="name" && $column !="overall" && $column !="title" ))
        $column = "overall";
    if ($column == "title"){
        $sql="SELECT E_ID,title,start,`end` FROM sei_event WHERE UPPER ($column) LIKE UPPER('%$search%')";
        sqltodataEvent($sql);
    }
    if ($column == "name"){
        $sql="SELECT C_ID,name,F_ID,start_date,end_date,start_time,end_time,week FROM sei_course WHERE UPPER ($column) LIKE UPPER('%$search%')";
        sqltodataCourse($sql);
    }
    if ($column == "name"){
        $sql="SELECT F_ID,name,capability,open,close,price,img,info FROM sei_facility WHERE UPPER ($column) LIKE UPPER('%$search%')";
        sqltodataFacility($sql);
    }
    if ($column == "content"||$column=="title"){
        $sql="SELECT N_ID,title,time,content FROM sei_news WHERE UPPER ($column) LIKE UPPER('%$search%')";
        sqltodataContent($sql);
    }

if ($column == "overall"){
    $sql="SELECT E_ID,title,start,`end` FROM sei_event WHERE UPPER (title) LIKE UPPER ('%$search%')";
    sqltodataEvent($sql);
    $sql="SELECT C_ID,name,F_ID,start_date,end_date,start_time,end_time,week FROM sei_course WHERE UPPER (name) LIKE UPPER ('%$search%')";
    sqltodataCourse($sql);
    $sql="SELECT F_ID,name,capability,open,close,price,img,info FROM sei_facility WHERE  UPPER (name) LIKE UPPER ('%$search%')";
    sqltodataFacility($sql);
    $sql="SELECT N_ID,title,time,content FROM sei_news WHERE  UPPER(content) LIKE  UPPER('%$search%') OR UPPER (title) LIKE UPPER ('%$search%')";
    sqltodataContent($sql);
}
}
?></div>
</body>
</html>
