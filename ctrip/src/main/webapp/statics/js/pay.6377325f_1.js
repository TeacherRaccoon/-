/**
 * Created by li_peng on 2017/10/16.
 */

var ENUM_Catalog = {
    Account: ",1,",
    //Airplus:{special:false},
    Cash: ",1,",
    CreditCard: ",1,2,",
    // CtripWallet:"CtripWallet",
    DepositCard: ",1,2,",
    EBank: ",1,2,",
    GlobalCard: ",4,",
    CreditsGuarantee: ",2,"
};
var TAB_Config = [
    //{ "type": "BankCard", "catalogLayout": "CreditCard,DepositCard,GlobalCard", "getTab": "getCardTab" ,"disabled":true },

    {"type": "EBank", "catalogLayout": "ThirdPay,EBank", "getTab": "getMoreTab"}];

function catalogsFilter(catalogCollection, chargemode, isGuaranteePay) {
    return $.grep(catalogCollection,
        function (ele) {
            var catalog = ENUM_Catalog[ele.catalogCode];
            if (catalog && catalog.indexOf(',' + chargemode + ',') > -1) {
                if (ele.catalogCode === "CreditsGuarantee" && !isGuaranteePay) {
                    return false;
                }
                return true;
            }
            return false;
        });
}

function TAB_ConfigFilter(catalog) {
    var tabs = $.grep(TAB_Config, function (ele) {
        if (ele.catalogLayout.indexOf(catalog.catalogLayout) >= 0) {
            return true;
        }
        return false;
    });

    if (tabs.length > 0) {
        return tabs[0];
    } else {
        return null;
    }
}

function isBankCard(catalogcode) {
    if ("CreditCard,DepositCard,GlobalCard".indexOf(catalogcode) >= 0)
        return true;

    return false;
}

function getTMPayDiscount(payDiscountRange) {
    var discount = 0;
    if (!payDiscountRange) return discount;
    var discountrange = $.grep(payDiscountRange, function (ele) {
        if (ele.payWayId == "TMPay+EMPay") {
            return true;
        }
        return false;
    });
    if (discountrange && discountrange.length > 0) {
        discount = Number(discountrange[0].discount);
    }

    return isNaN(discount) ? 0 : discount;
}

function getCashPayDiscount(payDiscountRange) {
    var discount = 0;
    if (!payDiscountRange) return discount;
    var discountrange = $.grep(payDiscountRange, function (ele) {
        if (ele.payWayId == "Cash") {
            return true;
        }
        return false;
    });
    if (discountrange && discountrange.length > 0) {
        discount = Number(discountrange[0].discount);
    }

    return isNaN(discount) ? 0 : discount;
}

function IEEBanksbyBrandid(brandid) {
    if (OtherHelper.ieVersion() > 0) return false;

    var list = ["EB_BJBANK_Alipay",
        "EB_FDB_Alipay",
        "EB_HZBANK_Alipay",
        "EB_ICBC",
        "EB_ICBC_Alipay",
        "EB_NBBANK_Alipay",
        "EB_PSBC",
        "EB_PSBC_Alipay",
        "EB_SRCB_Alipay",
        "EB_CITIC_Alipay",
        "EB_WZCB_Alipay",
        "BEB_ICBC"
    ];
    if ($.inArray(brandid, list) > -1) {
        return true;
    } else {
        return false;
    }
}

function payInit() {
    cbuService.init({
        platform: payConfig.platform,
        version: "1.0.0.2",     //版本
        urlTemplet: payConfig.CBUUrl,
        auth: payConfig.auth,
        language: payConfig.language,
        orderId: payConfig.orderId,
        token: payConfig.token,
        merchantId: payConfig.merchantId,
        requestId: payConfig.requestId,
        clientIp: payConfig.clientIp,
        proxyUrl: payConfig.proxyrUrl,//代理url(全路径或相对路径)，在低版本浏览器下转发cbu请求
        publicKey: payConfig.publicKey
    });
    var f = function (step) {
        if (!step) step = 0;
        switch (step) {
            case -1:
                return;
            case 0:
                window.payData = new payDataModel();
                f(step + 1);
                break;
            case 1:
                wbinddata();
                f(step + 1);
                break;
            case 2:

                var d1 = new Date().getTime();
                var ieVer = OtherHelper.ieVersion();
                if (ieVer > 0 && ieVer < 10) {
                    jQuery.ajax({
                        url: '../NewPay/LoadTmpl',
                        type: 'GET',
                        data: 'url=http:' + payConfig.tmplurl,
                        cache: false,
                        async: false,
                        success: function (response, requestData) {
                            var d2 = new Date().getTime();
                            logUbt("tmplLoadTime:" + (d2 - d1), "Payment-UBT-Load");
                            $("#tmpl").html(response);
                            f(step + 1);
                        },
                        error: function (xhr, status, err, requestData) {
                            var d2 = new Date().getTime();
                            logUbt("tmplLoadTime:" + (d2 - d1) + "," + status, "Payment-UBT-Load");
                            console.log(err);
                        }
                    });
                } else {
                    $("#tmpl").load(payConfig.tmplurl, function (response, status, xhr) {
                        var d2 = new Date().getTime();
                        if (status === "success") {
                            logUbt("tmplLoadTime:" + (d2 - d1), "Payment-UBT-Load");
                            f(step + 1);
                        } else {
                            logUbt("tmplLoadTime:" + (d2 - d1) + "," + status, "Payment-UBT-Load");
                            payData.setRefused();
                            f(-1);
                        }
                    });
                }

                break;
            case 3:
                window.payData.getPayData(function () {
                    f(step + 1);
                }, function () {
                    f(-1);
                });
                break;
            case 4:

                $("#main-area-tmpl").tmpl(window.payData).appendTo('#main_area');
                $("#risksms-tmpl").tmpl(window.payData.riskSMS).appendTo('body');
                $("#password-tmpl").tmpl(window.payData.password).appendTo('body');
                $("#setting-ctrip-passward-tmpl").tmpl(window.payData.settingCtripPassward).appendTo('body');

                $("#dcc-tmpl").tmpl(window.payData.dcc).appendTo('body');
                $("#get-giftcard-tmpl").tmpl(window.payData.getGiftCard).appendTo('body');
                $("#scanCode-tmpl").tmpl(window.payData.scanCode).appendTo('body');
                $("#authuser-tmpl").tmpl(window.payData.authUser).appendTo('#main_area');
                $("#pop-errormessage-tmpl").tmpl(window.payData.popErrorMessage).appendTo('body');
                $("#savecard-agreement-tmpl").tmpl(window.payData.savecardAgreement).appendTo('body');
                $("#order-info-description-tablepop-tmpl").tmpl(window.payData.payRequestInfo.description).appendTo('body');
                $("#cash-comfirm-tmpl").tmpl(window.payData.cashComfirm).appendTo('body');
                $("#qrpay-alert-tmpl").tmpl(window.payData.qrPayAlert).appendTo('body');
                $("#pop-authuser-message-tmpl").tmpl(window.payData.popAuthuserMessage).appendTo('body');
                $("#new-card-pop-tmpl").tmpl(window.payData.payCurrent.otherPaywayCurrent).appendTo('body');
                wbind();
                window.payData.initSelect();

                $.each(directive, function (i, e) {
                    e();
                });
                initUbtEvents();
                showCountDown(window.payData.payRequestInfo.extend.countDownTime);
                f(step + 1);
                break;
            default:

                f(-1);
                break;
        }
    };

    f(0);

}

