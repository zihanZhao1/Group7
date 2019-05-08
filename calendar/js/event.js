
var event = {
    /**
     */
    getEvent: function (date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day =  date.getDate();
        var event = event.getEvents(date);
        if (event) {
            return event
        }
    },
}