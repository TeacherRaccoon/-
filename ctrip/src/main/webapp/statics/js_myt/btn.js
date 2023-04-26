"use strict";

function AddOption() {
}

var addOption;
!function () {
    var i = jQuery;
    AddOption.prototype = {
        constructor: AddOption, infoHash: null, init: function () {
            var i = this;
            i.refresh(!0)
        }, findDivByID: function (n) {
            var a = ($.BizData.addoption, i("#J_DivAddoption")), e = a.find(".J_MainDiv"), t = null;
            return e.children().each(function (a, e) {
                i(e).attr("data-id") == n && (t = i(e))
            }), t
        }, hasAddOption: function () {
            var i = this;
            return null != $.BizData.addoption.addiotionList && $.BizData.addoption.addiotionList.length > 0 && common.each($.BizData.addoption.addiotionList, function (n, a) {
                var e = i.findDivByID(a.id);
                if (e && e.is(":visible") && e.hasClass("J_isTS")) {
                    var t = parseIntNull(e.find(".J_selectNum").val());
                    if (t > 0) return !0
                }
            }), !1
        }, getTotalPrice: function () {
            var i = this, n = 0, a = 0, e = $.BizData.addoption;
            return common.each(e.addiotionList, function (e, t) {
                var o = i.findDivByID(t.id);
                if (o) {
                    var d = o.find(".J_selectNum").val(), s = i.getSinglePrice(t), c = i.getSingleRMBPrice(t);
                    n += d * s, a += d * c
                }
            }), {totalprice: n, totalRMBprice: a}
        }, getSinglePrice: function (i) {
            return i.isMenpiao ? i.MenpiaoSelectedDate ? i.MenpiaoSelectedDate.price : 0 : i.Price
        }, getSingleRMBPrice: function (i) {
            return i.isMenpiao ? i.MenpiaoSelectedDate ? i.MenpiaoSelectedDate.price : 0 : i.CNYPrice
        }, refresh: function (n) {
            var a = this, e = $.BizData.addoption, t = i("#J_DivAddoption");
            if (!e || !e.addiotionList.length && !e.groups.length) return void t.hide();
            t.show();
            var o = t.find(".J_MainDiv");
            o.children().addClass("J_toRemove");
            var d = function () {
                var i = a.getTotalPrice();
                0 == i.totalprice ? (delete priceInfo.priceList.addoption, delete priceInfo.priceRMBList.addoption) : (priceInfo.priceList.addoption = {
                    name: "附加服务",
                    value: i.totalprice
                }, priceInfo.priceRMBList.addoption = {name: "附加服务", value: i.totalRMBprice}), priceInfo.refresh()
            };
            common.each(e.addiotionList, function (t, s) {
                var c = i("<div class='taocan_box' data-id=" + s.id + "></div>");
                s.isPlainInvoice && c.addClass("J_isTS");
                var r = i("<div class='taocan_type'><span class='taocan_pay'>合计：<strong class='text-orange'><dfn>&yen;</dfn><span class='J_spanTotalPrice'>0</span></strong></span><div class='taocan_colr'><span class='taocan_unit'><dfn>¥</dfn><span class='singlePrice'>" + s.CNYPrice + "</span> /" + s.Unit + "</span><span class='taocan_plus'>×</span><span class='number_control J_NumSelector'><span class='number_reduce'><i class='icon_numreduce'></i></span><input type='text' class='number_input form_input_hasvalue J_selectNum'><span class='number_plus'><i class='icon_numplus'></i></span></span></div><div class='taocan_tit'><strong>" + s.name + "</strong> <span class='text-gray J_IcoTip'>[详情]</span></div></div>"),
                    l = i("<div class='taocan_toggle'></div>");
                if (s.Description) {
                    var p = i("<div class='mod_product_item J_detail'>" + s.Description.replace(/&#xA;/g, "</br>") + "</div>");
                    l.append(p.hide()), r.find(".J_IcoTip").bind("click", function (n) {
                        "none" === p.css("display") ? (p.css("display", ""), i(n.currentTarget).text("[收起]")) : (p.css("display", "none"), i(n.currentTarget).text("[详情]"))
                    })
                } else r.find(".J_IcoTip").hide();
                if (s.PlaceHolder) {
                    var u = "<div class='mod_book_item mod_book_item_form'><span class='mod_book_item_tit'>备注</span><div class='mod_book_item_cont'><div class='form_line'><div class='form_item form_item_col'><input type='text J_Remark' class='form_input'><label for='' class='form_input_label'>" + s.PlaceHolder + "</label></div></div></div></div>";
                    l.append(u)
                }
                var f = function (i, n, e) {
                    var t = a.getSingleRMBPrice(s) * v.val;
                    if (0 == v.val) c.find(".mod_book_item").hide(), r.find(".J_spanTotalPrice").html(0), delete priceInfo.priceDetail["addoption" + s.id]; else if (c.find(".mod_book_item").show(), r.find(".J_spanTotalPrice").html(t), s.dateDetail && s.dateDetail.length > 0 && !s.isMenpiao) {
                        var o = [];
                        common.each(s.dateDetail, function (i, n) {
                            o.push({date: n.date, value: "<div>RMB <span class='orange'>" + n.Price + "</span></div>"})
                        }), priceInfo.priceDetail["addoption" + s.id] = {name: s.name, data: o}
                    } else priceInfo.priceDetail["addoption" + s.id] = {
                        name: s.name,
                        data: "<div>RMB <span class='orange'>" + a.getSinglePrice(s) + "</span></div>"
                    };
                    e || d(), invoiceInfo.refreshIvoiceBody(), priceInfo.refresh(), tipsbInfo.refresh()
                }, v = common.bindNumSelector(r.find(".J_NumSelector"), f);
                v.min = s.MinCount * (s.MinCountMultiRoom ? $.BizData.pageParam.roomNumbers : 1), v.max = s.MaxCount * (s.MaxCountMultiRoom ? $.BizData.pageParam.roomNumbers : 1);
                var m = a.findDivByID(s.id);
                !m || n ? v.setValue(s.MinCount) : v.setValue(m.find(".J_selectNum").val());
                var _;
                if (s.isGroup) {
                    var m = a.findDivByID(s.id);
                    m && m.is(":visible") && (s.oriVisible = !0), c.hide();
                    var h = i("<div class='taocan_moption'><span class='btns_link'>其它选择<i class='icon_down'></i></span></div>");
                    h.find(".btns_link").bind("click", function (n) {
                        var a = i(n.currentTarget);
                        a.find("i").hasClass("icon_up") ? (a.find("i").removeClass("icon_up"), a.find("i").addClass("icon_down"), _.hide()) : (a.find("i").addClass("icon_up"), a.find("i").removeClass("icon_down"), _.show())
                    }), _ = i("<div class='taocan_moptions'></div>");
                    var D = common.find(e.groups, function (i, n) {
                        return n.groupName == s.groupName
                    });
                    common.each(D.list, function (n, t) {
                        var o = common.find(e.addiotionList, function (i, n) {
                            return n.id == t
                        });
                        if (o.id != s.id) {
                            var d = i("<div class='taocan_moption_item'><div class='taocan_moption_item_tit'>" + o.name + " <i class='icons-attention16 J_IcoTip'></i></div><div class='taocan_moption_item_colr'><span class='taocan_unit'><dfn>¥</dfn>" + o.Price + " /" + o.Unit + "</span><span class='btns_link'>选择</span></div></div>");
                            common.bindHover($(d.find(".J_IcoTip")[0]), function () {
                                return o.Description
                            }), d.find(".btns_link").bind("click", function () {
                                h.find(".btns_link").trigger("click"), a.findDivByID(o.id).show(), c.hide()
                            }), _.append(d)
                        }
                    })
                }
                var g;
                c.append(r), c.append(l), g && c.append(g), _ && (c.append(_), _.hide()), f(v.val, !1, !0), o.append(c)
            }), o.find(".J_toRemove").remove(), common.each(e.groups, function (i, n) {
                var t = !1;
                common.each(n.list, function (i, n) {
                    var o = common.find(e.addiotionList, function (i, a) {
                        return a.id == n
                    });
                    o.oriVisible && (a.findDivByID(n).show(), t = !0)
                }), t || a.findDivByID(n.list[0]).show()
            }), d()
        }, validate: function () {
        }, submit: function () {
            var i = $.BizData.inputValue, n = $.BizData.addoption, a = this;
            i.addOptionalInput = [], common.each(n.addiotionList, function (n, e) {
                var t = a.findDivByID(e.id);
                if (t && t.is(":visible")) {
                    var o = parseIntNull(t.find(".J_selectNum").val()), d = t.find(".J_Remark").val(),
                        e = {id: e.id, selected: o, remark: d};
                    i.addOptionalInput.push(e)
                }
            })
        }
    }, addOption = new AddOption
}();
"use strict";
var advancePayment;
!function () {
    function e() {
    }

    var a = jQuery, n = a("#J_DivPrePayment"), t = a("#J_advancePay"), r = a("#J_DivPriceInfo"), i = !1;
    e.prototype = {
        constructor: e, setSubmitFlg: !1, supressInsurance: !1, init: function () {
            var e = this, a = $.BizData.advancePayment;
            a && (t[0].checked = a.IsPrePaymentChecked), e.bindEvents(), e.refresh()
        }, refresh: function () {
            var e = this, r = $.BizData.advancePayment;
            return r && r.IsPrePayment ? creditExchange && creditExchange.isSWFF() ? (t[0].disabled = "disabled", t[0].checked = !1, t.trigger("change"), void n.find(".J_SWFF_Msg").css("display", "")) : (t[0].disabled = "", t.trigger("change"), n.find(".J_SWFF_Msg").css("display", "none"), a(".J_prepayReturnDays").html(r.PrepayReturnDays || 1), n.show(), i = !1, $.BizData.initParam.oriOrderID && "0" != BizData.initParam.oriOrderID || "58" === $.BizData.roominfo.City || "59" === $.BizData.roominfo.City || "53" === $.BizData.roominfo.Province || $.ajax("Tool/AjaxGetIfCredit.aspx", {
                method: "POST",
                async: !0,
                context: {orderAmt: $.BizData.priceinfo.TotalPrice},
                header: {"content-type": "application/x-www-form-urlencoded; charset=utf8"},
                onsuccess: function (e, a) {
                    var n = a && $.parseJSON(a);
                    n && 200 === n.code && "T" === n.data && ($("#J_PrePaymentDesc").html("<strong>我要闪住！ 享受到店免押金，离店免查房，先住后付，快速入/离店</strong>的尊享服务。"), $("#J_PrePaymentItem").css("display", ""), i = !0, t.parent().css("display", ""), t.trigger("change"))
                }
            }), t.parent().css("display", ""), 0 == e.getAdvanceAmount() && "PP" == $.BizData.pageParam.balancetype ? (t.parent().css("display", "none"), $("#J_PrePaymentDesc").html("此房型升级闪住服务，尊享到店免押金，离店免查房，快速入 / 离店等服务。"), $("#J_PrePaymentItem").css("display", "none")) : ($("#J_PrePaymentDesc").html("<strong>我要闪住！</strong>费用提前预授权到携程，到店取房卡直接入住，离店免查房甩房卡走人。余款离店" + r.PrepayReturnDays + "天内返还原账户。"), $("#J_PrePaymentItem").css("display", "none")), void submit.refresh()) : void n.hide()
        }, getAdvanceAmount: function () {
            var e = 0;
            if ($.BizData.advancePayment) {
                var a = $.BizData.advancePayment.PrePaymentFactor;
                e = 0 === a ? $.BizData.advancePayment.PrePaymentAmount : "RMB" != $.BizData.priceinfo.Currency ? Math.ceil($.BizData.priceinfo.rmbPrice * a) : Math.ceil($.BizData.priceinfo.TotalPrice * a)
            }
            return e
        }, getJLeftAmountWord: function () {
            var e = this, a = t[0].checked, n = this.getAdvanceAmount(), r = "";
            if (i) a && (r = '<span class="bold">离店后付</span><br/>实际费用以离店后结算为准'); else if (0 == e.getAdvanceAmount()) ; else if (a) {
                var c = "携程将预收全部费用，含前台押金" + n + "元<br/>余额将在离店后" + $.BizData.advancePayment.PrepayReturnDays + "天内退还";
                "RMB" != $.BizData.priceinfo.Currency && (c += "<br/>实付金额以下单当天汇率结算。"), r = c
            }
            return r
        }, bindEvents: function () {
            var e = this;
            $.BizData.advancePayment;
            t.bind("change", function (a) {
                var n = t[0].checked, c = e.getAdvanceAmount();
                n ? r.find(".J_SpanTotalPriceRMB").hide() : r.find(".J_SpanTotalPriceRMB").show(), delete priceInfo.priceList.advance, e.setSubmitFlg = !1, e.supressInsurance = !1, i ? n && (e.setSubmitFlg = !0, e.supressInsurance = !0) : 0 == e.getAdvanceAmount() || n && (priceInfo.priceList.advance = {
                    name: "押金",
                    value: Math.ceil(c)
                }), priceInfo.refresh(), submit.setSubmitBtnTxt(), cancelInsure.refresh(), travelInsure.refresh()
            }), common.bindPop($("#J_PrePaymentItem a"), "#J_PrePaymentPop", {
                onShow: function () {
                }, onOK: function () {
                }, onClose: function () {
                }
            })
        }, validate: function () {
        }, submit: function () {
            var e = this, a = $.BizData.advancePayment;
            if (a) {
                var n = $.BizData.inputValue;
                i ? (n.IsPrePayment = t[0].checked, n.IsPrePaymentCredit = n.IsPrePayment && i) : "PP" != $.BizData.pageParam.balancetype ? n.IsPrePayment = t[0].checked : 0 == e.getAdvanceAmount() ? n.IsPrePayment = !0 : n.IsPrePayment = t[0].checked, n.IsHasPrePayment = a.IsPrePayment
            }
        }
    }, advancePayment = new e
}();
"use strict";

function BookInfo() {
}

var bookInfo;
!function () {
    var a = jQuery;
    BookInfo.prototype = {
        constructor: BookInfo, wrap: a("#J_DivBookInfo"), pulldown: null, showChangeRoom: function () {
            var a = $.BizData.bookinfo, o = $.BizData.pageParam, e = $("#ichange"),
                n = "/Domestic/IframeDetailRooms.aspx?hotel=" + a.HotelID + "&checkInDate=" + o.arrival + "&checkOutDate=" + o.departure + ("18" == $.BizData.initParam.ChannelList ? "&ishotsale=1" : "");
            e.attr("src", n), $("#J_changeRoom").css({"z-index": 10, visibility: "visible"}), $("#J_changeRoom").mask()
        }, init: function () {
            var o = this, e = o.wrap, n = $.BizData.bookinfo, t = $.BizData.pageParam;
            o.refresh(), "DELAYORDER" != $.BizData.initParam.operationType ? o.pulldown = common.bindPulldown(e.find(".J_SelroomNum"), e.find(".J_roomNumList"), function () {
            }) : (e.find(".J_SelectedRoomNum").css("background-color", "lightgray"), e.find(".J_SelroomNum").css("background-color", "lightgray"));
            var i = a("#J_PopChangeDate").find(".J_TxtChangeDateStart"),
                r = a("#J_PopChangeDate").find(".J_TxtChangeDateEnd");
            "DELAYORDER" != $.BizData.initParam.operationType && i.bind("blur", o.checkDate.bind(o)), r.bind("blur", o.checkDate.bind(o)), common.bindPop(e.find(".J_BtnChangeDate"), "#J_PopChangeDate", {
                onShow: function () {
                    i.val(t.arrival).trigger("blur"), r.val(t.departure).trigger("blur");
                    var o = a("#J_PopChangeDate");
                    o.find(".J_SpanNights").html(e.find(".J_TxtNights").html()), o.find(".J_resel_noroom").hide(), common.triggerPlaceHolder(a("#J_PopChangeDate").find(".J_TxtChangeDateStart,.J_TxtChangeDateEnd")), $.BizData.roominfo.HourRoom_Duration > 0 ? (o.find(".J_checkout").css("display", "none"), o.find(".J_SpanNightsOuter").css("display", "none"), o.css("width", "310px"), o.find(".J_HourRoomWord").css("display", "").html(" " + $.BizData.roominfo.HourRoom_Duration + "小时")) : (o.css("width", "498px"), o.find(".J_checkout").css("display", ""), o.find(".J_SpanNightsOuter").css("display", ""), o.find(".J_HourRoomWord").css("display", "none"))
                }, onOK: function () {
                    if ($.BizData.roominfo.HourRoom_Duration > 0) {
                        var o = "yyyy-MM-dd", e = function (a) {
                            return !("string" == typeof a) && (a = new Date(a).toFormatString(o)), a.replace(/\-/g, "/")
                        }, n = new Date(e(i.val())), d = n;
                        d.setDate(d.getDate() + 1), r.val(d.toFormatString(o))
                    }
                    var s = t.arrival, m = t.departure;
                    t.arrival = i.val(), t.departure = r.val(), a("#J_dateLoading").show(), common.callHotelAvail(function () {
                        a("#J_dateLoading").hide()
                    }, function (o) {
                        a("#J_dateLoading").hide(), t.arrival = s, t.departure = m;
                        var e = "", n = "";
                        $.BizData.bookinfo && (e = $.BizData.bookinfo.HotelID, n = $.BizData.bookinfo.FixSubHotel);
                        var i = "/Domestic/IframeDetailRooms.aspx?hotel=" + e + "&checkInDate=" + t.arrival + "&checkOutDate=" + t.departure + ("18" == $.BizData.initParam.ChannelList ? "&ishotsale=1" : "");
                        a("#ichange").attr("src", i), $("#J_PopChangeDate").mask(), a("#J_PopChangeDate").find(".J_TxtChangeDateStart").val(t.arrival).trigger("blur"), a("#J_PopChangeDate").find(".J_TxtChangeDateEnd").val(t.departure).trigger("blur"), a("#J_PopChangeDate").find(".J_SpanNights").html(a("#J_DivBookInfo").find(".J_TxtNights").html()), common.triggerPlaceHolder(a("#J_PopChangeDate").find(".J_TxtChangeDateStart,.J_TxtChangeDateEnd")), a("#J_PopChangeDate").find(".J_resel_noroom").show()
                    })
                }, onClose: function () {
                    a("#J_PopChangeDate").find(".form_item_errorbox:visible")[0] && ($.BizData.pageParam.arrival = a("#J_DivBookInfo").find(".J_ArrivalDate").text(), $.BizData.pageParam.departure = a("#J_DivBookInfo").find(".J_DepatureDate").text(), $.BizData.pageParam.roomNumbers = a("#J_DivBookInfo").find(".J_SelectedRoomNum").text())
                }
            }), "DELAYORDER" != $.BizData.initParam.operationType ? $(i[0]).regMod("calendar", "6.0", {
                options: {
                    showWeek: !0,
                    startDate: new Date(standardTimeString(n.arrival)).toFormatString("yyyy-MM-dd"),
                    minDate: $.BizData.minDate || "#"
                }, listeners: {
                    onChange: function (a, e) {
                        var n = new Date(standardTimeString(e)).addDays(1).toFormatString("yyyy-MM-dd");
                        $(r[0]).data("minDate", n), o.checkDate(!0), r.trigger("focus")
                    }
                }
            }) : (i.attr("readonly", "readonly"), i.css("background-color", "lightgray")), $(r[0]).regMod("calendar", "6.0", {
                options: {
                    showWeek: !0,
                    startDate: new Date(standardTimeString(n.departure)).toFormatString("yyyy-MM-dd"),
                    minDate: new Date(standardTimeString(n.arrival)).addDays(1).toFormatString("yyyy-MM-dd")
                }, listeners: {
                    onChange: function (a, e) {
                        o.checkDate()
                    }
                }
            }), a("#J_PopChangeDate").find(".J_hotelLink").bind("click", function () {
                $("#J_changeRoom").css({"z-index": 10, visibility: "visible"}), $("#J_changeRoom").mask()
            }), $.BizMod || ($.BizMod = {}), a("#J_changeRoom").find(".c_close").bind("click", function () {
                $("#J_changeRoom").unmask()
            }), $.BizMod.ChangeRoomType = function (a, o, n, t, i, r) {
                var d = $.BizData.pageParam, s = d.arrival, m = d.departure, l = d.roomID, f = d.balancetype,
                    h = d.swid, c = d.sctx;
                d.arrival = a, d.departure = o, d.roomID = parseIntNull(n), d.balancetype = t, d.swid = parseIntNull(i), d.sctx = r, common.callHotelAvail(function (a) {
                    $("#J_changeRoom").unmask()
                }, function (a) {
                    e.find(".J_resel_error").css("display", ""), d.arrival = s, d.departure = m, d.roomID = l, d.balancetype = f, d.swid = h, d.sctx = c
                })
            }, n.isShowChangeRoom ? (e.find(".J_ChangeRoomID").show(), e.find(".J_ChangeRoomID").find("a").bind("click", function () {
                o.showChangeRoom()
            }), $.BizData.roominfo.onChangeCopyError && ($("#J_changeRoom").mask(), $("#J_changeRoom .c_close").remove(), e.find(".J_ChangeRoomID").find("a").trigger("click"), $("#J_changeRoom").css("position", "fixed"))) : e.find(".J_ChangeRoomID").hide()
        }, refresh: function () {
            var o = this, e = o.wrap, n = $.BizData.bookinfo, t = $.BizData.pageParam, i = n.MaxRoomCount,
                r = n.MinRoomCount;
            e.find(".J_SelectedRoomNum").html(t.roomNumbers), e.find(".J_roomNumList").find("ul").empty();
            for (var d = r; d <= i; d++) {
                var s = a("<li><a href='javascript:;'>" + d + "</a></li>");
                s.find("a").attr("num", "" + d), s.find("a").bind("click", function (n) {
                    var i = t.roomNumbers;
                    t.roomNumbers = parseInt(a(n.target).attr("num")), o.pulldown.hidePulldown(), a("#J_roomLoading").show(), e.find(".J_resel_error").css("display", "none"), creditExchange && creditExchange.onRoomCountChange(), common.callHotelAvail(function () {
                        a("#J_roomLoading").hide()
                    }, function () {
                        t.roomNumbers = i, e.find(".J_resel_error").css("display", ""), a("#J_roomLoading").hide()
                    })
                }), e.find(".J_roomNumList").find("ul").append(s)
            }
            if (e.find(".J_spanMaxRoomNum").html(i), n.MaxRoomCount <= 5 ? e.find(".J_RoomCountWord").html("仅剩" + i + "间") : e.find(".J_RoomCountWord").html(""), e.find(".J_RoomName").html(n.roomName), e.find(".J_RoomEName").html(n.roomEName), e.find(".J_ArrivalDate").html(n.arrival), e.find(".J_Arrivalweek").html(n.arrivalWeek), e.find(".J_TxtArrivalTime").html(n.arrivalTime), e.find(".J_DepatureDate").html(n.departure), e.find(".J_Depatureweek").html(n.departureWeek), e.find(".J_TxtDepatureTime").html(n.departureTime), e.find(".J_TxtNights").html(n.nights), e.find(".J_GuestNum").html($.BizData.custominfo.MaxGuestCounts), $("#J_PopChangeDate").unmask(), n.remainRoom > 0 && n.remainRoom < 9999 ? (e.find(".J_remainRoom").show(), e.find(".J_remainRoom").find(".J_Content").html(n.remainRoom)) : e.find(".J_remainRoom").hide(), n.ClientComeFrom || "rakuten" === $.BizData.roominfo.hotelType) {
                var m = '<i class="icons-attention16"></i>';
                n.ClientComeFrom && (m += n.ClientComeFrom), "rakuten" === $.BizData.roominfo.hotelType && (m += "<br/>" + $.BizData.ErrMsg.rakutenRemark), e.find(".J_roomTip").html(m).show()
            } else e.find(".J_roomTip").hide();
            var l = n.breakfastList;
            e.find(".J_TblBreakfast").empty();
            for (var f = $.BizData.priceinfo.priceDetail.rates.data, d = 0; d < l.length; d += 7) {
                for (var h = a("<tr></tr>"), c = a("<tr></tr>"), _ = d; _ < d + 7 && _ < l.length; _++) {
                    var s = l[_], D = a("<th>" + s.date + "</th>"), g = a("<td>" + f[_].value + "</td>");
                    h.append(D), c.append(g)
                }
                e.find(".J_TblBreakfast").append(h), e.find(".J_TblBreakfast").append(c)
            }
            $.BizData.roominfo.HourRoom_Duration > 0 ? (e.find(".J_DivDate").find(".mod_book_item_tit").html("入住日期"), e.find(".text-gray").css("display", "none"), e.find(".f_to").css("display", "none"), e.find(".f_chkout").css("display", "none"), e.find(".f_days").css("display", "none"), e.find(".J_HourRoomWord").css("display", "").html(" " + $.BizData.roominfo.HourRoom_Duration + "小时"), e.find(".f_chkin").css("width", "133px")) : (e.find(".text-gray").css("display", ""), e.find(".f_to").css("display", ""), e.find(".f_chkout").css("display", ""), e.find(".f_days").css("display", ""), e.find(".J_HourRoomWord").css("display", "none"), e.find(".f_chkin").css("width", "200px")), n.PrePayDiscountChanged ? e.find(".J_PrePayDiscountChanged").css("display", "").find("span").html(n.PrePayDiscountChanged) : e.find(".J_PrePayDiscountChanged").css("display", "none")
        }, checkDate: function (o) {
            var e = a("#J_PopChangeDate").find(".J_TxtChangeDateStart"),
                n = a("#J_PopChangeDate").find(".J_TxtChangeDateEnd"), t = new Date(standardTimeString(e.val())),
                i = new Date(standardTimeString(n.val())), r = t.addDays(1);
            if (t >= i && o) n.val(r.toFormatString("yyyy-MM-dd")), a("#J_PopChangeDate").find(".J_SpanNights").html("1"); else {
                var d = getDateDiff(t, i);
                d > 28 ? a("#J_PopChangeDate").find(".J_resel_overstay").show() : a("#J_PopChangeDate").find(".J_resel_overstay").hide(), a("#J_PopChangeDate").find(".J_SpanNights").html(d)
            }
            /^(\d{4})-(\d{2})-(\d{2})$/.test(e.val()) ? /^(\d{4})-(\d{2})-(\d{2})$/.test(n.val()) ? (common.clearError(e), common.clearError(n)) : common.showError(n, $.BizData.ErrMsg.wrongDate) : common.showError(e, $.BizData.ErrMsg.wrongDate), a("#J_PopChangeDate").find(".J_resel_noroom").hide(), a("#J_PopChangeDate").find(".form_item_errorbox:visible")[0] ? a("#J_PopChangeDate").find(".J_OK").addClass("").attr("disabled", !0) : a("#J_PopChangeDate").find(".J_OK").attr("disabled", !1)
        }
    }, bookInfo = new BookInfo
}();
"use strict";

function CreditExchange() {
}

var creditExchange;
!function () {
    var e = jQuery, n = e("#J_CreditExchange"), t = e("#J_CreditExchangeTemplate1").html(),
        i = e("#J_CreditExchangeTemplate2").html(), c = e("#J_CreditExchangeTemplate3").html();
    CreditExchange.prototype = {
        mfqxSelector: null,
        yctfSelector: null,
        mfzc1dSelector: null,
        mfzcndSelector: [],
        fxsjSelector: null,
        swffSelector: null,
        info: null,
        inited: !1,
        isSWFF: function () {
            return this.swffSelector && 1 == this.swffSelector.val
        },
        onSelectChange: function () {
            var e = 0, t = 0, i = creditExchange;
            if (i.info && i.inited) {
                if (e += i.info.mfqx ? i.mfqxSelector.val * i.info.mfqx.cost : 0, e += i.info.yctf ? i.yctfSelector.val * i.info.yctf.cost : 0, i.info.mfzc) if (1 == $.BizData.bookinfo.nights) e += i.mfzc1dSelector.val * i.info.mfzc.cost, t += i.mfzc1dSelector.val; else for (var c = 0; c < i.mfzcndSelector.length; c++) e += i.mfzcndSelector[c].val * i.info.mfzc.cost, t += i.mfzcndSelector[c].val;
                e += i.info.fxsj ? i.fxsjSelector.val * i.info.fxsj.cost : 0, e += i.info.swff ? i.swffSelector.val * i.info.swff.cost : 0, n.find(".J_TotalUseCredit").html(e);
                var f = !0;
                e > i.info.UserExperience && (f = !1);
                var a = function (n, t) {
                    t && (t.cost + e > i.info.UserExperience ? n.setAltMax(n.val) : n.setAltMax(-1))
                }, o = function (n, c) {
                    c && (c.cost + e > i.info.UserExperience ? n.setAltMax(n.val) : 1 + t > c.stock ? n.setAltMax(n.val) : n.setAltMax(-1))
                };
                if (a(i.mfqxSelector, i.info.mfqx), a(i.yctfSelector, i.info.yctf), 1 == $.BizData.bookinfo.nights) o(i.mfzc1dSelector, i.info.mfzc); else for (var c = 0; c < i.mfzcndSelector.length; c++) o(i.mfzcndSelector[c], i.info.mfzc);
                return a(i.fxsjSelector, i.info.fxsj), a(i.swffSelector, i.info.swff), f
            }
        },
        init: function () {
            var c = this;
            $.BizData.creditExchange;
            common.bindHover($(n.find(".icons-doubt16")[0]), function () {
                return e("#J_CreditExchangeHoverContent").html()
            });
            var f = n.find(".J_Content"), a = e(t);
            a.addClass("J_MFZC1D"), c.mfzc1dSelector = common.bindNumSelector(a.find(".J_NumSelector"), function (e, n) {
                n && c.onSelectChange()
            }, {readonly: !0}), f.append(a);
            var o = e(i);
            o.addClass("J_MFZCnD"), common.bindToggle(o.find(".J_SelectDateToggle"), o.find(".J_MultiDayContent")), f.append(o);
            var s = e(t);
            s.addClass("J_MFQX"), c.mfqxSelector = common.bindNumSelector(s.find(".J_NumSelector"), function (e, n) {
                n && c.onSelectChange()
            }, {readonly: !0}), f.append(s);
            var l = e(t);
            l.addClass("J_YCTF"), c.yctfSelector = common.bindNumSelector(l.find(".J_NumSelector"), function (e, n) {
                n && c.onSelectChange()
            }, {readonly: !0}), f.append(l);
            var r = e(t);
            r.addClass("J_FXSJ"), c.fxsjSelector = common.bindNumSelector(r.find(".J_NumSelector"), function (e, n) {
                n && c.onSelectChange()
            }, {readonly: !0}), f.append(r);
            var d = e(t);
            d.addClass("J_SWFF"), $.BizData.pageParam.isSelectSWFF = !1, c.swffSelector = common.bindNumSelector(d.find(".J_NumSelector"), function (e, n) {
                n && c.onSelectChange();
                var t = 1 == e;
                t != $.BizData.pageParam.isSelectSWFF && (d.find(".J_Loading").css("display", ""), $.BizData.pageParam.isSelectSWFF = t, c.isSWFFRefresh = !0, common.callHotelAvail(function (e) {
                    d.find(".J_Loading").css("display", "none"), $.BizData.pageParam.isSelectSWFF ? (1 == $.BizData.bookinfo.nights ? d.find(".J_Message").html("您的房费为0元，不可继续享受优惠券、促销、闪住等活动，且不支持开票") : d.find(".J_Message").html("您的房费金额已发生变化，根据使用规则，不可再使用优惠券"), priceInfo.priceList.SWFF = {
                        name: "积分兑换首晚房费",
                        value: -$.BizData.priceinfo.priceDetail.rates.data[0].price
                    }) : (d.find(".J_Message").html(""), delete priceInfo.priceList.SWFF), advancePayment.refresh(), priceInfo.refresh(), submit.setSubmitBtnTxt()
                }, function () {
                    d.find(".J_Loading").css("display", "none")
                }))
            }, {readonly: !0}), d.find(".taocan_pay").append(e("<span class='msg_text J_Loading' style='display:none;'><img alt='正在努力加载...' src='//pic.c-ctrip.com/common/loading.gif' class='b_date_loading'></span>")), d.append(e("<div class='taocan_type J_Message' style='padding: 0px 0px 5px 30px;margin-top: -10px;color: #f60;'></div>")), f.append(d), c.refresh(!0), c.inited = !0, c.onSelectChange()
        },
        refresh: function (t) {
            var i = $.BizData.creditExchange, f = this;
            if (f.info = i, f.isSWFFRefresh) return void (f.isSWFFRefresh = !1);
            if (!i) return void n.css("display", "none");
            n.css("display", ""), n.find(".J_TotalCredit").html(i.UserExperience);
            var a = n.find(".J_Content");
            if (i.notAllowed && n.find(".advance_type").css("color", "red").html("修改订单后，不再享受积分兑换权益，积分将原路径退回"), i.mfzc) {
                var o = "";
                if (i.mfzc.value > 0) var o = "&nbsp;&nbsp;<span class='green'>价值<dfn>&yen;</dfn>" + i.mfzc.value + "</span>";
                if (1 == $.BizData.bookinfo.nights) {
                    a.find(".J_MFZCnD").css("display", "none");
                    var s = a.find(".J_MFZC1D");
                    s.css("display", ""), s.find(".J_Cost").html(i.mfzc.cost), s.find(".J_Unit").html("/" + i.mfzc.unit), s.find(".J_Title").html("早餐" + o), i.mfzc.stock <= 5 ? s.find(".J_Stock").html("仅剩" + i.mfzc.stock + "份") : s.find(".J_Stock").html("&nbsp;"), f.mfzc1dSelector.min = 0, f.mfzc1dSelector.max = i.mfzc.max, t && f.mfzc1dSelector.init(0)
                } else {
                    a.find(".J_MFZC1D").css("display", "none");
                    var l = a.find(".J_MFZCnD");
                    l.find(".J_Title").html("早餐" + o), l.css("display", ""), i.mfzc.stock <= 5 ? l.find(".J_Stock").html("仅剩" + i.mfzc.stock + "份") : l.find(".J_Stock").html("&nbsp;");
                    var r = l.find(".J_MultiDayContent"), d = $.BizData.priceinfo.priceDetail.rates.data;
                    if (d.length - 1 != l.find(".J_MultiDayContent").children().length) {
                        r.html(""), f.mfzcndSelector.length = 0;
                        for (var m = 1; m < d.length; m++) {
                            var p = e(c);
                            p.find(".J_Date").html(d[m].date);
                            var S = common.bindNumSelector(p.find(".J_NumSelector"), function (e, n) {
                                n && f.onSelectChange()
                            }, {readonly: !0});
                            S.min = 0, S.max = i.mfzc.max, S.init(0), f.mfzcndSelector.push(S), p.find(".J_Cost").html(i.mfzc.cost), p.find(".J_Unit").html("/" + i.mfzc.unit), r.append(p)
                        }
                    } else for (var m = 0; m < f.mfzcndSelector.length; m++) {
                        var S = f.mfzcndSelector[m];
                        S.setMax(i.mfzc.max)
                    }
                }
            } else a.find(".J_MFZC1D").css("display", "none"), a.find(".J_MFZCnD").css("display", "none");
            if (i.mfqx) {
                var h = a.find(".J_MFQX");
                h.css("display", ""), h.find(".J_Cost").html(i.mfqx.cost), h.find(".J_Unit").html("/" + i.mfqx.unit), h.find(".J_Title").html("免费取消&nbsp;&nbsp;<span class='green'>入住日20:00前可免费取消</span>"), f.mfqxSelector.min = 0, f.mfqxSelector.max = 1, t && f.mfqxSelector.init(0)
            } else a.find(".J_MFQX").css("display", "none");
            if (i.yctf) {
                var x = a.find(".J_YCTF");
                x.css("display", ""), x.find(".J_Cost").html(i.yctf.cost), x.find(".J_Unit").html("/" + i.yctf.unit), x.find(".J_Title").html("延迟退房2小时&nbsp;&nbsp;<span class='green'>价值<dfn>&yen;</dfn>" + i.yctf.value + "</span><span style='color:gray;'>（视酒店客房供应量而定）</span>"), f.yctfSelector.min = 0, f.yctfSelector.max = 1, t && f.yctfSelector.init(0)
            } else a.find(".J_YCTF").css("display", "none");
            if (i.fxsj) {
                var u = a.find(".J_FXSJ");
                u.css("display", ""), u.find(".J_Cost").html(i.fxsj.cost), u.find(".J_Unit").html("/" + i.fxsj.unit), u.find(".J_Title").html("房型升级&nbsp;&nbsp;<span class='green'>此单房型同床型升级</span><span style='color:gray;'>（视酒店客房供应量而定）</span>"), f.fxsjSelector.min = 0, f.fxsjSelector.max = 1, t && f.fxsjSelector.init(0)
            } else a.find(".J_FXSJ").css("display", "none");
            if (i.swff) {
                var g = a.find(".J_SWFF");
                g.css("display", ""), g.find(".J_Cost").html(i.swff.cost), g.find(".J_Title").html("首晚房费&nbsp;&nbsp;<span class='green'>价值<dfn>&yen;</dfn>" + i.swff.value + "</span>"), f.swffSelector.min = 0, f.swffSelector.max = 1, t ? f.swffSelector.init(0) : ($.BizData.pageParam.isSelectSWFF = !1, f.swffSelector.setValue(f.swffSelector.val))
            } else a.find(".J_SWFF").css("display", "none");
            f.onSelectChange()
        },
        onRoomCountChange: function () {
            $.BizData.pageParam.roomNumbers >= 2 && this.swffSelector && (this.swffSelector.setValue(0), $.BizData.pageParam.isSelectSWFF = !1, this.onSelectChange())
        },
        validate: function () {
            return !0
        },
        submit: function () {
            var e = $.BizData.inputValue, n = this, t = $.BizData.creditExchange;
            if (t) {
                e.creditExchange = {};
                var i = function (e) {
                    var n = {};
                    return n.pcid = e.pcid, n.tagid = e.tagid, n.rewardid = e.rewardid, n.cost = e.cost, n
                };
                if (t.mfqx && (e.creditExchange.mfqx = i(t.mfqx), e.creditExchange.mfqx.count = n.mfqxSelector.val), t.yctf && (e.creditExchange.yctf = i(t.yctf), e.creditExchange.yctf.count = n.yctfSelector.val), t.mfzc) if (1 == $.BizData.bookinfo.nights) {
                    e.creditExchange.mfzc = [];
                    var c = i(t.mfzc);
                    c.count = n.mfzc1dSelector.val, c.date = $.BizData.priceinfo.priceDetail.rates.data[1].fulldate, e.creditExchange.mfzc.push(c)
                } else {
                    var f = $.BizData.priceinfo.priceDetail.rates.data;
                    e.creditExchange.mfzc = [];
                    for (var a = 1; a < f.length; a++) {
                        var c = i(t.mfzc);
                        c.count = n.mfzcndSelector[a - 1].val, c.date = f[a].fulldate, e.creditExchange.mfzc.push(c)
                    }
                }
                t.fxsj && (e.creditExchange.fxsj = i(t.fxsj), e.creditExchange.fxsj.count = n.fxsjSelector.val), t.swff && (e.creditExchange.swff = i(t.swff), e.creditExchange.swff.count = n.swffSelector.val, e.creditExchange.swff.price = t.swff.value)
            }
        },
        processErrorCode: function (e) {
            var t = this;
            return !(e.indexOf("110117030116") >= 0) || (common.showCommonPopSimple("错误", "积分兑换权益数量不足", function () {
                n.find(".J_Loading").css("display", ""), common.callHotelAvail(function (e) {
                    if (n.find(".J_Loading").css("display", "none"), t.refresh(), t.info.mfqx && t.mfqxSelector.setValue(0), t.info.yctf && t.yctfSelector.setValue(0), t.info.mfzc) if (1 == $.BizData.bookinfo.nights) t.mfzc1dSelector.setValue(0); else for (var i = 0; i < t.mfzcndSelector.length; i++) t.mfzcndSelector[i].setValue(0);
                    t.info.fxsj && t.fxsjSelector.setValue(0), t.info.swff && t.swffSelector.setValue(0), t.onSelectChange()
                }), jQuery("body,html").animate({scrollTop: jQuery("#J_CreditExchange").offset().top}, 1e3)
            }), !1)
        }
    }, creditExchange = new CreditExchange
}();
"use strict";

function Common() {
}

var common;
!function () {
    var n = jQuery;
    Common.prototype = {
        init: function () {
            this.bindPlaceHolder(), $.mod.load("jmp", "1.1", function () {
            }), window.parseIntNull = function (n) {
                var t = parseInt(n, 10);
                return isNaN(t) ? 0 : t
            }, this.setScrollEvent(), this.setAreas()
        }, setAreas: function () {
            var n = jQuery(".J_CountryCode");
            n.each(function () {
                var n = jQuery(this), t = $(this), e = n.attr("data-area");
                null != e && "" != e || (e = '{"Code": 86,"Cn": "中国大陆","En": "China","Py": "ZHONG GUO DA LU","Country": "CN","Open": 1,"CountryId": "1","Heat": 100}'), n.selectCountryCode({
                    countryName: $.parseJSON(e).Cn,
                    countryCode: $.parseJSON(e).Code,
                    inputText: function (n) {
                        return n.cn + "(+" + n.code + ")"
                    },
                    onSelect: function (t) {
                        var e = Object();
                        for (var a in t) e[a.replace(/^\S/, function (n) {
                            return n.toUpperCase()
                        })] = t[a];
                        n.attr("data-area", JSON.stringify(e))
                    },
                    onBlur: function () {
                        t.trigger("blur")
                    }
                })
            })
        }, setScrollEvent: function () {
            function t() {
                e()
            }

            function e() {
                var t = jQuery(".cont_aside"), e = jQuery(".cont_main"), a = e.offset().top,
                    i = e.offset().left + e.width() + 20, o = jQuery(window).scrollTop(),
                    r = n("#J_DivRoomInfo .hinfo_img").height();
                o >= a + r ? (n("#J_DivRoomInfo .J_scrollFold").hide(), t.css({
                    position: "fixed",
                    left: i,
                    top: "-" + r + "px",
                    "z-index": "0"
                })) : (n("#J_DivRoomInfo .J_scrollFold").show(), t.css({position: "static"}))
            }

            jQuery(window).on("scroll", t), jQuery(window).on("resize", t)
        }, bindPlaceHolder: function () {
            n("input").bind("blur", function (t) {
                n(t.currentTarget).val() ? n(t.currentTarget).addClass("form_input_hasvalue") : n(t.currentTarget).removeClass("form_input_hasvalue")
            }), n(".form_input_label").bind("click", function (t) {
                n(t.target).prev()[0].focus()
            })
        }, triggerPlaceHolder: function (t) {
            (t ? t : n("input")).each(function (t, e) {
                n(e).val() ? n(e).addClass("form_input_hasvalue") : n(e).removeClass("form_input_hasvalue")
            })
        }, checkInput: function (t, e) {
            n(t).bind("blur", function (t) {
                if (e) {
                    var a = e(t.currentTarget, n(t.currentTarget).val());
                    a ? common.showError(t.currentTarget, a) : common.clearError(t.currentTarget), submit.validateinputerror()
                }
            })
        }, showError: function (t, e) {
            var a = n(t).parent();
            a.addClass("form_item_error");
            var i = a.find(".form_item_errorbox");
            i.length > 0 ? i.html("<div class='msg_error'><i class='icons-error12'></i>" + e + "</div>") : a.append(n("<div class='form_item_errorbox'><div class='msg_error'><i class='icons-error12'></i>" + e + "</div></div>"))
        }, clearError: function (t) {
            var e = n(t).parent();
            e.removeClass("form_item_error"), submit.validateinputerror()
        }, bindToggle: function (n, t, e) {
            var a = n.find("i");
            n.bind("click", function () {
                a.hasClass("icon_up") ? (a.removeClass("icon_up"), a.addClass("icon_down"), t && t.css("display", "none"), e && e(!1)) : (a.removeClass("icon_down"), a.addClass("icon_up"), t && t.css("display", ""), e && e(!0))
            })
        }, bindSuggestor: function (t, e, a, i, o) {
            var r = {foot: "", isNeedFilter: !0, isPage: !1, style: "", styleCss: ""}, s = {}, l = $.extend({}, r, o),
                d = l.isPage, c = 10, u = l.foot, f = n("<div class='J_pop'></div>");
            s.div = f, f.addClass("data_list"), d || (c = 100, f.addClass("scrolly")), f.css("width", "320px"), f.css("position", "absolute"), f.css("zIndex", "999"), f.css("display", "none");
            var m = function (n) {
                if (h = [], e) for (var t = 0; t < e.length; t++) (0 == l.isNeedFilter || n(e[t])) && h.push(e[t])
            };
            t.each(function (n, t) {
                var e = (new Date).getTime() + n++;
                $(t).attr("data-indexTimeStamp", e)
            });
            var p = function () {
                if (d) {
                    for (var t = n("<div></div>"), e = 0; e < h.length / c; e++) {
                        var a = n("<span><a>" + (e + 1) + "</a></span>");
                        a.attr("data-data", e), a.addClass("J_PageID"), a.addClass("J_PageID" + e), a.bind("mouseup", function (t) {
                            var e = n(t.currentTarget).attr("data-data");
                            f.find(".J_Page").hide(), f.find(".J_Page" + e).show(), f.find(".J_PageID").removeClass("J_currentPageID"), f.find(".J_PageID").addClass("J_notCurrentPageID"), f.find(".J_PageID" + e).addClass("J_currentPageID"), f.find(".J_PageID" + e).removeClass("J_notCurrentPageID"), v && (clearTimeout(v), n("[data-indexTimeStamp=" + b + "]").focus())
                        }), 0 == e ? a.addClass("J_currentPageID") : a.addClass("J_notCurrentPageID"), t.append(a)
                    }
                    f.append(t)
                }
            }, h = e, g = function () {
                if ("ul" == l.style && f.append("<ul></ul>"), l.styleCss) {
                    var e = l.styleCss, o = e.split(";");
                    o.length > 0 && o.forEach(function (n) {
                        if (n) {
                            var t = n.split(":");
                            2 == t.length && f.css(t[0], t[1])
                        }
                    })
                }
                for (var r = 0; r < h.length; r++) {
                    var s = n(a(h[r]));
                    s.attr("data-data", JSON.stringify(h[r])), s.addClass("J_Page" + parseInt(r / c)), s.addClass("J_Page"), r >= c && s.hide(), s.bind("mousedown", function (e) {
                        return i(t, JSON.parse(n(e.currentTarget).attr("data-data"))), t.trigger("blur"), common.triggerPlaceHolder(t), f.hide(), !1
                    }), "ul" == l.style ? f.find("ul").append(s) : f.append(s)
                }
            }, v = null, b = "";
            return t.bind("focus", function (t) {
                var e = n(this).attr("data-indexTimeStamp");
                if (e != b || "none" == f.css("display")) {
                    b = e, f.empty();
                    var a = n(t.target).offset();
                    f.css("top", a.top + 46 + "px"), f.css("left", a.left + "px");
                    var i = n(t.target).val();
                    m(function (n) {
                        return !i || new RegExp(i, "gi").test(n.name)
                    }), g(), u && f.append(n(u)), p(), h.length > 0 ? f.show() : f.hide(), v && clearTimeout(v)
                }
            }), t.bind("blur", function (n) {
                v = setTimeout(function () {
                    f.hide(), v = null
                }, 300)
            }), l.NoBindInput || t.bind("input", function (t) {
                var e = n(t.target).val();
                f.empty(), m(function (n) {
                    return !e || new RegExp(e, "gi").test(n.name)
                }), g(), u && f.append(n(u)), p(), h.length > 0 ? f.show() : f.hide(), v && clearTimeout(v)
            }), n(document.body).append(f), s
        }, showSpecilSuggestor: function (t, e, a, i) {
            var o = {};
            o.style = "", o.isNeedFilter = !1;
            var r = n("<div class='J_pop'></div>");
            r.addClass("data_list"), r.addClass("scrolly"), r.css("width", "320px"), r.css("position", "absolute"), r.css("zIndex", "999"), r.css("display", "none");
            var s = function (n) {
                if (l = [], e) for (var t = 0; t < e.length; t++) (0 == o.isNeedFilter || n(e[t])) && l.push(e[t])
            };
            t.each(function (n, t) {
                var e = (new Date).getTime() + n++;
                $(t).attr("data-indexTimeStamp", e)
            });
            var l = e, d = function () {
                "ul" == o.style && r.append("<ul></ul>");
                for (var e = 0; e < l.length; e++) {
                    var s = n(a(l[e]));
                    s.attr("data-data", JSON.stringify(l[e])), s.bind("mousedown", function (e) {
                        return i(t, JSON.parse(n(e.currentTarget).attr("data-data"))), t.trigger("blur"), common.triggerPlaceHolder(t), r.hide(), !1
                    }), "ul" == o.style ? r.find("ul").append(s) : r.append(s)
                }
            }, c = null, u = "";
            t.bind("blur", function (n) {
                console.log("2"), c = setTimeout(function () {
                    r.hide(), c = null
                }, 300)
            }), n(document.body).append(r);
            var f = n(this).attr("data-indexTimeStamp");
            if (f != u || "none" == r.css("display")) {
                u = f, r.empty();
                var m = t.offset();
                r.css("top", m.top + 46 + "px"), r.css("left", m.left + "px");
                var p = t.val();
                s(function (n) {
                    return !p || new RegExp(p, "gi").test(n.name)
                }), d(), r.show(), c && clearTimeout(c)
            }
        }, bindDateSuggestor: function (t, e, a, i, o) {
            var r = n("<div class='J_pop'></div>");
            r.addClass("data_list"), r.css("position", "absolute"), r.css("zIndex", "999");
            var s = function (s) {
                for (var l = 0; l < e.length; l += 7) {
                    for (var d = n("<tr></tr>"), c = n("<tr></tr>"), u = l; u < l + 7 && u < e.length; u++) {
                        var f = e[u], m = n("<th style='width:50px;'>" + a(f) + "</th>"),
                            p = n("<td style='width:50px;'>" + i(f) + "</td>");
                        m.attr("data-data", JSON.stringify(f)), m.bind("mousedown", function (e) {
                            o(t, JSON.parse(n(e.currentTarget).attr("data-data"))), t.trigger("blur"), common.triggerPlaceHolder(t), r.hide()
                        }), p.attr("data-data", JSON.stringify(f)), p.bind("mousedown", function (e) {
                            o(t, JSON.parse(n(e.currentTarget).attr("data-data"))), t.trigger("blur"), common.triggerPlaceHolder(t), r.hide()
                        }), d.append(p), c.append(m)
                    }
                    s.append(c), s.append(d)
                }
            }, l = null;
            t.bind("focus", function (t) {
                r.empty();
                var e = n("<table class='table_price'></table>"), a = n(t.target).offset();
                r.css("top", a.top + 46 + "px"), r.css("left", a.left + "px");
                n(t.target).val();
                s(e), r.append(e), r.show(), l && clearTimeout(l)
            }), t.bind("blur", function (n) {
                l = setTimeout(function () {
                    r.hide(), l = null
                }, 0)
            }), n(document.body).append(r)
        }, bindHover: function (n, t) {
            var e = "jmp_table";
            n.regMod("jmp", "1.1", {
                options: {
                    type: e,
                    template: "$" + e,
                    content: {txt: ""},
                    classNames: {boxType: e},
                    css: {maxWidth: "800"},
                    api: {
                        onShow: function (e) {
                            this.opt.options.content.txt = t(n, this.box)
                        }
                    },
                    position: "bottomRight-topRight"
                }
            })
        }, bindPop: function (t, e, a) {
            var i = {
                triggerEvents: ["click"], onShow: function () {
                }, onSubmit: function () {
                    return !0
                }, onClose: function () {
                }, onOK: function () {
                }, isCleanLastTriggerEvents: !1
            }, o = $.extend({}, i, a);
            o.triggerEvents.each(function (n) {
                o.isCleanLastTriggerEvents && t.unbind(n), t.bind(n, function () {
                    o.onShow(), $(e).mask()
                })
            }), t || $(e).mask(), n(e).find(".J_Close, .J_close").bind("click", function () {
                o.onClose(), $(e).unmask()
            }), n(e).find(".J_OK").bind("click", function () {
                $(e).unmask(), o.onOK()
            }), n(e).find(".J_Submit, .J_submit").bind("click", function () {
                $(e).unmask(), o.onSubmit()
            })
        }, showCommonPop: function (t, e, a, i, o) {
            var r = n("#J_CommonPop");
            r.find(".J_Head").text(t), r.find(".J_Desc").text(e), a && (r.find(".J_submit").css("display", ""), r.find(".J_submit").attr("value", a.name), a.callback ? (r.find(".J_submit").unbind("click"), r.find(".J_submit").bind("click", a.callback)) : r.find(".J_submit").bind("click", function () {
                $("#J_CommonPop").unmask()
            }), a.width && r.find(".J_submit").css("width", a.width)), r.find(".J_button2").css("display", "none"), i && (r.find(".J_button2").css("display", ""), r.find(".J_button2").attr("value", i.name), i.callback ? (r.find(".J_button2").unbind("click"), r.find(".J_button2").bind("click", i.callback)) : r.find(".J_button2").bind("click", function () {
                $("#J_CommonPop").unmask()
            }), i.width && r.find(".J_button2").css("width", i.width)), r.find(".J_Close, .J_close").unbind("click"), r.find(".J_Close, .J_close").bind("click", function () {
                o && o(), $("#J_CommonPop").unmask()
            }), $("#J_CommonPop").mask()
        }, showCommonPopSimple: function (t, e, a) {
            var i = n("#J_CommonPop");
            i.find(".J_Head").text(t), i.find(".J_Desc").text(e), i.find(".J_submit").css("display", ""), i.find(".J_submit").attr("value", "确定"), i.find(".J_button2").css("display", "none"), i.find(".J_submit").unbind("click"), i.find(".J_submit").bind("click", function () {
                a && a(!1), $("#J_CommonPop").unmask()
            }), i.find(".J_Close, .J_close").unbind("click"), i.find(".J_Close, .J_close").bind("click", function () {
                a && a(!0), $("#J_CommonPop").unmask()
            }), $("#J_CommonPop").mask()
        }, bindNumSelector: function (n, t, e) {
            e || (e = {}), (n.find(".number_input").length <= 0 || n.find(".number_reduce").length <= 0 || n.find(".number_plus").length <= 0) && n.html("<span class='number_reduce'><i class='icon_numreduce'></i></span><input type='text' " + (e.readonly ? "readonly='readonly'" : "") + " class='number_input'><span class='number_plus'><i class='icon_numplus'></i></span>");
            var a = {
                val: 0, max: 0, altMax: -1, min: 0, item: n, setMax: function (n) {
                    this.max = n, this.setValue(this.val), t(this.val)
                }, setAltMax: function (n) {
                    this.altMax = n, this.setValue(this.val), t(this.val)
                }, setValue: function (n) {
                    this.val = n, this.val < this.min && (this.val = this.min);
                    var e = this.max;
                    this.altMax >= 0 && this.altMax < e && (e = this.altMax), this.val > e && (this.val = e), this.item.find(".number_input").val(this.val), t(n), i()
                }, init: function (n) {
                    this.setValue(n), t(n)
                }
            }, i = function () {
                var n = a.max;
                a.altMax >= 0 && a.altMax < n && (n = a.altMax), a.val > a.min && a.item.find(".number_reduce").removeClass("number_disable"), a.val < n && a.item.find(".number_plus").removeClass("number_disable"), a.val <= a.min && a.item.find(".number_reduce").addClass("number_disable"), a.val >= n && a.item.find(".number_plus").addClass("number_disable")
            };
            return n.find(".number_input").bind("blur", function () {
                a.setValue(parseIntNull(a.item.find(".number_input").val())), t(a.val, !0)
            }), n.find(".number_reduce").bind("click", function () {
                a.val > a.min && (a.val--, a.item.find(".number_input").val(a.val), t(a.val, !0)), i()
            }), n.find(".number_plus").bind("click", function () {
                var n = a.max;
                a.altMax >= 0 && a.altMax < n && (n = a.altMax), a.val < n && (a.val++, a.item.find(".number_input").val(a.val), t(a.val, !0)), i()
            }), i(), a
        }, bindPulldown: function (t, e, a) {
            var i = {};
            return t.bind("click", function (n) {
                return t.hasClass("form_select_active") ? (i.hidePulldown(), !1) : (i.showPulldown(), a && a(), e.css("display", ""), e.show(), n.preventDefault(), void n.stopPropagation())
            }), i.hidePulldown = function (a) {
                if (a) try {
                    if (e[0] == a.target) return !1;
                    if (e.find(a.target).length > 0) return !1;
                    if (t[0] == a.target) return !1;
                    if (t.find(a.target).length > 0) return !1
                } catch (a) {
                }
                t.removeClass("form_select_active"), n("body").unbind("click", i.hidePulldown), e.css("display", "none"), e.hide()
            }, i.showPulldown = function () {
                t.addClass("form_select_active"), n("body").bind("click", i.hidePulldown)
            }, i
        }, callHotelAvail: function (n, t, e) {
            $.BizData.pageLoadTime = new Date;
            var a = function () {
                var a = function (n) {
                    n || (n = {message: "系统发生错误"}), t ? t(n.message) : (common.showCommonPop("错误", n.message, {name: "确定"}), common.showError())
                };
                $.BizData.pageParam.roomNumbers > 0 && $.ajax("Tool/AjaxHotelAvail.aspx", {
                    context: {
                        vsInitParam: $.BizData.vsInitParam,
                        vsCreateOrderParam: $.BizData.vsCreateOrderParam ? $.BizData.vsCreateOrderParam : "",
                        pageParam: JSON.stringify($.BizData.pageParam),
                        token: $.BizData.token ? $.BizData.token : ""
                    }, method: $.AJAX_METHOD_POST, async: !0, onsuccess: function (i) {
                        var o = !1, r = $.parseJSON(i.responseText);
                        if (r && 200 === r.code && r.data) {
                            var s = JSON.parse(r.data);
                            if (s && (n(s), o = !0, !e)) {
                                var l = $.BizData.bookinfo.MaxRoomCount, d = $.BizData.bookinfo.MinRoomCount,
                                    c = $.BizData.pageParam.roomNumbers;
                                c < d ? ($.BizData.pageParam.roomNumbers = d, common.callHotelAvail(n, t, !0)) : c > l ? ($.BizData.pageParam.roomNumbers = l, common.callHotelAvail(n, t, !0)) : ($.BizData.pageParam.CheckAvlID = s.CheckAvlID, $.BizData.pageParam.RoomRatesID = s.RoomRatesID, pageRefresh(s))
                            }
                        }
                        o || a(r)
                    }, onerror: function (n) {
                        a({message: "系统发生错误"})
                    }, onabort: function (n) {
                        a({message: "系统发生错误"})
                    }
                })
            };
            $.BizData.checktoken ? ($("#J_PopVerificationCode").mask(), $("#verification-code").css("display", ""), $.BizData.slidObj ? $.BizData.slidObj.refresh() : $.BizData.slidObj = new slidingVerification({
                id: "verification-code",
                appId: "110118",
                containerId: "slider-container",
                businessSite: "hotel_booking_online",
                width: "280px",
                height: "40px",
                textslider: !1,
                language: "zh-CN",
                select_language: "zh-CN",
                chooseOpt: {position: "fixed", width: "280px", height: "200px", type: "pop"},
                stateChange: function (n) {
                    0 == n ? "undefined" != typeof console && console.log("滑块显示 state:", n) : 1 == n ? "undefined" != typeof console && console.log("选字验证码弹框出现 state:", n) : 2 == n && "undefined" != typeof console && console.log("选字验证码弹框消失 state:", n)
                },
                onSelectFail: function () {
                    console.log("fail")
                },
                onSelectClose: function () {
                    console.log("fail")
                },
                resultHandler: function (n) {
                    console.log(n), console.log("token:", n.token, "e.checkState:", n.checkState, "e.version", n.version, "rid:", n.rid), $.BizData.token = n.token, console.log("http://ic.ctrip.uat.qa.nt.ctripcorp.com/captcha/verify_token?version=" + n.version + "&token=" + n.token + "&business_site=hotel_booking_online&appid=110118&clientip=10.32.104.16"), $("#J_PopVerificationCode").unmask(), a()
                }
            })) : a()
        }, callGetUserInfo: function (n, t) {
            $.ajax("Tool/AjaxGetUserInfo.aspx", {
                context: {},
                method: $.AJAX_METHOD_POST,
                async: !t,
                onsuccess: function (t) {
                    var e = $.parseJSON(t.responseText);
                    if (e && 200 === e.code && e.data) {
                        var a = JSON.parse(e.data);
                        a && (userInfoRefresh(a), n(a))
                    }
                },
                onerror: function (n) {
                },
                onabort: function (n) {
                }
            })
        }, each: function (n, t) {
            for (var e = 0; e < n.length; e++) {
                var a = n[e];
                t(e, a)
            }
        }, find: function (n, t) {
            for (var e = 0; e < n.length; e++) {
                var a = n[e];
                if (t(e, a)) return a
            }
        }, toggle: function (t, e) {
            if (t) {
                var a = e || [];
                switch ((t[0].tagName || EMPTY).toLowerCase()) {
                    case"i":
                        a.length || (a = ["icon_down", "icon_up"])
                }
                a.length ? 1 == a.length ? t.hasClass(a[0]) ? t.removeClass(a[0]) : t.addClass(a[0]) : 2 == a.length && (t.hasClass(a[0]) ? t.removeClass(a[0]).addClass(a[1]) : t.removeClass(a[1]).addClass(a[0])) : n(t).toggle()
            }
        }, getAgeByIdOrBirth: function (n) {
            var t, e, a;
            if ($.BizData.RegEx.rIDCard.test(n)) t = parseInt(n.substring(6, 10)), e = parseInt(n.substring(10, 12)), a = parseInt(n.substring(12, 14)); else {
                if (!$.BizData.RegEx.rBirthday.test(n)) return -1;
                var i = n.split("-");
                t = i[0], e = i[1], a = i[2]
            }
            var o, r = new Date, s = r.getFullYear(), l = r.getMonth() + 1, d = r.getDate(), c = s - t;
            if (c >= 0) if (l == e) {
                var u = d - a;
                o = u < 0 ? c - 1 : c
            } else {
                var f = l - e;
                o = f < 0 ? c - 1 : c
            } else o = -1;
            return o
        }, parseTimeSpan: function (n) {
            var t = "";
            return n && (0 === n.indexOf("0.") && (n = n.substring(2)), 0 === n.indexOf("1.") && (t += "次日", n = n.substring(2)), t += n.substring(0, 5)), t
        }
    }, common = new Common
}(), function (n) {
    var t = "yyyy-MM-dd";
    window.standardTimeString = function (n) {
        return !("string" == typeof n) && (n = new Date(n).toFormatString(t)), n.replace(/\-/g, "/")
    }, window.getDateDiff = function (n, t) {
        return Math.floor((t.getTime() - n.getTime()) / 864e5)
    }
}(cQuery), function (n, t) {
    function e() {
    }

    e.prototype = {
        parentObj: null, childObjs: null, names: null, bindChild: function (n, t) {
            this.childObjs[n] = t, this.names.push(n)
        }, showChild: function (n) {
            this.childObjs[n] && (this.childObjs[n].removeClass("hidden"), this.parentObj.removeClass("hidden"))
        }, hideChild: function (n) {
            if (this.childObjs[n]) {
                this.childObjs[n].addClass("hidden");
                for (var t = !0, e = 0; e < this.names.length; e++) this.childObjs[this.names[e]].hasClass("hidden") || (t = !1);
                t && this.parentObj.addClass("hidden")
            }
        }
    }, t.BizMod || (t.BizMod = {}), t.BizMod.InitDisplayPackage = function (n) {
        var t = new e;
        return t.parentObj = n, t.childObjs = new Object, t.names = new Array, t
    }
}(window, cQuery), function (n) {
    function t(t, e) {
        if (!t) return !1;
        var a = "validateCount", i = n(t).data(a);
        i ? n(t).data(a, i + 1) : n(t).data(a, 1), window.__bfi.push(["_trackUserBlock", {
            dom: t.id && "id:" + t.id || t.name && "name:" + t.name || EMPTY,
            value: t.value || EMPTY,
            type: (t.tagName ? "dom:" + t.tagName.toLowerCase() : EMPTY) + (t.type ? ":" + t.type : EMPTY),
            form: t.form ? t.form.id && "id:" + t.form.id || t.form.name && "name:" + t.form.name : EMPTY,
            message: e || EMPTY,
            count: n(t).data(a)
        }])
    }

    n.BizMod || (n.BizMod = {}), window.__bfi = window.__bfi || [];
    var e = {
        ubt_userblock_post: t, baseTrack: function (t, e, a) {
            var i = "string" == n.type(e) ? e : n.stringifyJSON(e);
            window.__bfi.push(["_tracklog", t, i])
        }, tplTrack: function (t, a, i, o) {
            var r = e;
            return r.baseTrack(t, n.tmpl.render(a, i), o), r
        }
    };
    n.BizMod.TrackHelper = e
}(cQuery);
var tracking = {
    submitOrderTracking: function (n) {
        var t = $.BizData;
        $.BizMod.TrackHelper.baseTrack("htl_mj_save", {
            hotelid: t.initParam.hotel,
            roomid: t.pageParam.roomID,
            basicroomid: t.tracklog.basicroomid,
            checkin: t.pageParam.arrival,
            checkout: t.pageParam.departure,
            orderid: n,
            enforce_show: t.tracklog.IsFilterStatus ? "T" : "F"
        })
    }
};

function getAreaInfo(n, e) {
    if (n && n.length) return n;
    e || (e = "86");
    for (var o, t = $.countryCodeList, C = 0; C < t.length; C++) if (e == t[C].Code) {
        o = t[C];
        break
    }
    return o
}

$.countryCodeList = [{
    Code: 86,
    Cn: "中国大陆",
    En: "China",
    Py: "ZHONG GUO DA LU",
    Country: "Cn",
    Open: 1,
    countryId: "1",
    Heat: 100
}, {
    Code: 852,
    Cn: "中国香港",
    En: "Hong Kong",
    Py: "ZHONG GUO XIANG GANG",
    Country: "HK",
    Open: 1,
    ProvinceId: "32",
    Heat: 99
}, {
    Code: 853,
    Cn: "中国澳门",
    En: "Macao",
    Py: "ZHONG GUO AO MEN",
    Country: "MO",
    Open: 1,
    ProvinceId: "33",
    Heat: 98
}, {
    Code: 886,
    Cn: "中国台湾",
    En: "Taiwan",
    Py: "ZHONG GUO TAI WAN",
    Country: "TW",
    Open: 1,
    ProvinceId: "53",
    Heat: 97
}, {Code: 1, Cn: "加拿大", En: "Canada", Py: "JIA NA DA", Country: "CA", Open: 1, countryId: "47", Heat: 96}, {
    Code: 1,
    Cn: "美国",
    En: "United States",
    Py: "MEI GUO",
    Country: "US",
    Open: 1,
    countryId: "66",
    Heat: 96
}, {Code: 7, Cn: "俄罗斯", En: "Russia", Py: "E LUO SI", Country: "RU", Open: 1, countryId: "30", Heat: 94}, {
    Code: 33,
    Cn: "法国",
    En: "France",
    Py: "FA GUO",
    Country: "FR",
    Open: 1,
    countryId: "31",
    Heat: 93
}, {Code: 39, Cn: "意大利", En: "Italy", Py: "YI DA LI ", Country: "IT", Open: 1, countryId: "106", Heat: 92}, {
    Code: 44,
    Cn: "英国",
    En: "United Kingdom",
    Py: "YING GUO",
    Country: "GB",
    Open: 1,
    countryId: "109",
    Heat: 91
}, {Code: 49, Cn: "德国", En: "Germany", Py: "DE GUO", Country: "DE", Open: 1, countryId: "28", Heat: 90}, {
    Code: 60,
    Cn: "马来西亚",
    En: "Malaysia",
    Py: "MA LAI XI YA",
    Country: "MY",
    Open: 1,
    countryId: "2",
    Heat: 89
}, {
    Code: 61,
    Cn: "澳大利亚",
    En: "Australia",
    Py: "AO DA LI YA",
    Country: "AU",
    Open: 1,
    countryId: "15",
    Heat: 88
}, {
    Code: 62,
    Cn: "印度尼西亚",
    En: "Indonesia",
    Py: "YIN DU NI XI YA",
    Country: "ID",
    Open: 1,
    countryId: "108",
    Heat: 87
}, {
    Code: 63,
    Cn: "菲律宾",
    En: "Philippines",
    Py: "FEI LV BIN",
    Country: "PH",
    Open: 1,
    countryId: "32",
    Heat: 86
}, {
    Code: 64,
    Cn: "新西兰",
    En: "New Zealand",
    Py: "XIN XI LAN",
    Country: "NZ",
    Open: 1,
    countryId: "98",
    Heat: 85
}, {
    Code: 65,
    Cn: "新加坡",
    En: "Singapore",
    Py: "XIN JIA PO",
    Country: "SG",
    Open: 1,
    countryId: "3",
    Heat: 84
}, {Code: 66, Cn: "泰国", En: "Thailand", Py: "TAI GUO", Country: "TH", Open: 1, countryId: "4", Heat: 83}, {
    Code: 81,
    Cn: "日本",
    En: "Japan",
    Py: "RI BEN",
    Country: "JP",
    Open: 1,
    countryId: "78",
    Heat: 82
}, {Code: 82, Cn: "韩国", En: "South Korea", Py: "HAN GUO", Country: "KR", Open: 1, countryId: "42", Heat: 81}, {
    Code: 84,
    Cn: "越南",
    En: "Viet Nam",
    Py: "YUE NAN",
    Country: "VN",
    Open: 1,
    countryId: "111",
    Heat: 80
}, {Code: 91, Cn: "印度", En: "India", Py: "YIN DU", Country: "IN", Open: 1, countryId: "107", Heat: 79}, {
    Code: 855,
    Cn: "柬埔寨",
    En: "Cambodia",
    Py: "JIAN PU ZHAI",
    Country: "KH",
    Open: 1,
    countryId: "50",
    Heat: 78
}, {
    Code: 355,
    Cn: "阿尔巴尼亚",
    En: "Albania",
    Py: "A ER BA NI YA",
    Country: "AL",
    Open: 0,
    countryId: "5",
    Heat: 0
}, {
    Code: 213,
    Cn: "阿尔及利亚",
    En: "Algeria",
    Py: "A ER JI LI YA",
    Country: "DZ",
    Open: 0,
    countryId: "6",
    Heat: 0
}, {Code: 93, Cn: "阿富汗", En: "Afghanistan", Py: "A FU HAN", Country: "AF", Open: 0, countryId: "7", Heat: 0}, {
    Code: 54,
    Cn: "阿根廷",
    En: "Argentina",
    Py: "A GEN TING",
    Country: "AR",
    Open: 0,
    countryId: "8",
    Heat: 0
}, {
    Code: 971,
    Cn: "阿联酋",
    En: "United Arab Emirates",
    Py: "A LA BO LIAN HE QIU ZHANG GUO",
    Country: "AE",
    Open: 1,
    countryId: "9",
    Heat: 0
}, {
    Code: 297,
    Cn: "阿鲁巴",
    En: "Aruba",
    Py: "A LU BA DAO",
    Country: "AW",
    Open: 0,
    countryId: "171",
    Heat: 0
}, {Code: 968, Cn: "阿曼", En: "Oman", Py: "A MAN", Country: "OM", Open: 0, countryId: "150", Heat: 0}, {
    Code: 994,
    Cn: "阿塞拜疆",
    En: "Azerbaijan",
    Py: "A SAI BAI JIANG",
    Country: "AZ",
    Open: 0,
    countryId: "145",
    Heat: 0
}, {Code: 247, Cn: "阿森松", En: "Ascension", Py: "A SEN SONG", Country: "", Open: 0, Heat: 0}, {
    Code: 20,
    Cn: "埃及",
    En: "Egypt",
    Py: "AI JI",
    Country: "EG",
    Open: 0,
    countryId: "10",
    Heat: 0
}, {
    Code: 251,
    Cn: "埃塞俄比亚",
    En: "Ethiopia",
    Py: "AI SAI E BI YA",
    Country: "ET",
    Open: 0,
    countryId: "11",
    Heat: 0
}, {Code: 353, Cn: "爱尔兰", En: "Ireland", Py: "AI ER LAN", Country: "IE", Open: 1, countryId: "12", Heat: 0}, {
    Code: 372,
    Cn: "爱沙尼亚",
    En: "Estonia",
    Py: "AI SHA NI YA",
    Country: "EE",
    Open: 0,
    countryId: "166",
    Heat: 0
}, {
    Code: 376,
    Cn: "安道尔",
    En: "Andorra",
    Py: "AN DAO ER GONG HE GUO",
    Country: "AD",
    Open: 0,
    countryId: "200",
    Heat: 0
}, {Code: 244, Cn: "安哥拉", En: "Angola", Py: "AN GE LA", Country: "AO", Open: 0, countryId: "13", Heat: 0}, {
    Code: 1264,
    Cn: "安圭拉",
    En: "Anguilla",
    Py: "AN GUI LA DAO",
    Country: "AI",
    Open: 0,
    countryId: "275",
    Heat: 0
}, {
    Code: 1268,
    Cn: "安提瓜和巴布达",
    En: "Antigua and barbuda",
    Py: "AN TI GUA HE BA BU DA",
    Country: "AG",
    Open: 0,
    countryId: "201",
    Heat: 0
}, {Code: 43, Cn: "奥地利", En: "Austria", Py: "AO DI LI", Country: "AT", Open: 1, countryId: "14", Heat: 0}, {
    Code: 1246,
    Cn: "巴巴多斯",
    En: "Barbados",
    Py: "BA BA DUO SI",
    Country: "BB",
    Open: 0,
    countryId: "202",
    Heat: 0
}, {
    Code: 675,
    Cn: "巴布亚新几内亚",
    En: "Papua New Guinea",
    Py: "BA BU YA XIN JI NEI YA",
    Country: "PG",
    Open: 0,
    countryId: "153",
    Heat: 0
}, {
    Code: 1242,
    Cn: "巴哈马",
    En: "Bahamas",
    Py: "BA  HA MA",
    Country: "BS",
    Open: 0,
    countryId: "185",
    Heat: 0
}, {
    Code: 92,
    Cn: "巴基斯坦",
    En: "Pakistan",
    Py: "BA JI SI TAN",
    Country: "PK",
    Open: 0,
    countryId: "17",
    Heat: 0
}, {
    Code: 595,
    Cn: "巴拉圭",
    En: "Paraguay",
    Py: "BA LA GUI",
    Country: "Py",
    Open: 0,
    countryId: "147",
    Heat: 0
}, {
    Code: 970,
    Cn: "巴勒斯坦",
    En: "Palestine",
    Py: "BA LE SI TAN",
    Country: "PS",
    Open: 0,
    countryId: "205",
    Heat: 0
}, {Code: 973, Cn: "巴林", En: "Bahrain", Py: "BA LIN", Country: "BH", Open: 0, countryId: "118", Heat: 0}, {
    Code: 507,
    Cn: "巴拿马",
    En: "Panama",
    Py: "BA NA MA",
    Country: "PA",
    Open: 0,
    countryId: "18",
    Heat: 0
}, {Code: 55, Cn: "巴西", En: "Brazil", Py: "BA XI", Country: "BR", Open: 0, countryId: "19", Heat: 0}, {
    Code: 375,
    Cn: "白俄罗斯",
    En: "Belarus",
    Py: "BAI E LUO SI",
    Country: "BY",
    Open: 0,
    countryId: "151",
    Heat: 0
}, {
    Code: 1441,
    Cn: "百慕大",
    En: "Bermuda",
    Py: "BAI MU DA QUN DAO",
    Country: "BM",
    Open: 0,
    countryId: "207",
    Heat: 0
}, {
    Code: 359,
    Cn: "保加利亚",
    En: "Bulgaria",
    Py: "BAO JIA LI YA",
    Country: "BG",
    Open: 0,
    countryId: "20",
    Heat: 0
}, {Code: 229, Cn: "贝宁", En: "Benin", Py: "BEI NING", Country: "BJ", Open: 0, countryId: "178", Heat: 0}, {
    Code: 32,
    Cn: "比利时",
    En: "Belgium",
    Py: "BI LI SHI",
    Country: "BE",
    Open: 1,
    countryId: "21",
    Heat: 0
}, {Code: 354, Cn: "冰岛", En: "Iceland", Py: "BING DAO ", Country: "IS", Open: 0, countryId: "22", Heat: 0}, {
    Code: 1787,
    Cn: "波多黎各",
    En: "Puerto Rico",
    Py: "BO DUO LI GE",
    Country: "PR",
    Open: 0,
    countryId: "208",
    Heat: 0
}, {Code: 48, Cn: "波兰", En: "Poland", Py: "BO LAN", Country: "PL", Open: 0, countryId: "23", Heat: 0}, {
    Code: 387,
    Cn: "波斯尼亚和黑塞哥维那",
    En: "Bosnia and Herzegovina",
    Py: "BO SI NI YA HE HEI SAI GE WEI NA",
    Country: "BA",
    Open: 0,
    Heat: 0
}, {
    Code: 591,
    Cn: "玻利维亚",
    En: "Bolivia",
    Py: "BO LI WEI YA",
    Country: "BO",
    Open: 0,
    countryId: "24",
    Heat: 0
}, {Code: 501, Cn: "伯利兹", En: "Belize", Py: "BO LI ZI", Country: "BZ", Open: 0, countryId: "210", Heat: 0}, {
    Code: 267,
    Cn: "博茨瓦纳",
    En: "Botswana",
    Py: "BO CI WA NA",
    Country: "BW",
    Open: 0,
    countryId: "152",
    Heat: 0
}, {Code: 975, Cn: "不丹", En: "Bhutan", Py: "BU DAN", Country: "BT", Open: 0, countryId: "212", Heat: 0}, {
    Code: 226,
    Cn: "布基纳法索",
    En: "Burkina Faso",
    Py: "BU JI NA FA SUO",
    Country: "BF",
    Open: 0,
    countryId: "213",
    Heat: 0
}, {
    Code: 257,
    Cn: "布隆迪",
    En: "Burundi",
    Py: "BU LONG DI",
    Country: "BI",
    Open: 0,
    countryId: "25",
    Heat: 0
}, {
    Code: 850,
    Cn: "朝鲜",
    En: "Korea, Democratic Pe",
    Py: "CHAO XIAN",
    Country: "KP",
    Open: 0,
    countryId: "26",
    Heat: 0
}, {
    Code: 240,
    Cn: "赤道几内亚",
    En: "Equatorial Guinea",
    Py: "CHI DAO JI NEI YA",
    Country: "GQ",
    Open: 0,
    countryId: "214",
    Heat: 0
}, {Code: 45, Cn: "丹麦", En: "Denmark", Py: "DAN MAI", Country: "DK", Open: 1, countryId: "27", Heat: 0}, {
    Code: 670,
    Cn: "东帝汶",
    En: "East Timor",
    Py: "DONG DI WEN",
    Country: "TL",
    Open: 0,
    countryId: "215",
    Heat: 0
}, {Code: 684, Cn: "东萨摩亚(美)", En: "Samoa Eastern", Py: "DONG SA MO YA", Country: "", Open: 0, Heat: 0}, {
    Code: 228,
    Cn: "多哥",
    En: "Togo",
    Py: "DUO GE",
    Country: "TG",
    Open: 0,
    countryId: "216",
    Heat: 0
}, {
    Code: 1809,
    Cn: "多米尼加共和国",
    En: "Dominican Republic",
    Py: "DUO MI NI JIA GONG HE GUO",
    Country: "DO",
    Open: 0,
    countryId: "276",
    Heat: 0
}, {
    Code: 593,
    Cn: "厄瓜多尔",
    En: "Ecuador",
    Py: "E GUA DUO ER",
    Country: "EC",
    Open: 0,
    countryId: "155",
    Heat: 0
}, {
    Code: 291,
    Cn: "厄立特里亚",
    En: "Eritrea",
    Py: "E LI TE LI YA",
    Country: "ER",
    Open: 0,
    countryId: "184",
    Heat: 0
}, {
    Code: 298,
    Cn: "法罗群岛",
    En: "Faroe Islands",
    Py: "FA LUO QUN DAO",
    Country: "FO",
    Open: 0,
    countryId: "283",
    Heat: 0
}, {
    Code: 689,
    Cn: "法属波利尼西亚",
    En: "French Polynesia",
    Py: "FA SHU BO LI NI XI YA",
    Country: "PF",
    Open: 0,
    countryId: "264",
    Heat: 0
}, {Code: 594, Cn: "法属圭亚那", En: "French Guiana", Py: "FA SHU GUI YA NA", Country: "GF", Open: 0, Heat: 0}, {
    Code: 379,
    Cn: "梵蒂冈",
    En: "Vatican",
    Py: "FAN DI GANG",
    Country: "VA",
    Open: 0,
    countryId: "167",
    Heat: 0
}, {Code: 679, Cn: "斐济", En: "Fiji", Py: "FEI JI", Country: "FJ", Open: 0, countryId: "33", Heat: 0}, {
    Code: 358,
    Cn: "芬兰",
    En: "Finland",
    Py: "FEN LAN",
    Country: "FI",
    Open: 0,
    countryId: "34",
    Heat: 0
}, {
    Code: 238,
    Cn: "佛得角",
    En: "Cape Verde",
    Py: "FU DE JIAO",
    Country: "CV",
    Open: 0,
    countryId: "219",
    Heat: 0
}, {
    Code: 500,
    Cn: "福克兰群岛",
    En: "Falkland Islands",
    Py: "FU LAN KE QUN DAO",
    Country: "FK",
    Open: 0,
    countryId: "277",
    Heat: 0
}, {Code: 220, Cn: "冈比亚", En: "Gambia", Py: "GANG BI YA", Country: "GM", Open: 0, countryId: "35", Heat: 0}, {
    Code: 242,
    Cn: "刚果共和国",
    En: "Congo",
    Py: "GANG GUO",
    Country: "CG",
    Open: 0,
    countryId: "271",
    Heat: 0
}, {
    Code: 57,
    Cn: "哥伦比亚",
    En: "Colombia",
    Py: "GE LUN BI YA",
    Country: "CO",
    Open: 0,
    countryId: "37",
    Heat: 0
}, {
    Code: 506,
    Cn: "哥斯达黎加",
    En: "Costa Rica",
    Py: "GE SI DA LI JIA",
    Country: "CR",
    Open: 0,
    countryId: "38",
    Heat: 0
}, {
    Code: 1473,
    Cn: "格林纳达",
    En: "Grenada",
    Py: "GE LIN NA DA",
    Country: "GD",
    Open: 0,
    countryId: "220",
    Heat: 0
}, {
    Code: 299,
    Cn: "格陵兰",
    En: "Greenland",
    Py: "GE LIN LAN DAO",
    Country: "GL",
    Open: 0,
    countryId: "268",
    Heat: 0
}, {
    Code: 995,
    Cn: "格鲁吉亚",
    En: "Georgia",
    Py: "GE LU JI YA ",
    Country: "GE",
    Open: 0,
    countryId: "180",
    Heat: 0
}, {Code: 53, Cn: "古巴", En: "Cuba", Py: "GU BA", Country: "CU", Open: 0, countryId: "39", Heat: 0}, {
    Code: 1671,
    Cn: "关岛",
    En: "Guam",
    Py: "GUAN DAO",
    Country: "GU",
    Open: 0,
    countryId: "192",
    Heat: 0
}, {Code: 592, Cn: "圭亚那", En: "Guyana", Py: "GUI YA NA ", Country: "GY", Open: 0, countryId: "40", Heat: 0}, {
    Code: 7,
    Cn: "哈萨克斯坦",
    En: "Kazakhstan",
    Py: "HA SA KE SI TAN",
    Country: "KZ",
    Open: 1,
    countryId: "176",
    Heat: 94
}, {Code: 509, Cn: "海地", En: "Haiti", Py: "HAI DI", Country: "HT", Open: 0, countryId: "41", Heat: 0}, {
    Code: 31,
    Cn: "荷兰",
    En: "Netherlands",
    Py: "HE LAN",
    Country: "NL",
    Open: 1,
    countryId: "43",
    Heat: 0
}, {
    Code: 599,
    Cn: "荷属安第列斯",
    En: "Netherlands Antilles",
    Py: "HE SHU AN DE LIE SI",
    Country: "",
    Open: 0,
    countryId: "259",
    Heat: 0
}, {
    Code: 382,
    Cn: "黑山",
    En: "Montenegro",
    Py: "HEI SHAN GONG HE GUO",
    Country: "ME",
    Open: 0,
    countryId: "257",
    Heat: 0
}, {
    Code: 504,
    Cn: "洪都拉斯",
    En: "Honduras",
    Py: "HONG DU LA SI",
    Country: "HN",
    Open: 0,
    countryId: "44",
    Heat: 0
}, {
    Code: 686,
    Cn: "基里巴斯",
    En: "Kiribati",
    Py: "JI LI BA SI",
    Country: "KI",
    Open: 0,
    countryId: "221",
    Heat: 0
}, {Code: 253, Cn: "吉布提", En: "Djibouti", Py: "JI BU TI", Country: "DJ", Open: 0, countryId: "45", Heat: 0}, {
    Code: 996,
    Cn: "吉尔吉斯斯坦",
    En: "Kirgizstan",
    Py: "JI ER JI SI SI TAN",
    Country: "KG",
    Open: 0,
    countryId: "143",
    Heat: 0
}, {Code: 224, Cn: "几内亚", En: "Guinea", Py: "JI NEI YA", Country: "GN", Open: 0, countryId: "46", Heat: 0}, {
    Code: 245,
    Cn: "几内亚比绍",
    En: "Guinea-bissau",
    Py: "JI NEI YA BI SHAO",
    Country: "GW",
    Open: 0,
    countryId: "222",
    Heat: 0
}, {Code: 233, Cn: "加纳", En: "Ghana", Py: "JIA  NA ", Country: "GH", Open: 0, countryId: "48", Heat: 0}, {
    Code: 241,
    Cn: "加蓬",
    En: "Gabon",
    Py: "JIA PENG",
    Country: "GA",
    Open: 0,
    countryId: "49",
    Heat: 0
}, {Code: 420, Cn: "捷克", En: "Czech", Py: "JIE KE", Country: "CZ", Open: 1, countryId: "162", Heat: 0}, {
    Code: 263,
    Cn: "津巴布韦",
    En: "Zimbabwe",
    Py: "JIN BA BU WEI",
    Country: "ZW",
    Open: 0,
    countryId: "51",
    Heat: 0
}, {
    Code: 237,
    Cn: "喀麦隆",
    En: "Cameroon",
    Py: "KA MAI LONG",
    Country: "CM",
    Open: 0,
    countryId: "52",
    Heat: 0
}, {Code: 974, Cn: "卡塔尔", En: "Qatar", Py: "KA TA ER", Country: "QA", Open: 0, countryId: "163", Heat: 0}, {
    Code: 1345,
    Cn: "开曼群岛",
    En: "Cayman Islands",
    Py: "KAI MAN QUN DAO",
    Country: "KY",
    Open: 0,
    countryId: "223",
    Heat: 0
}, {
    Code: 269,
    Cn: "科摩罗",
    En: "Comoros",
    Py: "KE MO LUO",
    Country: "KM",
    Open: 0,
    countryId: "224",
    Heat: 0
}, {Code: 383, Cn: "科索沃", En: "Kosovo", Py: "KE SUO WO", Country: "YK", Open: 0, countryId: "293", Heat: 0}, {
    Code: 225,
    Cn: "科特迪瓦",
    En: "Coted Ivoire",
    Py: "KE TE DI WA",
    Country: "CI",
    Open: 0,
    countryId: "179",
    Heat: 0
}, {Code: 965, Cn: "科威特", En: "Kuwait", Py: "KE WEI TE", Country: "KW", Open: 0, countryId: "53", Heat: 0}, {
    Code: 385,
    Cn: "克罗地亚",
    En: "Croatia",
    Py: "KE LUO DI YA",
    Country: "HR",
    Open: 0,
    countryId: "164",
    Heat: 0
}, {Code: 254, Cn: "肯尼亚", En: "Kenya", Py: "KEN NI YA", Country: "KE", Open: 0, countryId: "54", Heat: 0}, {
    Code: 682,
    Cn: "库克群岛",
    En: "Cook Islands",
    Py: "KU KE QUN DAO",
    Country: "CK",
    Open: 0,
    countryId: "191",
    Heat: 0
}, {
    Code: 371,
    Cn: "拉脱维亚",
    En: "Latvia",
    Py: "LA TUO WEI YA",
    Country: "LV",
    Open: 0,
    countryId: "225",
    Heat: 0
}, {
    Code: 266,
    Cn: "莱索托",
    En: "Lesotho",
    Py: "LAI SUO TUO",
    Country: "LS",
    Open: 0,
    countryId: "187",
    Heat: 0
}, {Code: 856, Cn: "老挝", En: "Lao", Py: "LAO WO", Country: "LA", Open: 0, countryId: "55", Heat: 0}, {
    Code: 961,
    Cn: "黎巴嫩",
    En: "Lebanon",
    Py: "LI MA NEN",
    Country: "LB",
    Open: 0,
    countryId: "56",
    Heat: 0
}, {
    Code: 370,
    Cn: "立陶宛",
    En: "Lithuania",
    Py: "LI TAO WAN",
    Country: "LT",
    Open: 0,
    countryId: "57",
    Heat: 0
}, {
    Code: 231,
    Cn: "利比里亚",
    En: "Liberia",
    Py: "LI BI LI YA",
    Country: "LR",
    Open: 0,
    countryId: "59",
    Heat: 0
}, {Code: 218, Cn: "利比亚", En: "Libya", Py: "LI BI YA", Country: "LY", Open: 0, countryId: "60", Heat: 0}, {
    Code: 423,
    Cn: "列支敦士登",
    En: "Liechtenstein",
    Py: "LIE ZHI DUN SHI DENG",
    Country: "LI",
    Open: 0,
    countryId: "226",
    Heat: 0
}, {
    Code: 262,
    Cn: "留尼汪（法属）",
    En: "Reunion",
    Py: "NI LIU WANG",
    Country: "RE",
    Open: 0,
    countryId: "269",
    Heat: 0
}, {
    Code: 352,
    Cn: "卢森堡",
    En: "Luxembourg",
    Py: "LU SEN BAO",
    Country: "LU",
    Open: 0,
    countryId: "61",
    Heat: 0
}, {Code: 250, Cn: "卢旺达", En: "Rwanda", Py: "LU WANG DA", Country: "RW", Open: 0, countryId: "62", Heat: 0}, {
    Code: 40,
    Cn: "罗马尼亚",
    En: "Romania",
    Py: "LUO MA NI YA",
    Country: "RO",
    Open: 0,
    countryId: "63",
    Heat: 0
}, {
    Code: 261,
    Cn: "马达加斯加",
    En: "Madagascar",
    Py: "MA DA JIA SI JIA",
    Country: "MG",
    Open: 0,
    countryId: "227",
    Heat: 0
}, {
    Code: 960,
    Cn: "马尔代夫",
    En: "Maldives",
    Py: "MA ER DAI FU",
    Country: "MV",
    Open: 0,
    countryId: "146",
    Heat: 0
}, {Code: 356, Cn: "马耳他", En: "Malta", Py: "MA ER TA", Country: "MT", Open: 0, countryId: "161", Heat: 0}, {
    Code: 265,
    Cn: "马拉维",
    En: "Malawi",
    Py: "MA LA WEI",
    Country: "MW",
    Open: 0,
    countryId: "186",
    Heat: 0
}, {Code: 223, Cn: "马里", En: "Mali", Py: "MA LI", Country: "ML", Open: 0, countryId: "228", Heat: 0}, {
    Code: 1670,
    Cn: "马里亚那群岛",
    En: "Mariana Is",
    Py: "MA LI YA NA QUN DAO",
    Country: "MP",
    Open: 0,
    Heat: 0
}, {
    Code: 389,
    Cn: "马其顿共和国",
    En: "Macedonia",
    Py: "MA QI DUN GONG HE GUO",
    Country: "MK",
    Open: 0,
    countryId: "197",
    Heat: 0
}, {
    Code: 692,
    Cn: "马绍尔群岛",
    En: "Marshall Islands",
    Py: "MA SHAO ER QUN DAO",
    Country: "MH",
    Open: 0,
    countryId: "229",
    Heat: 0
}, {
    Code: 596,
    Cn: "马提尼克",
    En: "Martinique",
    Py: "MA TI NI KE",
    Country: "MQ",
    Open: 0,
    countryId: "279",
    Heat: 0
}, {
    Code: 262,
    Cn: "马约特",
    En: "Mayotte",
    Py: "MA YUE TE DAO",
    Country: "YT",
    Open: 0,
    countryId: "270",
    Heat: 0
}, {
    Code: 230,
    Cn: "毛里求斯",
    En: "Mauritius",
    Py: "MAO LI QIU SI",
    Country: "MU",
    Open: 0,
    countryId: "64",
    Heat: 0
}, {
    Code: 222,
    Cn: "毛里塔尼亚",
    En: "Mauritania",
    Py: "MAO LI TA NI YA",
    Country: "MR",
    Open: 0,
    countryId: "65",
    Heat: 0
}, {Code: 976, Cn: "蒙古", En: "Mongolia", Py: "MENG GU", Country: "MN", Open: 0, countryId: "67", Heat: 0}, {
    Code: 1664,
    Cn: "蒙特塞拉特岛",
    En: "Montserrat Is",
    Py: "MENG TE SAI LA TE DAO",
    Country: "MS",
    Open: 0,
    Heat: 0
}, {
    Code: 880,
    Cn: "孟加拉国",
    En: "Bangladesh",
    Py: "MENG JIA LA GUO",
    Country: "BD",
    Open: 0,
    countryId: "68",
    Heat: 0
}, {Code: 51, Cn: "秘鲁", En: "Peru", Py: "MI LU", Country: "PE", Open: 0, countryId: "69", Heat: 0}, {
    Code: 691,
    Cn: "密克罗尼西亚",
    En: "Micronesia",
    Py: "MI KE LUO NI XI YA",
    Country: "FM",
    Open: 0,
    countryId: "230",
    Heat: 0
}, {Code: 95, Cn: "缅甸", En: "Myanmar", Py: "MIAN DIAN", Country: "MM", Open: 0, countryId: "70", Heat: 0}, {
    Code: 373,
    Cn: "摩尔多瓦",
    En: "Moldova",
    Py: "MO ER DUO WA",
    Country: "MD",
    Open: 0,
    countryId: "182",
    Heat: 0
}, {Code: 212, Cn: "摩洛哥", En: "Morocco", Py: "MO LUO GE", Country: "MA", Open: 0, countryId: "71", Heat: 0}, {
    Code: 377,
    Cn: "摩纳哥",
    En: "Monaco",
    Py: "MO NA GE",
    Country: "MC",
    Open: 0,
    countryId: "231",
    Heat: 0
}, {
    Code: 258,
    Cn: "莫桑比克",
    En: "Mozambique",
    Py: "MO SANG BI KE",
    Country: "MZ",
    Open: 0,
    countryId: "157",
    Heat: 0
}, {Code: 52, Cn: "墨西哥", En: "Mexico", Py: "MO XI GE", Country: "MX", Open: 0, countryId: "72", Heat: 0}, {
    Code: 264,
    Cn: "纳米比亚",
    En: "Namibia",
    Py: "NA MI BI YA",
    Country: "NA",
    Open: 0,
    countryId: "159",
    Heat: 0
}, {
    Code: 27,
    Cn: "南非",
    En: "South Africa",
    Py: "NAN FEI",
    Country: "ZA",
    Open: 1,
    countryId: "73",
    Heat: 0
}, {
    Code: 672,
    Cn: "南极",
    En: "South Pole",
    Py: "NAN JI ZHOU",
    Country: "AQ",
    Open: 0,
    countryId: "292",
    Heat: 0
}, {
    Code: 381,
    Cn: "南斯拉夫",
    En: "Yugoslavia",
    Py: "NAN SI LA FU",
    Country: "",
    Open: 0,
    countryId: "116",
    Heat: 0
}, {
    Code: 211,
    Cn: "南苏丹",
    En: "SOUTH SUDAN",
    Py: "NAN SU DAN",
    Country: "SS",
    Open: 0,
    countryId: "301",
    Heat: 0
}, {Code: 674, Cn: "瑙鲁", En: "Nauru", Py: "NAO LU", Country: "NR", Open: 0, countryId: "234", Heat: 0}, {
    Code: 977,
    Cn: "尼泊尔",
    En: "Nepal",
    Py: "NI BO ER",
    Country: "NP",
    Open: 0,
    countryId: "74",
    Heat: 0
}, {
    Code: 505,
    Cn: "尼加拉瓜",
    En: "Nicaragua",
    Py: "NI JIA LA GUA",
    Country: "NI",
    Open: 0,
    countryId: "198",
    Heat: 0
}, {Code: 227, Cn: "尼日尔", En: "Niger", Py: "NI RI ER", Country: "NE", Open: 0, countryId: "158", Heat: 0}, {
    Code: 234,
    Cn: "尼日利亚",
    En: "Nigeria",
    Py: "NI RI LI YA",
    Country: "NG",
    Open: 0,
    countryId: "75",
    Heat: 0
}, {
    Code: 683,
    Cn: "纽埃（新西兰属）",
    En: "Niue",
    Py: "NIU AI DAO",
    Country: "NU",
    Open: 0,
    countryId: "236",
    Heat: 0
}, {Code: 47, Cn: "挪威", En: "Norway", Py: "NUO WEI", Country: "NO", Open: 0, countryId: "76", Heat: 0}, {
    Code: 680,
    Cn: "帕劳群岛",
    En: "Palau",
    Py: "PA LAO",
    Country: "PW",
    Open: 0,
    countryId: "237",
    Heat: 0
}, {Code: 64, Cn: "皮特肯群岛", En: "Pitcairn", Py: "PI TE KEN QUN DAO", Country: "PN", Open: 1, Heat: 85}, {
    Code: 351,
    Cn: "葡萄牙",
    En: "Portugal",
    Py: "PU TAO YA",
    Country: "PT",
    Open: 1,
    countryId: "77",
    Heat: 0
}, {Code: 46, Cn: "瑞典", En: "Sweden", Py: "RUI DIAN", Country: "SE", Open: 0, countryId: "79", Heat: 0}, {
    Code: 41,
    Cn: "瑞士",
    En: "Switzerland",
    Py: "RUI SHI",
    Country: "CH",
    Open: 1,
    countryId: "80",
    Heat: 0
}, {
    Code: 503,
    Cn: "萨尔瓦多",
    En: "El Salvador",
    Py: "SA LONG WA DUO",
    Country: "SV",
    Open: 0,
    countryId: "238",
    Heat: 0
}, {
    Code: 381,
    Cn: "塞尔维亚",
    En: "Serbia",
    Py: "SAI ER WEI YA",
    Country: "RS",
    Open: 0,
    countryId: "183",
    Heat: 0
}, {
    Code: 232,
    Cn: "塞拉利昂",
    En: "Sierra Leone",
    Py: "SAI LA LI ANG",
    Country: "SL",
    Open: 0,
    countryId: "240",
    Heat: 0
}, {
    Code: 221,
    Cn: "塞内加尔",
    En: "Senegal",
    Py: "SAI NEI JIA ER",
    Country: "SN",
    Open: 0,
    countryId: "156",
    Heat: 0
}, {
    Code: 357,
    Cn: "塞浦路斯",
    En: "Cyprus",
    Py: "SAI PU LU SI",
    Country: "CY",
    Open: 0,
    countryId: "81",
    Heat: 0
}, {
    Code: 248,
    Cn: "塞舌尔",
    En: "Seychelles",
    Py: "SAI SHE ER",
    Country: "SC",
    Open: 0,
    countryId: "174",
    Heat: 0
}, {
    Code: 966,
    Cn: "沙特阿拉伯",
    En: "Saudi Arabia",
    Py: "SHA TE A LA BO",
    Country: "SA",
    Open: 0,
    countryId: "82",
    Heat: 0
}, {
    Code: 260,
    Cn: "尚比亚",
    En: "Zambia",
    Py: "SHANG BI YA",
    Country: "ZM",
    Open: 0,
    countryId: "112",
    Heat: 0
}, {
    Code: 590,
    Cn: "圣巴泰勒米",
    En: "Saint Barthelemy",
    Py: "SHENG BA TAI LE MI",
    Country: "BL",
    Open: 0,
    countryId: "297",
    Heat: 0
}, {
    Code: 239,
    Cn: "圣多美和普林西比",
    En: "Sao Tome and Principe",
    Py: "SHENG DUO MEI HE PU LIN XI BI",
    Country: "ST",
    Open: 0,
    countryId: "242",
    Heat: 0
}, {
    Code: 1758,
    Cn: "圣卢西亚",
    En: "Saint Lucia",
    Py: "SHENG LU XI YA",
    Country: "LC",
    Open: 0,
    countryId: "244",
    Heat: 0
}, {Code: 590, Cn: "圣马丁岛", En: "Saint Martin", Py: "SHENG MA DING DAO", Country: "MF", Open: 0, Heat: 0}, {
    Code: 378,
    Cn: "圣马力诺",
    En: "San Marino",
    Py: "SHENG MA LI NUO",
    Country: "SM",
    Open: 0,
    countryId: "245",
    Heat: 0
}, {
    Code: 508,
    Cn: "圣皮埃尔和密克隆岛",
    En: "Saint Pierre and Miq",
    Py: "SHENG PI AI ER HE MI KE LONG QUN DAO",
    Country: "PM",
    Open: 0,
    countryId: "289",
    Heat: 0
}, {
    Code: 1784,
    Cn: "圣文森特和格林纳丁斯",
    En: "Saint Vincent and the Grenadines",
    Py: "SHENG WEN SEN TE DAO",
    Country: "VC",
    Open: 0,
    countryId: "246",
    Heat: 0
}, {
    Code: 94,
    Cn: "斯里兰卡",
    En: "Sri Lanka",
    Py: "SI LI LAN KA",
    Country: "LK",
    Open: 1,
    countryId: "83",
    Heat: 0
}, {
    Code: 421,
    Cn: "斯洛伐克",
    En: "Slovakia",
    Py: "SI LUO FA KE",
    Country: "SK",
    Open: 0,
    countryId: "247",
    Heat: 0
}, {
    Code: 386,
    Cn: "斯洛文尼亚",
    En: "Slovenia",
    Py: "SI LUO WEN NI YA",
    Country: "SI",
    Open: 0,
    countryId: "84",
    Heat: 0
}, {
    Code: 268,
    Cn: "斯威士兰",
    En: "Swaziland",
    Py: "SI WEI SHI LAN",
    Country: "SZ",
    Open: 0,
    countryId: "196",
    Heat: 0
}, {Code: 249, Cn: "苏丹", En: "Sudan", Py: "SU DAN", Country: "SD", Open: 0, countryId: "85", Heat: 0}, {
    Code: 597,
    Cn: "苏里南",
    En: "Suriname",
    Py: "SU LI NAN",
    Country: "SR",
    Open: 0,
    countryId: "181",
    Heat: 0
}, {
    Code: 677,
    Cn: "所罗门群岛",
    En: "Solomon Islands",
    Py: "SUO LUO MEN QUN DAO",
    Country: "SB",
    Open: 0,
    countryId: "248",
    Heat: 0
}, {
    Code: 252,
    Cn: "索马里",
    En: "Somalia",
    Py: "SUO MA LI",
    Country: "SO",
    Open: 0,
    countryId: "249",
    Heat: 0
}, {
    Code: 992,
    Cn: "塔吉克斯坦",
    En: "Tajikistan",
    Py: "TA JI KE SI TAN",
    Country: "TJ",
    Open: 0,
    countryId: "250",
    Heat: 0
}, {
    Code: 255,
    Cn: "坦桑尼亚",
    En: "Tanzania",
    Py: "TAN SANG NI YA",
    Country: "TZ",
    Open: 0,
    countryId: "87",
    Heat: 0
}, {Code: 676, Cn: "汤加", En: "Tonga", Py: "TANG JIA", Country: "TO", Open: 0, countryId: "160", Heat: 0}, {
    Code: 1868,
    Cn: "特立尼达和多巴哥",
    En: "Trinidad and Tobago",
    Py: "TE LI NI DA HE DUO BA GE",
    Country: "TT",
    Open: 0,
    countryId: "252",
    Heat: 0
}, {Code: 216, Cn: "突尼斯", En: "Tunisia", Py: "TU NI SI", Country: "TN", Open: 0, countryId: "88", Heat: 0}, {
    Code: 688,
    Cn: "图瓦卢",
    En: "Tuvalu",
    Py: "TU WA LU",
    Country: "TV",
    Open: 0,
    countryId: "253",
    Heat: 0
}, {Code: 90, Cn: "土耳其", En: "Turkey", Py: "TU ER QI", Country: "TR", Open: 0, countryId: "89", Heat: 0}, {
    Code: 993,
    Cn: "土库曼斯坦",
    En: "Turkmenstan",
    Py: "TU KU MAN SI TAN",
    Country: "TM",
    Open: 0,
    countryId: "195",
    Heat: 0
}, {Code: 690, Cn: "托克劳群岛", En: "Tokelau", Py: "TUO KE LAO QUN DAO", Country: "TK", Open: 0, Heat: 0}, {
    Code: 681,
    Cn: "瓦利斯和富图纳群岛",
    En: "Wallis And Futuna Is",
    Py: "WA LI SI HE FU SHI NA QUN DAO",
    Country: "WF",
    Open: 0,
    countryId: "286",
    Heat: 0
}, {
    Code: 678,
    Cn: "瓦努阿图",
    En: "Vanuatu",
    Py: "WA NU A TU",
    Country: "VU",
    Open: 0,
    countryId: "254",
    Heat: 0
}, {
    Code: 502,
    Cn: "危地马拉",
    En: "Guatemala",
    Py: "WEI DI MA LA",
    Country: "GT",
    Open: 0,
    countryId: "90",
    Heat: 0
}, {
    Code: 58,
    Cn: "委内瑞拉",
    En: "Venezuela",
    Py: "WEI NEI RUI LA",
    Country: "VE",
    Open: 0,
    countryId: "91",
    Heat: 0
}, {Code: 673, Cn: "文莱", En: "Brunei", Py: "WEN LAI", Country: "", Open: 0, countryId: "92", Heat: 0}, {
    Code: 256,
    Cn: "乌干达",
    En: "Uganda",
    Py: "WU GAN DA",
    Country: "UG",
    Open: 0,
    countryId: "93",
    Heat: 0
}, {
    Code: 380,
    Cn: "乌克兰",
    En: "Ukraine",
    Py: "WU KE LAN",
    Country: "UA",
    Open: 0,
    countryId: "119",
    Heat: 0
}, {Code: 598, Cn: "乌拉圭", En: "Uruguay", Py: "WU LA GUI", Country: "UY", Open: 0, countryId: "94", Heat: 0}, {
    Code: 998,
    Cn: "乌兹别克斯坦",
    En: "Uzbekistan",
    Py: "WU ZI BIE KE SI TAN",
    Country: "UZ",
    Open: 0,
    countryId: "144",
    Heat: 0
}, {Code: 34, Cn: "西班牙", En: "Spain", Py: "XI BAN YA", Country: "ES", Open: 1, countryId: "95", Heat: 0}, {
    Code: 212,
    Cn: "西撒哈拉国",
    En: "Western Sahara",
    Py: "XI SA HA LA GUO",
    Country: "EH",
    Open: 0,
    Heat: 0
}, {Code: 685, Cn: "西萨摩亚", En: "Samoa Western", Py: "XI SA MO YA", Country: "", Open: 0, Heat: 0}, {
    Code: 30,
    Cn: "希腊",
    En: "Greece",
    Py: "XI LA ",
    Country: "GR",
    Open: 1,
    countryId: "96",
    Heat: 0
}, {
    Code: 687,
    Cn: "新喀里多尼亚",
    En: "New Caledonia",
    Py: "XIN KA LI DUO NI YA",
    Country: "NC",
    Open: 0,
    countryId: "263",
    Heat: 0
}, {
    Code: 36,
    Cn: "匈牙利",
    En: "Hungary",
    Py: "XIONG YA LI ",
    Country: "HU",
    Open: 0,
    countryId: "99",
    Heat: 0
}, {Code: 963, Cn: "叙利亚", En: "Syria", Py: "XU LI YA", Country: "SY", Open: 0, countryId: "100", Heat: 0}, {
    Code: 1876,
    Cn: "牙买加",
    En: "Jamaica",
    Py: "YA MAI JIA",
    Country: "JM",
    Open: 0,
    countryId: "101",
    Heat: 0
}, {
    Code: 374,
    Cn: "亚美尼亚",
    En: "Armenia",
    Py: "YA MEI NI YA",
    Country: "AM",
    Open: 0,
    countryId: "175",
    Heat: 0
}, {Code: 967, Cn: "也门", En: "Yemen", Py: "YE MEN", Country: "YE", Open: 0, countryId: "102", Heat: 0}, {
    Code: 964,
    Cn: "伊拉克",
    En: "Iraq",
    Py: "YI LA KE",
    Country: "IQ",
    Open: 0,
    countryId: "103",
    Heat: 0
}, {Code: 98, Cn: "伊朗", En: "Iran", Py: "YI LANG", Country: "IR", Open: 0, countryId: "104", Heat: 0}, {
    Code: 972,
    Cn: "以色列",
    En: "Israel",
    Py: "YI SE LIE",
    Country: "IL",
    Open: 0,
    countryId: "105",
    Heat: 0
}, {Code: 962, Cn: "约旦", En: "Jordan", Py: "YUE DAN ", Country: "JO", Open: 0, countryId: "110", Heat: 0}, {
    Code: 243,
    Cn: "扎伊尔",
    En: "Zaire",
    Py: "ZHA YI ER",
    Country: "ZR",
    Open: 0,
    Heat: 0
}, {Code: 235, Cn: "乍得", En: "Chad", Py: "ZHA DE", Country: "TD", Open: 0, countryId: "114", Heat: 0}, {
    Code: 350,
    Cn: "直布罗陀",
    En: "Gibraltar",
    Py: "ZHI BU LUO TUO ",
    Country: "GI",
    Open: 0,
    countryId: "287",
    Heat: 0
}, {Code: 56, Cn: "智利", En: "Chile", Py: "ZHI LI", Country: "CL", Open: 0, countryId: "115", Heat: 0}, {
    Code: 236,
    Cn: "中非共和国",
    En: "Central Africa Republic",
    Py: "ZHONG FEI GONG HE GUO",
    Country: "CF",
    Open: 0,
    countryId: "256",
    Heat: 0
}];
"use strict";

function CustomInfo() {
}

var customInfo;
!function () {
    var e = jQuery, a = e("#J_DivCustomInfo"), t = a.find(".J_InpEmail"), i = a.find(".J_CountryCode"),
        n = a.find(".J_InpMobile"), r = a.find(".J_setDefContact"), o = a.find(".J_settinDefContact"), l = function () {
            var e = "<div class='pops-hovertips pops-hovertips-name' style='border: 0px;'>";
            return $.BizData.custominfo.isHMTHotel || (e += "<p>中文填写如：王小花</p>"), e += "<p>英文填写需要在姓与名间加“/”如：wang/xiaohua</p></div>"
        };
    CustomInfo.prototype = {
        constructor: CustomInfo, lastArrival: null, lastDeparture: null, init: function () {
            var o = this, s = $.BizData, d = (s.ErrMsg, s.custominfo), m = s.isLogin,
                u = $.parseJSON(s.inputValue.MobilePhoneAreaData) || getAreaInfo("", s.inputValue.MobilePhoneArea);
            i.attr("data-area", JSON.stringify(u)), i.val(u.Cn + "(+" + u.Code + ")"), n.val(s.inputValue.MobilePhone), t.val(s.inputValue.ContactEmail), i.bind("blur", function () {
                var t = $.parseJSON(e(this).attr("data-area")) || getAreaInfo(), i = t && t.Code;
                t && "86" != i ? t.Open ? a.find(".J_confirmSmsTip").html("预订成功后向您发送短信通知，境外手机号由于网络等客观原因，请以邮件为准") : a.find(".J_confirmSmsTip").html("此境外手机号无法接收短信，请您务必填写邮箱地址，以便接收订单确认等通知") : (i = "86", a.find(".J_confirmSmsTip").html("预订成功后会向您发送短信通知")), a.find(".J_confirmArea").html("+" + i), n.trigger("blur")
            }), $.mod.load("emailPrompt", "1.0", function () {
                $("#J_DivCustomInfo").find(".J_InpEmail").regMod("emailPrompt", "1.0", {
                    listeners: {
                        onHide: function (e) {
                            $.BizData.RegEx.rEmail.test(e) && (common.clearError(this.$node), submit.validateinputerror())
                        }
                    }
                })
            }), common.checkInput(a.find(".J_IDCard"), function (e, a) {
                if ($.BizData.custominfo.isNeedInputIDCard) {
                    var t = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    return t.test(a) ? null : "请正确输入入住人身份证号码。"
                }
            }), common.checkInput(n, function (a, t) {
                var o, l, s = $.parseJSON(i.attr("data-area")) || getAreaInfo(), d = "24px", u = s && s.Code || "86";
                "86" == u ? (o = $.BizData.RegEx.rMobile, l = $.BizData.ErrMsg.mobilePhone_mainland, d = "48px") : "852" == u || "853" == u ? (o = $.BizData.RegEx.rHKMacaoMobile, l = $.BizData.ErrMsg.mobilePhone_macaoHK) : "886" == u ? (o = $.BizData.RegEx.rTaiwanMobile, l = $.BizData.ErrMsg.mobilePhone_taiwan) : (o = $.BizData.RegEx.rOverseaMobile, l = $.BizData.ErrMsg.mobilePhone_oversea, d = "48px");
                var c;
                return common.each($.BizData.contactList, function (e, a) {
                    a.isDefault && (c = a)
                }), t && o.test(t) ? (m ? c && c.countryCode == u && c.mobilePhone == n.val() ? r.show().addClass("btns_base02_disabled") : r.show().html("设为默认联系手机").removeClass("btns_base02_disabled") : r.hide(), null) : (e(a).parent().find(".form_item_errorbox").height(d), r.addClass("btns_base02_disabled"), l)
            }), common.checkInput(t, function (e, a) {
                if (a.length <= 0) {
                    var t = $.parseJSON(i.attr("data-area")) || getAreaInfo();
                    return "86" == t.Code ? null : "请填写E-mail。"
                }
                return $.BizData.RegEx.rEmail.test(a) ? null : $.BizData.ErrMsg.emailErr
            }), r.bind("click", o.setDefaultContact);
            var c = common.bindPulldown(a.find(".J_selecteArrival"), a.find(".J_selectArrivalList"), function () {
                common.clearError(jQuery("#J_DivCustomInfo").find(".J_selectedArrival").parent())
            });
            if (e(".J_inpSelectedArrival").bind("change", function (t) {
                e(t.target).attr("data-view") ? e(".J_selectedArrival").html(e(t.target).attr("data-view")) : e(".J_selectedArrival").html('<p class="text-lightGgray">请选择到店时间</p>'), d.IsOverTimeGuarantee && (o.isOverTimeGuarantee() ? (a.find(".J_OvertimeTip").html("房量紧张，需提供信用卡担保或积分担保。房间保留至" + $.BizData.bookinfo.arrivalNextDay + "中午12:00。"), a.find(".J_OvertimeTip").parent().css("display", "")) : a.find(".J_OvertimeTip").parent().css("display", "none"), tipsbInfo.refresh(), submit.refresh()), c.hidePulldown()
            }), common.bindToggle(a.find(".J_BtnRemark"), a.find(".J_DivDemand")), common.bindToggle(a.find(".J_ToggleContactTel"), a.find(".J_ToggleContactTelDiv")), common.triggerPlaceHolder(a.find("input")), o.refresh(!0), "DELAYORDER" == $.BizData.initParam.operationType) {
                var f = null;
                common.each(d.roomClientNames, function (t, i) {
                    var n = e("#J_tplRoomDelay").html(), r = e(n);
                    if (r.attr("id", "J_DivRoomListItem" + t), r.attr("FGID", i.FGID), r.find(".J_RoomIndex").html(t + 1), f) f.after(r); else {
                        var o = a.find(".J_bookTips");
                        o.after(r)
                    }
                    r.find(".J_DelayRoomNo").val(i.Roomno);
                    for (var s = null, m = i.ClientName.split(","), u = 0; u < d.MaxGuestCounts; u++) {
                        var c = "";
                        u < m.length && (c = m[u]);
                        var p = e("#J_tplGuest").html(), v = e(p);
                        v.find(".J_GuestIndex").html(u + 1), v.attr("id", "J_DivGuestListItem" + t + "_" + u), t + u === 0 && (v.find(".J_bookTipIcn").show(), common.bindHover($(v.find(".J_bookTipIcn")[0]), function () {
                            return l()
                        })), v.find(".J_clear").bind("click", function (a) {
                            var t = e(a.target).parents(".form_line");
                            t.find(".J_InpName,.J_genType2,.J_customType2,.J_inpSelectedAge").val("").trigger("blur"), t.find(".J_inpSelectedAge").trigger("change")
                        }), s ? s.after(v) : r.find(".J_GuestStarter").after(v);
                        var _ = v.find(".J_InpName");
                        0 == u && _.attr("data-isfst", "t"), _.val(c), _.bind("input", function (a) {
                            e(a.target).attr("data-id", "")
                        }), common.checkInput(_, function (e, a) {
                            var t = /^([\u4E00-\u9FA5\.\u2022+]{2,20}|[a-zA-Z\.\u2022+\-+\s+]+\/[a-zA-Z\.\u2022+\-+\s+]+\s?([a-zA-Z\.\u2022+\-+\s+]+)?)$/,
                                i = /^([a-zA-Z\.\u2022+\-+\s+]+\/[a-zA-Z\.\u2022+\-+\s+]+\s?([a-zA-Z\.\u2022+\-+\s+]+)?)$/,
                                n = t;
                            if (d.isHMTHotel && (n = i), d.RoomForDomestic && (n = $.BizData.RegEx.rChinese), a.length <= 0) ; else if (!n.test(a)) return d.Chinese_Pingyin;
                            return null
                        }), common.bindSuggestor(v.find(".J_InpName"), $.BizData.residentList, function (e) {
                            return '<div><div class="data_list_item">' + e.name + "&nbsp;&nbsp;&nbsp;&nbsp;</div></div>"
                        }, function (e, a) {
                            e.filter(".J_InpName").val(a.name), e.filter(".J_InpName").attr("data-id", a.id)
                        }, {}), s = v
                    }
                    f = r
                }), $(".J_DelayCheckBox").bind("change", function (a) {
                    var t = 0;
                    return $(".J_DelayCheckBox").each(function (e, a) {
                        e[0].checked && t++
                    }), t <= 0 ? void (a.target.checked = !0) : ($(".J_DelayCheckBox").each(function (e, a) {
                        e[0].disabled = "disabled"
                    }), $.BizData.pageParam.roomNumbers = t, void common.callHotelAvail(function (a) {
                        e("#J_DivBookInfo").find(".J_SelectedRoomNum").html($.BizData.pageParam.roomNumbers), $(".J_DelayCheckBox").each(function (e, a) {
                            e[0].disabled = ""
                        })
                    }))
                })
            }
        }, isOverTimeGuarantee: function () {
            var a = $.BizData.custominfo;
            if (a.IsOverTimeGuarantee) {
                var t = _parseArrivalTime(e(".J_inpSelectedArrival").val()), i = _parseArrivalTime(a.HoldDeadLine);
                return t > i
            }
            return !1
        }, refresh: function (t) {
            var o = this, l = $.BizData, s = l.custominfo;
            if (s) {
                if (t) {
                    var d;
                    if (common.each($.BizData.contactList, function (e, a) {
                        a.isDefault && (d = a)
                    }), d && !n.val()) {
                        n.attr("data-contact", d.iD);
                        var m = getAreaInfo("", d.countryCode);
                        i.attr("data-area", JSON.stringify(m)), i.val(m.Cn + "(+" + m.Code + ")"), n.val(d.mobilePhone)
                    }
                }
                $.BizData.isLogin ? r.show() : r.hide(), s.IsSendMobile ? a.find(".J_mobileGuaranteeTip").css("display", "") : a.find(".J_mobileGuaranteeTip").css("display", "none"), common.bindSuggestor(n, $.BizData.contactList, function (e) {
                    return '<li class="data_list_item"><span class="name">' + e.cNName + '&nbsp;</span><span class="phone">' + e.mobilePhone + '</span><span class="area">+' + e.countryCode + "</span></li>"
                }, function (e, a) {
                    var t = getAreaInfo("", a.countryCode);
                    i.attr("data-area", JSON.stringify(t)), i.val(t.Cn + "(+" + t.Code + ")"), i.trigger("blur"), e.val(a.mobilePhone), e.attr("data-contact", a.iD)
                }, {
                    header: "常用联系人",
                    isPage: !1,
                    isNeedFilter: !1,
                    style: "ul"
                }), e(".J_DivArrival").show(), e(".J_DivArrival2").hide(), e(".J_selectArrivalList").html("");
                var u = null;
                $.BizData.custominfo.arrivalOptsList.each(function (t, i) {
                    var n = e('<div class="data_list_itemArrive"></div>');
                    n.html(t.view), t.selected && (u = n), n.bind("click", function (i) {
                        a.find(".J_inpSelectedArrival").attr("data-view", t.view), a.find(".J_inpSelectedArrival").val(t.value).trigger("change"), o.lastArrival = c.arrival, o.lastDeparture = c.departure, e(".J_arrivalTipFlag").css("display", "none")
                    }), e(".J_selectArrivalList").append(n)
                });
                var c = $.BizData.pageParam, f = !1;
                t ? (o.lastArrival = c.arrival, o.lastDeparture = c.departure) : f = o.lastArrival != c.arrival || o.lastDeparture != c.departure, (f || t) && u && u.trigger("click");
                var p = "";
                s.ArrivalFrom && s.ArrivalTo && (p += "该酒店入住时间为" + s.ArrivalFrom + "-" + s.ArrivalTo + "，请在该时段办理入住。"), f && (p += "<span class='J_arrivalTipFlag' style='color:#f60!important'>您已修改入离日期，请重新选择预计到店时间。<br/></span>"), s.IsOverTimeGuarantee ? p += s.strHoldDeadLine + "后到店需要支付担保金，担保后房间整晚保留。" : ($.BizData.roominfo.needPay || $.BizData.roominfo.needGuarantee) && (p += "房间整晚保留，"), p += s.LimitArrivalFrom + "前到店可能需要等房。", e(".J_selectArriveTip").html(p), s.LimitArrivalDateTime && a.find(".J_DivArrivalFromTo").html("<div style='color:red;'>" + s.LimitArrivalDateTime + "</div>"), this.changeRoomNum(t), this.drawRemark(t);
                var v = e("#J_DivBookInfo").find(".J_ThirdPartTypeWord");
                v.css("display", "none"), "botao" == s.ThirdPartType && (v.css("display", ""), v.html(s.botaoName + "会员首住特惠活动仅能预订1间房")), "botaospecial" == s.ThirdPartType && (v.css("display", ""), v.html(s.botaoName + "特惠房型需提供入住人身份证")), a.find(".J_DIVIDCard").css("display", "none"), s.isNeedInputIDCard && a.find(".J_DIVIDCard").css("display", "")
            }
        }, setDefaultContact: function (e) {
            var t = a.find(".J_InpEmail"), i = a.find(".J_CountryCode"), n = a.find(".J_InpMobile"),
                l = $.parseJSON(i.attr("data-area")) || getAreaInfo();
            r.hasClass("btns_base02_disabled") || $.ajax("Tool/AjaxSaveDefaultContact.aspx", {
                method: "POST",
                context: {
                    mobileArea: l && l.Code || "86",
                    mobile: n.val(),
                    email: t.val() === t.attr("placeholder") ? "" : t.val(),
                    cid: n.attr("data-contact") || ""
                },
                header: {"content-type": "application/x-www-form-urlencoded; charset=utf8"},
                onprogress: function () {
                    r.hide(), o.show()
                },
                onsuccess: function (e, a) {
                    var t = a && $.parseJSON(a);
                    200 == t.code ? ($.BizData.contactList = $.parseJSON(t.data), r.html("已设默认联系手机").addClass("btns_base02_disabled").show(), o.hide()) : (r.html("设置默认失败，请重试").show(), o.hide())
                },
                onerror: function () {
                    r.html("设置默认失败，请重试").show(), o.hide()
                }
            })
        }, changeRoomNum: function (a) {
            var r = e("#J_DivCustomInfo"), o = $.BizData.custominfo;
            $.BizData.ErrMsg;
            if ("DELAYORDER" != $.BizData.initParam.operationType) {
                var s = $.BizData.inputValue.inputNameJson && JSON.parse($.BizData.inputValue.inputNameJson),
                    d = r.find(".J_DivCustomInfoInner");
                d.find(".J_DivRoomListItem").addClass("J_ToRemove");
                for (var m = null, u = 0; u < $.BizData.pageParam.roomNumbers; u++) {
                    var c = null;
                    s && (c = s[u]);
                    var f = d.find("#J_DivRoomListItem" + u);
                    if (f.length > 0) f.removeClass("J_ToRemove"); else {
                        var p = e("#J_tplRoom").html();
                        if (f = e(p), f.attr("id", "J_DivRoomListItem" + u), f.find(".J_RoomIndex").html(u + 1), m) m.after(f); else {
                            var v = r.find(".J_bookTips");
                            v.after(f)
                        }
                    }
                    f.find(".J_DivGuestListItem").addClass("J_ToRemove");
                    var _ = null, h = o.MaxGuestCounts;
                    !o.isHMTHotel && o.limitGuestCount1 && (h = 1);
                    for (var J = 0; J < h; J++) {
                        var g = null;
                        c && (g = c.inpResiGuestList[J]);
                        var D = f.find("#J_DivGuestListItem" + u + "_" + J);
                        if (D.length > 0 && !a) D.removeClass("J_ToRemove"); else {
                            var b = e("#J_tplGuest").html();
                            D = e(b), D.find(".J_GuestIndex").html(J + 1), D.attr("id", "J_DivGuestListItem" + u + "_" + J), u + J === 0 && (D.find(".J_bookTipIcn").show(), common.bindHover($(D.find(".J_bookTipIcn")[0]), function () {
                                return l()
                            })), D.find(".J_clear").bind("click", function (a) {
                                var t = e(a.target).parents(".form_line");
                                t.find(".J_InpName,.J_genType2,.J_customType2,.J_inpSelectedAge").val("").trigger("blur"), t.find(".J_inpSelectedAge").trigger("change")
                            }), !o.isHMTHotel && o.limitGuestCount1 && 0 == J && D.find(".form_input_label").html("每间须填写1名住客姓名"), 0 != J && D.find(".J_bookTipsCont").css("display", "none"), _ ? _.after(D) : f.find(".J_GuestStarter").after(D);
                            var I = D.find(".J_InpName");
                            if (0 == J && I.attr("data-isfst", "t"), a && g && I.val(g.inpName), I.bind("input", function (a) {
                                e(a.target).attr("data-id", "")
                            }), common.checkInput(I, function (e, a) {
                                var t = /^([\u4E00-\u9FA5\.\u2022+]{2,20}|[a-zA-Z\.\u2022+\-+\s+]+\/[a-zA-Z\.\u2022+\-+\s+]+\s?([a-zA-Z\.\u2022+\-+\s+]+)?)$/,
                                    i = /^([a-zA-Z\.\u2022+\-+\s+]+\/[a-zA-Z\.\u2022+\-+\s+]+\s?([a-zA-Z\.\u2022+\-+\s+]+)?)$/,
                                    n = t;
                                if (o.isHMTHotel && (n = i), o.RoomForDomestic && (n = $.BizData.RegEx.rChinese), a.length <= 0) ; else if (!n.test(a)) return o.Chinese_Pingyin;
                                return null
                            }), common.bindSuggestor(D.find(".J_InpName"), $.BizData.residentList, function (e) {
                                return '<div><div class="data_list_item">' + e.name + "&nbsp;&nbsp;&nbsp;&nbsp;</div></div>"
                            }, function (e, a) {
                                e.filter(".J_InpName").val(a.name), e.filter(".J_InpName").attr("data-id", a.id)
                            }, {}), o.ischanglong) {
                                var T = e("#J_tplIdInput").html(), C = e(T);
                                C.attr("id", "J_DivIdItem" + u), D.after(C);
                                var y = C.find(".J_idType");
                                y.attr("data-changlongType", o.changlongType), "all" == o.changlongType ? (y.append("<option value='Identity_Card'>身份证</option>"), y.append("<option value='Passport'>护照</option>"), y.append("<option value='MTP'>台胞证</option>"), y.append("<option value='TaiwanPass'>大陆居民往来台湾通行证</option>"), y.append("<option value='HKMacPass'>港澳通行证</option>"), y.append("<option value='HomePermit'>回乡证</option>")) : y.append("<option value='Identity_Card'>身份证</option>");
                                var N = C.find(".J_idNumber");
                                y.bind("change", function () {
                                    N.trigger("blur")
                                }), a && c && (y.val(c.CardType), N.val(c.CardNo)), common.checkInput(N, function (e, a) {
                                    if ("Identity_Card" == y.val()) {
                                        if (!N.val()) return "请输入身份证号。";
                                        if (!$.BizData.RegEx.rIDCard.test(N.val())) return "请输入正确的身份证号。"
                                    } else if (!N.val()) return "请输入" + y.find("option:selected").text() + "。";
                                    return null
                                }), common.bindHover($(C.find(".J_idTipIcn")[0]), function () {
                                    return "酒店需住客提供证件信息"
                                })
                            }
                        }
                        _ = D
                    }
                    u > 0 && f.find(".J_bookTipsCont").css("display", "none"), m = f
                }
                var k = $.BizData.residentList[0];
                k && !e(r.find(".J_InpName")[0]).val() && (e(r.find(".J_InpName")[0]).val(k.name), e(r.find(".J_InpName")[0]).attr("data-id", k.id)), d.find(".J_ToRemove").remove(), d.find(".J_idType").each(function (a, t) {
                    var i = e(t);
                    o.changlongType != i.attr("data-changlongType") && (i.html(""), i.attr("data-changlongType", o.changlongType), "all" == o.changlongType ? (i.append("<option value='Identity_Card'>身份证</option>"), i.append("<option value='Passport'>护照</option>"), i.append("<option value='MTP'>台胞证</option>"), i.append("<option value='TaiwanPass'>大陆居民往来台湾通行证</option>"), i.append("<option value='HKMacPass'>港澳通行证</option>"), i.append("<option value='HomePermit'>回乡证</option>")) : i.append("<option value='Identity_Card'>身份证</option>"))
                })
            }
            i.trigger("blur"), t.trigger("blur"), common.clearError(n), common.clearError(t), common.bindPlaceHolder(), common.triggerPlaceHolder()
        }, drawRemark: function (a) {
            var t = e("#J_DivCustomInfo"), i = $.BizData.custominfo, n = t.find(".J_DivSelectRemark"), r = !1,
                o = $.BizData.inputValue;
            if (n.children().addClass("J_toRemove"), common.each(i.selectList, function (t, i) {
                var l = e("<label class='base_label'>" + i.name + "<select></select></label>"), s = l.find("select");
                s.attr("title", i.title), s.attr("key", i.key);
                for (var d = 0; d < i.options.length; d++) {
                    var m = i.options[d];
                    s.append("<option value=" + m.key + ">" + m.name + "</option>")
                }
                if (a) for (var d = 0; d < o.CSRemarkList.length; d++) {
                    var u = o.CSRemarkList[d];
                    i.key ? i.key == u.Key && i.title == u.Title && s.val(u.Value) : i.title == u.Title && s.val(u.Key)
                } else n.find(".J_toRemove").each(function (a, t) {
                    var n = e(t).find("select");
                    n.attr("title") == i.title && n.attr("key") == i.key && s.val(n.val())
                });
                n.append(l), r = !0
            }), common.each(i.checkBoxList, function (t, i) {
                var l = e("<label class='base_label'><input type='checkbox'>" + i.name + "</label>"),
                    s = l.find("input");
                if (s.attr("title", i.title), s.attr("key", i.key), a) for (var d = 0; d < o.CSRemarkList.length; d++) {
                    var m = o.CSRemarkList[d];
                    i.key == m.Key && i.title == m.Title && (s[0].checked = !0)
                } else n.find(".J_toRemove").each(function (a, t) {
                    var n = e(t).find("input");
                    n.attr("title") == i.title && n.attr("key") == i.key && n[0].checked && (s[0].checked = !0)
                });
                n.append(l), r = !0
            }), n.find(".J_toRemove").remove(), i.ReceiveTextRemark) {
                t.find(".J_DivTextRemark").show();
                var l = 300;
                "yagaohtl" === $.BizData.roominfo.hotelType ? l = 100 : "overseahilton" === $.BizData.roominfo.hotelType && (l = 50), t.find(".J_DivTextRemark").find("textarea").attr("maxlength", l), t.find(".J_DivTextRemark").find("textarea").val($.BizData.inputValue.Remark), r = !0
            } else t.find(".J_DivTextRemark").hide();
            i.isShowFlightNum ? (t.find(".J_flight").show(), r = !0) : t.find(".J_flight").hide(), r ? t.find(".J_DivRemark").show() : t.find(".J_DivRemark").hide()
        }, validate: function () {
            var a = e("#J_DivCustomInfo"), i = $.BizData.custominfo, r = a.find(".J_DivCustomInfoInner");
            $.BizData.custominfo.isNeedInputIDCard && a.find(".J_IDCard").trigger("blur");
            for (var o = 0, l = 0; l < $.BizData.pageParam.roomNumbers; l++) for (var s = r.find("#J_DivRoomListItem" + l), d = 0; d < i.MaxGuestCounts; d++) {
                var m = s.find("#J_DivGuestListItem" + l + "_" + d), u = m.find(".J_InpName");
                common.clearError(m.find(".J_InpName")[0]), u.val() && o++
            }
            for (var c, l = 0; l < $.BizData.pageParam.roomNumbers; l++) for (var s = r.find("#J_DivRoomListItem" + l), d = 0; d < 1; d++) {
                var m = s.find("#J_DivGuestListItem" + l + "_" + d), u = m.find(".J_InpName");
                if (c || u.val() || (c = u[0]), i.ischanglong) {
                    var f = s.find("#J_DivIdItem" + l);
                    f.length > 0 && f.find(".J_idNumber").trigger("blur")
                }
            }
            return o < $.BizData.pageParam.roomNumbers && c ? (common.showError(c, "请填写住客姓名。"), !1) : (a.find(".J_InpName").trigger("blur"), n.trigger("blur"), t.trigger("blur"), !0)
        }, submit: function () {
            var a = e("#J_DivCustomInfo"), r = $.BizData.custominfo, o = $.BizData.inputValue,
                l = a.find(".J_DivCustomInfoInner"), s = [], d = $("#J_residentjson");
            o.inputName = "", o.inputNameID = "";
            for (var m, u = new Array, c = 0; c < $.BizData.pageParam.roomNumbers; c++) {
                var f = l.find("#J_DivRoomListItem" + c);
                m = new Object, m.idx = c + 1, m.inpResiGuestList = new Array;
                var p = r.MaxGuestCounts;
                !r.isHMTHotel && r.limitGuestCount1 && (p = 1);
                for (var v = 0; v < p; v++) {
                    var _ = f.find("#J_DivGuestListItem" + c + "_" + v), h = _.find(".J_InpName"), J = h.val();
                    if (J.length > 0 && (o.inputName += "," + J, o.inputNameID += "," + h.attr("data-id") || "", s.push(J), m.inpResiGuestList.push({
                        inpNameId: h.attr("data-id") || 0,
                        inpName: J,
                        inpGender: _.find(".J_genType2").val() || "",
                        inpType: _.find(".J_customType2").val() || "",
                        age: _.find(".J_inpSelectedAge").val() || -1
                    })), r.ischanglong) {
                        var g = f.find("#J_DivIdItem" + c), D = g.find(".J_idType"), b = g.find(".J_idNumber");
                        g.length > 0 && (m.CardType = D.val(), m.CardNo = b.val())
                    }
                }
                u.push(m)
            }
            o.inputNameJson = JSON.stringify(u), o.inputName = o.inputName.substring(1), o.inputNameID = o.inputNameID.substring(1), d.attr("data-residents", s.join(",")), "DELAYORDER" == $.BizData.initParam.operationType && (o.RoomClientNameList = [], l.find(".J_DivRoomListItem").each(function (a, t) {
                var i = {};
                i.ischecked = e(t).find(".J_DelayCheckBox")[0].checked, i.FgID = e(t).attr("FGID"), i.RoomNo = e(t).find(".J_DelayRoomNo").val(), i.ClientName = [], e(t).find(".J_InpName").each(function (a, t) {
                    var n = e(t).val();
                    n && i.ClientName.push(n)
                }), o.RoomClientNameList.push(i)
            }));
            var I = $.parseJSON(i.attr("data-area")) || getAreaInfo();
            o.ContactEmail = t.val(), o.MobilePhoneArea = I && I.Code || "86", o.MobilePhone = n.val(), o.ContactTelArea = a.find(".J_InpContactTelArea").val(), o.ContactTelNum = a.find(".J_InpContactTelNum").val(), o.ContactTelExt = a.find(".J_InpContactTelExt").val();
            var T = a.find(".J_DivSelectRemark");
            o.CSRemarkList = [], common.each(r.selectList, function (a, t) {
                var i;
                if (T.children().each(function (a, n) {
                    var r = e(n).find("select");
                    r.attr("title") == t.title && r.attr("key") == t.key && (i = r.val())
                }), i && "-1" != i) if (t.key) {
                    var n = {Key: t.key, Title: t.title, Value: i};
                    o.CSRemarkList.push(n)
                } else {
                    var n = {Key: i, Title: t.title, Value: ""};
                    o.CSRemarkList.push(n)
                }
            }), common.each(r.checkBoxList, function (a, t) {
                var i;
                if (T.children().each(function (a, n) {
                    var r = e(n).find("input");
                    r.attr("title") == t.title && r.attr("key") == t.key && r[0].checked && (i = !0)
                }), i) {
                    var n = {Key: t.key, Title: t.title, Value: ""};
                    o.CSRemarkList.push(n)
                }
            }), a.find(".J_flight").is(":hidden") || (o.ArrivalNum = a.find(".J_flightArrive").val(), o.DepartureNum = a.find(".J_flightDepart").val()), !a.find(".J_DivTextRemark").is(":hidden") && a.find(".J_DivTextRemark").find("textarea").val() && (o.Remark = a.find(".J_DivTextRemark").find("textarea").val()), o.LateArrivalTime = e(".J_inpSelectedArrival").val()
        }
    }, customInfo = new CustomInfo
}();
var _parseArrivalTime = function (e) {
    var a, t = new Date;
    return e.indexOf(".") != -1 ? (a = e.split(".")[1].split(":"), t = t.addDays(1)) : a = e.split(":"), t.setHours(a[0]), t.setMinutes(a[1]), t.setSeconds(a[2]), t
};
"use strict";

function HyattInfo() {
}

var hyattInfo;
!function () {
    function t(t, a, e) {
        var i = a && a.split(".") || [];
        if ("object" == typeof t) {
            for (var n = t, o = 0; i[o];) {
                if (!n) return e;
                n = n[i[o]], o++
            }
            return n || e
        }
        return t || e
    }

    function a() {
        ahc.ready(function () {
            ahc.logout(), $(".J_accor_loginButton").css("display", ""), ahc.login(function () {
                ahc.request("/v2.0/user/loyaltyAccount", "GET").then(function (a) {
                    console.log(a);
                    var e = t(a, "UserLoyaltyAccountResponse.loyaltyAccount.account.loyaltyCards.0.cardNumber") || "0";
                    console.log(e), e && (cQuery.ajax("/flagship/ToolNew/AjaxFSLogin.aspx", {
                        method: "POST",
                        context: {MemberNO: e, fs: "accor"},
                        onsuccess: function (t) {
                            $(".J_hasLogin").css("display", ""), $(".J_hasntLogin").css("display", "none")
                        }
                    }), ahc.logout())
                })
            }, function () {
            })
        })
    }

    var e = jQuery, i = null;
    HyattInfo.prototype = {
        constructor: HyattInfo, init: function () {
            if (!$.BizData.hyattMember) return e("#J_DivHyattMemberInfo").hide(), void e("#J_DivAccorMemberInfo").hide();
            "hyatt" == $.BizData.hyattMember.flagshipType ? i = e("#J_DivHyattMemberInfo") : "accor" == $.BizData.hyattMember.flagshipType && (i = e("#J_DivAccorMemberInfo"), window.ahcLang = "zh", window.fallbackNameTranport = "../easyxdm/name.html", $("#J_accor_Script").value() && $LAB.script({
                src: $("#J_accor_Script").value(),
                charset: "utf-8"
            }).wait(a), $.BizData.hyattMember.isHyattOnly ? e("#J_AccorSpan").html("雅高特惠房型，须成为雅高乐雅会会员") : e("#J_AccorSpan").html("加入雅高乐雅会，享会员权益"), $("#J_a_FSLoginAccor,.J_a_FSLoginAccor").bind("click", function () {
                ahc.loginForm(null, "", "", "WEB", "", !0, !1)
            }), $("#J_a_FSRegAccor,.J_a_FSRegAccor").bind("click", function () {
                ahc.registrationForm("WEB", "", !0, null, "", "", "", "", "", "", "", "", "")
            })), i.show();
            var t = this, n = $.BizData, o = (n.ErrMsg, n.hyattMember);
            n.isLogin;
            common.bindPop(i.find(".J_hyattLogout"), $("#J_hyattLogoutPop"), {
                onSubmit: function () {
                    $.ajax("Tool/AjaxUnbindFlagship.aspx", {
                        context: {HyattMemberId: o.HyattMemberId},
                        method: "POST"
                    }), o.HyattMemberId = null, o.HyattMemberName = null, t.refresh()
                }
            }), $(".J_hyatt_login").bind("click", function () {
                var a = o.J_LoginUrl + o.J_DefaultRetUrl,
                    e = window.open(a, "newwindow", "modal=yes, height=800, width=800, top=200, left=300, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no"),
                    i = window.setInterval(function () {
                        var a = "";
                        try {
                            a = e.hyatt_login_flag
                        } catch (n) {
                        }
                        var _ = "";
                        try {
                            _ = window.hyatt_login_flag
                        } catch (n) {
                        }
                        "T" == a && (o.HyattMemberId = 1, o.HyattMemberName = e.hyatt_E_username, t.refresh(), window.clearInterval(i)), "T" == _ && (o.HyattMemberId = 1, o.HyattMemberName = window.hyatt_E_username, t.refresh(), window.clearInterval(i))
                    }, 1e3)
            }), $("#J_hyattRegiPop").find(".J_close").bind("click", function () {
                $("#J_hyattRegiPop").unmask(), $("#J_Submit").find(".J_BtnSubmit").removeClass("locked disabled")
            }), $("#J_hyattRegiPop").find(".J_submit").bind("click", function () {
                $("#J_hyattRegiPop").unmask(), $("#J_Submit").find(".J_BtnSubmit").removeClass("locked disabled"), hyattInfo.doNotCheckHyatt = !0, submit.doSubmit()
            }), common.checkInput(i.find(".J_Hyatt_FirstName,.J_Hyatt_LastName"), function (t, a) {
                return "" == a ? null : $.BizData.RegEx.rChinese1.test(a) ? null : "请填写正确的中文姓名"
            }), common.checkInput(i.find(".J_Hyatt_eFirstName,.J_Hyatt_eLastName"), function (t, a) {
                return "" == a ? null : $.BizData.RegEx.rEnglish1.test(a) ? null : "请填写正确的英文姓名"
            }), common.checkInput(i.find(".J_Hyatt_Email"), function (t, a) {
                return "" == a ? null : $.BizData.RegEx.rEmail.test(a) ? null : $.BizData.ErrMsg.emailErr
            }), i.find(".J_Hyatt_AreaCode,.J_Hyatt_Phone").bind("blur", function () {
                if ("" == i.find(".J_Hyatt_Phone").val()) return null;
                var t = i.find(".J_Hyatt_AreaCode").val() && i.find(".J_Hyatt_AreaCode").val().match(/\+[0-9]*/g),
                    a = $.BizData.RegEx.rMobile;
                t && "+86" != t && (a = "+852" == t || "+853" == t ? $.BizData.RegEx.rHKMacaoMobile : "+886" == t ? $.BizData.RegEx.rTaiwanMobile : $.BizData.RegEx.rOverseaMobile), a.test(i.find(".J_Hyatt_Phone").val()) ? common.clearError(i.find(".J_Hyatt_Phone")) : common.showError(i.find(".J_Hyatt_Phone"), "请填写正确的手机号码")
            }), t.refresh(!0)
        }, refresh: function (t) {
            if (!$.BizData.hyattMember) return !1;
            var a = $.BizData, n = a.hyattMember;
            if (n.isHyattOnly ? (i.find(".J_hyattRegTable").show(), i.find(".J_div_hyattRegCheck").hide()) : (i.find(".J_hyattRegTable").hide(), i.find(".J_div_hyattRegCheck").show(), e("#J_hyattRegCheck").bind("click", function () {
                e("#J_hyattRegCheck").is(":checked") ? e(".J_hyattRegTable").show() : e(".J_hyattRegTable").hide()
            }), $("#J_hyattRegCheck").trigger("click")), n.HyattMemberId ? (i.find(".J_hasntLogin").hide(), i.find(".J_hasLogin").show(), i.find(".J_hyatt_membername").html(n.HyattMemberName)) : (i.find(".J_hasntLogin").show(), i.find(".J_hasLogin").hide()), n.isHyattOnly && !n.HyattMemberId ? e(".J_hasntLogin.J_hyattRegTable").show() : e(".J_hasntLogin.J_hyattRegTable").hide(), t) {
                var o = $.BizData.inputValue;
                i.find(".J_Hyatt_FirstName").val(o.hyattFirstName), i.find(".J_Hyatt_LastName").val(o.hyattLastName), i.find(".J_Hyatt_eFirstName").val(o.hyatteFirstName), i.find(".J_Hyatt_eLastName").val(o.hyatteLastName), i.find(".J_Hyatt_Email").val(o.hyattEmail);
                var _;
                if (o.hyattPhone) {
                    var r = o.hyattPhone.split("-");
                    1 == r.length ? (_ = getAreaInfo(), i.find(".J_Hyatt_Phone").val(r[0])) : (_ = getAreaInfo("", r[0]), i.find(".J_Hyatt_Phone").val(r[1]))
                } else _ = getAreaInfo(), i.find(".J_Hyatt_Phone").val("");
                i.find(".J_Hyatt_AreaCode").attr("data-area", JSON.stringify(_)), i.find(".J_Hyatt_AreaCode").val(_.Cn + "(+" + _.Code + ")")
            }
        }, matchName: function (t) {
            for (var a = !1, i = e("#J_DivCustomInfo"), n = i.find(".J_DivCustomInfoInner"), o = 0; o < $.BizData.pageParam.roomNumbers; o++) for (var _ = n.find("#J_DivRoomListItem" + o), r = 0; r < $.BizData.custominfo.MaxGuestCounts; r++) {
                var s = _.find("#J_DivGuestListItem" + o + "_" + r), l = s.find(".J_InpName"), y = l.val();
                t.replace(" ", "").toLowerCase() == y.replace(" ", "").toLowerCase() && (a = !0)
            }
            return a
        }, validate: function () {
            if ($.BizData.hyattMember) {
                if ("hyatt" == $.BizData.hyattMember.flagshipType && !this.doNotCheckHyatt) if ($.BizData.hyattMember.isHyattOnly) {
                    if (!this.validateAll()) return !1
                } else if (!this.validatePart()) return !1;
                if ("accor" == $.BizData.hyattMember.flagshipType && $.BizData.hyattMember.isHyattOnly && "none" == $("#J_DivAccorMemberInfo .J_hasLogin").css("display")) return e("#J_hyattRegiPop").find(".J_Desc").text("该房型仅支持会员预订，请登录或注册后重新提交订单！"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "知道了"), e("#J_hyattRegiPop").find(".J_submit").hide(), $("#J_hyattRegiPop").mask(), !1
            }
            return !0
        }, validateAll: function () {
            var t = this, a = $.BizData.hyattMember;
            $(".J_Hyatt_FirstName,.J_Hyatt_LastName,.J_Hyatt_eFirstName,.J_Hyatt_eLastName,.J_Hyatt_Email,.J_Hyatt_Phone").trigger("blur");
            var n;
            t.allEmpty = 0;
            var o = "";
            if (a.HyattMemberId) o = a.HyattMemberName; else {
                if (o = i.find(".J_Hyatt_eLastName").val() + "/" + i.find(".J_Hyatt_eFirstName").val(), i.find(".J_Hyatt_Phone").val() || (n = "手机号码", t.allEmpty++), i.find(".J_Hyatt_Email").val() || (n = "电子邮箱", t.allEmpty++), i.find(".J_Hyatt_eLastName").val() || (n = "英文名", t.allEmpty++), i.find(".J_Hyatt_eFirstName").val() || (n = "英文姓", t.allEmpty++), i.find(".J_Hyatt_LastName").val() || (n = "中文名", t.allEmpty++), i.find(".J_Hyatt_FirstName").val() || (n = "中文姓", t.allEmpty++), 6 === t.allEmpty) return e("#J_hyattRegiPop").find(".J_Desc").text("您预订的是凯悦特惠价房型，须注册凯悦会员才能预订"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "知道了"), e("#J_hyattRegiPop").find(".J_submit").hide(), $("#J_hyattRegiPop").mask(), !1;
                if (n) return e("#J_hyattRegiPop").find(".J_Desc").text("请填写" + n + "，完成凯悦天地会员注册"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "知道了"), e("#J_hyattRegiPop").find(".J_submit").hide(), $("#J_hyattRegiPop").mask(), !1;
                if (!e("#J_chk_agree").is(":checked")) return e("#J_chk_agree").focus(), e("#J_chk_agree").parent().parent().css("background-color", "#FED"), e("#J_hyattRegiPop").find(".J_Desc").text("请阅读同意会员条款政策"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "知道了"), e("#J_hyattRegiPop").find(".J_submit").hide(), $("#J_hyattRegiPop").mask(), !1
            }
            return !!t.matchName(o) || (e("#J_hyattRegiPop").find(".J_Desc").text("会员姓名与入住人姓名不一致，将无法享受会员权益，是否继续预订"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "取消"), e("#J_hyattRegiPop").find(".J_submit").attr("value", "继续预订"), e("#J_hyattRegiPop").find(".J_submit").show(), $("#J_hyattRegiPop").mask(), !1)
        }, allEmpty: 0, validatePart: function () {
            $(".J_Hyatt_FirstName,.J_Hyatt_LastName,.J_Hyatt_eFirstName,.J_Hyatt_eLastName,.J_Hyatt_Email,.J_Hyatt_Phone").trigger("blur");
            var t, a = this, n = $.BizData.hyattMember;
            a.allEmpty = 0;
            var o = "";
            if (n.HyattMemberId) {
                if (o = n.HyattMemberName, !a.matchName(o)) return e("#J_hyattRegiPop").find(".J_Desc").text("会员姓名与入住人姓名不一致，是否继续预订"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "取消"), e("#J_hyattRegiPop").find(".J_submit").attr("value", "继续预订"), e("#J_hyattRegiPop").find(".J_submit").show(), $("#J_hyattRegiPop").mask(), !1
            } else {
                if (i.find(".J_Hyatt_Phone").val() || (t = "手机号码", a.allEmpty++), i.find(".J_Hyatt_Email").val() || (t = "电子邮箱", a.allEmpty++), i.find(".J_Hyatt_eLastName").val() || (t = "英文名", a.allEmpty++), i.find(".J_Hyatt_eFirstName").val() || (t = "英文姓", a.allEmpty++), i.find(".J_Hyatt_LastName").val() || (t = "中文名", a.allEmpty++), i.find(".J_Hyatt_FirstName").val() || (t = "中文姓", a.allEmpty++), $("#J_hyattRegCheck")[0].checked || (a.allEmpty = 6), 6 === a.allEmpty) {
                    if (n.isHyattRegi) return e("#J_hyattRegiPop").find(".J_Desc").text("注册凯悦天地会员，可享丰富会员权益。快快注册吧！"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "去注册"), e("#J_hyattRegiPop").find(".J_submit").attr("value", "不注册，直接订"), e("#J_hyattRegiPop").find(".J_submit").css("width", "110px"), e("#J_hyattRegiPop").find(".J_submit").show(), $("#J_hyattRegiPop").mask(), !1
                } else {
                    if (t) return e("#J_hyattRegiPop").find(".J_Desc").text("请填写" + t + "，完成凯悦天地会员注册"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "知道了"), e("#J_hyattRegiPop").find(".J_submit").hide(), $("#J_hyattRegiPop").mask(), !1;
                    if (!e("#J_chk_agree").is(":checked")) return e("#J_chk_agree").focus(), e("#J_chk_agree").parent().parent().css("background-color", "#FED"), e("#J_hyattRegiPop").find(".J_Desc").text("请阅读同意会员条款政策"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "知道了"), e("#J_hyattRegiPop").find(".J_submit").hide(), $("#J_hyattRegiPop").mask(), !1
                }
                if (o = i.find(".J_Hyatt_eLastName").val() + "/" + i.find(".J_Hyatt_eFirstName").val(), $("#J_hyattRegCheck")[0].checked && !a.matchName(o)) return e("#J_hyattRegiPop").find(".J_Desc").text("会员姓名与入住人姓名不一致，是否继续预订"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "取消"), e("#J_hyattRegiPop").find(".J_submit").attr("value", "继续预订"), e("#J_hyattRegiPop").find(".J_submit").show(), $("#J_hyattRegiPop").mask(), !1
            }
            return !0
        }, submit: function () {
            if ($.BizData.hyattMember) {
                var t = $.BizData.hyattMember, a = $.BizData.inputValue;
                a.flagshipType = t.flagshipType
            }
        }, regHyatt: function (t) {
            if (!$.BizData.hyattMember) return void t();
            var a = $.BizData.hyattMember;
            if (a.HyattMemberId) return void t();
            if ("hyatt" != $.BizData.hyattMember.flagshipType) return void t();
            if (!a.isHyattOnly && 6 == this.allEmpty) return void t();
            var n = {};
            n.CFirstName = i.find(".J_Hyatt_FirstName").val().trim(), n.CLastName = i.find(".J_Hyatt_LastName").val().trim(), n.EFirstName = i.find(".J_Hyatt_eFirstName").val().trim(), n.ELastName = i.find(".J_Hyatt_eLastName").val().trim(), n.EMail = i.find(".J_Hyatt_Email").val().trim();
            try {
                n.MobilePhoneArea = $.parseJSON(i.find(".J_Hyatt_AreaCode").attr("data-area")).Code
            } catch (o) {
            }
            n.MobilePhone = i.find(".J_Hyatt_Phone").val(), n.fs = "hyatt", cQuery.ajax("/flagship/ToolNew/AjaxFSReg.aspx", {
                method: "POST",
                context: n,
                onsuccess: function (a) {
                    "ok" == a.responseText ? t() : (e("#J_hyattRegiPop").find(".J_Desc").text(a.responseText), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "知道了"), e("#J_hyattRegiPop").find(".J_submit").hide(), $("#J_hyattRegiPop").mask())
                },
                onerror: function () {
                    e("#J_hyattRegiPop").find(".J_Desc").text("注册凯悦会员失败"), e("#J_hyattRegiPop").find(".J_close").show(), e("#J_hyattRegiPop").find(".J_close").attr("value", "知道了"), e("#J_hyattRegiPop").find(".J_submit").hide(), $("#J_hyattRegiPop").mask()
                }
            })
        }
    }, hyattInfo = new HyattInfo
}();
"use strict";

function DiscountInfo() {
}

var discountInfo;
!function () {
    var o = jQuery, n = $.BizData, e = o("#J_DivDiscount"), i = e.find(".J_WrapCashback"), a = e.find(".J_WrapCoupon"),
        t = a.find(".J_couponTxt"), c = a.find(".J_tip"), s = a.find(".J_couponList"), r = a.find(".J_submitCoupon"),
        u = a.find(".J_validateMsg"), p = a.find(".J_iptCp"), d = a.find(".J_showMore"),
        f = e.find(".J_validCouponCode"), m = "PP" == n.pageParam.balancetype;
    DiscountInfo.prototype = {
        CouponAmount: 0, CouponBackAmount: 0, init: function () {
            var i = this;
            i.refresh(), d.bind("click", i.foldSwitch), c.find("div").bind("click", i.foldSwitch), r.bind("click", function () {
                var e = t.val().trim();
                if (!e) return i.setVCoupon(0), common.showError(t, n.ErrMsg.coupon_codeEmpty), u.hide(), void p.show();
                var a = $.BizData.couponinfo, c = !1;
                o.each(a.coupons, function (o, n) {
                    n.code == e && (s.find(".J_useCoupon2").removeClass("selected"), s.find(".J_useCoupon2[data-code=" + e + "]").addClass("selected"), i.clickCallBack(n), c = !0)
                }), c || i.submitCoupon(e)
            }), a.find(".J_cancelCoupon").bind("click", function () {
                u.hide(), p.show(), common.clearError(t), s.find(".J_useCoupon2").removeClass("selected"), priceInfo.refundList._couponcashback = 0, priceInfo.refresh(), i.setVCoupon(0)
            });
            var f;
            $.BizData.couponinfo && (f = $.BizData.inputValue.couponCode || $.BizData.couponinfo.searchCouponCode || $.BizData.couponinfo.oriOrderCouponCode, f && (t.val(f).trigger("blur"), r.trigger("click"))), common.bindToggle(e.find(".J_SpanCouponBack"), e.find(".J_DivCouponBack"))
        }, refresh: function () {
            var n = this, u = $.BizData.cashbackinfo, f = $.BizData.couponinfo, m = $.BizData.discountInfo;
            if (e.hide(), d.hide(), priceInfo.refundList._cashbackD = 0, u && u.cashBackTotalD > 0) if (e.show(), i.show(), i.find(".J_cashbackC").hide(), i.find(".J_cashbackD").hide(), i.find(".J_loginTip").hide(), $.BizData.isLogin ? u.cashBackTotalD > 0 && i.find(".J_cashbackD").show() : i.find(".J_loginTip").show(), i.find(".J_cashbackDay").html(u.cashbackDay), m.newRefunds && m.newRefunds.length > 0) if (priceInfo.refundList._cashbackD = 0, 1 == m.newRefunds.length) i.find(".J_cpUsed").html(m.newRefunds[0].name + "<dfn>&yen;</dfn>" + m.newRefunds[0].amount); else {
                var l = 0, h = "";
                o.each(m.newRefunds, function (o, n) {
                    l += n.amount, h += n.name + "<dfn>&yen;</dfn>" + n.amount + "；"
                }), h = h.substr(0, h.length - 1), i.find(".J_cpUsed").html("返现总金额<dfn>&yen;</dfn>" + l + "（" + h + "）")
            } else i.find(".J_cpUsed").html("返现<dfn>&yen;</dfn>" + u.cashBackTotalD), priceInfo.refundList._cashbackD = u.cashBackTotalD; else priceInfo.refundList._couponcashback = 0, i.hide();
            delete priceInfo.priceList.couponReduce, delete priceInfo.priceDetail.couponReduce, f && (f.coupons || f.isShowInputBox) ? (e.show(), a.show(), f.useCouponTips ? (c.html(f.useCouponTips), c.css("display", "")) : c.css("display", "none"), f.coupons ? (s.html(""), o.each(f.coupons, function (e, i) {
                var a = o($.tmpl.render($("#J_tmplCouponItem").html(), {item: i}));
                a.bind("click", function () {
                    s.find(".J_useCoupon2").removeClass("selected"), a.addClass("selected"), t.val(i.code), t.trigger("blur"), n.clickCallBack(i)
                }), common.bindHover($(a.find(".J_cpDetail")[0]), function (o) {
                    return i.desc
                }), s.append(a)
            }), f.coupons.length > 3 && d.show()) : s.hide(), f.isShowInputBox ? p.show() : p.hide(), t.val() && (t.trigger("blur"), r.trigger("click"))) : a.hide(), f && f.CouponBack_finalAmount && (e.find(".J_CouponBack").css("display", ""), e.find(".J_SpanCouponBack").html(f.CouponBack_finalAmount + "<i class='icon_down'></i>"), e.find(".J_DivCouponBack").html(f.CouponBack_sremark)), delete priceInfo.priceList.PrimebenefitReduce, delete priceInfo.priceList.PromoteDiscountReduce;
            var C = e.find(".J_PromoteDiscount");
            if (m) {
                var _ = e.find(".J_Primebenefit");
                m.Primebenefit ? (e.show(), _.show(), _.find(".benefit_type_tit").html(m.discountPrimebenefitTitle), _.find(".benefit_type_bd").html(m.Primebenefit), priceInfo.priceList.PrimebenefitReduce = {
                    name: m.discountPrimebenefitTitle,
                    value: -m.PrimebenefitDiscountAmount
                }) : _.hide(), m.PrimebenefitDiscountAmount > 0 && (priceInfo.priceList.PrimebenefitReduce = {
                    name: m.discountPrimebenefitTitle,
                    value: -m.PrimebenefitDiscountAmount
                }), m.PromoteDiscountHtml ? (e.show(), C.show(), C.find(".benefit_type_bd").html(m.PromoteDiscountHtml)) : C.hide(), m.PrepayDiscountTotalAmount > 0 && (priceInfo.priceList.PromoteDiscountReduce = {
                    name: "促销优惠",
                    value: -m.PrepayDiscountTotalAmount
                })
            } else C.hide();
            priceInfo.refundList.newRefunds = m.newRefunds, priceInfo.refresh()
        }, setVCoupon: function (e, i) {
            if (m && (0 == e ? (delete priceInfo.priceList.couponReduce, delete priceInfo.priceDetail.couponReduce) : (priceInfo.priceList.couponReduce = {
                name: "立减优惠",
                value: -e
            }, priceInfo.priceDetail.couponReduce = {
                name: "优惠券",
                data: "<div>-<dfn>&yen;</dfn><span class='orange'>" + e + "</span></div>"
            }), priceInfo.refresh(), n.insureinfo && n.insureinfo.cancelInsure && n.insureinfo.cancelInsure.planId > 0)) {
                var a = o("#J_DivInsureInfo .J_totalRoomPrice");
                a.html(parseInt(a.attr("data-oriamt")) - e)
            }
            f.val(void 0 == i ? "" : i)
        }, validate: function () {
            return $.BizData.discountInfo.PromotionStudent && !window.__SupressPromotionStudent ? (common.showCommonPop("学生福利", "入住时需出示学生证，否则将无法入住", {
                name: "我不是学生，重新查询价格",
                width: "200px",
                callback: function () {
                    history.go(-1)
                }
            }, {
                name: "我是学生，继续支付", width: "160px", callback: function () {
                    window.__SupressPromotionStudent = !0, $("#J_CommonPop").unmask(), $(".J_BtnSubmit").removeClass("disabled"), $(".J_BtnSubmit").trigger("click")
                }
            }, function () {
                $(".J_BtnSubmit").removeClass("disabled")
            }), !1) : (window.__SupressPromotionStudent = !1, !0)
        }, submitCoupon: function (o) {
            var e = this, i = n.insureinfo.cancelInsure || {planId: 0, companyId: "", productCode: 0}, t = n.pageParam,
                c = $.BizData.couponinfo, s = {
                    refGUID: n.refGUID,
                    insPlanID: i.planId.toString(),
                    insCompanyID: i.companyId,
                    insProductCode: i.productCode,
                    couponCode: o,
                    paymentterm: t.balancetype,
                    startTime: t.arrival,
                    endTime: t.departure,
                    roomCount: t.roomNumbers,
                    checkInDays: n.bookinfo.nights,
                    effectDays: c.effectDays,
                    totalPrice: n.priceinfo.TotalPrice
                }, c = $.BizData.couponinfo;
            o == c.oriOrderCouponCode && $.extend(s, {
                IsOriginOrderCouponCode: 1,
                OriginOrderPromotionID: c.oriOrderPromotionID
            }), a.find(".J_Loading").css("display", ""), $.ajax("Tool/AjaxValidateCoupon.aspx", {
                context: s,
                method: $.AJAX_METHOD_POST,
                onsuccess: function (o, n) {
                    if (n = n && $.parseJSON(n)) if (200 == n.code) {
                        var i = n.data && $.parseJSON(n.data);
                        $.BizData.pageParam.inputCashBackPromotionID = i.PromotionId, 2 == i.Type ? $.BizData.pageParam.inputCashBackPromotionMethod = "R" : $.BizData.pageParam.inputCashBackPromotionMethod = "I", common.callHotelAvail(function (o) {
                            e.inputCallBack(i, o), a.find(".J_Loading").css("display", "none")
                        }, function (o) {
                            e.errorCallBack(o), a.find(".J_Loading").css("display", "none")
                        }, !0), $.BizData.pageParam.inputCashBackPromotionID = 0, $.BizData.pageParam.inputCashBackPromotionMethod = ""
                    } else e.errorCallBack(n.message), a.find(".J_Loading").css("display", "none"); else e.errorCallBack($.BizData.ErrMsg.coupon_timeoutError), a.find(".J_Loading").css("display", "none")
                },
                onerror: function () {
                    e.errorCallBack($.BizData.ErrMsg.coupon_timeoutError), a.find(".J_Loading").css("display", "none")
                }
            })
        }, submit: function () {
            var o = this, n = $.BizData.inputValue;
            $.BizData.couponinfo && (n.UsingCouponCode = f.val(), n.OriginOrderCouponCode = $.BizData.couponinfo.oriOrderCouponCode, n.OriginOrderPromotionID = $.BizData.couponinfo.oriOrderPromotionID, n.RoomTicketGiftsIDs = $.BizData.couponinfo.RoomTicketGiftsIDs);
            var e = $.BizData.cashbackinfo;
            e && e.cashBackTotal > 0 && i.find(".J_useCoupon").prop("checked") && (n.useCash = Math.min(e.cashBackTotal, e.couponBalance)), e && (n.CashBackD = e.cashBackTotalD);
            var a = $.BizData.discountInfo;
            a && (n.prepayDiscountTotalAmount = a.PrepayDiscountTotalAmount, a.hasDidiQuan && $("#J_addPromoteCampagin").length > 0 && (n.HavePromoteForDidi = $("#J_addPromoteCampagin")[0].checked)), n.CouponAmount = o.CouponAmount, n.CouponBackAmount = o.CouponBackAmount
        }, foldSwitch: function (o) {
            common.toggle($("#J_DivDiscount .J_unfold")), common.toggle($("#J_DivDiscount .J_fold")), common.toggle($("#J_DivDiscount .J_tip i")), common.toggle($("#J_DivDiscount .J_couponList"), ["benefit_list_auto"])
        }, clickCallBack: function (o) {
            var n = this;
            priceInfo.refundList._couponcashback = 0, priceInfo.refresh();
            $.BizData.couponinfo;
            n.CouponAmount = 0, n.CouponBackAmount = 0, u.show(), p.hide(), "后返" == o.type ? (n.CouponBackAmount = o.amount, u.find(".J_couponAmtDesc").html("优惠券后返 <span class='text-orange'>&yen;" + o.amount + "</span> <a href='javascript:;' class='J_Coupon_Desc'>优惠说明</a> &nbsp;"), priceInfo.refundList._couponcashback = o.amount, priceInfo.refresh(), n.setVCoupon(0, o.code)) : (n.CouponAmount = o.amount, u.find(".J_couponAmtDesc").html("优惠券立减 <span class='text-orange'>&yen;" + o.amount + "</span> <a href='javascript:;' class='J_Coupon_Desc'>优惠说明</a> &nbsp;"), n.setVCoupon(o.amount, o.code)), common.bindHover($(".J_Coupon_Desc"), function (n) {
                return "<span>&nbsp;" + o.desc + "&nbsp;</span>"
            }), common.clearError(t)
        }, inputCallBack: function (o, n) {
            var e = this;
            priceInfo.refundList._couponcashback = 0, priceInfo.refresh();
            $.BizData.couponinfo;
            e.CouponAmount = 0, e.CouponBackAmount = 0, u.show(), p.hide();
            var i;
            2 == o.Type ? (i = n.couponAmount, e.CouponBackAmount = i, u.find(".J_couponAmtDesc").html("优惠券后返 <span class='text-orange'>&yen;" + i + "</span> <a href='javascript:;' class='J_Coupon_Desc'>优惠说明</a> &nbsp;"), priceInfo.refundList._couponcashback = i, priceInfo.refresh()) : (e.CouponAmount = o.CouponAmount, u.find(".J_couponAmtDesc").html("优惠券立减 <span class='text-orange'>&yen;" + o.CouponAmount + "</span> <a href='javascript:;' class='J_Coupon_Desc'>优惠说明</a> &nbsp;")), common.bindHover($(".J_Coupon_Desc"), function (n) {
                return "<span>&nbsp;" + o.Remark + "&nbsp;</span>"
            }), e.setVCoupon(o.CouponAmount, o.couponCode), common.clearError(t)
        }, errorCallBack: function (o) {
            var n = this;
            priceInfo.refundList._couponcashback = 0, priceInfo.refresh();
            $.BizData.couponinfo;
            n.setVCoupon(0), common.showError(t, o), u.hide(), p.show()
        }
    }, discountInfo = new DiscountInfo
}();
"use strict";

function GiftInfo() {
}

var giftInfo;
!function () {
    var i = jQuery;
    GiftInfo.prototype = {
        constructor: GiftInfo, wrap: i("#J_DivGiftBoxes"), init: function () {
            var i = this;
            i.refresh()
        }, refresh: function () {
            var t = this, n = $.BizData.giftinfo;
            if (!n || !(n.salesDesc && n.salesDesc.length > 0)) return void t.wrap.hide();
            t.wrap.show();
            var a = t.wrap.find(".J_giftbox");
            a.html(""), common.each(n.salesDesc, function (t, n) {
                a.append(i('<div class="gift_item"><div class="gift_item_tit"><span class="labels_onsale01">' + n.name + '</span></div><div class="gift_item_cont">' + n.value + "</div></div>"))
            })
        }, submit: function () {
            var i = $.BizData.inputValue, t = this.wrap.find(".J_HotelGroupVipId").val();
            t && t > 0 && (i.HotelGroupVipId = t)
        }
    }, giftInfo = new GiftInfo
}();
"use strict";
var cancelInsure, travelInsure, InsurePackage = $.BizMod.InitDisplayPackage(jQuery("#J_DivInsureInfo"));
InsurePackage.bindChild("InsurePackCancel", jQuery("#J_DivInsureInfo").find(".J_DivCancelInsure")), InsurePackage.bindChild("InsurePackTraval", jQuery("#J_DivInsureInfo").find(".J_DivTravelInsure")), function () {
    function e() {
    }

    var n = jQuery, r = $.BizData, a = r.insureinfo, i = n("#J_DivCancelInsure"), t = i.find(".J_insureType"),
        s = i.find(".J_InpName");
    e.prototype = {
        constructor: e, priceOri: 0, priceCny: 0, selector: null, init: function () {
            var e = this;
            e.selector = common.bindNumSelector(i.find(".J_NumSelector"), function (n) {
                var r = $.BizData.insureinfo && $.BizData.insureinfo.cancelInsure;
                if (0 == n) common.clearError(s), r && i.find(".J_tips").html(r.tipsUncheck), i.find(".J_agreeTerm").hide(), e.set(0, 0); else {
                    var a = e.priceCny;
                    r && i.find(".J_tips").html(r.tipsCheck), i.find(".J_agreeTerm").show(), e.set(n * a, n * e.priceOri)
                }
                submit.validateinputerror()
            }), e.selector.min = 0, e.selector.max = 1, s.val(r.inputValue.CancelinsureUserName), common.checkInput(s, function (n, a) {
                return e.selector.val > 0 && !a ? r.ErrMsg.cancelInsure : null
            }), common.bindSuggestor(i.find(".J_InpName"), r.residentList, function (e) {
                return '<div><div class="data_list_item">' + e.name + "&nbsp;&nbsp;&nbsp;&nbsp;</div></div>"
            }, function (e, n) {
                e.val(n.name), e.attr("data-id", n.id)
            }, {isNeedFilter: !1}), common.bindPop($("#J_cancelInsureLink"), $("#J_cancelInsurePop"), {}), common.bindPlaceHolder(), common.triggerPlaceHolder(), e.refresh()
        }, refresh: function (e) {
            var a = this;
            if (!a.showModule()) return !1;
            r = $.BizData, a.selector.init("T" == r.inputValue.CancelInsureFlg ? 1 : 0);
            var s = $.BizData.insureinfo && $.BizData.insureinfo.cancelInsure;
            t.html(s.title), s && (a.priceOri = s.priceOri, a.priceCny = s.priceCny), a.selector && a.selector.val > 0 ? a.set(a.priceCny, a.priceOri) : a.set(0, 0), s && $("#J_cancelInsurePop").find(".J_cancelAmountUppler").html(s.cancelAmountUppler), i.find(".J_unitPrice").html("<dfn>&yen;</dfn>" + a.priceCny + "/份"), a.selector.setValue(a.selector.val), e && (i.find(".J_InpName").unbind("focus"), common.bindSuggestor(i.find(".J_InpName"), r.residentList, function (e) {
                return '<div><div class="data_list_item">' + e.name + "&nbsp;&nbsp;&nbsp;&nbsp;</div></div>"
            }, function (e, n) {
                e.filter(".J_InpName").val(n.name), e.filter(".J_InpName").attr("data-id", n.id)
            }, {})), $("#J_cancelInsureLink").html(s.InsureName);
            var o = n("#J_cancelInsurePop");
            o.find(".J_insName").html(s.Name), o.find(".J_insDocName").html(s.DocName), o.find(".J_insDocUrl").attr("href", s.DocUrl), o.find(".J_insServicePhone").html(s.ServicePhone), o.find(".J_insNetService").html(s.NetService), s.BeiAn ? (o.find(".J_insBeiAn").html(s.BeiAn), o.find(".J_insBeiAn").parent().show(), o.find(".J_insRegiNo").parent().hide()) : (o.find(".J_insRegiNo").html(s.RegisterNo), o.find(".J_insRegiNo").parent().show(), o.find(".J_insBeiAn").parent().hide()), o.find(".J_insBranchCity").html(s.BranchCity), o.find(".J_InsureCtripName").html(s.InsureCtripName), o.find(".J_InsureAmountDesc").html(s.InsureAmountDesc), s.HCIFlg ? (o.find(".J_ContentPart1").css("display", ""), o.find(".J_ContentPart2").css("display", "none")) : (o.find(".J_ContentPart1").css("display", "none"), o.find(".J_ContentPart2").css("display", "")), o.find(".J_InsureDescContent").html(s.InsureDescContent)
        }, showModule: function () {
            return a = $.BizData.insureinfo, advancePayment && advancePayment.supressInsurance || !a || !a.cancelInsure || !a.cancelInsure.planId ? (InsurePackage.hideChild("InsurePackCancel"), cancelInsure.selector && cancelInsure.selector.setValue(0), !1) : (InsurePackage.showChild("InsurePackCancel"), !0)
        }, set: function (e, n) {
            var r = $.BizData.insureinfo && $.BizData.insureinfo.cancelInsure;
            i.find(".J_ins_lbl_price2").html("<dfn>&yen;</dfn>" + e), e ? (priceInfo.priceList.insureCancelPrice = {
                name: r.title,
                value: n
            }, priceInfo.priceDetail.insureCancelPrice = {
                name: r.title,
                data: "<div>RMB<span class='orange'>" + e + "</span></div>"
            }, priceInfo.priceRMBList.insureCancelPrice = {
                name: r.title,
                value: e
            }) : (delete priceInfo.priceList.insureCancelPrice, delete priceInfo.priceDetail.insureCancelPrice, delete priceInfo.priceRMBList.insureCancelPrice), priceInfo.refresh()
        }, validate: function () {
            return !(!a || !a.cancelInsure) && void (!this.selector || this.selector.val <= 0 || s.trigger("blur"))
        }, submit: function () {
            var e = $.BizData.inputValue;
            return !$.BizData.insureinfo.cancelInsure || !this.selector || this.selector.val <= 0 ? (e.CancelInsureFlg = "F", !1) : (e.CancelInsureFlg = "T", e.CancelinsureUserName = s.val(), void (e.CancelInsurePlanID = a.cancelInsure.planId))
        }
    }, cancelInsure = new e
}(), function () {
    function e() {
    }

    var n = jQuery, r = $.BizData, a = r.RegEx.rIDCard, i = r.insureinfo, t = n("#J_DivTravelInsure");
    e.prototype = {
        constructor: e, pulldown: null, selector: null, init: function () {
            var e = this;
            common.bindPop(t.find(".J_travelInsureLink"), $("#J_travelInsurePop"), {
                onShow: function () {
                    $("#J_TravInsureIframe").attr("src", $("#J_TravInsureIframe").attr("data-HtmRoot") + e.selectedInfo.productCode + ".htm")
                }
            }), e.selector = common.bindNumSelector(t.find(".J_NumSelector"), function (r) {
                0 == r ? (delete priceInfo.priceList.insureTravelPrice, delete priceInfo.priceDetail.insureTravelPrice, delete priceInfo.priceRMBList.insureTravelPrice, t.find(".J_tips").html(e.selectedInfo.tipsUncheck), t.find(".J_agreeTerm").hide()) : (priceInfo.priceList.insureTravelPrice = {
                    name: "出行意外险",
                    value: r * e.selectedInfo.priceOri
                }, priceInfo.priceDetail.insureTravelPrice = {
                    name: "出行意外险",
                    data: "<div>RMB<span class='orange'>" + r * e.selectedInfo.priceCny + "</span></div>"
                }, priceInfo.priceRMBList.insureTravelPrice = {
                    name: "出行意外险",
                    value: r * e.selectedInfo.priceCny
                }, t.find(".J_tips").html(e.selectedInfo.tipsCheck), t.find(".J_agreeTerm").show());
                var a = t.find(".J_travalInsureP");
                a.each(function (e, a) {
                    var i = n(a);
                    parseInt(i.attr("data-id"), 10) <= r ? i.removeClass("hidden") : i.addClass("hidden")
                }), submit.validateinputerror(), t.find(".J_ins_lbl_price2").html("<dfn>&yen;</dfn>" + r * e.selectedInfo.priceCny), priceInfo.refresh()
            }), e.selector.min = 0, e.selector.max = 0;
            var r = 0;
            $.BizData.inputValue.travalInsure && (r = $.BizData.inputValue.travalInsure.Count), e.selector.val = r, e.pulldown = common.bindPulldown(t.find(".J_travelInsurceKindSelect"), t.find(".J_travel_pop"), function () {
            }), e.refresh()
        }, hasTravelInsure: function () {
            return !!(this.selector && this.selector.val > 0)
        }, showInsureKind: function () {
            var e = this;
            t.find(".J_travelInsurcekind").html(e.selectedInfo.InsureName), t.find(".J_travelInsureLink").html(e.selectedInfo.InsureName), t.find(".J_unitPrice").html("<dfn>&yen;</dfn>" + e.selectedInfo.priceCny + "/份")
        }, showModule: function () {
            return i = $.BizData.insureinfo, advancePayment && advancePayment.supressInsurance || !i || !i.travelInsure ? (InsurePackage.hideChild("InsurePackTraval"), !1) : (InsurePackage.showChild("InsurePackTraval"), !0)
        }, refresh: function (e) {
            var i = this;
            if (!i.showModule()) return !1;
            r = $.BizData;
            var s = $.BizData.insureinfo && $.BizData.insureinfo.travelInsure;
            s && (i.selectedInfo = s[0], i.showInsureKind());
            for (var o = r.pageParam.roomNumbers * (1 + r.roominfo.personPerRoom || 1), l = i.selector.max, d = t.find(".J_travelInsurants"), c = o + 1; c <= l; c++) d.find(".J_travalInsureP:eq(i)").remove();
            for (var c = l + 1; c <= o; c++) {
                var u = n($.tmpl.render($("#J_tmplTravelInsurant").html(), {idx: c}));
                d.append(u);
                var f = u.find(".J_ContactPhone");
                common.bindSuggestor(f, $.BizData.contactList, function (e) {
                    return '<li class="data_list_item"><span class="name">' + e.cNName + '&nbsp;</span><span class="phone">' + e.mobilePhone + '</span><span class="area">+' + e.countryCode + "</span></li>"
                }, function (e, n) {
                    var r = getAreaInfo("", n.countryCode), a = e.parent().prev().find(".J_CountryCode");
                    a.attr("data-area", JSON.stringify(r)), a.val(r.Cn + "(+" + r.Code + ")"), a.trigger("blur"), e.val(n.mobilePhone), e.attr("data-contact", n.iD)
                }, {header: "常用联系人", isPage: !1, isNeedFilter: !1, style: "ul"});
                common.checkInput(f, function (e, n) {
                    var r, a, i = f.parent().prev().find(".J_CountryCode"),
                        t = $.parseJSON(i.attr("data-area")) || getAreaInfo(), s = "24px", o = t && t.Code || "86";
                    return "86" == o ? (r = $.BizData.RegEx.rMobile, a = $.BizData.ErrMsg.invoicemobilePhone_mainland, s = "48px") : "852" == o || "853" == o ? (r = $.BizData.RegEx.rHKMacaoMobile, a = $.BizData.ErrMsg.invoicemobilePhone_macaoHK) : "886" == o ? (r = $.BizData.RegEx.rTaiwanMobile, a = $.BizData.ErrMsg.invoicemobilePhone_taiwan) : (r = $.BizData.RegEx.rOverseaMobile, a = $.BizData.ErrMsg.invoicemobilePhone_oversea, s = "48px"), n && r.test(n) ? null : a
                });
                var v = u.find(".J_CountryCode"), p = $(v[0]), m = v.attr("data-area");
                null != m && "" != m || (m = '{"Code": 86,"Cn": "中国大陆","En": "China","Py": "ZHONG GUO DA LU","Country": "CN","Open": 1,"CountryId": "1","Heat": 100}'), v.selectCountryCode({
                    countryName: $.parseJSON(m).Cn,
                    countryCode: $.parseJSON(m).Code,
                    inputText: function (e) {
                        return e.cn + "(+" + e.code + ")"
                    },
                    onSelect: function (e) {
                        var n = Object();
                        for (var r in e) n[r.replace(/^\S/, function (e) {
                            return e.toUpperCase()
                        })] = e[r];
                        v.attr("data-area", JSON.stringify(n))
                    },
                    onBlur: function () {
                        p.trigger("blur")
                    }
                }), $(u[0]).find(".J_bday").regMod("calendar", "6.0", {
                    options: {
                        showOptions: !0,
                        showWeek: !1,
                        defaultDate: "1970-01-01",
                        minDate: "1900-01-01",
                        maxDate: "2020-02-01",
                        step: 1
                    }, listeners: {
                        onChange: function (e, n) {
                            $(e).trigger("blur")
                        }, onShow: function (e) {
                            $(e).parentNode().addClass("form_select_active")
                        }
                    }
                });
                var _ = $.BizData.ErrMsg;
                if (common.checkInput(u.find(".J_name"), function (e, n) {
                    return n.length <= 0 ? _.travalInsure_validateName1 : null
                }), common.checkInput(u.find(".J_idNumber"), function (e, r) {
                    var t = null;
                    if (r.length <= 0) return _.travalInsure_validateNumber1;
                    if (!a.test(r)) return _.travalInsure_validateNumber2;
                    if (common.getAgeByIdOrBirth(r) < 0) return _.travalInsure_validateNumber2;
                    if (common.getAgeByIdOrBirth(r) > 85) return _.travalInsure_validateNumber3;
                    var s = n(e).parents("#J_DivTravelInsure").find(".J_travalInsureP:not(.hidden)").find(".J_idNumber:not(.hidden)");
                    if (s.each(function (a, i) {
                        if (e !== i && n(i).val() === r) return t = _.travalInsure_validateNumber4, !1
                    }), !i.CalcAbove18()) return _.travalInsure_validateNumber5;
                    var o = n(e).parents("#J_DivTravelInsure").find(".J_travalInsureP:not(.hidden)").find(".J_bday, .J_idNumber");
                    return common.each(o, function (e, r) {
                        n(r).parent().find(".msg_error").text() === _.travalInsure_validateNumber5 && common.clearError(r)
                    }), t
                }), common.checkInput(u.find(".J_bday"), function (e, r) {
                    if (r.length <= 0) return _.travalInsure_validateBirthday1;
                    if (common.getAgeByIdOrBirth(r) < 0) return _.travalInsure_validateBirthday1;
                    if (common.getAgeByIdOrBirth(r) > 85) return _.travalInsure_validateNumber3;
                    if (!i.CalcAbove18()) return _.travalInsure_validateNumber5;
                    var a = n(e).parents("#J_DivTravelInsure").find(".J_travalInsureP:not(.hidden)").find(".J_bday, .J_idNumber");
                    return common.each(a, function (e, r) {
                        n(r).parent().find(".msg_error").text() === _.travalInsure_validateNumber5 && common.clearError(r)
                    }), null
                }), u.find(".J_bday").bind("blur", function (e) {
                    n(e.target).parent().parent().removeClass("form_select_active")
                }), common.checkInput(u.find(".J_passport"), function (e, r) {
                    var a = null;
                    if (r.length <= 0) return _.travalInsure_validatepassport1;
                    var i = n(e).parents("#J_DivTravelInsure").find(".J_travalInsureP:not(.hidden)").find(".J_passport:not(.hidden)");
                    return i.each(function (i, t) {
                        if (e != t && n(t).val() === r) return a = _.travalInsure_validatepassport2, !1
                    }), a
                }), u.find(".J_idType").bind("change", i.changeIdType), u.find(".J_idType").trigger("change"), common.bindSuggestor(u.find(".J_name"), $.BizData.residentList, function (e) {
                    return '<div><div class="data_list_item">' + e.name + "&nbsp;&nbsp;&nbsp;&nbsp;</div></div>"
                }, function (e, n) {
                    e.val(n.name), e.attr("data-id", n.id);
                    var r = e.parent().parent();
                    r.find(".J_idType").val(n.cardtype || "id").trigger("change"), r.find(".J_bday").val(n.birth), r.find(".J_genType").val(n.gender || "M"), r.find(".J_idNumber").val(n.cardvalue), r.find(".J_passport").val(n.passportvalue), common.triggerPlaceHolder(), r.find(".J_idNumber").trigger("blur"), r.find(".J_passport").trigger("blur")
                }, {isNeedFilter: !1}), common.bindPlaceHolder(), common.triggerPlaceHolder(), $.BizData.inputValue.travalInsure.Customs[c - 1]) {
                    var I = $.BizData.inputValue.travalInsure.Customs[c - 1];
                    console.log(I), u.find(".J_name").val(I.name), u.find(".J_ContactPhone").val(I.phone), u.find(".J_idType").val(I.id_passport).trigger("change"), u.find(".J_idNumber").val(I.id), u.find(".J_genType").val(I.gender), u.find(".J_passport").val(I.Passport), u.find(".J_bday").val(I.sbirth)
                }
            }
            var h = t.find(".J_travel_pop"), J = "<ul>", g = 0;
            s.forEach(function (e) {
                J += '<li class="data_list_item" style="text-align:center;" data-id="' + g + '"><span>' + e.InsureName + "</span></li>", g++
            }), J += "</ul>", h.html(J), h.find(".data_list_item").each(function (e, n) {
                $(n).bind("click", function (e) {
                    e && e.stopPropagation();
                    var n = this, r = n.getAttribute("data-id");
                    i.selectedInfo = s[r], i.showInsureKind(), i.pulldown.hidePulldown(), i.selector.setValue(i.selector.val)
                })
            }), i.selector.setMax(o)
        }, changeIdType: function (e) {
            var r = n(e.target).parents(".J_travalInsureP");
            "passport" == r.find(".J_idType").val() ? (r.find(".J_bday").parent().show(), r.find(".J_genderDiv").show(), r.find(".J_passportDiv").show(), r.find(".J_idDiv").hide(), r.find(".J_idNumber").addClass("hidden"), r.find(".J_bday").removeClass("hidden")) : (r.find(".J_bday").parent().hide(), r.find(".J_genderDiv").hide(), r.find(".J_passportDiv").hide(), r.find(".J_idDiv").show(), r.find(".J_idNumber").removeClass("hidden"), r.find(".J_bday").addClass("hidden"))
        }, validate: function () {
            if (!i || !i.travelInsure) return !1;
            var e = t.find(".J_travalInsureP");
            common.each(e, function (e, n) {
                var r = $(n);
                r.hasClass("hidden") || (r.find(".J_name").trigger("blur"), r.find(".J_idType").trigger("blur"), r.find(".J_idNumber").trigger("blur"), r.find(".J_bday").trigger("blur"), r.find(".J_passport").trigger("blur"), r.find(".J_ContactPhone").trigger("blur"))
            })
        }, CalcAbove18: function () {
            var e = !1, r = t.find(".J_travalInsureP:not(.hidden)");
            if (!r || r.length <= 0) return !0;
            common.getAgeId;
            return common.each(r, function (r, a) {
                try {
                    var i;
                    if (i = "id" == n(a).find(".J_idType").val() ? n(a).find(".J_idNumber").val() : n(a).find(".J_bday").val(), i.length <= 0 || common.getAgeID(i) >= 18) return e = !0, !1
                } catch (t) {
                    return e = !0, !1
                }
            }), e
        }, submit: function () {
            var e = this, r = $.BizData.inputValue, a = e.selector.val;
            if (!a || a <= 0 || !$.BizData.insureinfo.travelInsure) return r.travalInsure.Count = 0, !1;
            r.travalInsure.Count = a, r.travalInsure.InsPlanID = e.selectedInfo.planId;
            var i = t.find(".J_travalInsureP:not(.hidden)");
            r.travalInsure.Customs = [], common.each(i, function (e, a) {
                var i = {
                    name: n(a).find(".J_name").val(),
                    id_passport: n(a).find(".J_idType").val() || "id",
                    phone: n(a).find(".J_ContactPhone").val() || n("#J_DivCustomInfo").find(".J_InpMobile").val(),
                    area: n(a).find(".J_CountryCode").val() || n("#J_DivCustomInfo").find(".J_CountryCode").val()
                };
                "passport" == i.id_passport ? (i.sbirth = n(a).find(".J_bday").val(), i.gender = n(a).find(".J_genType").val(), i.Passport = n(a).find(".J_passport ").val()) : i.id = n(a).find(".J_idNumber").val(), r.travalInsure.Customs.push(i)
            })
        }
    }, travelInsure = new e
}();
"use strict";

function InvoiceInfo() {
}

var invoiceInfo;
!function () {
    var e = jQuery, i = $.BizData, n = i.RegEx, a = i.ErrMsg, t = e("#J_DivInvoiceInfo"), o = t.find(".J_needInvoiceE"),
        r = t.find(".J_invoiceETitle"), c = t.find(".J_invoiceEEmail"), l = t.find(".J_invoiceETaxpayer"),
        s = t.find(".J_InpMobile"), v = t.find(".J_CountryCode"), d = t.find(".J_Province"), p = t.find(".J_City"),
        u = t.find(".J_District"), m = t.find(".J_Invoice_UserAddress"), f = t.find(".invoiceTargetType"),
        _ = t.find("#ElecInvoice"), I = t.find("#PaperInvoice"), g = t.find(".invoice_paper"),
        y = t.find("input[name='EmsTypeRadio']"), h = t.find("#SpecialInvoice"),
        J = (t.find("#EmsTypePay"), t.find("#J_NoSpecialInvoice")), T = t.find("#J_SpecialInvoice_Div"),
        b = T.find(".J_CompanyName"), E = T.find(".J_CompanyAddress"), C = T.find(".J_CompanyPhone"),
        k = T.find(".J_CompanyBankName"), P = T.find(".J_CompanyBankAcount"), x = T.find(".J_Invoice_TaxpayerNumber"),
        D = t.find(".invoice_note");
    InvoiceInfo.prototype = {
        constructor: InvoiceInfo, valInited: {}, init: function () {
            var e = this;
            e.bindEvents(), e.refresh(!0), e.pccInit($(d[0]), $(p[0]), $(u[0]))
        }, pccInit: function (e, i, n) {
            var a = "Tool/GetAddressListHandler.ashx";
            return new $.Pcc({dataApi: a, province: e, city: i, canton: n})
        }, refreshPrice: function () {
            delete priceInfo.priceList.InvoicePrice, delete priceInfo.priceDetail.InvoicePrice, o.prop("checked") && (2 == f.val() || 0 == f.val()) && e("#EmsChargeRadio").prop("checked") && (priceInfo.priceList.InvoicePrice = {
                name: "配送费",
                value: 10
            }, priceInfo.priceDetail.insureCancelPrice = {
                name: "配送费",
                data: "<div>RMB<span class='orange'>10</span></div>"
            }), priceInfo.refresh()
        }, refreshIvoiceBody: function () {
            var e = addOption.hasAddOption();
            $("#J_DivInvoiceInfo .J_invoiceBody").html(e ? "旅游服务费" : "代订住宿费")
        }, refresh: function (n) {
            i = $.BizData;
            var a = this, g = $.BizData.invoiceinfo;
            if (1 == $.BizData.bookinfo.nights && $.BizData.pageParam.isSelectSWFF) return t.find(".J_invoiceTip").html("<i class='icons-attention16'></i>不可开发票"), t.find(".J_invoiceTip").show(), t.find(".J_invoiceCheck").hide(), void t.find(".J_invoiceCont").hide();
            var y = !1, J = !1, T = !1;
            if (g.IsShowInvoice) {
                var D = "<i class='icons-attention16'></i>";
                g.IsShowInvoiceReserve ? (D += "暂不预约？ 订单确认后至离店当日12点前，可在订单详情中操作预约。离店当天向酒店前台索取发票 。", J = !0) : (D += "可开具电子发票,", y = !0, g.IsSpecialMunicipality || (D += "纸质发票,", J = !0), g.IsHasSpecialInvoice && !g.IsSpecialMunicipality && (D += "增值税专用发票,", T = !0), D += "订单成交后可补开。"), t.find(".J_invoice2Tip2").html(D)
            }
            if (g.IsShowInvoice && (y || J || T)) {
                if (!a.valInited.part1) {
                    a.valInited.part1 = !0;
                    var R = i.inputValue;
                    R.AskForInvoice ? (o.prop("checked", "checked"), r.val(R.Invoice_Head), c.val(R.Invoice_Email), l.val(R.TaxpayerNumber), t.find(".J_invoiceRecipient").val(R.Invoice_RevPerName), s.val(R.Invoice_RevPerPhone), v.val(R.Invoice_RevPerPhoneArea), d.val(R.Invoice_RevPerProvince), p.val(R.Invoice_RevPerCity), u.val(R.Invoice_RevPerCanton), m.val(R.Invoice_Address), b.val(R.CompanyName), E.val(R.CompanyAddress), C.val(R.CompanyPhone), k.val(R.CompanyBankName), P.val(R.CompanyBankAcount), x.val(R.TaxpayerNumber), R.Invoice_IsContainOrderDetail && t.find(".J_invoiceDetailed").prop("checked", "checked")) : c.val(R.ContactEmail)
                }
                if (g.isEmsTypeFree ? (t.find(".J_lblEmsTypeFree").css("display", ""), t.find(".J_lblEmsTypeIntegration").css("display", "none"), t.find(".J_lblEmsTypeCharge").css("display", "none")) : (t.find(".J_lblEmsTypeFree").css("display", "none"), g.isEmsTypeCharge ? (e("#EmsChargeRadio").next().html("<dfn>&yen;</dfn><strong class='orange'>" + g.EmsTypeChargePrice + "</strong>"), t.find(".J_lblEmsTypeCharge").css("display", "")) : t.find(".J_lblEmsTypeCharge").css("display", "none"), g.isEmsTypeIntegration ? (g.EmsTypeIntegrationTotalUserExperience >= g.EmsTypeIntegrationPrice ? (e("#EmsIntegrationRadio").next().html("<span>" + g.EmsTypeIntegrationPrice + "积分</span>"), e("#EmsIntegrationRadio").attr("disabled", !1)) : (e("#EmsIntegrationRadio").next().html("<span>积分不足" + g.EmsTypeIntegrationPrice + "，无法兑换</span>"), e("#EmsIntegrationRadio").attr("disabled", "disabled")), t.find(".J_lblEmsTypeIntegration").css("display", ""), !a.valInited.part2 && (a.valInited.part2 = !0, e("#EmsIntegrationRadio").attr("checked", "checked"))) : t.find(".J_lblEmsTypeIntegration").css("display", "none")), g.IsShowInvoiceReserve ? t.find(".J_needInvoiceESpan").html("预约酒店开票，为您节省等待时间。") : t.find(".J_needInvoiceESpan").html("需要发票"), _.css("display", "none"), I.css("display", "none"), h.css("display", "none"), T && (h.css("display", ""), !a.valInited.part3 && (a.valInited.part3 = !0, h.trigger("click"))), J && (I.css("display", ""), !a.valInited.part4 && (a.valInited.part4 = !0, I.trigger("click"))), y && (_.css("display", ""), !a.valInited.part5 && (a.valInited.part5 = !0, _.trigger("click"))), !a.valInited.part6) {
                    a.valInited.part6 = !0, T && $.BizData.inputValue && "2" == $.BizData.inputValue.InvoiceTatgeType && h.trigger("click"), J && $.BizData.inputValue && "0" == $.BizData.inputValue.InvoiceTatgeType && I.trigger("click"), y && $.BizData.inputValue && ("1" != $.BizData.inputValue.InvoiceTatgeType && null != $.BizData.inputValue.InvoiceTatgeType && "" != $.BizData.inputValue.InvoiceTatgeType || _.trigger("click"));
                    var B = $.BizData.inputValue.InvoiceTitleType;
                    (B > 2 || B < 0) && (B = 0), t.find(".invoice_type_item").removeClass("current"), t.find(".invoice_type_item[data-value=" + B + "]").addClass("current"), e("#J_invoice_type .invoice_type_item.current").trigger("click")
                }
                t.find(".J_invoiceType").html("发票信息"), t.find(".J_invoiceCheck").show(), t.find(".J_invoiceTip").hide()
            } else {
                t.find(".J_invoiceCheck").hide(), o.prop("checked", ""), t.find(".J_invoiceType").html("报销凭证");
                var S;
                S = "FG" == i.pageParam.balancetype ? i.invoiceinfo.NoinvoiceDesc ? i.invoiceinfo.NoinvoiceDesc : "如需房费发票，可向酒店前台索取；如需保险发票，可向保险公司索取（保险公司联系信息会在投保后短信通知您）。" : "如需要发票，可向酒店索取；如需保险发票，可致电保险公司索取（保险公司联系信息会在投保后短信通知您）。", t.find(".J_invoiceTip").html("<i class='icons-attention16'></i>" + S), t.find(".J_invoiceTip").show()
            }
            o.trigger("blur"), this.refreshIvoiceBody(), common.bindPlaceHolder(), common.triggerPlaceHolder(), a.setStatus && a.setStatus(f.val())
        }, setStatus: null, bindEvents: function () {
            var R = this;
            common.bindSuggestor(t.find(".J_invoiceRecipient"), $.BizData.receiverInfo, function (e) {
                var i = e.split("|");
                return '<li class="data_list_item"><span class="name">' + i[0] + '</span><span class="phone">' + i[3] + '</span><span class="addressSpan">' + i[4] + "&nbsp;" + i[5] + "&nbsp;" + i[6] + "&nbsp;" + i[2] + "</span></li>"
            }, function (e, i) {
                var n = i.split("|");
                t.find(".J_invoiceRecipient").val(n[0]), t.find(".J_invoiceRecipient").trigger("blur"), d.val(n[4]), p.val(n[5]), u.val(n[6]), m.val(n[2]), m.trigger("blur");
                var a = /[0-9]+/, o = n[7] ? n[7].trim("+") : "86";
                if (a.test(o)) {
                    var r = o.match(a), c = getAreaInfo("", r[0]);
                    v.attr("data-area", JSON.stringify(c)), v.val(c.Cn + "(+" + c.Code + ")")
                }
                s.val(n[3]), s.trigger("blur")
            }, {
                isNeedFilter: !1,
                style: "ul",
                styleCss: "width:500px;"
            }), common.bindSuggestor(e(".J_invoiceETitle,.J_invoiceETaxpayer"), $.BizData.invoicetitlelist, function (e) {
                return "<div><div class=\"data_list_item\"><ul><li style='float:left;text-align:left;width: 155px;text-overflow: ellipsis;overflow: hidden;display: inline-block;white-space: nowrap;'>" + e.title + "</li><li style='float:right;'>" + e.taxpayer + "</li></div></div>"
            }, function (e, i) {
                e.filter(".J_invoiceETitle").val(i.title), e.filter(".J_invoiceETaxpayer").val(i.taxpayer)
            }, {
                isNeedFilter: !1,
                styleCss: "width: 418px;"
            }), common.bindSuggestor(e(".J_CompanyName"), $.BizData.invoicetitlelist, function (e) {
                return '<div><div class="data_list_item">' + e.title + "&nbsp;&nbsp;&nbsp;&nbsp;</div></div>"
            }, function (e, i) {
                b.val(i.title), E.val(i.caddress), C.val(i.ctel), k.val(i.bname), P.val(i.baccount), x.val(i.taxpayer), b.trigger("blur"), E.trigger("blur"), C.trigger("blur"), k.trigger("blur"), P.trigger("blur"), x.trigger("blur")
            }, {
                NoBindInput: !0,
                isNeedFilter: !1
            }), e(".J_invoiceETitle,.J_invoiceETaxpayer").bind("input", function (i) {
                var n = e(i.target).val();
                n.length >= 4 && $.ajax("Tool/AjaxGetCustTaxnrByCustName.aspx", {
                    context: {query: n},
                    method: $.AJAX_METHOD_POST,
                    onsuccess: function (i, n) {
                        var a = n && $.parseJSON(n);
                        if (a && 200 == a.code) {
                            var t = a.data && $.parseJSON(a.data);
                            t.length > 0 && (e(".J_pop").hide(), common.showSpecilSuggestor(e(".J_invoiceETitle,.J_invoiceETaxpayer"), t, function (e) {
                                return '<div><div class="data_list_item">' + e.CustName + "&nbsp;&nbsp;&nbsp;&nbsp;</div></div>"
                            }, function (e, i) {
                                e.filter(".J_invoiceETitle").val(i.CustName), e.filter(".J_invoiceETaxpayer").val(i.CustTaxNr)
                            }))
                        }
                    }
                })
            }), y.bind("click", function (e) {
                R.refreshPrice(), creditExchange.onSelectChange()
            }), R.setStatus = function (e) {
                var n = $.BizData.invoiceinfo;
                if (f.val(e), R.refreshPrice(), 1 == e || 0 == e) {
                    J.removeClass("hidden"), T.addClass("hidden");
                    var a = t.find(".J_elecInvoieDiv");
                    1 == e ? a.removeClass("hidden") : 0 == e && a.addClass("hidden")
                } else 2 == e && (J.addClass("hidden"), T.removeClass("hidden"));
                g.addClass("hidden"), 0 != e && 2 != e || n.IsShowInvoiceReserve || g.removeClass("hidden"), n.IsShowInvoiceReserve ? (t.find(".J_invoiceDetailed").parent().parent().parent().css("display", "none"), t.find(".J_InvoiceReserveInfo").css("display", ""), t.find(".J_InvoiceReserveInfoYMD").html(n.DepatureYMD)) : (t.find(".J_invoiceDetailed").parent().parent().parent().css("display", ""), t.find(".J_InvoiceReserveInfo").css("display", "none"));
                var o = "<i></i>";
                n.IsShowInvoiceReserve ? o += "如需保险发票，请联系保险公司索取（保险公司联系信息会在投保后短信通知您）。发票金额不包括礼品卡及优惠券支付的部分。<br/>" : (o += n.IsInvoiceBySupplier ? "房费发票由供应商提供。您的订单包含附加产品时，订单升级为旅游套餐订单，开票内容统一为“旅游服务费”。<br/>" : "您的订单包含附加产品时，订单升级为旅游套餐订单，开票内容统一为“旅游服务费”。<br/>", 1 == e && (o += "保险发票由保险公司开具，预计在离店后3个工作日内，通过邮件或短信的方式发送给您。<br/>"), 0 == e && (o += "保险发票由保险公司开具，预计在离店后7个工作日左右寄送给您。 <br/>"), 2 == e && (o += "如需保险发票，可致电保险公司索取（保险公司联系信息会在投保后短信通知您）。<br/>"), o += "所有发票金额不包含使用礼品卡、积分抵扣以及使用部分优惠金额。<br/>"), 1 == i.invoiceinfo.InvoiceTargetType && (o += "住宿预订服务由携程旅行网旗下全资子公司上海赫程国际旅行社有限公司及其分公司提供。"), "PP" != i.pageParam.balancetype ? t.find(".J_InvoiceTargetType").html("酒店") : 1 == i.invoiceinfo.InvoiceTargetType ? t.find(".J_InvoiceTargetType").html("上海赫程国际旅行社有限公司或其分公司") : 2 == i.invoiceinfo.InvoiceTargetType ? t.find(".J_InvoiceTargetType").html("酒店") : 4 == i.invoiceinfo.InvoiceTargetType ? 1 == e ? t.find(".J_InvoiceTargetType").html("供应商") : t.find(".J_InvoiceTargetType").html("上海赫程国际旅行社有限公司或其分公司") : t.find(".J_InvoiceTargetType").html(""), D.html(o), creditExchange.onSelectChange()
            }, t.find("#J_InvoiceTatgeType_dt").bind("click", function () {
                $("#J_Invoice_Rule").css("display", ""), $("#J_Invoice_Rule").mask()
            }), e("#J_Invoice_Rule").find(".J_close").bind("click", function () {
                $("#J_Invoice_Rule").css("display", "none"), $("#J_Invoice_Rule").unmask()
            });
            var B = common.bindPulldown(t.find(".J_InvoiceKind"), t.find(".J_InvoiceKindList"), function () {
            });
            _.bind("click", function () {
                R.setStatus(1), t.find(".J_InvoiceKindSelected").html(_.html()), B.hidePulldown()
            }), I.bind("click", function () {
                R.setStatus(0), t.find(".J_InvoiceKindSelected").html(I.html()), B.hidePulldown()
            }), h.bind("click", function () {
                R.setStatus(2), t.find(".J_InvoiceKindSelected").html(h.html()), B.hidePulldown()
            });
            var S = function () {
                o.prop("checked") ? t.find(".J_invoiceCont").css("display", "") : (t.find(".J_invoiceCont").css("display", "none"), submit.validateinputerror()), R.refreshPrice(), creditExchange.onSelectChange()
            };
            o.bind("click", S), o.bind("blur", S), e("#J_invoice_type .invoice_type_item").bind("click", function () {
                $(this).hasClass("current") || ($("#J_invoice_type .current").removeClass("current"), $(this).addClass("current"), $("#J_taxpayer_panel .form_item_error").removeClass("form_item_error"));
                var e = $(this).attr("data-value");
                1 == e ? $("#J_taxpayer_panel").css("display", "") : $("#J_taxpayer_panel").css("display", "none"), o.css("z-index", 0), submit.validateinputerror()
            }), common.checkInput(t.find(".J_invoiceRecipient"), function (e, i) {
                return null != i && "" != i ? null : "请填写收件人姓名"
            }), common.checkInput(r, function (i, n) {
                n = n.replace(/^ +| +$/g, "");
                var t = e(i).attr("data-illegal");
                return 0 == n.length || 2 == n.length && t.indexOf(n) != -1 ? a.invoice_title : null
            }), common.checkInput(c, function (e, i) {
                return n.rEmail.test(i) ? null : a.invoice_email
            }), common.checkInput(l, function (i, t) {
                var o = e("#J_invoice_type .current").attr("data-value");
                return 1 == o && 0 == t.length ? a.invoice_taxpayer : t.length > 0 && (16 == t.length || 19 == t.length || !n.rTaxpayor.test(t)) ? a.invoice_taxpayer : null
            }), common.checkInput(b, function (e, i) {
                return null == i || "" == i ? a.invoice_CompanyName : null
            }), common.checkInput(E, function (e, i) {
                return null == i || "" == i ? a.invoice_CompanyName : null
            }), common.checkInput(P, function (e, i) {
                return null != i && "" != i ? null : a.invoice_CompanyBankAcount
            }), common.checkInput(k, function (e, i) {
                return null == i || "" == i ? a.invoice_CompanyBankName : null
            }), common.checkInput(x, function (e, i) {
                return i.length > 0 && (16 == i.length || 19 == i.length || !n.rTaxpayor.test(i)) ? a.invoice_taxpayer : null
            }), common.checkInput(m, function (e, i) {
                var n = d.val(), a = p.val();
                return null != n && null != a && "" != n && "" != a && i && "" != i ? i && $.BizData.RegEx.iAddress.test(i) ? null : $.BizData.ErrMsg.invoiceAddressRight : $.BizData.ErrMsg.invoiceAddress
            }), common.checkInput(s, function (e, i) {
                var n, a, t = $.parseJSON(v.attr("data-area")) || getAreaInfo(), o = "24px", r = t && t.Code || "86";
                return "86" == r ? (n = $.BizData.RegEx.rMobile, a = $.BizData.ErrMsg.invoicemobilePhone_mainland, o = "48px") : "852" == r || "853" == r ? (n = $.BizData.RegEx.rHKMacaoMobile, a = $.BizData.ErrMsg.invoicemobilePhone_macaoHK) : "886" == r ? (n = $.BizData.RegEx.rTaiwanMobile, a = $.BizData.ErrMsg.invoicemobilePhone_taiwan) : (n = $.BizData.RegEx.rOverseaMobile, a = $.BizData.ErrMsg.invoicemobilePhone_oversea, o = "48px"), i && n.test(i) ? null : a
            }), $.mod.load("emailPrompt", "1.0", function () {
                $("#J_DivInvoiceInfo").find(".J_invoiceEEmail").regMod("emailPrompt", "1.0", {
                    listeners: {
                        onHide: function (e) {
                            $.BizData.RegEx.rEmail.test(e) && (common.clearError(this.$node), submit.validateinputerror())
                        }
                    }
                })
            })
        }, validate: function () {
            if (o.prop("checked")) {
                var i = f.val();
                r.trigger("blur"), 2 != i && 1 == e("#J_invoice_type .current").attr("data-value") && l.trigger("blur"), 1 == i ? c.trigger("blur") : 0 != i && 2 != i || (2 == i && (b.trigger("blur"), E.trigger("blur"), k.trigger("blur"), P.trigger("blur"), x.trigger("blur")), t.find(".J_invoiceRecipient").trigger("blur"), s.trigger("blur"), m.trigger("blur"))
            }
        }, submit: function () {
            var i = $.BizData.inputValue;
            if ("PP" != $.BizData.pageParam.balancetype || !o.prop("checked")) return void (i.AskForInvoice = !1);
            i.AskForInvoice = !0;
            var n = f.val();
            i.InvoiceTatgeType = n, 0 == n || 2 == n ? (i.Invoice_RevPerName = t.find(".J_invoiceRecipient").val().trim(), i.Invoice_RevPerPhoneArea = v.val().trim(), i.Invoice_RevPerPhone = s.val().trim(), i.Invoice_RevPerProvince = d.val().trim(), i.Invoice_RevPerCity = p.val().trim(), i.Invoice_RevPerCanton = u.val().trim(), i.Invoice_Address = m.val().trim(), i.Invoice_InvoiceType = t.find("input[name='EmsTypeRadio']:checked").val(), 2 == n && (i.CompanyName = b.val(), i.CompanyAddress = E.val(), i.CompanyPhone = C.val(), i.CompanyBankName = k.val(), i.CompanyBankAcount = P.val(), i.TaxpayerNumber = x.val())) : 1 == n && (i.Invoice_Email = c.val()), 1 != n && 0 != n || (i.Invoice_Body = e(".J_invoiceBody").html(), i.Invoice_Head = r.val(), 1 == e("#J_invoice_type .current").attr("data-value") ? i.TaxpayerNumber = l.val() : i.TaxpayerNumber = "", i.InvoiceTitleType = e("#J_invoice_type .current").attr("data-value")), i.Invoice_IsContainOrderDetail = t.find(".J_invoiceDetailed").prop("checked")
        }
    }, invoiceInfo = new InvoiceInfo
}();
!function (t) {
    function a(t) {
        this.dataApi = t.dataApi, this.province = t.province, this.city = t.city, this.canton = t.canton, this.init()
    }

    t.extend(a.prototype, {
        inited: !1, container: void 0, getData: function (a, e) {
            var n, i = {};
            return i.action = a, e && (i.id = e), t.ajax(this.dataApi, {
                method: cQuery.AJAX_METHOD_POST,
                async: !1,
                context: i,
                onsuccess: function (t) {
                    n = t.responseText
                }
            }), n
        }, initStyle: function () {
            var t = ".pcc_box { width: 258px; max-height: 312px; padding: 10px; display: none; position: absolute; border: 1px solid #999; overflow-y: auto; z-index: 1000; background-color: #fff; }.pcc_box a { color: #0066cc; font-size: 12px; display: inline-block; float: left; width: 68px; padding: 0 5px; border: 1px solid #fff; line-height: 22px; text-decoration: none; }.pcc_box a:hover { background-color: #E8F4FF; border-color: #acccef; }",
                a = document.createElement("style");
            a.setAttribute("type", "text/css"), (document.getElementsByTagName("head")[0] || document.body).appendChild(a), a.styleSheet ? a.styleSheet.cssText = t : a.appendChild(document.createTextNode(t))
        }, initContainer: function () {
            var t = document.createElement("div");
            t.className = "pcc_box", document.body.appendChild(t), this.container = t
        }, showPccBox: function (a, e) {
            var n = '{{each(index, value) $data}}<a data-id="${value.split("|")[0]}" href="javascript:;">${value.split("|")[1]}</a>{{/each}}';
            this.container.innerHTML = t.tmpl.render(n, a.split("@")), this.container.style.cssText = "display: block; top: " + (e.top + 28) + "px; left: " + e.left + "px;"
        }, getPccId: function (t, a) {
            var e = new RegExp("(\\d+)\\|" + a), n = t.match(e) || [];
            return n[1]
        }, bindEvent: function () {
            var a = this, e = a.province, n = a.city, i = a.canton, o = a.container, c = !1;
            e.bind("focus", function () {
                a.provinceData && (a.showPccBox(a.provinceData, e.offset()), t(o).find("a").bind("mousedown", function (t) {
                    t.stop();
                    var o = this.innerHTML, d = this.getAttribute("data-id"), s = o !== e.attr("data-last-value");
                    e.value(o), e.attr("data-last-value", o), c = !1, s ? (a.cityData = void 0, a.cantonData = void 0, n.value(""), i.value(""), a.cityData = a.getData("GetCitys", d), n[0].focus()) : n[0].focus()
                }))
            }), n.bind("focus", function () {
                var s = e.value(), r = e.attr("data-last-value");
                if (s && r && s != r) {
                    var l = a.getPccId(a.provinceData, s);
                    a.cityData = a.getData("GetCitys", l), e.attr("data-last-value", s)
                }
                if (!a.cityData && s) {
                    var l = a.getPccId(a.provinceData, s);
                    a.cityData = a.getData("GetCitys", l)
                }
                a.showPccBox(a.cityData, n.offset()), t(o).find("a").bind("mousedown", function (t) {
                    t.stop();
                    var e = this.innerHTML, o = this.getAttribute("data-id"), s = e !== n.attr("data-last-value");
                    n.value(e), n.attr("data-last-value", e), c = !1, s ? (a.cantonData = void 0, i.value(""), a.cantonData = a.getData("GetCantons", o), a.cantonData ? (i.css("visibility", ""), i[0].focus()) : (i.css("visibility", "hidden"), d())) : (d(), "hidden" != i.css("visibility") && i[0].focus())
                })
            }), i.bind("focus", function () {
                var s = e.value(), r = e.attr("data-last-value"), l = n.value(), u = n.attr("data-last-value");
                if (l && u && l != u) {
                    if (s && r && s != r) {
                        var v = a.getPccId(a.provinceData, s);
                        a.cityData = a.getData("GetCitys", v), e.attr("data-last-value", s)
                    }
                    var p = a.getPccId(a.cityData, l);
                    a.cantonData = a.getData("GetCantons", p), n.attr("data-last-value", l)
                }
                if (!a.cantonData && l) if (a.cityData) {
                    var p = a.getPccId(a.cityData, l);
                    a.cantonData = a.getData("GetCantons", p)
                } else {
                    var s = e.value(), v = a.getPccId(a.provinceData, s);
                    a.cityData = a.getData("GetCitys", v);
                    var p = a.getPccId(a.cityData, l);
                    a.cantonData = a.getData("GetCantons", p)
                }
                a.showPccBox(a.cantonData, i.offset()), t(o).find("a").bind("mousedown", function (t) {
                    t.stop(), i.value(this.innerHTML), c = !1, d()
                })
            });
            var d = function () {
                c || (o.style.display = "none")
            }, s = function (t) {
                t.stop(), window.event && (window.event.returnValue = !1), c = !0
            };
            e.bind("blur", d), n.bind("blur", d), i.bind("blur", d), t(o).bind("mousedown", s), t("body").bind("mousedown", function (t) {
                o.style.display = "none"
            })
        }, init: function () {
            var t = this;
            t.inited || (t.initStyle(), t.initContainer(), t.inited = !0), t.bindEvent(), t.provinceData = t.getData("GetProvinces", "")
        }
    }), t.Pcc = a
}(cQuery);
"use strict";

function pageRefresh(a) {
    $.BizData.refGUID = a.refGUID, $.BizData.roominfo = a.roominfo, $.BizData.hyattMember = a.hyattMember, $.BizData.priceinfo = a.priceinfo, $.BizData.bookinfo = a.bookinfo, $.BizData.advancePayment = a.advancePayment, $.BizData.custominfo = a.custominfo, $.BizData.addoption = a.addoption, $.BizData.tipsinfo = a.tipsinfo, $.BizData.creditExchange = a.creditExchange, $.BizData.giftinfo = a.giftinfo, $.BizData.insureinfo = a.insureinfo, $.BizData.discountInfo = a.discountInfo, $.BizData.cashbackinfo = a.cashbackinfo, $.BizData.couponinfo = a.couponinfo, $.BizData.invoiceinfo = a.invoiceinfo, $.BizData.otherCommInfo = a.otherCommInfo, $.BizData.submitinfo = a.submitinfo, $.BizData.tracklog = a.tracklog, $.BizData.vsCreateOrderParam = a.vsCreateOrderParam;
    var i = !1;
    !$.BizData.isLogin && a.isLogin && (i = !0), $.BizData.isLogin = a.isLogin, $.BizData.minDate = a.minDate, roomInfo.refresh(), hyattInfo.refresh(i), priceInfo.refresh(), bookInfo.refresh(), customInfo.refresh(i), creditExchange.refresh(), cancelInsure.refresh(i), travelInsure.refresh(i), addOption.refresh(), tipsInfo.refresh(), tipsbInfo.refresh(), giftInfo.refresh(), invoiceInfo.refresh(i), discountInfo.refresh(i), advancePayment.refresh(), submit.refresh(), function o() {
        var a = window, i = new Date;
        if (a.$_bf && window.$_bf.loaded === !0) {
            var t = $.BizData.tracklog.ChildNum, n = t && t.split("-") || [], e = n[0] || "0", c = n.length - 1,
                r = n[1] || "0", s = n[2] || "0", f = n[3] || "0";
            window.$_bf.tracklog("intlhotel.booking", "UID=${duid}&page_id=${page_id}&VERSION=1&" + $.BizData.tracklog.EDMTrackData), window.$_bf.tracklog("intlhotel.list", "VERSION=2&abvalue=A&mnum=" + e + "&cnum=" + c + "&ch1=" + r + "&ch2=" + s + "&ch3=" + f), window.__bfi.push(["_tracklog", "hotel_oversea_booking_basic_online", $.stringifyJSON($.extend({
                brand: "",
                roomnum: "",
                bookable_cx: "1",
                loadtime: i - $.BizData.pageLoadTime
            }, $.BizData.tracklog.infomationData))])
        } else setTimeout(o, 30)
    }()
}

function userInfoRefresh(a) {
    $.BizData.contactList = $.parseJSON(a.contactList), $.BizData.residentList = $.parseJSON(a.residentList), $.BizData.invoicetitlelist = a.invoicetitlelist, $.BizData.receiverInfo = $.parseJSON(a.receiverInfo), customInfo.refresh(!0), hyattInfo.refresh(), cancelInsure.refresh(!0), travelInsure.refresh(!0), addOption.refresh(), invoiceInfo.refresh(!0), advancePayment.refresh()
}

$.ready(function () {
    var a = store && store.read($("#J_storeGuid").value());
    a && ($.BizData.refGUID = a.refGUID, $.BizData.roominfo = a.roominfo, $.BizData.hyattMember = a.hyattMember, $.BizData.priceinfo = a.priceinfo, $.BizData.bookinfo = a.bookinfo, $.BizData.advancePayment = a.advancePayment, $.BizData.custominfo = a.custominfo, $.BizData.addoption = a.addoption, $.BizData.tipsinfo = a.tipsinfo, $.BizData.creditExchange = a.creditExchange, $.BizData.giftinfo = a.giftinfo, $.BizData.insureinfo = a.insureinfo, $.BizData.discountInfo = a.discountInfo, $.BizData.cashbackinfo = a.cashbackinfo, $.BizData.couponinfo = a.couponinfo, $.BizData.invoiceinfo = a.invoiceinfo, $.BizData.submitinfo = a.submitinfo, $.BizData.otherCommInfo = a.otherCommInfo, $.BizData.tracklog = a.tracklog, $.BizData.isLogin = a.isLogin, $.BizData.contactList = a.contactList, $.BizData.residentList = a.residentList, $.BizData.inputValue = a.inputValue, $.BizData.initParam = a.initParam, $.BizData.pageParam = a.pageParam, $.BizData.minDate = a.minDate, $("#vsCreateOrderParam").value(a.vsCreateOrderParam), store.clearAll()), common.init();
    var i = function () {
        $("#J_DivTips").css("display", ""), $("#J_DivRoomInfo").css("display", ""), $("#J_DivPriceInfo").css("display", ""), $("#J_DivBookInfo").css("display", ""), $("#J_DivCustomInfo").css("display", ""), $("#J_DivPrePayment").css("display", ""), $("#J_DivInsureInfo").css("display", ""), $("#J_DivGiftBoxes").css("display", ""), $("#J_DivDiscount").css("display", ""), $("#J_DivInvoiceInfo").css("display", ""), $("#J_bottomTips").css("display", ""), $("#J_Submit").css("display", ""), $("#J_Loading").css("display", "none");
        try {
            roomInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            hyattInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            priceInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            bookInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            customInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            creditExchange.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            cancelInsure.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            travelInsure.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            addOption.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            tipsInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            tipsbInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            giftInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            invoiceInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            discountInfo.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            advancePayment.init()
        } catch (a) {
            console.log(a.stack)
        }
        try {
            submit.init()
        } catch (a) {
            console.log(a.stack)
        }
        !function i() {
            function a(a) {
                for (var i in a) null == a[i] && (a[i] = "")
            }

            var o = window, t = new Date;
            if (o.$_bf && window.$_bf.loaded === !0) {
                window.$_bf.tracklog("hotel.booking", "UID=${duid}&page_id=${page_id}&VERSION=1&" + $.BizData.tracklog.EDMTrackData), $.BizData.tracklog.infomationData.loadtime = t - pageLoadTime;
                var n = $.stringifyJSON($.BizData.tracklog.infomationData);
                window.__bfi.push(["_tracklog", "hotel_inland_booking_basic_online", n]);
                var e = $.BizData.tracklog.infomationData;
                "hoteldetail" == e.price_from && (e.UbtLog = n, a(e), $.ajax("Tool/AjaxEsLog_priceMonitor.aspx", {
                    context: e,
                    method: $.AJAX_METHOD_POST,
                    onsuccess: function (a, i) {
                    }
                }))
            } else setTimeout(i, 30)
        }()
    };
    if ($.BizData.preload) {
        i();
        var o = jQuery, t = $.BizData.bookinfo.MaxRoomCount, n = $.BizData.bookinfo.MinRoomCount,
            e = $.BizData.pageParam.roomNumbers;
        e < n ? ($.BizData.pageParam.roomNumbers = n, o("#J_roomLoading").show(), common.callHotelAvail(function () {
            o("#J_roomLoading").hide()
        })) : e > t && ($.BizData.pageParam.roomNumbers = t, o("#J_roomLoading").show(), common.callHotelAvail(function () {
            o("#J_roomLoading").hide()
        }))
    } else common.callGetUserInfo(function (a) {
    }), common.callHotelAvail(function (a) {
        $.BizData.refGUID = a.refGUID, $.BizData.roominfo = a.roominfo, $.BizData.hyattMember = a.hyattMember, $.BizData.priceinfo = a.priceinfo, $.BizData.bookinfo = a.bookinfo, $.BizData.advancePayment = a.advancePayment, $.BizData.custominfo = a.custominfo, $.BizData.addoption = a.addoption, $.BizData.tipsinfo = a.tipsinfo, $.BizData.creditExchange = a.creditExchange, $.BizData.giftinfo = a.giftinfo, $.BizData.insureinfo = a.insureinfo, $.BizData.discountInfo = a.discountInfo, $.BizData.cashbackinfo = a.cashbackinfo, $.BizData.couponinfo = a.couponinfo, $.BizData.invoiceinfo = a.invoiceinfo, $.BizData.otherCommInfo = a.otherCommInfo, $.BizData.submitinfo = a.submitinfo, $.BizData.tracklog = a.tracklog, $.BizData.vsCreateOrderParam = a.vsCreateOrderParam, $.BizData.isLogin = a.isLogin, $.BizData.minDate = a.minDate, i()
    })
});

"use strict";
var priceInfo;
!function () {
    function a() {
    }

    var e = jQuery;
    a.prototype = {
        constructor: a,
        wrap: e("#J_DivPriceInfo"),
        priceList: null,
        priceDetail: null,
        priceRMBList: null,
        init: function () {
            var a = this, t = a.wrap, i = $.BizData.priceinfo;
            a.priceList = {}, a.refundList = {}, a.priceRMBList = {}, a.priceDetail = i.priceDetail, common.bindHover($(t.find(".J_SpanTotalPrice")[0]), function (t, i) {
                var r = ($.BizData.priceinfo, e("<div></div>")), n = e("<table class='table_price'></table>");
                for (var c in a.priceDetail) {
                    var s = a.priceDetail[c];
                    if ("rmbRates" != c) if ("[object Array]" == Object.prototype.toString.call(s.data)) {
                        e(i).parent().css("width", 100 * ((s.data.length > 7 ? 7 : s.data.length) + 1) + "px");
                        for (var p = 0; p < s.data.length; p += 7) {
                            var o = e("<tr></tr>"), d = e("<tr></tr>");
                            d.append("<th></th>"), o.append("<td>" + s.name + "</td>");
                            for (var l = p; l < p + 7 && l < s.data.length; l++) {
                                var f = s.data[l];
                                d.append("<th>" + f.date + "</th>"), o.append("<td>" + f.value + "</td>")
                            }
                            n.append(d), n.append(o)
                        }
                    } else {
                        var o = e("<tr></tr>");
                        o.append("<td>" + s.name + "</td>"), o.append("<td colspan=" + (a.priceDetail.rates.data.length > 7 ? 7 : a.priceDetail.rates.data.length) + ">" + s.data + "</td>"), n.append(o)
                    }
                }
                r.append(n);
                var m = r.html();
                return m
            }), a.refresh()
        },
        getTotalPrice: function () {
            var a = 0, e = this;
            for (var t in e.priceList) {
                var i = e.priceList[t];
                a += i.value
            }
            return a
        },
        refresh: function () {
            var a = this, t = a.wrap, i = $.BizData.priceinfo, r = i.Currency;
            a.priceRMBList.roomRmbPrice = i.priceList.roomRmbPrice, a.priceRMBList.taxRmbPrice = i.priceList.taxRmbPrice, $.BizData.bookinfo.IsPrePaymentChecked && "RMB" != r ? (a.priceList.roomPrice = i.priceList.roomRmbPrice, i.priceList.taxRmbPrice && i.priceList.taxRmbPrice.value > 0 && (a.priceList.taxPrice = i.priceList.taxRmbPrice), a.priceDetail.rates = i.priceDetail.rmbRates, r = "RMB") : (a.priceList.roomPrice = i.priceList.roomPrice, i.priceList.taxPrice && i.priceList.taxPrice.value > 0 && (a.priceList.taxPrice = i.priceList.taxPrice), a.priceDetail.rates = i.priceDetail.rates), "RMB" == r && (r = "&yen;");
            var n = 0;
            $.BizData.otherCommInfo && $.BizData.otherCommInfo.MaskDesc && (a.priceList.roomPrice.name = $.BizData.otherCommInfo.MaskDesc);
            var c = t.find(".J_UlPriceList");
            c.empty();
            for (var s in a.priceList) {
                var p = a.priceList[s];
                n += p.value, c.append(e("<li><span class='cost_detail_tit'>" + p.name + "</span><span class='cost_detail_quota'><span class='rmb'>" + r + "</span> " + p.value + "</span></li>"))
            }
            if (t.find(".J_SpanTotalPrice").html(r + " <span class='htotal_price_num'>" + parseFloat(n.toFixed(2)) + "</span>"), "&yen;" != r) {
                var o = 0;
                for (var s in a.priceRMBList) o += a.priceRMBList[s].value;
                t.find(".J_SpanTotalPriceRMB").html("折合约<dfn>&yen;</dfn>" + o)
            }
            var d = t.find(".J_DivTaxInfo");
            d.empty(), i.IncludedTax && d.append("<div><strong>包含：</strong>" + i.IncludedTax + "</div>"), i.ExcludedTax && d.append("<div><strong>不含：</strong>" + i.ExcludedTax + "</div>");
            var c = t.find(".J_UlRefund");
            c.empty();
            var l = (a.refundList._cashback ? a.refundList._cashback : 0) + (a.refundList._cashbackD ? a.refundList._cashbackD : 0) + (a.refundList._couponcashback ? a.refundList._couponcashback : 0);
            l > 0 && c.append(e("<li><span class='cost_detail_tit'>另返现</span><span class='cost_detail_quota'><span class='rmb'>&yen;</span>" + l + "</span></li>")), a.refundList.newRefunds && e.each(a.refundList.newRefunds, function (a, t) {
                c.append(e("<li><span class='cost_detail_tit'>" + t.name + "</span><span class='cost_detail_quota'><span class='rmb'>&yen;</span>" + t.amount + "</span></li>"))
            });
            var f = advancePayment.getJLeftAmountWord();
            f ? e("#J_LeftAmountWord").html(f) : "FG" == $.BizData.pageParam.balancetype ? e("#J_LeftAmountWord").html("房费请于酒店前台支付") : e("#J_LeftAmountWord").html("携程将预收全部费用")
        }
    }, priceInfo = new a
}();
"use strict";

function RoomInfo() {
}

var roomInfo;
!function () {
    var o = jQuery;
    RoomInfo.prototype = {
        constructor: RoomInfo, init: function () {
            var o = this;
            o.refresh()
        }, refresh: function () {
            var t = o("#J_DivRoomInfo"), e = $.BizData.roominfo,
                n = o('<a href="' + e.HotelLink + '" onclick="return false;"></a>');
            n.attr("title", e.HotelName), n.html(e.HotelName), t.find(".J_HotelName").html("").append(n), t.find(".J_HotelEName").html(e.HotelEName), e.MasterHotelName ? (t.find(".J_HotelAliasName").show(), t.find(".J_HotelAliasName").find(".J_Content").html(e.MasterHotelName)) : t.find(".J_HotelAliasName").hide(), t.find(".J_HotelAddress").html(e.Address), t.find(".J_RoomName").html($.BizData.bookinfo.roomName), t.find(".J_RoomEName").html($.BizData.bookinfo.roomEName), t.find(".J_TblRoomInfo").empty();
            for (var a = 0; a < e.roomDetailList.length; a++) {
                var i = e.roomDetailList[a], r = o("<tr><th>" + i.name + "</th><td>" + i.value + "</td></tr>");
                t.find(".J_TblRoomInfo").append(r)
            }
            t.find(".J_ImgHotelLogo").attr("src", e.HotelLogo);
            var m = $("#J_DivRoomInfo").find(".J_HotelName a");
            common.bindPop(m, $("#hotelDetailPop"), {
                onOK: function () {
                    location.href = $("#J_DivRoomInfo").find(".J_HotelName a").attr("href")
                }
            }), $.BizData.roominfo.HourRoom_Duration > 0 && (t.find(".J_Li_HourRoomWord").html("<span style='color: #999;'>可住时段：</span>" + $.BizData.roominfo.HourRoom_EarliestArrive + "~" + $.BizData.roominfo.HourRoom_LatestArrive + " 连住" + $.BizData.roominfo.HourRoom_Duration + "小时"), t.find(".f_chkin").css("width", "133px"))
        }
    }, roomInfo = new RoomInfo
}();
!function (t, e) {
    function n(t) {
        return t && "function" == typeof t && t.constructor == Function
    }

    function r(t) {
        return null != t && "object" == typeof t && t.constructor == Array
    }

    function a(t) {
        return t && e.isPlainObject(t)
    }

    function c(t) {
        return t && "string" == typeof t && t.constructor == String
    }

    function u(t) {
        return e.stringifyJSON(t)
    }

    function i(t, n) {
        if (!t) return n;
        var r = "";
        try {
            r = e.parseJSON(t)
        } catch (a) {
            r = t
        }
        return void 0 != r ? r : n
    }

    function o(t) {
        return t.replace(/^\d/, "___$&").replace(E, "___")
    }

    function f(t, e, n) {
        var r = o(t), a = new Date;
        h(), c(n) && (n = new Date(n.replace(/-/g, "/"))), n = n instanceof Date ? n : a.addHours(1), M(function (t) {
            try {
                var a = {data: e, exprie: n};
                t.setAttribute(r, u(a)), t.save(x)
            } catch (c) {
            }
        })
    }

    function v(t) {
        var e = o(t), n = null;
        return h(), M(function (t) {
            var r = t.getAttribute(e);
            if (r && r.match(_)) {
                var a = i(r, {}), c = new Date;
                a && new Date(a.exprie) >= c && (n = a.data)
            }
        }), n
    }

    function m(t, e) {
        h(), M(function (n) {
            for (var r = n.XMLDocument.documentElement.attributes, a = r.length - 1; a >= 0; a--) {
                var c = r[a], u = n.getAttribute(c.name);
                if (u && u.match(_)) {
                    var o = i(u, {});
                    t(e(o.data), c.name)
                }
            }
        })
    }

    function l(t) {
        var e = o(t);
        h(), M(function (t) {
            t.removeAttribute(e), t.save(x)
        })
    }

    function d() {
        M(function (t) {
            var e = t.XMLDocument.documentElement.attributes;
            t.load(x);
            for (var n = e.length - 1; n >= 0; n--) t.removeAttribute(e[n].name);
            t.save(x)
        })
    }

    function h() {
        try {
            M(function (t) {
                var e = t.XMLDocument.documentElement.attributes;
                t.load(x);
                for (var n = e.length - 1; n >= 0; n--) {
                    var r = t.getAttribute(e[n].name);
                    if (r && r.match(_)) {
                        var a = i(r, {}), c = new Date;
                        a && new Date(a.exprie) <= c && t.removeAttribute(e[n].name)
                    }
                }
                t.save(x)
            })
        } catch (t) {
        }
    }

    function s() {
        return t.localStorage
    }

    function g(t) {
        b();
        var e = s().getItem(x), n = i(e, {});
        return !!n[t]
    }

    function y(t) {
        b();
        var e = s().getItem(x), n = i(e, {}), r = new Date;
        return n[t] && new Date(n[t].exprie) >= r ? n[t].data : null
    }

    function p(t, e, n) {
        var r = new Date, a = r.addHours(1), o = {};
        b(), c(n) && (a = new Date(n.replace(/-/g, "/")));
        var f = s().getItem(x);
        if (f && f.match(_)) try {
            o = i(f, {})
        } catch (v) {
        }
        o[t] = {data: e, exprie: a};
        try {
            s().setItem(x, u(o))
        } catch (v) {
        }
        g(t) && s().setItem(x, u(o))
    }

    function w(t, e) {
        b();
        var n = s().getItem(x);
        if (n && n.match(_)) {
            var r = {};
            try {
                r = i(n, {})
            } catch (a) {
            }
            for (var c in r) t(e(y(c)), c)
        }
    }

    function D(t) {
        b();
        var e = s().getItem(x);
        if (e && e.match(_)) {
            var n = {};
            try {
                n = i(e, {})
            } catch (r) {
            }
            return delete n[t], s().setItem(x, u(n))
        }
    }

    function I() {
        return s().removeItem(x)
    }

    function b() {
        var t = s().getItem(x);
        if (t && t.match(_)) {
            var e = {};
            try {
                e = i(t, {})
            } catch (n) {
            }
            var r = new Date;
            for (var a in e) e[a] && new Date(e[a].exprie) <= r && delete e[a];
            s().setItem(x, u(e))
        }
    }

    var A = / (MSIE 6|MSIE 7)\./.test(t.navigator ? t.navigator.userAgent : ""),
        E = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"), S = t.document, x = "IEHotelUserData",
        _ = /^\[[\s\S]*\]$|^\{[\s\S]*\}$/gi, M = function () {
            if (!S || !S.documentElement || !S.documentElement.addBehavior) return null;
            var t, e;
            try {
                e = S.createElement("div"), t = S.body
            } catch (n) {
            }
            return function (n) {
                var r = [].slice.call(arguments, 0);
                r.unshift(e), t.appendChild(e), e.addBehavior("#default#userData"), e.load(x), n.apply(this, r), t.removeChild(e)
            }
        }();
    window.store = {
        read: function (t) {
            var e = null;
            try {
                e = A ? v(t) : y(t), e && e.match(_) && (e = i(e, {}))
            } catch (n) {
            }
            return e
        }, write: function (t, e, n) {
            var c = e;
            try {
                (r(e) || a(e)) && (c = u(e)), A ? f(t, c, n) : p(t, c, n)
            } catch (i) {
            }
        }, each: function (t) {
            function e(t) {
                var e = t;
                return t && t.match(_) && (e = i(t, {})), e
            }

            try {
                if (!n(t)) return;
                A ? m(t, e) : w(t, e)
            } catch (r) {
            }
        }, remove: function (t) {
            try {
                A ? l(t) : D(t)
            } catch (e) {
            }
        }, clearAll: function () {
            try {
                A ? d() : I()
            } catch (t) {
            }
        }
    }
}(window, cQuery);
"use strict";

function Submit() {
}

function huazhuRegister(e) {
    var t = jQuery, a = t("#J_Submit");
    if (!$.BizData.custominfo.ThirdPartType || !$.BizData.custominfo.isNeedInputIDCard) return e();
    var o = "Tool/AjaxRegistHuazhu.aspx", i = t("#J_DivCustomInfo"), n = {
        ThirdPartType: $.BizData.custominfo.ThirdPartType,
        IDCard: i.find(".J_IDCard").val(),
        Mobile: i.find(".J_InpMobile").val(),
        Email: i.find(".J_InpEmail").val(),
        clientName: $.BizData.inputValue.inputName,
        BalanceType: $.BizData.pageParam.balancetype
    }, r = a.find(".J_BtnSubmit");
    $.ajax(o, {
        method: $.AJAX_METHOD_POST, context: n, onsuccess: function (t, a) {
            var o = a && $.parseJSON(a);
            o && 200 === o.code ? e() : ($("#J_CommonMessageText").html(o.message), common.bindPop(void 0, $("#J_CommonMessage"), {triggerEvents: []}), r.removeClass("disabled locked"))
        }, onerror: function () {
            r.removeClass("disabled locked")
        }
    })
}

function duplicateOrderConfirm(e) {
    var t = jQuery, a = $.BizData, o = a.bookinfo.arrival || "", i = a.bookinfo.departure || "",
        n = $("#J_residentjson").attr("data-residents"),
        r = $.parseJSON($("#txtContactMobilePhoneArea").attr("data-area")),
        s = $("#J_DivCustomInfo").find(".J_InpMobile").value().trim(), d = a.initParam.D_City || "",
        m = a.pageParam.roomID, l = a.initParam.oriOrderID, u = a.initParam.operationType,
        c = $("#J_Submit").find(".J_BtnSubmit"), p = {
            arrival: o,
            departure: i,
            ClientName: n,
            CountryCode: r && r.Code || "86",
            MobilePhone: s,
            city: d && d.length > 0 ? d : a.initParam.City || "",
            room: m,
            orderid: 0,
            oriOrderID: l,
            operationType: u
        };
    $.BizData.submitinfo.IsOpenNewRepateTimerOrder ? t("#repeatWarnPop").find(".repeat_order").html("<p class='repeat_order_tips'>您已提交过同时段的订单，是否继续预订？</p>") : t("#repeatWarnPop").find(".repeat_order").html("<p class='repeat_order_tips'>您已提交过相同城市订单，是否继续预定？</p>");
    var f = "Tool/AjaxCheckRepeatHotelOrder.aspx";
    $.ajax(f, {
        method: $.AJAX_METHOD_POST, context: p, onsuccess: function (a, o) {
            var i = o && $.parseJSON(o);
            $.BizData.submitinfo.IsOpenNewRepateOrder ? i && 200 === i.code && i.data && ("0" == i.data.code || "1" == i.data.code || "2" == i.data.code) ? ("1" == i.data.code ? common.bindPop(t(c), $("#repeatWarnPop"), {
                triggerEvents: ["dupOrder"],
                onSubmit: function () {
                    return e(), !0
                },
                onClose: function () {
                    c.removeClass("disabled locked")
                },
                isCleanLastTriggerEvents: !0
            }) : "0" == i.data.code ? common.bindPop(t(c), $("#repeatPop"), {
                triggerEvents: ["dupOrder"],
                onClose: function () {
                    c.removeClass("disabled locked")
                },
                isCleanLastTriggerEvents: !0
            }) : "2" == i.data.code && ((!i.data.message || i.data.message.length <= 0) && e(), $("#J_repeatMessage").html(i.data.message), common.bindPop(t(c), $("#mayRepeatPop"), {
                triggerEvents: ["dupOrder"],
                onSubmit: function () {
                    return e(), !0
                },
                onClose: function () {
                    c.removeClass("disabled locked")
                },
                isCleanLastTriggerEvents: !0
            })), c.trigger("dupOrder")) : e() : !i || 200 !== i.code || "0" != i.data && "1" != i.data ? e() : ("1" != i.data || c.attr("data-dup") ? "0" != i.data || c.attr("data-dup") || (common.bindPop(c, $("#repeatPop"), {
                triggerEvents: ["dupOrder"],
                onClose: function () {
                    c.removeClass("disabled locked")
                }
            }), c.attr("data-dup", "bind")) : (common.bindPop(c, $("#repeatWarnPop"), {
                triggerEvents: ["dupOrder"],
                onSubmit: function () {
                    return e(), !0
                },
                onClose: function () {
                    c.removeClass("disabled locked")
                }
            }), c.attr("data-dup", "bind")), c.trigger("dupOrder"))
        }, onerror: function () {
            e()
        }
    })
}

function blackListCheck(e) {
    var t = jQuery, a = $.BizData, o = t("#J_Submit").find(".J_BtnSubmit"), i = [],
        n = "Tool/AjaxResidentBlackList.aspx", r = t("#J_DivCustomInfo").find(".J_InpMobile"), s = function (e, t, a) {
            "none" !== e.css("display") && e.val().trim().length && i.push({
                elemId: a || e.attr("id"),
                checkValue: e.val().trim(),
                checkType: t
            })
        };
    s(r, "MobilePhone"), $("#J_DivCustomInfo").find(".J_DivGuestListItem").each(function (e) {
        var a = e.attr("id");
        s(t(e.find(".J_InpName")), "Name", a.replace("J_DivGuestListItem", "J_inputResi_"))
    }), $.ajax(n, {
        context: {content: i}, method: $.AJAX_METHOD_POST, onsuccess: function (i, n) {
            var r = n && $.parseJSON(n);
            r && 200 === r.code && r.data instanceof Array && r.data.length ? (r.data.each(function (e) {
                if ("MobilePhone" === e.checkType) common.showError(t("#J_mobile"), a.ErrMsg.mobilePhone); else if (e.elemId) {
                    var o, i;
                    e.elemId.startsWith("J_inputResi") && (o = e.elemId.replace("J_inputResi_", "J_DivGuestListItem"), i = t("#" + o).find(".J_InpName")), common.showError(i, a.ErrMsg.guestName1)
                }
            }), o.removeClass("disabled")) : e()
        }, onerror: e
    })
}

var submit;
!function () {
    var e = jQuery, t = $.BizData, a = (t.ErrMsg, e("#J_Submit"));
    a.find(".J_BtnSubmit");
    Submit.prototype = {
        constructor: Submit, init: function () {
            var e = this;
            e.refresh(), a.find(".J_BtnSubmit").bind("click", e.doSubmit)
        }, doSubmit: function () {
            var t = submit, o = a.find(".J_BtnSubmit");
            if (!o.hasClass("disabled")) {
                o.addClass("disabled locked");
                var i = !0;
                if (i = i && customInfo.validate(), addOption.validate(), cancelInsure.validate(), travelInsure.validate(), invoiceInfo.validate(), i = i && creditExchange.validate(), i = i && discountInfo.validate(), i = i && hyattInfo.validate(), i = i && tipsbInfo.validate(), i = t.validateinputerror(!0) && i, !i) return o.removeClass("disabled locked"), !1;
                $.BizData.AwakeUnion && ($.BizData.inputValue.AwakeUnion = $.BizData.AwakeUnion), customInfo.submit(), hyattInfo.submit(), addOption.submit(), cancelInsure.submit(), creditExchange.submit(), travelInsure.submit(), discountInfo.submit(), invoiceInfo.submit(), advancePayment.submit(), tipsbInfo.submit();
                var n = function () {
                    window.__rmsbfi = window.__rmsbfi || [], window.__rmsbfi.push(["_getRmsToken", function (e) {
                        $.BizData.inputValue.RMSToken = e
                    }]), $.ajax("Tool/AjaxCreateOrder.aspx", {
                        context: {
                            inputValue: JSON.stringify($.BizData.inputValue),
                            vsInitParam: $.BizData.vsInitParam,
                            vsCreateOrderParam: $.BizData.vsCreateOrderParam,
                            pageParam: JSON.stringify($.BizData.pageParam)
                        }, method: $.AJAX_METHOD_POST, async: !0, onsuccess: function (t) {
                            var a = $.parseJSON(t.responseText);
                            a || ($("#J_CommonMessageText").html("请重新登录"), common.bindPop(void 0, $("#J_CommonMessage"), {triggerEvents: []}), o.removeClass("disabled locked"));
                            var i = function (e) {
                                function t(e) {
                                    for (var t in e) null == e[t] && (e[t] = "")
                                }

                                if (e && "NEWHOTELORDER" == $.BizData.initParam.operationType && "hoteldetail" == $.BizData.tracklog.infomationData.price_from) {
                                    window.__bfi.push(["_tracklog", "htl_order_submit_click", e]);
                                    var a = $.parseJSON(e);
                                    a = $.extend({}, $.BizData.tracklog.infomationData, a), a.UbtLog = e, t(a), a.type = "htl_order_submit_click", $.ajax("Tool/AjaxEsLog_priceMonitor.aspx", {
                                        context: a,
                                        method: $.AJAX_METHOD_POST,
                                        onsuccess: function (e, t) {
                                        }
                                    })
                                }
                            };
                            if (a && 200 === a.code) {
                                var n = $.parseJSON(a.data);
                                if (n) {
                                    store && e("#J_storeGuid").val() && store.write(e("#J_storeGuid").val(), $.stringifyJSON($.BizData)), tracking.submitOrderTracking(n.orderid), i(n.tracelog);
                                    var r = document.createElement("div");
                                    r.style.cssText = "display: none", document.body.appendChild(r), r.innerHTML = n.form, setTimeout(function () {
                                        return n.url ? void location.replace(n.url) : n.payUrlNew ? void (location.href = n.payUrlNew) : void r.firstChild.submit()
                                    }, 0)
                                }
                            } else if (a && 500 === a.code) {
                                var n = $.parseJSON(a.data);
                                if (n) {
                                    if (n.url) return void location.replace(n.url);
                                    i(n.tracelog), common.callHotelAvail(function (e) {
                                        o.removeClass("disabled locked"), common.showCommonPopSimple("失败", "抱歉，订单失败了，请重新确认订单。", function () {
                                        })
                                    }, function () {
                                        o.removeClass("disabled locked"), common.showCommonPopSimple("失败", "抱歉，这个房间订完了，请重新选择房间或日期。", function (e) {
                                            e || ("CHANGEORDER" == $.BizData.initParam.operationType ? bookInfo.showChangeRoom() : location.href = "/hotel/" + $.BizData.bookinfo.HotelID + ".html")
                                        })
                                    })
                                } else $("#J_CommonMessageText").html(a.message), common.bindPop(void 0, $("#J_CommonMessage"), {triggerEvents: []}), o.removeClass("disabled locked")
                            }
                        }, onerror: function (e) {
                            $("#J_CommonMessageText").html($.BizData.ErrMsg.commonErrorMsg), common.bindPop(void 0, $("#J_CommonMessage"), {triggerEvents: []}), o.removeClass("disabled locked")
                        }, onabort: function (e) {
                        }
                    })
                };
                huazhuRegister(function () {
                    hyattInfo.regHyatt(function () {
                        blackListCheck(function () {
                            duplicateOrderConfirm(n)
                        })
                    })
                })
            }
        }, refresh: function () {
            t = $.BizData;
            var e = t.submitinfo, o = (t.ErrMsg, a.find(".J_BtnSubmit"));
            e.bookable ? (o.removeClass("disabled"), this.setSubmitBtnTxt()) : (o.addClass("disabled"), o.html("抱歉，该房型不可订"))
        }, setSubmitBtnTxt: function () {
            var e = t.bookinfo.IsPrePaymentChecked, o = t.submitinfo;
            if (o.bookable) {
                var i = a.find(".J_BtnSubmit");
                i.removeClass("disabled");
                var n = t.roominfo.needPay, r = t.roominfo.needGuarantee || customInfo.isOverTimeGuarantee();
                0 == priceInfo.getTotalPrice() && (n = !1, r = !1), advancePayment.setSubmitFlg ? i.html("提交订单") : n || t.roominfo.isPH ? i.html("下一步 , 支付") : r ? i.html("下一步 ，担保") : e ? i.html("下一步 , 支付") : travelInsure.hasTravelInsure() ? i.html("下一步,支付保费") : i.html("提交订单")
            }
        }, validateinputerror: function (e) {
            var t = this.check_input_error(e);
            return t && !a.find(".J_BtnSubmit").hasClass("locked") && this.setSubmitBtnTxt(), t
        }, check_input_error: function (e) {
            var t = !0;
            return $(".form_item_error").each(function (a) {
                a.find("input")[0] && a.find("input").hasClass("J_couponTxt") || 0 != a.offset().width && 0 != a.offset().height && (e && window.scrollTo(0, a.offset().top), t = !1)
            }), t
        }
    }, submit = new Submit
}();
"use strict";

function TipsbInfo() {
}

function fixPrice(a) {
    var e = a.toString(), i = e.split(".");
    return i.length > 1 && i[1].length > 2 && (a = Number(a.toFixed(2))), a
}

function toFixed(a, e) {
    return e = e || 2, "RMB" == $.BizData.priceinfo.Currency ? a : a.toFixed(e)
}

var tipsbInfo;
!function () {
    var a = jQuery, e = a("#J_bottomTips"), i = e.find(".J_hotelTips");
    TipsbInfo.prototype = {
        constructor: TipsbInfo, init: function () {
            var a = this;
            e.find(".J_UseFGBtn").bind("click", function () {
                if (!e.find(".J_UseFGBtn").hasClass("disabled")) {
                    e.find(".J_UseFGBtn").addClass("disabled");
                    var a = $.BizData.pageParam;
                    a.useFG = !0, a.balancetype = "PP", common.callHotelAvail(function (a) {
                    })
                }
            }), a.refresh()
        }, refresh: function () {
            var a = $.BizData.tipsinfo;
            if (!a) return !1;
            var t = $.BizData;
            t.pageParam.balancetype;
            if (i.html(a.hotelTip), $.BizData.roominfo.needGuarantee || customInfo.isOverTimeGuarantee()) {
                var n = t.roominfo, r = t.priceinfo, o = r.priceDetail.rates.data[0].price,
                    s = n.needGuarantee ? n.prePayFirst ? o * $.BizData.pageParam.roomNumbers : r.TotalPrice : priceInfo.getTotalPrice(),
                    l = 0;
                addOption && (l = addOption.getTotalPrice().totalRMBprice);
                var c = r.Currency;
                "RMB" == c && (c = "&yen;");
                var m = l > 0 ? "及附加服务费" + c + fixPrice(l + s) : c + s, p = "";
                if (a.CancelDetailTable) {
                    var f = l + s;
                    p = $.tmpl.render(a.CancelDetailTable, {price: f})
                }
                e.find(".J_cancelGuarantee").html("<strong>" + a.guaranteePolicy + "</strong>" + $.tmpl.render(a.guaranteePolicyDesc, {Money: m}) + p), e.find(".J_cancelGuarantee").show(), a.canUseFG && !$.BizData.pageParam.useFG ? e.find(".J_UseFG").css("display", "") : e.find(".J_UseFG").css("display", "none")
            } else e.find(".J_cancelGuarantee").hide(), e.find(".J_UseFG").css("display", "none");
            var d = $.BizData.roominfo.hotelType, u = "";
            if ("bookinghtl" === d ? u = '合作伙伴<i class="partner_booking"></i>' : "agoda" === d && (u = '合作伙伴<i class="partner_agoda"></i>'), e.find(".J_partner").html(u), a.ShowExpedia && e.find(".J_ExpediaNote").css("display", ""), !$.BizData.ServerTime) {
                var D = new Date($.BizData.otherCommInfo.now);
                $.BizData.ServerTime = D;
                var g = new Date, B = $.BizData.ServerTime.getTime() - g.getTime();
                $.BizData.timeDiff = B
            }
            var v = $("#J_splitBooking");
            v.css("display", "none"), $.BizData.initParam.isSplitOrder && $.BizData.pageParam.arrival == $.BizData.initParam.sArrival && $.BizData.pageParam.departure == $.BizData.initParam.sDeparture && v.css("display", "")
        }, validate: function () {
            if ($.BizData.oriOrderInfo && "CHANGEORDER" == $.BizData.initParam.operationType) {
                var a = $.BizData.oriOrderInfo.cancelDetails;
                if (a && a.length > 0 && !window.__SupressCancelDetailMessage) {
                    var e = new Date;
                    e.setTime(e.getTime() + $.BizData.timeDiff), e = e.getTime();
                    for (var i = 0; i < a.length; i++) {
                        var t = a[i], n = new Date(t.start).getTime(), r = new Date(t.end).getTime();
                        if (e > n && e < r) return common.showCommonPop("", "根据取消修改政策，现在提交订单会扣取" + t.CurrencyCode + t.price + "修改费用，是否确认提交订单？", {
                            name: "取消",
                            callback: function () {
                                $("#J_CommonPop").unmask()
                            }
                        }, {
                            name: "确定", callback: function () {
                                window.__SupressCancelDetailMessage = !0, $("#J_CommonPop").unmask(), $(".J_BtnSubmit").removeClass("disabled"), $(".J_BtnSubmit").trigger("click")
                            }
                        }, function () {
                            $(".J_BtnSubmit").removeClass("disabled")
                        }), !1
                    }
                    var o = a[a.length - 1], s = new Date(o.end).getTime();
                    e > s && common.showCommonPopSimple("", "由于您操作时间过长，该订单已落入不可取消修改时段，根据取消修改政策，该订单不可取消修改。", function () {
                    })
                }
                window.__SupressCancelDetailMessage = !1
            }
            return !0
        }, submit: function () {
            var a = $.BizData.tipsinfo;
            ($.BizData.roominfo.needGuarantee || customInfo.isOverTimeGuarantee()) && "PP" != $.BizData.pageParam.balancetype && ($.BizData.inputValue.origuaranteeAmount = a.guaranteeAmount)
        }
    }, tipsbInfo = new TipsbInfo
}();
"use strict";

function TipsInfo() {
}

var tipsInfo;
!function () {
    var t = jQuery;
    TipsInfo.prototype = {
        constructor: TipsInfo, init: function () {
            var t = this;
            $.BizData.tipsinfo;
            t.refresh()
        }, refresh: function () {
            var e = $.BizData.tipsinfo, n = t("#J_DivTips");
            e.Warning ? n.html(e.Warning) : (n.html(""), common.each(e.tips, function (e, i) {
                var o = t(i.html);
                o.find(".J_PromotionTimeLimit").each(function (e, n) {
                    var i = t(n), o = new Date(i.attr("date-now")), s = new Date(i.attr("date-end")),
                        r = setInterval(function () {
                            o.setSeconds(o.getSeconds() + 1);
                            var t = new Date, e = s.getTime() - o.getTime();
                            t.setTime(e), t.setHours(t.getHours() - 8);
                            var n = ("0" + t.getHours()).slice(-2), a = ("0" + t.getMinutes()).slice(-2),
                                c = ("0" + t.getSeconds()).slice(-2);
                            i.html(n + ":" + a + ":" + c), e <= 0 && (SubmitForm("modifyRoomCount"), clearInterval(r))
                        }, 1e3)
                }), n.append(o)
            }))
        }
    }, tipsInfo = new TipsInfo
}();