/**
 * Created by li_peng on 2017/9/20.
 */
var cbuService1 = {

    creatHead: function (serviceCode, guid) {
        var head = {
            platform: "20",
            version: "1.0.0.2",
            auth: payConfig.auth,
            language: "ZH",
            orderId: payConfig.orderId,
            token: payConfig.token,
            merchantId: payConfig.merchantId,
            requestId: payConfig.requestId,
            serviceCode: serviceCode,
            guid: "11123123123123123",
            clientIp: payConfig.clientIp
        }
        return head;
    },
    getAjaxData: function (url, request, successCallBack, errorCallBack, timeout, async) {
        timeout = timeout || 1000 * 60 * 5;
        jQuery.support.cors = true;
        var promise;
        var ieVer = OtherHelper.ieVersion();
        if (ieVer > 0 && ieVer < 10) {

            promise = jQuery.ajax({
                url: "../NewPay/TransferData",
                timeout: timeout,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({url: url, jsonData: JSON.stringify(request)}),
                cache: false,
                async: async === false ? false : true,
                success: function (response, requestData) {
                    //成功
                    successCallBack(response, JSON.parse(this.data));
                },
                error: function (xhr, status, err, requestData) {
                    //异常
                    errorCallBack(xhr, status, err, JSON.parse(this.data));
                }
            });
        } else {
            promise = jQuery.ajax({
                url: url,
                timeout: timeout,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(request),
                cache: false,
                async: async === false ? false : true,
                success: function (response, requestData) {
                    //成功
                    successCallBack(response, JSON.parse(this.data));
                },
                error: function (xhr, status, err, requestData) {
                    //异常
                    errorCallBack(xhr, status, err, JSON.parse(this.data));
                }

            });
        }
        return promise;
    },

    //查询可用支付方式
    queryorderpaymentinfo: function (successCallBack, errorCallBack) {
        var queryrequest = {"head": cbuService.creatHead("41000101")};
        cbuService.getAjaxData(payConfig.CBUUrl.format("queryorderpaymentinfo"), queryrequest, successCallBack, errorCallBack);
    },
    //卡号识别
    cardnomatch: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {
            "head": cbuService.creatHead("41001301"),
            "cardNo": dataRequest.cardNo,
            "chargeMode": dataRequest.chargeMode,
            "amount": dataRequest.amount,
            "currencyCode": dataRequest.currencyCode,
            "idCardType": "",
            "matchType": "0"
        }
        cbuService.getAjaxData(payConfig.CBUUrl.format("cardnomatch"), queryrequest, successCallBack, errorCallBack, 100000);
    },
    //常用卡证件类型二次路由
    queryUsedCard: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {
            "head": {
                "auth": cbuService.auth,
                "platform": cbuService.platform,
                "language": cbuService.language,
                "orderId": cbuService.orderId,
                "version": cbuService.version,
                "serviceCode": "41001303",
                "token": cbuService.token,
                "merchantId": cbuService.merchantId,
                "requestId": cbuService.requestid,
                "clientIp": "127.0.0.1",
                "guid": dataRequest.guid || OtherHelper.getGUID()
            },
            "chargeMode": dataRequest.chargeMode,
            "amount": dataRequest.amount,
            "currencyCode": dataRequest.currencyCode,
            "idCardType": dataRequest.idCardType,
            "cardInfoId": dataRequest.cardInfoId
        }
        cbuService.getAjaxData(payConfig.CBUUrl.format("queryusedcard"), queryrequest, successCallBack, errorCallBack, 100000);
    },
    //验证礼品卡密码
    verifyPaymentPassword: function (successCallBack, errorCallBack, dataRequest) {
        //var queryrequest = { "head": { "auth": cbuService.auth, "platform": cbuService.platform, "language": cbuService.language, "orderId": cbuService.orderId, "version": cbuService.version, "serviceCode": "41000401", "token": cbuService.token, "merchantId": cbuService.merchantId, "requestId": cbuService.requestid, "clientIp": "127.0.0.1", "guid": OtherHelper.getGUID() },
        // "password": dataRequest.password
        // }
        var queryrequest = {"head": cbuService.creatHead("41000401")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData(payConfig.CBUUrl.format("verifypaymentpassword"), queryrequest, successCallBack, errorCallBack);
    },
    //领用礼品卡
    receiveTicketCard: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {"head": cbuService.creatHead("41000402")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData(payConfig.CBUUrl.format("receiveTicketCard"), queryrequest, successCallBack, errorCallBack);
    },
    //发送短信验证码
    sendVerCode: function (successCallBack, errorCallBack, dataRequest) {
        //        var queryrequest = { "head": { "auth": cbuService.auth, "platform": cbuService.platform, "language": cbuService.language, "orderId": cbuService.orderId, "version": cbuService.version, "serviceCode": "41001601", "token": cbuService.token, "merchantId": cbuService.merchantId, "requestId": cbuService.requestid, "clientIp": "127.0.0.1", "guid": OtherHelper.getGUID() },
        //            "verifyType": dataRequest.verifyType,
        //            "receiver": dataRequest.receiver,
        //            "contentParam": dataRequest.contentParam
        //        }
        var queryrequest = {"head": cbuService.creatHead("41001601")};
        $.extend(queryrequest, dataRequest);

        cbuService.getAjaxData(payConfig.CBUUrl.format("sendvercode"), queryrequest, successCallBack, errorCallBack);
    },
    //验证风控短信
    checkVerCode: function (successCallBack, errorCallBack, dataRequest) {
        //        var queryrequest = { "head": { "auth": cbuService.auth, "platform": cbuService.platform, "language": cbuService.language, "orderId": cbuService.orderId, "version": cbuService.version, "serviceCode": "41001601", "token": cbuService.token, "merchantId": cbuService.merchantId, "requestId": cbuService.requestid, "clientIp": "127.0.0.1", "guid": OtherHelper.getGUID() },
        //            "verifyType": dataRequest.verifyType,
        //            "receiver": dataRequest.receiver,
        //            "contentParam": dataRequest.contentParam
        //        }
        var queryrequest = {"head": cbuService.creatHead("41001701")};
        $.extend(queryrequest, dataRequest);

        cbuService.getAjaxData(payConfig.CBUUrl.format("checkvercode"), queryrequest, successCallBack, errorCallBack);
    },

    //DCC查询汇率
    queryCardExchangeRate: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {"head": cbuService.creatHead("41002201")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData(payConfig.CBUUrl.format("querycardexchangerate"), queryrequest, successCallBack, errorCallBack);
    },
    //提交
    paymentSubmit: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {
            "head": cbuService.creatHead("41000303")
            //"payScene": dataRequest.payScene,
            //"amount": dataRequest.amount,
            //"cWallet": dataRequest.cWallet,
            //"password": dataRequest.password,
            //"riskSmsCode": dataRequest.riskSmsCode,
            //
            //"otherAmount": dataRequest.otherAmount,
            //"catalogCode": dataRequest.catalogCode,
            //"paymentWayId": dataRequest.paymentWayId,
            //"brandId": dataRequest.brandId,
            //"channelId": dataRequest.channelId,
            //"cardInfo": dataRequest.cardInfo,
            //
            //"billAddress": dataRequest.billAddress,
            //"requestUpdateInfo": dataRequest.requestUpdateInfo,
            //"callId": dataRequest.callId,
            //"isAutoCreateBill": dataRequest.isAutoCreateBill,
            //"cardOperation": dataRequest.cardOperation,
            //"cardValidDate": dataRequest.cardValidDate,
            //
            //"prevCardInfoId": dataRequest.prevCardInfoId,
            //"prevPaymentWayId": dataRequest.prevPaymentWayId,
            //"mayReceiveBranch": dataRequest.mayReceiveBranch,
            //"mayReceiveSite": dataRequest.mayReceiveSite,
            //"rmsToken": dataRequest.rmsToken
        }
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData(payConfig.CBUUrl.format("paymentsubmit"), queryrequest, successCallBack, errorCallBack);
    },
    getQuickResponseCode: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {"head": cbuService.creatHead("41000305")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData(payConfig.CBUUrl.format("getquickresponsecode"), queryrequest, successCallBack, errorCallBack);
    },
    queryEBankResult: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {"head": cbuService.creatHead("41002102")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData(payConfig.CBUUrl.format("queryebankresult"), queryrequest, successCallBack, errorCallBack, null, false);
    },
    authenticateUser: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {"head": cbuService.creatHead("41002302")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData(payConfig.CBUUrl.format("authenticateuser"), queryrequest, successCallBack, errorCallBack);
    },
    checkAuthStatus: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {"head": cbuService.creatHead("41002301")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData(payConfig.CBUUrl.format("checkauthstatus"), queryrequest, successCallBack, errorCallBack);
    },
    queryWalletDetail: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = {"head": cbuService.creatHead("41001501")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData(payConfig.CBUUrl.format("queryWalletDetail"), queryrequest, successCallBack, errorCallBack);
    }
};


