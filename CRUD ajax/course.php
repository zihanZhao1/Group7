<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Course Management - Durham University</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="css/index.css" type="text/css" />
        <link rel="stylesheet" href="css/jquery-ui.css" type="text/css" /> 
        <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />

        <script src="js/jquery-3.4.1.min.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </head>
    <body class="home">
	<div class="container-fluid">
            <div id="header" class="row-fluid">
                <div class="span12">
                  <h1>
                      <a href="/" class="pull-right">
                        <img width="140" src="img/durham-university-logo-white.png" alt="Durham University" class="durham-university-logo">
                      </a>
                      <a href="/" class="pull-left">
                          <img src="img/teamdurham.png" alt="Team Durham" class="team-durham-logo" />
                      </a>
                      <a href="/" class="team-durham-slogan">
                          <span class="light">Durham University</span><br/>Sport<br/><br/>
                          <span class="slogan">Enabling Exceptional People to do Exceptional Things</span>
                      </a>
                    </h1>
                </div>
            </div>	
            <div id="navigation" class="row-fluid">
                <div class="span12">
                    <ul class="nav nav-pills">
                        <li><a href="#0">Home</a></li>
                        <li><a href="facility.php">Facilities</a></li>
                        <li class="active"><a href="#">Courses</a></li>
                        <li><a href="#3">Calendar</a></li>
                        <li><a href="#4">Help</a></li>
                        <li><a href="#5">About Us</a></li>
                    </ul>
                </div>
            </div>	
        
            <div class="container" style="width:1200px; height:600px;">
                <p><br></p>
                <div style="margin-bottom:5px;">
                    <button type="button" name="add" id="add" class="btn btn-primary btn-xs" style="margin-left: 20px;">Add New Course</button>
                </div>
                <div id="course_data" class="table-responsive">

                </div>
            </div>
            <div id="course_dialog" title="Add New Course">
                <form method="post" id="course_form">
                    <div class="form-group">
                        <label>Enter Course Name</label>
                        <input type="text" name="cn" id="cn" class="form-control" />
                        <span id="error_cn" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Enter Start Time</label>
                        <input type="text" name="st" id="st" class="form-control" />
                        <span id="error_st" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Enter Duration</label>
                        <input type="number" name="d" id="d" class="form-control" />
                        <span id="error_d" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label>Enter Start date</label>
                        <input type="date" name="sd" id="sd" class="form-control" />
                        <span id="error_sd" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <input type="hidden" name="action" id="action" value="insert" />
                        <input type="hidden" name="hidden_id" id="hidden_id" />
                        <input type="submit" name="form_action" id="form_action" class="btn btn-primary" value="Insert" />
                    </div>
                </form>
            </div>
            <div id="action_alert" title="Action">
            
            </div>
        
            <div id="delete_confirmation" title="Confirmation">
                <p>Are you sure you want to Delete this data?</p>
            </div>
        </div>
        <div class="container-fluid no-border">
            <div id="footer" class="row-fluid">
                <div class="span12">

                </div>
            </div>
        </div>   
    </body>
</html>
        
<script>
    $(document).ready(function(){
        
        load_data();
        
        function load_data(){
            $.ajax({
                method:"POST",
                url:"fetch.php",
                success: function(data){
                    $('#course_data').html(data);
                }
            });
        }

        $('#course_dialog').dialog({
            autoOpen: false, 
            width:400
        });

        $('#add').on('click',function(){
            $('#course_dialog').attr('title','Add Course');
            $('#action').val('insert');
            $('#form_action').val("Insert");
            $('#course_form')[0].reset();
            $('#form_action').attr('disabled', false);
            $('#course_dialog').dialog('open');
        });
                
        $('#course_form').on('submit',function(event){
            event.preventDefault();
            var error_cn = '';
            var error_st = '';
            var error_d = '';
            var error_sd = '';
                    
            if($('#cn').val()==''){
                error_cn = 'Course Name is required';
                $('#error_cn').text(error_cn);
                $('#cn').css('border-color','#cc0000');
            }else{
                error_cn = '';
                $('#error_cn').text(error_cn);
                $('#cn').css('border-color','');
            }
                    
            if($('#st').val()==''){
                error_st = 'Start Time is required';
                $('#error_st').text(error_st);
                $('#st').css('border-color','#cc0000');
            }else{
                error_st = '';
                $('#error_st').text(error_st);
                $('#st').css('border-color','');
            }
                    
            if($('#d').val()==''){
                error_d = 'Duration is required';
                $('#error_d').text(error_d);
                $('#d').css('border-color','#cc0000');
            }else{
                error_d = '';
                $('#error_d').text(error_d);
                $('#d').css('border-color','');
            }
                    
            if($('#sd').val()==''){
                error_sd = 'Start Date is required';
                $('#error_sd').text(error_sd);
                $('#sd').css('border-color','#cc0000');
            }else{
                error_sd = '';
                $('#error_sd').text(error_sd);
                $('#sd').css('border-color','');
            }   
            if(error_cn != '' || error_st != '' || error_d != '' || error_sd != ''){
                return false;
            }else{  
                $('#form_action').attr('disabled','disabled');
                var form_data = $(this).serialize();
                $.ajax({
                    url:"action.php",
                    method:"POST",
                    data:form_data,
                    success:function(data)
                    {
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
            autoOpen:false
        });
        
        $(document).on('click', '.edit', function(){
            var id = $(this).attr("id");
            var action = 'fetch_single';
            $.ajax({
                url:"action.php",
                method:"POST",
                data:{id:id, action:action},
                dataType:"json",
                success:function(data){
                    $('#cn').val(data.cn);
                    $('#st').val(data.st);
                    $('#d').val(data.d);
                    $('#sd').val(data.sd);
                    $('#course_dialog').attr('title','Edit Course');
                    $('#action').val('update');
                    $('#hidden_id').val(id);
                    $('#form_action').val('Update');
                    $('#course_dialog').dialog('open');
                }
            });
        });
        
        $('#delete_confirmation').dialog({
            autoOpen:false,
            modal: true,
            buttons:{
                Ok : function(){
                    var id = $(this).data('id');
                    var action = 'delete';
                    $.ajax({
                        url:"action.php",
                        method:"POST",
                        data:{id:id, action:action},
                        success:function(data)
                        {
                            $('#delete_confirmation').dialog('close');
                            $('#action_alert').html(data);
                            $('#action_alert').dialog('open');
                            load_data();
                        }
                    });
                },
                Cancel : function(){
                    $(this).dialog('close');
                }
            }	
        });

        $(document).on('click', '.delete', function(){
            var id = $(this).attr("id");
            $('#delete_confirmation').data('id', id).dialog('open');
        });
    });
</script>