var authuserModel = function (parent, model) {
    this.parent = parent;
    this.realName = "";
    this.realName_watch_ = observe("");
    this.idTypeName = "";
    this.idTypeName_watch_ = observe("");
    this.idNo = "";
    this.idNo_watch_ = observe("");
    this.successCallback = null;
    this.errorCallback = null;
    this.status =1;// 1:实名认证 2:loading 3:success 4:fail
    this.status_watch_=observe(1);

    if (model) {
        this.init(model);
    }
}

authuserModel.prototype = {
    init: function (model) {
        this.realName = model.realName;
        this.realName_watch_(this.realName);
        this.idTypeName = model.idTypeName;
        this.idTypeName_watch_(this.idTypeName);
        this.idNo = model.idNo;
        this.idNo_watch_(this.idNo);

        this.billNo = model.billNo;
        this.setStatus(1);
    },
    show: function (request) {
        this.init(request);
        this.successCallback = request.successCallback;
        this.errorCallback = request.errorCallback;
    },
    submit: function () {
        var self = this;
        var requestData = {
            billNo:this.billNo
        };
        this.setStatus(2);
        cbuService.authenticateUser(function (response) {
            self.setStatus(1);
            if (response.retCode === "0") {

                payData.popAuthuserMessage.show({
                    status:1,
                    successCallback:function(){
                        if (self.successCallback) self.successCallback();
                    }
                });
            }
            else {
                payData.popAuthuserMessage.show({
                    status:2,
                    successCallback:function(){
                        self.submit();
                    },
                    errorCallback:function(){}
                });

            }
        }, function () {
            self.setStatus(1);
            payData.popAuthuserMessage.show({
                status:2,
                successCallback:function(){
                    self.submit();
                },
                errorCallback:function(){}
            });
        }, requestData);
    },

    close: function () {
        if (this.errorCallback) this.errorCallback();
    },
    setStatus:function(v){
        if(v===2){ wlockevent=true;}
        else{wlockevent=false};
        this.status=v;
        this.status_watch_(v)

    }
}

var popAuthuserMessageModel = function (parent) {
    this.parent = parent;
    this.isShow = false;
    this.isShow_watch_ = observe(false);
    this.status=1;//1:success 2:fail
    this.status_watch_=observe(1);
    this.successCallback = null;
    this.errorCallback = null;
}
popAuthuserMessageModel.prototype={
    init:function(model){
        this.status=model.status;//1:success 2:fail
        this.status_watch_(this.status);
        this.successCallback = model.successCallback;
        this.errorCallback = model.errorCallback;
    },
    show:function(request){
        this.isShow = true;
        this.isShow_watch_(true);

        this.init(request);
    },
    retry:function(){
        this.isShow = false;
        this.isShow_watch_(false);
        this.successCallback(2);
    },
    complete:function(){
        this.isShow = false;
        this.isShow_watch_(false);
        this.successCallback(1);
    },
    close:function(){
        this.isShow = false;
        this.isShow_watch_(false);
        this.errorCallback();
    }
}

/**
 * Created by li_peng on 2017/12/26.
 */
var cashcomfirmModel=function(parent){
    this.parent=parent;
    this.isShow = false;
    this.isShow_watch_ = observe(false);

    this.paywayname = "";
    this.paywayname_watch_ = observe("");
    this.cashAddress = "";
    this.cashAddress_watch_ = observe("");
    this.payAmount = 0;
    this.payAmount_watch_ = observe(0);
    this.successCallback = null;
    this.errorCallback = null;
}
cashcomfirmModel.prototype = {
    init:function(model){
        this.paywayname = model.paywayname;
        this.paywayname_watch_ (this.paywayname);
        this.cashAddress =  model.cashAddress;
        this.cashAddress_watch_(this.cashAddress);
        this.payAmount =  model.payAmount;
        this.payAmount_watch_(this.payAmount);
        this.successCallback = model.successCallback;
        this.errorCallback = model.errorCallback;

    },
    show: function (model) {
        this.init(model);
        this.isShow = true;
        this.isShow_watch_(true);
    },
    submit:function(){
        this.isShow = false;
        this.isShow_watch_(false);
        this.successCallback();
    },
    close:function(){
        this.isShow = false;
        this.isShow_watch_(false);
        if (this.errorCallback)
            this.errorCallback();
    }

}
/**
 * Created by li_peng on 2017/10/27.
 */
var ctripItemModel = function ( parm, parent )
{
    this.parent = parent;
    this.title = "";
    this.isUsed = false;
    this.isUsed_watch_ = observe( false );
    this.availableAmount = 0;
    this.availableAmount_watch_ = observe(0);
    this.isHighRisk = false;
    this.categoryId = null;
    this.logo = "";
    this.catalogCode = "CtripWallet";
    this.paymentWayId = "";
    this.usedAmount = 0;
    this.usedAmount_watch_ = observe( 0 );
    this.usedAmountTemp = 0;
    this.usedAmountTemp_watch_ = observe( 0 );
    this.isShowGetGiftCard = false;
    this.isShowGetGiftCard_watch_ = observe(false);
    this._path = "payData.ctripPayInfo.ctripPayList";
}
ctripItemModel.prototype = {
    trigger: function () {
        var self = this;
        var dolist = function (step) {
            if (!step) step = 0;

            switch (step) {
                case -1:
                    return;
                case 0:
                    ////仅有小数金额，但是商户不支持小数金额时返回,已经在展示时根据配置过滤了小数金额
                    //if(NumberUtil.amount(self.availableAmount,self.isAllowDecimalPoint)==0){
                    //    dolist(-1);return;
                    //}
                    if (payData.settingCtripPassward.hasPassword) {
                        dolist(step + 1);
                    }
                    else {
                        if (!self.parent.passwordSetting || self.isUsed) {
                            payData.settingCtripPassward.show({
                                successCallback: function (walletDetail) {
                                    if(!!walletDetail.hasPassword){
                                        dolist(step + 1);
                                    }else{
                                        dolist(-1);
                                    }

                                },
                                errorCallback: function () {
                                    dolist(-1);
                                }
                            });
                        }
                        else {
                            dolist(step + 1);
                        }
                    }
                    break;
                case 1:
                    if (payData.payCurrent.restAmount > 0 || self.isUsed) {
                        dolist(step + 1);
                    }

                    break;
                case 2:
                    if (!self.parent.passwordVerify) {
                        payData.password.show({
                            successCallback: function (response) {
                                self.parent.passwordVerify = true;
                                self.parent.password = payData.password.password.value;
                                payData.payCurrent.setPassword(self.parent.password);
                                dolist(step + 1);
                            },
                            errorCallback: function () {
                                dolist(-1);
                            }
                        });

                    }
                    else {
                        dolist(step + 1);
                    }
                    break;
                case 3:
                    if (!self.parent.riskSMSVerify && self.isHighRisk) {
                        payData.riskSMS.show({
                            phoneNo: self.parent.safetyVerifyPhone,
                            amount: payData.payRequestInfo.amount,
                            currencyCode: payData.payRequestInfo.currencyCode,
                            catalogCode: 'TMPay',
                            successCallback: function (smsCode) {
                                self.parent.riskSMSVerify = true;
                                payData.payCurrent.setCtripPayRiskSmsCode(smsCode);
                                dolist(step + 1);
                            },
                            errorCallback: function () {
                                dolist(-1);
                            }
                        });
                    }
                    else {
                        dolist(step + 1);
                    }
                    break;
                case 4:
                    self.isUsed = !self.isUsed;
                    if (self.isUsed) {
                        self.parent.walletPayTypes.push(self.paymentWayId);
                        if (self.paymentWayId === 'TMPAY_YOU' || self.paymentWayId === 'TMPAY_XING') {
                            self.parent.isGiftCard = true;
                            self.parent.isGiftCard_watch_(true);
                        }
                    } else {
                        if (self.paymentWayId === 'TMPAY_YOU' || self.paymentWayId === 'TMPAY_XING') {
                            self.parent.isGiftCard = false;
                            self.parent.isGiftCard_watch_(false);
                        }
                        self.removeByValue(self.parent.walletPayTypes, self.paymentWayId);
                    } //判断是否用了现金余额

                    self.isUsed_watch_(self.isUsed);
                    self.use(self);
                    break;
                default:
                    dolist(-1);
            }

        };

        dolist(0);
    },
    use: function (self) {
        if (this.isUsed) {
            if (payData.payCurrent.restAmount - NumberUtil.amount(this.availableAmount,this.isAllowDecimalPoint) <= self.parent.discountFee && self.parent.walletPayTypes.length > 0 && self.parent.walletPayTypes.length < 3 && !(self.parent.walletPayTypes.join(',').indexOf('CashAccountPay') > -1)) {
                self.parent.isFullGiftCard = true;
                self.parent.isFullGiftCard_watch_(self.parent.isFullGiftCard);
            } else {
                self.parent.isFullGiftCard = false;
                self.parent.isFullGiftCard_watch_(self.parent.isFullGiftCard);
            }
            if (!self.parent.isFullGiftCard) {
                this.usedAmount = NumberUtil.amount(this.availableAmount < payData.payCurrent.restAmount ? this.availableAmount : payData.payCurrent.restAmount,this.isAllowDecimalPoint);
                this.usedAmount_watch_(this.usedAmount);
                this.usedAmountTemp = this.usedAmount;
                this.usedAmountTemp_watch_(this.usedAmountTemp);
                payData.payCurrent.addCtripPay(this);
            } else {
                this.usedAmount = NumberUtil.amount((this.availableAmount + self.parent.discountFee) < payData.payCurrent.restAmount ? this.availableAmount : payData.payCurrent.restAmount,this.isAllowDecimalPoint);
                this.usedAmount_watch_(this.usedAmount);
                this.usedAmountTemp = this.usedAmount - self.parent.discountFee;
                this.usedAmountTemp_watch_(this.usedAmountTemp);
                payData.payCurrent.addCtripPay(this);
            }

        }
        else {
            payData.payCurrent.removeCtripPay(this);
            self.parent.isFullGiftCard = false;
            self.parent.isFullGiftCard_watch_(self.parent.isFullGiftCard);
        }
        if (payData.payCurrent.restAmount <= self.parent.discountFee && self.parent.isFullGiftCard) {
            var finalPay = NumberUtil.amount(self.parent.finalPay - self.parent.discountFee,this.isAllowDecimalPoint);
            self.parent.finalPay_watch_(finalPay);
            payData.payCurrent.setIsFullCtripGiftCard(true);
            //payData.payCurrent.restAmount = 0;
        } else {
            var finalPay = self.parent.finalPay;
            self.parent.finalPay_watch_(finalPay);
            payData.payCurrent.setIsFullCtripGiftCard(false);
        }
    },
    get_PaymentwayId: function (code) {
        if (code == "2") {
            return "TMPAY_YOU";
        }
        if (code == "3") {
            return "TMPAY_XING";
        }
        if (code == "0") {
            return "CashAccountPay";
        }
        if (code == "10") {
            return "CreditsPay";
        }
        return "";
    },
    get_logoCss: function (code) {
        if (code == "2") {
            return "account_icon1";
        }
        if (code == "3") {
            return "account_icon2";
        }
        if (code == "0") {
            return "account_icon3";
        }
        if (code == "10") {
            return "account_icon4";
        }
        return "";
    },
    removeByValue: function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                arr.splice(i, 1);
                break;
            }
        }
    },
    showGetGiftCard: function () {
        payData.getGiftCard.show();
    }
}
/**
 * Created by li_peng on 2017/10/25.
 */
var ctripPayInfoModel = function ( ctripPayInfo, parent, discountFee )
{
    this.parent = parent;
    this.discountFee = discountFee;
    this.discountFee_watch_ = observe( this.discountFee );
    this.finalPay = 0;
    this.finalPay_watch_ = observe( 0 );
    this.passwordSetting = false;   //是否设置密码
    this.password = '';        // 密码
    this.riskSMSVerify = false;  //是否验证风控
    this.passwordVerify = false;  //是否验证密码
    this.isFullGiftCard = false;  //是否全额礼品卡
    this.isFullGiftCard_watch_ = observe( false );
    this.isGiftCard = false;   //是否是礼品卡
    this.isGiftCard_watch_ = observe( false );
    this.isShowGetGiftCard = false;//是否显示领用礼品卡
    this.isShowGetGiftCard_watch_ = observe( false );
    this.isAllowDecimalPoint = parent.merchantInfo.isAllowDecimalPoint;
    if ( ctripPayInfo )
    {
        this.initData( ctripPayInfo );
    }
}
ctripPayInfoModel.prototype = {
    initData: function ( ctripPayInfo ){
        var self = this;
        this.accountStauts = ctripPayInfo.accountStauts;
        this.hasPassword = ctripPayInfo.hasPassword;
        this.payPasswordSettingUrl = ctripPayInfo.payPasswordSettingUrl;
        this.safetyVerifyPhone = ctripPayInfo.safetyVerifyPhone;
        this.rejectedCatalogs = ctripPayInfo.rejectedCatalogs;
        this.fullVounchPayShowText = ctripPayInfo.fullVounchPayShowText;
        this.giftCardTotal =  ctripPayInfo.giftCardTotal;
        this.finalPay = self.parent.payRequestInfo.amount;  //最终支付金额
        this.finalPay_watch_( this.finalPay );
        this.giftCardAmount = 0;  //礼品卡总额
        this.walletPayTypes = [];

        var ctripPayList = [];
        if ( ctripPayInfo.hasGiftCards )
        {
            $.each( ctripPayInfo.giftCardCollection, function ( i, val )
            {
                var giftCardItem = new ctripItemModel( null, self );
                giftCardItem.title = "礼品卡 " + val.categoryName;
                giftCardItem.categoryId = val.categoryId;
                if(giftCardItem.categoryId=="2"||giftCardItem.categoryId=="3")
                    giftCardItem.isAllowDecimalPoint=self.isAllowDecimalPoint;
                else
                    giftCardItem.isAllowDecimalPoint= true;
                giftCardItem.availableAmount = NumberUtil.amount( val.totalAmount,giftCardItem.isAllowDecimalPoint);
                giftCardItem.availableAmount_watch_(giftCardItem.availableAmount);
                giftCardItem.isHighRisk = ctripPayInfo.isHighRiskGift;
                giftCardItem.logo = giftCardItem.get_logoCss( giftCardItem.categoryId );
                giftCardItem.paymentWayId = giftCardItem.get_PaymentwayId( giftCardItem.categoryId );
                giftCardItem.ubt="01d";
                if(giftCardItem.availableAmount>0)
                    ctripPayList.push( giftCardItem );
                self.giftCardAmount = NumberUtil.amount(self.giftCardAmount + giftCardItem.availableAmount,self.isAllowDecimalPoint);  //计算礼品卡总额
                if ( self.parent.payRequestInfo.amount > self.giftCardTotal)
                {
                    giftCardItem.isShowGetGiftCard = true;
                } else
                {
                    giftCardItem.isShowGetGiftCard = false;
                }
            } );
        }
        if ( ctripPayInfo.cashAvailable && ctripPayInfo.cashAvailable>0)
        {
            var cashAccountItem = new ctripItemModel( null, self );
            cashAccountItem.title = "现金余额";
            cashAccountItem.availableAmount = NumberUtil.number( ctripPayInfo.cashAvailable/100 );
            cashAccountItem.availableAmount_watch_(cashAccountItem.availableAmount);
            cashAccountItem.categoryId = 0;
            cashAccountItem.isHighRisk = ctripPayInfo.isHighRiskCash;
            cashAccountItem.logo = "account_icon3";
            cashAccountItem.paymentWayId = cashAccountItem.get_PaymentwayId( cashAccountItem.categoryId );
            cashAccountItem.isShowGetGiftCard = false;
            cashAccountItem.ubt = "01k";
            cashAccountItem.isAllowDecimalPoint=true;
            ctripPayList.push( cashAccountItem );
        }
        this.ctripPayList = ctripPayList;

        if ( this.parent.payRequestInfo.amount > ( NumberUtil.amount(this.giftCardAmount + this.discountFee,this.isAllowDecimalPoint)) )
        {
            this.isFullGiftCard = false; //如果待付金额大于礼品卡金额，是否全额礼品卡设置为false
            this.isFullGiftCard_watch_( this.isFullGiftCard );

        }
    },
    checkRejectedCatalogs:function(catalogCode){
         if(this.rejectedCatalogs && this.rejectedCatalogs.indexOf(catalogCode)>-1){
             var ctripPayList = $.grep(this.ctripPayList, function (ele) {
                 if ((ele.paymentWayId == "TMPAY_YOU" || ele.paymentWayId == "TMPAY_XING") && ele.isUsed ) {
                     return true;
                 }
                 return false;
             });
             if(ctripPayList&&ctripPayList.length>0){
                 return false
             }

         }
         return true;
    }
}