var cbuservice1 = function () {
    var instance = this;
    var
        cbuservice1 = function () {
            return instance;
        }
}


/**
 * Created by li_peng on 2017/10/31.
 */

var directive = {
    format: function () {
        var validayFormat = function (input, oldlen) {
            var l = input.length;
            if (input.length === 1) {
                if (Number(input) > 1) {
                    input = '0' + input;
                }
            }
            if (input.length === 2) {
                if (oldlen > 2 && l > 1) {
                    input = input.substr(0, 1);
                } else if (input > "12" || input == "00") {
                    input = input.substr(0, 1);
                } else {
                    input = input + "/";
                }
            }
            if (input.length > 2) {
                if (input.indexOf("/") === 2) {
                    var maxYear = new Date().getFullYear() + 25;
                    var minYear = new Date().getFullYear();
                    if (input.length == 4) {
                        var t = input.substr(3, 1);
                        var minT = Math.floor((minYear % 100) / 10);
                        var maxT = Math.floor((maxYear % 100) / 10);
                        if (Number(t) < minT || Number(t) > maxT) {
                            input = input.substr(0, 3);
                        }
                    } else if (input.length == 5) {
                        var t = input.substr(3, 2);
                        var minT = 2000 + Number(t);
                        if (minT < minYear || minT > maxYear) {
                            input = input.substr(0, 4);
                        }
                    }
                } else if (input.indexOf("/") === -1) {
                    input = input.substr(0, 2) + "/" + input.substr(2);
                } else {
                    input = input.replace('/', "");
                    input = validayFormat(input, oldlen);
                }
            }
            return input;
        }
        $("[format]").each(function () {
            var eventk = util.inputEventCompatible();
            $(this).bind(eventk, function () {
                var self = this;
                $(self).data("oldv", $(self).val());
                setTimeout(function () {
                    var type = $(self).attr("format");
                    var input = $(self).val();

                    if (type === "validity") {
                        var oldlen = $(self).data("len");
                        if (input == "卡有效期") return;
                        input = validayFormat(input, oldlen);
                        if (input.length == 5) {
                            $.tmplItem(self).data.requireField.validity.check();
                        }
                    } else {
                        input = util.format(input, type);
                    }
                    var oldv = $(self).data("oldv");
                    if (oldv !== input) {
                        $(self).val(input);
                    }
                    $(self).data("len", input ? input.length : 0);
                }, 0);

            });

        });
    },
    placeholdervalue: function () {
        $("[placeholdervalue]").each(function () {

            $(this).val($(this).attr("placeholdervalue"));
            $(this).addClass("input_placeholder");
            $(this).bind("focus", function () {
                var value = $(this).val();
                var placeholdervalue = $(this).attr("placeholdervalue");
                if (value == placeholdervalue || value === "") {
                    //$(this).addClass("input_placeholder");
                    $(this).val("");
                    $(this).removeClass("input_placeholder");
                    var lb = $(this).prev("label[lb]");
                    if (lb.size() != 0) {
                        lb.addClass("fill_in");
                        lb.html(lb.attr("lb"));
                    }
                }
            });
            $(this).bind("blur", function () {
                var value = $(this).val();
                var placeholdervalue = $(this).attr("placeholdervalue");
                if (value == "") {
                    var lb = $(this).prev("label[lb]");
                    if (lb.size() != 0) {
                        lb.removeClass("fill_in");
                        lb.html("");
                    }
                    $(this).val(placeholdervalue);
                    $(this).addClass("input_placeholder");
                }
            });

        });
    }

}

