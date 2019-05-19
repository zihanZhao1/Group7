<html>
<head>
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../js/jquery-3.4.1.min.js"></script>
    <script src="../js/validate.js"></script>
	<script type="text/javascript">
//show users
  
//show matches

	//show block
	function Showblocks()   //
    {        
        $.ajax({
            async:false,
            url:"manageData.php",
            data:{type:0},     //type
            type:"POST",
            dataType:"JSON",
            success: function(data){
              	 var title= "<table width='80%' border='1' cellpadding='0' cellspacing='0'><tr height='30px'><td></td><td>Facility ID</td><td>Facility Name</td><td>Block start time</td><td>Block end time</td><td>Availability</td></tr>";
					var dataObj = data,str = "";
                         $.each(dataObj, function(index, item){
							 str+="<tr><td><input type='checkbox' value='"+item.B_ID+"' class='ck' /></td><td>"+item.F_ID+"</td><td>"+item.name+"</td><td>"+item.start+"</td><td>"+item.end+"</td><td>"+item.Avb+"</td></tr>";
                             
                         });
						str+="<tr height='30px'><td colspan='7'><input type='checkbox' id='qx' /> ALL <input class='btn btn-primary btn-sm' type='button' id='btn' value='Delete' /></td></tr>";
						 str+="<tr height='30px'><td colspan='7'>Facility ID:<input size=10 type='text' id ='F_ID' >Block start time:<input size=15 type='text' id='start'>Block end time:<input size=15 type='text' id='end'><input class='btn btn-primary btn-sm' type='button' id='addData' value='Add Block' /></td></tr>";
						
						str+="</table>";
			 $("#blocks").html(title+str);
                }              
            });   
		
		$("#qx").click(function(){
        //find object
        var xz = $(this)[0].checked;
        //select all
        var ck =$(".ck");        
        ck.prop("checked",xz);        
        })
        
    //delete
    $("#btn").click(function(){
        //find primary key
        var ck =$(".ck");
        var str ="";
        for(var i=0;i<ck.length;i++)
        {
            if(ck.eq(i).prop("checked"))
            {
                str+=ck.eq(i).val()+",";    
            }    
        }
     
        $.ajax({
            //url:"Delete.php",
            url:"manageData.php",
            data:{str:str,type:1},
            type:"POST",
            dataType:"TEXT",
            success: function(data){
					alert(data);   
					Showblocks();
                }            
            });        
        })
		
		// Add button
		 
			 $("#addData").click(function(){
			//find primary key
			var F_ID =$("#F_ID").val();
			var start =$("#start").val();
			var end =$("#end").val();
			$.ajax({
				url:"manageData.php",
				data:{F_ID:F_ID,start:start,end:end,type:2},
				type:"POST",
				dataType:"TEXT",
				success: function(data){
						alert(data);   
						Showblocks();
					}            
				});        
			})
			
				
    
  
    }


//modify data
	
	
	//	 Show block Leaderboard
	 
	
	
	
	//Show Player Leaderboard
	
	
  // grab data
 
</script>
</head>
<body>
<?php require_once('head.php') ?>
<div class="container-fluid" align="left">
<input class="button" type="button" value="Show blocks" onclick="Showblocks()">
<div id="blocks" >
</div>  
</div>
</body>
</html>

