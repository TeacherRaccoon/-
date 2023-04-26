var cbuService = {
    platform: "25",    //国际站25
    version: "1.0.0.2",     //版本
    urlTemplet: "",
    auth: "",
    language: "",
    orderId: "",
    token: "",
    merchantId: "",
    requestId: "",
    clientIp: "127.0.0.1",
    proxyUrl: "", //代理url(全路径或相对路径)，在低版本浏览器下转发cbu请求
    compensateFlg: false, //如果true，那么ajax失败后会使用代理方式转发ajax
    noSupportGateWay: false, //如果true，表示直接访问gateway失败
    publicKey: "", //加密公钥

    //初始化参数
    init: function (info) {
        $.extend(cbuService, info);
        EncryptHelper.init(info.publicKey);
    },
    getEncryptAttr: function (d) {
        var strEnc = EncryptHelper.encrypt(d);
        if (!strEnc){
            //降级处理
            if (d == null){
                return null;
            }
            else{
                logUbt("Error:", "Payment-UBT-Error",0);
                return { "content": d, "encrypt": ""};
            }
        }
        else{
            return { "content": strEnc, "encrypt": "RSA"};
        }
    },
    getEncryptObj: function (objRequestData, fieldsNeedEnc) {
        try{
            if (objRequestData == null){
                return objRequestData;
            }

            for(var j = 0,len=fieldsNeedEnc.length; j < len; j++) {
                var key = fieldsNeedEnc[j];
                if (objRequestData[key] == null || objRequestData[key] == "") {
                    continue;
                }
                else if (objRequestData[key].encrypt == null) {
                    objRequestData[key+"Rsa"] = cbuService.getEncryptAttr(objRequestData[key]);
                    delete objRequestData[key];
                }
                else if (objRequestData[key].encrypt == "") {
                    if (objRequestData[key].content == null || objRequestData[key].content == ""){
                        continue;
                    }
                    else
                    {
                        objRequestData[key] = cbuService.getEncryptAttr(objRequestData[key].content);
                    }
                }
                else {
                    continue;
                }
            }

        }
        catch(e){
            logUbt("Error:", "Payment-UBT-Error",0);
        }
        return objRequestData;
    },


    creatHead: function (serviceCode, guid) {
        var head = { "auth": cbuService.auth,
            "platform": cbuService.platform,
            "language": cbuService.language,
            "orderId": cbuService.orderId,
            "version": cbuService.version,
            "serviceCode": serviceCode,
            "token": cbuService.token,
            "merchantId": cbuService.merchantId,
            "requestId": cbuService.requestId,
            "clientIp": cbuService.clientIp,
            "guid": guid || OtherHelper.getUBTGuid()
        };

        return head;
    },

    getAjaxData: function (interfaceName, request, successCallBack, errorCallBack, timeout, async) {
        //timeout = timeout || 1000*60*5;
        jQuery.support.cors = true;
        var promise;

        var timeStart = new Date();
        if ((cbuService.compensateFlg == true && cbuService.noSupportGateWay == true) || (jQuery.browser.msie && (parseInt(jQuery.browser.version, 10) < 10))) {
            promise = jQuery.ajax({
                url: cbuService.proxyUrl,
                timeout: timeout,
                type: 'POST',
                dataType: 'json',
                data: "interfaceName=" + interfaceName + "&postJson=" + encodeURIComponent(JSON.stringify(request)),
                cache: false,
                async: async === false ? false : true,
                success: function (response, requestData) {
                    //成功
                    var timeEnd = new Date();
                    var interval = timeEnd.getTime() - timeStart.getTime();
                    var requestTmp = {};
                    try {
                        requestTmp = JSON.parse(decodeURIComponent(OtherHelper.getArgsFromStr(this.data, "postJson")));
                    }
                    catch (e) {

                    }
                    logAjaxUbt(request,{"success":true}, "Payment-UBT-API",interval);
                    successCallBack(response, requestTmp);
                    OtherHelper.getUBTGuid(true);
                },
                error: function (xhr, status, err, requestData) {
                    //异常
                    //反向解析
                    var timeEnd = new Date();
                    var interval = timeEnd.getTime() - timeStart.getTime();

                    var requestTmp = {};
                    try {
                        requestTmp = JSON.parse(OtherHelper.getArgsFromStr(this.data, "postJson"));
                    }
                    catch (e) {

                    }
                    logAjaxUbt(request,{"success":false,"code":status}, "Payment-UBT-API",interval);
                    errorCallBack(xhr, status, err, requestTmp);
                    OtherHelper.getUBTGuid(true);
                }
            });
        }
        else {
            if(cbuService.compensateFlg == true){
                return cbuService.getAjaxData2(interfaceName, request, successCallBack, errorCallBack, timeout, async);
            }
            promise = jQuery.ajax({
                url: cbuService.urlTemplet.format(interfaceName),
                timeout: timeout,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(request),
                cache: false,
                async: async === false ? false : true,
                success: function (response, requestData) {
                    //成功
                    var timeEnd = new Date();
                    var interval = timeEnd.getTime() - timeStart.getTime();
                    logAjaxUbt(request,{"success":true}, "Payment-UBT-API",interval);
                    successCallBack(response, JSON.parse(this.data));
                    OtherHelper.getUBTGuid(true);
                },
                error: function (xhr, status, err, requestData) {
                    //异常
                    var timeEnd = new Date();
                    var interval = timeEnd.getTime() - timeStart.getTime();
                    logAjaxUbt(request,{"success":false,"code":status}, "Payment-UBT-API",interval);
                    errorCallBack(xhr, status, err, JSON.parse(this.data));
                    OtherHelper.getUBTGuid(true);
                }
            });
        }
        return promise;
    },

    getAjaxObject: function(lastAjaxObject, retCode,successCallBack, errorCallBack){
        lastAjaxObject.url = cbuService.proxyUrl;
        lastAjaxObject.data = "interfaceName=" + lastAjaxObject.interfaceName + "&postJson=" + encodeURIComponent(lastAjaxObject.data) + "&retCode="+retCode;
        lastAjaxObject.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
        lastAjaxObject.success = function (response, requestData) {
            //成功
            var requestTmp = {};
            try {
                requestTmp = JSON.parse(decodeURIComponent(OtherHelper.getArgsFromStr(this.data, "postJson")));
            }
            catch (e) {

            }
            successCallBack(response, requestTmp);
        };
        lastAjaxObject.error = function (xhr, status, err, requestData) {
            //异常
            //反向解析
            var requestTmp = {};
            try {
                requestTmp = JSON.parse(OtherHelper.getArgsFromStr(this.data, "postJson"));
            }
            catch (e) {

            }

            errorCallBack(xhr, status, err, requestTmp);
        };
        return lastAjaxObject;
    },

    getAjaxData2: function (interfaceName, request, successCallBack, errorCallBack, timeout, async) {
        var promise;
        var timeStart = new Date();
        try
        {
            jQuery.support.cors = true;
            promise = jQuery.ajax({
                url: cbuService.urlTemplet.format(interfaceName),
                timeout: timeout,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(request),
                interfaceName: interfaceName,
                cache: false,
                async: async === false ? false : true,
                success: function (response, requestData) {
                    //成功
                    var timeEnd = new Date();
                    var interval = timeEnd.getTime() - timeStart.getTime();
                    logAjaxUbt(request,{"success":true}, "Payment-UBT-API",interval);
                    successCallBack(response, JSON.parse(this.data));
                    OtherHelper.getUBTGuid(true);
                },
                error: function (xhr, status, err, requestData) {
                    //失败
                    cbuService.noSupportGateWay = true;

                    //获取retCode
                    var retCode = "";
                    if (xhr != null && xhr.status != null)
                    {
                        retCode = xhr.status;
                    }

                    var timeEnd = new Date();
                    var interval = timeEnd.getTime() - timeStart.getTime();
                    logAjaxUbt(request,{"success":false,"code":status}, "Payment-UBT-API",interval);
                    //使用代理的方式重新发送
                    jQuery.ajax(cbuService.getAjaxObject(this, retCode, successCallBack, errorCallBack));
                    OtherHelper.getUBTGuid(true);
                }
            });
        }
        catch (e) {
        }
        return promise;
    },

    getExternalAjaxData: function (url, request, successCallBack, errorCallBack, timeout) {
        //timeout = timeout || 1000*60*5;
        jQuery.support.cors = true;
        var promise;
        if (jQuery.browser.msie && (parseInt(jQuery.browser.version, 10) < 10)) {
            promise = jQuery.ajax({
                url: cbuService.proxyUrl,
                timeout: timeout,
                type: 'POST',
                dataType: 'json',
                data: "url=" + url + "&postJson=" + encodeURIComponent(JSON.stringify(request)),
                cache: false,
                success: function (response, requestData) {
                    //成功
                    //反向解析
                    var requestTmp = {};
                    try {
                        requestTmp = JSON.parse(decodeURIComponent(OtherHelper.getArgsFromStr(this.data, "postJson")));
                    }
                    catch (e) {

                    }

                    successCallBack(response, requestTmp);
                },
                error: function (xhr, status, err, requestData) {
                    //异常
                    //反向解析
                    var requestTmp = {};
                    try {
                        requestTmp = JSON.parse(OtherHelper.getArgsFromStr(this.data, "postJson"));
                    }
                    catch (e) {

                    }

                    errorCallBack(xhr, status, err, requestTmp);
                }
            });
        }
        else {
            promise = jQuery.ajax({
                url: url,
                timeout: timeout,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(request),
                cache: false,
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
        var queryrequest = { "head": cbuService.creatHead("41000101") };
        cbuService.getAjaxData("queryorderpaymentinfo", queryrequest, successCallBack, errorCallBack);
    },
    //卡号识别
    cardnomatch: function (successCallBack, errorCallBack, dataRequest) {
        //加密处理
        dataRequest = cbuService.getEncryptObj(dataRequest,["cardNo"]);

        var queryrequest = { "head": cbuService.creatHead("41001301", dataRequest.guid),
            "cardNo": dataRequest.cardNo,
            "chargeMode": dataRequest.chargeMode,
            "amount": dataRequest.amount,
            "currencyCode": dataRequest.currencyCode,
            "idCardType": dataRequest.idCardType,
            "matchType": dataRequest.matchType
        }
        cbuService.getAjaxData("cardnomatch", queryrequest, successCallBack, errorCallBack, 100000);
    },
    //常用卡证件类型二次路由
    queryUsedCard: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = { "head":cbuService.creatHead("41001303", dataRequest.guid),
            "chargeMode": dataRequest.chargeMode,
            "amount": dataRequest.amount,
            "currencyCode": dataRequest.currencyCode,
            "idCardType": dataRequest.idCardType,
            "cardInfoId": dataRequest.cardInfoId
        };
        cbuService.getAjaxData("queryusedcard", queryrequest, successCallBack, errorCallBack, 100000);
    },
    //验证礼品卡密码
    verifyPaymentPassword: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = { "head": cbuService.creatHead("41000401")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("verifypaymentpassword", queryrequest, successCallBack, errorCallBack);
    },
    //发送短信验证码
    sendVerCode: function (successCallBack, errorCallBack, dataRequest) {
        //加密处理
        dataRequest.contentParam = JSON.stringify(cbuService.getEncryptObj(JSON.parse(dataRequest.contentParam),["cardNo","cardVerifyNo","expiryDate","phoneNumber","cardHolder","idCardNo","cardPassword"]));
        var queryrequest = { "head": cbuService.creatHead("41001601") } ;
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("sendvercode", queryrequest, successCallBack, errorCallBack);
    },
    //DCC查询汇率
    queryCardExchangeRate: function (successCallBack, errorCallBack, dataRequest) {
        dataRequest = cbuService.getEncryptObj(dataRequest,["cardNo","cardVerifyNo","expiryDate","phoneNumber","cardHolder","idCardNo"]);
        var queryrequest = { "head": cbuService.creatHead("41002201")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("querycardexchangerate", queryrequest, successCallBack, errorCallBack);
    },
    //提交
    paymentSubmit: function (successCallBack, errorCallBack, dataRequest) {
        // var queryrequest = { "head": { "auth": cbuService.auth, "platform": cbuService.platform, "language": cbuService.language, "orderId": cbuService.orderId, "version": cbuService.version, "serviceCode": "41000303", "token": cbuService.token, "merchantId": cbuService.merchantId, "requestId": cbuService.requestid, "clientIp": cbuService.clientIp, "guid": OtherHelper.getGUID() },
        //     "payScene": dataRequest.payScene,
        //     "amount": dataRequest.amount,
        //     "cWallet": dataRequest.cWallet,
        //     "password": dataRequest.password,
        //     "riskSmsCode": dataRequest.riskSmsCode,

        //     "otherAmount": dataRequest.otherAmount,
        //     "catalogCode": dataRequest.catalogCode,
        //     "paymentWayId": dataRequest.paymentWayId,
        //     "brandId": dataRequest.brandId,
        //     "channelId": dataRequest.channelId,
        //     "cardInfo": dataRequest.cardInfo,
        //     "ebankInfo": dataRequest.ebankInfo,

        //     "billAddress": dataRequest.billAddress,
        //     "requestUpdateInfo": dataRequest.requestUpdateInfo,
        //     "callId": dataRequest.callId,
        //     "isAutoCreateBill": dataRequest.isAutoCreateBill,
        //     "cardOperation": dataRequest.cardOperation,
        //     "cardValidDate": dataRequest.cardValidDate,

        //     "prevCardInfoId": dataRequest.prevCardInfoId,
        //     "prevPaymentWayId": dataRequest.prevPaymentWayId,
        //     "mayReceiveBranch": dataRequest.mayReceiveBranch,
        //     "mayReceiveSite": dataRequest.mayReceiveSite,
        //     "rmsToken": dataRequest.rmsToken,
        //     "extend": dataRequest.extend
        // }
        // 
        dataRequest.cardInfo = cbuService.getEncryptObj(dataRequest.cardInfo,["cardNo","cardVerifyNo","expiryDate","smsCode","phoneNumber","cardHolder","idCardNo","email","birthday","cardPassword","businessNumber"]);
        dataRequest.billAddress = cbuService.getEncryptObj(dataRequest.billAddress,["nationality","nationalityCode","address","province","city","zipcode","isuueNationality","bankName","billingEmail","contactPhoneNo"]);
        var queryrequest = { "head": cbuService.creatHead("41000303")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("paymentsubmit", queryrequest, successCallBack, errorCallBack);
    },
    /**
    * @author maoch
    * @class  [className]
    * @param  {[type]}    successCallBack [description]
    * @param  {[type]}    errorCallBack   [description]
    * @param  {[type]}    dataRequest     [description]
    * @return {[type]}                    [description]
    */
    queryEBankResult: function (successCallBack, errorCallBack, dataRequest) {
        // var queryrequest = { "head": { "auth": cbuService.auth, "platform": cbuService.platform, "language": cbuService.language, "orderId": cbuService.orderId, "version": cbuService.version, "serviceCode": "41002102", "token": cbuService.token, "merchantId": cbuService.merchantId, "requestId": cbuService.requestid, "clientIp": cbuService.clientIp, "guid": OtherHelper.getGUID() },
        //     "operateType": dataRequest.operateType,
        //     "eBankPayId": dataRequest.eBankPayId
        // }
        var queryrequest = { "head":cbuService.creatHead("41002102")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("queryebankresult", queryrequest, successCallBack, errorCallBack,10000,false);
    },
    
    getPaymentResult: function (successCallBack, errorCallBack, dataRequest) {
        // var queryrequest = { "head": { "auth": cbuService.auth, "platform": cbuService.platform, "language": cbuService.language, "orderId": cbuService.orderId, "version": cbuService.version, "serviceCode": "41002101", "token": cbuService.token, "merchantId": cbuService.merchantId, "requestId": cbuService.requestid, "clientIp": cbuService.clientIp, "guid": OtherHelper.getGUID() },
        //     "billNo": dataRequest.billNo,
        //     "paymentWayId": dataRequest.paymentWayId,
        //     "result3Ds": dataRequest.result3Ds
        // }
        var queryrequest = { "head": cbuService.creatHead("41002101")};
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("getpaymentresult", queryrequest, successCallBack, errorCallBack);
    },
    //实名认证
    authenticateUser: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = { "head": cbuService.creatHead("41002302") };
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("authenticateuser", queryrequest, successCallBack, errorCallBack);
    },
    //检查是否需要实名认证
    checkAuthStatus: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = { "head": cbuService.creatHead("41002301") };
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("checkauthstatus", queryrequest, successCallBack, errorCallBack);
    },
    //领用礼品卡
    receiveTicketCard: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = { "head": cbuService.creatHead("41000402") };
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("receiveTicketCard", queryrequest, successCallBack, errorCallBack);
    },
    //验证风控短信
    checkVerCode: function (successCallBack, errorCallBack, dataRequest) {
       
        var queryrequest = { "head": cbuService.creatHead("41001701") };
        $.extend(queryrequest, dataRequest);

        cbuService.getAjaxData("checkvercode", queryrequest, successCallBack, errorCallBack);
    },
    //二维码刷新
    getQuickResponseCode: function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = { "head": cbuService.creatHead("41000305") };
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("getquickresponsecode", queryrequest, successCallBack, errorCallBack);
    },
    queryWalletDetail:function (successCallBack, errorCallBack, dataRequest) {
        var queryrequest = { "head": cbuService.creatHead("41001501") };
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("queryWalletDetail", queryrequest, successCallBack, errorCallBack);
    },
    //验证公司账户密码
    verifyCorpPassword:function (successCallBack,errorCallBack,dataRequest) {
        var queryrequest = { "head": cbuService.creatHead("41002001") };
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("verifycorppassword", queryrequest, successCallBack, errorCallBack);
    },
    //非原路退款
    nonOriginalRefundSubmit :function (successCallBack,errorCallBack,dataRequest) {
        dataRequest = cbuService.getEncryptObj(dataRequest,["bankAccountName","bankAccountCode","phoneNumber"]);
        var queryrequest = { "head": cbuService.creatHead("41000306") };
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("nonoriginalrefundsubmit", queryrequest, successCallBack, errorCallBack);
    },
    //新3ds-3D验证
    threeDsSubmit :function (successCallBack,errorCallBack,dataRequest) {
        var queryrequest = { "head": cbuService.creatHead("41002307") };
        $.extend(queryrequest, dataRequest);
        cbuService.getAjaxData("threedssubmit", queryrequest, successCallBack, errorCallBack);
    },
    /**
    * @author maoch
    * @param  {function}    successCallBack [description]
    * @param  {function}    errorCallBack   [description]
    * @param  {Object}    dataRequest     [description]
    * @return {void}                    [description]
    */
    getServiceTelList: function (successCallBack, errorCallBack, dataRequest) {
        cbuService.getExternalAjaxData("http://m.ctrip.com/restapi/soa2/11296/json/ListAllServiceTel", dataRequest, successCallBack, errorCallBack);
    }
};


