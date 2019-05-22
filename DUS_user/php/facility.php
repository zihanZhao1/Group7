<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2019/5/17
 * Time: 12:31
 */

class facility
{
    function facility($ID,$name, $info){

        echo " <div class=\"row-fluid\">
                  <div class=\"span3 \">
                       <div class=\"box-heading\">
                            <img src=\"../img/$name.jpg\" title=\"\" alt=\"\" height='136' width='187'/>
                        </div><br/>
                   </div>
                   <div class=\"span6 \">
                            <div class=\"box-heading\">
                            </div>
                            <p>$info</p> <br/>
                    </div>
                    <div class=\"span3 \">
                            <h3><input type='button' class='btn btn-primary' onclick='location.href='booking.php?id=$ID';' value='Book Now'/></h3><br/>
                   </div>
               </div>";
    }
}