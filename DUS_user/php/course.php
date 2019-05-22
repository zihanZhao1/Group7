<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Course Management - Durham University</title>
    <link rel="stylesheet" href="../css/index.css" type="text/css"/>
    <link rel="stylesheet" href="../css/jquery-ui.css" type="text/css"/>
    <script src="../js/jquery.min.js"></script>
    <script src="../js/jquery-ui.js"></script>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>
<?php include("conn.php");
include("head.php"); ?>
<div class="container-fluid">
    <div id="content" class="row-fluid" style="height: auto">
        <div class="span2 main">
            <p style="font-size:15px;">Welcome <?php if (!isset($_SESSION['name']) || $_SESSION['name'] == '') {
                    echo "Guest";
                } else {
                    echo $_SESSION["name"];
                } ?></p>
            <ul>
                <li class='navcurrent'><a href="#"> List of Courses</a></li>
            </ul>
        </div>

        <div class="span10 extra">
            <div class="container" style="width:auto">
                <p><br></p>
                <div id="changeBox" style="margin-bottom:5px;">
                    <?php
                    if (!isset($_SESSION['role']) || $_SESSION['role'] == '') {
                        echo "";
                    } elseif (isset($_SESSION["role"])) {
                        if ($_SESSION["role"] == "trainer") {
                            echo '<button type="button" name="add" id="add" class="btn btn-primary btn-xs" style="margin-left: 20px;">Add New Course</button>';
                        } elseif ($_SESSION["role"] == "user") {
                            echo "";
                        }
                    } ?>
                </div>
                <div id="course_data" class="table-responsive">

                </div>
            </div>
            <div id="course_dialog" title="Add New Course">
                <form method="post" id="course_form">
                    <div class="form-group">
                        <label>Enter Course ID</label>
                        <input type="text" name="cid" id="cid" class="form-control"/>
                        <span id="error_cid" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Enter Course Name</label>
                        <input type="text" name="cn" id="cn" class="form-control"/>
                        <span id="error_cn" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Select Facility</label>
                        <?php
                        $result = $pdo->query("select F_ID, name from sei_facility");

                        echo " <select name='f' id='f' style='margin-left: 20px;'>";

                        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                            unset($fid, $fname, $rn);
                            $fid = $row['F_ID'];
                            $fname = $row['name'];
                            //$rn = $row['room'];
                            echo '<option style="display:none;"></option>';
                            echo '<option value="' . $fid . '">' . $fid . ',' . $fname . ' </option>';
                        }
                        echo "</select>";
                        ?><br>
                        <span id="error_f" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Enter Start Date</label>
                        <input type="date" name="sd" id="sd" class="form-control"
                               min="<?= date('Y-m-d', strtotime('+1 days')) ?>"
                               max="<?= date('Y-m-d', strtotime('+180 days')) ?>"/>
                        <span id="error_sd" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Enter End Date</label>
                        <input type="date" name="ed" id="ed" class="form-control"
                               min="<?= date('Y-m-d', strtotime('+1 days')) ?>"
                               max="<?= date('Y-m-d', strtotime('+180 days')) ?>"/>
                        <span id="error_ed" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Enter Specific Week Day </label>
                        <select name="wd" id="wd">
                            <option style="display:none;"></option>
                            <option value="1">Mon</option>
                            <option value="2">Tue</option>
                            <option value="3">Wed</option>
                            <option value="4">Thu</option>
                            <option value="5">Fri</option>
                            <option value="6">Sat</option>
                            <option value="7">Sun</option>
                        </select>
                        <span id="error_wd" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Enter Start Time</label>
                        <input type="time" name="st" id="st" class="form-control"/>
                        <span id="error_st" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Enter End Time</label>
                        <input type="time" name="et" id="et" class="form-control"/>
                        <span id="error_et" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <input type="hidden" name="action" id="action" value="insert"/>
                        <input type="hidden" name="hidden_id" id="hidden_id"/>
                        <input type="submit" name="form_action" id="form_action" class="btn btn-primary"
                               value="Insert"/>
                    </div>
                </form>
            </div>
        </div>
        <div id="action_alert" title="Action">

        </div>

        <div id="delete_confirmation" title="Confirmation">
            <p>Are you sure you want to Delete this data?</p>
        </div>
    </div>
    <?php include("foot.php"); ?>
