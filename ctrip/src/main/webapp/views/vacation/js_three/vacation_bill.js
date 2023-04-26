var layer;
layui.use(['layer'],function () {
    layer=layui.layer;
})
$(function () {
    //sessionStorage.removeItem("order");
    $("#J_promotion").hide();
    //$(".book_product_content").hide();
    //点击支付
    /*$(".btn_proess_big").click(function(){
        location.href="payment.html"
    })*/
    showBillTable();
})
$(".book_detail").click(function () {
    if($(this).text()=="隐藏明细"){
        $(".depart_detail").next().hide();
        $(this).html("展开明细<i class=\"up\"></i>");
    }else{
        $(".depart_detail").next().show();
        $(this).html("隐藏明细<i class=\"close\"></i>");
    }
});
$(".price_detail_box").click(function () {
    if($(this).text()=="收起明细"){
        $(".hidden_width").hide();
        $(this).html("查看明细<i class=\"open\"></i>");
    }else{
        $(".hidden_width").show();
        $(this).html("收起明细<i class=\"close\"></i>");
    }
});



//渲染订单填写表格
var count=0;
var index=4;
function showBillTable() {
    //渲染产品信息
    $(".book_product h2").text(sessionStorage.getItem("subHead"));
    $(".depart_detail").append($("<span>出发日期："+sessionStorage.getItem("startTime")+"</span>"));
    //渲染成人数
    if(sessionStorage.getItem("adultNum")!=null && sessionStorage.getItem("adultNum")!="0"){
        $(".depart_detail").append($("<span>"+sessionStorage.getItem("adultNum")+"成人</span>"));
    };
    //渲染儿童数
    if(sessionStorage.getItem("childrenNum")!=null && sessionStorage.getItem("childrenNum")!="0"){
        $(".depart_detail").append($("<span>"+sessionStorage.getItem("adultNum")+"儿童</span>"));
    }
    //日程：例5日游
    if(sessionStorage.getItem("daysTrip")){
        $(".book_table_list tbody tr td:eq(1) span").text(sessionStorage.getItem("daysTrip")+"日游套餐");
    }
    //订单价格
    if(sessionStorage.getItem("totalPrice")!=null){
        $(".price_detail,.price_number strong").html("<dfn>¥</dfn>"+sessionStorage.getItem("totalPrice"));
    }

    //成人
    if(sessionStorage.getItem("adultNum")!=null && sessionStorage.getItem("adultNum")!="0"){
        $(".box_hidden").append($("<dd><span class='price_item' title='成人'>成人</span>" +
            "<span class='price_detail'><dfn>¥</dfn>"+sessionStorage.getItem("price")+"/人x"+
            sessionStorage.getItem("adultNum")+"</span></span></dd>"));

        //创建旅客信息填写框
        var $template=$(".product_input:eq(3)");
        $(".product_input:eq(3)").remove();
        console.log("开始append成人旅客");
        appendProductInput($template,parseInt(sessionStorage.getItem("adultNum")),"成人");
    }
    //是否含儿童
    if(sessionStorage.getItem("childrenNum")!=null && sessionStorage.getItem("childrenNum")!="0"){
        console.log("开始append儿童旅客");
        //渲染右侧
        $(".box_hidden").append($("<dd><span class='price_item' title='儿童'>儿童</span>" +
            "<span class='price_detail'><dfn>¥</dfn>"+parseInt(sessionStorage.getItem("price"))/2+"/人x"+
            sessionStorage.getItem("childrenNum")+"</span></span></dd>"));

        var $template=$(".product_input:eq(3)");
        if(sessionStorage.getItem("adultNum")==null || sessionStorage.getItem("adultNum")=="0"){
            count=0;
            index=4;
            console.log("该订单没有成人旅客");
            $(".product_input:eq(3)").remove();
        }
        appendProductInput($template,parseInt(sessionStorage.getItem("childrenNum")),"儿童");
    }
    verifyInfo();
    //点击取消保存或保存
    $(".save_wrap a:eq(0)").click(function () {
        if($(this).attr("class")=="save selected"){
            $(this).removeClass("selected");
        }else{
            $(this).addClass("selected");
        }

    }).next().click(function () {
        $(this).parent().prev().find("li input").val("").attr("class","input_m");
    })
    var now=new Date();
    $(".tips-list p:last").html("<span class='ico_warning'></span>现在完成预订，订单预计会在"+now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日 "+now.getHours()+":"+now.getMinutes()+"确认结果");
}

/**
 * 更新input的data-container
 * @param obj
 * @param index
 */
function appendProductInput(obj,num,type) {
    console.log("index="+index+"count="+count+"num="+num);
    for (var i = 1; i <=num ; i++) {
        var $clone=obj.clone();
        count++;
        $clone.find("h4 div:eq(0)").text("旅客"+count);
        console.log("append第"+count+"旅客");
        if(type=="儿童"){
            $clone.find("h4 div:eq(1) span").attr("class","child");
            $clone.find("h4 div:eq(1)").append("<i class=\"ico_notice\" data-role=\"jmp\" title=\"1.2米以下儿童只含大交通和导游服务费用，1.2米以上同成人下单 \" data-params=\"{&quot;options&quot;:{&quot;type&quot;:&quot;jmp_title&quot;,&quot;classNames&quot;:{&quot;boxType&quot;:&quot;jmp_title&quot;},&quot;template&quot;:&quot;#jmp_pkg_title&quot;,&quot;content&quot;:{&quot;txt0&quot;:&quot;1.2米以下儿童只含大交通和导游服务费用，1.2米以上同成人下单&quot;},&quot;css&quot;:{&quot;maxWidth&quot;:&quot;300&quot;,&quot;minWidth&quot;:&quot;240&quot;},&quot;alignTo&quot;:&quot;cursor&quot;,&quot;showArrow&quot;:false}}\"></i>\n")
        }
        $clone.find("h4 div:eq(1) span").text(type);
        $clone.find("input[data-message='请填写中文姓名']").attr({"data-container":"uid-"+index,"data-index":count-1});
        index+=2;
        $clone.find("input[data-message='请填写身份证号码']").attr({"data-container":"uid-"+index,"data-index":count-1});
        index+=4;
        $clone.find("input[data-message='请至少输入一位出行旅客的手机号码']").attr({"data-container":"uid-"+index,"data-index":count});
        $(".input_info:eq(2) .reserve_limited").before($clone);
        index+=1;
    }
    $(".explain").hover(function () {
        $("#test01").show();
    })
}

//验证电话号码
function checkPhone(phone){
    if(!(/^1[3456789]\d{9}$/.test(phone))){
        return false;
    }
    return true;
}
//验证邮箱
function checkMailAddress(mailAddress) {
    if(!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/).test(mailAddress)){
        return false;
    }
    return true;
}
//验证中文姓名
function checkChineseName(name) {
    if(!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(name)){
        return false;
    }
    return true;
}

