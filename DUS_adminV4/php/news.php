<!--<head>-->
<!--    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">-->
<!--    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>-->
<!--    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>-->
<!--    <script src="js/jquery-3.4.1.min.js"></script>-->
<!--    <script src="js/validate.js"></script>-->
<!--</head>-->
<!---->
<!--<div class="container-fluid">-->
<!--    <form action="n_action.php" method="post">-->
<!--        <table>-->
<!--            <tr>-->
<!--                <td><input type="checkbox" name="checkboxes[]" value="on" onclick="selectAll(this,'checkboxes')"/>SelectAll-->
<!--                </td>-->
<!--                <td>NewsID</td>-->
<!--                <td>Title</td>-->
<!--                <td>Time</td>-->
<!--                <td>Content</td>-->
<!--                <td>Edit</td>-->
<!--            </tr>-->

<!--        </table>-->
<!---->
<!--        <input class="button" type="submit" name="delete_mul" value="Delete"/>-->
<!--    </form>-->
<!--    <div style="margin-top:1px;">-->
<!--        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addUserModal" name="add" id="add">-->
<!--            Add News-->
<!--        </button>-->
<!--        <div id="course_data" class="table-responsive">-->
<!---->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<!--<form method="post" action="" class="form-horizontal" role="form" id="form_data" onsubmit="return validate_form_news(this)"-->
<!--      style="margin: 30px;">-->
<!--    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"-->
<!--         aria-hidden="true">-->
<!--        <div class="modal-dialog" id="modal-dialog" title="Add New Course">-->
<!--            <div class="modal-content">-->
<!--                <div class="modal-header">-->
<!--                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">-->
<!--                        &times;-->
<!--                    </button>-->
<!--                    <h4 class="modal-title" id="myModalLabel">Add News-->
<!--                    </h4>-->
<!--                </div>-->
<!--                <div class="modal-body">-->
<!--                    <form class="form-horizontal" role="form">-->
<!--                        <div class="form-group">-->
<!--                            <label> News Title</label>-->
<!--                            <input type="text" name="title" id="title" class="form-control"/>-->
<!--                            <span id="error_name" class="text-danger"></span>-->
<!--                        </div>-->
<!--                        <div class="form-group">-->
<!--                            <label> Time</label>-->
<!--                            <input type="date" name="time" id="time" class="form-control"/>-->
<!--                            <span id="error_time" class="text-danger"></span>-->
<!--                        </div>-->
<!---->
<!--                        <div class="form-group">-->
<!--                            <label> News Content</label>-->
<!--                            <input type="text" name="content" id="content" class="form-control"/>-->
<!--                            <span id="error_weeks" class="text-danger"></span>-->
<!--                        </div>-->
<!--                        <div class="form-group" id="btn_content">-->
<!--                            <input type="submit" name="form_action" id="form_action" class="btn btn-primary"-->
<!--                                   value="insert"/>-->
<!--                        </div>-->
<!--                    </form>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <script>-->
<!--            $(document).ready(function () {-->
<!--                $(".btn_edit").on('click', function (e) {-->
<!--                    e.preventDefault();-->
<!--                    var title = 'Edit News';-->
<!--                    $(".modal-title").html(title);-->
<!--                    var btn_edit = '<input type="submit" name="form_action" id="form_action_edit" class="btn btn-primary" value="edit"/>';-->
<!--                    $("#btn_content").html(btn_edit);-->
<!--                    var nameID = $(this).attr("id");-->
<!--                    var operate = "showNews";-->
<!--                    $.ajax({-->
<!--                        url: "n_action.php",-->
<!--                        type: 'post',-->
<!--                        data: {'operate': operate, 'nameID': nameID},-->
<!--                        success: function got_success_msg(msg) {-->
<!--                            $("#title").val(msg.title);-->
<!--                            $("#time").val(msg.time);-->
<!--                            $("#content").val(msg.content);-->
<!--                            $("#form_action_edit").on('click', function (e) {-->
<!--                                e.preventDefault();-->
<!--                                //the button got clicked-->
<!--                                var title = document.getElementById("title").value;-->
<!--                                var time = document.getElementById("time").value;-->
<!--                                var content = document.getElementById("content").value;-->
<!--                                var operate = "editNews";-->
<!--                                $.ajax({-->
<!--                                    url: "n_action.php",-->
<!--                                    type: 'post',-->
<!--                                    data: {-->
<!--                                        'operate': operate,-->
<!--                                        'title': title,-->
<!--                                        'time': time,-->
<!--                                        'content': content,-->
<!--                                        'nameID': nameID-->
<!--                                    },-->
<!--                                    success: function got_success_msg(msg) {-->
<!--                                        alert(msg);-->
<!--                                        window.location.href = "news.php?";-->
<!--                                    },-->
<!--                                    dataType: "text"-->
<!--                                });-->
<!--                            });-->
<!---->
<!--                        },-->
<!--                        dataType: "json"-->
<!--                    });-->
<!--                });-->
<!--            });-->
<!---->
<!--            $(document).ready(function () {-->
<!--                $("#form_action").on('click', function (e) {-->
<!--                    e.preventDefault();-->
<!--                    //the button got clicked-->
<!--                    var title = document.getElementById("title").value;-->
<!--                    var time = document.getElementById("time").value;-->
<!--                    var content = document.getElementById("content").value;-->
<!--                    var operate = "addNews";-->
<!--                    $.ajax({-->
<!--                        url: "n_action.php",-->
<!--                        type: 'post',-->
<!--                        data: {'operate': operate, 'title': title, 'time': time, 'content': content},-->
<!--                        success: function got_success_msg(msg) {-->
<!--                            alert(msg);-->
<!--                            window.location.href = "news.php?";-->
<!--                        },-->
<!--                        dataType: "text"-->
<!--                    });-->
<!--                });-->
<!--            });-->
<!---->
<!--        </script>-->
<!--        <script>-->
<!--            function selectAll(obj, chk) {-->
<!--                if (chk == null) {-->
<!--                    chk = 'checkboxes';-->
<!--                }-->
<!--                var elems = obj.form.getElementsByTagName("INPUT");-->
<!--                for (var i = 0; i < elems.length; i++) {-->
<!--                    if (elems[i].name == chk || elems[i].name == chk + "[]") {-->
<!--                        elems[i].checked = obj.checked;-->
<!--                    }-->
<!--                }-->
<!--            }-->
<!--        </script>-->
<!---->
<!---->
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
    <form action="n_action.php" method="post">
        <table>
            <tr>
                <td><input type="checkbox" name="checkboxes[]" value="on" onclick="selectAll(this,'checkboxes')"/>SelectAll
                </td>
                <td>NewsID</td>
                <td>Title</td>
                <td>Time</td>
                <td>Content</td>
                <td>Edit</td>
            </tr>

            <?php
            require_once('database.php');
            require_once('head.php');
            $res = $pdo->query("select * from sei_news");
            foreach ($res as $row) {
                echo "<tr>";
                echo "<td><input type='checkbox' name='checkboxes[]' value='{$row['N_ID']}' />" . "</td>";
                echo "<td>" . $row["N_ID"] . "</td>";
                echo "<td>" . $row["title"] . "</td>";
                echo "<td>" . $row["time"] . "</td>";
                echo "<td>" . $row["content"] . "</td>";
                echo "<td> <button type='button' class='btn_edit' name='edit' data-target='#addUserModal' data-toggle='modal' id={$row['N_ID']}>Edit</button ></td>";
            }
            ?>
        </table>
        <input class="button" type="submit" name="delete_mul" value="Delete"/>
    </form>
    <div style="margin-top:1px;">
        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addUserModal" name="add" id="add">
            Add News
        </button>
        <div id="course_data" class="table-responsive">

        </div>
    </div>
