var tools = (function () {
    var toolsObj = {
        // 渲染弹出框
        renderPopup: function (festival, obj, str) {
            var title = obj.querySelector('.title')
            var date = obj.querySelector('.date')
            // var lunar = obj.querySelector('.lunar')

            var dateFormat = tools.strFormatDate(str)
            // var lunarObj = ChineseCalendar.date2lunar(dateFormat);

            console.log(dateFormat)

            title.innerHTML = festival.innerHTML
            date.innerHTML = dateFormat.getFullYear() + '年' + (dateFormat.getMonth() + 1) + '月' + dateFormat.getDate() + '日'
            // lunar.innerHTML = lunarObj.lunarMonthChiness + lunarObj.lunarDayChiness + '  ·  ' + lunarObj.gzY + '年' + lunarObj.gzM + '月' + lunarObj.gzD + '日'
        },

        // 侧边栏及全年月份数据返回
        renderDay: function (year, n) {
            var year = year
            var month = n
            var firstDay = new Date(year, n, 1) // 月份列表第一天
            var _hmtl = ``

            for (var i = 0; i < 42; i++) {
                var allDay = new Date(year, month, i + 1 - firstDay.getDay());
                var allDay_str = tools.returnDateStr(allDay)
                var firstDay_str = tools.returnDateStr(firstDay)

                if (tools.returnDateStr(new Date()) === allDay_str) { // 当天
                    _hmtl += `<li data-time="${allDay_str}" class="cur-day">${allDay.getDate()}</li>`
                } else if (firstDay_str.substr(0, 6) === allDay_str.substr(0, 6)) { // 当前月份
                    _hmtl += `<li data-time="${allDay_str}" class="cur-month">${allDay.getDate()}</li>`
                } else {
                    _hmtl += `<li data-time="${allDay_str}">${allDay.getDate()}</li>`
                }
            }
            return _hmtl
        },

        // 月份详情
        renderDetailMonth: function (dayWrapper, recivedYear, recivedMonth) {
            var array = []
            var recivedDate = new Date()
            var _html = ``

            var date = new Date(recivedYear, recivedMonth, 1)
            date.setDate(1)
            var week = date.getDay()
            date.setDate(1 - week)
            var month = date.getMonth()

            for (var i = 0; i < 42; i++) {
                if (month !== recivedMonth) {
                    if (date.getDay() === 0 || date.getDay() === 6) {
                        array.push({
                            day: date.getDate(),
                            event: event.getEvent(date),
                            state: 'weekend',
                            dateStr: tools.returnDateStr(date)
                        })
                    } else {
                        array.push({
                            day: date.getDate(),
                            event: event.getEvent(date),
                            state: '',
                            dateStr: tools.returnDateStr(date)
                        })
                    }
                } else if (tools.curDay(date, recivedDate)) {
                    if (date.getDay() === 0 || date.getDay() === 6) {
                        array.push({
                            day: date.getDate(),
                            // event: event.getEvent(date),
                            state: 'weekend cur-day',
                            dateStr: tools.returnDateStr(date)
                        })
                    } else {
                        array.push({
                            day: date.getDate(),
                            // event: event.getEvent(date),
                            state: 'cur-day',
                            dateStr: tools.returnDateStr(date)
                        })
                    }
                } else {
                    if (date.getDay() === 0 || date.getDay() === 6) {
                        array.push({
                            day: date.getDate(),
                            // event: event.getEvent(date),
                            state: 'weekend cur-month',
                            dateStr: tools.returnDateStr(date)
                        })
                    } else {
                        array.push({
                            day: date.getDate(),
                            // event: event.getEvent(date),
                            state: 'cur-month',
                            dateStr: tools.returnDateStr(date)
                        })
                    }
                }

                date.setDate(date.getDate() + 1)
                month = date.getMonth()
            }

            for (var j = 0; j < array.length; j++) {
                _html += `<li data-time="${array[j].dateStr}" class="${array[j].state}">
                    <p class="info">
                      <span class="date"><em>${array[j].day}</em></span>
                    </p>
                  </li>`
            }

            dayWrapper.innerHTML = _html
        },

        returnDateStr: function (date) {
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();

            month = month <= 9 ? ('0' + month) : ('' + month);
            day = day <= 9 ? ('0' + day) : ('' + day);

            return year + month + day;
        },

        // 是否是当天
        curDay: function (oldTime, nowTime) {
            return oldTime.getFullYear() === nowTime.getFullYear() &&
                oldTime.getMonth() === nowTime.getMonth() &&
                oldTime.getDate() === nowTime.getDate()
        },

        // 格式化日期 (如果这里传入的是字符串，那么得到的值不会按照下标去算)
        strFormatDate: function (str) {
            var date = new Date(parseInt(str.substr(0, 4)), parseInt(str.substr(4, 2)), parseInt(str.substr(6)))

            console.log(str)

            return date
        }
    }

    return toolsObj
}())