/**
 * 普通ajax请求
 * @param url
 * @param type
 * @param dataType
 * @param param
 * @param $success
 */
function requestAjax(url, param, $success) {
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: param,
        beforeSend: function () {
            //console.log("请求发送中.....")
        },
        success: $success,
        error: function (jqxhr) {
            layer.msg("请求发生异常");
        },
        complete: function () {
           // console.log("请求发送完毕...");
        }
    });
}

/**
 * ajax form 表单提交
 * @param formId
 * @param url
 * @param type
 * @param dataType
 * @param $success
 */
function requestAjaxForm(formId, url, $success) {
    $("#" + formId).ajaxForm({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        beforeSend: function () {
            //    alert("ajax成功")
        },
        success: $success,
        error: function (jqxhr) {
            alert(jqxhr.status);
        },
        complete: function () {//ajax
            // alert("ajax完成")
        }
    });
}

/**
 * 时间转化成标准格式
 * @param date
 * @returns {string}
 */
function renderTime(date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

//获取前后几天的日期
function GetDay(day) {
    var time = new Date();
    time.setDate(time.getDate() + day);//获取Day天后的日期
    var y = time.getFullYear();
    var m = time.getMonth() + 1;//获取当前月份的日期
    var d = time.getDate();
    return y + "-" + m + "-" + d;

}


//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("欢迎 " + user + " 再次访问");
    } else {
        user = prompt("请输入你的名字:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 30);
        }
    }
}

//清除cookie
function clearCookie(cname) {
    setCookie(cname, "", 0);
}
