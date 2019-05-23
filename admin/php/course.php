<?php	
	session_start();
	$role = $_SESSION["role"];
	if ($role == "admin") {
		
}else{
  ?>
   <script>

    alert('You are not admin！');

	window.location.href="../../user/php/index.php";
   </script>
<?php
}
?>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../js/jquery-3.4.1.min.js"></script>
    <script src="../js/validate.js"></script>
</head>
<body>
<div class="container-fluid">
    <form action="c_action.php" method="post">
        <table>
            <tr>
                <td><input type="checkbox" name="checkboxes[]" value="on" onclick="selectAll(this,'checkboxes')"/>SelectAll
                </td>
                <td>CourseID</td>
                <td>Name</td>
                <td>Facility ID</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Start Time</td>
                <td>End Time</td>
                <td>Week(Which weekday:1-7 means Mon-Sun)</td>
                <td>Edit</td>
            </tr>

            <?php
            require_once('database.php');
            require_once('head.php');
            $res = $pdo->query("select * from sei_course");
            foreach ($res as $row) {
                echo "<tr>";
                echo "<td><input type='checkbox' name='checkboxes[]' value='{$row['C_ID']}' />" . "</td>";
                echo "<td>" . $row["C_ID"] . "</td>";
                echo "<td>" . $row["name"] . "</td>";
                echo "<td>" . $row["F_ID"] . "</td>";
                echo "<td>" . $row["start_date"] . "</td>";
                echo "<td>" . $row["end_date"] . "</td>";
                echo "<td>" . $row["start_time"] . "</td>";
                echo "<td>" . $row["end_time"] . "</td>";
                echo "<td>" . $row["week"] . "</td>";
                echo "<td> <button type='button' class='btn_edit' name='edit' data-target='#addUserModal' data-toggle='modal' id={$row['C_ID']}>Edit</button ></td>";
            }
            ?>
        </table>
        <input class="button" type="submit" name="delete_mul" value="Delete"/>
    </form>
    <div style="margin-top:1px;">
        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addUserModal" name="add" id="add">
            Add New Course
        </button>
        <div id="course_data" class="table-responsive">

        </div>
    </div>
