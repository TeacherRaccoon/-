; window.replace = function () { return '' }; (function (a) {
    function b(e, a) { var b = (/^\w+\:\/\//); ((/^\/\/\/?/).test(e) ? e = location.protocol + e : !b.test(e) && "/" != e.charAt(0) && (e = (a || "") + e)); return (b.test(e) ? e : ("/" == e.charAt(0) ? w : x) + e) } function f(e, a) { for (var b in e) e.hasOwnProperty(b) && (a[b] = e[b]); return a } function g(a, b, f, i) {
        a.onload = a.onreadystatechange = function () { a.readyState && "complete" != a.readyState && "loaded" != a.readyState || b[f] || (a.onload = a.onreadystatechange = null, i()) }; a.onerror = function () {
            try {
                var a = this.src; cError.logError && cError.logError(["error",
"[Error loading script]", 0, a], "normal-error", "normal")
            } catch (b) { } 
        } 
    } function k(a) { a.ready = a.finished = !0; for (var b = 0; b < a.finished_listeners.length; b++) a.finished_listeners[b](); a.ready_listeners = []; a.finished_listeners = [] } function u(a, b, f, i, k) {
        setTimeout(function () {
            var c, d = b.real_src, l; if ("item" in n) { if (!n[0]) { setTimeout(arguments.callee, 25); return } n = n[0] } c = document.createElement("script"); b.type && (c.type = b.type); b.charset && (c.charset = b.charset); (k ? (r ? (a[m] && o("start script preload: " + d), f.elem = c, (y ? (c.preload =
!0, c.onpreload = i) : c.onreadystatechange = function () { c.readyState == "loaded" && i() }), c.src = d) : (k && 0 == d.indexOf(w) && a[z] ? (l = new XMLHttpRequest, a[m] && o("start script preload (xhr): " + d), l.onreadystatechange = function () { if (l.readyState == 4) { l.onreadystatechange = function () { }; f.text = l.responseText + "\n//@ sourceURL=" + d; i() } }, l.open("GET", d), l.send()) : (a[m] && o("start script preload (cache): " + d), c.type = "text/cache-script", g(c, f, "ready", function () { n.removeChild(c); i() }), c.src = d, n.insertBefore(c, n.firstChild)))) : ((A ?
(a[m] && o("start script load (ordered async): " + d), c.async = !1) : a[m] && o("start script load: " + d)), g(c, f, "finished", i), c.src = d, n.insertBefore(c, n.firstChild)))
        }, 0)
    } function s() {
        function e(a, b, c) {
            function e() { null != h && (h = null, k(c)) } var h; d[b.src].finished || (a[v] || (d[b.src].finished = !0), h = c.elem || document.createElement("script"), b.type && (h.type = b.type), b.charset && (h.charset = b.charset), g(h, c, "finished", e), (c.elem ? c.elem = null : (c.text ? (h.onload = h.onreadystatechange = null, h.text = c.text) : h.src = b.real_src)), n.insertBefore(h,
n.firstChild), c.text && e())
        } function G(a, c, f, i) {
            var h, q, l = function () { c.ready_cb(c, function () { e(a, c, h) }) }, g = function () { c.finished_cb(c, f) }; c.src = b(c.src, a[B]); c.real_src = c.src + (a[C] ? ((/\?.*$/).test(c.src) ? "&_" : "?_") + ~ ~(1E9 * Math.random()) + "=" : ""); d[c.src] || (d[c.src] = { items: [], finished: !1 }); q = d[c.src].items; (a[v] || 0 == q.length ? (h = q[q.length] = { ready: !1, finished: !1, ready_listeners: [l], finished_listeners: [g] }, u(a, c, h, (i ? function () {
                h.ready = !0; for (var a = 0; a < h.ready_listeners.length; a++) h.ready_listeners[a](); h.ready_listeners =
[]
            } : function () { k(h) }), i)) : (h = q[0], (h.finished ? g() : h.finished_listeners.push(g))))
        } function t() {
            function a(b, e) { h[m] && o("script preload finished: " + b.real_src); b.ready = !0; b.exec_trigger = e; c() } function b(a, e) { h[m] && o("script execution finished: " + a.real_src); a.ready = a.finished = !0; a.exec_trigger = null; for (var g = 0; g < e.scripts.length; g++) if (!e.scripts[g].finished) return; e.finished = !0; c() } function c() {
                for (; d < g.length; ) if ("[object Function]" == Object.prototype.toString.call(g[d])) {
                    h[m] && o("$LAB.wait() executing: " +
g[d]); try { g[d++]() } catch (a) { h[m] && D("$LAB.wait() error caught: ", a) } 
                } else { if (!g[d].finished) { for (var b = g[d], e = !1, f = 0; f < b.scripts.length; f++) b.scripts[f].ready && b.scripts[f].exec_trigger && (e = !0, b.scripts[f].exec_trigger(), b.scripts[f].exec_trigger = null); if (e) continue; break } d++ } d == g.length && (k = l = !1)
            } var e, h = f(i, {}), g = [], d = 0, l = !1, k; e = { script: function () {
                for (var c = 0; c < arguments.length; c++) {
                    var d = arguments[c], i = arguments[c], n = void 0; "[object Array]" == Object.prototype.toString.call(d) || (i = [d]); for (var m =
0; m < i.length; m++) { if (!k || !k.scripts) g.push(k = { scripts: [], finished: !0 }); d = i[m]; "[object Function]" == Object.prototype.toString.call(d) && (d = d()); d && ("[object Array]" == Object.prototype.toString.call(d) ? (n = [].slice.call(d), n.unshift(m, 1), [].splice.apply(i, n), m--) : ("string" == typeof d && (d = { src: d }), d = f(d, { ready: !1, ready_cb: a, finished: !1, finished_cb: b }), k.finished = !1, k.scripts.push(d), G(h, d, k, p && l), l = !0, h[E] && e.wait())) } 
                } return e
            }, wait: function () {
                if (0 < arguments.length) {
                    for (var a = 0; a < arguments.length; a++) g.push(arguments[a]);
                    k = g[g.length - 1]
                } else k = !1; c(); return e
            } 
            }; return { script: e.script, wait: e.wait, setOptions: function (a) { f(a, h); return e } }
        } var i = {}, p = r || H, c = [], d = {}, l; i[z] = !1; i[E] = !1; i[v] = !1; i[C] = !1; i[m] = !1; i[B] = ""; return l = { setGlobalDefaults: function (a) { f(a, i); return l }, setOptions: function () { return t().setOptions.apply(null, arguments) }, script: function () { return t().script.apply(null, arguments) }, wait: function () { return t().wait.apply(null, arguments) }, queueScript: function () {
            c[c.length] = { type: "script", args: [].slice.call(arguments) };
            return l
        }, queueWait: function () { c[c.length] = { type: "wait", args: [].slice.call(arguments) }; return l }, runQueue: function () { for (var a = l, b = c.length, e; 0 <= --b; ) e = c.shift(), a = a[e.type].apply(null, e.args); return a }, noConflict: function () { a.$LAB = F; return l }, sandbox: function () { return s() } 
        }
    } var F = a.$LAB, z = "UseLocalXHR", E = "AlwaysPreserveOrder", v = "AllowDuplicates", C = "CacheBust", m = "Debug", B = "BasePath", x = (/^[^?#]*\//).exec(location.href)[0], w = (/^\w+\:\/\/\/?[^\/]+/).exec(x)[0], n = document.head || document.getElementsByTagName("head"),
I = a.opera && "[object Opera]" == Object.prototype.toString.call(a.opera) || "MozAppearance" in document.documentElement.style, o = function () { }, D = o, p = document.createElement("script"), y = "boolean" == typeof p.preload, r = y || p.readyState && "uninitialized" == p.readyState, A = !r && !0 === p.async, H = !r && !A && !I; a.console && a.console.log && (a.console.error || (a.console.error = a.console.log), o = function (b) { a.console.log(b) }, D = function (b, f) { a.console.error(b, f) }); a.$LAB = s(); (function (a, b, f) {
    if (document.readyState == null && document[a]) {
        document.readyState =
"loading"; document[a](b, f = function () { document.removeEventListener(b, f, false); document.readyState = "complete" }, false)
    } 
})("addEventListener", "DOMContentLoaded")
})(this);
(function () { function a() { try { document.documentElement.doScroll("left"), $LAB.isReady = !0 } catch (b) { setTimeout(a, 1) } } if (document.addEventListener) document.addEventListener("DOMContentLoaded", function () { $LAB.isReady = !0 }, !1), window.addEventListener("load", function () { $LAB.isLoaded = !0 }, !1); else if (document.attachEvent) { window.attachEvent("onload", function () { $LAB.isLoaded = !0 }); var b; try { b = null == window.frameElement } catch (f) { } document.documentElement.doScroll && b && setTimeout(a, 1) } })();
Array.prototype.isSame = function (a) { if (this.length != a.length) return !1; for (var b = 0, f = this.length; b < f; b++) if ((this[b] || "").toString() != (a[b] || "").toString()) return !1; return !0 }; $LAB.errorQueue = []; $errorCollection = [];
var cError = { init: function () { cError.flag = !1; cError.spliter = String.fromCharCode(12); cError.setTimer() }, checkIsSent: function (a) { for (var b = 0, f = $errorCollection.length; b < f; b++) if ($errorCollection[b].isSame(a)) return !0; $errorCollection.push(a); return !1 }, setTimer: function () { setInterval(function () { cError.fetchError(!1) }, 500) } }; cError.throwError = new Function("err", "throw err;");
cError.fetchError = function (a) { if (cError.flag == a) if (0 != $LAB.errorQueue.length) { cError.flag = !0; var b = $LAB.errorQueue[0]; setTimeout(function () { var a = ((/msie (\d+)/i).test(navigator.userAgent) ? Error(b.number || 0, b.msg + cError.spliter) : Error(b.msg + cError.spliter, b.file || "", b.line || 0)); cError.throwError(a) }) } else cError.flag = !1 };
cError.logError = function (a, b, f) {
    try {
        if (0 != arguments.length && !cError.checkIsSent(a)) {
            for (var g = a.concat([new Date - window.__uidc_init, document.getElementById("page_id") && document.getElementById("page_id").value, window.$_bf && window.$_bf._getFullPV && window.$_bf._getFullPV() || "", document.URL, b || "", f || "", "cQuery_121128"]), k = 0, u = g.length; k < u; k++) g[k] = ("" + g[k]).slice().replace((/,/g), "_"); var s = document.location.protocol + "//s.c-ctrip.com/bf.gif?ac=error&data="; (new (Image)).src = s + encodeURIComponent(g.join(",")) +
"&rid=" + Math.random()
        } 
    } catch (F) { } 
}; cError.init(); window.onerror = function (a, b, f) { try { if (cError.flag && a.slice(-1) == cError.spliter) { var g = $LAB.errorQueue.shift(); cError.logError(["error", g.msg, g.line, g.file], "normal-error", "normal"); cError.fetchError(!0) } else cError.logError(["error", a, f, b], "normal-error", "normal") } catch (k) { } };
function logTimer() { var a = document.getElementById("page_id"); if (a) var b = (window.__uidc_init ? new Date - window.__uidc_init : -1), f = setInterval(function () { window.UIMonitor2 && window.UIMonitor2.trackLog && (clearInterval(f), window.UIMonitor2.trackLog(a.value, "jsfiles_complete_load", b)) }, 30) }
(function () { if (!(window.$_bf && !0 == window.$_bf.loaded)) { var a = new Date, a = "" + a.getFullYear() + a.getMonth() + a.getDate(), b = "?v=" + a + ".js", a = document.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = document.location.protocol + ("https:" == document.location.protocol ? "//s.c-ctrip.com/_bfa.min.js" + b : "//webresource.c-ctrip.com/code/ubt/_bfa.min.js" + b); b = document.getElementsByTagName("script")[0]; b.parentNode.insertBefore(a, b) } })();