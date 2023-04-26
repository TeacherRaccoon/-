var tbodyText = ['编辑', '删除', '新增'];
var cardText = ['添加证件', '删除', '证件类型', '证件号码', '有效期', '请选择'];
var ffpText = ['添加常旅客卡', '删除', '航空公司', '卡号'];
var sexText = ['男', '女'];
var ffpsText = ['有', '无'];
var passengerNoticeText = { 'NameCN': '请输入中文姓名', 'FisrtName': 'FirstName(名)', 'MiddleName': 'MiddleName', 'LastName': 'LastName(姓)',
    'Country': '中文/英文', 'Day': 'yyyy-mm-dd', 'Mobie': { 'L': '大陆手机', 'C':'国家码','F': '非大陆手机' }, 'Phone': { 'Area': '区号', 'Phone': '电话', 'End': '分机' }
};
var passengerErrorText = { 'Name': { 'Need': '中文姓名和英文姓名请至少选填一项', 'CN': '中文姓名只能包含汉字、字母和连字符，如果名字中包含生僻字可直接输入拼音代替', 'Cnfirst': '请填写正确的中文姓名，第一个汉字不可用拼音代替。',
        'F': { 'Full': '请填写完整的英文姓名', 'Vali': '只能包含英文字母', 'MiddleVali': '请输入正确的MiddleName' }
    }, 'BirthDay': '请填写正确的出生日期', 'BirthCard': '身份证号码与出生日期不匹配', 'SexCard': '身份证号码与性别不匹配', 'Address': '请填写正确的出生地址', 'Mobie': { 'Need': '请填写手机号码', 'Vali': '请填写正确的手机号码' }, 'Mobilefc':'请选择国家码',
    'Phone': { 'Area': '请输入正确的区号', 'Phone': '请输入正确的电话号码', 'End': '请输入正确的分机号码' }, 'Email': '请输入正确的EMail',
    'Cards': { 'Type': '请选择证件类型', 'No': { 'Need': '请输入证件号码', 'Vali': '请输入正确的证件号码', 'IDCard': '请输入正确的身份证号码' }, 'Date': { 'Need': '请输入证件有效期', 'Vali': '请输入正确的证件有效期', 'Out': '证件已过期'} },
    'FFPs': { 'Type': '请选择航空公司', 'Same': '航空公司不能重复', 'No': { 'Need': '请输入卡号', 'Vali': '请输入正确的卡号' } }
};
var passengerCardDatas = "@alianqiu|阿联酋航空|EK@alianqiulianhe|阿联酋联合航空|EY@aisaiebiya|埃塞俄比亚航空|ET@asitana|阿斯塔纳航空|KC@aiji|埃及航空|MS@aodili|奥地利航空|OS@aomen|澳门航空|NX@aodaliya|澳大利亚航空|QF@bolin|柏林航空|AB@beiou|北欧航空|SK@changrong|长荣航空|BR@chongqing|重庆航空|OQ@daxinhua|大新华航空|CN@dahan|大韩航空|KE@damei|达美航空|DL@dalu|大陆航空|CO@dongfang|东方航空|MU@eluosi|俄罗斯航空|SU@faguo|法国航空|AF@feilvbin|菲律宾航空|PR@fuxing|复兴航空|B7@fenlan|芬兰航空|AY@guotai|国泰航空|CX@ganglong|港龙航空|KA@haiwan|海湾航空|GF@hansha|汉莎航空|LH@hainan|海南航空|HU@helanhuangjia|荷兰皇家航空|KL@hanya|韩亚航空|OZ@jianada|加拿大航空|AC@jinlu|金鹿航空|JD@jixiang|吉祥航空|HO@kenniya|肯尼亚航空|KQ@kataer|卡塔尔航空|QR@lvxingzheng|旅行证|0@meiguo|美国航空|AA@moxige|墨西哥航空|AM@malaixiya|马来西亚航空|MH@meiguolianhe|美国联合航空|UA@quanrikong|全日空航空|NH@riben|日本航空|JL@ruishi|瑞士航空|LX@sichuan|四川航空|3U@shanghai|上海航空|FM@shandong|山东航空|SC@shenzhen|深圳航空|ZH@taiguo|泰国航空|TG@tuerqi|土耳其航空|TK@wenlai|汶莱航空|BI@wulagui|乌拉尔航空|U6@weizhen|维珍航空|VS@xiamen|厦门航空|MF@xinjiapo|新加坡航空|SQ@xinxilan|新西兰航空|NZ@xibu|西部航空|PN@xianggangkuaiyun|香港快运航空|UO@yindujiete|印度捷特航空|9W@yidali|意大利航空|AZ@yindu|印度航空|AI@yingguo|英国航空|BA@yindunixiya|印度尼西亚航空|GA@yiselie|以色列航空|LY@yuenan|越南航空|VN@zhongguoguoji|中国国际航空|CA@zhonghua|中华航空|CI@zhongguonanfang|中国南方航空|CZ@";
var storedCards = [];
var certListStr;
var backPassegner;
function setNotice() {
    $.mod.load('notice', '1.0', function () {
        var n = passengerNoticeText;
        var ci = C.Others.initNotice;
        ci('#txt_namecn', "ncn", n.NameCN);
        ci('#txt_lastname', "lname", n.LastName);
        ci('#txt_firstname', "fname", n.FisrtName);
        //ci('#txt_middlename', "mname", n.MiddleName);
        ci('#txt_country', "ctry", n.Country);
        //ci('#txt_birth', "birth", n.Day);
        ci('#txt_mobile', "mob", n.Mobie.L);
        ci('#txt_mobileFcountry', "mobFC", n.Mobie.C);
        ci('#txt_mobileF', "mobF", n.Mobie.F);
        ci('#txt_confax_zone', "faxzone", n.Phone.Area);
        ci('#txt_confax_phone', "faxphone", n.Phone.Phone);
        ci('#txt_confax_end', "faxend", n.Phone.End);
        ci('#txt_contel_zone', "telzone", n.Phone.Area);
        ci('#txt_contel_phone', "telphone", n.Phone.Phone);
        ci('#txt_contel_end', "telend", n.Phone.End);
    });
}
var PassengerCards = function () {
    var container = $('');
    var cards = [];
    var limitIds = [];
    function init(containerselector, dataStr, limitids) {
        container = $(containerselector);
        if (dataStr != '') {
            cards = new Array();
            var arr = dataStr.split('@');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '') {
                    var tmp = arr[i].split('|');
                    if (tmp.length >= 2) {
                        var card = { 'NM': tmp[1], 'ID': tmp[0] };
                        cards.push(card);
                    }
                }
            }
            if (typeof (limitids) == 'string' && limitids != '') {
                limitIds = limitids.split('|');
            }
        }
        defaultCards();
    }
    function getMaxAddNum() {
        return Math.min(cards.length, 12);
    }
    function defaultCards() {
        if (cards.length > 0) {
            //编辑页仅显示一个证件下拉,隐藏增加证件按钮
            //var h = '<ul class="mb20 account_form form2 fs14"><li class="li_add"><a href="###" class="ico_add2">' + cardText[0] + '</a></li></ul>';
            var h = '<ul class="account_form travel_form"><li class="li_add" style="display:none"><a href="###" class="ico_add2">' + cardText[0] + '</a></li></ul>';
            container.html(h);
            bindAddEvent();
        }
        else {
            container.html('');
        }
    }
    function bindAddEvent() {
        container.find('a:first').bind("click", function () {
            add('', '', '');
            showAddLink();
        });
    }
    function add(typeid, cardno, date) {
        if (typeid != '') {
            var sels = container.find('select');
            for (var i = 0; i < sels.length; i++) {
                deleteOption(sels[i], typeid);
            }
        }
        var li = document.createElement('li');
        //编辑页仅显示一个证件下拉,隐藏删除证件按钮
        //        li.innerHTML = getCardSelect()
        //            + getInputHtml(cardText[3], 'w05 ipt_card_no', cardno, true, false)
        //            + getInputHtml(cardText[4], 'w07 upt_card_limtdate', date, false, false)
        //            + '<a href="###" class="ico_del">' + cardText[1] + '</a>';
        li.innerHTML = getCardSelect()
            + getInputHtml(cardText[3], 'w05 ipt_card_no', cardno, true, false)
            + getInputHtml(cardText[4], 'w07 upt_card_limtdate', date, false, false, null)
            + '<a href="###" class="ico_del" style="display:none">' + cardText[1] + '</a>';
        var ul = container.find('>ul:eq(0)');
        if (typeid != '') {
            var sel = $(li).find('select');
            sel.attr('sv', typeid);
            sel.value(typeid);
        }
        ul.append(li);
        var lis = ul.find(">li");
        ul.append(lis[lis.length - 2]);
        regLastFunction();
        $('.upt_card_limtdate').regMod('calendar', '6.0', { options: { showOptions: true, showWeek: false, defaultDate: '1990-01-01', minDate: '1800-01-01', maxDate: '2100-12-31', step: 1} });
    }
    function getCardSelect() {
        var h = '<label class="tit">' + cardText[2] + '<em>*</em></label><select class="vam m_input w05" sv=""><option value="">' + cardText[5] + '</option>';
        var sels = container.find('select');
        for (var i = 0; i < cards.length; i++) {
            var has = false;
            for (var j = 0; j < sels.length; j++) {
                if ($(sels[j]).value() != '') {
                    if ($(sels[j]).value() == cards[i].ID) {
                        has = true;
                        break;
                    }
                }
            }
            if (!has) {
                h += getOption(cards[i].ID, cards[i].NM);
            }
        }
        h += '</select>';
        return h;
    }
    function getInputHtml(text, classnm, value, must, readonly, tid) {
        var h = '<label class="tit">' + text + (must ? '<em>*</em>' : '') + '</label><input class="m_input ' + classnm + '" value="' + value + '"' + (must ? 'cardNo="' + value + '"' : '') + (tid ? 'tid="' + tid + '"' : '') + (readonly ? 'readonly="readonly"' : '') + (classnm == 'w07 upt_card_limtdate' ? ' placeholder="yyyy-MM-dd"' : '') + ' maxlength="30" type="text"/>';
        return h;
    }
    function regLastFunction() {
        var last = container.find('li').length - 2;
        container.find('a:eq(' + last + ')').bind("click", function () {
            var li = $(this).parentNode();
            var sv = li.find('select').value();
            li.remove();
            showAddLink();
            if (sv != '') {
                var sels = container.find('select');
                var card = getCard(sv);
                for (var i = 0; i < sels.length; i++) {
                    insertOption(card, sels[i]);
                }
            }
        });
        container.find('select:eq(' + last + ')').bind('change', function () {
            var nowSel = $(this);
            var presv = nowSel.attr('sv');  //CHANGE之前的选项
            var card = null;
            if (presv != '') {
                card = getCard(presv);
            }
            var nowsv = nowSel.value();
            nowSel.attr('sv', nowsv);
            var limit = true;
            if (nowsv != '') {
                limit = isLimit(nowsv);
            }
            var dis = limit ? '' : 'none';
            var li = $(this).parentNode();
            //li.find('label:last').css('display', dis);
            //li.find('input:last').css('display', dis);
            //多个明细时，当一种证件被选后，后几行的下拉框内没有这个种类的选项
            var sels = container.find('select');
            for (var i = 0; i < sels.length; i++) {
                if (nowSel[0] == sels[i]) {
                    continue;
                }
                deleteOption(sels[i], nowsv);
                if (card != null) {
                    insertOption(card, sels[i]);
                }
            }
            //存储CHANGE之前填的证件内容
            var hasCardPre = false;
            for (var i = 0; i < storedCards.length; i++) {
                if (storedCards[i].cardtype == presv) {
                    storedCards[i].cardno = li.find('.ipt_card_no')[0].value;
                    storedCards[i].cardlimit = li.find('.upt_card_limtdate')[0].value;
                    hasCardPre = true;
                    break;
                }
            }
            if (!hasCardPre && presv != '') {
                var storedCard = { cardtype: presv, cardno: li.find('.ipt_card_no')[0].value, cardlimit: li.find('.upt_card_limtdate')[0].value };
                storedCards.push(storedCard);
            }
            //显示CHANGE之后的证件内容
            var hasCardNow = false
            for (var i = 0; i < storedCards.length; i++) {
                if (storedCards[i].cardtype == nowsv) {
                    li.find('.ipt_card_no')[0].value = storedCards[i].cardno;
                    li.find('.upt_card_limtdate')[0].value = storedCards[i].cardlimit;
                    hasCardNow = true;
                    break;
                }
            }
            if (!hasCardNow) {
                li.find('.ipt_card_no')[0].value = "";
                li.find('.upt_card_limtdate')[0].value = "";
            }
            //依照认证数据封闭姓名输入框
            $('.ipt_card_no').removeAttr("disabled");
            if (certListStr && certListStr.indexOf("|") > -1) {
                var certinfos = certListStr.split('@');
                for (var i = 0; i < certinfos.length; i++) {
                    if ("A" == certinfos[i].split('|')[2]) {
                        //依照认证数据封闭证件号输入框
                        if ($('.vam').attr('sv') == certinfos[i].split('|')[0]) {
                            $('.ipt_card_no').attr("disabled", true);
                        }
                    }
                }
            }
        });
        container.find('input:eq(' + last + ')').bind('blur', function () {
            //证件号身份证失焦设定用户生日
            var li = $(this).parentNode();
            var cardno = li.find('.ipt_card_no')[0].value;
            var reg = /^[\da-zA-Z]{5,}$/;
            if ($('.vam').attr('sv') == "1" && cardno.length == 18 && reg.test(cardno)) {
                var year = cardno.substring(6, 10);
                var month = cardno.substring(10, 12);
                var day = cardno.substring(12, 14);
                var birthday = year + "-" + month + "-" + day;
                $('#txt_birth')[0].value = birthday;
                // 自动选择性别
                var sexnumber = cardno.substring(16, 17);
                if (sexnumber == '1' || sexnumber == '3' || sexnumber == '5' || sexnumber == '7' || sexnumber == '9') {
                    $('input:radio[name=sex]')[0].checked = true;
                } else {
                    $('input:radio[name=sex]')[1].checked = true;
                }
            }

        });
        var inputDate = container.find('input.upt_card_limtdate:eq(' + last + ')');
        //C.Others.initNotice(inputDate, 'card_date', 'yyyy-mm-dd');
    }
    function deleteOption(sel, id) {
        var opts = $(sel).find('option:gt(0)');
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value == id) {
                $(opts[i]).remove();
                break;
            }
        }
    }
    function insertOption(card, sel) {
        var tmpop = document.createElement('option');
        tmpop.value = card.ID;
        $(tmpop).html(card.NM);
        var index = getInsertOptionIndex(sel, card.ID);
        $(tmpop).insertAfter($(sel).find('option:eq(' + index + ')'));
    }
    function getCard(id) {
        var card = null;
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].ID == id) {
                card = cards[i];
                break;
            }
        }
        return card;
    }
    function getInsertOptionIndex(sel, sv) {
        sv = parseInt(sv);
        var index = -2;
        var opts = $(sel).find('option:gt(0)');
        for (var i = 0; i < opts.length; i++) {
            var v = parseInt($(opts[i]).value());
            if (v > sv) {
                index = i - 1;
                break;
            }
        }
        if (index == -2) {
            index = opts.length - 1;
        }
        return index + 1;
    }
    function getOption(value, text, select) {
        return '<option value="' + value + '"' + (!select ? '' : ' selected="selected"') + '>' + text + '</option>';
    }
    function showAddLink() {
        container.find('li:last').css('display', container.find('a.ico_del').length < getMaxAddNum() ? '' : 'none');
    }

    function validate() {
        var vali = true;
        var v = C.Validate;
        var f = passengerErrorText;
        var lis = container.find("li:not(:last)");
        for (var i = 0; i < lis.length; i++) {
            var ipt = $(lis[i]).find('input');
            var sel = $(lis[i]).find('select');
            vali = v.checkNull(sel, f.Cards.Type)
                && checkCardNo($(sel).value(), ipt[0])
                && ($(ipt[1]).css('display') == 'none' || checkDate(ipt[1]));
            if (!vali) {
                break;
            }
        }
        return vali;
    }
    function checkCardNo(cardid, dom) {
        var v = C.Validate;
        var f = passengerErrorText.Cards.No;
        var vali = v.checkNull(dom, f.Need);
        if (vali) {
            var reg = /^[\da-zA-Z]{5,}$/;
            var errorText = f.Vali;
            switch (cardid) {
                case '1':
                    if ($(dom).attr("cardNo") == $(dom).value().trim()) {
                        return true;
                    }
                    reg = v.regs.idCard;
                    errorText = f.IDCard;
                    break;
                case '2':
                    if ($(dom).attr("cardNo") == $(dom).value().trim()) {
                        return true;
                    }
                    break;
                case '25':
                    if ($(dom).attr("cardNo") == $(dom).value().trim()) {
                        return true;
                    }
                    break;
                default:
                    break;
            }
            vali = v.checkRegex(dom, reg, errorText);
        }
        return vali;
    }
    function checkDate(dom) {
        var v = C.Validate;
        var f = passengerErrorText.Cards.Date;
        var pd = C.Others.parseDate;
        //var vali = v.checkNull(dom, f.Need) && v.checkRegex(dom, v.regs.date, f.Vali);
        var vali = true;
        if ($(dom).value()) {
            var vali = v.checkRegex(dom, v.regs.date, f.Vali);
            if (vali) {
                if (pd($(dom).value()) < pd(getServerDate().now)) {
                    v.setFailureMessage(dom, f.Out);
                    vali = false;
                }
            }
        }
        return vali;
    }
    function isLimit(id) {
        var limit = false;
        for (var j = 0; j < limitIds.length; j++) {
            if (limitIds[j] == id) {
                limit = true;
                break;
            }
        }
        return limit;
    }
    function getValues() {
        var cardArr = new Array();
        var lis = container.find("li:not(:last)");
        for (var i = 0; i < lis.length; i++) {
            var ipt = $(lis[i]).find('input');
            var sel = $(lis[i]).find('select');
            var id = sel.value();
            var v = id + '|' + $(ipt[0]).value().trim() + '|';
            //if (isLimit(id)) {
            v += $(ipt[1]).value().trim();
            //}
            cardArr.push(v);
        }
        return cardArr.join('@');
    }
    function setValues(values) {
        defaultCards();
        if (cards.length > 0 && typeof (values) == 'string' && values != '') {
            var arr = values.split('@');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '') {
                    var card = arr[i].split('|');
                    if (card.length == 3) {
                        card[0] = card[0].trim();
                    }
                    if (card[0] == '0' && arr.length > 1) {
                        continue;   //排除证件类型=0的残留垃圾数据
                    }
                    if (card[0] != '') {
                        add(card[0], card[1].trim(), card[2].trim());
                        break; //只显示单套证件明细
                        //                        if (!isLimit(card[0])) {
                        //                            var ipt = container.find('input.upt_card_limtdate:last');
                        //                            ipt.css('display', 'none');
                        //                            ipt.parentNode().find('label:last').css('display', 'none');
                        //                        }
                    }
                }
            }
            //存储所有证件
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '') {
                    var card = arr[i].split('|');
                    if (card[0] == '0') {
                        continue;   //排除证件类型=0的残留垃圾数据
                    }
                    var storedCard = { cardtype: card[0], cardno: card[1].trim(), cardlimit: card[2].trim() };
                    storedCards.push(storedCard);
                }
            }
        } else {
            //当新增常旅或者没有证件时也显示一套空的输入框
            add('', '', '');
        }
    }
    function getCardTypeName(id) {
        var name = '';
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].ID == id) {
                name = cards[i].NM;
                break;
            }
        }
        return name;
    }
    return {
        init: function (containerselector, dataStr, limitids) { init(containerselector, dataStr, limitids); },
        validate: function () { return validate(); },
        getValues: function () { return getValues(); },
        setValues: function (values) { setValues(values); },
        getCardName: function (id) { return getCardTypeName(id); }
    }
} ();
var PassengerFFPs = function () {
    var container;
    var datas = '';
    var ffps = [];
    function init(containerselector, dataStr) {
        container = $(containerselector);
        datas = dataStr;
        if (dataStr != '') {
            ffps = new Array();
            var arr = dataStr.split('@');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '') {
                    var tmp = arr[i].split('|');
                    if (tmp.length >= 3) {
                        var ffp = { 'EN': tmp[0], 'CN': tmp[1], 'ID': tmp[2] };
                        ffps.push(ffp);
                    }
                }
            }
        }
        defaultFFPs();
    }
    function defaultFFPs() {
        if (ffps.length > 0) {
            var h = '<ul class="account_form travel_form"><li class="li_add"><a href="###" class="ico_add2">' + ffpText[0] + '</a></li></ul>';
            container.html(h);
            bindAddEvent();
        }
        else {
            container.html('');
        }
    }
    function bindAddEvent() {
        container.find('a:last').bind("click", function () {
            add('', '', '');
        });
    }
    function add(air, airid, airno) {
        var li = document.createElement('li');
        li.innerHTML = getInputHtml(ffpText[2], 'ipt_ffp_nm', air)
            + '<input type="hidden" value="' + airid + '" class="ipt_ffp_nm_h"/>'
            + getInputHtml(ffpText[3], 'ipt_ffp_no', airno) + '<a href="###" class="ico_del">' + ffpText[1] + '</a>';
        var ul = container.find('>ul:eq(0)');
        ul.append(li);
        var lis = ul.find(">li");
        ul.append(lis[lis.length - 2]);
        regLastMod();
    }
    function regLastMod() {
        var last = container.find('li').length - 2;
        C.Others.setAddress(container.find('input.ipt_ffp_nm:last'), 'ffp_s', ['name_py', 'name', 'code'], datas, container.find('input.ipt_ffp_nm_h:last'));
        container.find('a:eq(' + last + ')').bind("click", function () {
            $(this).parentNode().remove();
        });
    }
    function getInputHtml(text, classnm, value) {
        var h = '<label class="tit">' + text + '</label><input class="m_input w05 ' + classnm + '" value="' + value + '" maxlength="30" type="text"/>';
        return h;
    }
    function validate() {
        var vali = true;
        var v = C.Validate;
        var f = passengerErrorText;
        var lis = container.find("li:not(:last)");
        for (var i = 0; i < lis.length; i++) {
            var ipt = $(lis[i]).find('input');
            vali = v.checkNull(ipt[0], f.FFPs.Type) && v.checkNull(ipt[2], f.FFPs.No.Need) && v.checkRegex(ipt[2], /^[\da-zA-Z]{3,}$/, f.FFPs.No.Vali);
            if (!vali) {
                break;
            }
        }
        if (vali) {//同名检测
            var inputs = container.find('input.ipt_ffp_nm_h');
            for (var i = 0; i < inputs.length - 1; i++) {
                var airid = $(inputs[i]).value();
                for (var j = i + 1; j < inputs.length; j++) {
                    vali = v.checkCompare(inputs[j], airid);
                    if (!vali) {
                        v.setFailureMessage(container.find('input.ipt_ffp_nm:eq(' + j + ')'), f.FFPs.Same);
                        break;
                    }
                }
                if (!vali) {
                    break;
                }
            }
        }
        return vali;
    }
    function getValues() {
        var ffpArr = new Array();
        var lis = container.find("li:not(:last)");
        for (var i = 0; i < lis.length; i++) {
            var ipt = $(lis[i]).find('input');
            ffpArr.push($(ipt[1]).value().trim() + '|' + $(ipt[2]).value().trim());
        }
        return ffpArr.join('@');
    }
    function setValues(values) {
        defaultFFPs();
        if (ffps.length > 0 && typeof (values) == 'string' && values != '') {
            var arr = values.split('@');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '') {
                    var ffp = arr[i].split('|');
                    if (ffp.length == 2) {
                        ffp[0] = ffp[0].trim();
                    }
                    var air = '';
                    if (ffp[0] != '') {
                        for (var j = 0; j < ffps.length; j++) {
                            if (ffp[0] == ffps[j].ID) {
                                air = ffps[j].CN;
                                break;
                            }
                        }
                        add(air, ffp[0], ffp[1].trim());
                    }
                }
            }
        }
    }
    return {
        init: function (containerselector, dataStr) { init(containerselector, dataStr); },
        validate: function () { return validate(); },
        getValues: function () { return getValues(); },
        setValues: function (values) { setValues(values); }
    }
} ();
function loadjmp() {
    $.mod.load('jmp', '1.0', function () {
        $("#sp_mobiejmp").regMod('jmp', '1.0', { options: {
                template: "$jmp_title",
                content: { "txt": '<div class="base_jmp mc_jmp" style="width:270px;"><div class="jmp_bd">香港手机号码请先输入852(例：85291111111)<br />新加坡手机号码请先输入65(例：6591111111)<br />马来西亚手机号码请先输入6(例：691111111)<br />台湾手机号码请先输入886(例：88691111111)</div></div>' },
                position: "bottomLeft-topRight",
                type: "jmp_title",
                classNames: {
                    boxType: 'jmp_title'
                },
                boundaryShow: false,
                styles: "",
                templs: {
                    "tipTempl": [
                        '<div id=${id} class=${tip} group=${group} style="visibility:hidden;display:block;z-index:99;margin:0;left:-9999px;top:-9999px;overflow:hidden;position:absolute;width:280px;"><div id="tuna_jmpinfo">',
                        '<div class="${box}">',
                        '<b class="${arrow}"></b>',
                        '<div class="${loading}">${loadingImg}</div>',
                        '<div class=${content}></div>',
                        '</div>',
                        '</div>',
                        '</div>'].join(""),
                    "jmp_title": [
                        '<h2>${title}</h2>',
                        '<div class="jmp_bd">',
                        '${txt}',
                        '</div>'].join("")
                }
            }
        });
    });
}

