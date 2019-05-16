<?php
   if(isset($_POST['submit'])){
     require"conn.php";

     $search=$_POST['search'];
     $search=filter_var($search,FILTER_SANITIZE_STRING);

     $column=$_POST['column'];
     $column=filter_var($column,FILTER_SANITIZE_STRING);

     if($column == "" || ($column != "course" && $column !="event" && $column !="news" && $column !="facility" && $column !="overall"))
        $column = "overall";

     $sql="SELECT 'text' FROM 'News' WHERE  LIKE '$search'";
     $query=$conn->query($sql);
     $data=$query->fetchAll();


      $sql="SELECT 'news' FROM 'Event'WHERE LIKE '$search'";
      $query=$conn->query($sql);
      $data=$query->fetchAll();

      $sql="SELECT 'name' FROM 'Course' WHERE LIKE '$search'";
      $query=$conn->query($sql);
      $data=$query->fetchAll();

      $sql="SELECT 'title' FROM 'Facility' WHERE LIKE '$search'";
      $query=$conn->query($sql);
      $data=$query->fetchAll();

   }
 ?>
 <!DOCTYPE html>
 <html lang="en" dir="ltr">
   <head>
     <meta charset="utf-8">
     <title>PHP Search Form</title>
   </head>
   <body>
     <form method="post" action="search.php">
       <input type="text" name="search" placeholder="Search...">
       <select class="column">
         <option value="select">Select Filter</option>
         <option value="course">Course</option>
         <option value="event">Event</option>
         <option value="news">News</option>
         <option value="facility">Facility</option>
         <option value="overall">OVERALL</option>
       </select>
       <input type="submit" name="submit" value="Find">
     </form>

   </body>
 </html>
