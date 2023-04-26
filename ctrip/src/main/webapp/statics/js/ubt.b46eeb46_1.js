//记录埋点信息
function logUbt(msg, functionid, intervals, extendObj) {

    //追加埋点信息
    if (typeof (msg) != "undefined") {
        tracker += msg + ",";
    }

    if (tracker.length > 0) {

        try {
            window.$_bf.tracklog("payment", JSON.stringify(new UbtInfo(functionid, tracker.substring(0, tracker.length - 1), OtherHelper.getUBTGuid(), intervals, extendObj)));
            ubtnexttime = 1;
            tracker = "";
        } catch (e) {
        }
    }
}

function logAjaxUbt(request, response, functionid, intervals) {
    //追加埋点信息
    try {
        window.$_bf.tracklog("payment.ajax", JSON.stringify(new AjaxUbtInfo(functionid, request, response, OtherHelper.getUBTGuid(), intervals)));
    } catch (e) {
    }
}

function logUbttimer() {//供定时器调用

    if (ubttime < ubtnexttime) {
        ubttime++;
        return;
    }
    if (tracker.length > 0) {

        try {
            window.$_bf.tracklog("payment", JSON.stringify(new UbtInfo("Payment-UBT-Edit", tracker.substring(0, tracker.length - 1), OtherHelper.getUBTGuid())));
            tracker = "";
            ubtnexttime = 1;
            ubttime = 1;
        } catch (e) {
        }
    } else {
        try {
            window.$_bf.tracklog("payment", JSON.stringify(new UbtInfo("Payment-UBT-Edit", "无操作", OtherHelper.getUBTGuid())));
            ubtnexttime = ubtnexttime * 2 > 10000 ? 10000 : ubtnexttime * 2;
            ubttime = 1;
        } catch (e) {
        }
    }
}

//获取当地时间对应的北京时间的时间戳
function GetEast8TS() {
    var now = new Date();
    var localTS = now.getTime();
    var localOffsetTS = now.getTimezoneOffset() * 60000;
    var utcTS = localTS + localOffsetTS;
    var east8TS = utcTS + (3600000 * 8);
    return east8TS;
}

//ubt
(function () {
    var ubtStep = 0;
    var sessionid = OtherHelper.getGUID();
    window.UbtInfo = function (functionid, data, guid, intervals, extendObj) {
        this.Version = "1.0.0";
        this.SessionID = sessionid;
        this.Guid = guid;
        this.Step = ubtStep++;
        this.FunctionID = functionid;
        this.Data = data;
        this.Intervals = intervals;
        this.ClientTS = GetEast8TS();
        if (extendObj != null) {
            $.extend(this, extendObj);
        }
    }

    window.AjaxUbtInfo = function (functionid, request, response, guid, intervals) {
        this.Version = "1.0.0";
        this.SessionID = sessionid;
        this.Guid = guid;
        this.Step = ubtStep++;
        this.FunctionID = functionid;
        //this.Data = data;
        this.Intervals = intervals;
        this.ClientTS = GetEast8TS();

        if (request != null && request.head != null) {
            var attrs = ["serviceCode", "orderId", "requestId"];
            var that = this;
            $.each(attrs, function (index, attr) {
                that[attr] = request.head[attr];
            });
        }
        $.extend(this, response);
    }

})();


window.onbeforeunload = function () {
    logUbt("Close", "Payment-UBT-Leave");
}

window.tracker = '';
window.ubtnexttime = 1;
window.ubttime = 1;

$(function () {
    setInterval("logUbttimer()", 60000);

});

window.onload = function () {
    try {
        var page = performance.timing;
        var plt = page.loadEventStart - page.navigationStart;
        logUbt("pageLoadTime:" + plt, "Payment-UBT-Load", plt);
        var domLoadedIntervals = page.domInteractive - page.navigationStart;
        //logAjaxUbt({},{"serviceCode":"pageLoadTime","domLoadedIntervals":domLoadedIntervals}, "Payment-UBT-Load",plt);
    } catch (e) {
    }
}

//初始化，供外面调用
function initUbtEvents() {
    $('[ubt]').on("click", function (e) {
        tracker += $(this).attr("ubt") + ",";
        //取消事件冒泡
        if (e && e.stopPropagation)
            e.stopPropagation()
        else
            window.event.cancelBubble = true
    });
}

//ajax失败时记录ubt
function logUbtAjaxError(xhr, requestData) {
    try {
        var retCode = "";
        var functionid = "";
        var step = "Payment-UBT-Edit";


        if (xhr != null && xhr.status != null) {
            retCode = xhr.status;
        }

        if (requestData != null && requestData.head != null && requestData.head.serviceCode != null) {
            functionid = requestData.head.serviceCode;
        }

        // if (functionid == "41000303")
        // {
        //     step = "Payment-UBT-Submit";
        // }

        logUbt(functionid + "-" + retCode, step);
    } catch (e) {

    }
}