</div>
<script>
    $(document).ready(function () {

        load_data();

        function load_data() {
            $.ajax({
                method: "POST",
                url: "fetch.php",
                success: function (data) {
                    $('#course_data').html(data);
                }
            });
        }

        $('#course_dialog').dialog({
            autoOpen: false,
            width: 400
        });

        $('#add').on('click', function () {

            $('#course_dialog').attr('title', 'Add Course');
            $('#action').val('insert');
            $('#form_action').val("Insert");
            $('#course_form')[0].reset();
            $('#form_action').attr('disabled', false);
            $('#course_dialog').dialog('open');
        });


        $("#ed").change(function () {
            var startDate = document.getElementById("sd").value;
            var endDate = document.getElementById("ed").value;

            if ((Date.parse(startDate) >= Date.parse(endDate))) {
                alert("End date should be greater than Start date");
                document.getElementById("ed").value = "";
            }
        });

        $("#et").change(function () {
            var startTime = document.getElementById("st").value;
            var endTime = document.getElementById("et").value;
            var startDate = new Date('1970-01-01T' + startTime + 'Z');
            var endDate = new Date('1970-01-01T' + endTime + 'Z');

            if ((Date.parse(startDate) >= Date.parse(endDate))) {
                alert("End time should be greater than Start time");
                document.getElementById("et").value = "";
            }
        });

        $('#course_form').on('submit', function (event) {
            event.preventDefault();
            var error_cid = '';
            var error_cn = '';
            var error_f = '';
            var error_sd = '';
            var error_ed = '';
            var error_wd = '';
            var error_st = '';
            var error_et = '';

            if ($('#cid').val() == '') {
                error_cid = 'Course ID is required';
                $('#error_cid').text(error_cid);
                $('#cid').css('border-color', '#cc0000');
            } else {
                error_cid = '';
                $('#error_cid').text(error_cid);
                $('#cid').css('border-color', '');
            }

            if ($('#cn').val() == '') {
                error_cn = 'Course Name is required';
                $('#error_cn').text(error_cn);
                $('#cn').css('border-color', '#cc0000');
            } else {
                error_cn = '';
                $('#error_cn').text(error_cn);
                $('#cn').css('border-color', '');
            }

            if ($('#f').val() == '') {
                error_f = 'Course Name is required';
                $('#error_f').text(error_f);
                $('#f').css('border-color', '#cc0000');
            } else {
                error_f = '';
                $('#error_f').text(error_f);
                $('#f').css('border-color', '');
            }

            if ($('#sd').val() == '') {
                error_sd = 'Start Date is required';
                $('#error_sd').text(error_sd);
                $('#sd').css('border-color', '#cc0000');
            } else {
                error_sd = '';
                $('#error_sd').text(error_sd);
                $('#sd').css('border-color', '');
            }

            if ($('#ed').val() == '') {
                error_ed = 'End date is required';
                $('#error_ed').text(error_ed);
                $('#ed').css('border-color', '#cc0000');
            } else {
                error_ed = '';
                $('#error_ed').text(error_ed);
                $('#ed').css('border-color', '');
            }

            if ($('#wd').val() == '') {
                error_wd = 'Week day is required';
                $('#error_wd').text(error_wd);
                $('#wd').css('border-color', '#cc0000');
            } else {
                error_wd = '';
                $('#error_wd').text(error_wd);
                $('#wd').css('border-color', '');
            }

            if ($('#st').val() == '') {
                error_st = 'Start time is required';
                $('#error_st').text(error_st);
                $('#st').css('border-color', '#cc0000');
            } else {
                error_st = '';
                $('#error_st').text(error_st);
                $('#st').css('border-color', '');
            }

            if ($('#et').val() == '') {
                error_st = 'End time is required';
                $('#error_et').text(error_et);
                $('#et').css('border-color', '#cc0000');
            } else {
                error_et = '';
                $('#error_et').text(error_et);
                $('#et').css('border-color', '');
            }
            if (error_cid != '' || error_cn != '' || error_f != '' || error_sd != '' || error_ed != '' || error_wd != '' || error_st != '' || error_et != '') {
                return false;
            } else {
                $('#form_action').attr('disabled', 'disabled');
                var form_data = $(this).serialize();
                $.ajax({
                    url: "action.php",
                    method: "POST",
                    data: form_data,
                    success: function (data) {
                        $('#course_dialog').dialog('close');
                        $('#action_alert').html(data);
                        $('#action_alert').dialog('open');
                        load_data();
                        $('#form_action').attr('disabled', false);
                    }
                });
            }
        });

        $('#action_alert').dialog({
            autoOpen: false
        });

        $(document).on('click', '.edit', function () {
            var id = $(this).attr("id");
            var action = 'fetch_single';
            $.ajax({
                url: "action.php",
                method: "POST",
                data: {id: id, action: action},
                dataType: "json",
                success: function (data) {
                    $('#cid').val(data.cid);
                    $('#cn').val(data.cn);
                    $('#f').val(data.f);
                    $('#sd').val(data.sd);
                    $('#ed').val(data.ed);
                    $('#st').val(data.st);
                    $('#et').val(data.et);
                    $('#course_dialog').attr('title', 'Edit Course');
                    $('#action').val('update');
                    $('#hidden_id').val(id);
                    $('#form_action').val('Update');
                    $('#course_dialog').dialog('open');
                }

            });
        });

        $('#delete_confirmation').dialog({
            autoOpen: false,
            modal: true,
            buttons: {
                Ok: function () {
                    var id = $(this).data('id');
                    var action = 'delete';
                    $.ajax({
                        url: "action.php",
                        method: "POST",
                        data: {id: id, action: action},
                        success: function (data) {
                            $('#delete_confirmation').dialog('close');
                            $('#action_alert').html(data);
                            $('#action_alert').dialog('open');
                            load_data();
                        }
                    });
                },
                Cancel: function () {
                    $(this).dialog('close');
                }
            }
        });

        $(document).on('click', '.delete', function () {
            var id = $(this).attr("id");
            $('#delete_confirmation').data('id', id).dialog('open');
        });

    });

    $(function () {
        var date_now = new Date();
        var year = date_now.getFullYear();
        var month = date_now.getMonth() + 1 < 10 ? "0" + (date_now.getMonth() + 1) : (date_now.getMonth() + 1);
        var date = date_now.getDate() < 10 ? "0" + date_now.getDate() : date_now.getDate();
        $("#sd").attr("min", year + "-" + month + "-" + date);
        $("#ed").attr("min", year + "-" + month + "-" + date);
    });


    <?php logoutBlock(); ?>

</script>

</body>
</html>
