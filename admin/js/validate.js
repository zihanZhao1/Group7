//check field whether is empty
function validate_required(field, alerttxt) {
    with (field) {
        if (value == null || value == "") {
            alert(alerttxt);
            return false
        } else {
            return true
        }
    }
}


//return msg to user when these situation occur
function validate_form(thisform) {
    with (thisform) {

        if (validate_required(name, "course name must be filled out!") == false) {
            name.focus();
            return false
        } else if (validate_required(time, "course time must be filled out!") == false) {
            time.focus();
            return false
        } else if (validate_required(weeks, "course duration must be filled out!") == false) {
            weeks.focus();
            return false
        } else if (validate_required(start, "course start time must be filled out!") == false) {
            start.focus();
            return false
        }

    }
}

function validate_form_facility(thisform) {
    with (thisform) {

        if (validate_required(name, "facility name must be filled out!") == false) {
            name.focus();
            return false
        // } else if (validate_required(img, "facility image must be uploaded!") == false) {
        //     facility.focus();
        //     return false
         } else if (validate_required(price, "facility price must be filled out!") == false) {
            price.focus();
            return false
        } else if (validate_required(capability, "facility capability must be filled out!") == false) {
            capability.focus();
            return false
        } else if (validate_required(open, "facility open used time must be filled out!") == false) {
            open.focus();
            return false
        } else if (validate_required(close, "facility close used time must be filled out!") == false) {
            close.focus();
            return false
        } else if (validate_required(info, "facility info used time must be filled out!") == false) {
            info.focus();
            return false
        }
    }
}

function validate_form_news(thisform) {
    with (thisform) {

        if (validate_required(title, " news title must be filled out!") == false) {
            title.focus();
            return false
        } else if (validate_required(time, "news time must be filled out!") == false) {
            time.focus();
            return false
        } else if (validate_required(content, "news content duration must be filled out!") == false) {
            content.focus();
            return false
        }

    }
}
function validate_form_booking(thisform) {
    with (thisform) {

        if (validate_required(f_name, "facility name must be filled out!") == false) {
            f_name.focus();
            return false
        } else if (validate_required(start, "start time must be filled out!") == false) {
            start.focus();
            return false
        } else if (validate_required(end, " end time must be filled out!") == false) {
            end.focus();
            return false
        } else if (validate_required(count, "booking count must be filled out!") == false) {
            count.focus();
            return false
        }
        else if (validate_required(Avb, "booking availability must be filled out!") == false) {
            Avb.focus();
            return false
        }
        else if (validate_required(U_ID, "userID must be filled out!") == false) {
            U_ID.focus();
            return false
        }
    }
}