/**
* Created by li_peng on 2017/12/6.
*/
; (function () { 
window.dccModel = function (parent,model) {
    this.parent = parent;
    
    this.isShow = false;
    this.isShow_watch_ = observe(false);

    this._htmlAmount = "";
    this._htmlAmount_watch_ = observe("");
    this._htmlDesc = "";
    this._htmlDesc_watch_ = observe("");

    this._htmlForeignAmount = "";
    this._htmlForeignAmount_watch_ = observe("");
    this._htmlForeignDesc = "";
    this._htmlForeignDesc_watch_ = observe("");

    this.isShow = false;
    this.isShow_watch_ = observe(false);

    this.exRateTransType = "";
    this.exRateTransType_watch_ = observe("");
    this.successCallback = null;
    this.errorCallback = null;

    if(model){
        this.init(model);
    }
}

dccModel.prototype = {
    init:function(model){
        this.amount = model.amount;
        this.currencyCode = model.currencyCode;
        this.foreignAmount = model.foreignAmount;
        this.foreignCurrencyCode = model.foreignCurrencyCode;
        this.foreignCurrencyDesc = model.foreignCurrencyDesc;
        this.exchangeRate = model.exchangeRate;
        this.successCallback = model.successCallback;
        this.errorCallback = model.errorCallback;
        this.exRateTransType = "DCC";
        this.exRateTransType_watch_("DCC");
        this._htmlForeignAmount = get_htmlAmount(this.foreignAmount,this.foreignCurrencyDesc);
        this._htmlForeignAmount_watch_(this._htmlForeignAmount);
        var foreignfee = AmountHelper.amount(this.foreignAmount * model.serviceFeeRate / 100,0);
        this._htmlForeignDesc = get_htmlDesc(foreignfee,this.foreignCurrencyDesc,this.exchangeRate);
        this._htmlForeignDesc_watch_(this._htmlForeignDesc);
        this._htmlAmount = get_htmlAmount(AmountHelper.amount(this.amount,2),this.currencyCode);
        this._htmlAmount_watch_(this._htmlAmount);
        this._htmlDesc = get_htmlDesc(model.serviceFee,this.currencyCode);
        this._htmlDesc_watch_(this._htmlDesc);
    },
    setDCC: function () {
        this.exRateTransType="DCC";
        this.exRateTransType_watch_("DCC");
    },
    setEDC: function () {
        this.exRateTransType = "EDC";
        this.exRateTransType_watch_("EDC");
    },
    show: function (request) {
        this.init(request);
        this.isShow = true;
        this.isShow_watch_(true);
    },
    close: function () {
        this.isShow = false;
        this.isShow_watch_(false);
        this.errorCallback();
    },
    submit: function () {
        if(this.exRateTransType===""){
        
        }
        else{
            this.isShow = false;
            this.isShow_watch_(false);
            this.successCallback(this.exRateTransType);
        }
    }
}

function get_htmlAmount(amount,currencyCode){
    return currencyCode+" "+ AmountHelper.amount(amount,2).toFixed(2);
}

function get_htmlDesc(fee,currencyCode,exchangeRate){
    if(!fee) return "";
    if(exchangeRate){
        return "当天汇率: "+exchangeRate+"，含外卡服务费"+get_htmlAmount(fee,currencyCode);
    }
    else{
        return "含外卡服务费"+get_htmlAmount(fee,currencyCode)
    }
}

}());

/**
 * Created by li_peng on 2017/11/4.
 */
; (function () {
window.descriptionModel=function(description){
    this.hasDescription=false;
    this.type="";
    this.description="";
    this.details=null;
    this.isSingleTable=false;
    if(description){
        this.init(description);
    }
}
descriptionModel.prototype={
    init:function(description){
        this.hasDescription = true;
        
        if(util.trim(description,2).indexOf("{")==0){
            var d=eval('('+description+')');
            this.type= d.orderType;
            this.description= replacehtml(d.description);
            this.details= d.detail;

            if(this.details && this.details.length==1){
                this.isSingleTable=true;
            }
        }
        else{
            this.type="single";
            this.description=replacehtml(description);
        }
    }

}
var replacehtml=function(description){
    var d=description;
   
    d=d.replace(/\[BR\]/gi, "<br>");
   
    d=d.replace(/\[N\]/gi, "&nbsp;");
    d=d.replace(/\[Bold\]/gi, "<strong>");
    d=d.replace(/\[-Bold\]/gi, "</strong>");
    d=d.replace(/\[Red\]/gi, "");
    d=d.replace(/\[-Red\]/gi, "");
    d=d.replace(/\[CNY\]/gi, "&yen;");
    d=d.replace(/\[a\]/gi, "<a href=\"javascript:;\"  onmouseover=\"showHotelsuper(this,'descriptiontablepop')\" onmouseout=\"hidesuper(this,'descriptiontablepop')\" >");
    d=d.replace(/\[-a\]/gi, "</a>");
    d=d.replace(/\[li\]/gi, "<li>");
    d=d.replace(/\[-li\]/gi, "</li>");

    return d;

}
 })();


/**
* Created by li_peng on 2017/11/30.
*/

var encryptDataModel = function (content) {
    if (!content) return null;
    return { content: content, encrypt: "" };

}
/**
 * Created by li_peng on 2017/11/4.
 */
;(function () { 
    window.fieldModel=function(parent,field,type){
        this.parent=parent;
        this.type=type;
        this.value="";
        this.value_watch_=observe("");
        this.valueMask="";
        this.valueMask_watch_=observe("");
        this.isRequire=false;
        this.isRequire_watch_=observe(false);
        this.isError=false;
        this.isError_watch_=observe(false);
        this.errorMessage="";
        this.errorMessage_watch_=observe("");
        if(field){
            this.set(field);
        }
    };

    fieldModel.prototype = {
        set: function (field,isResetValue,idCardTypeList,defualtIdCardType) {
            //if(field===this.isRequire) return;
            var isresetvalue = (isResetValue === undefined ? true:isResetValue);
            if (field) {
                if(this.type=="idCardType"){
                    //var idcardtypelist = this.parent.parent.idCardTypeList;
                    //getDefaultIdcardType(idcardtypelist);
                    if(defualtIdCardType){
                        this.value = defualtIdCardType;
                    }
                    else{
                        this.value = getDefaultIdcardType(idCardTypeList);
                    }
                    this.value_watch_(this.value);
                }
                else{
                    if(isresetvalue)
                        this.setEmpty();
                }
                this.setRequire(true);
                this.setNOError();
                var objCardHolder = payData.payRequestInfo.cardHolder;
                if (objCardHolder) {
                    if (this.type == "cardHolder")
                        this.value = objCardHolder.name;
                    if (this.type == "idCardType")
                        this.value = objCardHolder.idType;
                    if (this.type == "idCardNo") {
                        this.value = objCardHolder.idNo;
                        this.valueMask = objCardHolder.idNo.substr(0, 4) + "****" + objCardHolder.idNo.substr(objCardHolder.idNo.length - 4, 4);
                        this.valueMask_watch_(this.valueMask);
                    }
                    this.value_watch_(this.value);
                }
            }
            else {
                this.setRequire(false);
                this.setNOError();
            }
        },
        check: function () {
            var result = validateInput(this);
            if (result.errorCode === 0) {
                this.setNOError();
                return true;
            }
            else {
                this.setIsError(true,result.message);
                return false;
            }
        },
        setEmpty: function () {
            this.value = "";
            this.value_watch_("");
        },
        setIsError:function(iserror,message){
             this.isError = iserror;
             this.isError_watch_(iserror);
             this.errorMessage = message;
             this.errorMessage_watch_(message);
        },
        setNOError:function(){
            this.setIsError(false,"");
        },
        setRequire:function(isRequire){
            if(isRequire){
                this.isRequire = true;
                this.isRequire_watch_(true);
            }
            else{
                this.isRequire = false;
                this.isRequire_watch_(false);
                this.setEmpty();
            }

        }
    };

    var validateInput = function (model) {
        if (!model.isRequire) return { errorCode: 0, message: "" };
        var type = model.type;
        var input = util.trim(model.value, 1);

        if (type === "phoneNo") {
        
            if (CardHelper.checkPhoneNo(input)!==0) {
                return { errorCode: 1, message: "请输入11位手机号" };
            }
        }
        else if (type === "cardHolder") {
            if (input === "") {
                return { errorCode: 1, message: "请输入持卡人姓名" };
            }
            if(model.parent.parent.isForeignCard){
                if (!/^[a-zA-Z \-  · • ]+$/.test(input)) {
                    return { errorCode: 1, message: "请输入只包含英文字母的持卡人姓名，如：Li Meimei" };
                }
            }
            else{
                if (!/^[\u4e00-\u9fa5 \- a-zA-Z · •]+$/.test(input)) {
                    return { errorCode: 1, message: "姓名中只能包含汉字/英文字母" };
                }
            }
            
        }
        else if (type === "idCardNo") {
            if (model.parent.idCardType.value == "1") {
                //身份证格式
                if(!CardHelper.isChineseID(input)){
                    return { errorCode: 1, message: "请输入正确的身份证号" };
                }
            }
            else {
                // 无格式
                if (input === "") {
                    return { errorCode: 1, message: "请输入证件号码" };
                }
            }
        }
        else if (type === "phoneVerifyNo") {
        
            if (CardHelper.checkSmsCode(input)!==0) {
                return { errorCode: 1, message: "请输入6位短信验证码" };
            }
        }
        else if (type === "validity") {
            if (input === "") {
                return { errorCode: 1, message: "请输入卡有效期" };
            }
            input = util.getExpiryDate(input);
            if(CardHelper.checkValidity(input)!==0){
                return { errorCode: 1, message: "请输入正确的卡有效期" };
            }
        }
        else if (type === "verifyNo") {
            var len=model.parent.parent.isAme?"4":"3";
            if (CardHelper.checkCardVerifyNo(input,model.parent.parent.isAme)!==0) {
                return { errorCode: 1, message: "请输入"+ len+"位卡验证码" };
            }
        }
        else if (type === "cardNo") {
            if (CardHelper.checkCardNo(input)!==0) {
                return { errorCode: 1, message: "请输入正确的银行卡号" };
            }
            if(payData.payRequestInfo.isCardNoRange){
                var cardNoRange=payData.payRequestInfo.creditCardNoRange||payData.payRequestInfo.marketingPlanCardNoRange;
                 var result = CardHelper.isInCardNoRange(input,cardNoRange);
                  if(result!=2){
                    return { errorCode: 1, message: "卡段不在订单支持范围" };
                }
            }

        }
        else if (type === "giftCardNo"){
            if (!(/^\d{12}$/.test(input))){
                return {errorCode: 1, message: "请输入12位正确的卡券号"};
            }
        }
        else if (type === "passWordVerify") {
            if (!(/^\d{6}$/.test(input))) {
                return { errorCode: 1, message: "请输入6位礼品卡密码" };
            }
        }
        else if (type === "idCardType"){
            var l= $.grep(payData.payCurrent.otherPaywayCurrent.addedIdCardTypeList||[],function(value){
                return value.key==input;
            });
            if(l&& l.length>0){
                return { errorCode: 1, message: "暂不支持该证件类型" };
            }
        }
        return { errorCode: 0, message: "" };
    }

    var getDefaultIdcardType=function(list){
        if(!list) return "1";
        var l= $.grep(list,function(value){
                 return value.key=="1";
            });
        if(l&& l.length==0){
            return list[0].key;
        }
        else{return "1";}
    }
})();

var getGiftCardModel = function ( parent )
{
    this.parent = parent;
    this.isShow = false;
    this.isShow_watch_ = observe( false );
    this.status = 1; //1.填写礼品卡信息。2.礼品卡填写完毕确认
    this.status_watch_ = observe( 1 );
    this.giftCardNum = new fieldModel( this, false, 'giftCardNo' );
    this.passWordVerify = new fieldModel( this, false, 'passWordVerify' );
    this.totalAmount = 0;
    this.totalAmount_watch_=observe(0);
};
getGiftCardModel.prototype = {
    show: function ()
    {
        this.isShow = true;
        this.isShow_watch_( true );
        this.status = 1;
        this.status_watch_( 1 );
        this.giftCardNum.set( true );
        this.passWordVerify.set( true );
        
    },
    close: function ()
    {
        this.isShow = false;
        this.isShow_watch_( false );
    },
    showGiftCardError: function ()
    {
        if ( !this.giftCardNum.check() )
        {
            this.giftCardNum.setIsError( true, '请输入12位正确的卡券号' );
        } else
        {
            this.giftCardNum.setIsError( false );
        }
    },
    showPassWordError: function ()
    {
        if ( !this.passWordVerify.check() )
        {
            this.passWordVerify.setIsError( true, '请输入6位礼品卡密码' );
        } else
        {
            this.passWordVerify.setIsError( false );
        }
    },
    hideGiftCardError: function ()
    {
        this.giftCardNum.setIsError( false );
    },
    hidePassWordError: function ()
    {
        this.passWordVerify.setIsError( false );
    },
    getIt: function ()
    {
        var self = this;
        if(this.passWordVerify.check() && this.giftCardNum.check()) {
            var ticketCardItem = [{ cardCode: util.trim( this.giftCardNum.value, 1 ), password: this.passWordVerify.value}];
            var requestData = { ticketCardItem: ticketCardItem };
            cbuService.receiveTicketCard( function ( response )
            {
                if ( response.retCode === "0" )
                {
                    if ( response.receiveResultItem[0].checkResultCode === '0' )
                    {

                        self.totalAmount = response.totalAmount;
                        self.totalAmount_watch_(self.totalAmount);
                        self.status = 2;
                        self.status_watch_( 2 );
                        cbuService.queryWalletDetail(function (subresponse) {
                            if(subresponse.retCode === '0'){
                                $.each(subresponse.ticketCards ,function (key,val) {
                                    $.each(payData.ctripPayInfo.ctripPayList,function (subKey,subval) {
                                        if(val.categoryId === subval.categoryId){
                                            subval.availableAmount = Number(val.totalAmount);
                                            subval.availableAmount_watch_(Number(val.totalAmount));
                                        }
                                    });
                                });
                            }else{

                            }
                        },function (err) {

                        });

                    } else
                    {
                        self.status = 1;
                        self.status_watch_( 1 );
                        self.passWordVerify.setIsError( true, response.receiveResultItem[0].checkResultMsg );
                    }

                } else
                {
                    self.status = 1;
                    self.status_watch_( 1 );
                    self.passWordVerify.setIsError( true, response.retMessage );
                }
            }, function ()
            {
                self.status = 1;
                self.status_watch_( 1 );
                self.passWordVerify.setIsError( true, response.retMessage );
            }, requestData );

        }else{
            
        }


    },
    submit: function ()
    {
        this.isShow = false;
        this.isShow_watch_( false );
    }
};
/**
 * Created by li_peng on 2017/10/25.
 */
var merchantInfoModel = function(merchantinfo,parent){
    this.parent=parent;
    if(merchantinfo) {
        this.initData(merchantinfo);
    }
}
merchantInfoModel.prototype={
    initData:function(merchantinfo){
        this.merchantId = merchantinfo.merchantId;
        this.merchantName = merchantinfo.merchantName;
        this.merchantType = merchantinfo.merchantType;
        this.siteTemplate = merchantinfo.siteTemplate;
        this.description = merchantinfo.description;
        this.orderType = merchantinfo.orderType;
        this.foreignCardCharge = merchantinfo.foreignCardCharge;
        this.hasForeignCardCharge = merchantinfo.hasForeignCardCharge;
        this.dccFlag = merchantinfo.dccFlag;
        this.paypalFeeRate = merchantinfo.paypalFeeRate;
        this.isAllowDecimalPoint = merchantinfo.isAllowDecimalPoint;
        return this;
    }
}

/**
 * Created by li_peng on 2017/11/4.
 */