/**
 * Created by li_peng on 2017/10/28.
 */
function slide(ele, isShow) {
    if (isShow) {
        $(ele).slideDown();
    } else {
        $(ele).slideUp();
    }
}

function slide1(ele, isShow) {
    var speed = 300;
    var ieVer = OtherHelper.ieVersion();
    if (isShow) {
        // $(ele).animate({minHeight:'42px'},speed);
        if (ieVer > 0 && ieVer < 8) {
            $(ele).show();
        } else {
            $(ele).slideDown(speed);

            $(ele).children().not(".noslide").not(".tip_error").not("i").slideDown(speed);
        }

    } else {
        if (ieVer > 0 && ieVer < 8) {
            $(ele).hide();
        } else {
            $(ele).children().not(".noslide").not("i").slideUp(speed);

            $(ele).slideUp(speed);
        }
        //$(ele).animate({minHeight:'0px'},speed);
    }
}

function slidePhone(ele, showphone) {
    var speed = 300;
    var ieVer = OtherHelper.ieVersion();
    if (showphone == 1) {
        // $(ele).animate({minHeight:'42px'},speed);
        if (ieVer > 0 && ieVer < 8) {
            $(ele).show();
        } else {
            $(ele).slideDown(speed);
            $(ele).children("div:eq(0)").not(".tip_error").slideDown(speed);
        }
    } else if (showphone == 2) {
        if (ieVer > 0 && ieVer < 8) {
            $(ele).show();
        } else {
            $(ele).slideDown(speed);
            $(ele).children("div:eq(1)").not(".tip_error").slideDown(speed);
        }
    } else {
        if (ieVer > 0 && ieVer < 8) {
            $(ele).hide();
        } else {
            $(ele).children().not(".tip_error").slideUp(speed);
            $(ele).slideUp(speed);
        }
        //$(ele).animate({minHeight:'0px'},speed);
    }
}

function cardbinInit(ele, isPreCardNoMatch) {
    if (isPreCardNoMatch) {

        $(ele).val("请输入银行卡卡号");
        $(ele).addClass("input_placeholder")
    }
}

function labelslideforidcard(ele) {

    var input = $(ele).children("input")[0];
    var label = $(ele).children("label")[0];
    $(input).on("focus", function () {
        var w = -43 - $($("cite")[0]).width();
        $(label).animate({left: w + "px", top: "-20px", fontSize: "12px"}, 500);
    });
    $(input).on("blur", function () {
        var v = $(this).val();
        if (v) return;
        $(label).animate({top: "0px", left: "0px", fontSize: "15px"}, 500);
    });
    $(label).on("click", function () {
        $(input).focus();
    });

}

function labelslide(ele) {

    var input = $(ele).children("input")[0];
    var label = $(ele).children("label")[0];
    $(input).on("focus", function () {
        $(label).animate({top: "-20px", fontSize: "12px"});
    });
    $(input).on("blur", function () {
        var v = $(this).val();
        if (v) return;
        $(label).animate({top: "0px", fontSize: "15px"});
    });
    $(label).on("click", function () {
        $(input).trigger("focus");
    });
}

function labelslideinit(ele) {
    var label = $(ele).children("label")[0];
    $(label).animate({top: "0px", fontSize: "15px"});
}


function popInit(ele) {

    var popHeight = $(ele).height();
    var popWidth = $(ele).width();
    $(ele).css({
        marginTop: -(popHeight / 2),
        marginLeft: -(popWidth / 2)
    });
}

function pop(ele, isShow) {
    if (!$("#mask").data("i")) {
        $("#mask").data("i", 0);
    }
    var i = $("#mask").data("i");
    if (isShow) {
        $("#mask").data("i", i + 1);
        $(ele).show();
    } else {
        $("#mask").data("i", i == 0 ? 0 : i - 1);
        $(ele).hide();
    }
    if ($("#mask").data("i") == 0) {
        $("#mask").hide();
    } else {
        $("#mask").show();
    }

}

function banklogoswitch(ele, banklogo) {
    var logo = $(ele).data("banklogo");
    if (logo) $(ele).removeClass(logo);
    $(ele).addClass(banklogo);
    $(ele).data("banklogo", banklogo);
}

;(function () {
    var timer = null;
    var password1 = "";
    var input = null;
    window.pwdAction = function (ele, password) {
        password1 = password.replace(/[^\d]/g, '');

        input = $(ele).children("input")[0];
        var timerId = '';
        var guangbiao = function (currEle) {
            timer = setTimeout(function () {
                if ($(currEle).hasClass("entering_s1")) {
                    $(currEle).children("i").toggle();
                    guangbiao(currEle);
                }
            }, 700);
        };
        var locateGuangbiao = function () {

            var len = 0;
            if (password1) {
                len = password1.length;
            }

            $(input).trigger("focus");
            setCaretToPos(input, len);
            $(ele).children("span").attr("class", "");
            for (var i = 0; i < len; i++) {
                $($(ele).children("span")[i]).addClass("entered_s1");
                $($(ele).children("span")[i]).children("i").show();
            }
            if (len < 6) {
                var curr = $(ele).children("span")[len];
                $(curr).addClass("entering_s1");
                clearTimeout(timer);
                guangbiao(curr);
            }
        };
        if (!$(ele).data("f")) {
            var f = function () {
                $(ele).on("click", function () {
                    locateGuangbiao();
                });
                $(input).on("blur", function () {
                    $(ele).children(".entering_s1").attr("class", "");
                });
                $(input).on("focus", function () {

                });
                $(ele).data("f", true);
            }();
        } else {
            locateGuangbiao();
        }
    }

    function setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            //input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    function setCaretToPos(input, pos) {
        setSelectionRange(input, pos, pos);
    }
})();


