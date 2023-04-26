if (!String.prototype.format) {
    /**
     * @method format 字符串格式化函数
     * @param  args 任意个参数
     * @return {String} 格式化后的字符串
     */
    String.prototype.format = function (args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0, lenTmp = arguments.length; i < lenTmp; i++) {
                    if (arguments[i] != undefined) {
                        var reg1 = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg1, arguments[i]);
                    }
                }
            }
        }
        return result;
    }
}

//解决低版本ie不支持forEach
if (!Array.prototype.forEach) {
    /**
     * @method forEach 循环函数
     * @param  {Function} callback 函数
     * @param  thisArg 任意个参数
     */
    Array.prototype.forEach = function forEach(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError("this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;

        while (k < len) {

            var kValue;
            if (k in O) {

                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (typeof CheckFieldResult == "undefined") {
    /** @enum {Object} 必填项检查结果*/
    var CheckFieldResult = {
        /** @property {Number} [Valid] 有效*/
        Valid: 0,
        /** @property {Number} [Empty] 必填项为空*/
        Empty: 1,
        /** @property {Number} [Invalid] 必填项无效（格式错误或无效）*/
        Invalid: 2
    }
}


var OtherHelper = {
    UBTGuid: "",
    getUBTGuid: function (isNew) {
        if (!this.UBTGuid || isNew) {
            this.UBTGuid = this.getGUID();
        }
        return this.UBTGuid;
    },
    /***
     * 生产一个guid
     * @returns {*}
     */
    getGUID: function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    },
    ieVersion: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6; //IE版本<=7
            }
        } else if (isEdge) {
            return 'edge'; //edge
        } else if (isIE11) {
            return 11; //IE11
        } else {
            return -1; //不是ie浏览器
        }
    },
    base64: (function () {
        //私有字段
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        //UTF-8加密
        var utf8Encode = function (string) {
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        };
        //UTF-8解密
        var utf8Decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        };

        var Return = {
            //Base64加密
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = utf8Encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                        keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) + keyStr.charAt(enc4);
                }
                return output;

            },
            //Base64解密
            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = utf8Decode(output);
                return output;
            }
        };
        return Return;
    })()
}


var AmountHelper = {
    //获取货币符号
    getCurrencyUnit: function (currencyCode) {
        var currencyUnit = "";
        switch (currencyCode) {
            case "JPY":
                currencyUnit = "円";
                break;
            case "KRW":
                currencyUnit = "원";
                break;
            default:
                result = currencyUnit;
                break;
        }

        return currencyUnit
    },
    number: function (input) {
        var result = Number(input);
        return (isNaN(result) ? 0 : result);
    },
    //四舍五入
    amount: function (input, decimals) {
        var result = AmountHelper.number(input);

        var multiple = Math.pow(10, decimals);
        result = Math.round(result * multiple) / multiple;

        return result;
    }

}