var orderDetailsModel=function(orderDetails){
    this.hasOrderDetails=false;
    this.details="";

    this.isOrderDetailsShow=false;
    this.isOrderDetailsShow_watch_=observe(false);
    if(orderDetails){
        this.init(orderDetails)
    }
}
orderDetailsModel.prototype = {
    init: function (orderDetails) {

        this.details = orderDetails;
        if (this.details) {
            this.hasOrderDetails = true;
        }
        else {
            this.hasOrderDetails = false;
        }
    },
    orderDetailsShowTrigger: function () {
        this.isOrderDetailsShow = !this.isOrderDetailsShow;
        this.isOrderDetailsShow_watch_(this.isOrderDetailsShow);
    }
}
/**
 * Created by li_peng on 2017/10/25.
 */
var otherPayModel = function (catalogs, parent) {
    this.parent = parent;
    if (catalogs) {
        this.initData(catalogs);
    }
}
otherPayModel.prototype = {
    initData: function (catalogs) {
        var self = this;
        var otherPayTabs = [];
        this.recentUsedCollection = catalogs.recentUsedCollection;

        var catalogCollection = catalogsFilter(catalogs.catalogCollection, self.parent.payRequestInfo.chargeMode, self.parent.payRequestInfo.isGuaranteePay);
        var _tabs = {};
        var recentTab = self.getRecentTab(catalogCollection);
        var hasCreditCardCatalog = false;
        var hasDepositCardCatalog = false;
        $.each(catalogCollection, function (i, catalog) {
            var otherPayTab = new otherPayTabModel(catalog, self);
            var tab = TAB_ConfigFilter(catalog);//第三方支付
            if (tab) {
                var payTab = new otherPayTabModel(null, self)[tab.getTab]();
                payTab.addCatalog(catalog);
                _tabs[tab.type] = payTab;
            }
            else {
                if (catalog.catalogCode == "CreditsGuarantee" && AmountHelper.number(self.parent.payRequestInfo.extend.credit) <= 0) {

                }
                else {
                    self.addOtherPayTabs(otherPayTab);
                    if (recentTab) {
                        if (isBankCard(otherPayTab.catalogCode)) {
                            if (otherPayTab.promotionCards.length > 0)
                                recentTab.promotionCards = recentTab.promotionCards.concat(otherPayTab.promotionCards);
                            if (otherPayTab.marketingPlanBanks.length > 0)
                                recentTab.marketingPlanBanks = recentTab.marketingPlanBanks.concat(otherPayTab.marketingPlanBanks);
                        }
                    }
                }
            }
            if ("CreditCard,GlobalCard".indexOf(catalog.catalogLayout) >= 0) {
                hasCreditCardCatalog = true;
            } else if ("DepositCard".indexOf(catalog.catalogLayout) >= 0) {
                hasDepositCardCatalog = true;
            }
        });

        if (hasCreditCardCatalog && hasDepositCardCatalog)
            this.showCatalogNameTotalForCard = "银行卡";
        else if (hasCreditCardCatalog && !hasDepositCardCatalog)
            this.showCatalogNameTotalForCard = "信用卡";
        else if (!hasCreditCardCatalog && hasDepositCardCatalog)
            this.showCatalogNameTotalForCard = "储蓄卡";

        $.each(_tabs, function (key, value) {
            self.addOtherPayTabs(value);
        });
        //添加最近使用
        self.addOtherPayTabs(recentTab);
        if (self.otherPayTabs) {
            self.otherPayTabs.sort(function (a, b) {
                return a.index - b.index;
            });
        }
        //this.otherPayTabs = otherPayTabs;
    },
    addOtherPayTabs: function (otherPayTab) {
        if (!otherPayTab) return;
        if (!this.otherPayTabs) {
            this.otherPayTabs = [];
        }
        if (isBankCard(otherPayTab.catalogCode)) {
            otherPayTab.setmarketingPlanInfo();
            otherPayTab.addNewCardPayway();
        }
        //最近使用需要显示增加新卡
        if ('RecentPay' == otherPayTab.catalogCode) {
            otherPayTab.setmarketingPlanInfo();
            otherPayTab.addNewCardPayway();
        }
        this.otherPayTabs.push(otherPayTab);
    },
    getRecentTab: function (catalogCollection) {
        var self = this;
        var recentTab = {
            catalogId: '',
            catalogCode: 'RecentPay',
            catalogName: '我常用的',
            index: 0,
            catalogLayout: 'RecentPay',
            brandCollection: []

        }
        var len = recentTab.brandCollection.length;

        if (this.recentUsedCollection && this.recentUsedCollection.length > 0) {
            var recentMap = {};

            $.each(this.recentUsedCollection, function (index, ele) {
                recentMap[ele.catalogCode + '_' + ele.brandId + '_' + (ele.showCardNo || "")] = true;

            });
            var recentpayway = [];

            $.each(catalogCollection, function (index, ele) {
                if (isBankCard(ele.catalogCode)) {
                    $.each(ele.usedCards || [], function (j, card) {
                        if (recentMap[card.catalogCode + '_' + card.brandId + '_' + (card.showCardNo || "")]) {
                            recentMap[card.catalogCode + '_' + card.brandId + '_' + (card.showCardNo || "")] = false;
                            recentTab.brandCollection.push(card);
                            len = recentTab.brandCollection.length;
                        }
                        if (len == 3) return false;
                    });
                }
                else {
                    $.each(ele.brandCollection || [], function (j, payway) {
                        if (recentMap[payway.catalogCode + '_' + payway.brandId + '_' + (payway.showCardNo || "")]) {
                            recentMap[payway.catalogCode + '_' + payway.brandId + '_' + (payway.showCardNo || "")] = false;
                            recentTab.brandCollection.push(payway);
                            len = recentTab.brandCollection.length;
                        }
                        if (len == 3) return false;
                    });
                }
                if (len == 3) return false;
            });
        }
        if (len > 0) {
            return new otherPayTabModel(recentTab, self);
        }
        else {
            return null;
        }
    },
    getSelectedTab: function () {
        for (var i = 0; i < this.otherPayTabs.length; i++) {
            if (this.otherPayTabs[i].isSelected)
                return this.otherPayTabs[i];
        }
        return null;
    },
    initSelect: function () {
        if (this.otherPayTabs && this.otherPayTabs.length > 0)
            this.otherPayTabs[0].select();
    }
}



/**
 * Created by li_peng on 2017/10/26.
 */
;
(function () {
    var otherPayTab_Card = null;
    var otherPayTab_More = null;
    window.otherPayTabModel = function (catalog, parent) {
        this.parent = parent;
        this.isAllowMixedPay = null;
        this.catalogId = null;
        this.catalogCode = null;
        this.catalogName = null;
        this.tips = null;
        this.description = null;
        this.index = null;
        this.catalogLayout = null;
        this.catalogCss = null;

        this.title = null;
        this.logoCss = null;
        this.tabClass = "";
        this.paywayItems = [];
        this.promotionCards = [];
        this.marketingPlanBanks = [];
        this._path = "payData.otherPay.otherPayTabs";
        this.ubt = "";
        this.isSelected = false;
        this.isSelected_watch_ = observe(this.isSelected);
        this.selectedIndex = 0;//选中的paywayItem的index
        this.selectedIndex_watch_ = observe(this.selectedIndex);
        this.isPayByCredit = false;
        this.isPayByCredit_watch_ = observe(this.isPayByCredit);
        this.paywayItems_length = 0;
        this.paywayItems_length_watch_ = observe(0);
        this.isMarketingPlanSinglebank = false;
        if (catalog) {
            this.initData(catalog);
        }
        this.getCardTab = function () {
            if (otherPayTab_Card !== null) {
                return otherPayTab_Card;
            }
            this.promotionCards = [];
            this.title = '信用卡/储蓄卡';
            this.logoCss = "tab_icon1";
            this.initLayout = "bankCard";
            this.tabClass = "s_tab_titl";
            this.ubt = "09v";
            otherPayTab_Card = this;
            return otherPayTab_Card;
        };
        this.getMoreTab = function () {
            if (otherPayTab_More !== null) {
                return otherPayTab_More;
            }
            this.promotionCards = [];
            this.title = '更多';
            this.logoCss = "tab_icon4";
            this.initLayout = "more";
            this.ubt = "09y";
            otherPayTab_More = this;
            return otherPayTab_More;
        };
    };


    otherPayTabModel.prototype = {
        initData: function (catalog) {
            var self = this;
            this.isMarketingShortShow = false;
            this.isAllowMixedPay = catalog.isAllowMixedPay;
            this.catalogId = catalog.catalogId;
            this.catalogCode = catalog.catalogCode;
            this.catalogName = catalog.catalogName;
            this.tips = catalog.tips;
            this.description = catalog.description;
            this.index = catalog.index;
            this.catalogLayout = catalog.catalogLayout;
            this.initLayout = catalog.catalogLayout;
            this.catalogCss = catalog.catalogCss;
            this.promotionCards = [];
            this.title = catalog.catalogName;
            this.isMarketingPlanSinglebank = false;
            this.hasThirdPay = false;
            this.hasEBank = false;
            this.credit = AmountHelper.number(this.parent.parent.payRequestInfo.extend.credit);
            this.creditNeed = AmountHelper.number(this.parent.parent.payRequestInfo.extend.creditNeed);

            if (this.credit > this.creditNeed || this.credit == this.creditNeed) {
                this.isPayByCredit = true;
                this.isPayByCredit_watch_(this.isPayByCredit);
            } else {
                this.isPayByCredit = false;
                this.isPayByCredit_watch_(this.isPayByCredit);
            }
            var paywayItems = this.paywayItems;
            var marketingPlanBanks = [];
            var payways = [];
            var tab = TAB_ConfigFilter(catalog);
            // if("CreditCard,DepositCard,GlobalCard".indexOf(catalog.catalogLayout)>=0){return "BankCard";}
            //if (tab && tab.type == "BankCard")
            if("RecentPay"==catalog.catalogLayout){
                payways = $.grep(catalog.brandCollection || [], function (ele) {
                    if (!ele.isTimeSwitch &&( AmountHelper.amount(ele.payAmountLimit, 2) == 0 || AmountHelper.amount(ele.payAmountLimit, 2) >= self.parent.parent.payRequestInfo.amount)) {
                        return true;
                    }
                    return false;
                });
                //限额不可用的放在后面
                var temp = $.grep(catalog.brandCollection || [], function (ele) {
                    if (!ele.isTimeSwitch &&(AmountHelper.amount(ele.payAmountLimit, 2) > 0 && AmountHelper.amount(ele.payAmountLimit, 2) < self.parent.parent.payRequestInfo.amount)) {
                        return true;
                    }
                    return false;
                });
                payways = payways.concat(temp);
                temp = $.grep(catalog.brandCollection || [], function (ele) {
                    if (ele.isTimeSwitch) {
                        return true;
                    }
                    return false;
                });
                payways = payways.concat(temp);
                catalog.brandCollection = payways||[];
            }
            if ("CreditCard,DepositCard,GlobalCard".indexOf(catalog.catalogLayout) >= 0) {
                // payways = catalog.usedCards || [];
                payways = $.grep(catalog.usedCards || [], function (ele) {
                    if (!ele.isTimeSwitch &&( AmountHelper.amount(ele.payAmountLimit, 2) == 0 || AmountHelper.amount(ele.payAmountLimit, 2) >= self.parent.parent.payRequestInfo.amount)) {
                        return true;
                    }
                    return false;
                });
                //限额不可用的放在后面
                var temp = $.grep(catalog.usedCards || [], function (ele) {
                    if (!ele.isTimeSwitch &&(AmountHelper.amount(ele.payAmountLimit, 2) > 0 && AmountHelper.amount(ele.payAmountLimit, 2) < self.parent.parent.payRequestInfo.amount)) {
                        return true;
                    }
                    return false;
                });
                payways = payways.concat(temp);
                temp = $.grep(catalog.usedCards || [], function (ele) {
                    if (ele.isTimeSwitch) {
                        return true;
                    }
                    return false;
                });
                payways = payways.concat(temp);
                self.promotionCards = $.grep(catalog.brandCollection || [],
                    function (ele) {

                        if (ele.promotionText) {
                            return true;
                        }
                        return false;
                    });

                if (self.parent.parent.payRequestInfo.isCardNoRange) {
                    marketingPlanBanks = catalog.brandCollection;
                }
                $.each(marketingPlanBanks, function (j, bank) {
                    self.marketingPlanBanks.push(bank);
                });
            }
            else {
                payways = catalog.brandCollection || [];
            }

            $.each(payways, function (j, payway) {
                var paywayItem = new paywayItemModel(payway, self);
                paywayItem.index = j;
                paywayItems.push(paywayItem);
            });
            this.paywayItems = paywayItems;
            this.getLogoCss();
        },

        getLogoCss: function () {
            switch (this.catalogLayout) {
                case "WechatScanCode":
                    this.logoCss = "tab_icon2";
                    this.ubt = "09d";
                    break;
                case "Alipay":
                    this.ubt = "09x";
                    this.logoCss = "tab_icon3";
                    break;
                case "B2BEbank":
                    this.ubt = "09w";
                    this.logoCss = "tab_icon5";
                    break;
                case "Cash":
                    this.ubt = "09g";
                    this.logoCss = "tab_icon6";
                    break;
                case "CreditsGuarantee":
                    this.ubt = "09j";
                    this.logoCss = "tab_icon7";
                    break;
                case "Account":
                    this.ubt = "09i";
                    this.logoCss = "tab_icon8";
                    break;
                    GlobalCard
                case "CreditCard":
                    this.ubt = "09b";
                    this.logoCss = "tab_icon9";
                    break;
                case "GlobalCard":
                    this.ubt = "09b";
                    this.logoCss = "tab_icon9";
                    break;
                case "DepositCard":
                    this.ubt = "09c";
                    this.logoCss = " tab_icon10";
                    break;
                case "RecentPay":
                    this.ubt = "09a";
                    this.logoCss = " tab_icon11";
                    break;
                default:
                    break;
            }
        },
        addCatalog: function (catalog) {
            var self = this;
            if (catalog.catalogLayout == "ThirdPay") {
                this.hasThirdPay = true;
            }
            else if (catalog.catalogLayout == "EBank") {
                this.hasEBank = true;
            }

            if (!this.catalogCode) {
                this.isAllowMixedPay = catalog.isAllowMixedPay;
                this.catalogId = catalog.catalogId;
                this.catalogCode = catalog.catalogCode;
                this.catalogName = catalog.catalogName;
                this.tips = catalog.tips;
                this.description = catalog.description;
                this.index = catalog.index;
                this.catalogLayout = catalog.catalogLayout;
                this.catalogCss = catalog.catalogCss;
            }
            var paywayItems = this.paywayItems;
            var payways = [];
            var promotionCards = [];
            var marketingPlanBanks = [];
            var tab = TAB_ConfigFilter(catalog);
            if (tab && tab.type == "BankCard") {
                payways = catalog.usedCards || [];
                promotionCards = $.grep(catalog.brandCollection || [],
                    function (ele) {

                        if (ele.promotionText) {
                            return true;
                        }
                        return false;
                    });
                if (self.parent.parent.payRequestInfo.isCardNoRange) {
                    marketingPlanBanks = catalog.brandCollection;
                }
            }
            else {
                payways = catalog.brandCollection || [];
            }

            $.each(promotionCards, function (j, promotioncard) {
                self.promotionCards.push(promotioncard);
            });
            $.each(marketingPlanBanks, function (j, bank) {
                self.marketingPlanBanks.push(bank);
            });
            $.each(payways, function (j, payway) {
                var paywayItem = new paywayItemModel(payway, self);
                paywayItem.catalogLayout = catalog.catalogLayout;
                paywayItems.push(paywayItem);
            });
            this.paywayItems = paywayItems;

            this.paywayItems_length = this.paywayItems.length;
            this.paywayItems_length_watch_(this.paywayItems_length);
        },
        select: function () {
            if (this.isSelected) return;
            var tabs = this.parent.otherPayTabs;
            $.each(tabs, function (i, tab) {
                tab.isSelected = false;
                tab.isSelected_watch_(false);
                $.each(tab.paywayItems, function (j, paywayItem) {
                    paywayItem.isSelected = false;
                    paywayItem.isSelected_watch_(false);
                });
            });
            this.isSelected = true;
            this.isSelected_watch_(true);

            if (this.paywayItems.length > 0) {
                for (var i = 0; i < this.paywayItems.length; i++) {
                    if (this.paywayItems[i].select(false) !== false) {
                        break;
                    }
                }

            }
        },
        addNewCardPayway: function () {
            var newCard = new paywayItemModel(null, this);
            newCard.isNewCard = true;
            newCard.catalogCode = this.catalogCode;
            if (this.parent.parent.payRequestInfo.isCardNoRange) {
                newCard.brandName = "本产品仅限";

                if (this.isMarketingPlanSinglebank) {
                    newCard.showCardNo = this.marketingPlanInfoShowbank;
                }
                else {
                    newCard.showCardNo = "活动支持的银行卡";
                }
            }
            else {
                if ("CreditCard,GlobalCard".indexOf(this.catalogLayout) >= 0) {
                    newCard.brandName = "信用卡";
                }
                else if ("DepositCard".indexOf(this.catalogLayout) >= 0) {
                    newCard.brandName = "储蓄卡";
                }
                newCard.showCardNo = '支持百余家银行，采用银行卡支付<a>国际安全标准</a>';
            }
            if ("CreditCard,GlobalCard".indexOf(this.catalogLayout) >= 0) {
                newCard.showCatalogName = "信用卡";
            }
            else if ("DepositCard".indexOf(this.catalogLayout) >= 0) {
                newCard.showCatalogName = "储蓄卡";
            } else if ("RecentPay" == this.catalogLayout) {
                newCard.showCatalogName = "银行卡";
            }
            newCard.index=this.paywayItems.length;
            this.paywayItems.push(newCard);
        },
        getPaywayItemsByLayout: function (layout) {
            return $.grep(this.paywayItems,
                function (paywayItem) {
                    if (paywayItem.catalogLayout == layout) {
                        return true;
                    }
                    return false;
                });
        },

        setmarketingPlanInfo: function () {
            this.isMarketingShortShow = false;
            if (!this.marketingPlanBanks || this.marketingPlanBanks.length == 0) return;
            this.marketingPlanInfoShowbank = "";

            if (this.marketingPlanBanks.length == 1) {
                this.isMarketingPlanSinglebank = true;
            }
            for (var i = 0; i < this.marketingPlanBanks.length; i++) {
                this.marketingPlanInfoShowbank = this.marketingPlanInfoShowbank + "," + this.marketingPlanBanks[i].brandName;
            }
            this.marketingPlanInfoShowbank = this.marketingPlanInfoShowbank.substr(1);
            this.isMarketingShortShow = false;
            if (this.marketingPlanInfoShowbank.length > 144) {
                this.isMarketingShortShow = true;
                this.marketingPlanInfoShowbank_short = this.marketingPlanInfoShowbank.substr(0, 140);
            }
        },
        showMarketPlanPop: function () {
            this.marketPlanPop = $("#marketPlan-pop-tmpl").tmpl(this).appendTo('body');
            popInit(this.marketPlanPop);
            pop(this.marketPlanPop,true);
        },
        closeMarketPlanPop: function () {
            pop(this.marketPlanPop,false);
            this.marketPlanPop.remove();
        },
        showPromotionPop: function () {
            this.promotionPop = $("#promotion-pop-tmpl").tmpl(this).appendTo('body');
            popInit(this.promotionPop);
            pop(this.promotionPop,true);
        },
        closePromotionPop: function () {
            pop(this.promotionPop,false);
            this.promotionPop.remove();
        }
    };

    function getMarketingPlanBank(model, catalog) {
        var marketingPlanBank = catalog.brandCollection;
    }
}());