;(function () {
    function selectbind(curr, ul, input) {
        if ($(curr).data("clickflag") != "1") {
            $(curr).on("click", function () {
                $(this).parents('ul').find('li').css({zIndex: 1});
                $(this).parents('li').css({zIndex: 99});
                $(input).trigger("focus");
            });
            $(curr).data("clickflag", "1");
        }
        if ($(input).data("blurflag") != "1") {
            $(input).on("blur", function () {
                //setTimeout(function(){
                $(ul).hide();
                //},0);
            });
            $(input).data("blurflag", "1");
        }
        if ($(input).data("focusflag") != "1") {
            $(input).on("focus", function () {
                if (!payData.payCurrent.otherPaywayCurrent.hasCardHolder) $(ul).show();
            });
            $(input).data("focusflag", "1");
        }
        // selectbind = function () { };
    }

    var idcardlist = [];
    window.selectaction = function (ele, list) {
        idcardlist = list;
        var curr = $(ele).find("cite")[0];
        var ul = $(ele).find("ul")[0];
        var input = $(ele).find("input")[0];
        selectbind(curr, ul, input);
        $(ul).html("");

        $.each(list || [], function (i, e) {
            var li = $('<li style="z-index:98" selectid="' + e.key + '"selectvalue="' + e.value + '" ><a href="javascript:;" shape="" >' + e.value + '</a></li>');
            $(li).mousedown(function () {
                var key = $(this).attr("selectid");
                var value = $(this).attr("selectvalue");
                $(input).val(key);
                $(input).trigger("input");
                $(ul).hide();
                //$(curr).html(value + "<i></i>")
            });
            $(ul).append(li);
        });
    }

    window.setCite = function (ele, idcardkey) {
        if (!idcardlist) return;
        var l = $.grep(idcardlist, function (value) {
            return value.key == idcardkey;
        });
        if (l && l.length > 0) {
            var value = l[0].value;
            if (value && value.length > 8) {
                value = value.substr(0, 7) + "…";
            }
            $(ele).html(value + "<i></i>");
        }
        //var w =$(ele).width()-30;
        //var spanEle =$(ele).parent().next().find("span");
        //var inputEle =$(ele).parent().next().find("input");
        //var w1 =$(inputEle).parent().parent().width();
        //$(inputEle).css("width",(w1-w)+"px");
        //$(spanEle).css("width",(w1-w)+"px");
    }
}());

function showsuper(ele, superEle, txt) {
    var top = 0;
    var left = 0;
    var p = $(ele);
    var popEle = $("javascript:void(0)" + superEle);
//  $("#fff").css({"top":top+"px","left":left+"px"});
    var elewidth = $(ele).outerWidth();
    var Elewidth = popEle.width();
    var Eleheight = popEle.height()
    var _topfix = Eleheight;
    var _leftfix = Elewidth / 2 - elewidth / 2;
    top = p.offset().top - _topfix;
    left = p.offset().left - _leftfix;
    if (txt) {
        popEle.find(".pop_txt1").html(txt);
    }
    popEle.css({"top": top + "px", "left": left + "px"});
    popEle.show();
    return {top: top, left: left};

}

function showlimitPaySuper(ele, superEle) {
    if (!$(ele).hasClass("check_disabled")) {
        return;
    }
    var top = 0;
    var left = 0;
    var p = $(ele);
    var limit = p.data("payLimitAmount");
    $("javascript:void(0)" + superEle).children(".pop_txt1").html("该卡单笔限额¥" + limit + "，无法支付此订单");
//  $("#fff").css({"top":top+"px","left":left+"px"});
    var elewidth = $(ele).width();
    var Elewidth = $("javascript:void(0)" + superEle).width();
    var Eleheight = $("javascript:void(0)" + superEle).height()
    var _topfix = Eleheight;
    var _leftfix = Elewidth / 2 - elewidth / 2;
    top = p.offset().top - _topfix;
    left = p.offset().left - _leftfix;
    $("javascript:void(0)" + superEle).css({"top": top + "px", "left": left + "px"});

    $("javascript:void(0)" + superEle).show();

    return {top: top, left: left};

}

function showHotelsuper(ele, superEle) {
    var top = 0;
    var left = 0;
    var p = $(ele);
    var elewidth = $(ele).width();
    var Elewidth = $("javascript:void(0)" + superEle).width();
    var _topfix = $(ele).height();
    var _leftfix = Elewidth / 2 - elewidth / 2;
    top = p.offset().top + _topfix;
    left = p.offset().left - _leftfix;
    $("javascript:void(0)" + superEle).css({"top": top + "px", "left": left + "px"});
    $("javascript:void(0)" + superEle).show();
    return {top: top, left: left};

}

function hidesuper(ele, superEle) {
    $("javascript:void(0)" + superEle).hide();
}

function setlimitAmount(ele, limitAmount) {
    $(ele).data("payLimitAmount", limitAmount)
}

function setCardnoplaceholder(ele, placeholdervalue) {
    if (!placeholdervalue) return;
    setTimeout(function () {
        $(ele).attr("placeholdervalue", "银行卡号");//"卡号进行智能识别"
        var value = $(ele).val();
        if (value && /^[0-9]*$/.test(util.trim(value, 1))) return;
        $(ele).val("银行卡号");
        $(ele).addClass("input_placeholder");
        var lb = $(ele).prev("label[lb]");
        if (lb.size() != 0) {
            lb.removeClass("fill_in");
            lb.html("");
        }
    }, 50);
}

function setAmeCvvLength(ele, isAme) {
    var value = $(ele).val();
    if (isAme) {
        $(ele).attr("placeholder", "4位信用卡验证码");
        $(ele).attr("maxlength", "4");
        if (value && value.length <= 4) return;
        //setTimeout(function(){ $(ele).val("卡验证码");
        //    $(ele).addClass("input_placeholder");},0);

    } else {
        $(ele).attr("placeholder", "签名栏末尾最后3位");
        $(ele).attr("maxlength", "3");
        if (value && value.length <= 3) return;
        //setTimeout(function(){$(ele).val("卡验证码");
        //    $(ele).addClass("input_placeholder");},0);

    }
}

function setIsForeigncard(ele, isForeign) {
    var value = $(ele).val();
    if (payData.payRequestInfo.cardHolder && value) {
        var lb = $(ele).prev("label[lb]");
        if (lb.size() != 0) {
            lb.addClass("fill_in");
            lb.html(lb.attr("lb"));
        }
        return;
    }
    if (isForeign) {
        $(ele).attr("placeholder", "英文字母，如：Li Meime");
        if (value && value != '持卡人姓名') return;
        //setTimeout(function(){ $(ele).val("持卡人姓名");
        //    $(ele).addClass("input_placeholder");},0);
    } else {
        $(ele).attr("placeholder", "持卡人姓名");
        if (value && value != '持卡人姓名') return;
        //setTimeout(function(){ $(ele).val("持卡人姓名");
        //    $(ele).addClass("input_placeholder");},0);
    }
}

