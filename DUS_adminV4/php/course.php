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
                <td>Time</td>
                <td>Weeks</td>
                <td>Start</td>
                <td>Edit</td>
            </tr>

            <?php
            session_start();
            require_once('database.php');
            require_once('head.php');
            $res = $pdo->query("select * from sei_course");
            foreach ($res as $row) {
                echo "<tr>";
                echo "<td><input type='checkbox' name='checkboxes[]' value='{$row['C_ID']}' />" . "</td>";
                echo "<td>" . $row["C_ID"] . "</td>";
                echo "<td>" . $row["name"] . "</td>";
                echo "<td>" . $row["time"] . "</td>";
                echo "<td>" . $row["weeks"] . "</td>";
                echo "<td>" . $row["start"] . "</td>";
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
                            <label> Course Name</label>
                            <input type="text" name="name" id="name" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label> Time</label>
                            <input type="text" name="time" id="time" class="form-control"/>
                        </div>

                        <div class="form-group">
                            <label> Weeks</label>
                            <input type="number" name="weeks" id="weeks" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label> Start</label>
                            <input type="date" name="start" id="start" class="form-control"/>
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
                    var btn_insert = '<input type="submit" name="form_action" id="form_action" class="btn btn-primary" value="insert"/>';
                    $("#btn_content").html(btn_insert);
                    $("#name").val("");
                    $("#time").val("");
                    $("#weeks").val("");
                    $("#start").val("");
                    $("#form_action").on('click', function (e) {
                        e.preventDefault();
                        //the button got clicked
                        var name = document.getElementById("name").value;
                        var time = document.getElementById("time").value;
                        var weeks = document.getElementById("weeks").value;
                        var start = document.getElementById("start").value;
                        var operate = "addCourse";
                        $.ajax({
                            url: "c_action.php",
                            type: 'post',
                            data: {'operate': operate, 'name': name, 'time': time, 'weeks': weeks, 'start': start},
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
                    var btn_edit = '<input type="submit" name="form_action" id="form_action_edit" class="btn btn-primary" value="edit"/>';
                    $("#btn_content").html(btn_edit);
                    var nameID = $(this).attr("id");
                    var operate = "showCourse";
                    $.ajax({
                        url: "c_action.php",
                        type: 'post',
                        data: {'operate': operate, 'nameID': nameID},
                        success: function got_success_msg(msg) {
                            $("#name").val(msg.name);
                            $("#time").val(msg.time);
                            $("#weeks").val(msg.weeks);
                            $("#start").val(msg.start);
                            $("#form_action_edit").on('click', function (e) {
                                e.preventDefault();
                                //the button got clicked
                                var name = document.getElementById("name").value;
                                var time = document.getElementById("time").value;
                                var weeks = document.getElementById("weeks").value;
                                var start = document.getElementById("start").value;
                                var operate = "editCourse";
                                $.ajax({
                                    url: "c_action.php",
                                    type: 'post',
                                    data: {
                                        'operate': operate,
                                        'name': name,
                                        'time': time,
                                        'weeks': weeks,
                                        'start': start,
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
</body>
</html>