</div>
<form method="post" action="" class="form-horizontal" role="form" id="form_data" onsubmit="return validate_form_news(this)"
      style="margin: 30px;">
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" id="modal-dialog" title="Add News">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Add News
                    </h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label> Title</label>
                            <input type="text" name="title" id="title" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label> Time</label>
                            <input type="date" name="time" id="time" class="form-control"/>
                        </div>

                        <div class="form-group">
                            <label> Content</label>
                            <input type="text" name="content" id="content" class="form-control"/>
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
                    var title = 'Add News';
                    $(".modal-title").html(title);
                    var btn_insert = '<input type="submit" name="form_action" id="form_action" class="btn btn-primary" value="insert"/>';
                    $("#btn_content").html(btn_insert);
                    $("#title").val("");
                    $("#time").val("");
                    $("#content").val("");
                    $("#form_action").on('click', function (e) {
                        e.preventDefault();
                        //the button got clicked
                        var title = document.getElementById("title").value;
                        var time = document.getElementById("time").value;
                        var content = document.getElementById("content").value;
                        var operate = "addNews";
                        $.ajax({
                            url: "n_action.php",
                            type: 'post',
                            data: {'operate': operate, 'title': title, 'time': time, 'content': content},
                            success: function got_success_msg(msg) {
                                alert(msg);
                                window.location.href = "news.php?";
                            },
                            dataType: "text"
                        });
                    });
                });
            });
            $(document).ready(function () {
                $(".btn_edit").on('click', function (e) {
                    e.preventDefault();
                    var title = 'Edit News';
                    $(".modal-title").html(title);
                    var btn_edit = '<input type="submit" name="form_action" id="form_action_edit" class="btn btn-primary" value="edit"/>';
                    $("#btn_content").html(btn_edit);
                    var nameID = $(this).attr("id");
                    var operate = "showNews";
                    $.ajax({
                        url: "n_action.php",
                        type: 'post',
                        data: {'operate': operate, 'nameID': nameID},
                        success: function got_success_msg(msg) {
                            $("#title").val(msg.title);
                            $("#time").val(msg.time);
                            $("#content").val(msg.content);
                            $("#form_action_edit").on('click', function (e) {
                                e.preventDefault();
                                //the button got clicked
                                var title = document.getElementById("title").value;
                                var time = document.getElementById("time").value;
                                var content = document.getElementById("content").value;
                                var operate = "editNews";
                                $.ajax({
                                    url: "n_action.php",
                                    type: 'post',
                                    data: {
                                        'operate': operate,
                                        'title': title,
                                        'time': time,
                                        'content': content,
                                        'nameID': nameID
                                    },
                                    success: function got_success_msg(msg) {
                                        alert(msg);
                                        window.location.href = "news.php?";
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