/**
 * Created by li_peng on 2017/11/20.
 */

var passwordModel = function ( parent )
{
    this.parent = parent;
    this.password = new fieldModel( null, null, "ctripPassword" );
    this.isShow = false;
    this.isShow_watch_ = observe( false );
    this.verifyingPassward = false;
    this.verifyingPassward_watch_ = observe( false );
    this.hasError = false;
    this.hasError_watch_ = observe( false );
    this.payErrorTxt = '支付密码错误文案，由后端返回';
    this.payErrorTxt_watch_ = observe( '支付密码错误文案，由后端返回' );
    this.successCallback = null;
    this.errorCallback = null;
    this.status = 1; //1.输错未超过5次 2.输错5次
    this.status_watch_ = observe( 1 );
};
passwordModel.prototype = {

    setPasswrodWatch: function ()
    {
        var self = this;
        watch( self.password.value_watch_, function ( newvalue, oldvalue )
        {
            if(newvalue === oldvalue) return;
            self.hasError = false;
            self.hasError_watch_( false );
            if ( newvalue.length === 6 )
            {
                self.submit();
            } else
            {
                self.setVerifyingPassward(false);
            }
        } );
        this.setPasswrodWatch = function ()
        {

        };
    },
    show: function ( request )
    {
        this.isShow = true;
        this.isShow_watch_( true );
        this.status = 1;
        this.status_watch_( 1 );
        this.hasError = false;
        this.hasError_watch_( false );
        this.setVerifyingPassward(false);
        this.password.set( true );
        this.successCallback = request.successCallback;
        this.errorCallback = request.errorCallback;
        this.setPasswrodWatch();
    },
    close: function ()
    {
        this.isShow = false;
        this.isShow_watch_( false );
        this.errorCallback();
    },
    setVerifyingPassward:function (v) {
        if(v){ wlockevent=true;}
        else{wlockevent=false};
        this.verifyingPassward = v;
        this.verifyingPassward_watch_( v );
    } ,
    submit: function ()
    {
        var self = this;
        self.setVerifyingPassward(true);
        var requestData = { password: self.password.value };

        cbuService.verifyPaymentPassword( function ( response )
        {

            self.setVerifyingPassward(false);
            if ( response.retCode === "0" )
            {
                self.isShow = false;
                self.isShow_watch_( false );
                self.successCallback( response );
            }
            else
            {
                self.password.value = "";
                self.password.value_watch_( "" );
                if ( response.retryTimes === 0 )
                {
                    self.status = 2;
                    self.status_watch_( 2 );
                } else
                {
                    self.status = 1;
                    self.status_watch_( 1 );
                    self.hasError = true;
                    self.hasError_watch_( true );
                    self.payErrorTxt = response.retMessage;
                    self.payErrorTxt_watch_( response.retMessage );
                }

            }
        }, function ()
        {
            self.setVerifyingPassward(false);
            self.status = 1;
            self.status_watch_( 1 );
            self.password.value = "";
            self.password.value_watch_( "" );
            self.hasError = true;
            self.hasError_watch_( true );
            self.payErrorTxt = '网络异常';
            self.payErrorTxt_watch_( '网络异常' );
        }, requestData );

    },
    modifyPassword: function ()
    {
        window.open( payData.ctripPayInfo.payPasswordSettingUrl, 'newwindow' );
        this.close();
    }
}
/**
 * Created by li_peng on 2017/10/25.
 */
;
(function () {
    window.payCurrentModel = function (p, parent) {
        this.parent = parent;
        this.restAmount = parent.payRequestInfo.amount;
        this.restAmount_watch_ = observe(parent.payRequestInfo.amount);
        this.password = null;
        this.ctripPayRiskSmsCode = null;
        this.ctripTotalAmount = 0;
        this.ctripPayList = [];
        this.otherPaywayCurrent = new otherPaywayCurrentModel(this);
        this.submitBtnStatus = 1; //0：不可用；1:金额；2：loading 3：跳转中；
        this.submitBtnStatus_watch_ = observe(1);
        this.isFullCtripGiftCard = false;
        this.isFullCtripGiftCard_watch_ = observe(false);
        this.isUsedCtripPay = false;
        this.isUsedCtripPay_watch_ = observe(false);
        this.ctripTotalAmount = 0;
        this.isAllowDecimalPoint = parent.merchantInfo.isAllowDecimalPoint;
    };
    payCurrentModel.prototype = {
        init: function () {
        },
        setPassword: function (password) {
            this.password = password;
        },
        setCtripPayRiskSmsCode: function (riskSmsCode) {
            this.ctripPayRiskSmsCode = riskSmsCode.value;
        },
        setIsFullCtripGiftCard: function (isfull) {
            this.isFullCtripGiftCard = isfull;
            this.isFullCtripGiftCard_watch_(isfull);
            if (isfull) {
                this.restAmount = 0;
                this.restAmount_watch_(0);
            }
            else {
                this.restAmount =  AmountHelper.amount(this.parent.payRequestInfo.amount - this.ctripTotalAmount,2);
                this.restAmount_watch_(this.restAmount);
            }

        },
        addCtripPay: function (ctripItem) {
            this.restAmount = AmountHelper.amount(this.restAmount - ctripItem.usedAmountTemp,2);
            this.restAmount_watch_(this.restAmount);
            this.ctripTotalAmount = AmountHelper.amount(this.ctripTotalAmount + ctripItem.usedAmountTemp,2);
            this.ctripPayList.push({
                type: ctripItem.categoryId,
                catalogCode: ctripItem.catalogCode,
                paymentWayId: ctripItem.paymentWayId,
                amount: ctripItem.usedAmountTemp
            });
            this.isUsedCtripPay = true;
            this.isUsedCtripPay_watch_(true);
        },
        removeCtripPay: function (ctripItem) {
            this.restAmount = AmountHelper.amount(this.restAmount + ctripItem.usedAmountTemp,2);
            this.ctripTotalAmount = AmountHelper.amount(this.ctripTotalAmount - ctripItem.usedAmountTemp,2);
            this.restAmount_watch_(this.restAmount);
            for (var i = 0; i < this.ctripPayList.length; i++) {
                if (this.ctripPayList[i].type === ctripItem.categoryId) {
                    this.ctripPayList.splice(i, 1);
                    break;
                }
            }
            if (this.ctripPayList.length == 0) {
                this.isUsedCtripPay = false;
                this.isUsedCtripPay_watch_(false);
            }
        },
        otherPaywaySet: function (paywayItem) {
            this.otherPaywayCurrent.set(paywayItem);
        },
        newCard: function () {

        },
        submit: function () {
            var self = this;
            var paywayCurrent = this.otherPaywayCurrent;
            if (paywayCurrent.isCard && !paywayCurrent.isNewCard) {//常用卡提交支付,otherPaywayCurrent为paywayitem里面的
                var payTab = this.parent.otherPay.getSelectedTab();
                paywayCurrent = payTab.paywayItems[payTab.selectedIndex].otherPaywayCurrent;
            }
            if (this.otherPaywayCurrent.catalogCode === 'Account') {
                if (!this.otherPaywayCurrent.verifyCropPassWord.check()) {
                    this.otherPaywayCurrent.verifyCropPassWord.setIsError(true, '请输入6位密码');
                    this.otherPaywayCurrent.verifyCropIsSubmit = false;
                    this.otherPaywayCurrent.verifyCropIsSubmit_watch_(false);
                    return;
                } else {
                    this.otherPaywayCurrent.verifyCropPassWord.setIsError(false);
                    this.otherPaywayCurrent.verifyCropIsSubmit = true;
                    this.otherPaywayCurrent.verifyCropIsSubmit_watch_(true);
                }
            }
            var f = function (step) {
                if (!step) step = 0;
                switch (step) {
                    case -2:
                        self.parent.setStatus(4);//高风控
                        return;
                    case -1:
                        self.setSubmitBtnStatus(1);
                        _method_ = "";
                        _content_ = "";
                        _billNo_ = "";
                        _billstatus_ = "";
                        return;
                    case 0:
                        if (self.ctripPayList.length > 0 && self.restAmount > 0) {
                            if (!payData.ctripPayInfo.checkRejectedCatalogs(paywayCurrent.catalogCode)) {
                                payData.popErrorMessage.show({message: "该支付方式不支持与礼品卡混合使用，请更换支付方式。"});
                                f(-1);
                            }
                            else {
                                f(step + 1);
                            }
                        }
                        else {
                            f(step + 1);
                        }
                        break;
                    case 1://check
                        self.setSubmitBtnStatus(2);
                        if (self.restAmount > 0) {
                            if (paywayCurrent.brandId) {

                            }
                            else {
                                payData.popErrorMessage.show({message: "请选择支付方式。"});
                                f(-1);
                                return;
                            }
                            var d = paywayCurrent.checkRequireField();
                            if (d) {
                                f(step + 1);
                            }
                            else {
                                f(-1);
                            }
                        }
                        else {
                            f(step + 1);
                        }
                        break;
                    case 2://cash comfirm
                        if (paywayCurrent.brandId == "Cash") {
                            self.setSubmitBtnStatus(1);
                            payData.cashComfirm.show({
                                paywayname: paywayCurrent.showBrandName,
                                cashAddress: paywayCurrent.cashAddress,
                                payAmount: paywayCurrent.cashAmount,

                                successCallback: function () {
                                    f(step + 1);
                                },
                                errorCallback: function () {
                                    f(-1);
                                }
                            });
                        }
                        else {
                            f(step + 1);
                        }
                        break;
                    case 3://qrPayAlert
                        if (payData.qrPayAlert.isShowQRPayAlert && (paywayCurrent.brandId == "WechatScanCode" || paywayCurrent.brandId == "EXWSN")) {
                            self.setSubmitBtnStatus(1);
                            payData.qrPayAlert.show({
                                successCallback: function () {
                                    f(step + 1);
                                },
                                errorCallback: function () {
                                    f(-1);
                                }
                            });
                        }
                        else {
                            f(step + 1);
                        }
                        break;
                    case 4://dcc
                        if (paywayCurrent.isForeignCard && paywayCurrent.dccFlag != "F" && !payData.payCurrent.isFullCtripGiftCard) {
                            var requestData = {
                                "brandId": paywayCurrent.brandId,
                                "channelId": paywayCurrent.channelId,
                                "cardInfoId": paywayCurrent.cardInfoId?paywayCurrent.cardInfoId:"",
                                "cardNo": encryptDataModel(util.trim(paywayCurrent.cardNo.value, 1)),
                                "expiryDate": encryptDataModel(util.getExpiryDate(paywayCurrent.requireField.validity.value)),
                                "cardVerifyNo": encryptDataModel(paywayCurrent.requireField.verifyNo.value),
                                "amount": paywayCurrent.totalAmount + "",
                                "currencyCode": self.parent.payRequestInfo.currencyCode,

                                "cardHolder" : paywayCurrent.requireField.cardHolder.value?paywayCurrent.requireField.cardHolder.value:null,
                                "idCardType": paywayCurrent.requireField.idCardType.value?paywayCurrent.requireField.idCardType.value:null,
                                "idCardNo": util.trim(paywayCurrent.requireField.idCardNo.value, 1)?util.trim(paywayCurrent.requireField.idCardNo.value, 1):null,
                                "phoneNumber": util.trim(paywayCurrent.requireField.phoneNo.value, 1)?util.trim(paywayCurrent.requireField.phoneNo.value, 1):null,
                                "bindId": paywayCurrent.bindId?paywayCurrent.bindId:null
                            };
                            cbuService.queryCardExchangeRate(
                                function (response) {
                                    if (response.retCode === "0") {
                                        if (paywayCurrent.dccFlag == "T") {
                                            self.setSubmitBtnStatus(1);
                                            payData.dcc.show({
                                                amount: response.amount,
                                                currencyCode: response.currencyCode,
                                                foreignAmount: response.foreignAmount,
                                                foreignCurrencyCode: response.foreignCurrencyCode,
                                                foreignCurrencyDesc: response.foreignCurrencyDesc,
                                                exchangeRate: response.exchangeRate,
                                                serviceFee: paywayCurrent.serviceFee,
                                                serviceFeeRate: paywayCurrent.serviceFeeRate,
                                                successCallback: function (exRateTransType) {
                                                    paywayCurrent.exRateTransType = exRateTransType;
                                                    f(step + 1);
                                                },
                                                errorCallback: function () {
                                                    f(-1);
                                                }
                                            });
                                        }
                                        else if (paywayCurrent.dccFlag == "D") {
                                            paywayCurrent.exRateTransType = "DCC";
                                            f(step + 1);
                                        }
                                    }
                                    else {
                                        paywayCurrent.exRateTransType = "EDC";
                                        f(step + 1);
                                    }
                                },
                                function () {
                                    paywayCurrent.exRateTransType = "EDC";
                                    f(step + 1);
                                },
                                requestData);
                        }
                        else {
                            f(step + 1);
                        }

                        break;
                    case 5://submit
                        self.setSubmitBtnStatus(2);
                        var cwallet = [];
                        var paywayForUBT = "";
                        $.each(self.ctripPayList, function (i, e) {
                            cwallet.push({
                                type: e.type + "",
                                catalogCode: e.catalogCode,
                                paymentWayId: e.paymentWayId,
                                amount: AmountHelper.amount(e.amount, 2) + ""
                            });
                            paywayForUBT = paywayForUBT + e.paymentWayId + "+";
                        });

                        if (!payConfig.rmsToken) {
                            window.__rmsbfi = window.__rmsbfi || [];
                            window.__rmsbfi.push(['_getRmsToken', function (result) {
                                payConfig.rmsToken = result
                            }], false);
                        }

                        var requestData = {
                            "payScene": "",
                            "amount": AmountHelper.amount(self.parent.payRequestInfo.amount, 2) + "",
                            "cWallet": cwallet,
                            "password": encryptDataModel(self.password),
                            "riskSmsCode": encryptDataModel(self.ctripPayRiskSmsCode || self.riskSmsCode),

                            "otherAmount": AmountHelper.amount(self.restAmount, 2) + "",

                            // "billAddress": dataRequest.billAddress,
                            //"requestUpdateInfo": dataRequest.requestUpdateInfo,
                            //"callId": dataRequest.callId,
                            //"isAutoCreateBill": dataRequest.isAutoCreateBill,
                            "cardOperation": paywayCurrent.cardOperation,
                            // "cardValidDate": dataRequest.cardValidDate,
                            "rmsToken": payConfig.rmsToken
                        };
                        if (self.restAmount > 0) {
                            var ebankinfo = "";
                            if (paywayCurrent.catalogCode == "EBank") {
                                var url = payConfig.ebankPayReturnUrl + "/" + encodeURIComponent(OtherHelper.base64.encode(payConfig.requestId + ";" + paywayCurrent.paymentWayId));
                                ebankinfo = '{"EBankReturnUrl":"' + url + '"}';
                            }
                            $.extend(requestData, {
                                "catalogCode": paywayCurrent.catalogCode,
                                "paymentWayId": paywayCurrent.paymentWayId,
                                "brandId": paywayCurrent.brandId,
                                "channelId": paywayCurrent.channelId + "",
                                "cardInfo": getCardInfo(paywayCurrent),
                                "mayReceiveBranch": paywayCurrent.mayReceiveBranch,
                                "ebankInfo": ebankinfo
                            });
                            paywayForUBT = paywayForUBT + paywayCurrent.paymentWayId + "+";
                        }
                        paywayForUBT = paywayForUBT.slice(0, -1);
                        logUbt(paywayForUBT + "_S_", "Payment-UBT-Edit");
                        cbuService.paymentSubmit(function (response) {
                            self.setSubmitBtnStatus(1);
                            if (response.retCode === "0") {
                                logUbt(paywayForUBT + "_Success_S", "Payment-UBT-Submit");
                                if (response.method == "JSON") {
                                    var contentObj = JSON.parse(response.content);
                                    if (contentObj && contentObj.type == "qrcode") {
                                        payData.scanCode.show({
                                            ebankPayId: contentObj.ebankPayId,
                                            paymentWayId: contentObj.paymentWayId,
                                            paymentDetailId: contentObj.paymentDetailId,
                                            isNew: contentObj.isNew,
                                            qrCode: contentObj.qrCode,
                                            expired: contentObj.expired,
                                            billNo: response.billNo,
                                            successCallback: function (response) {
                                                _method_ = response.method;
                                                _content_ = response.content;
                                                f(step + 1);
                                            },
                                            errorCallback: function () {
                                                f(-1);
                                            }
                                        });
                                    }
                                }
                                else {
                                    _method_ = response.method;
                                    _content_ = response.content;
                                    _billNo_ = response.billNo;
                                    if (response.retMessage && response.retMessage.indexOf("{") > -1) {
                                        var ret = JSON.parse(response.retMessage);
                                        _billstatus_ = ret.status;
                                    }

                                    f(step + 1);
                                }
                            }
                            else if (response.retCode == "CBU-020-600704" || response.retCode == "SVC-501-1200") {
                                logUbt(paywayForUBT + "_Failure:" + response.retCode + "_S", "Payment-UBT-Submit");
                                f(-2);
                            }else if(response.retCode.indexOf("FNC4219988")>-1){
                                logUbt(paywayForUBT + "_Failure:" + response.retCode + "_S", "Payment-UBT-Submit");
                                payData.popErrorMessage.show({message: "本次支付需要补充您的银行卡信息"});
                                paywayCurrent.reBind();
                                f(-1);
                            } else {
                                if (response.method === "JSON") {
                                    var contentObj = JSON.parse(response.content);
                                    if (contentObj && contentObj.type == "risk") {
                                        paywayCurrent.closePop(false);//关闭新卡弹窗
                                        payData.riskSMS.show({
                                            phoneNo: contentObj.phoneNumber,

                                            phoneNumber: contentObj.phoneNumber,
                                            amount:  AmountHelper.amount(self.restAmount,2) + "",
                                            currencyCode: payData.payRequestInfo.currencyCode,
                                            catalogCode: paywayCurrent.catalogCode,
                                            cardInfoId: paywayCurrent.cardInfoId,

                                            successCallback: function (smsCode) {
                                                self.riskSmsCode = smsCode.value;
                                                f(step);
                                            },
                                            errorCallback: function () {
                                                f(-1);
                                            }
                                        });
                                    }
                                }
                                else {
                                    logUbt(paywayForUBT + "_Failure:" + response.retCode + "_S", "Payment-UBT-Submit");
                                    payData.popErrorMessage.show({message: response.retMessage});
                                    f(-1);
                                }
                            }

                        }, function (xhr, status, err) {
                            logUbt(paywayForUBT + "__Error:" + err + "_S", "Payment-UBT-Submit");
                            f(-1);
                        }, requestData);
                        break;
                    case 6://实名认证

                        if (_billstatus_ == "2" && paywayCurrent.isCard) {
                            if(self.otherPaywayCurrent && self.otherPaywayCurrent.isShowPop)
                                self.otherPaywayCurrent.closePop(false);
                            var requestData = {
                                ticket: payConfig.ticket_ctrip,
                                cticket: payConfig.ticket_ctrip_new,
                                billNo: _billNo_
                            };
                            cbuService.checkAuthStatus(function (response) {
                                if (response.retCode === "0") {
                                    if (response.isNeedAuth == "1") {
                                        payData.setStatus(5);
                                        payData.authUser.show({
                                            realName: response.realName,
                                            idTypeName: response.idTypeName,
                                            idNo: response.idNo,
                                            billNo: _billNo_,
                                            successCallback: function () {
                                                f(step + 1);
                                            },
                                            errorCallback: function () {
                                                f(step + 1);
                                            }
                                        });
                                    }
                                    else {
                                        f(step + 1);
                                    }
                                }
                                else {
                                    f(step + 1);
                                }
                            }, function () {
                                f(step + 1);
                            }, requestData);
                        }
                        else {
                            f(step + 1);
                        }
                        break;
                    case 7://跳转
                        self.setSubmitBtnStatus(3);
                        var s = jumpPage();
                        if (!s) {
                            f(-1);
                        }
                        break;
                    default:
                        f(-1);

                }
            }
            f(0);

        },
        setSubmitBtnStatus: function (status) {
            if (status === 2) {
                wlockevent = true;
            }
            else {
                wlockevent = false
            }
            ;
            this.submitBtnStatus = status;
            this.submitBtnStatus_watch_(status);
        }
    };
    function getCardInfo(model) {
        var cardinfo = {};
        cardinfo.cardInfoId = model.cardInfoId;
        cardinfo.cardNo = encryptDataModel(util.trim(model.cardNo.value, 1));
        var expiryDate = util.getExpiryDate(model.requireField.validity.value);
        cardinfo.expiryDate = encryptDataModel(expiryDate);
        cardinfo.cardVerifyNo = encryptDataModel(model.requireField.verifyNo.value);
        cardinfo.cardHolder = model.requireField.cardHolder.value;
        cardinfo.idCardType = model.requireField.idCardType.value;
        cardinfo.idCardNo = util.trim(model.requireField.idCardNo.value, 1);
        cardinfo.phoneNumber = util.trim(model.requireField.phoneNo.value, 1);
        cardinfo.smsCode = encryptDataModel(model.requireField.phoneVerifyNo.value);
        cardinfo.relatedRequestId = model.relatedRequestId;
        cardinfo.exRateTransType = model.exRateTransType;
        cardinfo.bindId = model.bindId;
        cardinfo.cardRecordId = model.cardRecordId;

        return cardinfo;

    }

    var _method_ = "";
    var _content_ = "";
    var _billNo_ = "";
    var _billstatus_ = "";

    function jumpPage() {
        if (!_method_ || !_content_) return false;
        if (_method_ === "POST") {
            var form = $(_content_);
            $(document.body).append(form);
            $(form).submit();
        }
        else if (_method_ === "GET") {
            window.location = _content_;
        }
        return true;
    }

}());