</div>
<form method="post" action="" class="form-horizontal" role="form" id="form_data" onsubmit="return validate_form(this)"
      style="margin: 30px;">
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" id="modal-dialog" title="Add New Course">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Add New Course
                    </h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label style="margin-left: 20px;">Course Name</label>
                            <input type="text" name="name" id="name" class="form-control" required="required" style= "width: 114px; border-left-width: 1px; margin-left: 20px;"/>
                        </div>
                        <div class="form-group">
                            <label style="margin-left: 20px;">Select Facility</label>
                            <?php
                            $result = $pdo->query("select F_ID, name from sei_facility");

                            echo " <select name='fid' id='fid' style='margin-left: 20px;'>";

                            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                                unset($fid, $fname,$rn);
                                $fid = $row['F_ID'];
                                $fname = $row['name'];
                                echo '<option style="display:none;"></option>';
                                echo '<option value="'.$fid.'">'.$fid.','.$fname.' </option>';
                            }
                            echo "</select>";
                            ?><br>
                            <span id="error_f" class="text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label style="margin-left: 20px;">Start Date</label>
                            <input type="date" name="sdate" id="sdate" class="form-control" required="required" style= "width: 114px; border-left-width: 1px; margin-left: 20px;" min="<?=date('Y-m-d', strtotime('+1 days'))?>" max="<?=date('Y-m-d', strtotime('+180 days')) ?>"/>
                        </div>
                        <div class="form-group">
                            <label style="margin-left: 20px;">End Date</label>
                            <input type="date" name="edate" id="edate" class="form-control" required="required" style= "width: 114px; border-left-width: 1px; margin-left: 20px;" min="<?=date('Y-m-d', strtotime('+1 days'))?>" max="<?=date('Y-m-d', strtotime('+180 days')) ?>"/>
                        </div>
                        <div class="form-group">
                            <label style="margin-left: 20px;">Enter Specific Week Day </label>
                            <select name="week" id="week" style="margin-left: 20px;">
                                <option style="display:none;"></option>
                                <option value="1">Mon</option>
                                <option value="2">Tue</option>
                                <option value="3">Wed</option>
                                <option value="4">Thu</option>
                                <option value="5">Fri</option>
                                <option value="6">Sat</option>
                                <option value="7">Sun</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label style="margin-left: 20px;">Start Time</label>
                            <input type="time" name="stime" id="stime" class="form-control" required="required" style= "width: 114px; border-left-width: 1px; margin-left: 20px;"/>
                        </div>
                        <div class="form-group">
                            <label style="margin-left: 20px;">End Date</label>
                            <input type="time" name="etime" id="etime" class="form-control" required="required" style= "width: 114px; border-left-width: 1px; margin-left: 20px;"/>
                        </div>
                        <div class="form-group" id="btn_content">
                            <input type="submit" name="form_action" id="form_action" class="btn btn-primary"
                                   value="insert"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <script>
            $(document).ready(function () {
                $("#add").on('click', function (e) {
                    e.preventDefault();
                    var title = 'Add New Course';
                    $(".modal-title").html(title);
                    var btn_insert = '<input type="submit" name="form_action" id="form_action" class="btn btn-primary" value="Insert"  style="margin-left: 20px;"/>';
                    $("#btn_content").html(btn_insert);
                    var nameID = $(this).attr("id");
                    $("#name").val("");
                    $("#fid").val("");
                    $("#sdate").val("");
                    $("#edate").val("");
                    $("#week").val("");
                    $("#stime").val("");
                    $("#etime").val("");
                    $("#form_action").on('click', function (e) {
                        e.preventDefault();
                        //the button got clicked
                        var name = document.getElementById("name").value;
                        var fid = document.getElementById("fid").value;
                        var sdate = document.getElementById("sdate").value;
                        var edate = document.getElementById("edate").value;
                        var week = document.getElementById("week").value;
                        var stime = document.getElementById("stime").value;
                        var etime = document.getElementById("etime").value;
                        var operate = "addCourse";
                        $.ajax({
                            url: "c_action.php",
                            type: 'post',
                            data: {'operate': operate, 'name': name, 'fid': fid, 'sdate': sdate, 'edate': edate, 'week': week, 'stime': stime, 'etime': etime, 'nameID':nameID},
                            success: function got_success_msg(msg) {
                                alert(msg);
                                window.location.href = "course.php?";
                            },
                            dataType: "text"
                        });
                    });
                });
            });
            $(document).ready(function () {
                $(".btn_edit").on('click', function (e) {
                    e.preventDefault();
                    var title = 'Edit Course';
                    $(".modal-title").html(title);
                    var btn_edit = '<input type="submit" name="form_action" id="form_action_edit" class="btn btn-primary" value="Edit"  style="margin-left: 20px;"/>';
                    $("#btn_content").html(btn_edit);
                    var nameID = $(this).attr("id");
                    var operate = "showCourse";
                    $.ajax({
                        url: "c_action.php",
                        type: 'post',
                        data: {'operate': operate, 'nameID': nameID},
                        success: function got_success_msg(msg) {
                            $("#name").val(msg.name);
                            $("#fid").val(msg.fid);
                            $("#sdate").val(msg.sdate);
                            $("#edate").val(msg.edate);
                            $("#week").val(msg.week);
                            $("#stime").val(msg.stime);
                            $("#etime").val(msg.etime);
                            $("#form_action_edit").on('click', function (e) {
                                e.preventDefault();
                                //the button got clicked
                                var name = document.getElementById("name").value;
                                var fid = document.getElementById("fid").value;
                                var sdate = document.getElementById("sdate").value;
                                var edate = document.getElementById("edate").value;
                                var week = document.getElementById("week").value;
                                var stime = document.getElementById("stime").value;
                                var etime = document.getElementById("etime").value;
                                var operate = "editCourse";
                                $.ajax({
                                    url: "c_action.php",
                                    type: 'post',
                                    data: {
                                        'operate': operate,
                                        'name': name,
                                        'fid': fid, 
                                        'sdate': sdate,
                                        'edate': edate, 
                                        'week':week,
                                        'stime': stime, 
                                        'etime': etime,
                                        'nameID': nameID
                                    },
                                    success: function got_success_msg(msg) {
                                        alert(msg);
                                        window.location.href = "course.php?";
                                    },
                                    dataType: "text"
                                });
                            });
                        },
                        dataType: "json"
                    });
                });
            });
        </script>
        <script>
            function selectAll(obj, chk) {
                if (chk == null) {
                    chk = 'checkboxes';
                }
                var elems = obj.form.getElementsByTagName("INPUT");
                for (var i = 0; i < elems.length; i++) {
                    if (elems[i].name == chk || elems[i].name == chk + "[]") {
                        elems[i].checked = obj.checked;
                    }
                }
            }
        </script>

    </div>
</form>
    <?php
require_once('foot.php');
?>
</body>
</html>
