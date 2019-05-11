/**
 * Author : 一只鹿
 * Date   : 2017.9.29
 * Email  : 1005526074@qq.com
 * Blog   : https://ideer.me/
 * More   : http://www.jq22.com/mem310935
 * PS     : 请在转载时保留作者信息！
 * PS     : ChineseCalendar.js文件来源: http://www.jianshu.com/p/936077e7727a
 **/
;(function (window, undefined) {
    var calendar = document.querySelector('#calendar')
    var simpleMonth_area = calendar.querySelector('.sidebar')
    var simpleMonth_title = simpleMonth_area.querySelector('.date')
    var fullMonth_area = calendar.querySelector('#renderFullYear')
    var fullMonth_title = fullMonth_area.querySelector('h2')
    var detailMonth = calendar.querySelector('#renderMonth')
    var detailMonth_title = detailMonth.querySelector('.title')
    var detailMonth_day = detailMonth.querySelector('.day')

    var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var tab_num = 0 // tab切换记录值
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth()

    renderTab()
    initalToday()

    // tab切换
    function renderTab() {
        var aTab = calendar.querySelector('.header').querySelectorAll('li')
        var aRender = calendar.querySelectorAll('.render')

        for (var i = 0; i < aTab.length; i++) {
            aTab[i].index = i

            aTab[i].onclick = function () {
                for (var j = 0; j < aTab.length; j++) {
                    aTab[j].className = ''
                    aRender[j].className = 'render'
                }

                aTab[this.index].className = 'cur'
                aRender[this.index].className = 'render render-show'

                tab_num = this.index
            }
        }
    }

    // 初始化渲染日期
    function initalToday() {
        simpleMonth_title.innerHTML = monthArr[month + 1] + ' ' + year
        fullMonth_title.innerHTML = year
        detailMonth_title.innerHTML = monthArr[month + 1] + ' ' + year

        renderFullMonth()
        tools.renderDetailMonth(detailMonth_day, year, month)
        dateEvent()
    }

    // 渲染侧边栏&全年月份
    function renderFullMonth() {
        var sidebar_day = simpleMonth_area.querySelector('.day')
        var fullYear_month = fullMonth_area.querySelector('.month')
        var fullMonth_hmtl = ``

        for (var i = 0; i < 12; i++) {
            fullMonth_hmtl += `<li class="item">
                          <div class="title">${monthArr[i]}</div>
            <ul class="week">
                <li>Sun</li>
                <li>Mon</li>
                <li>Thu</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>
                          <ul class="day">${tools.renderDay(year, i)}</ul>
                        </li>`
        }

        fullYear_month.innerHTML = fullMonth_hmtl
        sidebar_day.innerHTML = tools.renderDay(year, month)
    }

    function dateEvent() {
        var sidebar_prevBtn = simpleMonth_area.querySelector('.btn-prev')
        var sidebar_nextBtn = simpleMonth_area.querySelector('.btn-next')
        var control = calendar.querySelector('#control')
        var control_btnPrev = control.querySelector('.btn-prev')
        var control_today = control.querySelector('.today')
        var control_btnNext = control.querySelector('.btn-next')
        var sidebar_date = simpleMonth_area.querySelectorAll('.day li')

        var dataTime = null

        sidebar_prevBtn.onclick = function () {
            if (month == 0) {
                year--
                month = 11
            } else {
                month--
            }

            initalToday()
        }
        sidebar_nextBtn.onclick = function () {
            if (month == 11) {
                year++
                month = 0
            } else {
                month++
            }

            initalToday()
        }

        control_today.onclick = function () {
            year = today.getFullYear()
            month = today.getMonth()

            initalToday()
        }
        control_btnPrev.onclick = function () {
            if (tab_num == 0) {
                if (month == 0) {
                    year--
                    month = 11
                } else {
                    month--
                }

                tools.renderDetailMonth(detailMonth_day, year, month)
            } else {
                year--
            }

            initalToday()
        }
        control_btnNext.onclick = function () {
            if (tab_num == 0) {
                if (month == 11) {
                    year++
                    month = 0
                } else {
                    month++
                }
            } else {
                year++
            }

            initalToday()
        }

        for (var i = 0; i < sidebar_date.length; i++) {
            sidebar_date[i].onclick = function () {
                dataTime = this.dataset.time
                year = parseInt(dataTime.substr(0, 4))
                month = parseInt(dataTime.substr(4, 2))

                initalToday()
            }
        }
    }
})(window)