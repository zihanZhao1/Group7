$(document).ready(function () {
    for (var i = 0; i < allEvents.length; i++) {
        allEvents[i].allDay = false
    }
//Sat May 11 2019 12:00:00 GMT+0100 (英国夏令时间)
    if ($('.calendar').length > 0) {

        $('.calendar').fullCalendar({
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            buttonText: {
                today: 'Today'
            },
            editable: false,
            events: allEvents,
        });
    }
});