;
(function () {
    window.otherPaywayCurrentModel = function (parent, payway, paywayItem) {
        this.parent = parent;
        this.cardNo = new fieldModel(this, false, "cardNo");
        this.brandId = "";
        this.brandId_watch_ = observe("");
        this.isCard = false;
        this.isCard_watch_ = observe(false);
        this.isShowPop = false;//是否显示新卡弹窗
        this.isShowPop_watch_ = observe(false);
        this.isShowUsedCardEdit = false;//是否显示常用卡填写框
        this.isShowUsedCardEdit_watch_ = observe(false);
        this.showCardNO = "";
        this.showCardNO_watch_ = observe("");
        this.showBrandName = "";
        this.showBrandName_watch_ = observe("");
        this.cssClass = "";
        this.cssClass_watch_ = observe("");
        this.requireField = new requireFieldModel(this);
        this.supplementRequireField = new requireFieldModel(this)
        this.isPreCardNoMatch = false;
        this.isPreCardNoMatch_watch_ = observe(false);
        this.hasCardHolder = payData.payRequestInfo.cardHolder ? true : false;
        this.hasCardHolder_watch_ = observe(false);
        this.isSaveCard = true;
        this.isSaveCard_watch_ = observe(true);
        this.idCardTypeList = [];
        this.idCardTypeList_watch_ = observe([]);
        this.showPhone = 0;//0:不显示 1：显示填写 2：显示已有号码
        this.showPhone_watch_ = observe(0);
        this.phone = "";
        this.phone_watch_ = observe("");
        this.promotionText = "";
        this.promotionText_watch_ = observe("");
        this.imminentExpired = false;
        this.imminentExpired_watch_ = observe(0);
        this.payAmountLimit = 0;
        this.payAmountLimit_watch_ = observe(0);

        this.serviceFeeRate = 0;
        this.serviceFeeRate_watch_ = observe(0);
        this.serviceFee = 0;
        this.serviceFee_watch_ = observe(0);
        this.totalAmount = this.parent.restAmount + this.serviceFee;
        this.totalAmount_watch_ = observe(this.totalAmount);

        this.showValidity = false;
        this.showValidity_watch_ = observe(false);

        this.cardOperation = this.parent.parent.payRequestInfo.enableUsedCard;
        this.cardOperation_watch_ = observe(this.cardOperation);
        this.isNewCard = false;
        this.isNewCard_watch_ = observe(false);
        this.isAme = false;
        this.isAme_watch_ = observe(false);
        this.isForeignCard = false;
        this.isForeignCard_watch_ = observe(false);
        this.cardLoading = false;
        this.cardLoading_watch_ = observe(false);
        this.cardLoadingErrorMessage = "";
        this.cardLoadingErrorMessage_watch_ = observe("");
        this.cardLoadingIsError = false;
        this.cardLoadingIsError_watch_ = observe(false);
        this.sendSMS = new sendSMSModel(this, {type: "bankcard"});
        this.cashAmount = 0;
        this.cashAmount_watch_ = observe(0);
        this.cashDiscount = 0;
        this.cashDiscount_watch_ = observe(0);
        this.verifyCropPassWord = new fieldModel(this, false, 'passWordVerify');
        this.verifyCropIsSubmit = false;
        this.verifyCropIsSubmit_watch_ = observe(false);
        this.verifyCropPassWordStatus = 1;   //1,初始状态;2,验证中; 3.驗證成功
        this.verifyCropPassWordStatus_watch_ = observe(1);
        this.verifyCropPassWrordError = false;
        this.verifyPassWrordError_watch_ = observe(false);
        this.verifyPassWrordErrorText = '';
        this.verifyPassWrordErrorText_watch_ = observe('');
        this.relatedRequestId = "";
        this.tabCatalogLayout = "";
        this.tabCatalogLayout_watch_ = observe("");
        this.showCatalogName = "";
        this.showCatalogName_watch_ = observe("");
        this.ieVersion= OtherHelper.ieVersion();
        if (payway) {
            this.setRouterInfo(payway);
        }
        if (paywayItem) {
            this.paywayItem = paywayItem;
        }
    }
    otherPaywayCurrentModel.prototype = {
        setRouterInfo: function (payway) {
            this.catalogCode = payway.catalogCode;

            this.showBrandName = payway.brandName;//+"<i>"+payway.html_showName+"</i>"
            this.showBrandName_watch_(this.showBrandName);
            this.showCatalogName = payway.showCatalogName;
            this.showCatalogName_watch_(payway.showCatalogName);
            this.cssClass = payway.cssClass;
            this.cssClass_watch_(payway.cssClass);

            this.promotionText = payway.promotionText;
            this.promotionText_watch_(this.promotionText);
            this.paymentWayId = payway.paymentWayId;
            this.brandId = payway.brandId;
            this.brandId_watch_(this.brandId);
            this.channelId = payway.channelId;

            this.addedIdCardTypeList = payway.addedIdCardTypeList || [];
            this.idCardTypeList = (payway.idCardTypeList || []).concat(this.addedIdCardTypeList);
            this.idCardTypeList.sort(function (a, b) {
                if (a.key == 0) return 1;
                if (b.key == 0) return -1;
                return a.key - b.key;
            });
            //this.addedIdCardTypeList = payway.addedIdCardTypeList||[{key:"4",value:"军官证"}];
            //this.idCardTypeList = ([{key:"1",value:"身份证"}]||payway.idCardTypeList||[]).concat(this.addedIdCardTypeList);
            this.idCardTypeList_watch_(this.idCardTypeList);

            this.requireField.set(payway.requireField, this.idCardTypeList, payway.defualtIdCardType);
            this.supplementRequireField.set(payway.supplementRequireField);

            this.cardInfoId = payway.cardInfoId;
            this.bindId = payway.bindId;
            this.isForeignCard = payway.isForeignCard;
            this.isForeignCard_watch_(this.isForeignCard);
            this.isAme = CardHelper.isAmericanExpress(payway.creditCardType) || CardHelper.isAmericanExpressByBankCode(payway.bankCode);
            this.isAme_watch_(this.isAme);
            this.dccFlag = payway.dccFlag;
            this.phone = payway.phone || "";
            this.phone_watch_(this.phone);
            if (this.phone && this.requireField.phoneNo.isRequire) {
                this.requireField.phoneNo.set(false);
                this.showPhone = 2;
                this.showPhone_watch_(2);
            }
            else if (this.requireField.phoneNo.isRequire) {
                this.showPhone = 1;
                this.showPhone_watch_(1);
            }
            else {
                this.showPhone = 0;
                this.showPhone_watch_(0);
            }
            //if(this.alterPhoneflag===2 && this.requireField.phoneNo.isRequire){
            //    this.requireField.phoneNo.set(false);
            //}

            this.imminentExpired = payway.imminentExpired;
            this.imminentExpired_watch_(payway.imminentExpired);
            this.isExpired = payway.isExpired;
            if (this.isExpired) {
                this.alterValidity();
            }
            this.showValidity = this.requireField.validity.isRequire;
            this.showValidity_watch_(this.showValidity);
            this.payAmountLimit = AmountHelper.number(payway.payAmountLimit);
            this.payAmountLimit_watch_(this.payAmountLimit);

            this.serviceFeeRate = AmountHelper.number(payway.serviceFeeRate) * 100;
            this.serviceFeeRate_watch_(this.serviceFeeRate);
        },
        set: function (payway, isCardBin) {
            watchrestAmount(this);
            watchIdCardType(this);
            this.alterPhoneflag = 0;
            this.requireField.setEmpty();
            this.tabCatalogLayout = payway.tabCatalogLayout;
            this.tabCatalogLayout_watch_(this.tabCatalogLayout);
            this.setRouterInfo(payway);
            calculateSevereFee(this);
            this.exRateTransType = "";

            this.sendSMS.reset();

            if (isBankCard(this.catalogCode)) {
                this.isCard = true;
                this.isCard_watch_(true);

            }
            else {
                this.isCard = false;
                this.isCard_watch_(false);

            }
            if (payway.isNewCard) {
                this.isNewCard = true;
                this.isNewCard_watch_(true);
                if (isCardBin) {
                    this.isPreCardNoMatch = false;
                    this.isPreCardNoMatch_watch_(false);
                    this.showCardNO = util.format(this.cardNo.value, "cardno");
                    this.showCardNO_watch_(this.showCardNO);
                    this.showPop();
                }
                else {
                    if (!this.isPreCardNoMatch) {
                        this.isPreCardNoMatch = true;
                        this.isPreCardNoMatch_watch_(true);
                    }
                    this.cardNo.set(true);
                    this.showCardNO = payway.showCardNo;
                    this.showCardNO_watch_(this.showCardNO);
                }
            }
            else {
                this.isNewCard = false;
                this.isNewCard_watch_(false);
                this.isPreCardNoMatch = false;
                this.isPreCardNoMatch_watch_(false);
                this.showCardNO = util.format(payway.showCardNo, "usedcardno");
                this.showCardNO_watch_(this.showCardNO);
                this.cardNo.set(false);

            }
            this.cardOperation = this.parent.parent.payRequestInfo.isSaveCardDefault?"1":"0";
            this.cardOperation_watch_(this.cardOperation);


            this.cashAmount = this.parent.restAmount - payway.cashDiscount;
            this.cashAmount_watch_(this.cashAmount);
            this.cashDiscount = payway.cashDiscount
            this.cashDiscount_watch_(this.cashDiscount);
            if (this.catalogCode == "Account") {
                this.verifyCropPassWord.set(true);
            } else {
                this.verifyCropPassWord.set(false);
            }
            this.relatedRequestId = "";
        },
        cardNOMatch: function (type) {
            var self = this;
            var f = function (step) {
                if (!step) step = 0;
                switch (step) {
                    case -1:
                        return;
                    case 0:
                        var result = self.cardNo.check();
                        if (result) {
                            f(step + 1);
                        }
                        else {
                            f(-1);
                        }
                        break;
                    case 1:
                        var requestData = {
                            "cardNo": encryptDataModel(util.trim(self.cardNo.value, 1)),
                            "chargeMode": self.parent.parent.payRequestInfo.chargeMode,
                            "amount": self.parent.parent.payRequestInfo.amount + "",
                            "currencyCode": self.parent.parent.payRequestInfo.currencyCode,
                            "idCardType": "",
                            "matchType": "0"
                        };
                        self.cardNo.isError = false;
                        self.cardNo.isError_watch_(false);
                        self.cardNo.errorMessage = "";
                        self.cardNo.errorMessage_watch_("");
                        self.setCardLoading(true);
                        cbuService.cardnomatch(function (response) {
                            self.setCardLoading(false);
                            if (response.retCode == "0" && response.brand) {
                                var payway = new paywayItemModel(response.brand);
                                payway.isNewCard = true;
                                var amountlimit = AmountHelper.number(payway.payAmountLimit);
                                var feerate = AmountHelper.number(payway.serviceFeeRate);
                                var totalAmount = self.parent.restAmount + AmountHelper.amount(self.parent.restAmount * feerate, 0);
                                if (amountlimit == 0 || totalAmount <= amountlimit) {
                                    self.set(payway, true);
                                }
                                else {
                                    self.cardNo.isError = true;
                                    self.cardNo.isError_watch_(true);
                                    self.cardNo.errorMessage = "该卡单笔限额：CNY " + payway.payAmountLimit;
                                    self.cardNo.errorMessage_watch_(self.cardNo.errorMessage);
                                }
                            }
                            else {
                                self.cardNo.isError = true;
                                self.cardNo.isError_watch_(true);
                                self.cardNo.errorMessage = response.retMessage;
                                self.cardNo.errorMessage_watch_(response.retMessage);
                            }

                        }, function () {
                            self.setCardLoading(false);
                        }, requestData);
                        break;
                    default:
                        f(-1);
                        break
                }
            }
            f(0);
        },
        setCardLoading: function (v) {
            if (v) {
                wlockevent = true;
            }
            else {
                wlockevent = false
            }
            ;
            this.cardLoading = v;
            this.cardLoading_watch_(v);

        },
        setCardLoadingError: function (iserror, message) {
            this.cardLoadingIsError = iserror;
            this.cardLoadingIsError_watch_(iserror);
            this.cardLoadingErrorMessage = message;
            this.cardLoadingErrorMessage_watch_(message);

        },
        checkRequireField: function (type) {
            var self = this;
            var d = true;
            if (type === "SMSCODE") {
                $.each(this.requireField, function (key, val) {
                    if (typeof (val) == "object" && val.type && val.type != "phoneVerifyNo" && !val.check()) {
                        d = false;
                    }
                });
            }
            else {
                $.each(this.requireField, function (key, val) {
                    if (typeof (val) == "object" && val.type && !val.check()) {
                        d = false;
                    }
                    if (val.type == "phoneVerifyNo" && val.isRequire && (!self.relatedRequestId)) {
                        d = false;
                        val.setIsError(true, "请获取短信验证码");
                    }
                });
            }
            return d;
        },
        alterPhone: function () {
            this.alterPhoneflag = 1;
            this.requireField.phoneNo.set(true);
            reBind(this);

        },
        cancelAlterPhone: function () {
            this.alterPhoneflag = 2;
            this.requireField.phoneNo.set(false);

        },
        alterValidity: function () {
            this.imminentExpired = false;
            this.imminentExpired_watch_(false);
            this.showValidity = true;
            this.showValidity_watch_(this.showValidity);
            this.requireField.validity.set(true);
            reBind(this);
        },
        sendCode: function () {
            var self = this;
            var f = function (step) {
                if (!step) step = 0;
                switch (step) {
                    case -1:
                        return;
                    case 0:
                        var d = self.checkRequireField("SMSCODE");
                        if (d) {
                            f(step + 1);
                        }
                        else {
                            f(-1);
                        }
                        break;
                    case 1:
                        var contentParam = {
                            phoneNumber: util.trim(self.requireField.phoneNo.value, 1),
                            amount: self.parent.restAmount + "",
                            currencyCode: self.parent.parent.payRequestInfo.currencyCode,
                            catalogCode: self.catalogCode,
                            brandId: self.brandId,
                            //brandType: ,
                            chargeMode: self.parent.parent.payRequestInfo.chargeMode,
                            channelId: self.channelId,
                            cardInfoId: self.cardInfoId,
                            cardNo: encryptDataModel(util.trim(self.cardNo.value, 1)),
                            cardVerifyNo: encryptDataModel(self.requireField.verifyNo.value),
                            expiryDate: encryptDataModel(util.getExpiryDate(self.requireField.validity.value)),
                            cardHolder: self.requireField.cardHolder.value,
                            idCardType: self.requireField.idCardType.value,
                            idCardNo: util.trim(self.requireField.idCardNo.value, 1),
                            bindId: self.bindId
                            //bindInfo: ,
                            //productId: ,
                            //messageContent: ,
                            //payScene: ,

                        };
                        self.sendSMS.send(contentParam, function (response) {
                            if (response.isError) {
                                self.requireField.phoneVerifyNo.setIsError(true, response.errorMessage);
                            }
                            else {
                                self.requireField.phoneVerifyNo.setIsError(false, "");
                            }

                            self.relatedRequestId = response.referenceno;
                        });
                        break;
                }
            }
            f(0);


        },
        setRemember: function () {
            this.cardOperation = "1";
            this.cardOperation_watch_("1");
        },
        setNoRemember: function () {
            this.cardOperation = "0";
            this.cardOperation_watch_("0");
        },
        setMayReceiveBranch: function (value, address) {
            this.mayReceiveBranch = value;
            this.cashAddress = address;
        },
        showCropPwdError: function () {
            this.verifyCropIsSubmit = false;
            this.verifyCropIsSubmit_watch_(false);
            if (!this.verifyCropPassWord.check()) {
                this.verifyCropPassWord.setIsError(true, '请输入6位密码');
            } else {
                this.verifyCropPassWord.setIsError(false);
            }
        },
        hideCropPwdError: function () {
            this.verifyCropPassWord.setIsError(false);
        },
        verifyCorpPasswordBtn: function () {
            this.verifyCropPassWordStatus = 2;
            this.verifyCropPassWordStatus_watch_(2);
            var requestData = {password: this.verifyCropPassWord.value};
            var self = this;
            //if (this.verifyCropPassWord.check()) {
                cbuService.verifyCorpPassword(function (response) {
                    if (response.retCode === '0') {
                        self.verifyCropPassWordStatus = 3;
                        self.verifyCropPassWordStatus_watch_(3);
                        self.verifyCropPassWord.setIsError(false);
                        self.verifyCropIsSubmit = true;
                        self.verifyCropIsSubmit_watch_(true);
                    } else {
                        self.verifyCropPassWordStatus = 1;
                        self.verifyCropPassWordStatus_watch_(1);
                        self.verifyCropPassWord.setIsError(true, response.retMessage);
                        self.verifyCropIsSubmit = false;
                        self.verifyCropIsSubmit_watch_(false);
                    }
                }, function (err) {
                    self.verifyCropPassWordStatus = 1;
                    self.verifyCropPassWordStatus_watch_(1);
                    self.verifyCropPassWord.setIsError(true, '网络不给力，请重试');
                    self.verifyCropIsSubmit = false;
                    self.verifyCropIsSubmit_watch_(false);
                }, requestData);
            //} else {
            //    self.verifyCropPassWordStatus = 1;
            //    self.verifyCropPassWordStatus_watch_(1);
            //    this.verifyCropPassWord.setIsError(true, '请输入6位密码');
            //    self.verifyCropIsSubmit = false;
            //    self.verifyCropIsSubmit_watch_(false);
            //}
        },
        usedCardMatch: function () {
            var self = this;
            var requestData = {
                "chargeMode": self.parent.parent.payRequestInfo.chargeMode,
                "amount": self.parent.parent.payRequestInfo.amount + "",
                "currencyCode": self.parent.parent.payRequestInfo.currencyCode,
                "idCardType": self.requireField.idCardType.value + "",
                "cardInfoId": self.cardInfoId + ""
            };
            self.setCardLoading(true);
            cbuService.queryUsedCard(function (response) {
                self.setCardLoading(false);
                if (response.retCode == "0" && response.usedCards && response.usedCards[0]) {
                    var payway = new paywayItemModel(response.usedCards[0]);
                    payway.defualtIdCardType = self.requireField.idCardType.value;
                    var amountlimit = AmountHelper.number(payway.payAmountLimit);
                    var feerate = AmountHelper.number(payway.serviceFeeRate);
                    var totalAmount = self.parent.restAmount + AmountHelper.amount(self.parent.restAmount * feerate, 0);
                    if (amountlimit == 0 || totalAmount <= amountlimit) {
                        self.setRouterInfo(payway);
                        payData.payCurrent.otherPaywayCurrent.set(payway);
                    }
                    else {

                    }
                }
                else {
                    self.requireField.idCardType.setIsError(true, "暂不支持该证件类型");
                }

            }, function () {
                self.setCardLoading(false);
                self.requireField.idCardType.setIsError(true, "网络异常，请重试");
            }, requestData);

        },

        changeCardRouterInfo: function () {

        },

        getCardRouterInfo: function () {
            var self = this;
            if (this.isNewCard) {
                var requestData = {
                    "cardNo": encryptDataModel(util.trim(self.cardNo.value, 1)),
                    "chargeMode": self.parent.parent.payRequestInfo.chargeMode,
                    "amount": self.parent.parent.payRequestInfo.amount + "",
                    "currencyCode": self.parent.parent.payRequestInfo.currencyCode,
                    "idCardType": self.requireField.idCardType.value + "",
                    "matchType": "0"
                };
                self.setCardLoading(true);
                cbuService.cardnomatch(function (response) {
                    self.setCardLoading(false);
                    if (response.retCode == "0" && response.brand) {
                        var payway = new paywayItemModel(response.brand);
                        payway.defualtIdCardType = self.requireField.idCardType.value;
                        var amountlimit = AmountHelper.number(payway.payAmountLimit);
                        var feerate = AmountHelper.number(payway.serviceFeeRate);
                        var totalAmount = self.parent.restAmount + AmountHelper.amount(self.parent.restAmount * feerate, 0);
                        if (amountlimit == 0 || totalAmount <= amountlimit) {
                            self.setRouterInfo(payway);
                            payData.payCurrent.otherPaywayCurrent.set(payway);
                        }
                        else {
                            //error
                        }
                    }
                    else {
                        //error

                        self.requireField.idCardType.setIsError(true, "暂不支持该证件类型");
                    }

                }, function () {
                    self.setCardLoading(false);
                    self.requireField.idCardType.setIsError(true, "网络异常，请重试");
                }, requestData);
            }
            else {
                this.usedCardMatch();
            }
        },
        showPop: function () {
            if (this.isShowPop)
                return;
            this.isShowPop = true;//是否显示新卡弹窗
            this.isShowPop_watch_(true);
        },
        closePop: function (isPreCardNoMatch) {
            this.isShowPop = false;//是否显示新卡弹窗
            this.isShowPop_watch_(false);
            if (isPreCardNoMatch) {
                this.isPreCardNoMatch = true;
                this.isPreCardNoMatch_watch_(true);
            }
        },
        showUsedCardEdit: function () {
            if (this.isShowUsedCardEdit)
                return;
            this.isShowUsedCardEdit = true;
            this.isShowUsedCardEdit_watch_(true);
        },
        hideUsedCardEdit: function () {
            this.isShowUsedCardEdit = false;//是否显示常用卡填写
            this.isShowUsedCardEdit_watch_(false);
        },
        reBind:function(){//bindid失效的情况下，重新绑卡
            reBind(this);
        }
    };

//计算手续费
    function calculateSevereFee(model) {
        model.serviceFee = AmountHelper.amount(model.parent.restAmount * model.serviceFeeRate / 100, 0);
        model.serviceFee_watch_(model.serviceFee);
        model.totalAmount = model.parent.restAmount + model.serviceFee;
        model.totalAmount_watch_(model.totalAmount);
    }

    function watchrestAmount(model) {
        watch(model.parent.restAmount_watch_, function (newValue) {
            calculateSevereFee(model);
        });
        watchrestAmount = function () {
        };

    }

    function isIdcardTypeInList(model, newValue) {
        if (model.addedIdCardTypeList && model.addedIdCardTypeList.length > 0) {
            var list = $.grep(model.addedIdCardTypeList, function (ele) {
                if (ele.key == newValue) {
                    return true;
                }
                return false;
            });
            if (list.length > 0) {
                return false;
            }
        }
        return true;
    }

    function watchIdCardType(model) {
        watch(model.requireField.idCardType.value_watch_, function (newValue, oldValue) {
            if (newValue === oldValue) return;
            model.requireField.idCardNo.setEmpty();
            model.requireField.idCardNo.setNOError();
            if (isIdcardTypeInList(model, newValue)) {
                model.requireField.idCardType.setIsError(false, "");
            }
            else {//need get router info again
                model.getCardRouterInfo();
            }
        });
        // watchIdCardType = function () {
        // };
    }

    function reBind(model) {
        var requireField = model.requireField;
        var supplementRequireField = model.supplementRequireField;
        model.bindId = "";//reBindCard need clean the bindId
        $.each(supplementRequireField, function (k, v) {
            if (v.isRequire && (!requireField[k].isRequire) && k != "phoneNo") {
                requireField[k].set(true, model.idCardTypeList);
                if (k == "validity") {
                    model.showValidity = true;
                    model.showValidity_watch_(model.showValidity);
                }
            }
        });
    }

}());