function placeholderInit(ele, isneed) {
    if (isneed) {

        setTimeout(function () {
            var value = $(ele).val();
            if (value) {
            } else {
                var placeholdervalue = $(ele).attr("placeholdervalue");
                $(ele).val(placeholdervalue);
                $(ele).addClass("input_placeholder");
            }

        }, 0);


    }
}

function initImgsrc(ele, src) {

    $(ele).attr("src", imgDic[src]);
}

function setEbankMoreButton(ele) {

    var len = $(ele).children("li").length;
    if (len > 8) {
        var moreButton = $('<li class="more"><i class="more_icon"></i><i>&nbsp;</i><span class="bank_name">更多网银</span></li>');
        $(moreButton).on("click", function () {
            $(this).hide();
            $(ele).children("li:gt(7)").show()
        });

        $($(ele).children("li")[6]).after(moreButton);
        $(ele).children("li:gt(7)").hide();

    }
}

function setMarketingShowBank(ele) {
    var p = $(ele).parent();

    var li = $(ele).parent().next();

    $(ele).on("click", function () {
        $(p).hide();
        $(li).show();
    });
}

function setUsedCardMoreButton(ele) {
    var ul = $(ele).children("ul")[0];
    var len = $(ul).children("li").length;
    if (len > 3) {
        var moreButton = $('<a href="javascript:;" class="more_btn01">更多常用卡<i></i></a>');
        $(moreButton).on("click", function () {
            $(this).hide();
            $(ul).children("li:gt(2)").show()
        });
        $(ul).after(moreButton);
        $(ul).children("li:gt(2)").hide();
    }
}

function showLimitText(ele, isShow) {
    if (isShow) {
        $(ele).bind("mouseover", function () {
            showsuper(ele, 'notSupportIETip', "单笔限额 ¥" + $(this).attr("limit") + "，超出订单金额");
        });
        $(ele).bind("mouseout", function () {
            hidesuper(ele, 'notSupportIETip')
        });
    } else {
        $(ele).unbind("mouseover");
        $(ele).unbind("mouseout");
    }
}

