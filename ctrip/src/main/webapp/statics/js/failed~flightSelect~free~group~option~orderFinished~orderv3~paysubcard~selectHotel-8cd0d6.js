(window.webpackJsonp = window.webpackJsonp || []).push([[2], {
    454: function (e, n, t) {
        "use strict";
        (function (e) {
            t.d(n, "a", function () {
                return u
            });
            var o = t(153), i = t.n(o), r = t(417), a = t.n(r), p = t(451), l = t.n(p);

            function d(e) {
                return (d = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
                    return typeof e
                } : function (e) {
                    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function c(e, n, t, o, i, r, a) {
                try {
                    var p = e[r](a), l = p.value
                } catch (d) {
                    return void t(d)
                }
                p.done ? n(l) : Promise.resolve(l).then(o, i)
            }

            function s(e) {
                return function () {
                    var n = this, t = arguments;
                    return new Promise(function (o, i) {
                        var r = e.apply(n, t);

                        function a(e) {
                            c(r, o, i, a, p, "next", e)
                        }

                        function p(e) {
                            c(r, o, i, a, p, "throw", e)
                        }

                        a(void 0)
                    })
                }
            }

            function x(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var o = n[t];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }

            function f(e) {
                return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
            }

            function h(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }

            function b(e, n) {
                return (b = Object.setPrototypeOf || function (e, n) {
                    return e.__proto__ = n, e
                })(e, n)
            }

            function g(e, n, t) {
                return n in e ? Object.defineProperty(e, n, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = t, e
            }

            var u = function (n) {
                function t(e) {
                    var n, o, i;
                    return function (e, n) {
                        if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), o = this, i = f(t).call(this, e), n = !i || "object" !== d(i) && "function" !== typeof i ? h(o) : i, g(h(n), "setContainer", function (e) {
                        n.container = e
                    }), n.state = {content: null, uid: null, cookieid: null, eid: null}, n
                }

                var o, r, a;
                return function (e, n) {
                    if ("function" !== typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(n && n.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), n && b(e, n)
                }(t, i.a.Component), o = t, (r = [{
                    key: "componentDidMount", value: function () {
                        var e = this;
                        w(this.context, function (n) {
                            var t = n || {}, o = t.uid, i = t.cookieid, r = t.eid;
                            e.setState({uid: o, cookieid: i, eid: r}, function () {
                                e.getOfflineHeader(e.state)
                            })
                        }, this.props.data)
                    }
                }, {
                    key: "componentWillReceiveProps", value: function (e) {
                        var n = this, t = this.props.data && this.props.data.offlineUid,
                            o = e.data && e.data.offlineUid;
                        this.state.content || this.state.uid || !k() || t || !o || w(this.context, function (e) {
                            var t = e || {}, o = t.uid, i = t.cookieid, r = t.eid;
                            n.setState({uid: o, cookieid: i, eid: r}, function () {
                                n.getOfflineHeader(n.state)
                            })
                        }, e.data)
                    }
                }, {
                    key: "componentDidUpdate", value: function () {
                        this.container && (e(this.container).find(".hidden").removeClass("hidden"), e("#sendSMS_btn").hide(), this.ifShowVisaIconInOffline())
                    }
                }, {
                    key: "getOfflineHeader", value: function () {
                        var e = s(regeneratorRuntime.mark(function e(n) {
                            var t, o, i, r, a;
                            return regeneratorRuntime.wrap(function (e) {
                                for (; ;) switch (e.prev = e.next) {
                                    case 0:
                                        if (t = this.context || {}, o = t.state, n.uid) {
                                            e.next = 3;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 3:
                                        return i = o ? o.restapi : "/tour/restapi", r = "".concat(i, "/offlineHead"), e.next = 7, _(r, n);
                                    case 7:
                                        (a = e.sent) && this.setState({content: a});
                                    case 9:
                                    case"end":
                                        return e.stop()
                                }
                            }, e, this)
                        }));
                        return function (n) {
                            return e.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "render", value: function () {
                        var e = (this.props || {}).isHideMoreInfo, n = void 0 !== e && e, t = this.state, o = t.content,
                            r = t.uid, a = t.cookieid, p = t.eid;
                        if (!r) return null;
                        var l, d = o || {}, c = d.UserInfo, s = d.TagUserInfo, x = d.UserProfileInfo, f = d.IsCorpUser;
                        return c && (l = i.a.createElement("div", {className: "nav_right_box"}, i.a.createElement("div", {className: "f1"}, i.a.createElement("span", null, "\u59d3\u540d\uff1a"), i.a.createElement("span", {className: "color_black"}, c.UserName || ""), i.a.createElement("span", {className: "distance"}, "|")), i.a.createElement("div", {className: "f1"}, i.a.createElement("span", null, "\u7528\u6237\u540d\uff1a"), i.a.createElement("a", {
                            className: "color_blue",
                            target: "_blank",
                            href: "http://service.sh.ctriptravel.com/cii/crm/memberdetail.asp?uid=".concat(c.Uid)
                        }, c.Uid || ""), i.a.createElement("span", {className: "distance"}, "|")), i.a.createElement("div", {className: "f1"}, i.a.createElement("span", null, "\u5361\u53f7\uff1a"), i.a.createElement("span", {className: "color_black"}, c.CtripCardNo || ""), i.a.createElement("span", {className: "distance"}, "|")), i.a.createElement("div", {className: "f1"}, i.a.createElement("span", null, "\u7ea7\u522b\uff1a"), i.a.createElement("span", {className: "color_black"}, s.UserGradeName), i.a.createElement("span", {className: "distance"}, "|")), i.a.createElement("div", {className: "f1"}, i.a.createElement("span", null, "\u7c7b\u578b\uff1a"), i.a.createElement("span", {className: "color_black"}, f ? "\u516c\u53f8" : "\u4e2a\u4eba"), i.a.createElement("span", {className: "distance"}, "|")), i.a.createElement("div", {className: "f1"}, i.a.createElement("span", null, "\u4e3b\u53eb\u53f7\u7801\uff1a"), i.a.createElement("span", {className: "color_black"}, c.Ani || ""), i.a.createElement("span", {className: "distance"}, "|")), i.a.createElement("div", {className: "f1"}, i.a.createElement("span", null, "\u79ef\u5206\uff1a"), i.a.createElement("span", {className: "color_black"}, c.Experience || ""), i.a.createElement("span", {className: "distance"}, "|")), !!x && !n && x.length > 0 && x.map(function (e, n) {
                            return i.a.createElement("div", {
                                className: "f1",
                                key: n
                            }, i.a.createElement("span", null, e.Name, "\uff1a"), i.a.createElement("span", {className: "color_black"}, e.Value), i.a.createElement("span", {className: "distance"}, "|"))
                        }))), i.a.createElement("div", null, i.a.createElement("div", {
                            dangerouslySetInnerHTML: {__html: '\n                <style>\n                  html, body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, em, button { margin:0; padding:0; }\n                  html { background-color:#FFF; }\n                  body { background-color:#FFF; font-size:12px; line-height:1.5; font-family:Tahoma,Simsun,sans-serif; color:#333; }\n                  img, fieldset { margin:0; padding:0; border:0; }\n                  input, textarea { font-size:12px; }\n                  table { border-collapse:collapse; }\n                  a { color:#0065BB; text-decoration:none; outline:0 none; }\n                  a:hover { text-decoration:underline; }\n                  h1, h2, h3, h4, h5 { font-family:Arial,Simsun,sans-serif; }\n                  ul li, ol li { list-style:none; }\n                  dfn { font-style:normal; font-size:12px; font-family:Arial !important; }\n                  select { padding:1px; font-family:Arial,Simsun,sans-serif; border:1px solid #CCC; background-color:#FFF; }\n                  input[type="text"] { border:solid 1px #CCC; box-shadow: 1px 1px 3px #DDDDDD inset;}\n                  input[type="text"]:focus{ background-color:#f1f9ff; border-color:#5d9de5 #67a1e2 #67a1e2 #5d9de5; border-style:solid; border-width:1px;box-shadow: 1px 1px 3px #d0dee6 inset;}\n                  input {_padding:3px;}\n                  input[type="number"]::-webkit-inner-spin-button{display:none;}\n                  .color_black{ color:#333333;}\n                  .color_blue{ color:#0087cc;}\n                  .color_orange{ color:#ff6600;}\n                  .color_gray{ color:#999999;}\n                  .tell_send_box .success_ico, .tell_send_box .failure_ico{background: url("http://picint.sh.ctriptravel.com/offline_book/yongma_bgs.png") no-repeat 0 0;}\n\n\n                  .indent_input{ font-family: "Microsoft YaHei", SimSun, Tahoma, Verdana, Arial, sans-serif; line-height:18px; text-align:left; height: 20px; _height: 20px; _line-height:18px;}\n                  .indent_search_btn1, .indent_search_btn2, .indent_search_btn3, .indent_search_btn4,.indent_sign, .sign_info .close{background: url(http://picint.sh.ctriptravel.com/offline_book/indent_btn.png) no-repeat;}\n\n                  .indent_search_btn1{ background-position:0 0; display:inline-block; margin:0 0 0 10px; font:12px Microsoft Yahei; border:0 none; color:#fff; height:30px; width:95px; cursor:pointer; }\n                  .indent_search_btn1:hover{ background-position:0 -123px;}\n                  .indent_search_btn2{ background-position:0 -30px; display:inline-block; margin:0 0 0 10px; font:12px Microsoft Yahei; border:0 none; color:#fff; height:30px; width:81px; cursor:pointer; }\n                  .indent_search_btn2:hover{ background-position:0 -153px;}\n                  .indent_search_btn3{ background-position:0 -60px; display:inline-block; margin:0 0 0 10px; font:12px Microsoft Yahei; border:0 none; color:#0088cc; height:30px; width:95px; cursor:pointer; }\n                  .indent_search_btn3:hover{ background-position:0 -123px; color:#ffffff;}\n                  .indent_search_btn4{ background-position:0 -90px; display:inline-block; margin:0 0 0 10px; font:12px Microsoft Yahei; border:0 none; color:#0088cc; height:30px; width:82px; cursor:pointer; }\n                  .indent_search_btn4:hover{ background-position:0 -153px; color:#ffffff;}\n                  .indent_search_btn5{ border:1px solid #cccccc; color:#0087cc; display:inline-block;  font:12px Microsoft Yahei; cursor:pointer; background:#ffffff; padding:5px 10px; margin-left:9px;}\n                  .indent_base_label{display:inline-block;border-bottom:1px solid transparent; _border-bottom:0; cursor:pointer; font-size:12px; padding:2px 5px;*vertical-align:middle;}\n                  .indent_base_label:hover{border-bottom:1px dashed #ccc;_border-bottom:0;}\n                  .indent_base_label input{display:inline-block; margin-right:5px;*margin-right:2px; padding:0; cursor:pointer; vertical-align:middle;}\n\n                  .indent_nav_box{ background:#f9f9f9; zoom:1; font-size:12px;}\n                  .indent_nav_box .indent_nav{ width:980px; margin:0 auto; color:#999999; line-height:3; overflow: hidden;}\n                  .indent_nav_box .distance{ margin:0 10px;}\n                  .indent_nav_box .indent_logo{ float:left;,margin-bottom:4px}\n                  .indent_nav_box .nav_right_box{ float:right; width:790px;}\n                  .indent_nav_box .nav_right_box span{ display:inline-block;}\n                  .indent_nav_box .f1{ float:left; display:inline; *float:none;}\n                  .weibo{ background-image: url(http://picint.sh.ctriptravel.com/offline_book/new_icon.png);background-repeat: no-repeat;}\n                  .weibo{ width:20px; height:23px; display:inline-block; vertical-align:-5px;}\n                  .weibo.v1{ background-position:-33px -10px;}\n                  .weibo.v2{ background-position:-77px -10px;}\n                  .weibo.v3{ background-position:-113px -10px;}\n                  .weibo.v4{ background-position:-152px -10px;}\n                  .weibo.v5{ background-position:-194px -10px;}\n                  .crown_box{ display:inline; position:relative; cursor:pointer;}\n                  .crown_icon{ background-image: url(http://picint.sh.ctriptravel.com/offline_book/huang.png);background-repeat: no-repeat;}\n                  .crown_icon{ width:15px; height:15px; display:inline-block;margin-left:3px;vertical-align:middle;}\n                  .crown_icon1{background-position:-11px -7px;}\n                  .crown_icon2{background-position:-29px -7px;}\n                  .crown_icon3{background-position:-50px -7px;}\n                  .crown_icon4{background-position:-72px -7px;}\n                  .crown_icon5{background-position:-96px -7px;}\n                  .troublesome_box { position: absolute; z-index: 100; top:32px; left:10px; display:none;  }\n                  .troublesome_box .alert_info { background-color:#FFF5D1; border:1px solid #FFB533; padding:3px; white-space:nowrap; color:#333; font-size:12px; padding-left:10px; line-height:18px;}\n                  .troublesome_box b, .troublesome_box i { position:absolute; height:0; width:0; line-height:0; font-size:0; border-left:0 none; top:-10px; left:20px;}\n                  .troublesome_box b { border-right: 5px dashed transparent; border-top: 5px dashed transparent; border-bottom: 5px solid #FFB533; border-left: 5px dashed transparent; }\n                  .troublesome_box i { border-right: 5px dashed transparent; border-top: 5px dashed transparent; border-bottom: 5px solid #FFF5D1; border-left: 5px dashed transparent; top:-8px; }\n                  .crown_box:hover .troublesome_box{ display:block;}\n\n\n                  .indent_search_box{background:#ffffff; zoom:1; padding:20px 0; font-size:12px; border-bottom:1px solid #eeeeee; border-top:1px solid #eeeeee;position: relative; z-index: 4;}\n                  .indent_search_box .indent_search{ width:980px; margin:0 auto; font-size:12px;}\n                  .indent_search_box .indent_bill{ width:950px; border:2px solid #cfe8fa; background-color:#f8fcfe; padding:13px;}\n                  .s_item_box{clear:both;width:100%;height:42px;line-height:28px; color:#666666; border-bottom:1px solid #e8f4fd; margin-bottom:10px; padding-bottom:5px;}\n                  .s_item_box .color_orange{ margin:0 10px;}\n                  .s_item_box .indent_search_btn1,.s_item_box .indent_search_btn2{ float:left; margin-top:4px;}\n                  .s_item,.s_item2{float:left;display:inline; font-size:12px; font-family: "Microsoft YaHei", SimSun, Tahoma, Verdana, Arial, sans-serif; line-height: 26px; text-align:left; height: 35px;padding-top:5px;}\n                  .s_item{width:230px;_width:220px; position:relative; z-index:3;}\n                  .s_item2{width:240px; position: relative; z-index:3;}\n                  .s_item input,.s_item2 input{width:145px; padding-left:3px; border-color:#bbb #ddd #ddd #bbb; border-style:solid; border-width:1px; height:20px;line-height:18px; font:12px "Microsoft YaHei", SimSun, Tahoma, Verdana, Arial, sans-serif;*vertical-align:middle;outline:none;color:#333;box-shadow:1px 1px 1px #ddd inset; _height:20px; _line-height:18px; }\n                  .s_item input[type="text"]:focus,.s_item2 input[type="text"]:focus{border-color:#5d9de5;box-shadow:none; background-color:#ffffff;}\n                  .s_vca_dest{background-image: url(http://picint.sh.ctriptravel.com/offline_book/un_bg_line.png);\n                  background-repeat: no-repeat; background-position: 127px -147px;}\n                  .inputSel{color: #999 !important;}\n\n                  .indent_ensure .indent_base_label{ *margin-top:-10px;}\n                  .indent_ensure .color_gray{vertical-align:baseline;*vertical-align:5px;}\n\n\n                  .indent_fixed{ position:fixed; right:10px; z-index:9999; width:40px; border:1px solid #bfdfff; border-bottom:0; font-size:12px; background:#f8fcfe; color:#0087cc; top:0px; _position:absolute; }\n                  .indent_fixed a{ display:block; border-bottom:1px solid #bfdfff; text-align:center; padding:10px 5px;}\n                  .indent_fixed a:hover{ background:#39a7ee; color:#ffffff; text-decoration:none;}\n                  .indent_dian{ position:relative;}\n                  .indent_dian_more{ display:none; position:absolute; right:40px; width:40px; border:1px solid #3aa7ee; z-index:9999; background:#ffffff; top:-202px;}\n                  .indent_dian:hover .indent_dian_more {display: block;}\n                  .indent_dian_more .dian_last{ border-bottom:0;}\n                  .indent_dian .dian_icon{ font-size:14px; font-weight:bold;}\n                  .indent_fixed .choose{background:#39a7ee; color:#ffffff; text-decoration:none;}\n                  .indent_dian02 .indent_dian_more {top:56px;width:100px;}\n                  .indent_dian02:hover .indent_dian_more { display: block;  }\n\n\n                  .browse_fixed{ position:fixed; right:10px; z-index:9999; width:40px;border:1px solid #bfdfff; border-bottom:0px; font-size:12px; background:#f8fcfe; bottom:0px; color:#0087cc; _position:absolute;}\n                  .browse_fixed_box a{ display:block; border-bottom:1px solid #bfdfff; text-align:center; padding:10px 5px;}\n                  .browse_fixed_box a:hover{ background-color:#39a7ee; color:#ffffff; text-decoration:none;}\n                  .indent_sign_box{ position:relative; height:50px;}\n                  .browse_fixed .indent_sign{ background-position:0 -189px; width:30px; height:30px; position:absolute;}\n                  .browse_fixed a.indent_sign:hover{background-position:-40px -189px;background-color:none;}\n                  .browse_fixed .indent_collect{ position:relative; height:57px;}\n                  .sign_info{ width:562px; background-color:#ffffff; border:1px solid #3aa7ee; font-size:12px; position:absolute; right:0; bottom:0px; margin-right:40px; padding:0 18px 20px 18px;}\n                  .browse_fixed .sign_info h2{ font: 14px microsoft yahei,simsun,sans-serif; padding: 20px 0 5px 0; position:relative; color:#333333; font-weight:bold;}\n                  .browse_fixed .sign_info h2 span{padding: 0 2px; border-bottom: 3px solid #fff; display: inline-block; margin-right: 22px; cursor: pointer;}\n                  .browse_fixed .sign_info h2 span.cur{border-bottom: 3px solid #3ba8ed;}\n                  .sign_info .close{ position:absolute; background-position:0 -248px; width:21px; height:21px; right:-8px; top:10px; _right:8px;}\n                  .indent_collect_list li{height: 22px; line-height: 22px;  border-bottom:1px solid #eeeeee;  padding:10px 0; overflow: hidden; *zoom:1; }\n                  .indent_collect_list li:hover{background-color:#f9f9f9;}\n                  .indent_collect_list li:hover a{text-decoration:underline;}\n                  .indent_collect_list .content{ float: left; width: 400px;height: 22px; line-height: 22px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}\n                  .indent_collect_list .content a{ color: #666666;}\n                  .indent_collect_list .collect_prise{float: right;width: 150px;text-align: right;}\n                  .indent_collect_list .collect_prise b{font-weight: normal; font-size: 16px; color: #333; font-family: Microsoft Yahei; padding-right: 27px;}\n                  .indent_collect_list .color_gray{ margin-left:30px;}\n                  .pkg_page_new { padding-top:15px;height: 26px;}\n                  .browse_fixed_box .choose{background-color:#39a7ee; color:#ffffff; text-decoration:none;}\n                  .browse_fixed_box .indent_sign.choose{background-position:-40px -189px;background-color:none;}\n\n                  .compare_fixed { position: fixed;bottom: 0;width: 980px;z-index: 99;left: 50%;margin-left: -490px; }\n                  .compare_wrap { border:3px solid #7CC5F8;background-color: #f1faff;height: 94px;position: relative; }\n                  .compare_list { width: 763px;float: left; }\n                  .compare_list li { float: left;width: 253px;border-right: 1px dashed #DDD; }\n                  .compare_notice_wrap,.compare_product_wrap { padding: 10px;height: 74px;width: 233px;position: relative; }\n                  .compare_notice_wrap { background-color: #FCFCFC; }\n                  .compare_notice_wrap .compare_num { font:54px/74px tahoma,sans-serif;color: #D9D9D9;padding: 0 20px;float: left; }\n                  .compare_notice_wrap .compare_notice { width: 150px;color: #BBB;font-size: 14px;line-height: 18px;float: left;padding-top: 20px; }\n                  .compare_product_wrap { z-index: 1;background-color:#F1FAFF; }\n                  .compare_product_wrap .compare_pic { float: left;margin-top: 3px; }\n                  .compare_product_wrap .compare_pic img { display: block; }\n                  .compare_product_wrap .compare_name { font-size: 14px;line-height:18px;float: left;width: 226px;padding-left: 8px;height: 54px;overflow: hidden; }\n                  .compare_product_wrap .compare_price { float: left;width: 167px;padding-left: 8px; }\n                  .compare_product_wrap .compare_price .place { float: right;color: #BABABA;line-height: 20px; }\n                  .compare_product_wrap .compare_price .base_price { float: left;color: #FF6600;height: 20px; }\n                  .compare_product_wrap .compare_price .base_price strong { font-size: 20px;line-height: 20px;font-weight: normal; }\n                  .compare_product_wrap .clean { position: absolute;width: 26px;height: 0;padding-top: 26px;overflow: hidden;background-position: 0 -321px;top:-15px;right: -15px;display: none;background-image: url(http://picint.sh.ctriptravel.com/offline_book/un_group_detail.png?140812.png);\n                  background-repeat: no-repeat; }\n                  .compare_product_wrap .clean:hover { position: absolute;width: 26px;height: 0;padding-top: 26px;overflow: hidden;background-position: -31px -321px; }\n                  .compare_product_hover { background-color: #FFFCF2;z-index:2;  }\n                  .compare_product_hover .clean { display: block; }\n                  .compare_begin {float: right;padding:29px 21px 0 0; }\n                  .compare_begin .begin { display: inline-block;height: 36px;width: 140px;text-align: center;line-height: 36px;background-color: #39a7ed;color: #FFF;font-family: microsoft yahei,simsun,sans-serif;font-size: 18px;border-radius: 5px;margin-right: 4px; }\n                  .compare_begin .begin:hover { text-decoration: none;background-color: #1d8fd9; }\n                  .compare_begin .clean_all{ text-decoration: underline; font-size: 14px;}\n                  .compare_hidden { position: absolute;height: 22px;width: 80px;text-align: center;color: #0065bb;top:0px;right: 0px; }\n                  .compare_show { background-color: #78C4FA;color: #FFF;position: fixed;_position: absolute;bottom: 0;right: 0;width: 33px;border-radius: 5px;text-align: center;font:18px/20px microsoft yahei,simsun,sans-serif;height: 72px;padding: 6px;z-index: 99; }\n                  .compare_show:hover { text-decoration: none;background-color: #30A6F1; }\n                  .compare_show s,.compare_show b { position: absolute;height: 0;width: 0;line-height: 0;font-size: 0;border-top: 0 none;bottom:6px;left: 17px; }\n                  .compare_show s { border-bottom: 7px solid #FFF;border-left: 7px dashed transparent;border-right: 7px dashed transparent; }\n                  .compare_show b { border-bottom: 7px solid #78C4FA;border-left: 7px dashed transparent;border-right: 7px dashed transparent;margin-bottom: -3px; }\n                  .compare_show:hover b { border-bottom-color: #30A6F1; }\n                  .compare_liststep{position:absolute;left:0;top:0;}\n                  .compare_wrap .error_notice { position: absolute;width: 100%;left: -3px;top:-33px;font-size: 14px;line-height: 24px;background-color: #FFF9D5;color: #FF490A;text-align: center;border: 3px solid #FFF9D5; }\n\n                  .indent_head_box {position: absolute; background-color: #fff;border: 1px solid #bbbbbb;padding: 10px 20px;width: 400px;left:65px; z-index:999; top:32px; }\n                  .indent_head_box h3 { font-size: 14px; font-weight: normal; color: #fc972c;padding-bottom: 8px;border-bottom: 1px solid #EAEAEA; }\n                  .indent_head_box .close { position: absolute;font-size: 18px;font-weight: bold;color: #B2B2B2;top:5px;right: 15px; }\n                  .indent_head_box .close:hover { text-decoration: none;color: #FE9813; }\n                  .indent_head_box .indent_index_hotsearch{overflow: hidden; *zoom:1;}\n                  .indent_head_box .indent_index_hotsearch dt{ float: left; width: 100%; font-weight: bold; margin-top: 10px;color: #666; padding: 0 5px;}\n                  .indent_head_box .indent_index_hotsearch dd{ float: left; line-height: 24px;}\n                  .indent_head_box .indent_index_hotsearch a{display: inline-block; white-space: nowrap; color: #666; padding: 0 5px;}\n\n\n\n                  .c_address_select { width:222px; font-family: Arial, Simsun; font-size: 12px; z-index:1000; display: block; position:absolute; left:65px;}  \n                  .c_address_wrap { width: 220px; min-height: 305px; margin: 0; padding: 0 0 4px; border: 1px solid #bbbbbb; background:#fff; text-align: left; }  \n                  .c_address_select .c_address_hd { margin:-1px; } \n                  .c_address_select .c_address_list { margin: 0; min-height: 277px; padding: 0; }  \n                  .c_address_select .c_address_list span { font:10px/1. verdana; color:#bbb; position:absolute; right:10px; margin: 0; overflow: hidden; padding: 0; white-space: nowrap; text-transform:uppercase ;}  \n                  .c_address_select .c_address_list a { border-bottom: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; color: #0055AA; cursor: pointer; display: block; overflow: hidden; padding:3px 8px; text-align: left; text-decoration: none; position:relative; }  \n                  .c_address_select .c_address_list a:hover { background:#e8f4ff; border-bottom: 1px solid #acccef; border-top: 1px solid #acccef; }  \n                  .c_address_select .address_selected { background: none repeat scroll 0 0 #FFE6A6; color: #FFFFFF; height: 22px; }  \n                  .c_address_select .c_address_pagebreak { display: none; line-height: 25px; margin: 0; padding: 0; text-align: center; }  \n                  .c_address_select .c_address_pagebreak a { color: #0055AA; display: inline-block; font-family: Arial, Simsun, sans-serif; font-size: 14px; margin: 0; padding: 0 4px; text-align: center; text-decoration: underline; width: 15px; }  \n                  .c_address_select #c_address_arrowl, .c_address_select #c_address_arrowr { color: #0055AA; }  \n                  .c_address_select a.address_current { color: #000; text-decoration: none; }\n\n\n                  .departures{position:absolute;z-index:2000;width:650px;padding:6px 10px;border:1px solid #999;background-color:#fff;font-family:Arial,simsun,sans-serif; left:65px; top:32px;}\n                  .departures h5{font-size:12px;line-height:22px;color:#333;}\n                  .departures a{color:#333;margin-right:8px;line-height:22px;display: inline-block;padding:0 2px;}\n                  .departures_sequence a{margin-right:4px;}\n                  .departures a:hover{background-color:#2577E3;text-decoration:none;color:#fff;}\n                  .departures_sequence{margin-top:10px;border-top:1px solid #ccc;padding-top:6px;*zoom:1;}\n                  .departures_sequence:after{clear:both;display:block;height:0;visibility:hidden;content:\'.\';line-height:0;}\n                  .departures_sequence li{width:49.5%;float:left;padding-bottom:6px;}\n                  .departures_sequence span{display:inline-block;width:16px;height:16px;margin-left:3px;margin-right:12px;text-align:center;line-height:16px;color:#E56700;}\n\n                  .indent_caution{ border: 1px solid rgb(229, 0, 0) !important; background-color: rgb(255, 247, 217) !important; }\n\n                  .base_alert {position: absolute;z-index: 9999;}\n                  .base_alert .alert_info {background-color:#FFF5D1;border:1px solid #FFB533;padding:3px;}\n                  .base_alert b,.base_alert i{position:absolute;height:0;width:0;line-height:0;font-size:0;border-left:0 none;top:8px;}\n                  .base_alert b{border-right:5px solid #FFB533;border-top:5px dashed transparent;border-bottom:5px dashed transparent;left:-5px;}\n                  .base_alert i{border-right:5px solid #FFF5D1;border-top:5px dashed transparent;border-bottom:5px dashed transparent;left:-4px;}\n\n\n                  .tell_message{width: 680px; border: 2px solid #3ba7ee; padding: 0 20px; font-family: "Microsoft YaHei"; background-color: #fff;}\n                  .tell_title{line-height: 53px; font-size: 20px; border-bottom: 1px solid #ddd;}\n                  .tell_title span{font-size: 14px; padding-left: 16px; color: #34a6f1; cursor: pointer;}\n                  .tell_close{width: 20px; height: 19px; display: block; cursor: pointer; position: absolute; right: 20px; top: 18px; background: url(http://picint.sh.ctriptravel.com/offline_book/un_group_detail.png?140812.png) no-repeat -75px -781px;}\n                  .tell_message form{padding-top: 17px;}\n                  .tell_message form li{height: 28px; margin-bottom: 16px;}\n                  .tell_message form li.tell_write{height: 156px; margin-bottom: 5px; position: relative;}\n                  .tell_message form li.limt{height: 30px; margin-top: -15px;}\n                  .tell_message form li label{width: 48px; line-height: 28px; color: #666; padding-right: 15px; float: left;}\n                  .tell_message form li input,.tell_message form li select{padding: 0 0 0 10px; border: 1px solid #bbb; float: left;}\n                  .tell_message form li input{width: 178px; height: 26px; line-height: 26px; color: #333;}\n                  .tell_message form li .input_null{color: #ff8000; border: 1px solid #ff8000;}\n                  .tell_message form li select{width: 190px; height: 28px; line-height: 28px; color: #444;}\n                  .tell_message form li .grey{color: #999;}\n                  .tell_message form .label_pl{padding-left: 29px;}\n                  .tell_message form .tell_gotochange{width: 137px;}\n                  .tell_message form textarea{width: 602px; height: 154px; line-height: 24px; resize: none; color: #333; font-family: "microsoft yahei"; border: 1px solid #bbb; padding-left: 10px;}\n                  .tell_num{position: absolute; right: 15px; bottom: 5px; color: #999;}\n                  .tell_message .red{color: red;}\n                  .tell_message form p{float: left; color: #666;}\n                  .tell_message form button{width: 94px; float: left; text-align: center; border-radius: 5px; color: #fff; font: 14px/30px "Microsoft YaHei"; border: 0 none; background-color: #39a7ee; position: relative;}\n                  .tell_prompt{padding: 7px 15px 7px 10px; color: #ff8000; background-color: #fff8e4; border-radius: 5px; float: left; display: inline; margin-left: 15px; position: relative;}\n                  .tell_prompt i{width: 20px; height: 18px; display: inline-block; background: url(http://picint.sh.ctriptravel.com/offline_book/Pentagram_icon.png) no-repeat 0 -33px; vertical-align: text-top;}\n                  .tell_prompt span{width: 0; height: 0; line-height: 0; font-size: 0; border-top: 10px dashed transparent; border-right: 10px solid #fff8e4; border-bottom: 10px dashed transparent; border-left: 0 none; position: absolute; left: -10px; top: 6px;}\n                  .tell_prompt.right{color: #1b8d00; background-color: #eef9e4;}\n                  .tell_prompt.right i{background: url(http://picint.sh.ctriptravel.com/offline_book/Pentagram_icon.png) no-repeat 0 -13px;}\n                  .tell_prompt.right span{border-right: 10px solid #eef9e4;}\n                  .tell_prompt_text{float: left; color: red; line-height: 30px;}\n                  .tell_esc{width: 328px; background-color: #eff8fe; border: 1px solid #a6dbfd; text-align: center; padding: 43px 0 40px; color: #333; line-height: 24px; font: 16px/24px "Microsoft YaHei";}\n                  .tell_esc_btn{margin-top: 25px;}\n                  .tell_esc_btn a{width: 94px; height: 30px; display: inline-block; text-align: center; line-height: 30px; color: #333333; text-decoration: none; background-color: #fff; border-radius: 5px; border: 1px solid #ccc; margin-right: 19px; font-size: 14px;}\n                  .tell_esc_btn a.enter{border: 1px solid #39a7ee; background-color: #39a7ee; color: #fff;}\n                  .tell_send_box{width: 202px; padding: 53px 0 53px 66px; background-color: #fff; border: 1px solid #a6dbfd; font: 16px/48px "Microsoft YaHei";}\n                  .tell_send_box em{width: 48px; height: 48px; display: inline-block; margin-right: 10px; vertical-align: top;}\n                  .tell_send_box em.success_ico{background-position: 0 0;}\n                  .tell_send_box em.failure_ico{background-position: 0 -48px;}\n                  /***\u8be6\u60c5\u9875\u5934\u90e8\u516c\u5171\u6807\u7b7e****/\n                  .base_sign_box{padding-top:20px; margin-bottom:-10px;background:url(http://picint.sh.ctriptravel.com/offline_book/bg_miancolor.png);}\n                  .base_sign_box .sign_box{ position:relative; width:980px;margin:0 auto; height:22px;}\n\n                  .sign_other_btn i,.sign_add_btn i,.hot_sign .choose i{background-image: url(http://picint.sh.ctriptravel.com/offline_book/contrast_icon.png);\n                  background-repeat: no-repeat;}\n                  .hot_sign { padding-left: 25px;position: absolute;right: 0;height: 38px;line-height: 38px;bottom:-7px;color: #fff;font-family: microsoft yahei,simsun,sans-serif;overflow: hidden; }\n                  .hot_sign a{display:inline-block; height:24px; line-height:24px; font-size:12px; color:#0085cc; padding:0 10px; margin-left:6px; border:1px solid #97d0ff; border-radius: 3px; position:relative; }\n                  .hot_sign a.sign_other_btn{  padding:0 10px 0 27px;}\n                  .sign_other_btn i{height: 10px;width: 14px;background-position: 0 0;position: absolute;top: 7px;cursor: pointer;left: 10px;}\n                  .hot_sign a:hover{ background-color:#39a7ee; color:#fff; text-decoration:none;}\n                  .hot_sign a.sign_other_btn:hover i{ background-position:-12px 0; }\n                  .hot_sign a.sign_add_btn{ padding:0 10px 0 27px;}\n                  .sign_add_btn i{height: 12px;width: 14px;background-position: 0 -17px;position: absolute;top: 7px;cursor: pointer;left: 10px;}\n                  .hot_sign a.sign_add_btn:hover i{background-position: -14px -17px;}\n                  .hot_sign a.choose{ padding:0 10px 0 27px;}\n                  .choose i{height: 6px;width: 14px;background-position: 0 -12px;position: absolute;top: 7px;cursor: pointer;left: 10px;}\n                  .hot_sign .choose i{background-position: -24px 0px;}\n                  .choose:hover i{background-position: -36px 0px;}\n                  .product_scroll_wrap dl.nonsupport{padding-left:0; }\n                  .nonsupport dd{overflow: hidden;}\n                  .nonsupport dd span{ float: left;height: 18px;line-height: 18px;padding:0 4px;color: #ff7323;*white-space: nowrap;border: 1px solid #ff7323;margin-right: 4px;margin-bottom: 2px;border-radius: 3px; }\n\n\n                  .city_searchBox{ position: absolute;background-color: #fff;z-index: 20;border: 1px solid #D6D6D6; top:32px;padding: 14px;width: 320px;display: block; left:65px; }\n                  .city_searchBox .hot_station { border-bottom: 1px solid #EAEAEA;padding-bottom: 8px; }\n                  .city_searchBox .hot_station h4 { font-weight: normal;color: #999;font-size: 12px;line-height: 20px; }\n                  .city_searchBox .hot_station a { display: inline-block;line-height: 20px;margin-right: 8px;color: #666; }\n                  .city_searchBox a:hover { color: #0065BB; }\n                  .city_searchBox .station_list li { padding-top: 8px; }\n                  .city_searchBox .station_list span { width: 16px;height: 14px;text-align: center;line-height: 16px;background-color: #74C1F8;color: #fff;display: inline-block;margin-right: 16px; }\n                  .city_searchBox .station_list a { display: inline-block;margin-right: 8px;color: #666; }\n                  .city_spread dt b,.dest_spread dt b { background-position: -24px -648px; }\n                  .city_spread dd,.dest_spread dd { display: block; }\n                  .station_search{margin-top:10px;}\n                  .station_search_box{height:28px;border:1px solid #D2D2D2;border-radius:4px;box-shadow: 1px 1px 3px #DDDDDD inset;position:relative;z-index:3;}\n                  .station_search_box input{border:0!important;padding:0!important;background-color: transparent;box-shadow: none!important;width:96%;height:22px;line-height:22px\0;*line-height:22px;margin:2px 2%;outline: none;}\n                  .station_search_box input:focus{background-color:#FFFFFF!important;}\n                  .station_search_box p{position:absolute;top:0;left:0;color:#999;text-indent:10px;z-index:-1;line-height:28px;}\n                  .station_wordsselect{margin-top:10px;padding-bottom:10px;background-color:#FFFFFF;position:relative;z-index:2;}\n                  .station_wordsselect a{display:inline-block;padding:0 10px;line-height:22px;height:22px;white-space: nowrap;color:#000;font-family:\'Microsoft yahei\'}\n                  .station_wordsselect a.on , .station_wordsselect a:hover{color:#FFFFFF!important;background-color:#1D74E6;text-decoration: none;}\n                  .station_search_list{margin-top:-1px;display:none;position:relative;z-index:1;}\n                  .station_search_list li{padding-left:15px;line-height:30px;border-top:1px dotted #EAEAEA;*zoom:1;}\n                  .station_search_list li:after{clear:both; content:\'.\'; display:block; height:0; overflow:hidden;}\n                  .station_search_list li span{margin-left:-15px;font-size:14px;color:#1D74E6;font-weight:bold;float:left;margin-top:1px;*margin-top:0px;_margin-top:1px;}\n                  .station_search_list li a{display:inline-block;margin-left:15px;color:#000;}\n                  .station_search_list li a:hover{color:#1D74E6;}\n                  .station_search_result{padding:5px 0;font-weight:bold;}\n                  .station_search_result a{display:inline-block;margin-right:10px;line-height:28px;color:#0065BB;}\n                </style>\n            '}
                        }), i.a.createElement("div", {className: "indent_nav_box"}, i.a.createElement("input", {
                            type: "hidden",
                            id: "CookieID",
                            value: a || ""
                        }), i.a.createElement("div", {className: "indent_nav basefix"}, i.a.createElement("img", {
                            className: "indent_logo",
                            src: "http://picint.sh.ctriptravel.com/offline_book/indent_logo.png"
                        }), l)), i.a.createElement("div", {id: "top"}), !!c && i.a.createElement("div", {
                            id: "Div1",
                            className: "bg_miancolor"
                        }, i.a.createElement("div", {className: "indent_fixed"}, i.a.createElement("a", {href: "http://inbound.sh.ctriptravel.com/offlinelogin/view/signinview.aspx?Type=PKG_OFFRESERVE&CookieID=".concat(a)}, "\u9884\u8ba2\u9996\u9875"), i.a.createElement("div", {className: "indent_dian02 "}, i.a.createElement("a", {
                            id: "transfer",
                            href: "javascript:;"
                        }, "\u8f6c"), i.a.createElement("div", {
                            id: "redirectMore",
                            className: "indent_dian_more"
                        }, i.a.createElement("a", {href: "ccdesk:#841229ucid=<uid>".concat(r, "</uid><ani>").concat(c.Ani || "", "</ani><from>PKG</from>##")}, "\u9152\u5e97\u9884\u8ba2"), i.a.createElement("a", {href: "ccdesk:#841249ucid=<uid>".concat(r, "</uid><ani>").concat(c.Ani || "", "</ani><from>PKG</from>##")}, "\u56fd\u5185\u673a\u7968"), i.a.createElement("a", {href: "ccdesk:#841255ucid=<uid>".concat(r, "</uid><ani>").concat(c.Ani || "", "</ani><from>PKG</from>##")}, "\u56fd\u9645\u673a\u7968"), i.a.createElement("a", {href: "ccdesk:#840532ucid=<uid>".concat(r, "</uid><ani>").concat(c.Ani || "", "</ani><from>PKG</from>##")}, "\u5ba2\u6237\u670d\u52a1"), i.a.createElement("a", {href: "ccdesk:#841200ucid=<uid>".concat(r, "</uid><ani>").concat(c.Ani || "", "</ani><from>PKG</from>##")}, "\u95e8\u7968\u9884\u8ba2"), i.a.createElement("a", {href: "ccdesk:#840621ucid=<uid>".concat(r, "</uid><ani>").concat(c.Ani || "", "</ani><from>PKG</from>##")}, "\u90ae\u8f6e\u9884\u8ba2"), i.a.createElement("a", {href: "ccdesk:#840510ucid=<uid>".concat(r, "</uid><ani>").concat(c.Ani || "", "</ani><from>PKG</from>##")}, "\u9e3f\u9e44\u9038\u6e38"), i.a.createElement("a", {href: "ccdesk:#840639ucid=<uid>".concat(r, "</uid><ani>").concat(c.Ani || "", "</ani><from>PKG</from>##")}, "\u6e38\u5b66\u9884\u8ba2"))), i.a.createElement("a", {
                            href: "http://order.package.ctripcorp.com/tour/order_package/OfflineUnifiedQuery?uid=".concat(r, "&orderType=0&OrderListType=QueryUserOrder&CookieID=").concat(a),
                            target: "_blank"
                        }, "\u8ba2\u5355\u67e5\u8be2"), i.a.createElement("a", {
                            href: "http://order.package.ctripcorp.com/tour/order_package/OfflineUnifiedQuery?uid=".concat(r, "&orderType=1&OrderListType=QueryUserOrder&CookieID=").concat(a),
                            target: "_blank"
                        }, "\u6682\u5b58\u8ba2\u5355"), i.a.createElement("a", {
                            href: "/Package-Booking-PkgOrderTrack/Orders/Home/SearchResult/?uid=".concat(r, "&CookieID=").concat(a),
                            target: "_blank"
                        }, "\u8ffd\u5355\u8ba2\u5355"), i.a.createElement("a", {
                            href: "/Package-Booking-PkgOrderTrack/Orders/Home/Input?from=booking&uid=".concat(r, "&CookieID=").concat(a),
                            target: "_blank"
                        }, "\u610f\u5411\u5355"), i.a.createElement("a", {
                            id: "sendSMS_btn",
                            className: "hidden",
                            href: "javascript:;"
                        }, "\u53d1\u9001\u77ed\u4fe1"), i.a.createElement("div", {className: "indent_dian"}, i.a.createElement("a", {
                            className: "dian_icon choose",
                            href: "javascript:;"
                        }, "\xb7\xb7\xb7"), i.a.createElement("div", {className: "indent_dian_more"}, i.a.createElement("a", {
                            href: "http://service.sh.ctriptravel.com/cii/custrequire/custrequireinput.asp?eid=".concat(p, "&uid=").concat(r, "&orderid=&pkg=&CookieID=").concat(a),
                            target: "_blank"
                        }, "\u7528\u6237\u5efa\u8bae\u4e0e\u5f55\u5165"), i.a.createElement("a", {
                            href: "http://service.sh.ctriptravel.com/cii/promptmessage/readmessage.asp?uid=".concat(r, "&CookieID=").concat(a),
                            target: "_blank"
                        }, "\u5ba2\u6237\u63d0\u793a\u4fe1\u606f"), i.a.createElement("a", {
                            href: "http://service.sh.ctriptravel.com/cii/Service/RequestLog/RequestLog_Add.asp?uid=".concat(r, "&eid=").concat(p, "&CookieID=").concat(a),
                            target: "_blank"
                        }, "\u8bb0\u5f55\u5ba2\u6237\u8bf7\u6c42"))))))
                    }
                }, {
                    key: "ifShowVisaIconInOffline", value: function () {
                        if (this.props.data) {
                            var e = this.props.data, n = e.Visa, t = e.ProductId, o = e.DepartureId, i = e.SaleCityId;
                            if (n && (n.VisaDescList.length || n.VisaCountryList.length)) {
                                var r = "/bookingnext/visa/SubDetail?IsCruise=false&ProductID=" + t + "&StartCity=" + o + "&SalesCity=" + i;
                                if (document.getElementById("visa_control")) document.getElementById("visa_control").setAttribute("href", r), document.getElementById("visa_control").style.display = "block"; else {
                                    var a = document.createElement("a");
                                    a.href = r, a.target = "_blank", a.id = "visa_control", a.text = "\u7b7e\u8bc1\u5185\u63a7", document.getElementsByClassName("indent_fixed") && document.getElementsByClassName("indent_fixed")[0].appendChild(a)
                                }
                            }
                        }
                    }
                }]) && x(o.prototype, r), a && x(o, a), t
            }();

            function _(e, n) {
                return m.apply(this, arguments)
            }

            function m() {
                return (m = s(regeneratorRuntime.mark(function e(n, t) {
                    var o;
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return e.prev = 0, e.next = 3, fetch(n, {
                                    headers: {"Content-Type": "application/json"},
                                    method: "POST",
                                    credentials: "include",
                                    body: JSON.stringify({
                                        HeadTagList: [{Key: "uid", Value: t.uid}],
                                        Version: "80000",
                                        PlatformId: 5,
                                        ChannelCode: 0
                                    })
                                });
                            case 3:
                                return o = e.sent, e.next = 6, o.json();
                            case 6:
                                if (!(o = e.sent) || "Success" !== o.ResponseStatus.Ack) {
                                    e.next = 11;
                                    break
                                }
                                return e.abrupt("return", o.Data);
                            case 11:
                                return e.abrupt("return", null);
                            case 12:
                                e.next = 17;
                                break;
                            case 14:
                                return e.prev = 14, e.t0 = e.catch(0), e.abrupt("return", null);
                            case 17:
                            case"end":
                                return e.stop()
                        }
                    }, e, null, [[0, 14]])
                }))).apply(this, arguments)
            }

            function k() {
                if ("undefined" === typeof window) return !1;
                var e = window.location.host;
                return window.location.search.toLowerCase().includes("isoffline=true") || e.includes("package") && e.includes("ctripcorp")
            }

            function w(e, n, t) {
                return v.apply(this, arguments)
            }

            function v() {
                return (v = s(regeneratorRuntime.mark(function e(n, t, o) {
                    var i, r, p, l, d, c, s, x, f, h;
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                if ("undefined" !== typeof window) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return", null);
                            case 2:
                                if (i = window.location.search, r = (o || {}).offlineUid, p = D("EID"), e.prev = 5, l = {}, !r) {
                                    e.next = 11;
                                    break
                                }
                                return l.uid = r, t(l), e.abrupt("return");
                            case 11:
                                if (!i) {
                                    e.next = 37;
                                    break
                                }
                                for (i = a.a.parse(i.replace("?", "")), d = 0, c = Object.keys(i); d < c.length; d++) s = c[d], l[s.toLowerCase()] = i[s];
                                if (l.uid || !l.shoppingid) {
                                    e.next = 34;
                                    break
                                }
                                if (e.prev = 15, !(o && o.ShoppingDetailGetInfo && o.ShoppingDetailGetInfo.Header)) {
                                    e.next = 20;
                                    break
                                }
                                x = o.ShoppingDetailGetInfo, e.next = 23;
                                break;
                            case 20:
                                return e.next = 22, y(n, l.shoppingid);
                            case 22:
                                x = e.sent;
                            case 23:
                                if ((f = x.Header) && f.length && f.forEach(function (e) {
                                    "uid" === e.Name.toLowerCase() && e.Value && (l.uid = e.Value), "cookieid" === e.Name.toLowerCase() && e.Value && (l.cookieid = e.Value)
                                }), l.uid) {
                                    e.next = 30;
                                    break
                                }
                                return e.next = 28, E(n, l.shoppingid);
                            case 28:
                                (h = e.sent) && (l.uid = h);
                            case 30:
                                e.next = 34;
                                break;
                            case 32:
                                e.prev = 32, e.t0 = e.catch(15);
                            case 34:
                                return l.eid = p, t(l), e.abrupt("return");
                            case 37:
                                t(null), e.next = 43;
                                break;
                            case 40:
                                e.prev = 40, e.t1 = e.catch(5), t(null);
                            case 43:
                            case"end":
                                return e.stop()
                        }
                    }, e, null, [[5, 40], [15, 32]])
                }))).apply(this, arguments)
            }

            function y(e, n) {
                return F.apply(this, arguments)
            }

            function F() {
                return (F = s(regeneratorRuntime.mark(function e(n, t) {
                    var o, i, r, a;
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return o = (n || {}).state, i = o ? o.restapi : "/tour/restapi", r = "".concat(i, "/online/10705/json/ShoppingDetailGet"), e.prev = 3, e.next = 6, fetch(r, {
                                    headers: {"Content-Type": "application/json"},
                                    method: "POST",
                                    credentials: "include",
                                    body: JSON.stringify({
                                        Version: "7100",
                                        PlatformId: 5,
                                        ChannelCode: 0,
                                        Channel: 1,
                                        shoppingId: t
                                    })
                                });
                            case 6:
                                return a = e.sent, e.next = 9, a.json();
                            case 9:
                                if (!(a = e.sent) || "Success" !== a.ResponseStatus.Ack) {
                                    e.next = 14;
                                    break
                                }
                                return e.abrupt("return", a);
                            case 14:
                                return e.abrupt("return", null);
                            case 15:
                                e.next = 20;
                                break;
                            case 17:
                                return e.prev = 17, e.t0 = e.catch(3), e.abrupt("return", null);
                            case 20:
                            case"end":
                                return e.stop()
                        }
                    }, e, null, [[3, 17]])
                }))).apply(this, arguments)
            }

            function E(e, n) {
                return z.apply(this, arguments)
            }

            function z() {
                return (z = s(regeneratorRuntime.mark(function e(n, t) {
                    var o, i, r, a, p, l, d;
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return o = (n || {}).state, i = o ? o.restapi : "/tour/restapi", r = "".concat(i, "/offline/12446/GetOfflineUserInfo"), e.prev = 3, e.next = 6, fetch(r, {
                                    headers: {"Content-Type": "application/json"},
                                    method: "POST",
                                    credentials: "include",
                                    body: JSON.stringify({
                                        Version: "80000",
                                        PlatformId: 5,
                                        ShoppingId: t,
                                        HeadTagList: []
                                    })
                                });
                            case 6:
                                return a = e.sent, e.next = 9, a.json();
                            case 9:
                                if (!(a = e.sent) || "Success" !== a.ResponseStatus.Ack) {
                                    e.next = 17;
                                    break
                                }
                                return p = a.Data, l = (p || {}).UserInfo, d = (l || {}).Uid, e.abrupt("return", d);
                            case 17:
                                return e.abrupt("return", null);
                            case 18:
                                e.next = 23;
                                break;
                            case 20:
                                return e.prev = 20, e.t0 = e.catch(3), e.abrupt("return", null);
                            case 23:
                            case"end":
                                return e.stop()
                        }
                    }, e, null, [[3, 20]])
                }))).apply(this, arguments)
            }

            function D(e) {
                if ("undefined" === typeof window) return null;
                var n, t = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
                return (n = document.cookie.match(t)) ? unescape(n[2]) : null
            }

            g(u, "contextType", l.a), u.isOffline = k
        }).call(this, t(409))
    }
}]);