/**
 * Created by li_peng on 2017/10/25.
 */
var payDataModel = function (respones) {
    this.parent = null;
    this.status = 1; //1:loading 2:loadfailed 3:PayChoose 4:refused
    this.status_watch_ = observe(1);
    this.isShowHint = false;
    this.isShowHint_watch_ = observe(false);

    if (respones) {
        this.init(respones);
    }
    else {
    }
}

payDataModel.prototype = {
    init: function (respones) {
        this.merchantInfo = new merchantInfoModel(respones.merchantInfo, this);
        this.payRequestInfo = new payRequestInfoModel(respones.payRequest, this);
        this.ctripPayInfo = new ctripPayInfoModel(respones.ctripPayInfo, this, getTMPayDiscount(this.payRequestInfo.payDiscountRange));
        this.payCurrent = new payCurrentModel(null, this);
        this.otherPay = new otherPayModel(respones.catalogs, this);
        this.riskSMS = new riskSMSModel(this);
        this.password = new passwordModel(this);
        this.settingCtripPassward = new settingCtripPasswardModel(respones.ctripPayInfo, this);
        this.hasPassword = respones.ctripPayInfo.hasPassword;
        this.dcc = new dccModel(this);
        this.scanCode = new scanCodeModel(this);
        this.authUser = new authuserModel(this);
        this.getGiftCard = new getGiftCardModel(this);
        this.popErrorMessage = new popErrorMessageModel(this);
        this.savecardAgreement = new savecardAgreementModel(this);
        this.cashComfirm = new cashcomfirmModel(this);
        this.qrPayAlert =new qrPayAlertModel(this,respones.merchantInfo);
        this.popAuthuserMessage=new popAuthuserMessageModel(this);
    },
    showhint: function () {
        this.isShowHint = true;
        this.isShowHint_watch_(true);
    },

    hidehint: function () {
        this.isShowHint = false;

        this.isShowHint_watch_(false);
    },

    setLoadingFailed: function () {
        this.setStatus(2);
    },

    setLoading: function () {
        this.setStatus(1);
    },

    setPayChoose: function () {
        this.setStatus(3);
    },
    setRefused:function(){
        this.setStatus(4);
    },
    setTryAgain:function(){
        this.setStatus(6);
    },
    setSelfInfoError:function(){
        this.setStatus(7);
    },
    getPayData: function (successCallback, errorCallback) {
        var self = this;
        var d1=new Date().getTime();

        cbuService.queryorderpaymentinfo(function (response) {
            var d2=new Date().getTime();
            logUbt("dataLoadTime:" + (d2-d1), "Payment-UBT-Load");
            if (response.retCode == "0") {
                self.init(response);
                self.setPayChoose();

                if (successCallback)
                    successCallback();
            }
            else {
                if (response.retCode == "CBU-020-600415")
                    self.setSelfInfoError();
                else
                    self.setRefused();
                if (errorCallback) errorCallback();
            }

        }, function (xhr, status, err) {
            var d2=new Date().getTime();
            logUbt("dataLoadTime:" + (d2-d1) +","+status, "Payment-UBT-Load");
            self.setLoadingFailed();
            if (errorCallback) errorCallback();

        });
    },

    setStatus: function (status) {
        this.status = status; //1:loading 2:loadfailed 3:PayChoose 4:refused 5:Auth 6:try again 7:限本人信息错误

        this.status_watch_(status);
    },
    initSelect:function(){
        this.otherPay.initSelect();

    }

}