$.ready(function () {
    //全ffp
    if (!!passenger_AllFfps && passenger_AllFfps != "") {
        passengerCardDatas = passenger_AllFfps;
    }

    setNotice();
    //loadjmp();
    PassengerCards.init('#dv_card_list', getCardsData(), ['2', '3', '4', '7', '8', '10', '11', '22', '99'].join('|'));
    PassengerFFPs.init('#dv_ffp_list', passengerCardDatas);
    C.Others.setAddress('#txt_country', 'homecountry_name', ['name_py', 'name', 'code'], getCountryData(), '#txt_countryid');
    InitCountryCodeData();  //初始化海外手机国家码组件内容
    InitPassengerData();


    $('#txt_birth').regMod('calendar', '6.0', { options: { showOptions: true, showWeek: false, defaultDate: '1990-01-01', minDate: '1800-01-01', maxDate: '2100-12-31', step: 1} });

    //新增？填写提示
    var _timeout;
    $('.ico_doubt').bind("mouseover", function () {
        $('.tooltip-passenger')[0].style.display = 'block';
    }).bind("mouseout", function () {
        _timeout = setTimeout(function () { $('.tooltip-passenger')[0].style.display = 'none' }, 200);
    });
    $("div.tooltip-passenger").bind("mouseover", function () {
        clearTimeout(_timeout)
    }).bind("mouseout", function (a) {
        var b = a.relatedTarget || a.toElement;
        if (!this.contains(b)) this.style.display = 'none';
    });
    $("div.tooltip-passenger a.close").bind("click", function () {
        $('.tooltip-passenger')[0].style.display = 'none'
    });
    $("#tooltip-li-old").bind("click", function () {
        if (!$("#tooltip-li-old").hasClass('active')) {
            $("#tooltip-li-old").addClass('active');
            $("#tooltip-div-old").addClass('active');
        }
        if ($("#tooltip-li-new").hasClass('active')) {
            $("#tooltip-li-new").removeClass('active');
            $("#tooltip-div-new").removeClass('active');
        }
    });
    $("#tooltip-li-new").bind("click", function () {
        if ($("#tooltip-li-old").hasClass('active')) {
            $("#tooltip-li-old").removeClass('active');
            $("#tooltip-div-old").removeClass('active');
        }
        if (!$("#tooltip-li-new").hasClass('active')) {
            $("#tooltip-li-new").addClass('active');
            $("#tooltip-div-new").addClass('active');
        }
    });


    $("#bt_SaveAdd").bind("click", function () {
        if (validateInput()) {
            WarnLevelB();
        }
        //        var arr = ['txt_namecn', 'txt_lastname', 'txt_firstname', 'txt_middlename', 'txt_birth',
        //                       'txt_mobileF', 'txt_mobile', 'txt_contel_zone', 'txt_contel_phone', 'txt_contel_end', 'txt_confax_zone', 'txt_confax_phone', 'txt_confax_end'];
        var arr = ['txt_namecn', 'txt_lastname', 'txt_firstname', 'txt_birth',
            'txt_mobileF', 'txt_mobile', 'txt_contel_zone', 'txt_contel_phone', 'txt_contel_end', 'txt_confax_zone', 'txt_confax_phone', 'txt_confax_end'];
        for (var i = 0; i < arr.length; i++) {
            var id = arr[i];
            C.Others.setNoticeInput('#' + id, $('#' + id).value().trim());
        }
        return false;
    });
    //B级认证确认提示
    function WarnLevelB() {
        if (certListStr && backPassegner) {
            var isChanged = false;
            var cnLevel = "";
            var enlastLevel = "";
            var enfirstLevel = "";
            if (certListStr.indexOf("|") > -1) {
                var certinfos = certListStr.split('@');
                for (var i = 0; i < certinfos.length; i++) {
                    if (!!isChanged) {
                        break;
                    }
                    if (certinfos[i].split('|')[2] == "B") {
                        if (certinfos[i].split('|')[3] != "") {
                            cnLevel = "B";
                        }
                        if (certinfos[i].split('|')[4] != "") {
                            enlastLevel = "B";
                        }
                        if (certinfos[i].split('|')[5] != "") {
                            enfirstLevel = "B";
                        }
                        if (certinfos[i].split('|')[6] != "") {
                            enfirstLevel = "B";
                        }
                    }
                    if ($('.vam').attr('sv') == certinfos[i].split('|')[0] && $('.ipt_card_no')[0].value != certinfos[i].split('|')[1]) {
                        isChanged = true;
                    }
                }
            }
            //判断姓名是否变化过
            if (!isChanged && cnLevel == "B" && $('#txt_namecn')[0].value != backPassegner.NameCN) {
                isChanged = true;
            }
            if (!isChanged && enlastLevel == "B" && $('#txt_lastname')[0].value != backPassegner.NameENLastName) {
                isChanged = true;
            }
            if (!isChanged && enfirstLevel == "B" && $('#txt_firstname')[0].value != RTrim(backPassegner.NameENFirstName + " " + backPassegner.NameENMiddleName)) {
                isChanged = true;
            }

            //如果有变化显示确认框
            if (!!isChanged) {
                $("#divConfirmSave").mask();
            } else {
                savePassenger();
            }

        } else {
            savePassenger();
        }
    }

    function RTrim(str) {
        return str.replace(/(\s*$)/g, "");
    }

    $("#btnConfirmSaveNo").bind("click", function () {
        $("#divConfirmSave").unmask();
    });
    $("#btnConfirmSaveYes").bind("click", function () {
        $("#divConfirmSave").unmask();
        savePassenger();
    });

    //初始化数据
    function InitPassengerData() {
        if (parseInt(passenger_infoid) != 0) {
            var url = '../Ajax/GetPassengerInfo.ashx';
            var contextdata = { id: passenger_infoid, refer: passenger_Refer };
            C.Ajax.ajaxRequest(url, { context: contextdata },
                {
                    timeout: 90000,
                    success: function (dataStr) {
                        if (dataStr != '') {
                            var data = eval('(' + dataStr + ')');
                            data.InfoID = passenger_infoid;
                            data.UpdateDate = passenger_CountryName;
                            setPassenger(data);
                            PassengerFFPs.setValues(data.FFPs);
                            backPassegner = data;
                        }
                    }
                });
        }
        else {
            setPassenger(null);
        }
    }
    //初始化海外手机国家码选择
    function InitCountryCodeData() {
        var url = '../Ajax/GetCountryCodeHandler.ashx';
        C.Ajax.ajaxRequest(url, { context: "" },
            {
                timeout: 90000,
                success: function (dataStr) {
                    if (dataStr != '') {
                        SetCountryCodeUI(dataStr);
                    }
                }
            });
    }


    function SetCountryCodeUI(data) {

        var allCodeStr = data.split('|')[0];
        var hotCodeStr = data.split('|')[1];
        //字母
        if (allCodeStr != '') {
            allCodeStr = eval('(' + allCodeStr + ')');
            var lastFirstLetter = "";
            var letters = "ADJMPW";
            var inner = "";
            var letterContainer;
            for (var i = 0; i < allCodeStr.length; i++) {
                if (allCodeStr[i].First != lastFirstLetter && letters.indexOf(allCodeStr[i].First) > -1) {
                    letterContainer = $('#cc_list_' + allCodeStr[i].First);
                    inner = "";
                }
                if (allCodeStr[i].First != lastFirstLetter) {
                    inner += "<span class='item_letter'>" + allCodeStr[i].First + "</span><ul class='item_in'>";
                }
                inner += "<li><a href='###' data-code='" + allCodeStr[i].Code + "' data-cn='" + allCodeStr[i].Cn + "'>" + allCodeStr[i].Cn + "</a><span>" + allCodeStr[i].Code + "</span></li>";
                lastFirstLetter = allCodeStr[i].First;
                if (i == allCodeStr.length - 1 || allCodeStr[i + 1].First != lastFirstLetter) {
                    inner += "</ul>";
                }
                if (i == allCodeStr.length - 1 || (allCodeStr[i + 1].First != lastFirstLetter && letters.indexOf(allCodeStr[i + 1].First) > -1)) {
                    letterContainer.html(inner);
                    $("#" + $(letterContainer)[0].id + " li").bind("mousedown", function (event) {
                        //在面板上选择国家
                        $('#txt_mobileFcountry').value($($(this)[0].children[0]).attr('data-cn') + " " + $($(this)[0].children[0]).attr('data-code'));
                        $('#txt_mobileFcountry').attr("code", $($(this)[0].children[0]).attr('data-code'));
                        $('#txt_mobileFcountry').attr("style", "color:black");  //把字体翻回黑色
                        HideCountryCodeUI();
                        event.stopPropagation();
                    });
                }
            }
        }
        //热门
        if (hotCodeStr != '') {
            hotCodeStr = eval('(' + hotCodeStr + ')');
            var hotContainer = $('#cc_list_hot');
            var inner = "";
            for (var i = 0; i < hotCodeStr.length; i++) {
                inner += "<li><a href='###' data-code='" + hotCodeStr[i].Code + "' data-cn='" + hotCodeStr[i].Cn + "'>" + hotCodeStr[i].Cn + "</a><span>" + hotCodeStr[i].Code + "</span></li>";
            }
            hotContainer.html(inner);
            //绑定点击事件
            $("#" + $(hotContainer)[0].id + " li").bind("mousedown", function (event) {
                //在面板上选择国家（热门）
                $('#txt_mobileFcountry').value($($(this)[0].children[0]).attr('data-cn') + " " + $($(this)[0].children[0]).attr('data-code'));
                $('#txt_mobileFcountry').attr("code", $($(this)[0].children[0]).attr('data-code'));
                $('#txt_mobileFcountry').attr("style", "color:black");  //把字体翻回黑色
                HideCountryCodeUI();
                event.stopPropagation();
            });
        }
        //浮层切换显示时样式
        $('#cc_tabbox li').bind("click", function () {
            var items = $('#cc_tabbox li');
            $('#txt_mobileFcountry')[0].focus();
            for (var i = 0; i < items.length; i++) {
                if (items[i] == this) {
                    items[i].className = "hot_selected";
                    $('#cc_list_' + items[i].id.split('_')[2]).attr('style', 'display:block');
                } else {
                    items[i].className = "";
                    $('#cc_list_' + items[i].id.split('_')[2]).attr('style', 'display:none');
                }
                if (this.id != "cc_tab_hot") {
                    $('#cc_area')[0].className = "country-select has-area-country";
                } else {
                    $('#cc_area')[0].className = "country-select";
                }
            }
        });
    }
    $("#cc_close").bind("mousedown", function (event) {
        HideCountryCodeUI();
        event.stopPropagation();
    });
    $('#cc_area').bind("mousedown", function () {
        $('#txt_mobileFcountry')[0].focus();
    });

    $('#txt_mobileFcountry').bind("focus", function () {
        needHideCountryCode = false;
        ShowCountryCodeUI();
    });
    $('#txt_mobileFcountry').bind("blur", function () {
        needHideCountryCode = true;
        setTimeout('CountryCodeBlur()', 150)
    });

    function validateInput() {
        var f = passengerErrorText;
        var v = C.Validate;
        var vn = v.checkNull;
        var vr = v.checkRegex;
        var cn = vn('#txt_namecn');
        var lf = vn('#txt_lastname');
        var ff = vn('#txt_firstname');
        var ml = vn('#txt_mobile');
        var mf = vn('#txt_mobileF');
        var newMobileReg = /^(1)\d{10}$/;
        return (cn || ff || vn('#txt_lastname', f.Name.Need, '#leg_name'))//名字必须输入一项
            && (!cn || vr('#txt_namecn', /^[\-a-zA-Z\u4e00-\u9fa5•.．·]+$/, f.Name.CN))//中文名如果有输入，必须输入指定字符
            && (checkCnName(f.Name.Cnfirst)) && checkIDCardBirthGender(f.BirthCard, f.SexCard)
            && (!lf || vr('#txt_lastname', v.regs.char, f.Name.F.Vali))
            && (!ff || vr('#txt_firstname', /^[a-zA-Z ]+$/, f.Name.F.Vali))//英文名如果有输入，必须输入英文
            && checkNameF(ff, lf)
            //&& (!vn('#txt_middlename') || vr('#txt_middlename', /^[a-zA-Z](\w|\s|[\-\/])*$/g, f.Name.F.MiddleVali)) //英文名完整性输入 和 middname必须输入英文验证
            && (!vn('#txt_birth') || (vr('#txt_birth', v.regs.date, f.BirthDay) && checkBirth()))
            && (!vn('#txt_address') || vr('#txt_address', /[\u4e00-\u9fa5]{2,}/, f.Address)) //生日和出生地如果有输入必须符合输入规范
            //&& (ml || vn('#txt_mobileF', f.Mobie.Need, '#lbl_mobie')) //大陆和非大陆手机必须输入一项
            //            && (!ml || checkMobile('#txt_mobile', v.regs.mobie, f.Mobie.Vali))    //大陆手机正则调整
            && (!ml || checkMobile('#txt_mobile', newMobileReg, f.Mobie.Vali))
            && (!mf || checkMobile('#txt_mobileF', /^\d{7,15}$/, f.Mobie.Vali))//大陆和非大陆手机正确性验证
            && (checkMobileF_C())
            && (!vn('#txt_contel_zone') || vr('#txt_contel_zone', /^\d{3,6}$/, f.Phone.Area)) && (!vn('#txt_contel_phone') || vr('#txt_contel_phone', /^(\d|\*){7,8}$/, f.Phone.Phone)) && (!vn('#txt_contel_end') || vr('#txt_contel_end', /^\d{2,6}$/, f.Phone.End))
            && (!vn('#txt_confax_zone') || vr('#txt_confax_zone', /^\d{3,6}$/, f.Phone.Area)) && (!vn('#txt_confax_phone') || vr('#txt_confax_phone', /^(\d|\*){7,8}$/, f.Phone.Phone)) && (!vn('#txt_confax_end') || vr('#txt_confax_end', /^\d{2,6}$/, f.Phone.End))
            && (!vn('#txt_email') || checkEmail('#txt_email', v.regs.email, f.Email)) //email验证
            && PassengerCards.validate()//证件验证
            && PassengerFFPs.validate(); //常旅卡验证
    }

    function checkMobileF_C() {  //海外手机国家码
        if ($('#txt_mobileFcountry').value() == '' && $('#txt_mobileF').value()) {
            return C.Validate.checkNull('#txt_mobileFcountry', passengerErrorText.Mobilefc);
        }
        return true;
    }

    function checkCnName(words) {   //验证中文名
        var cnname = $('#txt_namecn').value();
        if ("" != cnname) {
            var charsCNName = cnname.split("");
            var firstChar = charsCNName[0];
            var rez = /^[\u4e00-\u9fa5]+$/;
            if (!rez.test(firstChar)) {
                C.Validate.setFailureMessage('#txt_namecn', words);
                return false;
            }
        }
        return true;
    }

    function checkIDCardBirthGender(birthWords, genderWords) {   //验证身份证与生日性别的关系
        //先取身份证号，如果当前是身份证直接取，不是则取变更前的
        var checkIdCardNo;
        if ($('.vam').attr('sv') == "1") {
            checkIdCardNo = $('.ipt_card_no')[0].value;     //当前是身份证
        } else if (backPassegner && backPassegner.Cards && backPassegner.Cards.indexOf('|') >= 0) {
            var arr = backPassegner.Cards.split('@');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].split('|')[0] == "1") {
                    checkIdCardNo = arr[i].split('|')[1];   //变更前的身份证
                }
            }
        }
        var reg = /^[\da-zA-Z]{5,}$/;
        if (checkIdCardNo && checkIdCardNo.length == 18 && reg.test(checkIdCardNo)) {
            var birthday = checkIdCardNo.substring(6, 10) + "-" + checkIdCardNo.substring(10, 12) + "-" + checkIdCardNo.substring(12, 14);
            if (birthday != $('#txt_birth')[0].value) {
                C.Validate.setFailureMessage('#txt_birth', birthWords);
                return false;
            }
            var sexnumber = checkIdCardNo.substring(16, 17);
            if (sexnumber == '1' || sexnumber == '3' || sexnumber == '5' || sexnumber == '7' || sexnumber == '9') {
                if ($('input:radio[name=sex]')[0].checked != true) {
                    C.Validate.setFailureMessage('#sexunknow', genderWords);
                    return false;
                }
            } else {
                if ($('input:radio[name=sex]')[1].checked != true) {
                    C.Validate.setFailureMessage('#sexunknow', genderWords);
                    return false;
                }
            }
        }

        return true;
    }

    function checkMobile(obj, regs, words) {  //验证手机
        if ($(obj).value().trim() == $(obj).attr("mobile")) {
            return true;
        }
        return C.Validate.checkRegex(obj, regs, words);
    }

    function checkEmail(obj, regs, words) {  //验证邮箱
        if ($(obj).value().trim() == $(obj).attr("email")) {
            return true;
        }
        return C.Validate.checkRegex(obj, regs, words);
    }

    function checkNameF(first, last) {//英文名必须包含完整的firstname和lastname
        var f = passengerErrorText;
        if ((!first && last) || (first && !last)) {
            C.Validate.setFailureMessage('#lbl_nameF', f.Name.F.Full);
            return false;
        }
        return true;
    }
    function checkBirth() {
        var tmp0 = $('#txt_birth').value().split('-');
        var birth = new Date(tmp0[0], tmp0[1] - 1, tmp0[2]);
        var tmp1 = getServerDate().now.split('-');
        var now = new Date(tmp1[0], tmp1[1] - 1, tmp1[2]);
        var f = passengerErrorText;
        if (birth > now) {
            C.Validate.setFailureMessage('#txt_birth', f.BirthDay);
            return false;
        }
        return true;
    }
    function getGender() {
        var v = '';
        $('input:radio[name=sex]').each(function (n) {
            if ($(n)[0].checked) {
                v = $(n).value();
            }
        });
        return v;
    }
    function savePassenger() {
        var t = passengerNoticeText;
        var fx = C.Others.fixNoticeValue;
        //去middlename
        var enfirst = "", enmiddle = "", enf_m = "";
        enf_m = fx('#txt_firstname', t.FisrtName);
//        if (enf_m.indexOf(' ') >= 0) {
//            enfirst = enf_m.substr(0, enf_m.indexOf(' '));
//            enmiddle = enf_m.substr(enf_m.indexOf(' ') + 1, enf_m.length - (enf_m.indexOf(' ') + 1));
//        } else {
        enfirst = enf_m;
//        }
        var passenger = { 'InfoID': passenger_infoid, 'NameCN': fx("#txt_namecn", t.NameCN),
            'NameENLastName': fx('#txt_lastname', t.LastName), 'NameENFirstName': enfirst, 'NameENMiddleName': enmiddle,
            'Nationality': $('#txt_countryid').value(), 'Gender': getGender(), 'Birthday': fx('#txt_birth', t.Day), 'BirthPlace': $('#txt_address').value().trim(),
            'MobilePhone': fx('#txt_mobile', t.Mobie.L), 'MobilePhoneForeign': fx('#txt_mobileF', t.Mobie.F), 'CountryCodeForeign': $('#txt_mobileFcountry').attr('code'),
            'ContactTel': fx("#txt_contel_zone", t.Phone.Area) + '-' + fx("#txt_contel_phone", t.Phone.Phone) + '-' + fx("#txt_contel_end", t.Phone.End),
            'ContactFax': fx("#txt_confax_zone", t.Phone.Area) + '-' + fx("#txt_confax_phone", t.Phone.Phone) + '-' + fx("#txt_confax_end", t.Phone.End),
            'ContractEmail': $('#txt_email').value().trim(), 'Cards': '', 'FFPs': '', 'IsSelf': ($('#chkIsSelf')[0].checked == true ? "1" : "")
        };

        //        var passenger = { 'InfoID': passenger_infoid, 'NameCN': fx("#txt_namecn", t.NameCN),
        //            'NameENLastName': fx('#txt_lastname', t.LastName), 'NameENFirstName': fx('#txt_firstname', t.FisrtName), 'NameENMiddleName': fx('#txt_middlename', t.MiddleName),
        //            'Nationality': $('#txt_countryid').value(), 'Gender': getGender(), 'Birthday': fx('#txt_birth', t.Day), 'BirthPlace': $('#txt_address').value().trim(),
        //            'MobilePhone': fx('#txt_mobile', t.Mobie.L), 'MobilePhoneForeign': fx('#txt_mobileF', t.Mobie.F),
        //            'ContactTel': fx("#txt_contel_zone", t.Phone.Area) + '-' + fx("#txt_contel_phone", t.Phone.Phone) + '*' + fx("#txt_contel_end", t.Phone.End),
        //            'ContactFax': fx("#txt_confax_zone", t.Phone.Area) + '-' + fx("#txt_confax_phone", t.Phone.Phone) + '*' + fx("#txt_confax_end", t.Phone.End),
        //            'ContractEmail': $('#txt_email').value().trim(), 'Cards': '', 'FFPs': ''
        //        };
        passenger.Cards = PassengerCards.getValues();
        passenger.FFPs = PassengerFFPs.getValues();
        var contextdata = {
            id: passenger.InfoID, ncn: passenger.NameCN, lnf: passenger.NameENLastName, fnf: passenger.NameENFirstName,
            mnf: passenger.NameENMiddleName, nat: passenger.Nationality, gd: passenger.Gender, bd: passenger.Birthday,
            bp: passenger.BirthPlace, mp: passenger.MobilePhone, mpf: passenger.MobilePhoneForeign, ccf: passenger.CountryCodeForeign, cont: passenger.ContactTel,
            conf: passenger.ContactFax, ml: passenger.ContractEmail, cards: passenger.Cards, ffps: passenger.FFPs, Save_Guid: passenger_Save_Guid, isself: passenger.IsSelf
        };
        var url = '../Ajax/SavePassengerInfo.ashx';
        C.Ajax.ajaxRequest(url, { context: contextdata }, {
            success: function (dataStr) {
                if (dataStr != '' && dataStr.substr(0, 1) == 'T') {
                    var b = dataStr.indexOf(',');
                    var infoId = dataStr.substr(1, b - 1);
                    var token = dataStr.substr(b + 1);
                    if (infoId != passenger.InfoID) {
                        $("#spanOperateSuccess").html("新增常用旅客成功！");
                        passenger_infoid = infoId;
                    }
                    else {
                        $("#spanOperateSuccess").html("修改常用旅客信息成功！");
                    }
                    passenger_Save_Guid = token;
                    $("#divOperateSuccess").mask();
                }
            }
        });
    }


    $("#closeWinDivOperateSuccess").bind("click", function () {
        $("#divOperateSuccess").unmask();
    });
    $("#btnOperateSuccess").bind("click", function () {
        $("#divOperateSuccess").unmask();
        window.location.href = "PassengerList.aspx";
    });

    function getUserName(passenger) {
        var name = passenger.NameCN;
        if (name == '') {
            name = passenger.NameENLastName + '/' + passenger.NameENFirstName;
            if (passenger.NameENMiddleName != '') {
                name += ' ' + passenger.NameENMiddleName;
            }
        }
        return name;
    }
    function getUserPhone(passenger) {
        var phone = passenger.MobilePhone;
        if (phone == '') {
            phone = passenger.MobilePhoneForeign;
        }
        if (phone != '' && phone.length > 3) {
            var p1 = phone.substr(0, 3) + '****';
            if (phone.length > 7) {
                p1 += phone.substr(7);
            }
            phone = p1;
        }
        return phone;
    }
    function getUserIDCard(passenger) {
        var card = { 'Type': '', 'No': '' };
        if (passenger.Cards != '') {
            var arr = passenger.Cards.split('@');
            for (var i = 0; i < arr.length; i++) {
                var tmp = arr[i].split('|');
                if (tmp.length >= 2 && card.Type == '') {
                    card.Type = tmp[0];
                    card.No = tmp[1];
                }
                if (tmp[0] == 1) {
                    card.Type = tmp[0];
                    card.No = tmp[1];
                    if (passenger.NameCN != '') {
                        break;
                    }
                }
                else if (tmp[0] == 2 && passenger.NameCN == '') {
                    card.Type = tmp[0];
                    card.No = tmp[1];
                    break;
                }
            }
        }
        var rp = 0;
        switch (card.Type) {
            case '1': rp = 6; break;
            case '2': rp = 3; break;
            default: break;
        }
        if (rp != 0 && card.No.length > rp) {
            var no = card.No;
            card.No = no.substr(0, rp);
            for (var j = 0; j < no.length - rp; j++) {
                card.No += '*';
            }
        }
        return card;
    }
    function setPassenger(passenger) {
        var ids = namecn = fname = mname = lname = nation = nationnm = gen = birthd = birthp = mobiel = mobief = mobilefc = mobilefcn = contel = confax = email = cards = ffps = isself = '';
        var p = passenger;
        if (passenger) {
            ids = p.InfoID;
            namecn = p.NameCN;
            lname = p.NameENLastName;
            fname = p.NameENFirstName;
            mname = p.NameENMiddleName;
            nation = p.Nationality;
            nationnm = p.UpdateDate;
            gen = p.Gender;
            if (p.Birthday == null || p.Birthday == '0001-01-01' || p.Birthday == '1753-01-01') {
                p.Birthday = '';
            }
            birthd = p.Birthday;
            birthp = p.BirthPlace;
            mobiel = p.MobilePhone;
            //mobief = p.MobilePhoneHK == '' ? p.MobilePhoneForeign : p.MobilePhoneHK;
            mobief = p.MobilePhoneForeign;
            mobilefc = p.CountryCodeForeign;
            mobilefcn = p.CountryCodeForeignCn;

            contel = p.ContactTel;
            confax = p.ContactFax;
            email = p.ContractEmail;
            cards = p.Cards;
            ffps = p.FFPs;
            //全局变量
            certListStr = passenger.CertListStr;

            isself = p.IsSelf;
        }
        var t = $("#lbl_Title");
        t.attr('did', ids);
        t.html(ids != '' ? tbodyText[0] : tbodyText[2]);
        var c = C.Others.setNoticeInput;
        c('#txt_namecn', namecn);
        c('#txt_lastname', lname);
        //去掉middle格子，内容+空格放入first
        if (mname != "") {
            fname = fname + " " + mname;
        }
        c('#txt_firstname', fname);
        //c('#txt_middlename', mname);
        //本尊
        if ("1" == isself) {
            $('#chkIsSelf')[0].checked = true;
        }

        c('#txt_country', nationnm);
        $('#txt_countryid').value(nation);
        //性别追加未知U
        var gindex;
        if (gen == 'M') {
            gindex = 0;
        } else if (gen == 'F') {
            gindex = 1;
        } else {
            gindex = 2;
        }
        $('input:radio[name=sex]').each(function (n, i) {
            $(n)[0].checked = gindex == i;
        });
        c('#txt_birth', birthd);
        $('#txt_address').value(birthp);
        c('#txt_mobile', mobiel);
        $('#txt_mobile').attr("mobile", mobiel);
        //海外国家码
        if (mobilefcn && mobilefcn != "") {
            c('#txt_mobileFcountry', mobilefcn + " " + mobilefc);
            $('#txt_mobileFcountry').attr("code", mobilefc);
        } else if (passenger) {
            c('#txt_mobileFcountry', "");
            $('#txt_mobileFcountry').attr("code", "");
        } else {
            c('#txt_mobileFcountry', "中国香港 852");
            $('#txt_mobileFcountry').attr("code", "852");
        }

        c('#txt_mobileF', mobief);
        $('#txt_mobileF').attr("mobile", mobief);
        var p = getConPhone(contel);
        c('#txt_contel_zone', p.area);
        c('#txt_contel_phone', p.phone);
        c('#txt_contel_end', p.end);
        p = getConPhone(confax);
        c('#txt_confax_zone', p.area);
        c('#txt_confax_phone', p.phone);
        c('#txt_confax_end', p.end);
        $('#txt_email').value(email);
        $('#txt_email').attr("email", email);
        PassengerCards.setValues(cards);
        PassengerFFPs.setValues(ffps);


        if (passenger) {
            //设定头部认证A/B提示
            if ("A" == passenger.CertLevelForTip) {
                $('.tips-warn').html("<span class='ico_tips16'></span>此旅客信息已通过校验，无需修改姓名和身份证号码。");
                $('.tips-warn')[0].style.display = 'block';
            } else if ("B" == passenger.CertLevelForTip) {
                $('.tips-warn').html("<span class='ico_tips16'></span>此旅客曾使用现有信息成功出行，您的修改有可能影响其今后出行。");
                $('.tips-warn')[0].style.display = 'block';
            }
            //依照认证数据封闭姓名输入框
            if (passenger.CertListStr && passenger.CertListStr.indexOf("|") > -1) {
                var certinfos = passenger.CertListStr.split('@');
                for (var i = 0; i < certinfos.length; i++) {
                    if ("A" == certinfos[i].split('|')[2]) {
                        if ("" != certinfos[i].split('|')[3]) {
                            //中文名
                            $('#txt_namecn').attr("disabled", true);
                        }
                        if ("" != certinfos[i].split('|')[4]) {
                            //英文LAST
                            $('#txt_lastname').attr("disabled", true);
                        }
                        if ("" != certinfos[i].split('|')[5] || "" != certinfos[i].split('|')[6]) {
                            //英文FIRST/MIDDLE
                            $('#txt_firstname').attr("disabled", true);
                        }
                        //依照认证数据封闭证件号输入框
                        if ($('.vam').attr('sv') == certinfos[i].split('|')[0]) {
                            $('.ipt_card_no').attr("disabled", true);
                        }
                    }
                }
            }
        }
    }
    function getConPhone(phone) {
        var p = { 'area': '', 'phone': '', 'end': '' };
        if (phone != null && phone != '') {
            //phone = phone.replace(/\*/g, '-');
            var arr = phone.split('-');
            if (arr.length > 1) {
                p.area = arr[0];
                p.phone = arr[1];
                if (arr.length > 2) {
                    p.end = arr[2];
                }
            }
        }
        return p;
    }
});
var needHideCountryCode = false;
function CountryCodeBlur() {
    if (needHideCountryCode == true) {
        HideCountryCodeUI();
    }
}
function HideCountryCodeUI() {
    $('#cc_area').attr("style", "left:136px; position: absolute; z-index: 1000; top:31px;display:none");
}
function ShowCountryCodeUI() {
    if ($('#cc_area').hasClass('has-area-country') == true) {
        $('#cc_area').attr("style", "left:136px; position: absolute; z-index: 1000; top:31px;display:block");
    } else {
        $('#cc_area').attr("style", "left:136px; position: absolute; z-index: 1000; top:31px;display:block");
    }

}
