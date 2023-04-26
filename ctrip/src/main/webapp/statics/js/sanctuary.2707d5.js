var Sanctuary = Sanctuary || {};
Sanctuary.Leo = Sanctuary.Leo || {};
Sanctuary.Leo.LighteningPlasma = Sanctuary.Leo.LighteningPlasma || function (bin, ud) {
    var env = typeof global == 'undefined' ? window : global;
    var _human_5e58a = 2147483647;
    Array.prototype.indexOf = Array.prototype.indexOf || function (c, d) {
        var b;
        if (this == null) {
            throw new TypeError('"this" is null or not defined')
        }
        var e = Object(this);
        var a = e.length >>> 0;
        if (a === 0) {
            return -1
        }
        var f = +d || 0;
        if (Math.abs(f) === Infinity) {
            f = 0
        }
        if (f >= a) {
            return -1
        }
        b = Math.max(f >= 0 ? f : a - Math.abs(f), 0);
        while (b < a) {
            if (b in e && e[b] === c) {
                return b
            }
            b++
        }
        return -1
    };
    Array.prototype.map = Array.prototype.map || function (i, h) {
        var b, a, c;
        if (this == null) {
            throw new TypeError(" this is null or not defined")
        }
        var e = Object(this);
        var f = e.length >>> 0;
        if (Object.prototype.toString.call(i) != "[object Function]") {
            throw new TypeError(i + " is not a function")
        }
        if (h) {
            b = h
        }
        a = new Array(f);
        c = 0;
        while (c < f) {
            var d, g;
            if (c in e) {
                d = e[c];
                g = i.call(b, d, c, e);
                a[c] = g
            }
            c++
        }
        return a
    };
    Array.prototype.reduce = Array.prototype.reduce || function (e) {
        if (this === null) {
            throw new TypeError("Array.prototype.reduce " + "called on null or undefined")
        }
        if (typeof e !== "function") {
            throw new TypeError(e + " is not a function")
        }
        var d = Object(this);
        var a = d.length >>> 0;
        var b = 0;
        var c;
        if (arguments.length >= 2) {
            c = arguments[1]
        } else {
            while (b < a && !(b in d)) {
                b++
            }
            if (b >= a) {
                throw new TypeError("Reduce of empty array " + "with no initial value")
            }
            c = d[b++]
        }
        while (b < a) {
            if (b in d) {
                c = e(c, d[b], b, d)
            }
            b++
        }
        return c
    };
    Function.prototype.bind = Function.prototype.bind || function (a) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = Array.prototype.slice.call(arguments, 1), c = this, d = function () {
        }, e = function () {
            return c.apply(this instanceof e ? this : a, b.concat(Array.prototype.slice.call(arguments)))
        };
        return this.prototype && (d.prototype = this.prototype), e.prototype = new d, e
    };
    var decode = function (j) {
        if (!j) {
            return ""
        }
        var n = function (e) {
            var f = [], t = e.length;
            var u = 0;
            for (var u = 0; u < t; u++) {
                var w = e.charCodeAt(u);
                if (((w >> 7) & 255) == 0) {
                    f.push(e.charAt(u))
                } else {
                    if (((w >> 5) & 255) == 6) {
                        var b = e.charCodeAt(++u);
                        var a = (w & 31) << 6;
                        var c = b & 63;
                        var v = a | c;
                        f.push(String.fromCharCode(v))
                    } else {
                        if (((w >> 4) & 255) == 14) {
                            var b = e.charCodeAt(++u);
                            var d = e.charCodeAt(++u);
                            var a = (w << 4) | ((b >> 2) & 15);
                            var c = ((b & 3) << 6) | (d & 63);
                            var v = ((a & 255) << 8) | c;
                            f.push(String.fromCharCode(v))
                        }
                    }
                }
            }
            return f.join("")
        };
        var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        var p = j.length;
        var l = 0;
        var m = [];
        while (l < p) {
            var s = k.indexOf(j.charAt(l++));
            var r = k.indexOf(j.charAt(l++));
            var q = k.indexOf(j.charAt(l++));
            var o = k.indexOf(j.charAt(l++));
            var i = (s << 2) | (r >> 4);
            var h = ((r & 15) << 4) | (q >> 2);
            var g = ((q & 3) << 6) | o;
            m.push(String.fromCharCode(i));
            if (q != 64) {
                m.push(String.fromCharCode(h))
            }
            if (o != 64) {
                m.push(String.fromCharCode(g))
            }
        }
        return n(m.join(""))
    };

    function NOOP() {
    };var NO = new NOOP();
    var NS = "4871263871263";
    if ((typeof Math) == 'undefined') {
        env.Math = NO;
    }
    ;
    if ((typeof define) == 'undefined') {
        env.define = env.define;
    }
    ;
    if ((typeof __filename) == 'undefined') {
        env.__filename = NS;
    }
    ;
    if ((typeof String) == 'undefined') {
        env.String = "".constructor;
    }
    ;
    if ((typeof module) == 'undefined') {
        env.module = env.module;
    }
    ;
    if ((typeof History) == 'undefined') {
        env.History = NOOP;
    }
    ;
    if ((typeof Error) == 'undefined') {
        env.Error = undefined;
    }
    ;
    if ((typeof Number) == 'undefined') {
        env.Number = (1).constructor;
    }
    ;
    if ((typeof isFinite) == 'undefined') {
        env.isFinite = NOOP;
    }
    ;
    if ((typeof Location) == 'undefined') {
        env.Location = NOOP;
    }
    ;
    if ((typeof undefined) == 'undefined') {
    }
    ;
    if ((typeof Window) == 'undefined') {
        env.Window = NOOP;
    }
    ;
    if ((typeof Object) == 'undefined') {
        env.Object = {}.constructor;
    }
    ;
    if ((typeof RegExp) == 'undefined') {
        env.RegExp = undefined;
    }
    ;
    if ((typeof process) == 'undefined') {
        env.process = NO;
    }
    ;
    if ((typeof Document) == 'undefined') {
        env.Document = NOOP;
    }
    ;
    if ((typeof __dirname) == 'undefined') {
        env.__dirname = NS;
    }
    ;
    if ((typeof console) == 'undefined') {
    }
    ;
    if ((typeof setInterval) == 'undefined') {
        env.setInterval = NOOP;
    }
    ;
    if ((typeof NO) == 'undefined') {
        NO = new NOOP();
        env.NO = NO
    }
    ;
    if ((typeof window) == 'undefined') {
        env.window = NO;
    }
    ;
    if ((typeof global) == 'undefined') {
        env.global = env.global;
    }
    ;
    if ((typeof SyntaxError) == 'undefined') {
        env.SyntaxError = NOOP;
    }
    ;
    if ((typeof clearTimeout) == 'undefined') {
        env.clearTimeout = NOOP;
    }
    ;
    if ((typeof NS) == 'undefined') {
        NS = '';
        for (var i = 0; i < 9; i++) {
            NS += Math.floor(Math.random() * 16).toString(16);
        }
        ;
    }
    ;
    if ((typeof parseInt) == 'undefined') {
        env.parseInt = NOOP;
    }
    ;
    if ((typeof escape) == 'undefined') {
        env.escape = NOOP;
    }
    ;
    if ((typeof navigator) == 'undefined') {
        env.navigator = NO;
    }
    ;
    if ((typeof history) == 'undefined') {
        env.history = undefined;
    }
    ;
    if ((typeof encodeURIComponent) == 'undefined') {
        env.encodeURIComponent = NOOP;
    }
    ;
    if ((typeof Function) == 'undefined') {
        env.Function = NOOP.constructor;
    }
    ;
    if ((typeof setTimeout) == 'undefined') {
        env.setTimeout = NOOP;
    }
    ;
    if ((typeof document) == 'undefined') {
        env.document = NO;
    }
    ;
    if ((typeof parseFloat) == 'undefined') {
        env.parseFloat = NOOP;
    }
    ;
    if ((typeof Date) == 'undefined') {
        env.Date = undefined;
    }
    ;
    if ((typeof isNaN) == 'undefined') {
        env.isNaN = NOOP;
    }
    ;
    if ((typeof INT_MAX) == 'undefined') {
        env.INT_MAX = _human_5e58a;
    }
    ;
    if ((typeof screen) == 'undefined') {
        env.screen = NO;
    }
    ;
    if ((typeof require) == 'undefined') {
        env.require = env.require;
    }
    ;
    if ((typeof clearInterval) == 'undefined') {
        env.clearInterval = NOOP;
    }
    ;
    if ((typeof decodeURIComponent) == 'undefined') {
        env.decodeURIComponent = NOOP;
    }
    ;
    if ((typeof location) == 'undefined') {
        env.location = NOOP;
    }
    ;
    if ((typeof JSON) == 'undefined') {
        env.JSON = NO;
    }
    ;
    if ((typeof NOOP) == 'undefined') {
        NOOP = function () {
        };
    }
    ;
    if ((typeof Array) == 'undefined') {
        env.Array = [].constructor;
    }
    ;
    if ((typeof TypeError) == 'undefined') {
        env.TypeError = NOOP;
    }
    ;
    if ((typeof Boolean) == 'undefined') {
        env.Boolean = true.constructor;
    }
    var _human_6e2bf = {
        undefined: undefined,
        decodeURIComponent: decodeURIComponent,
        history: history,
        process: process,
        TypeError: TypeError,
        window: window,
        Error: Error,
        Window: Window,
        encodeURIComponent: encodeURIComponent,
        Location: Location,
        clearInterval: clearInterval,
        __dirname: __dirname,
        Object: Object,
        RegExp: RegExp,
        NOOP: NOOP,
        setInterval: setInterval,
        navigator: navigator,
        console: console,
        parseFloat: parseFloat,
        define: define,
        Document: Document,
        escape: escape,
        require: require,
        clearTimeout: clearTimeout,
        __filename: __filename,
        document: document,
        screen: screen,
        JSON: JSON,
        global: global,
        parseInt: parseInt,
        Number: Number,
        Date: Date,
        NO: NO,
        setTimeout: setTimeout,
        History: History,
        Function: Function,
        Boolean: Boolean,
        Array: Array,
        isNaN: isNaN,
        SyntaxError: SyntaxError,
        NS: NS,
        location: location,
        isFinite: isFinite,
        Math: Math,
        String: String,
        INT_MAX: INT_MAX,
        module: module
    };
    var _human_899e2 = [Math, define, __filename, String, module, History, Error, Number, isFinite, Location, undefined, Window, Object, RegExp, process, Document, __dirname, console, setInterval, NO, window, global, SyntaxError, clearTimeout, NS, parseInt, escape, navigator, history, encodeURIComponent, Function, setTimeout, document, parseFloat, Date, isNaN, INT_MAX, screen, require, clearInterval, decodeURIComponent, location, JSON, NOOP, Array, TypeError, Boolean];
    var _human_849c6 = [], _human_e65ad = [], _human_9d8bc = {}, _human_1fdd2 = {}, _human_96594 = {c: _human_6e2bf};
    var _human_d4128 = decode(bin.b).split('').reduce(function (p, c) {
        if ((!p.length) || p[p.length - 1].length == 5) {
            p.push([]);
        }
        p[p.length - 1].push(-1 * 1 + c.charCodeAt());
        return p;
    }, []);
    var _human_3806f = function (v, o, k, r) {
        return {v: v, o: o, k: k, r: r};
    };
    var _human_6bea7 = function (r) {
        return r.r ? r.o[r.k] : r.v;
    };
    var _human_dc472 = function (n) {
        var c = {Oxff: _human_1fdd2};
        while (c = c.Oxff) if (c.hasOwnProperty(n)) return _human_3806f(0, c, n, 1);
        return _human_3806f(0, _human_1fdd2, n, 1);
    };
    var _human_ecee3 = function () {
        _human_1fdd2 = (_human_1fdd2.Oxff) ? _human_1fdd2.Oxff : _human_1fdd2;
    };
    var _human_bd0c1 = function () {
        _human_1fdd2 = {Oxff: _human_1fdd2};
    };
    var _human_c7477 = function (o, k) {
        return _human_d790f[o] ? _human_d790f[o](k) : _human_3806f(0, 0, 0, 0);
    };
    var _human_90ed6 = function (o, k) {
        return _human_6bea7(_human_c7477(o, k));
    };
    var _human_89676 = function (v, o, k, r) {
        _human_1e809[0] = _human_3806f(v, o, k, r);
    };
    var _human_94b8c = function (a) {
        var n = 0;
        while (n < a.length) {
            var c = a[n];
            n = _human_7dc85[c[0]](c[1], c[2], c[3], c[4], n, _human_d4128, a);
        }
    };
    var _human_5c459 = function (b, e, c, a) {
        var s = _human_6bea7(b);
        var t = _human_6bea7(e);
        if (s == _human_5e58a) {
            return c;
        }
        while (s < t) {
            var x = a[s];
            s = _human_7dc85[x[0]](x[1], x[2], x[3], x[4], s, a);
        }
        return s;
    };
    var _human_9a7e3 = function (n, a) {
        var r = _human_849c6.splice(_human_849c6.length - 6, 6);
        try {
            n = _human_5c459(r[0], r[1], n, a);
        } catch (e) {
            _human_1e809[2] = _human_3806f(e, 0, 0, 0);
            var idx = _human_6bea7(_human_1e809[3]) + 1;
            _human_849c6.splice(idx, _human_849c6.length - idx);
            _human_bd0c1();
            n = _human_5c459(r[2], r[3], n, a);
            _human_ecee3();
            _human_1e809[2] = _human_3806f(0, 0, 0, 0);
        } finally {
            n = _human_5c459(r[4], r[5], n, a);
        }
        return n;
    };
    var _human_d790f = [ud, function (p) {
        return _human_1e809[p];
    }, function (p) {
        return _human_3806f(_human_e65ad[p], ud, ud, 0);
    }, function (p) {
        return _human_dc472(p);
    }, function (p) {
        return _human_3806f(0, _human_899e2, p, 1);
    }, function (p) {
        return _human_3806f(_human_96594.c, 0, 0, 0);
    }, function (p) {
        return _human_3806f(0, bin.d, p, 1);
    }];
    var _human_1e809 = [_human_3806f(0, 0, 0, 0), _human_3806f(0, 0, 0, 0), _human_3806f(0, 0, 0, 0), _human_3806f(0, 0, 0, 0)];
    var _human_7dc85 = [function () {
        return _human_5e58a
    }, function (a, b, c, d, e) {
        return ++e
    }, function (a, b, c, d, e) {
        return ++e
    }, function (a, b, c, d, e) {
        var f = _human_90ed6(a, b);
        if (_human_849c6.length < f) return ++e;
        var g = _human_849c6.splice(_human_849c6.length - f, f).map(_human_6bea7), h = _human_849c6.pop(),
            i = _human_6bea7(h);
        return g.unshift(null), _human_89676(new (Function.prototype.bind.apply(i, g)), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676({}, ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        var f = _human_c7477(a, b), g = _human_90ed6(a, b) - 1;
        return f.o[f.k] = g, _human_89676(g, ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        var f = _human_90ed6(a, b);
        if (_human_849c6.length < f) return ++e;
        var g = _human_849c6.splice(_human_849c6.length - f, f).map(_human_6bea7), h = _human_849c6.pop(),
            i = _human_6bea7(h);
        return _human_89676(i.apply(h.o, g), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) % _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        var f = _human_c7477(a, b), g = _human_90ed6(a, b);
        return _human_89676(g, ud, ud, 0), f.o[f.k] = g - 1, ++e
    }, function (a, b, c, d, e) {
        return _human_1e809[0] = _human_849c6[_human_849c6.length - 1], ++e
    }, function (a, b, c, d, e) {
        var f = _human_c7477(a, b);
        return _human_89676(delete f.o[f.k], ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_849c6.push(_human_1e809[0]), ++e
    }, function (a, b, c, d, e) {
        var f = _human_90ed6(a, b);
        return _human_89676(_human_849c6.splice(_human_849c6.length - f, f).map(_human_6bea7), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        var f = _human_c7477(a, b), g = _human_90ed6(a, b);
        return _human_89676(g, ud, ud, 0), f.o[f.k] = g + 1, ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) === _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(typeof _human_90ed6(a, b), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) / _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) + _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) <= _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) >> _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) instanceof _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_6bea7(_human_1e809[0]) ? ++e : _human_90ed6(a, b)
    }, function (a, b, c, d, e) {
        return _human_1e809[1] = _human_849c6.pop(_human_1e809[0]), ++e
    }, function () {
        return _human_ecee3(), _human_89676(ud, ud, ud, 0, 0), 1 / 0
    }, function (a, b, d, e, f, g) {
        var h = _human_90ed6(a, b), i = _human_90ed6(d, e);
        if (_human_9d8bc[h] || (_human_9d8bc[h] = {}), !_human_9d8bc[h][i]) {
            var j = g.slice(h, i + 1);
            _human_9d8bc[h][i] = function () {
                return _human_96594 = {
                    c: this || global,
                    p: _human_96594
                }, _human_e65ad = arguments, _human_94b8c(j), _human_96594 = _human_96594.p, _human_6bea7(_human_1e809[0])
            }
        }
        return _human_89676(_human_9d8bc[h][i], ud, ud, 0), ++f
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) != _human_90ed6(c, d), ud, ud, 0), ++e
    }, function () {
        return _human_ecee3(), 1 / 0
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) << _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) || _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) * _human_90ed6(c, d), ud, ud, 0), ++e
    }, function () {
        throw _human_849c6.pop()
    }, function (a, b, c, d, e) {
        var f = _human_c7477(a, b), g = _human_90ed6(c, d);
        return f.r ? _human_89676(0, f.o[f.k], g, 1) : (f.v[g] == ud && (f.v[g] = 0), _human_89676(0, f.v, g, 1)), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) < _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) | _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) !== _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b) {
        return _human_90ed6(a, b)
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) - _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) >>> _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(~_human_90ed6(a, b), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_6bea7(_human_1e809[0]) ? _human_90ed6(a, b) : ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) >= _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) && _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(-_human_90ed6(a, b), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) & _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e, f, g) {
        return _human_9a7e3(e, g)
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) ^ _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(!_human_90ed6(a, b), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) == _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        var f = _human_c7477(a, b), g = _human_90ed6(a, b) + 1;
        return f.o[f.k] = g, _human_89676(g, ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_1e809[3] = _human_3806f(_human_849c6.length, 0, 0, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_1fdd2[b] = 0, ++e
    }, function (a, b, c, d, e) {
        return _human_bd0c1(), ++e
    }, function (a, b, c, d, e) {
        var f = _human_c7477(a, b), g = _human_90ed6(c, d);
        return f.o[f.k] = g, ++e
    }, function (a, b, c, d, e) {
        return _human_89676(_human_90ed6(a, b) > _human_90ed6(c, d), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        return _human_89676(+_human_90ed6(a, b), ud, ud, 0), ++e
    }, function (a, b, c, d, e) {
        debugger;
        return ++e
    }];
    return _human_94b8c(_human_d4128);
};
;
Sanctuary.Leo.LighteningPlasma({
    "b": "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",
    "d": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "!", 0, 1, 2, 3, 4, 8, 14, 15, 16, 28, 30, 40, 42, 48, 58, 64, 66, 72, 255, 256, 373, 391, 398, 412, 413, 415, 419, 437, 502, 505, 581, 584, 613, 616, 686, 689, 710, 51966, 214013, 2531011, 2147483647, 1552287018854, "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ":", "\n", " ", 420, 485, 599, 669, 672, 693, 417, 395, 411, 377, 488, 564, 567, 596, "(", ")", "{", "[", "]", "}"]
});