/**
 * Created by li_peng on 2017/10/25.
 */
var payRequestInfoModel = function(payRequest,parent){
    this.parent=parent;

    if(payRequest) {
        this.initData(payRequest);
    }
};
payRequestInfoModel.prototype = {
    initData: function (payRequest) {
        this.requestId = payRequest.requestId;
        this.interfaceName = payRequest.interfaceName;
        this.orderId = payRequest.orderId;
        this.orderType = payRequest.orderType;
        this.merchantId = payRequest.merchantId;
        this.customerId = payRequest.customerId;
        this.pageId = payRequest.pageId;
        this.currencyCode = payRequest.currencyCode;
        this.currencySymbol = payRequest.currencySymbol;
        this.amount = Number(payRequest.amount);
        this.amount_watch_=observe(this.amount);
        this.orderCurrencySymbol = payRequest.orderCurrencySymbol;
        this.orderCurrencyCode = payRequest.orderCurrencyCode;
        this.orderAmount = payRequest.orderAmount;
        this.orderAmount_watch_=observe(this.orderAmount);
        this.businessExchangeRate = payRequest.businessExchangeRate;
        this.orderTitle = payRequest.orderTitle;
        this.orderSubTitle = payRequest.orderSubTitle;
        this.orderDetails = new orderDetailsModel(payRequest.orderDetails);
        this.description = new descriptionModel(payRequest.description);
        this.payDiscountRange = payRequest.payDiscountRange; // 支付方式折扣信息，配送费使用
        this.isGuaranteePay = payRequest.isGuaranteePay;
        this.isNeedPreAuth = payRequest.isNeedPreAuth;
        this.chargeMode = payRequest.chargeMode;
        this.language = payRequest.language;
        //this.globalSiteInfo = payRequest.globalSiteInfo;
        this.previousStepUrl = payRequest.previousStepUrl;
        this.externalNo = payRequest.externalNo;
        this.enableUsedCard = payRequest.enableUsedCard;

        //限本人支付持卡人信息
        if (payRequest.cardHolder) {
            try {
                //只针对json进行判断
                if (/^\{[\s\S]*\}$/.test(payRequest.cardHolder)) {
                    var ch = JSON.parse(payRequest.cardHolder);
                    if (ch && ch.hasOwnProperty("name") && ch.hasOwnProperty("idType") && ch.hasOwnProperty("idNo")) {
                        this.cardHolder = ch;
                    } else {
                        this.cardHolder = null;
                    }
                } else {
                    this.cardHolder = null;
                }
            } catch (ex) {
                this.cardHolder = null;
            }
        }

        //限卡号段
        this.creditCardNoRange = payRequest.creditCardNoRange; //支付显卡号段
        this.marketingPlan = payRequest.marketingPlan; //营销显卡号段
        if (this.marketingPlan) {
            var mp= JSON.parse(this.marketingPlan);
            if(mp){
                var rule = mp.Rule;
                if(rule) this.marketingPlanCardNoRange = rule.CardNoRange;
            }
        }
        if (this.creditCardNoRange || this.marketingPlanCardNoRange) {
            this.isCardNoRange = true;
        }
        else {
            this.isCardNoRange = false;
        }
        if ( this.marketingPlanCardNoRange) {
            this.isMarketingPlan = true;
        }
        else {
            this.isMarketingPlan = false;
        }
        this.extend = payRequest.extend;
        var credit = (this.extend.credit||"").replace(/,/g, "");
        var creditNeed = (this.extend.creditNeed||"").replace(/,/g, "");
        this.extend.credit=credit;
        this.extend.creditNeed=creditNeed;
        this.showEndTime = false;
        if(payRequest.extend.countDownTime && payRequest.extend.countDownTime !== ''){
            this.showEndTime = true;
            this.extend.countDownTime = payRequest.extend.countDownTime;
        }else{
            this.showEndTime = false;
        }
        this.isSaveCardDefault = false;
        if(this.extend.extend){
            var ed= JSON.parse(this.extend.extend);
            if(ed) this.isSaveCardDefault = ed.IsSaveCardDefault;
        }
        return this;
    }

};



/**
 * Created by li_peng on 2017/10/26.
 */
var paywayItemModel=function(payway,parent){
    this.parent=parent;
    if(parent){
        this.tabCatalogLayout=parent.catalogLayout;
    }
    this.catalogCode=null;
    this.paymentWayId=null;
    this.requireField=null;
    this.addedRequireField=null;
    this.sceneMode=null;
    this.brandName=null;
    this.showBrandName="";
    this.cssClass=null;
    this.serviceFeeRate=null;
    this.isForeignCard=null;
    this.promotionText=null;
    this.description=null;
    this.isTimeSwitch=null;
    this.timeSwitchDescription=null;
    this.brandId=null;
    this.channelId=null;
    this.vendorId=null;

    this.payAmountLimit=null;
    this.payAmountLimit_watch_=observe(null);
    this.isAdaptablePhoneNo=null;
    this.idCardTypeList=null;
    this.addedIdCardTypeList=null;
    this.initialAlpha=null;
    this.dccFlag=null;
    this.cost=null;
    this.creditCardBankId=null;
    this.creditCardType=null;
    this.bankCode=null;
    this.prePayType=null;
    this.subPaySystem=null;

    //常用卡字段
    this.cardInfoId=null;
    this.supplementRequireField=null;
    this.showCardNo=null;
    this.phone=null;
    this.isExpired=null;
    this.imminentExpired=null;
    this.bindId=null;
    this.bindCardInfoId=null;
    this.createDate=null;

    //非常用卡字段
    this.bankId=null;
    this.brandGlobalName=null;
    this.catalogId=null;
    this.catalogName=null;
    this.orderingIndex=null;
    this.isSupportRealtime=null;

    this.catalogLayout="";
    this.isSelected=false;
    this.isSelected_watch_=observe(false);
    this.cashDiscount=0;
    this.cashDiscount_watch_=observe(this.cashDiscount);
    this.totalAmount=0;
    this.totalAmount_watch_=observe(this.totalAmount);
    this.isNewCard=false;
    this.addressList=[];
    this.index = 0;
    this.otherPaywayCurrent = new otherPaywayCurrentModel(payData.payCurrent,payway,this);
    this.ieVersion= OtherHelper.ieVersion();
    if(payway){
        this.initData(payway);
    }
}
paywayItemModel.prototype={
    initData:function(payway){
        this.catalogCode=payway.catalogCode;
        this.cardInfoId=payway.cardInfoId;
        this.paymentWayId=payway.paymentWayId;
        this.requireField=payway.requireField;
        this.addedRequireField=payway.addedRequireField;
        this.supplementRequireField=payway.supplementRequireField;
        this.sceneMode=payway.sceneMode;
        this.brandName=payway.brandName;
        if(payway.brandId=='EXWSN'){
            this.brandName="微信支付";
        }
        this.cssClass=payway.cssClass;
        this.serviceFeeRate=payway.serviceFeeRate;
        this.isForeignCard=payway.isForeignCard;
        this.showCardNo=payway.showCardNo;
        this.promotionText=payway.promotionText;
        this.description=payway.description;
        this.isTimeSwitch=payway.isTimeSwitch;
        this.timeSwitchDescription=payway.timeSwitchDescription;
        this.phone=payway.phone;
        this.isExpired=payway.isExpired;
        this.imminentExpired=payway.imminentExpired;
        this.brandId=payway.brandId;
        this.channelId=payway.channelId;
        this.vendorId=payway.vendorId;
        this.bindId=payway.bindId;
        this.payAmountLimit=payway.payAmountLimit;
        this.payAmountLimit_watch_(this.payAmountLimit);
        this.isAdaptablePhoneNo=payway.isAdaptablePhoneNo;
        this.bindCardInfoId=payway.bindCardInfoId;
        this.idCardTypeList=payway.idCardTypeList;
        this.addedIdCardTypeList=payway.addedIdCardTypeList;
        this.initialAlpha=payway.initialAlpha;
        this.dccFlag=payway.dccFlag;
        this.cost=payway.cost;
        this.creditCardBankId=payway.creditCardBankId;
        this.creditCardType=payway.creditCardType;
        this.bankCode=payway.bankCode;
        this.prePayType=payway.prePayType;
        this.subPaySystem=payway.subPaySystem;
        this.createDate=payway.createDate;
        this.bankId=payway.bankId;
        this.brandGlobalName=payway.brandGlobalName;
        this.catalogId=payway.catalogId;
        this.catalogName=payway.catalogName;
        this.orderingIndex=payway.orderingIndex;
        this.isSupportRealtime=payway.isSupportRealtime;
        this.isOnlySupporIE = IEEBanksbyBrandid(this.brandId);
        this.html_showCardNo=this.getShowCardNo();
        this.html_showName=this.getShowName();
        this.setAddress();
    },
    select:function(isShowPop){
        if(this.isSelected && !this.isNewCard) return false;
        if(this.isTimeSwitch) return false;
        var totalAmount =payData.payCurrent.restAmount + AmountHelper.amount(payData.payCurrent.restAmount * this.serviceFeeRate ,0);
        if(this.payAmountLimit > 0 && totalAmount > this.payAmountLimit) return false;

        $.each(this.parent.paywayItems,function(i,paywayItem){
            paywayItem.otherPaywayCurrent.hideUsedCardEdit();
            paywayItem.isSelected=false;
            paywayItem.isSelected_watch_(false);
        });

        this.isSelected=true;
        this.isSelected_watch_(true);

        this.parent.selectedIndex = this.index;
        this.parent.selectedIndex_watch_(this.index);
        if(!isShowPop){
            this.otherPaywayCurrent.showUsedCardEdit();
        }

        payData.payCurrent.otherPaywayCurrent.set(this);
        payData.payCurrent.otherPaywayCurrent.setMayReceiveBranch("","");
        this.otherPaywayCurrent.set(this);
        this.otherPaywayCurrent.setMayReceiveBranch("","");
        //payData.payCurrent.otherPaywayCurrent = this.otherPaywayCurrent;
        if(isShowPop) payData.payCurrent.otherPaywayCurrent.showPop();
        if(this.brandId=="Cash"||this.addressList.length>0){
            this.addressList[0].select();
        }
        else {
            $.each(this.addressList, function (i, address) {
                address.isSelected = false;
                address.isSelected_watch_(false);
            });
        }
    },
    getShowCardNo:function(){
        if(this.showCardNo){
            return  util.format(this.showCardNo,"usedcardno")
        }
        return "";
    },
    getShowName:function(){

        if(this.catalogCode==="CreditCard" || this.catalogCode==="GlobalCard"){
            return "信用卡";
        }
        if(this.catalogCode==="DepositCard"){
            return "储蓄卡";
        }
        return "";
    },

    setAddress:function(){
        if(this.brandId=="Cash"){
            this.cashDiscount = getCashPayDiscount(payData.payRequestInfo.payDiscountRange);
            this.cashDiscount_watch_(this.cashDiscount);
            this.addressList=[];
            this.addressList.push(new addressModel(this,'1',"上海 长宁区福泉路99号1楼携程旅游服务中心(9：00-18：00)，电话：021-34064880"));
            this.addressList.push(new addressModel(this,'3',"北京 朝阳区酒仙桥北路甲10号院304号楼C座携程旅行网办公楼(8:00-21:00)，电话：010-64181616*23922"));
            this.addressList.push(new addressModel(this,'4',"广州 广州市体育东路116-118号财富广场西塔17楼(8:00-21:00)，电话：020-83936393*28683/28686"));
            this.addressList.push(new addressModel(this,'5',"深圳 深圳市罗湖区和平路3001号(深南路与和平路交汇处)鸿隆世纪广场A座20楼(8:00-22:00)，电话：0755-25981699*28317"));
            this.addressList.push(new addressModel(this,'6',"成都 成都市高新区天府四街189号(8:30-22:00),电话：028-82005866*25523/25525"));
        }
    }
}



var addressModel=function(parent,mayReceiveBranch,addressDescription){
    this.parent=parent;
    this.addressDescription=addressDescription;
    this.mayReceiveBranch=mayReceiveBranch;
    this.isSelected=false;
    this.isSelected_watch_=observe(false);

}
addressModel.prototype={
    select:function(){
        if(!this.isSelected) {
            $.each(this.parent.addressList, function (i, address) {
                address.isSelected = false;
                address.isSelected_watch_(false);
            });
            this.isSelected = true;
            this.isSelected_watch_(true);
        }
        payData.payCurrent.otherPaywayCurrent.setMayReceiveBranch(this.mayReceiveBranch,this.addressDescription);
    }
}
var popErrorMessageModel = function (parent, model) {
    this.parent = parent;
    this.isShow = false;
    this.isShow_watch_ = observe(false);
    this.message = "";
    this.message_watch_ = observe("");
}
popErrorMessageModel.prototype = {
    show: function (request) {
        this.isShow = true;
        this.isShow_watch_(true);
        this.message = request.message;
        this.message_watch_(request.message);
    },
    close: function () {
        this.isShow = false;
        this.isShow_watch_(false);
    }
}
/**
 * Created by li_peng on 2017/12/27.
 */
var qrPayAlertModel=function(parent,model){
    this.parent=parent;
    this.isShow = false;
    this.isShow_watch_ = observe(false);
    this.isShowQRPayAlert=false;
    this.h1 = "";
    this.h2 = "";
    this.ps = [];
    this.successCallback = null;
    this.errorCallback = null;
    if(model){
        this.init(model);
    }
}
qrPayAlertModel.prototype={
    init:function(model){
        this.isShowQRPayAlert=model.isShowQRPayAlert;
        if(this.isShowQRPayAlert) {
            var json = JSON.parse(model.qrPayAlertInfo);
            this.h1 = json.h1;
            this.h2 = json.h2;
            this.ps = json.ps;
        }
    },
    show: function (model) {
        this.successCallback = model.successCallback;
        this.errorCallback = model.errorCallback;
        this.isShow = true;
        this.isShow_watch_(true);
    },
    submit:function(){
        this.isShow = false;
        this.isShow_watch_(false);
        this.successCallback();
    },
    close:function(){
        this.isShow = false;
        this.isShow_watch_(false);
        if (this.errorCallback)
            this.errorCallback();
    }
}
/**
 * Created by li_peng on 2017/11/4.
 */
