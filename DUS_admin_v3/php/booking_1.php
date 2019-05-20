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
    <form action="b_action.php" method="post">
        <table>
            <tr>
                <td><input type="checkbox" name="checkboxes[]" value="on" onclick="selectAll(this,'checkboxes')"/>SelectAll
                </td>
                <td>BookingID</td>
                <td>Facility</td>
                <td>Start</td>
                <td>End</td>
                <td>Count</td>
                <td>Avb</td>
                <td>UserID</td>
                <td>Edit</td>
            </tr>

            <?php
            session_start();
            require_once('database.php');
            require_once('head.php');
            $res = $pdo->query("select sei_facility.name,sei_booking.B_ID,sei_booking.start,sei_booking.end,sei_booking.count,sei_booking.Avb,sei_booking.U_ID
from sei_booking,sei_facility
where sei_facility.F_ID= sei_booking.F_ID ");
            foreach ($res as $row) {
                echo "<tr>";
                echo "<td><input type='checkbox' name='checkboxes[]' value='{$row['B_ID']}' />" . "</td>";
                echo "<td>" . $row["B_ID"] . "</td>";
                echo "<td>" . $row["name"] . "</td>";
                echo "<td>" . $row["start"] . "</td>";
                echo "<td>" . $row["end"] . "</td>";
                echo "<td>" . $row["count"] . "</td>";
                echo "<td>" . $row["Avb"] . "</td>";
                echo "<td>" . $row["U_ID"] . "</td>";
                echo "<td> <button type='button' class='btn_edit' name='edit' data-target='#addUserModal' data-toggle='modal' id={$row['B_ID']}>Edit</button ></td>";
            }
            ?>
        </table>
        <input class="button" type="submit" name="delete_mul" value="Delete"/>
    </form>
    <div style="margin-top:1px;">
        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addUserModal" name="add" id="add">
            Add New Booking
        </button>
        <div id="course_data" class="table-responsive">

        </div>
    </div>
</div>
<form method="post" action="" class="form-horizontal" role="form" id="form_data"
      onsubmit="return validate_form_booking(this)"
      style="margin: 30px;">
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" id="modal-dialog" title="Add New Booking">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Add New Booking
                    </h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label> Facility ID</label>
                            <input type="text" name="F_ID" id="F_ID" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label> Start Time</label>
                            <input type="datetime-local" name="start" id="start" class="form-control"/>
                        </div>

                        <div class="form-group">
                            <label> End Time</label>
                            <input type="datetime-local" name="end" id="end" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label> Count</label>
                            <input type="number" name="count" id="count" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label> Avb</label>
                            <input type="text" name="Avb" id="Avb" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label> UserID</label>
                            <input type="number" name="U_ID" id="U_ID" class="form-control"/>
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
                    var title = 'Add New Booking';
                    $(".modal-title").html(title);
                    var btn_insert = '<input type="submit" name="form_action" id="form_action" class="btn btn-primary" value="insert"/>';
                    $("#btn_content").html(btn_insert);
                    $("#F_ID").val("");
                    $("#start").val("");
                    $("#end").val("");
                    $("#count").val("");
                    $("#Avb").val("");
                    $("#U_ID").val("");
                    $("#form_action").on('click', function (e) {
                        e.preventDefault();
                        //the button got clicked
                        var F_ID = document.getElementById("F_ID").value;
                        var start = document.getElementById("start").value;
                        var end = document.getElementById("end").value;
                        var count = document.getElementById("count").value;
                        var Avb = document.getElementById("Avb").value;
                        var U_ID = document.getElementById("U_ID").value;
                        var operate = "addBooking";
                        $.ajax({
                            url: "b_action.php",
                            type: 'post',
                            data: {'operate': operate, 'F_ID': F_ID, 'start': start, 'end': end, 'count': count,'Avb':Avb,'U_ID':U_ID},
                            success: function got_success_msg(msg) {
                                alert(msg);
                                window.location.href = "booking.php?";
                            },
                            dataType: "text"
                        });
                    });
                });
            });
            $(document).ready(function () {
                $(".btn_edit").on('click', function (e) {
                    e.preventDefault();
                    var title = 'Edit Booking';
                    $(".modal-title").html(title);
                    var btn_edit = '<input type="submit" name="form_action" id="form_action_edit" class="btn btn-primary" value="edit"/>';
                    $("#btn_content").html(btn_edit);
                    var nameID = $(this).attr("id");
                    var operate = "showBooking";
                    $.ajax({
                        url: "b_action.php",
                        type: 'post',
                        data: {'operate': operate, 'nameID': nameID},
                        success: function got_success_msg(msg) {
                            $("#F_ID").val(msg.F_ID);
                            $("#start").val(msg.start);
                            $("#end").val(msg.end);
                            $("#count").val(msg.count);
                            $("#Avb").val(msg.Avb);
                            $("#U_ID").val(msg.U_ID);
                            $("#form_action_edit").on('click', function (e) {
                                e.preventDefault();
                                //the button got clicked
                                var F_ID = document.getElementById("F_ID").value;
                                var start = document.getElementById("start").value;
                                var end = document.getElementById("end").value;
                                var count = document.getElementById("count").value;
                                var Avb = document.getElementById("Avb").value;
                                var U_ID = document.getElementById("U_ID").value;
                                var operate = "editBooking";
                                $.ajax({
                                    url: "b_action.php",
                                    type: 'post',
                                    data: {
                                        'operate': operate,
                                        'F_ID': F_ID,
                                        'start': start,
                                        'end': end,
                                        'count': count,
                                        'Avb': Avb,
                                        'U_ID': U_ID,
                                        'nameID': nameID
                                    },
                                    success: function got_success_msg(msg) {
                                        alert(msg);
                                        window.location.href = "b_action.php?";
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