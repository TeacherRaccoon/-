var layer = null;
var index = null;
var laydate = null;
var laypage = null;
layui.use('laypage', function () {
    laypage = layui.laypage;
});

layui.use('laydate', function () {
    laydate = layui.laydate;
});
layui.use('layer', function () {
    layer = layui.layer;
});

/***
 * 判断日期
 * @return String
 */
function orderStatus(s) {
    //1.已预定,2.预定超时,3.已取消,4.已支付,5.已过期,6.已完成,7.待评价
    switch (s) {
        case 1:
            return "已经预定";
        case 2:
            return "已经超时";
        case 3:
            return "已取消";
        case 4:
            return "已支付";
        case 5:
            return "已过期";
        case 6:
            return "已完成";
        case 7:
            return "待评价";
        default:
            return "";
    }
}

/**
 * 获取滚动条具体数据
 * @returns {{top: number, left: number}}
 */
function getScoll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    }
}

/**
 * 普通的Ajax请求
 * @param url//请求的url
 * @param param//发送的参数
 * @param type//请求的方式
 * @param dataType//返回的数据类型
 * @param $success//成功的回调函数
 */
function sendAjax(url, param, type, dataType, $success) {
    jQuery.ajax({
        url: url, data: param, type: type, dataType: dataType,
        before: function () {//发送ajax前执行的函数
            index = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
        },
        success: $success,//发送成功后的回调函数
        error: function (jqxhr) {//请求错误时执行的函数
            // layer.msg("请求异常！" + "-" + jqxhr.status)
        },
        complete: function () {//请求完成后执行的函数
            //执行完毕后关闭加载动画

        }
    })
}

/**
 * 监听from表单的Ajax请求
 * @param formId //表单的id
 * @param url //请求的url
 * @param type //请求方式
 * @param dataType //数据返回类型
 * @param $success //回调函数
 */
function sendFormAjax(formId, url, type, dataType, $success) {
    $("#" + formId).ajaxForm({
        url: url, type: type, dataType: dataType,
        before: function () { //请求发送前执行的函数
            index = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
        },
        success: $success,
        error: function (jqxhr) {
            layer.msg("请求异常！" + "-" + jqxhr.status);
        },
        complete: function () {
            layer.close(index);
        }
    });
}

/**
 * 传递单参数的接收
 * @returns {string}
 */
function getParam() {
    var url = location.search;    		   //获取url地址
    console.log("url后面的参数:" + url);
    return url.split("=")[1];
}

//日历
//编辑生日时的日历
var laydate = null;
layui.use("laydate", function () {
    laydate = layui.laydate;
});

//计算百分比
function percentage(num1, num2) {
    return ((num1 / num2) * 10000) / 100 + "%";
}

function percentage2(num1, num2) {
    var result = ((num1 / num2) * 10000) / 100;
    return result;
};

/***
 * 根据日期判断当前星期几
 * @param date
 * @return {string}
 */
function getMyDay(date) {
    var week;
    if (date.getDay() == 0) week = "日";
    if (date.getDay() == 1) week = "一";
    if (date.getDay() == 2) week = "二";
    if (date.getDay() == 3) week = "三";
    if (date.getDay() == 4) week = "四";
    if (date.getDay() == 5) week = "五";
    if (date.getDay() == 6) week = "六";
    return week;
};

/***
 * 日期相减函数
 * @param date1
 * @param date2
 * @return {number}
 * @constructor
 */
function DateMinus(date1, date2) {//date1:小日期   date2:大日期
    let sdate = new Date(date1);
    let now = new Date(date2);
    let days = now.getTime() - sdate.getTime();
    let day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
}

/**
 * 手机号码隐藏中间4位方法
 * @param tel
 * @return {*}
 */
function getTel(tel) {
    let reg = /^(\d{3})\d{4}(\d{4})$/;
    return tel.replace(reg, "$1****$2");
}

//姓名验证
function isChinese(params, paramMinlen, paramMaxLen) {
    var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;//验证姓名正则
    //非空验证
    if (params != null && params != "") {
        //是否为中文
        if (params.match(reg)) {
            if (paramMinlen <= params.length && params.length <= paramMaxLen) {
                return true;
            } else {
                return "输入长度必须为：" + paramMinlen + "~" + paramMaxLen;
            }
        } else {
            return "名字输入格式有误！";
        }
        ;
    } else {
        return "输入不能为空！";
    }
};

//电话号码验证
function isPhone(phone) {
    var patrn = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
    if (phone != null && phone != "") {
        if (phone.match(patrn)) {
            return true;
        } else {
            return "手机号码输入格式有误！";
        }
    } else {
        return "手机号码不能为空";
    }
};

//身份证的完美验证
function IdentityCodeValid(code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)//加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
                pass = false;
            }
        }

    }

    if (!pass) {
        return tip;
    }
    return pass;
};

//获取页面传过来的参数2.0
function getRequestParams() {
    var params = [];
    var searchUrl = window.location.href;
    var searchData = searchUrl.split("=");        //截取 url中的“=”,获得“=”后面的参数
    for (var i = 0; i < searchData.length; i++) {
        var searchText = decodeURI(searchData[i]).split("&")[0];   //decodeURI解码
        if (i > 0) {
            params[i] = searchText;
        }

    }
    return params;
};

// var 参数1,参数2,参数3,参数N;
// 参数1 = Request['参数1'];


//生成订单号
function getOrderNo() {
    var vNow = new Date();
    var sNow = "";
    sNow += String(vNow.getFullYear());
    sNow += String(vNow.getMonth() + 1);
    sNow += String(vNow.getDate());
    sNow += String(vNow.getHours());
    sNow += String(vNow.getMinutes());
    sNow += String(vNow.getSeconds());
    sNow += String(vNow.getMilliseconds());
    return sNow;
};

function login() {
    location.href = "http://localhost:8080/views/user/login.html";
};

function getUrlParams(name) { // 不传name返回所有值，否则返回对应值
    var url = window.location.search;
    if (url.indexOf('?') == 1) {
        return false;
    }
    url = url.substr(1);
    url = url.split('&');
    var name = name || '';
    var nameres;
    // 获取全部参数及其值
    for (var i = 0; i < url.length; i++) {
        var info = url[i].split('=');
        var obj = {};
        obj[info[0]] = decodeURI(info[1]);
        url[i] = obj;
    }
    // 如果传入一个参数名称，就匹配其值
    if (name) {
        for (var i = 0; i < url.length; i++) {
            for (const key in url[i]) {
                if (key == name) {
                    nameres = url[i][key];
                }
            }
        }
    } else {
        nameres = url;
        J_RoomName
    }
    // 返回结果
    return nameres;
};

/***
 * js生成UUID方法,已经去掉斜杠
 * @author 何夏麟
 */
function uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    //去斜杠
    // s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
};
console.log(uuid());

/***
 * 设置Cookie
 * @param cname
 * @param cvalue
 * @param exdays
 */
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

/**
 * 获取Cookie
 * @param cname
 * @returns {string}
 */
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

/***
 * 格式化日期
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
/***
 * 根据数组内容删除值
 * @param value
 */
Array.prototype.remove_hxl=function(value){
    var index=this.indexOf(value);
    if(index>-1){
        this.splice(index,1);
    }
};

let formatDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};
