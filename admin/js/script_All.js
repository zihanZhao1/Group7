$(document).ready(function(){

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	var event_single;
 
	var events_r = [ ];
	events_r.push(y);
			
		$.ajax({
            async:false,
            url:"../php/calendar.php",    //type
            type:"POST",
            dataType:"JSON",
            success: function(data){
						var dataObj = data;
						var s,e;						
                        $.each(dataObj, function(index, item){
							 s = (item.start).toString();
							 e = (item.end).toString();
							let event_single = { 
								"title":(item.name).toString(),
								"start":new Date(s),
								"end": new Date(e),
								allDay: 0
							};
							events_r.push(event_single);
                             
                     });
                }              
            });  
			
			
	if($('.calendar').length > 0){
		$('.calendar').fullCalendar({
			
			
			
			header: {
				left: 'prev,next,today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			buttonText:{
				today:'Today'
			},
			editable: true,

			events: events_r
		});
	}
	
});