var CardHelper = {
    luhnCheck: function (cardno) {//卡号Luhn验证
        var subNum = 0;
        var checkSum = 0;
        var cardnoLen = cardno.length;
        var modType = cardnoLen % 2;

        for (var i = 0; i < cardnoLen; i++) {
            subNum = parseInt(cardno.substr(i, 1));

            if (modType == i % 2) {
                subNum = subNum * 2;

                if (subNum > 9)
                    subNum = parseInt(subNum / 10) + subNum % 10;
            }

            checkSum = checkSum + subNum;
        }

        if (checkSum % 10 != 0) {
            return false;
        }
        return true;
    },
    checkCardNo: function (cardNo) {
        if (cardNo == null || cardNo.length == 0) {
            return CheckFieldResult.Empty;
        }
        else if (!/^\d{13,19}$/.test(cardNo)) {
            return CheckFieldResult.Invalid;
        }
        return CheckFieldResult.Valid;
    },
    checkCardVerifyNo: function (cardVerifyNo, isAme) {
        if (cardVerifyNo == null || cardVerifyNo.length == 0) {
            return CheckFieldResult.Empty;
        }
        else {
            if (isAme == true) {
                if (!/^\d{4}$/.test(cardVerifyNo)) {
                    return CheckFieldResult.Invalid;
                }
            }
            else {
                if (!/^\d{3}$/.test(cardVerifyNo)) {
                    return CheckFieldResult.Invalid;
                }
            }
        }
        return CheckFieldResult.Valid;
    },
    checkPhoneNo: function (phoneNo, isForeignPhoneNo) {
        if (phoneNo == null || phoneNo.length == 0) {
            return CheckFieldResult.Empty;
        }
        else {
            if (isForeignPhoneNo == true) {
                if (!/^\d{1,20}$/.test(phoneNo)) {
                    return CheckFieldResult.Invalid;
                }
            }
            else {
                if (!/^1\d{10}$/.test(phoneNo)) {
                    return CheckFieldResult.Invalid;
                }
            }
        }
        return CheckFieldResult.Valid;
    },
    checkSmsCode: function (smsCode) {
        if (smsCode == null || smsCode.length == 0) {
            return CheckFieldResult.Empty;
        }
        else if (!/^\d{6}$/.test(smsCode)) {
            return CheckFieldResult.Invalid;
        }
        return CheckFieldResult.Valid;
    },
    checkValidity: function (validity) {
        if (!/^\d{6}$/.test(parseInt(validity))) {
            return CheckFieldResult.Invalid;
        } else {
            var date = new Date(),
                vYear = parseInt(validity.slice(0, 4)),
                vMonth = parseInt(validity.slice(4)),
                tYear = date.getFullYear(),
                tMonth = date.getMonth();
            if (vYear < tYear || ( vMonth < tMonth && vYear == tYear ) || vYear - tYear > 25 || vMonth < 1 || vMonth > 12) {
                return CheckFieldResult.Invalid;
            }
            else {
                return CheckFieldResult.Valid;
            }
        }


    },
    isAmericanExpress: function (cardType) {
        return ( cardType == 8 || cardType == 87 || cardType == 88 );
    },
    isAmericanExpressByBankCode: function (bankCode) {
        return bankCode == "AMEX";
    },
    isChineseID: function (number) {//验证（中国）身份证号码
        number = String(number).toLowerCase();
        function isDateLegal(y, m, d) {
            var st = [m, d, y.length < 4 ? '19' + y : y].join('/').replace(/\b0/g, ''),
                dt = new Date(Date.parse(st));
            return [dt.getMonth() + 1, dt.getDate(), dt.getFullYear()].join('/') == st;
        }

        function checkDate(y, m, d) {
            var st = [m, d, y.length < 4 ? '19' + y : y].join('/').replace(/\b0/g, '');
            var dt = new Date(Date.parse(st));
            return [dt.getMonth() + 1, dt.getDate(), dt.getFullYear()].join('/') == st;
        }

        if (/^\d{15}$/.test(number)) {
            return checkDate.apply(null, number.match(/^.{6}(..)(..)(..)/).slice(1));
        }
        if (/^\d{17}[\dx]$/i.test(number)) {
            var sum = 0, times = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            for (var i = 0; i < 17; i++)
                sum += parseInt(number.charAt(i), 10) * times[i];
            if ("10x98765432".charAt(sum % 11) != number.charAt(17))
                return false;
            return isDateLegal.apply(null, number.match(/^.{6}(.{4})(..)(..)/).slice(1));
        }
        return false;
    },

    isInCardNoRange: function (cardno, creditCardNoRange) {
        if (creditCardNoRange == null || creditCardNoRange == "") {
            return 2;
        }
        var arrCardNoRange = creditCardNoRange.split('|');
        if (arrCardNoRange == null || arrCardNoRange.length < 1) {
            return 2;
        }

        var listCardNo = [];

        for (var i = 0, lenTmp = arrCardNoRange.length; i < lenTmp; i++) {
            var cardNoRangeItem = arrCardNoRange[i];
            var pairs = cardNoRangeItem.split('&');

            var cardNoRangeObj = new Object();
            for (var j = 0, lenPairsTmp = pairs.length; j < lenPairsTmp; j++) {
                var pos = pairs[j].indexOf('='); // Look for "name=value"
                if (pos == -1) continue; // If not found, skip
                var argname = pairs[j].substring(0, pos); // Extract the name
                var value = pairs[j].substring(pos + 1); // Extract the value
                cardNoRangeObj[argname] = value; // Store as a property
            }
            if (cardNoRangeObj.StartNo != null && cardNoRangeObj.EndNo != null) {
                listCardNo.push(cardNoRangeObj);
            }
        }

        if (listCardNo == null || listCardNo.length < 1) {
            return 2;
        }

        var cardnolength = cardno.length;
        if (cardno == null || cardnolength < 1) {
            return 2;
        }

        for (var i = 0; i < listCardNo.length; i++) {
            var objStartEnd = listCardNo[i];
            var minLegth = cardnolength;
            if (cardnolength > objStartEnd.StartNo.length) {
                minLegth = objStartEnd.StartNo.length;
            }

            var cardnoInput = cardno.substr(0, minLegth);
            var cardnoStart = objStartEnd.StartNo.substr(0, minLegth);
            var cardnoEnd = objStartEnd.EndNo.substr(0, minLegth);

            if (cardnoStart <= cardnoInput && cardnoInput <= cardnoEnd) {
                if (cardnolength >= objStartEnd.StartNo.length) {
                    return 2;
                }
                else {
                    return 1;
                }
            }
        }
        return -1;
    }
}

var SingletonJSEncrypt = (function () {
    var encrypt;

    function init(publicKey) {
        /*这里定义单例代码*/
        encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        return encrypt;
    }

    return {
        getInstance: function (publicKey) {
            if (!encrypt) {
                encrypt = init(publicKey);
            }
            return encrypt;
        }
    };
})();

//加密帮助类
var EncryptHelper = {
    "publicKey": "",
    init: function (publicKey) {
        if (!EncryptHelper.publicKey) {
            EncryptHelper.publicKey = publicKey;
        }
    },
    //加密
    encrypt: function (d) {
        if (d == null) {
            d = "";
        }

        var encrypt = SingletonJSEncrypt.getInstance(EncryptHelper.publicKey);
        return encrypt.encrypt(d);
    }
};



