//设置JS的时间戳
var timespan = "1541048870";
var bt = "default";
var nav = "base_nav";
var isOffline = "@Offline";
//URL配置
var UrlConfig = "http://webresource.c-ctrip.com/ResCRMOnline/R1/";
var PageHeader_V3 = "PageHeader_V3";
var PageHeader = "PageHeader_V4";
var PageHeaderJs = "pageheader/js/PageHeaderContent.js?date="
if (isOffline == "T") {
    PageHeaderJs = "@noscript";

}
if (typeof (globalConfig.BusinessType) != "undefined")
{
    bt = globalConfig.BusinessType;
}

if (typeof (globalConfig.NeedNav) != "undefined")
{
    if (globalConfig.NeedNav == "T")
    {
        nav = "base_nav base_nav_pages"
    }
}

; window.replace = function () { return '' }; "object" !== typeof JSON && (JSON = {});
(function () {
    function m(a) { return (10 >a ? "0" + a : a) } function r(a) { s.lastIndex = 0; return (s.test(a) ? '"' + a.replace(s, function (a) { var c = u[a]; return ("string" === typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)) }) + '"' : '"' + a + '"') } function p(a, l) {
        var c, d, h, q, g = e, f, b = l[a]; b && "object" === typeof b && "function" === typeof b.toJSON && (b = b.toJSON(a)); "function" === typeof k && (b = k.call(l, a, b)); switch (typeof b) {
            case "string": return r(b); case "number": return (isFinite(b) ? String(b) : "null"); case "boolean": case "null": return String(b);
            case "object": if (!b) return "null"; e += n; f = []; if ("[object Array]" === Object.prototype.toString.apply(b)) { q = b.length; for (c = 0; c< q; c += 1) f[c] = p(c, b) || "null"; h = (0 === f.length ? "[]" : (e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]")); e = g; return h } if (k && "object" === typeof k) for (q = k.length, c = 0; c < q; c += 1) "string" === typeof k[c] && (d = k[c], (h = p(d, b)) && f.push(r(d) + ((e ? ": " : ":")) + h)); else for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (h = p(d, b)) && f.push(r(d) + ((e ? ": " : ":")) + h); h = (0 === f.length ? "{}" : (e ? "{\n" + e + f.join(",\n" +
            e) + "\n" + g + "}" : "{" + f.join(",") + "}")); e = g; return h
        }
    } "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function (a) { return (isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + m(this.getUTCMonth() + 1) + "-" + m(this.getUTCDate()) + "T" + m(this.getUTCHours()) + ":" + m(this.getUTCMinutes()) + ":" + m(this.getUTCSeconds()) + "Z" : null) }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) { return this.valueOf() }); var t = (/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g),
    s = (/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g), e, n, u = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, k; "function" !== typeof JSON.stringify && (JSON.stringify = function (a, l, c) { var d; n = e = ""; if ("number" === typeof c) for (d = 0; d < c; d += 1) n += " "; else "string" === typeof c && (n = c); if ((k = l) && "function" !== typeof l && ("object" !== typeof l || "number" !== typeof l.length)) throw Error("JSON.stringify"); return p("", { "": a }) });
    "function" !== typeof JSON.parse && (JSON.parse = function (a, e) {
        function c(a, d) { var g, f, b = a[d]; if (b && "object" === typeof b) for (g in b) Object.prototype.hasOwnProperty.call(b, g) && (f = c(b, g), (void 0 !== f ? b[g] = f : delete b[g])); return e.call(a, d, b) } var d; a = String(a); t.lastIndex = 0; t.test(a) && (a = a.replace(t, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) })); if ((/^[\],:{}\s]*$/).test(a.replace((/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g), "@").replace((/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g),
        "]").replace((/(?:^|:|,)(?:\s*\[)+/g), ""))) return d = eval("(" + a + ")"), ("function" === typeof e ? c({ "": d }, "") : d); throw new SyntaxError("JSON.parse");
    })
})();
//@headscript
(function () {
    try {
        if ('https:' == document.location.protocol) {
            UrlConfig = "https://webresource.c-ctrip.com/ResCRMOnline/R1/";
            PageHeader_V3 = "PageHeaderHTTPS_V3";
            //PageHeader = "PageHeaderHTTPS";
        }
        if (globalConfig.Version == "3.0") {
            loadCSS(UrlConfig + "pageheader/css/" + PageHeader_V3 + ".css?date=" + timespan);
            if (screen.width < 1200 && (navigator.userAgent.indexOf("MSIE 6.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 8.0") > 0)) {
                loadCSS(UrlConfig + "pageheader/css/PageHeader_1000_V3.css?date=" + timespan);
            }
            loadScript(UrlConfig + "pageheader/js/PageHeader_V3.js?date=" + timespan, "header", function () {
                loadScript(UrlConfig + "pageheader/js/PageFooter_V3.js?date=" + timespan, "footer", function () {
                });
            })
        } else {
            loadCSS(UrlConfig + "pageheader/css/" + PageHeader + ".css?date=" + timespan);
            loadScript(UrlConfig + PageHeaderJs + timespan, "header", function () {
                loadScript(UrlConfig + "pageheader/js/ActivityController_V2.min.js?date=" + timespan, "myjs", function () {
                });
            })
        }

    }
    catch (e) { }
    //加载CSS文件
    function loadCSS(url) {
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', url);
        var obj = document.getElementsByTagName("HEAD").item(0);
        obj.appendChild(css);
    }

    //加载JS文件
    function loadScript(url, domid, callback) {
        if (url.indexOf("@noscript")>=0) {
            callback();
        }
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
        var obj = document.getElementById(domid);
        obj.appendChild(script);
    }
})();

function setJsContent(tmp, bt) {
    var splitjsonkey = "|";
    if (tmp.indexOf("[{") == 0) {
        tmp = tmp.replace(/'/g, "\"")
        jsonobj = JSON.parse(tmp);
        if (jsonobj) {
            while (jsonobj.length > 0) {
                var r = jsonobj.pop();
                if ((r.k == r.v) && (r.k == nav)) {
                    tmp = r.v;
                    return tmp;
                }
                if (r.k.indexOf(splitjsonkey) > 0) {
                    var ktmp = r.k.split(splitjsonkey);
                    while (ktmp.length > 0) {
                        if (ktmp.pop() == bt) {

                            tmp = r.v;
                            return tmp;
                        }
                    }
                }
                else {
                    if (r.k == bt) {
                        tmp = r.v
                        return tmp;
                    }
                }
                if (jsonobj.length == 0) {
                    tmp = r.v
                }
            }
        }
    }
    return tmp;
}
function setHtmlObj(str, obj) {
    var content = str.toString().match(/\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//);
    if (content.length >1) {
        var html = content[1].replace(/\&\#xD\;|\&\#xA\;/g, '');
        var splitkey = /(\[\{((?!\[\{).)*\}\])/;
        var htmarray = html.split("$@");
        var outputhtml = "";
        for (i = 0; i< htmarray.length; i++) {
            var tmp = htmarray[i];
            outputhtml = outputhtml + setJsContent(tmp, bt);
        }
        obj.innerHTML = outputhtml;
    }
}