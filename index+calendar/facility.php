<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/17
 * Time: 12:31
 */

class facility
{

    function facility($name, $contact, $cap, $url)
    {

        echo " <div class=\"row-fluid\">
                  <div class=\"span6 \">
                  
                       <div class=\"box-heading\">
                            <a href=\"$url\"><img src=\"img/$name.jpg\" title=\"\" alt=\"\"/></a>
                        </div><br/>
                   </div>
                   <div class=\"span6 \">
                            <div class=\"box-heading\">
                            <p>capability:$cap</p>
                            <p>contact:$contact</p>
                            <h3><a href=\"booking.php?id = $name\">Book now</a></h3></div>
           <br/>
 </div>
               </div>";
    }
}