function showCountDown(totalSeconds) {
    if (totalSeconds >= 0) {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = Math.floor(totalSeconds - minutes * 60);
        $("div.price_num span").html((minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        totalSeconds--;
        setTimeout(function () {
            showCountDown(totalSeconds);
        }, 1000);
    }
}

/**
 * Created by li_peng on 2017/9/27.
 */
var util = {
    //去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
    trim: function (str, type) {
        if (!str) {
            return "";
        }
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },
    format: function (input, type) {
        if (!input) return "";
        if (type === "cardno") {
            input = input.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
        } else if (type === "usedcardno") {
            input = input.replace(/\s/g, '');
            input = input.substr(0, 6) + "********" + input.substr(input.length - 2);
            input = input.replace(/([\d|\*]{4})(?=[\d|\*])/g, "$1 ");
        } else if (type === "phoneno") {
            input = input.replace(/\s/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1 $2 $3");
        } else if (type === "idcardno") {
            input = input.replace(/\s/g, '').replace(/^(\d{0,6})(\d{0,8})(\d{0,3})(\d|x|X{0,1})$/g, "$1 $2 $3$4");
        } else if (type === "onlynum") {
            input = input.replace(/[^\d]/g, '');
        }
        return util.trim(input ? input : "", 4);
    },
    inputEventCompatible: function () {
        var ieVer = OtherHelper.ieVersion();
        if (ieVer > 0 && ieVer < 9) {
            //return "propertychange";
            return "keyup blur";
        } else {
            return "input";
        }
    },
    getExpiryDate: function (value) {
        var date = "";
        if (value.indexOf('/') == -1 && value && value.length == 4) {
            date = value.substr(2, 2) + value.substr(0, 2);
        } else {
            date = (value.split('/')[1] || '') + (month = value.split('/')[0] || '');
        }
        return (date.length > 0 ? String(new Date().getFullYear()).substring(0, 2) : '') + date;
    }
}

var NumberUtil = {
    getFixed: function (isAllowDecimalPoint) {
        return isAllowDecimalPoint ? 2 : 0;
    },
    number: function (input) {
        var num = Number(input);
        return (isNaN(num) ? 0 : num);
    },
    amount: function (input, isAllowDecimalPoint) {
        var result = this.number(input);
        var decimals = this.getFixed(isAllowDecimalPoint);
        if (decimals == 0) {
            result = Math.floor(result);
        } else {
            var multiple = Math.pow(10, decimals);
            result = Math.round(result * multiple) / multiple;
        }
        return result;
    },
    float: function (input) {
        var result = parseFloat(input);
        return (isNaN(result) ? 0 : result);
    }
}
/**
 * Created by li_peng on 2017/10/13.
 */

var observe = function (v) {
    var g = function (newvalue) {
        if (newvalue === undefined) {
            return arguments.callee.value;
        }
        var oldvalue = arguments.callee.value;
        arguments.callee.value = newvalue;
        var gCallback = arguments.callee.gCallback;
        for (var i = 0; i < gCallback.length; i++) {
            gCallback[i].f.apply(this, [newvalue, oldvalue]);
        }

    };
    g.value = v;
    g.gCallback = [];
    observelist.push(g);
    return g;
}

function watch(o, fun) {
    var i = {f: fun};
    o.gCallback.push(i);
}

var observelist = [];

var _ = {
    cloneObject: function (obj) {
        var newObj = (obj instanceof Array) ? [] : {};
        for (var i in obj) {
            if (i == 'cloneObject') continue;
            if (obj[i] && typeof obj[i] == "object") {
                newObj[i] = _.cloneObject(obj[i]);
            } else newObj[i] = obj[i];
        }
        return newObj;
    },
    isArray: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isRegExp: function (obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
    },
    toArray: function (str) {
        str = util.trim(str, 2);
        if (str.indexOf("[") !== 0) {
            return str;
        }
        var reArray = _.bracketsMatch(str);

        if (reArray[1].indexOf("[") == 0) {
            reArray[1] = _.toArray(reArray[1]);
        }
        if (reArray[2].indexOf("[") == 0) {
            reArray[2] = _.toArray(reArray[2]);
        }
        return reArray;

    },
    bracketsMatch: function (str) {
        var strs = [];
        var stack = [];

        var a1 = str.substr(1, str.indexOf(",") - 1);
        strs.push(a1);
        str = str.substr(str.indexOf(",") + 1, str.length - str.indexOf(",") - 2);

        if (str.indexOf("[") == 0) {
            stack.push(0);
            var p = 0;
            while (stack.length > 0) {
                if (str.substr(p + 1).indexOf("[") > 0 && (str.substr(p + 1).indexOf("[") < str.substr(p + 1).indexOf("]"))) {
                    p = str.substr(p + 1).indexOf("[") + p + 1;
                    stack.push(str.substr(p + 1).indexOf("[") + p + 1);
                } else {
                    p = str.substr(p + 1).indexOf("]") + p + 1;
                    stack.splice(stack.length - 1, 1);
                }
            }

            strs.push(str.substr(0, p + 1));
            strs.push(str.substr(p + 2));
        } else {
            strs.push(str.split(",")[0]);
            strs.push(str.substr(str.indexOf(",") + 1));
        }
        return strs;
    }
};

var handleCondition = {
    split: function (condition) {
        var dup_condition = _.toArray(condition);
        if (_.isArray(dup_condition)) {
            var dlist = [];
            var im = function (arr) {
                for (var i = 1; i < 3; i++) {
                    if (_.isArray(arr[i])) {
                        im(arr[i]);
                    } else {
                        dlist.push(arr[i]);
                    }
                }
            };
            im(dup_condition);
            return dlist;
        } else {
            return [dup_condition];
        }
    },
    compare: function (a, obj) {
        var arr = a;
        for (var j = 1; j < arr.length; j++) {

            if (typeof (arr[j]) == "string") {
                if (arr[j].indexOf("javascript:void(0)") == 0) {
                    arr[j] = eval(arr[j].substr(1));
                } else {
                    arr[j] = wgetfunc1(obj, arr[j])[1];
                }
            }
        }
        switch (arr[0]) {
            case "==":
                return (arr[1] == arr[2]);

            case "===":
                return (arr[1] === arr[2]);

            case "!=":
                return (arr[1] != arr[2]);

            case "!==":
                return (arr[1] !== arr[2]);

            case "<":
                return (arr[1] < arr[2]);

            case ">":
                return (arr[1] > arr[2]);
            case "<=":
                return (arr[1] <= arr[2]);
            case ">=":
                return (arr[1] >= arr[2]);

            case "&&":
                return (arr[1] && arr[2]);

            case "||":
                return (arr[1] || arr[2]);
            case "+":
                return (arr[1] + arr[2]);
            case "-":
                return (arr[1] - arr[2]);
            case "*":
                return (arr[1] * arr[2]);
            //case "$match":
            //    if(_.isRegExp(arr[1])){
            //        return arr[1].test(arr[2]);
            //    }else{
            //        var str = String(arr[1]);
            //        var reg = new RegExp(arr[1]);
            //        return reg.test(arr[2]);
            //    }

            default:
                return (arr[1] == arr[2]);
        }
    },
    calculateCondition: function (conditionstr, obj) {
        var a = _.toArray(conditionstr);

        if (_.isArray(a)) {
            var im = function (arr, obj) {
                for (var i = 0; i < 3; i++) {
                    if (_.isArray(arr[i])) {
                        arr[i] = im(arr[i], obj);
                    }
                }
                return handleCondition.compare(arr, obj);
            };

            var res = im(a, obj);
            return res;
        } else {
            var arr = [];

            if (a.indexOf("javascript:void(0)") == 0) {
                return eval(a.substr(1));
            } else {
                arr = wgetfunc1(obj, a);
                return arr[0][arr[2]];
            }
            // handleCondition.compare(["&&",a,true],obj);
        }
    }
}
var wlockevent = false;

function wbinddata() {
    wbindclear();
    $("[w-show]").each(function (index, ele) {
        wshow(ele);
    });

    $("[w-class]").each(function (index, ele) {
        wclass(ele);
    });

    $("[w-html]").each(function (index, ele) {
        whtml(ele);
    });
    $("[w-text]").each(function (index, ele) {
        wtext(ele);
    });
    $("[w-action]").each(function (index, ele) {

        var v = $(ele).attr("w-action");

        if (v.indexOf("{") == 0) {
            var json_v = eval('(' + v + ')');
            var f = function (e, v1, k) {
                watch(e, function (data) {
                    window[k](ele, handleCondition.calculateCondition(v1, $.tmplItem(ele).data));
                });
            }
            for (var k in json_v) {
                var v = json_v[k];
                if (v) {
                    addwatch(ele, f, v, k);
                } else {
                    window[k](ele);
                }
            }
        } else {
            window[v](ele);
        }
    });
    $("[w-init]").each(function (index, ele) {

        var v = $(ele).attr("w-init");

        if (v.indexOf("{") == 0) {
            var json_v = eval('(' + v + ')');
            for (var k in json_v) {
                var v = json_v[k];
                if (v) {
                    window[k](ele, handleCondition.calculateCondition(v, $.tmplItem(ele).data));
                } else {
                    window[k](ele);
                }
            }
        } else {
            window[v](ele);
        }
    });
    $("[w-readonly]").each(function (index, ele) {
        var v = $(ele).attr("w-readonly");
        v = util.trim(v, 2);
        var f = function (e, v1) {
            watch(e, function () {
                if (handleCondition.calculateCondition(v1, $.tmplItem(ele).data)) {
                    $(ele).attr("readonly", "readonly");
                } else {
                    $(ele).removeAttr("readonly");
                }
            });
        }
        addwatch(ele, f, v);
    });
    wbindinit();
}

function wbindevent() {
    $("[w-event]").each(function (index, ele) {
        var v = $(ele).attr("w-event");
        var json_v = eval('(' + v + ')');
        var f = function (v, k) {
            $(ele).on(k, function () {
                wdoevent($.tmplItem(ele).data, v);
            });
        }
        for (var k in json_v) {
            var v = json_v[k];
            f(v, k);
        }
    });

    $("[w-model]").each(function (index, ele) {
        var eventk = util.inputEventCompatible();
        $(this).bind(eventk, function () {
            var c = $(ele).attr("w-model");
            var f1 = null;
            var f2 = null;
            if (c.indexOf("javascript:void(0)") == 0) {
                c = c.substr(1);
                f1 = wgetfunc1(window, c);
                c = c + "_watch_";
                f2 = wgetfunc1(window, c);
            } else {
                var e = $.tmplItem(this);
                f1 = wgetfunc1(e.data, c);
                c = c + "_watch_";
                f2 = wgetfunc1(e.data, c);
            }
            f1[0][f1[2]] = $(this).val();
            if (f2[1])
                f2[0][f2[2]]($(this).val());
        });

        var v = $(ele).attr("w-model");

        var f = function (e) {
            watch(e, function (data, olddata) {
                if (data !== olddata) {
                    setTimeout(function () {//中文输入问题
                        $(ele).val(data);
                    }, 0);
                }
            });
        }
        addwatch(ele, f, v);
    });
}

function wbind() {
    wbinddata();
    wbindevent();
}

function wbindinit() {
    for (var i = 0; i < observelist.length; i++) {
        observelist[i](observelist[i]());
    }
}

function wbindclear() {
    for (var i = 0; i < observelist.length; i++) {
        observelist[i].gCallback = [];
    }
}

function wdoevent(obj, v) {
    if (wlockevent === true) return;
    if (v.indexOf("javascript:void(0)") == 0) {
        eval(v.substr(1));
    } else {
        var d = wgetfunc1(obj, v);
        if (d.length > 3 && d[3]) {
            d[1].apply(d[0], d[3]);
        } else
            d[1].apply(d[0]);
    }
}

function wshow(ele) {
    var v = $(ele).attr("w-show");
    v = util.trim(v, 2);
    var f = function (e, v1) {
        watch(e, function () {
            try {
                if (handleCondition.calculateCondition(v1, $.tmplItem(ele).data)) {
                    $(ele).show();
                } else {
                    $(ele).hide();
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
    addwatch(ele, f, v);
}

function wclass(ele) {
    var v = $(ele).attr("w-class");
    var json_v = eval('(' + v + ')');
    var f = function (e, v1, k) {
        watch(e, function (data) {
            if (handleCondition.calculateCondition(v1, $.tmplItem(ele).data)) {
                $(ele).addClass(k);
            } else {
                $(ele).removeClass(k);
            }
        });
    }
    for (var k in json_v) {
        var v = json_v[k];
        addwatch(ele, f, v, k);
    }
}

function whtml(ele) {
    var v = $(ele).attr("w-html");

    var vs = v.split('|');
    var k = null;
    if (vs[1]) {
        k = vs[1];
    }
    var f = function (e, v, k) {
        var tk = k || "";
        var a = tk.split(':')[0];
        var b = tk.split(':')[1];
        watch(e, function (data) {
            if (a == "number") {
                var c = isNaN(Number(b)) ? 0 : Number(b);
                data = isNaN(Number(data)) ? 0 : Number(data);
                $(ele).html(data.toFixed(c));
            } else {
                $(ele).html(data);
            }
        });
    }
    addwatch(ele, f, vs[0], k);
    //watch(eval(v),function(data){
    //    $(ele).html(data);
    //});
}

function wtext(ele) {
    var v = $(ele).attr("w-text");

    var vs = v.split('|');
    var k = null;
    if (vs[1]) {
        k = vs[1];
    }
    var f = function (e, v, k) {
        var tk = k || "";
        var a = tk.split(':')[0];
        var b = tk.split(':')[1];
        watch(e, function (data) {
            if (a == "number") {
                var c = isNaN(Number(b)) ? 0 : Number(b);
                data = isNaN(Number(data)) ? 0 : Number(data);
                $(ele).text(data.toFixed(c));
            } else {
                $(ele).text(data);
            }
        });
    }
    addwatch(ele, f, vs[0], k);
}

function wgetfunc(obj, v) {
    var arr = v.split('.');
    var reobj = obj;
    for (var i = 0; i < arr.length; i++) {
        if (!reobj) break;
        if (arr[i].indexOf("[") > 0) {
            var n = arr[i].substr(0, arr[i].indexOf("["));
            var id = arr[i].substr(arr[i].indexOf("["));
            id = id.substr(1, id.length - 2);
            id = Number(id);
            reobj = reobj[n][id];
        } else
            reobj = reobj[arr[i]];
    }
    return reobj
}

function wgetfunc1(obj, v) {
    v = util.trim(v, 2);
    var vs, tempVs;
    if (v.indexOf("[") == 0) {//[#true,select()]类似这样的格式
        v = v.substr(1, v.length - 2);
        vs = v.split(',');
        v = vs[vs.length - 1];
        vs = vs.slice(0, vs.length - 1);
        //handleCondition.calculateCondition(v1,$.tmplItem(ele).data)
        tempVs = [];
        for (var i = 0; i < vs.length; i++) {
            tempVs.push(handleCondition.calculateCondition(vs[i], obj));
        }

    }
    if (v.indexOf("(") > 0) {
        v = v.substr(0, v.length - 2);
    }
    var arr = v.split('.');
    var reobjp = obj;
    var reobj = obj;
    var name = "";
    for (var i = 0; i < arr.length; i++) {
        if (!reobj) break;
        if (arr[i].indexOf("[") > 0) {
            var n = arr[i].substr(0, arr[i].indexOf("["));
            var id = arr[i].substr(arr[i].indexOf("["));
            id = id.substr(1, id.length - 2);
            id = Number(id);
            reobjp = reobj;
            reobj = reobj[n][id];
        } else {
            reobjp = reobj;
            reobj = reobjp[arr[i]];
        }
        name = arr[i];
    }

    //if (!reobj && name.indexOf("_watch_") > -1) {
    //    reobjp[name] = observe(reobjp[name.replace("_watch_", "")]);
    //    reobj = reobjp[name];
    //}
    if (reobj && reobj === reobj.window) reobj = undefined;
    return [reobjp, reobj, name, tempVs]
}

function addwatch(ele, f, v, k) {
    var condlist = handleCondition.split(v);
    for (var i = 0; i < condlist.length; i++) {
        var c = condlist[i] + '_watch_';
        var func = null;
        if (c.indexOf("javascript:void(0)") == 0) {
            c = c.substr(1);
            func = wgetfunc1(window, c)[1];
        } else {
            var e = $.tmplItem(ele);
            func = wgetfunc1(e.data, c)[1];
        }
        if (func) f(func, v, k);
    }
}

function strToTree(str) {
    var flag = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === "(") {
            flag = flag + 1;
        } else if (str[i] === ")") {
            flag = flag - 1;
        }
    }
}