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
    <form action="f_action.php" method="post">
        <table>
            <tr>
                <td><input type="checkbox" name="checkboxes[]" value="on" onclick="selectAll(this,'checkboxes')"/>SelectAll
                </td>
                <td>FacilityID</td>
                <td>Image</td>
                <td>Name</td>
                <td>Price</td>
                <td>Student Price</td>
                <td>Capability</td>
                <td>Open Time</td>
                <td>Close Time</td>
                <td>Information</td>
                <td>Edit</td>
            </tr>

            <?php
            require_once('database.php');
            require_once('head.php');
            $res = $pdo->query("select * from sei_facility");
            foreach ($res as $row) {
                $a = 0.85;//student discount rate
                echo "<tr>";
                echo "<td><input type='checkbox' name='checkboxes[]'  value='{$row['F_ID']}' />" . "</td>";
                echo "<td>" . $row["F_ID"] . "</td>";
                echo '<td><img src="../image/'.$row['name'].'.jpg" /></td>';
                echo "<td>" . $row["name"] . "</td>";
                echo "<td>" . $row["price"] . "</td>";
                echo "<td>" . $row["price"] * $a . "</td>";
                echo "<td>" . $row["capability"] . "</td>";
                echo "<td>" . $row["open"] . "</td>";
                echo "<td>" . $row["close"] . "</td>";
                echo "<td>" . $row["info"] . "</td>";
                echo "<td> <button type='button' class='btn_edit' name='edit' data-target='#addUserModal' data-toggle='modal' id={$row['F_ID']}>Edit</button ></td>";
            }
            ?>
        </table>
        <input class="button" type="submit" name="delete_mul" value="Delete"/>
    </form>
    <div style="margin-top:1px;">
        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addUserModal" name="add" id="add">
            Add New Facility
        </button>
        <div id="course_data" class="table-responsive">

        </div>
    </div>
</div>
<form method="post" action="" class="form-horizontal" role="form" id="form_data"
      onsubmit="return validate_form_facility(this)"
      style="margin: 30px;">
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" id="modal-dialog" title="Add New Course">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Add New Facility
                    </h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label> Facility Name</label>
                            <input type="text" name="name" id="name" class="form-control"/>
                            <span id="error_name" class="text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label> Image</label>
                            <input type="file" name="img" id="img" class="form-control"/>
                            <span id="error_time" class="text-danger"></span>
                        </div>

                        <div class="form-group">
                            <label> Price</label>
                            <input type="number" name="price" id="price" class="form-control"/>
                            <span id="error_weeks" class="text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label> Capability</label>
                            <input type="number" name="capability" id="capability" class="form-control"/>
                            <span id="error_date" class="text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label> Open</label>
                            <input type="time" name="open" id="open" class="form-control"/>
                            <span id="error_date" class="text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label> Close</label>
                            <input type="time" name="close" id="close" class="form-control"/>
                            <span id="error_date" class="text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label> Information</label>
                            <input type="text" name="info" id="info" class="form-control"/>
                            <span id="error_date" class="text-danger"></span>
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
                    var title = 'Add New Facilty';
                    $(".modal-title").html(title);
                    var btn_insert = '<input type="submit" name="form_action" id="form_action" class="btn btn-primary" value="insert"/>';
                    $("#btn_content").html(btn_insert);
                    $("#name").val("");
                    $("#capability").val("");
                    $("#open").val("");
                    $("#close").val("");
                    $("#price").val("");
                    $("#info").val("");
                    $(document).ready(function () {
                        $("#form_action").on('click', function (e) {
                            e.preventDefault();
                            //the button got clicked
                            var name = document.getElementById("name").value;
                            var img = document.getElementById("img").value;
                            var price = document.getElementById("price").value;
                            var capability = document.getElementById("capability").value;
                            var open = document.getElementById("open").value;
                            var close = document.getElementById("close").value;
                            var info = document.getElementById("info").value;
                            var operate = "addFacility";
                            $.ajax({
                                url: "f_action.php",
                                type: 'post',
                                data: {
                                    'operate': operate,
                                    'name': name,
                                    'img':img,
                                    'price': price,
                                    'capability': capability,
                                    'open': open,
                                    'close': close,
                                    'info': info,
                                },
                                success: function got_success_msg(msg) {
                                    alert(msg);
                                    window.location.href = "facility.php?";
                                },
                                dataType: "text"
                            });
                        });
                    });
                });
            });
            $(document).ready(function () {
                $(".btn_edit").on('click', function (e) {
                    e.preventDefault();
                    var title = 'Edit Facility';
                    $(".modal-title").html(title);
                    var btn_edit = '<input type="submit" name="form_action" id="form_action_edit" class="btn btn-primary" value="edit"/>';
                    $("#btn_content").html(btn_edit);
                    var nameID = $(this).attr("id");
                    var operate = "showFacility";
                    $.ajax({
                        url: "f_action.php",
                        type: 'post',
                        data: {'operate': operate, 'nameID': nameID},
                        success: function got_success_msg(msg) {
                            $("#name").val(msg.name);
                            $("#capability").val(msg.capability);
                            $("#open").val(msg.open);
                            $("#close").val(msg.close);
                            $("#price").val(msg.price);
                            $("#info").val(msg.info);
                            $("#form_action_edit").on('click', function (e) {
                                e.preventDefault();
                                //the button got clicked
                                var name = document.getElementById("name").value;
                                var img = document.getElementById("img").value;
                                var price = document.getElementById("price").value;
                                var capability = document.getElementById("capability").value;
                                var open = document.getElementById("open").value;
                                var close = document.getElementById("close").value;
                                var info = document.getElementById("info").value;
                                var operate = "editFacility";
                                $.ajax({
                                    url: "f_action.php",
                                    type: 'post',
                                    data: {
                                        'operate': operate,
                                        'name': name,
                                        'img':img,
                                        'price': price,
                                        'capability': capability,
                                        'open': open,
                                        'close': close,
                                        'info': info,
                                        'nameID': nameID
                                    },
                                    success: function got_success_msg(msg) {
                                        alert(msg);
                                        window.location.href = "facility.php?";
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

