(function ($){
    $.fn.priceCalendar = function (options) {
        var defaults = {
            options: {
                step: 2,
                showAlways: true,
                tipText: "yyyy-MM-dd",
                dateName: "date",
                today: new Date().toFormatString("yyyy-MM-dd")
            },
            data: {
                url: "",
                method: "GET",
                callback: function (r) {
                    return cQuery.parseJSON(r)
                }
            },
            ids: {
                wrapper: "#calendar-month"
            },
            festival: {
                "2015-02-18": ["c_chuxi", "除夕"],
                "2014-01-30": ["c_chuxi", "除夕"],
                "2013-02-09": ["c_chuxi", "除夕"],
                "2015-02-19": ["c_chunjie", "春节"],
                "2014-01-31": ["c_chunjie", "春节"],
                "2013-02-10": ["c_chunjie", "春节"],
                "2015-03-05": ["c_yuanxiao", "元宵"],
                "2014-02-14": ["c_yuanxiao", "元宵"],
                "2013-02-24": ["c_yuanxiao", "元宵"],
                "2015-04-05": ["c_qingming", "清明"],
                "2014-04-05": ["c_qingming", "清明"],
                "2013-04-04": ["c_qingming", "清明"],
                "2015-06-20": ["c_duanwu", "端午"],
                "2014-06-02": ["c_duanwu", "端午"],
                "2013-06-12": ["c_duanwu", "端午"],
                "2015-09-27": ["c_zhongqiu", "中秋"],
                "2014-09-08": ["c_zhongqiu", "中秋"],
                "2013-09-19": ["c_zhongqiu", "中秋"],
                "01-01": ["c_yuandan", "元旦"],
                "05-01": ["c_wuyi", "劳动"],
                "10-01": ["c_guoqing", "国庆"],
                "12-25": ["c_shengdan", "圣诞"]
            },
            listeners: {
                onNext: function (e) { },
                onPrev: function (e) { },
                onNav: function (info) {
                    var root = info.root;
                    info.prev ? root.find(".prev").removeClass("disable") : root.find(".prev").addClass("disable");
                    info.next ? root.find(".next").removeClass("disable") : root.find(".next").addClass("disable");
                    root.find("#month-nav").html(cQuery.tmpl.render(defaults.template.mouthNav, info))
                },
                onStartChange: function () { },
                onEndChange: function () { },
                onEnd: function () { },
                onStart: function () { },
                onSelect: function () { }
            },
            template: {
                wrapper: '                    <ul class="header layoutfix">                        <li class="bold">六</li>                        <li>五</li>                        <li>四</li>                        <li>三</li>                        <li>二</li>                        <li>一</li>                        <li class="bold">日</li>                    </ul>                    <div id="calendarWrap" class="layoutfix">                        <div class="left">                            <div id="month-nav" class="month"></div>                            <a href="javascript:;" class="nav prev disable" data-action="prev">上个月</a>                            <a href="javascript:;" class="nav next" data-action="next">下个月</a>                        </div>                        <div id="calendar-month" class="right"></div>                    </div>',
                calendar: '                    <table>                    {{each(index, value, length) calendar.dataArray}}                    {{ if week == 0 }}                    {{ if index == 0 }}                    <tr>                    {{ else }}                    </tr><tr>                    {{ /if }}                    {{ /if }}                    <td class="${value.month == calendar.currMonth ? "even" : "odd"}">                        <a href="javascript:;"                        {{ if value.price}}                        class="on{{if value.select && calendar.currMonth == value.month}} select{{/if}}"  data-index="${ value.index }" data-action="select"                        {{ /if }}                        {{if value.festival}}                        title="${value.festival[1]}"                        {{/if}}>                        {{if value.festival}}<i></i>{{/if}}{{ if calendar.currMonth == value.month}}                        <span class="date">${value.day}</span>                        {{ if value.price}}<span class="price"><dfn>¥</dfn>${value.price}</span>{{ /if }}                        {{/if}}                        </a>                    </td>                    {{ if index == length - 1}} </tr> {{/if}} {{/each}}                    </table>',
                mouthNav: '                    <div class="month-prev row-${row}">                        <span>${year1}年<br>${month1}月</span>                    </div>                    <div class="month-next row-${5-row}">                        {{if row == 1}}                        <span>${year2}年<br>${month2}月</span>                        {{else}}                        {{if month2 == 1}}                        <span>${year2}年<br>${month2}月</span>                        {{else}}<span>${month2}月</span>                         {{/if}}{{/if}}                    </div>'
            }
        };

        $.fn.extend(this, {
            init: function (options) {
                var inst = cQuery.extend(true, defaults, options || {});
                this.currIndex = 0;
                this.id = inst.id;
                this.$el = cQuery(this[0]);
                this.opt = inst.options;
                this.ids = inst.ids;
                this.template = inst.template;
                this.data = inst.data;
                this.listeners = inst.listeners;
                this.festival = inst.festival;
                this.calendar = [];
                this.$el.html(this.template.wrapper);
                this.listeners.onStart();
                this._initEvent()
            },
            showLoading : function(){
                $("#calendar-month", this[0]).addClass("loading");
            },
            hideLoading : function(){
                $("#calendar-month", this[0]).removeClass("loading");
            },
            setData : function (data) {
                var opt = this.opt;
                var len = data.length;
                var para = opt.dateName;
                var _day;
                this.data = data;
                this._data = {};
                this.currIndex = 0;
                opt.minDate = this._getFirstday(len == 0 ? new Date() : this._toDate(data[0][para]));
                opt.maxDate = this._getLastday(len == 0 ? new Date() : this._toDate(data[len - 1][para]));
                for (var i = 0; i < len; i++) {
                    _day = this._toDate(data[i][para]);
                    this._data[_day.toFormatString(opt.tipText)] = data[i]
                }
                this._calcCalendar();
                this.render();
                this.listeners.onEnd(this.id)
            },
            _getFirstday: function (time) {
                var new_year = time.getFullYear();
                var new_month = time.getMonth();
                return new Date(new_year, new_month, 1)
            },
            _getLastday: function (time) {
                var new_year = time.getFullYear();
                var new_month = time.getMonth() + 1;
                if (new_month >= 12) {
                    new_month -= 12;
                    new_year++
                }
                var new_date = new Date(new_year, new_month, 1);
                return new Date(new_date.getTime() - 1000 * 60 * 60 * 24)
            },
            _getWeeks: function (maxDate, minDate) {
                var add = minDate.getDay() > maxDate.getDay();
                return add ? Math.floor(this._getDays(maxDate, minDate) / 7) + 1 : Math.floor(this._getDays(maxDate, minDate) / 7)
            },
            _getDays: function (maxDate, minDate) {
                return parseInt((maxDate - minDate) / 1000 / 60 / 60 / 24)
            },
            _calcCalendar: function () {
                var opt = this.opt;
                var minDate, maxDate, year_min, month_min, day_min, range, diff, _day, _dayStr, _dayObj, days;
                var festival = this.festival;
                minDate = opt.minDate;
                maxDate = opt.maxDate;
                this.min = minDate.toFormatString(opt.tipText);
                this.max = maxDate.toFormatString(opt.tipText);
                year_min = minDate.getFullYear();
                month_min = minDate.getMonth();
                diff = minDate.getDay();
                day_min = minDate.getDate() - diff;
                var max = new Date(this.max);
                var maxMonth = max.getFullYear() * 12 + max.getMonth();
                var min = new Date(this.min);
                var minMonth = min.getFullYear() * 12 + min.getMonth();
                this.pages = maxMonth - minMonth;
                range = this._getDays(maxDate, minDate) + minDate.getDay() + 14 - maxDate.getDay();
                var lastMonthMinDay = this._getFirstday(maxDate).getDay();
                var lastMonthDays = this._getDays(maxDate, lastMonthMinDay);
                var today = new Date;
                var today_m = today.getMonth();
                var today_d = today.getDate();
                for (var i = 0; i < range; i++) {
                    _day = new Date(year_min, month_min, day_min + i);
                    _dayStr = _day.toFormatString(opt.tipText);
                    _dayObj = {
                        year: _day.getFullYear(),
                        wm: _day.getMonth() < month_min ? month_min : (_day.getMonth() > maxDate.getMonth() ? maxDate.getMonth() : _day.getMonth()),
                        month: _day.getMonth(),
                        day: today_m === _day.getMonth() && today_d === _day.getDate() ? "今天" : _day.getDate() > 9 ? _day.getDate() : "0" + _day.getDate(),
                        week: _day.getDay(),
                        index: i,
                        festival: festival[_dayStr] || festival[_dayStr.substring(5)] || false
                    };
                    _dayObj = cQuery.extend(_dayObj, this._data[_dayStr]);
                    this.calendar.push(_dayObj)
                }
            },
            render: function (type) {
                var _this = this;
                var html, tmpl;
                if (cQuery.type(_this.template.calendar) === "object") {
                    tmpl = cQuery(_this.template.calendar.id).html()
                } else {
                    tmpl = _this.template.calendar
                }
                var weeks = 0;
                if (!type) { } else {
                    if (type === "prev") {
                        this.currIndex--;
                        this.currIndex = Math.max(this.currIndex, 0)
                    } else {
                        this.currIndex++;
                        if (this.currIndex >= this.pages) {
                            this.currIndex = this.pages
                        } else { }
                    }
                }
                this.min = this.min.replace(/-/g, "/");
                var yearadd = new Date(this.min).getFullYear();
                var monthadd = new Date(this.min).getMonth();
                monthadd += this.currIndex;
                if (monthadd >= 12) {
                    yearadd += 1;
                    monthadd -= 12
                }

                weeks = this._getWeeks(new Date(yearadd, monthadd, 1), new Date(this.min));
                _this.dataArray = _this.calendar.slice(weeks * 7, weeks * 7 + 42);
                this._calculateCur();
                html = cQuery.tmpl.render(tmpl, {
                    calendar: _this
                });
                _this.$el.find(_this.ids.wrapper).html(html)
            },
            _calculateCur: function () {
                var first = this.dataArray[0];
                var first_lastDay = new Date(first.year, first.month + 1, 0).getDate();
                //var range = first_lastDay - first.day + 1;
                var first_day = (first.day && parseInt(first.day)) || (first.date && this._toDate(first.date).getDate()) || (new Date()).getDate();
                //debugger;
                var range = first_lastDay - first_day + 1;
                var range2 = range > 25 ? Math.ceil(range / 2) : range;
                var middle = this.dataArray[range2];
                this.currMonth = middle.month;
                this.listeners.onNav({
                    root: this.$el,
                    year1: first.year,
                    year2: middle.year,
                    month1: first.month + 1,
                    month2: middle.month + 1,
                    row: Math.floor(range / 7),
                    prev: this.currIndex !== 0,
                    next: this.currIndex !== this.pages
                })
            },
            _initEvent: function () {
                var _this = this;
                _this.$el.bind("click", function (e) {
                    var target = e.target || e.srcElement;
                    target = _this.closest(target, "a");
                    if (!target || cQuery(target).hasClass("disable")) {
                        return
                    }
                    var type = target.getAttribute("data-action");
                    type && _this[type] && _this[type](e, target)
                }
                )
            },
            closest: function (target, until) {
                var matched = [];
                var cur = target;
                while (cur && cur.nodeType !== 9) {
                    if (cur.nodeName.toLowerCase() == until) {
                        return cur
                    }
                    cur = cur.parentNode
                }
                return false
            },
            prev: function (e, target) {
                this.render("prev")
            },
            next: function (e) {
                this.render("next")
            },
            select: function (e, target) {
                var ele = cQuery(target);
                var index = ele.attr("data-index");
                var obj = this.calendar[index];
                this.listeners.onSelect(this.id, obj)
            },
            _toDate: function (str) {
                return str.toDate()
            }
        });
        this.init(options);
        return this;
    };

    var defaults = {
        html: '<div class="jmp_box"></div>',
        errorClass: 'input_error'
    };

    var methods = {

        dispatch: function (options, css) {
            var ele = $(this);
            var offset = ele.offset();
            var left = offset.left + ele.outerWidth();
            var top = offset.top;
            // 错误提示
            var jmp = $(options.html);
            ele.data("jmp", jmp);
            if (options.cssStyle) {
                jmp.appendTo("body").css(options.cssStyle);
            } else {
                jmp.appendTo(ele.parent());
            }
            jmp.addClass(css).html("<i></i>" + options.message);
            jmp.fadeIn(100);
            css == "error" && ele.addClass(options.errorClass);
            if (options.hide) {
                setTimeout(function () {
                    ele.jmp("destroy");
                }, options.delay || 2000);
            }
        },

        error: function (options) {
            options = $.extend({}, defaults, options);
            return this.each(function () {
                var ele = $(this);
                if (ele.data("jmp")) return;
                methods.dispatch.call(this, options, "error");
            });
        },

        warn: function (options) {
            options = $.extend({}, defaults, options);
            return this.each(function () {
                var ele = $(this);
                if (ele.data("jmp")) return;
                methods.dispatch.call(this, options, "warn");
            });
        },

        destroy: function () {
            return this.each(function (index, el) {
                var ele = $(this);
                ele.removeClass(defaults.errorClass);
                var html = ele.data("jmp");
                if (html) {
                    html.remove();
                    ele.data("jmp", "");
                }
            });
        }
    }

    $.fn.jmp = function () {
        var arg1 = arguments[0];
        var method;
        if (!!methods[arg1]) {
            method = methods[arg1];
            arguments = [].slice.call(arguments, 1);
        } else if (typeof arg1 == 'object' || !arg1) {
            method = methods.error;
        } else {
            $.error('Method ' + arg1 + ' does not exist on jQuery.pluginName');
            return this;
        }
        return method.apply(this, arguments);
    };
})(jQuery);