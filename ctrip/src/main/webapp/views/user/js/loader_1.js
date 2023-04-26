/*
* date:1563948530635
* author:ddyin
*/
//URL配置
var UrlMyMenu = 'webresource.c-ctrip.com/ARES/accounts/pagemenu/js/mymenu_content_v2.js?v=1563948530';
var UrlJson2 = 'webresource.c-ctrip.com/ARES/accounts/pagemenu/js/json2.js';

(function () {
    var id = document.getElementById("leftNavWrapper").getAttribute("menuid");
    var type = document.getElementById("leftNavWrapper").getAttribute("menutype");
    if (type > 1) {
        UrlMyMenu = 'webresource.c-ctrip.com/ARES/accounts/pagemenu/js/mymenu_content_v2_' + type + '.js?v=1563948530';
    }
    try {
        if ('https:' == document.location.protocol) {
            UrlMyMenu = 'https://' + UrlMyMenu;
            UrlJson2 = 'https://' + UrlJson2;
        }
        else {
            UrlMyMenu = 'http://' + UrlMyMenu;
            UrlJson2 = 'http://' + UrlJson2;
        }

        //获取当前浏览器版本
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            var version = navigator.appVersion.split(";");
            var trim_Version = version[1].replace(/[ ]/g, "");
            if (navigator.appName == "Microsoft Internet Explorer" && (trim_Version == "MSIE7.0" || trim_Version == "MSIE6.0")) {
                loadScript(UrlJson2, function () {
                    loadScript(UrlMyMenu, function () { });
                });
            }
            else {
                loadScript(UrlMyMenu, function () { });
            }
        }
        else {
            loadScript(UrlMyMenu, function () { });
        }
        setMetric(id, "success");
    }
    catch (e) {
        setMetric(id, "fail");
    }


    //加载JS文件
    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.src = url;
        script.type = "text/javascript";
        script.charset = "utf-8";

        if (document.all) {//在IE下
            script.onload = script.onreadystatechange = function () {
                if (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete') {//MS文档说明loaded，completed可能只会出现其中之一

                    script.onload = script.onreadystatechange = null//重置为null，确保事件不被重复执行                    
                    callback();
                }
            }

        }
        else {//非IE
            script.onload = function () {
                callback();
            }
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function queryString(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }

    function setMetric(id, loadResult) {
        window.__bfi = window.__bfi || [];
        window.__bfi.push(['_trackMetric', {
            name: "101580",    //{string} metric name 需要申请
            value: 1,       //{number} metric value 只能是数字
            tag: { contentid: id, processtype: "loadtimes", result: loadResult },
            sample: 100,
            callback: null
        }])
    };

})();