var requireFieldModel = function (parent, field) {
    this.parent = parent;
    this.cardHolder = new fieldModel(this, false, "cardHolder");
    this.email = new fieldModel(this, false, "email");
    // this.foreignPhoneNo=new fieldModel(this,false);
    this.idCardNo = new fieldModel(this, false, "idCardNo");
    this.idCardType = new fieldModel(this, false, "idCardType");
    //this.password= new fieldModel(this,false);
    this.phoneNo = new fieldModel(this, false, "phoneNo");
    this.phoneVerifyNo = new fieldModel(this, false, "phoneVerifyNo");
    this.validity = new fieldModel(this, false, "validity");
    this.verifyNo = new fieldModel(this, false, "verifyNo");
    if (field) {
        this.set(field);
    }
}
requireFieldModel.prototype={

    set:function(field,idCardTypeList,defualtIdCardType){
        if(field) {
            this.cardHolder.set(field.cardHolder,false);
            this.idCardType.set(field.idCardType,false,idCardTypeList,defualtIdCardType);
            this.idCardNo.set(field.idCardNo,false);
            this.phoneNo.set(field.phoneNo,false);
            this.phoneVerifyNo.set(field.phoneVerifyNo,false);
            this.validity.set(field.validity,false);
            this.verifyNo.set(field.verifyNo,false);

        }
        else{
            this.cardHolder.set(false);
            this.idCardNo.set(false);
            this.idCardType.set(false);
            this.phoneNo.set(false);
            this.phoneVerifyNo.set(false);
            this.validity.set(false);
            this.verifyNo.set(false);
        }
    },
    setEmpty:function(){
        this.cardHolder.setEmpty();
        this.idCardNo.setEmpty();
        this.idCardType.setEmpty();
        this.phoneNo.setEmpty();
        this.phoneVerifyNo.setEmpty();
        this.validity.setEmpty();
        this.verifyNo.setEmpty();
    }
}
/**
 * Created by li_peng on 2017/11/4.
 */

var riskSMSModel = function (parent) {
    this.parent = parent;
    this.phoneNo = "";
    this.phoneNo_watch_ = observe("");
    this.isShow = false;
    this.isShow_watch_ = observe(false);
    this.smsCode = new fieldModel(this,false,"phoneVerifyNo");
    this.sendSMS = new sendSMSModel(this, { type: "risk" });

    this.status = 1;//1:待确定 2:loading
    this.status_watch_ = observe(1);

    this.successCallback = null;
    this.errorCallback = null;

}

riskSMSModel.prototype = {
    show: function (request) {
        this.setStatus(1);
        this.smsCode.set(true);
        this.phoneNo = request.phoneNo;
        this.phoneNo_watch_(request.phoneNo);

        this.contentParam = {
            phoneNumber: request.phoneNo,
            amount: request.amount,
            currencyCode: request.currencyCode,
            catalogCode: request.catalogCode,
            cardInfoId: request.cardInfoId
        };

        this.isShow = true;
        this.isShow_watch_(true);
        this.successCallback = request.successCallback;
        this.errorCallback = request.errorCallback;

    },
    close: function () {
        this.isShow = false;
        this.isShow_watch_(false);
        if (this.errorCallback)
            this.errorCallback();
    },
    submit: function () {
        var self = this;

        if (!this.smsCode.check()) { return ; }
        var requestData = { verifyType: 31, verCode: this.smsCode.value };
        this.setStatus(2);
        cbuService.checkVerCode(function (response) {
            self.setStatus(1);
            if ( response.retCode === "0" ){
                self.isShow = false;
                self.isShow_watch_( false );
                self.successCallback(self.smsCode);
            }
            else {
                self.smsCode.setIsError(true, response.retMessage);
                self.smsCode.setEmpty();
            }
        }, function () {
            self.setStatus(1);
            self.smsCode.setIsError(true, "网络异常，请稍后重试");
            self.smsCode.setEmpty();

        }, requestData);

    },
    sendCode: function () {
        var self=this;
        this.sendSMS.send(this.contentParam,function(response){
            if(response.isError){
                self.smsCode.setIsError(true, response.errorMessage);
            }
            else{
                self.smsCode.setIsError(false, "");
            }
        });
    },
    setStatus:function(status){
        if(status===2){ wlockevent=true;}
        else{wlockevent=false};
        this.status = status;
        this.status_watch_(status);
    }

}



var savecardAgreementModel = function (parent) {
    this.parent = parent;
    this.isShow = false;
    this.isShow_watch_ = observe(false);
}
savecardAgreementModel.prototype = {
    show: function ()
    {
        this.isShow = true;
        this.isShow_watch_( true );
    },
    close: function ()
    {
        this.isShow = false;
        this.isShow_watch_( false );
    }
}
; (function () {
    window.scanCodeModel = function (parent, model) {
        this.parent = parent;

        this.isShow = false;
        this.isShow_watch_ = observe(false);
        this.isScanning = false;
        this.ebankPayID = "";
        this.paymentWayID = "";
        this.paymentDetailId = "";
        this.isNew = "";
        this.content = "";
        this.billNo="";
        this.status = 1;//1:扫码倒计时中,2：超时继续轮询,3：超时不轮询,4：重新获取二维码中, 5、获取失败 
        this.status_watch_ = observe(1);

        this.seconds=0;
        this.secondsHint="00:00";
        this.secondsHint_watch_=observe("00:00");
        this.title="";
        this.title_watch_=observe("");
        this.subtitle="";
        this.subtitle_watch_=observe("");
        
        this.successCallback = null;
        this.errorCallback = null;
        if (model) {
            this.init(model);
        }
    }
    scanCodeModel.prototype = {
        init: function (model) {
            this.ebankPayId = model.ebankPayId;
            this.paymentWayId = model.paymentWayId;
            this.paymentDetailId = model.paymentDetailId;
            this.isNew = model.isNew;
            this.qrCode = model.qrCode;
            this.expired = model.expired;
            this.seconds =  Number(this.expired) * 60 || 120;
            this.billNo = model.billNo;
            this.title=getTitle(this.paymentWayId);
            this.title_watch_(this.title);
            this.subtitle=getSubtitle(this.paymentWayId);
            this.subtitle_watch_(this.subtitle);
        },
        show: function (request) {
            this.init(request);
            this.isShow = true;
            this.isShow_watch_(true);
            this.successCallback = request.successCallback;
            this.errorCallback = request.errorCallback;
            makeqrcode(this);
        },
        refresh: function () {
            var self = this;
            var requestData={"billNo":self.billNo,"ebankInfo":self.ebankPayId};
            self.setStatus(4);
            cbuService.getQuickResponseCode(function (response) {
                if (response.retCode === "0") {
                    if(response.method=="JSON"){
                        var contentObj=JSON.parse(response.content);
                        if(contentObj&&contentObj.type=="qrcode"){
                            self.init({
                                ebankPayId : contentObj.ebankPayId,
                                paymentWayId : contentObj.paymentWayId,
                                paymentDetailId : contentObj.paymentDetailId,
                                isNew : contentObj.isNew,
                                qrCode : contentObj.qrCode,
                                expired : contentObj.expired,
                                billNo: response.billNo
                            });
                            makeqrcode(self);

                            
                        }
                    }
                }
                else {
                   self.setStatus(5);
                }
            }, function () {
                self.setStatus(5);
            }, requestData);
        },
        close: function () { 
            this.isShow = false;
            this.isShow_watch_(false);
            if(this.errorCallback)this.errorCallback();
        },
        setStatus:function(status){
            var self=this;
            this.status = status;//1:扫码倒计时中,2：超时继续轮询,3：超时不轮询,4：重新获取二维码中, 5、获取失败 
            this.status_watch_(status);


            if(this.status==2){
                this.t=setTimeout(function(){
                    if(self.status==2){
                        self.setStatus(3);
                    }
                },1000*60*1);
            }
            else{
                clearTimeout(this.t);
            }
        }
    }
   

    function getsecondshint(seconds) {
                var m = parseInt(seconds / 60);
                var s = seconds % 60;
                var r = "";

                if (m < 10) {
                    r = r + "0" + m;
                }
                else { r = r + m; }
                r = r + ":";
                if (s < 10) {
                    r = r + "0" + s;
                }
                else { r = r + s; }
                return r;
            }
    function count(model) {
        var seconds = model.seconds;
        if (!model.isShow) return;
        if (seconds <= 0) {
            model.seconds = 0;
            model.secondsHint = getsecondshint(0);
            model.secondsHint_watch_(model.secondsHint);
            model.setStatus(2) ;
        }
        else {
            model.secondsHint = getsecondshint(seconds);
            model.secondsHint_watch_(model.secondsHint);
            setTimeout(function () {
                model.seconds = (--seconds);
                count(model);
            }, 1000);
        }
    };

    var qrcode=null; 
    var getqrcode=function(){
        if(qrcode) return qrcode;
        qrcode = new QRCode(document.getElementById("scancode_qrcode"), {
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
            });
        return qrcode;
    }
    var makeqrcode=function(model){
        model.setStatus(1);
        count(model);
        getqrcode().makeCode(model.qrCode);
        $("#scancode_qrcode").children("img").addClass("code_img");
        setTimeout(function(){$("#scancode_qrcode").children("img").attr("style","");},0);
        queryResult(model);
       
    }
    
    var getTitle =function(paywayid){
        if(paywayid=="WechatScanCode"){
            return "微信支付";
        }
        else if(paywayid=="QQPAY"){
            return "QQ支付";
        }
        else{
            return "扫码支付";
        }

    }
    var getSubtitle =function(paywayid){
        if(paywayid=="WechatScanCode" || paywayid=="EXWSN"){
            return "微信";
        }
        else if(paywayid=="QQPAY"){
            return "QQ";
        }
        else{
            return "扫码";
        }

    }


    var queryResult = function(model){
        var requestData={
            "operateType":"1",
            "eBankPayId":model.ebankPayId,
            "paymentWayId":model.paymentWayId,
            "paymentDetailId":model.paymentDetailId,
            "description":model.isNew
        };
        var interval = setInterval(function(){
                           if((model.status!=1 && model.status!=2) || !model.isShow) {
                               clearInterval(interval);
                               return;
                           }

                           cbuService.queryEBankResult(function(response){
                               if(response.retCode==="0"){
                                   clearInterval(interval);
                                   model.isShow = false;
                                   model.isShow_watch_(false);
                                   model.successCallback(response);
                               }
                               else{

                               }

                           },function(){

                           },requestData);
                        },3000);

    }

}());

/**
* Created by li_peng on 2017/12/11.
*/
; (function () {
    window.sendSMSModel = function (parent, model) {
        this.parent = parent;
        this.type = "";
        this.second = 0;
        this.secondhint = "0秒";
        this.secondhint_watch_ = observe("0秒");
        this.status = 1; //1:获取短信 2：发送中 3：发送成功 4：发送失败 5：倒计时 6:重新发送 7:发送失败倒计时60秒
        this.status_watch_ = observe(1);
        if (model) {
            this.init(model)
        }
    }
    sendSMSModel.prototype = {
        init: function (model) {
            this.type = model.type;
        },
        send: function (request, callback) {
            var self = this;
            var contentParam = {};
            var requestData = {};
            if (this.type == "risk") {
                contentParam = {
                    phoneNumber: request.phoneNumber,
                    amount: request.amount,
                    currencyCode: request.currencyCode,
                    catalogCode: request.catalogCode,
                    cardInfoId: request.cardInfoId
                };
                requestData = { verifyType: 31, contentParam: JSON.stringify(contentParam) };
            }
            else {
                contentParam = {
                    phoneNumber: request.phoneNumber,
                    amount: request.amount,
                    currencyCode: request.currencyCode,
                    catalogCode: request.catalogCode,
                    brandId: request.brandId,
                    brandType: request.brandType,
                    chargeMode: request.chargeMode,
                    channelId: request.channelId,
                    cardInfoId: request.cardInfoId,
                    cardNo: request.cardNo,
                    cardVerifyNo: request.cardVerifyNo,
                    expiryDate: request.expiryDate,
                    cardHolder: request.cardHolder,
                    idCardType: request.idCardType,
                    idCardNo: request.idCardNo,
                    bindId: request.bindId,
                    bindInfo: request.bindInfo,
                    productId: request.productId,
                    messageContent: request.messageContent,
                    payScene: request.payScene
                };
                requestData = { verifyType: 21, contentParam: JSON.stringify(contentParam) };
            }
            setStatus(self, 2);
            cbuService.sendVerCode(function (response) {
                if (response.retCode == 0) {
                    setStatus(self, 3);
                    if(callback) callback({ referenceno: response.referenceno,isError:false });
                }
                else {
                    response.referenceno = "";

                    //FNC9999的不限制60s，其他FNC的都限制60s
                    //非FNC的也不限制60s
                    if (/^(EXT|SVC)\-[0-9]{3}\-FNC(?!9999).*$/.test(response.retCode) ) {
                        setStatus(self, 7);
                    }
                    else if( response.retCode == "SVC-530-createVerCode:405"){
                        setStatus(self, 7);
                    }
                    else if (response.retCode == "SVC-530-F" || response.retCode == "SVC-530-SendMessage:100") {
                        setStatus(self, 4);
                        response.retMessage = "验证码无效，请重新获取";
                    }
                    else{
                        setStatus(self, 4);
                    }
                    if(callback) callback({ referenceno: response.referenceno ,isError:true, errorMessage:response.retMessage});
                }
            }, function () {
                setStatus(self, 4);
                if(callback) callback({ referenceno: response.referenceno ,isError:true, errorMessage:"网络异常。请重试"});
            }, requestData);
        },
        reset: function () {
            this.second = 0;
            this.secondhint = "0秒";
            this.secondhint_watch_("0秒");

            setStatus(this, 1);
        }


    }
    function setSecondhint(model) {
        model.secondhint = model.second + "秒";
        model.secondhint_watch_(model.secondhint);
    }
    function setStatus(model, status) {
        if(status===2) {wlockevent=true;}
        else {wlockevent=false;}
        if(model.status === 1 && status === 6) return;
        model.status = status;
        model.status_watch_(status);
        if (status === 3) {
            setTimeout(function () {
                if(model.status===3){
                    countDown(model);
                }
            }, 1000);
        }
        else if (status === 4) {
            setTimeout(function () {
                setStatus(model, 6);
            }, 1000);
        }
        else if (status === 7) {
            setTimeout(function () {
                if(model.status===7){
                    countDown(model);
                }
            }, 1000);
        }
    }
    function countDown(model) {

        model.second = 60;
        setSecondhint(model);

        setStatus(model, 5);
        var _intervalid = setInterval(function () {
            if (model.second < 1) {
                clearInterval(_intervalid);
                setStatus(model, 6);
            }
            else {
                model.second = model.second - 1;
                setSecondhint(model);
            }
        }, 1000);

    }
} ());
/**
 * Created by hudandan on 2017/11/28.
 */
var settingCtripPasswardModel = function (ctripPayInfo,parent) {
    this.parent = parent;
    this.hasPassword =  ctripPayInfo.hasPassword;
    this.payPasswordSettingUrl = ctripPayInfo.payPasswordSettingUrl;
    this.isShow = false;
    this.isShow_watch_ = observe( false );
    this.status = 1; //1.显示设置密码按钮2.显示确定按钮
    this.status_watch_ = observe( 1 );
    this.successCallback=null;
    this.errorCallback=null;
};
settingCtripPasswardModel.prototype={
    show:function(request){
        console.log('show this',this);
        this.isShow = true;                                                                  
        this.isShow_watch_(true);
        this.status = 1;
        this.status_watch_ ( 1 );
        this.successCallback=request.successCallback;
        this.errorCallback=request.errorCallback;

    },
    close:function(){
        console.log('close this',this);
        this.isShow = false;
        this.isShow_watch_(false);
        this.status = 1;
        this.status_watch_ ( 1 );
        this.errorCallback();
    },
    setUrl:function(){
        this.status = 2;
        this.status_watch_ ( 2 );
        window.open(this.payPasswordSettingUrl,'newwindow');

    },
    confirmBtn:function () {
        var self = this;
        cbuService.queryWalletDetail(function (response) {
            self.successCallback(response);
            if(response.retCode === '0'){
                if (!!response.hasPassword){
                    self.close();
                    self.hasPassword = true;
                }else{
                    self.hasPassword = false;
                    self.status = 1;
                    self.status_watch_ ( 1 );
                }
            }else{
                self.hasPassword = false;
                console.error("请求出错",response.retCode);
            }
        },function (response) {
            self.errorCallback(response);
        });
    }

};