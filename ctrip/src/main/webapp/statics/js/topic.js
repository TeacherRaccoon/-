var validateShow;
var maxDay = GetMaxDate(); //限售天数
//新增60天限售规则
function GetMaxDate() {
    var nowDate = new Date();
    var nowDay = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
    var myDate = new Date("2014/12/01");

    if (nowDate < myDate) {
        return 19;
    }
    switch (nowDay) {
        case "2014-12-1":
            return 29;
        case "2014-12-2":
            return 35;
        case "2014-12-3":
            return 41;
        case "2014-12-4":
            return 47;
        case "2014-12-5":
            return 53;
        case "2014-12-6":
            return 59;
        default:
            return 59;
    }
}

$.ready(function () {
    //验证火车票输入的信息
    $.mod.load('validate', '1.1', function () {
        var valid = $(document).regMod("validate", "1.1");
        validateShow = function (obj, message) {
            valid.method("show", {$obj: obj, data: message, removeErrorClass: true, hideEvent: "blur", isFocus: true});
        };
    });

    //城市选择框（语言判断）
    $.mod.load('address', '1.0', function () {
        var lang = LANGURL;
        var big5Str = "";
        if (lang == "http://pages.big5.ctrip.com")
            big5Str = ".big5";

        $(".box_search").find("h2").each(function (i) {
            var id = i.attr("id");
            cityCommCountry($('#fromCn_' + id), '#fromEn_' + id, big5Str);
        });
    });
    //日期选择框
    $.mod.load('calendar', '3.1', function () {
        var mindays = new Date().addDays(0).toFormatString('yyyy-MM-dd');
        var maxdays = new Date().addDays(maxDay).toFormatString('yyyy-MM-dd');
        $(".box_search").find("h2").each(function (i) {
            var id = i.attr("id");
            calendarCommContry($('#date_' + id), mindays, maxdays); //开始、结束日期
        });
    });
    //绑定预定按钮事件
    $(".search_content").find(".s_btn").each(function (i) {
        var val = i.attr("val");
        var txt = i.attr("txt");
        goSearchBind($('#goSearch' + val), $('#fromCn_' + val), $('#fromEn_' + val), $('#date_' + val), val, txt);
    });

    //客服
    $.mod.load('sideBar', '2.0', function () {
        var sidebar = $(document).regMod('sideBar', '2.0', {
            url: {
                feedBackURL: 'http://my.ctrip.com/uxp/Community/CommunityAdvice.aspx',
                liveChatURL: ''
            },
            title: {
                backTop: '回到顶端',
                feedBack: '建议反馈',
                liveChat: '在线客服'
            }
        });

        $($('#sidebar a')[2]).get(0).removeAttribute("href");
        $($('#sidebar a')[2]).get(0).setAttribute("id", "sidebarLiveChat");
        $($('#sidebar a')[2]).css("cursor", "pointer");
        $($('#sidebar a')[2]).bind('click', function (e) {
            return __SSO_booking('help', '1');
        });
    });
});

//提示文字
var tipComm = function (nameStr, tipInfo) {
    nameStr.regMod("notice", "1.0", {
        name: nameStr,
        selClass: "base_txtgray",
        tips: tipInfo
    }, true);
}
//国内日期选择框
var calendarCommContry = function (dateStr, startDate, endDate) {
    dateStr.regMod('calendar', '3.1', {
        options: {
            minDate: startDate, //.replace(/\//g, '-'),
            maxDate: endDate,
            autoShow: true,
            showWeek: false
        },
        listeners: {
            onChange: function (input, value) {
                //checkOutDate.trigger('focus');
                //alert(value);
            }
        }
    });
}
//国内城市选择框
var cityCommCountry = function (cityName, param, big5Str) {
    var url = "http://webresource.ctrip.com/code/cquery/resource/address/train/station_UTF8.js";
    if (big5Str != "") {
        url = "http://webresource.ctrip.com/code/cquery/resource/address/train/station_big5.js";
    }
    var addressMod = cityName.regMod('address', '1.0', {
        name: 'barSearch_CityName',
        jsonpSource: url,
        relate: {
            'name_py1': param
        },
        isFocusNext: true,
        isAutoCorrect: true
    });
}

//文本框改变颜色
function changeColor(nameStr) {
    $(nameStr).css("color", "#333");
}

//离开文本框改变颜色
function changeColorLeave(nameStr) {
    if ($(nameStr)[0].value.toString().trim() == "") {
        $(nameStr).css("color", "#999");
    }
}

//绑定查询按钮事件
var goSearchBind = function (goBt, fromCn, fromEn, fromDt, toEn, toCn) {
    //触发火车票搜索按钮
    goBt.bind('click', function (e) {
        if (fromCn[0].value.trim() == "") {
            validateShow(fromCn, "请输入出发城市名称");
            return false;
        }
        if (fromDt[0].value.trim() == "") {
            validateShow(fromDt, "请选择出发日期");
            return false;
        }
        departureDate = fromDt[0].value.trim().replace(/\-/g, '/');
        var d = Math.ceil((new Date(departureDate) - new Date()) / (60 * 60 * 24 * 1000)) + 1;
        var day = "";
        if (d > 1)//过滤
        {
            day = "-d" + d;
        }
        var url = "http://" + location.hostname + "/TrainBooking/Search.aspx?from=" + fromEn[0].value.trim() + "&to=" + toEn + "&day=" + d + "&fromCn=" + fromCn[0].value.trim() + "&toCn=" + toCn;
        if (typeof window.$location == "undefined") window.$location = function (url) {
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var referLink = document.createElement("a");
                referLink.href = url;
                document.body.appendChild(referLink);
                referLink.click()
            } else location.href = url
        };
        $location(url);
        e.preventDefault();
    });
}
/*======================================================浮动按钮点击模块=================================================*/
//在线帮助按钮点击事件
var ChatClick = function (a) {
    return __SSO_booking(a, 1);
}

//在线帮助按钮回调事件
var ChatClickCallBack = function () {
    //帮助链接地址
    window.open(CHATURL);
}

//SSO_Booking回调
function __SSO_submit(a, t) {
    if (a == "help") {
        ChatClickCallBack();
    }
}

function ShowBigImg(line, num) {
    //获取大图路径
    var big_src = $("javascript:void(0)" + line + num).attr("ref");
    //切换大图显示
    $("#big_" + line).attr("src", big_src);
    //循环取出元素是否选中
    $("#ul_" + line).find("a").each(function (o) {
        if (o.hasClass("current")) {
            o.removeClass("current");
        }
    })
    //当前选中
    $("#a_" + line + num).addClass("current");
}