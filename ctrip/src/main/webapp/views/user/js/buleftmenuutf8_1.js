if (typeof (ClubInfoForMenuStr) === 'undefined') {
    ClubInfoForMenuStr = {};
}

var baseUrl = 'ct.ctrip.com/my';
var hostName = window.location.hostname;

if (hostName != '') {
    if (hostName.indexOf('fat4') > 0) {
        baseUrl = 'ct.ctrip.fat4.qa.nt.ctripcorp.com/my';
    }
    if (hostName.indexOf('fat18') > 0) {
        baseUrl = 'ct.ctrip.fat4.qa.nt.ctripcorp.com/my';
    }
    if (hostName.indexOf('fat24') > 0) {
        baseUrl = 'ct.ctrip.fat24.qa.nt.ctripcorp.com/my';
    }
    if (hostName.indexOf('fat26') > 0) {
        baseUrl = 'ct.ctrip.fat26.qa.nt.ctripcorp.com/my';
    }
    if (hostName.indexOf('.uat') > 0) {
        baseUrl = 'ct.ctrip.uat.qa.nt.ctripcorp.com/my';
    }
    if (hostName.indexOf('.lpt') > 0) {
        baseUrl = 'ct.ctrip.lpt10.qa.nt.ctripcorp.com/my';
    }
}

var protocal = 'http://';
if ('https:' == document.location.protocol) {
    protocal = 'https://';
}

(function ($) {

    var cookie_LoginUID;
    var cookie_MenuJson;

    var readMenuCookie = function () {
        cookie_LoginUID = $.cookie('menu_login_uid');

        if (cookie_LoginUID) {
            var obj = jQuery.cookie('leftMenuJson_' + cookie_LoginUID);
            if (obj) {
                cookie_MenuJson = eval('(' + obj + ')');
            }
        }
    }

    var setMenuContext = function () {
        if (cookie_MenuJson && cookie_LoginUID) {
            ClubInfoForMenuStr = cookie_MenuJson;
        }

       // log("BULeftMenuUtf8.js: ClubInfoForMenuStr = " + JSON.stringify(ClubInfoForMenuStr));
    }

    var setMenuCookie = function () {
       // $.cookie('leftMenuJson_' + cookie_LoginUID, JSON.stringify(cookie_MenuJson), { expires: 1, path: '/' });
    }

    var ajaxLoadLeftMenuByController = function () {
        log("BULeftMenuUtf8.js: begin load left menu via MVC.");
        $.ajax({
            url: protocal + baseUrl + "/zh-cn/LeftMenuLoader",
            dataType: "script",
            data: {
                character: "utf-8" //字符编码，不传默认为gbk
            },
            success: function (data, textStatus, jqXHR) {

                readMenuCookie();
                setMenuContext();

                if (cookie_LoginUID) {
                    setMenuCookie();
                    log("BULeftMenuUtf8.js: load left menu success via MVC.");
                } else {
                    log("BULeftMenuUtf8.js: load left menu fail via MVC, pls check if user is logon.");
                }
            },
            error: function () {
                log("BULeftMenuUtf8.js: load left menu fail via MVC.");
            }
        });
    }

    var loadLeftMenuByJS = function () {
        log("BULeftMenuUtf8.js: begin load left menu using Cookie.");
        $.getScript(protocal + baseUrl + '/JS/menu/utf8loader.js', function (script, textStatus) {
            if (textStatus == "success") {
                log("BULeftMenuUtf8.js: load left menu success using Cookie");
            }
            else {
                log("BULeftMenuUtf8.js: load left menu fail using Cookie.");
            }
        });
    }

    readMenuCookie();
    setMenuContext();

    //if (cookie_MenuJson && cookie_LoginUID) {
    //    loadLeftMenuByJS();
    //} else {
        ajaxLoadLeftMenuByController();
    //}

    function log(message) {
        try {
            if (window.console && window.console.log) {
                console.log(message)
            }
        } catch (e) { }
    }

})(jQuery);