/**
 * 身份证校验算法
 */
function SFID(card) {

    var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
        21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
        33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
        42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
        51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
        63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
    };
//检查号码是否符合规范，包括长度，类型
    var isCardNo = function(card) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if(reg.test(card) === false)
        {
            return false;
        }
        return true;
    };
//取身份证前两位,校验省份
    var checkProvince = function(card)
    {
        var province = card.substr(0,2);
        if(vcity[province] == undefined)
        {
            return false;
        }
        return true;
    };
//检查生日是否正确
    var checkBirthday = function(card)
    {
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if(len == '15')
        {
            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
            var arr_data = card.match(re_fifteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date('19'+year+'/'+month+'/'+day);
            return verifyBirthday('19'+year,month,day,birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if(len == '18')
        {
            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            var arr_data = card.match(re_eighteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date(year+'/'+month+'/'+day);
            return verifyBirthday(year,month,day,birthday);
        }
        return false;
    };
//校验日期
    var verifyBirthday = function(year,month,day,birthday)
    {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
        {
            //判断年份的范围（3岁到100岁之间)
            var time = now_year - year;
            if(time >= 3 && time <= 100)
            {
                return true;
            }
            return false;
        }
        return false;
    };
//校验位的检测
    var checkParity = function(card)
    {
        //15位转18位
        card = changeFivteenToEighteen(card);
        var len = card.length;
        if(len == '18')
        {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i, valnum;
            for(i = 0; i < 17; i ++)
            {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[cardTemp % 11];
            if (valnum == card.substr(17, 1))
            {
                return true;
            }
            return false;
        }
        return false;
    };
//15位转18位身份证号
    var changeFivteenToEighteen = function(card)
    {
        if(card.length == '15')
        {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i;
            card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
            for(i = 0; i < 17; i ++)
            {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            card += arrCh[cardTemp % 11];
            return card;
        }
        return card;
    };

    //是否为空
    if(card === '')
    {
        // mui.alert('请输入身份证号，身份证号不能为空');
        return false;
    }
    //校验长度，类型
    if(isCardNo(card) === false)
    {
        //  mui.alert('您输入的身份证号码不正确，请重新输入');
        return false;
    }
    //检查省份
    if(checkProvince(card) === false)
    {
        //  mui.alert('您输入的身份证号码不正确,请重新输入');
        return false;
    }
    //校验生日
    if(checkBirthday(card) === false)
    {
        //  mui.alert('您输入的身份证号码生日不正确,请重新输入');
        return false;
    }
    //检验位的检测
    if(checkParity(card) === false)
    {
        //  mui.alert('您的身份证校验位不正确,请重新输入');
        return false;
    }
//    console.info("OK");
    return true;
};

//验证联系人名字
$("[name='ContactName']").focus(function () {
    $(this).next().remove();
    if ($(this).hasClass("input_error")){
        $(this).removeClass("input_error");
    }
    $(this).addClass("isFocus");
}).blur(function () {
    checkContactName("[name='ContactName']");
}).bind("input propertychange",function(event){
    $(this).attr("value",$(this).val());
});
//验证联系人电话
$("[name='Mobile']").focus(function () {
    if ($(this).hasClass("input_error")){
        $(this).removeClass("input_error");
    }
    $(this).addClass("isFocus");
}).blur(function () {
    //验证号码
    checkUsePhone("[placeholder='境内11位号码']",$(this).attr("data-index"));

}).bind("input propertychange",function(event){
    $(this).attr("value",$(this).val());
});

//验证联系人邮箱
$("[name='Email']").focus(function () {
    //$(this).next().remove();
    if ($(this).hasClass("input_error")){
        $(this).removeClass("input_error");
    }
    $(this).addClass("isFocus");
}).blur(function () {
    //验证邮箱
    checkUseMail("[name='Email']",$(this).attr("data-index"));

}).bind("input propertychange",function(event){
    $(this).attr("value",$(this).val());
});
//验证联系人的中文姓名，身份证号，至少一个联系方式
function verifyInfo() {
    $("[data-role='nameCN'],[data-message='请填写身份证号码'],[data-message='请至少输入一位出行旅客的手机号码']").focus(function () {
        if ($(this).hasClass("input_error")){
            $(this).removeClass("input_error");
        }
        $(this).addClass("isFocus");
    }).blur(function () {
        if($(this).hasClass("isFocus")){
            $(this).removeClass("isFocus");
        }
        //中文姓名
        if($(this).attr("data-role")=="nameCN"){
            checkPassengerName("[data-role='nameCN']",$(this).attr("data-index"));
        } else if($(this).attr("placeholder")=="证件号码"){
            //身份证号
            checkPassengerIDCard("[placeholder='证件号码']",$(this).attr("data-index"));
        }else{
            //电话号码
            checkUsePhone("[placeholder='境内11位号码']",$(this).attr("data-index"));
        }

    }).bind("input propertychange",function(event){
        $(this).attr("value",$(this).val());
    });
    if($(this).attr("data-valid")==true){
        addPassenger();
    }
}

//点击提交订单
$(".btn_proess_big").click(function () {
    //判断是否该订单已经提交
    var order=sessionStorage.getItem("order");
    if(order!=null){
        //跳转至支付界面
        layer.msg("即将跳转至支付界面",{icon:6,time:1000});
       setTimeout("window.location.href='payment.html'",2000);
    }else{
        //调用提交订单
        submitOrder(0);
    }
})

/**
 * 验证旅客的身份证号
 * @param attr
 * @param data_index
 * @returns {boolean}
 */
function checkPassengerIDCard(attr,data_index) {
    var result=false;
    if($(attr+":eq("+data_index+")").val()==null || $(attr+":eq("+data_index+")").val()==""){
        $(attr+":eq("+data_index+")").addClass("input_error");
        layer.msg("请填写身份证号码",{icon:0,time:1000});
        //$(attr+":eq("+data_index+")").after("<span class=\"input_error\">请填写身份证号码</span>")
        $(attr+":eq("+data_index+")").attr("value","");
    }else{
        var card=$(attr+":eq("+data_index+")").val();
        result=SFID(card);
        if(!result){
            $(attr+":eq("+data_index+")").addClass("input_error");
            layer.msg("请输入正确的身份证号码",{icon:2,time:1000});
            //$(attr+":eq("+data_index+")").after("<span class=\"input_error\">请输入正确的身份证号码</span>");
            $(attr+":eq("+data_index+")").attr("value","");
        }
    }
    $(attr+":eq("+data_index+")").attr("data-valid",result);
    return result;
}
/**
 * 验证旅客中文姓名
 * @param attr
 * @returns {boolean}
 */
function checkPassengerName(attr,data_index) {
    var result=false;
    if($(attr+":eq("+data_index+")").val()==null || $(attr+":eq("+data_index+")").val()==""){
        $(attr+":eq("+data_index+")").addClass("input_error");
        $(attr+":eq("+data_index+")").attr("value","");
        layer.msg("姓名不能为空",{icon:0,time:1000});
    }else{
        var nameCN=$(attr+":eq("+data_index+")").val();
       result=checkChineseName(nameCN);
        if(!result){
            $(attr+":eq("+data_index+")").addClass("input_error");
            $(attr+":eq("+data_index+")").attr("value","");
            layer.msg("请输入正确的中文名",{icon:2,time:1000});
        }
    }
    $(attr+":eq("+data_index+")").attr("data-valid",result);
    return result;
}

/**
 * 验证输入框里数据，并提交订单
 */
function submitOrder(flag) {
    if($("[name='ContactName']").attr("data-valid")=="false" || $("[name='Mobile']").attr("data-valid")=="false"){
        alert("信息不完整，不能提交订单,请检查！");
        return false;
    }
    console.log("联系人信息通过");
    //旅客中文名字输入框
    var nameCNIsSubmit=$("[data-role='nameCN']");
    for (var i = 0; i <nameCNIsSubmit.length ; i++) {
        if($(nameCNIsSubmit[i]).attr("data-valid")=="false"){
            layer.msg("请检查旅客姓名",{icon:0,time:1000})
            return false;
        }
    }
    console.log("旅客中文名字通过");
    //身份证输入框
    var IDCardIsSubmit=$("[placeholder='证件号码']");
    for (var i = 0; i < IDCardIsSubmit.length; i++) {
        if($(IDCardIsSubmit[i]).attr("data-valid")=="false"){
            layer.msg("请检查旅客身份证号码",{icon:0,time:1000});
            return false;
        }
        var value=$(IDCardIsSubmit[i]).val();
        for (var j = 0; j <IDCardIsSubmit.length; j++) {
            console.log("进入内层循环");
            if(i==j){
                continue;
            }
            if($(IDCardIsSubmit[j]).val().indexOf(value)>-1){
                console.log("有相同的身份证号")
                layer.open({
                    title: '信息提示'
                    ,content: $(IDCardIsSubmit[i]).parent().prev().find("input").val()+'、'+$(IDCardIsSubmit[j]).parent().prev().find("input").val()+'相同：身份证：'+$(IDCardIsSubmit[i]).val()
                });
                return false;
            }
        }
    }
    console.log("旅客身份证通过");
    //电话号码输入框
    var phoneIsSubmit=$("[placeholder='境内11位号码']:gt(0)");
    for (var i = 0; i <phoneIsSubmit.length ; i++) {
        if($(phoneIsSubmit[i]).attr("data-valid")=="true"){
            break;
        }else{
            layer.msg("请至少输入一位出行旅客的手机号码",{icon:0,time:1000})
            return false;
        }

    }
    console.log("旅客联系方式通过");
    //layer.msg("可以提交订单",{icon:6,time:1000});
    //有关订单的一些参数
    var startDate = sessionStorage.getItem("startTime");
    var day = new Date(new Date(startDate).getTime() + parseInt(sessionStorage.getItem("daysTrip")) * 24 * 60 * 60 * 1000);
    var endDate = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
    //成人数
    var adultNum = sessionStorage.getItem("adultNum") == null ? "0" : sessionStorage.getItem("adultNum") == "0" ? "0" : sessionStorage.getItem("adultNum");
    //儿童数
    var childNum = sessionStorage.getItem("childNum") == null ? "0" : sessionStorage.getItem("childNum") == "0" ? "0" : sessionStorage.getItem("childNum");
    /*var order ={
        travelProId: sessionStorage.getItem("productId"),
        travelProTitle: sessionStorage.getItem("subHead"),
        travelProTheme: "跟团游",
        totalPrice: sessionStorage.getItem("totalPrice"),
        orderStatus: 1,
        payType: 1,
        orginName: decodeURI(sessionStorage.getItem("departCityName")),
        startDate: sessionStorage.getItem("startTime"),
        endDate: endDate,
        adultNum: adultNum,
        childNum: childNum,
        moreRequirements: "没有",
        hasInvoice: 1,
        userId: 0
            };*/
    //console.log(order);
    var email=$("[name='Email']").val() == "" ? null: $("[name='Mobile']").val();
    var userContact ={
        "name": $("[name='ContactName']").val(),
        "phone": $("[name='Mobile']").val(),
        "email":email ,
        "userId": 0
    };
    console.log(userContact);
    //总人数
    var passengerNum = parseInt(adultNum) + parseInt(childNum);
    //获得所有旅客json数据
    var userPassengerList = userPassengerListJson(passengerNum);
    //拼接成一个完整订单的json数据
    /*var orderAndPassenger = {
                                "travelProId": sessionStorage.getItem("productId"),
                                "travelProTitle": sessionStorage.getItem("subHead"),
                                "travelProTheme": "跟团游",
                                "totalPrice": sessionStorage.getItem("totalPrice"),
                                "orderStatus": 1,
                                "payType": 1,
                                "orginName": decodeURI(sessionStorage.getItem("departCityName")),
                                "startDate": sessionStorage.getItem("startTime"),
                                "endDate": endDate,
                                "adultNum": adultNum,
                                "childNum": childNum,
                                "moreRequirements": "没有",
                                "hasInvoice": 1,
                                "userId": 0,
                                "userPassengerList":userPassengerList,
                                "userContact":userContact
                            };*/
    var orderAndContact = {
        "travelProId": sessionStorage.getItem("productId"),
        "travelProTitle": sessionStorage.getItem("subHead"),
        "travelProTheme": "跟团游",
        "totalPrice": sessionStorage.getItem("totalPrice"),
        "orderStatus": 9,//9为订单未提交，即没有进入支付页面
        "payType": 1,
        "orginName": decodeURI(sessionStorage.getItem("departCityName")),
        "startDate": sessionStorage.getItem("startTime"),
        "endDate": endDate,
        "adultNum": adultNum,
        "childNum": childNum,
        "moreRequirements": "没有",
        "hasInvoice": 1,
        "userId": 1,
        "userContact.name": $("[name='ContactName']").val(),
        "userContact.phone": $("[name='Mobile']").val(),
        "userContact.email":email ,
        "userContact.userId": 1,
    };
    //orderAndPassenger=JSON.stringify(orderAndPassenger);
    //orderAndPassenger=orderAndPassenger.substring(0,orderAndPassenger.length-1)+","+userPassengerList.substring(0,userPassengerList.length-1)+"}";
    console.log(orderAndContact);
    $.ajax({
        url:"/travelOrder/addTravelOrder",
        type:"get",
        data: orderAndContact,
        datatype:"json",
        success:function(data) {
            if(data.result){
                for (var i = 0; i <userPassengerList.length ; i++) {
                    commonAjax("/travelOrder/addUserPassenger","get",userPassengerList[i],"json",function (data) {
                        if(data.result){
                                commonAjax("/travelOrder/getOrderByTime","get",{"userId":1},"json",function (data) {
                                    if(data.result){
                                        sessionStorage.setItem("order",JSON.stringify(data.data));
                                        console.log("订单为："+sessionStorage.getItem("order"));
                                        $(".progress_bar li:last").addClass("complete");
                                        if(flag==1){
                                            showOrder();
                                        }else{
                                            //跳转至支付界面
                                            layer.msg("即将跳转至支付界面",{icon:6,time:1000});
                                            setTimeout("window.location.href='payment.html'",2000);
                                        }
                                        return true;
                                    }
                                })
                        }
                    })
                }
            }else{
                layer.msg("添加订单失败",{icon:5,time:1000});
            }
        }

    })
}

/**
 * 验证联系人名
 * @param attr
 * @returns {boolean}
 */
function checkContactName(attr) {
    var result=false;
    if($(attr).hasClass("isFocus")){
        $(attr).removeClass("isFocus");
    }
    if($(attr).val()==null || $(attr).val()==""){
        $(attr).addClass("input_error");
        layer.msg("请填写姓名",{icon:0,time:1000});
        //$(attr).after("<span class=\"input_error\">请填写姓名</span>")
        $(attr).attr("value","");
    }else{
        result=true;
    }
    $("[name='ContactName']").attr("data-valid",result);
    return result;
}

/**
 * 验证旅客和联系人的电话号码
 * @param attr
 * @param data_index
 * @returns {boolean}
 */
function checkUsePhone(attr,data_index) {
    var result=false;
    if($(attr+":eq("+data_index+")").hasClass("isFocus")){
        $(attr+":eq("+data_index+")").removeClass("isFocus");
    }
    if($(attr+":eq("+data_index+")").val()==null || $(attr+":eq("+data_index+")").val()==""){
        $(attr+":eq("+data_index+")").addClass("input_error");
        if(data_index==0){
            layer.msg("请填写手机号码",{icon:0,time:1000});
            //$(attr+":eq("+data_index+")").after("<span class=\"input_error\">请填写手机号码</span>");
        }else{
            layer.msg("请至少输入一位出行旅客的手机号码",{icon:0,time:1000});
            //$(attr+":eq("+data_index+")").after("<span class=\"input_error\">请至少输入一位出行旅客的手机号码</span>");
        }
        $(attr+":eq("+data_index+")").val("");
    }else{
        var phone=$(attr+":eq("+data_index+")").val();
        if(!checkPhone(phone)){
            $(attr+":eq("+data_index+")").addClass("input_error");
            layer.msg("您填写的手机号码有误，请重新填写",{icon:2,time:1000});
            //$(attr+":eq("+data_index+")").after("<span class=\"input_error\">您填写的手机号码有误，请重新填写</span>");
            $(attr+":eq("+data_index+")").attr("value","");
        }
        result=checkPhone(phone);
    }
    $(attr+":eq("+data_index+")").attr("data-valid",result);
    return result;
}

/**
 * 验证联系人输入的邮箱
 * @param attr
 * @param data_index
 * @returns {boolean}
 */
function checkUseMail(attr,data_index) {
    var result=false;
    if($(attr+":eq("+data_index+")").hasClass("isFocus")){
        $(attr+":eq("+data_index+")").removeClass("isFocus");
    }
    if($(attr+":eq("+data_index+")").val()==null || $(attr+":eq("+data_index+")").val()==""){
        //$(this).addClass("input_error");
        layer.msg("请填写电子邮箱",{icon:0,time:1000});
        $(attr+":eq("+data_index+")").after("<span style='background-color: #f7f4f4'>请填写电子邮箱</span>")
        $(attr+":eq("+data_index+")").attr("value","");
    }else{
        var email=$(attr+":eq("+data_index+")").val();
        if(!checkMailAddress(email)){
            $(attr+":eq("+data_index+")").addClass("input_error");
            layer.msg("请输入正确的电子邮箱",{icon:2,time:1000});
            //$(attr+":eq("+data_index+")").after("<span class=\"input_error\">请输入正确的电子邮箱</span>");
            $(attr+":eq("+data_index+")").attr("value","");
        }
        result=checkMailAddress(email);
    }
    $(attr+":eq("+data_index+")").attr("data-valid",result);
    return result;
}

//拼接旅客数据json
function userPassengerListJson(count) {
    var passengerList=[];
    for (var i = 1; i <=count ; i++) {
        //身份证号
        var userCard=$(".input_box:eq("+(i+1)+")").find("[placeholder='证件号码']").val();
        var userPassenger=new Object();
        userPassenger.name=$(".input_box:eq("+(i+1)+")").find("[data-role='nameCN']").val();
        userPassenger.certificateType=1;
        userPassenger.certificateNumber=userCard;
        userPassenger.birthday=userCard.substring(6, 10) + "-" + userCard.substring(10, 12) + "-" + userCard.substring(12, 14);
        userPassenger.phone=$(".input_box:eq("+(i+1)+")").find("[placeholder='境内11位号码']").val();
        userPassenger.gender=parseInt(userCard.substr(16, 1))%2==1?1:2;
        userPassenger.userId=1;
        passengerList.push(userPassenger);
    }

    console.log("旅客信息："+JSON.stringify(passengerList));
    return passengerList;
}
$(".temporary_order").click(function () {
    var order=sessionStorage.getItem("order");
    if(order!=null){
        showOrder();
    }else{
        submitOrder(1);
    }
})
function showOrder() {
    layer.open({
        title: '信息提示'
        ,area: ['600px', '269px']
        ,content: '<div class="book_masking_padding"><div class="book_masking_content">' +
            '<i class="icon_yes"></i><h3>您的订单已成功暂存。暂存订单号为：'+JSON.parse(sessionStorage.getItem("order")).orderCode+'</h3><div>如需完成预订，请于7天内至“<span>' +
            '<a href="javascript:;">我的订单</a></span>”，对此订单号进行“继续预订”操作。' +
            '<br>暂存后超过7天的订单将自动删除。<br>注意：由于暂存订单不会保留航班、酒店等资源，价格也可能发生变化，请尽快提交，完成预定</div>' +
            '</div></div>'
    });
}
