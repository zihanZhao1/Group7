var getEvent = {

    curEvent: function (date) {
        var year = date.getFullYear().toString()
        var month = (date.getMonth()+1).toString()
        var day = date.getDate().toString()
        var titles = "";

        if (date.getMonth() < 10) {
            month = "0" + month
        }
        if (date.getDate() < 10) {
            day = "0" + day
        }
        var strdate = year + "-" + month + "-" + day

        var tmp = Array();
        // alert(strdate+" "+allEvents.length)

        for (var i = 0; i < allEvents.length; i++) {
            // alert(allEvents[i].start.split(" ")[0]+strdate)
            // alert(allEvents[i].title)
            var eventDate = allEvents[i].start.split(" ")[0]
            // alert(eventDate)
            if (strdate == eventDate) {
                tmp.push(allEvents[i])
                titles = titles+allEvents[i].title+"</br>"
                // alert(allEvents[i].start)
            }
        }
        if (tmp) {
            return titles;
        }
        return false;
    }
}