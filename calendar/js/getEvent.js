var getEvent = {
    includes:'sqlEvent.php',

    curEvent : function (date) {

        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var dateRec = year+'-'+month+'-'+day
        var tmp = null;
        // var allEvents =
        // alert(allEvents)
        // for (e in allEvents) {
        //     alert(e.start)
        //     year == e.start.getFullYear()&&month == e.start.getMonth()&&day == e.start.getDate()
        //     if () {
        //         tmp = tmp+e.title+"&";
        //     }
        // }

        return tmp;
    }
}