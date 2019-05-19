<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/17
 * Time: 12:31
 */

class facility
{

    function facility($ID,$name, $contact)

    {

        echo " <div class=\"row-fluid\">
                  <div class=\"span6 \">
                  
                       <div class=\"box-heading\">
                            <img src=\"../img/$name.jpg\" title=\"\" alt=\"\"/>
                        </div><br/>
                   </div>
                   <div class=\"span6 \">
                            <div class=\"box-heading\">
                            <p>contact:$contact</p>
                            <h3><a href=\"booking.php?id=$ID\">Book now</a></h3></div>
           <br/>
 </div>
               </div>";
    }
}