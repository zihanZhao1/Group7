$(document).ready(function () {
    for (var i = 0; i < allBooking.length; i++) {
        allBooking[i].allDay = false
    }

//Sat May 11 2019 12:00:00 GMT+0100 (英国夏令时间)
    if ($('.calendar').length > 0) {

        $('.calendar').fullCalendar({
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            allDaySlot:false,
            minTime:7,
            maxTime:23,
            buttonText: {
                today: 'Today'
            },
            editable: false,
            events: allBooking,

            eventClick: function(calEvent, jsEvent, view) {
                alert(calEvent.title);
                // change the border color just for fun
                $(this).css('border-color', 'red');
            }
        });
    }
});

