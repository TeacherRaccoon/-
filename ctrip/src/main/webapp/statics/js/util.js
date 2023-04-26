window.onload = function () {

    try {
        setPCUnionCookie();

        setUtmSourceCookie();

        AidMetric();

        $(".jmkt-picsroller-pics").find("a").bind("click", function () {
            debugger;
            cQuery.ajax(applicationAddress + "Ajax/CommonHandler.ashx?Action=AddMetricLog",
                {
                    method: 'POST',
                    async: true,
                    context: {
                        "type": '2',
                        "meticName": 'outie.online.adv.banner',
                        "metricKey": 'url',
                        "metricValue": $(this).attr("href")
                    },
                    onsuccess: function (result) {


                    },
                    onerror: function () {
                    }
                });
        });

    } catch (error) {

    }
}

function setPCUnionCookie() {

    if (!!!window["__union_api"]) window["__union_api"] = [];

    window["__union_api"].push({
        "apiName": "getClick",
        "callback": function (obj) {

            setCookie("union_pc", obj);
        }
    })
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

function setUtmSourceCookie() {

    var utmSource = getQueryString("utmSource");

    if (utmSource == null) utmSource = getQueryString("umtSource");

    if (utmSource != null) {
        setCookie("utmSource", utmSource);
    }
}

function AidMetric() {

    var union = getCookie("Union");

    if (union != null) {

        //var aid; var sid;

        //for (var ck in union.split('&'))
        //{
        //    var arr=ck.split('=');

        //    if(arr[0]=="AllianceID")
        //    {
        //        aid = arr[1];
        //    }

        //    if (arr[0].toLowerCase() == "sid") {
        //        sid = arr[1];
        //    }
        //}

        var applicationAddress = document.getElementById("hdHost").value;

        cQuery.ajax(applicationAddress + "Ajax/CommonHandler.ashx?Action=AddMetricLog",
            {
                method: 'POST',
                async: true,
                context: '',
                onsuccess: function (result) {


                },
                onerror: function () {
                }
            });
    }
}

