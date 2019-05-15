$(document).ready(function () {
    for (var i = 0; i < allActivity.length; i++) {
        allActivity[i].allDay = false
    }

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
            events: allActivity,
        });
    }
});
