var loginName = sessionStorage.getItem("loginName");//获取登录名
console.log("用户名" + loginName);

//获取该用户下的所有旅客信息
function getPassengerInfo(logName) {
    sendAjax("http://localhost:8080/user/getPassenger", {
        loginName: logName,
        name: ""
    }, "POST", "JSON", function (data) {
        console.log(data.data);
        var da = data.data;
        for (var i = 0; i < da.length; i++) {
            $('#newContact').append("<div class='date_box'  onclick='javascript:chContact(this)' id='conId" + i + "'>" +
                "<span class='date ellips' phone='" + da[i].phone + "' conName='" + da[i].name + "' indetity='" + da[i].certificateNumber + "' passengerId='" + da[i].id + "' contactId='" + da[i].contactId + "'>" + da[i].name + "</span>" +
                "<span class='triangle-right-bottom'><em class='f-tick triangle-cancel txt-scale'></em></span></div>");
            $("#contact").hide()
        }

    })
}

getPassengerInfo(loginName);

//获取该用户下的所有的联系人信息
function getContactInfo(logName) {
    sendAjax("http://localhost:8080/user/getContact", {
        name: "",
        loginName: logName
    }, "POST", "JSON", function (data) {
        var da = data.data;
        console.log(da);
        for (var i = 0; i < da.length; i++) {


            $('#Contact01').append("<div class='date_box'  id='" + da[i].id + "'>" +
                "<span class='date ellips' phone='" + da[i].phone + "' conname='" + da[i].name + "' indetity='43121' email='" + da[i].email + "' userId='" + da[i].userId + "' contactid='" + da[i].id + "'>" + da[i].name + "</span>" +
                "<span class='triangle-right-bottom'><em class='f-tick triangle-cancel txt-scale'></em></span></div>");
        }
        $("#Contact01>div:gt(0)").click(function () {
            $("#Contact01>div").attr("class", "date_box");
            $(this).attr("class", "date_box cur");
            var $span = $(this).find("span");
            $("[name='NameCN10']").val($span.html());
            $("[name='phone10']").val($span.attr("phone"));
            $("[name='CardNo10']").val($span.attr("email"));
        })

    })

};
getContactInfo(loginName);

//购票须知的显示隐藏
$("#ticket-booking-resinfo-18185396").click(function () {
    $("body").attr("style", "overflow:hidden");//滚动条停止
    $("#notice").show();
})
$("[class='f-close']").click(function () {
    $("body").attr("style", "");//滚动条停止
    $("#notice").hide();
    $("#insure").hide();
})
//保险的显示隐藏
$("[class='insurance-exp']").click(function () {
    $("#insure").show();
    $("body").attr("style", "overflow:hidden");//滚动条停止
})

//日历功能*********************************开始
//日历的显示
$("#cdate02").click(function () {
    $("#cdate").show();
})
$("[class='ttd-mask my-customer-modal-label']").click(function () {
    setTimeout(function () {
        $("#cdate").hide();
    }, 200)

})
//选择日期 日历上的点击事件
$("[class='g-calendar-date']>div").click(function () {

    //去除未选中的日期的样式
    $("[class='g-calendar-date']>div").each(function () {
        if (!$(this).attr("flag")) {
            $(this).attr("class", "g-calendar-date-item  ");
        }
    })

    //去除今天、明天的样式
    $("[class='item-date']>div:gt(0)").each(function () {
        $(this).attr("class", "date_box");
    })

    //不为过去的日期添加单击事件
    if (!$(this).attr("flag")) {
        //为当前选中的日期添加蓝色背景样式
        $(this).attr("class", "g-calendar-date-item  current")
        var index = $(this).index() + 1;//获取当前点击的div的下标

        var preDay = $("[class='item-date']:eq(0) > div:eq(3)").attr("date-num") + "";//获取日历前一天的日期
        preDay = preDay.split(",")[preDay.split(",").length - 1]
        //在今天后天的栏目上为对应的div添加样式
        $("[class='item-date'] > div:lt(5)").each(function () {
            var day = $(this).attr("date-num") + "";
            day = day.split(",")[day.split(",").length - 1];//获取今天、明天所在的天数

            if (preDay >= index) {//当所选的天数小于等于大后天的日期时为今天、后天添加样式
                if (day == index) {
                    $(this).attr("class", "date_box  cur");
                    $("#cdate02").find("span:eq(0)").html(parseInt(date.getMonth() + 1) + "月" + (parseInt(preDay) + 1) + "日");
                }
            } else {
                //当所选的天数大于大后天的天数时为日历添加样式,并修改其所在的时间
                $("#cdate02").attr("class", "date_box  cur");
                $("#cdate02").find("span:eq(0)").html(parseInt(date.getMonth() + 1) + "月" + index + "日");
                //修改其 date-num 属性为当前选中的 div 中的日期
                $("#cdate02").attr("date-num", date.getFullYear() + "," + parseInt(date.getMonth() + 1) + "," + index);

            }
        })
    }
    setTimeout(function () {
        $("#cdate").css({display: "none"});
    }, 200)
})


//昨天 今天 后天 明天 日历 默认样式的添加
var date = new Date();
//日历上已经过去的日期div变为灰色
$("[class='g-calendar-date']>div:lt(" + date.getDate() + ")").each(function (e) {
    $(this).attr("class", "g-calendar-date-item disable ");
    $(this).attr("flag", "false");
    $(this).find("span").html("");
})

//默认今天的票不能预订
$("[class='item-date'] div:eq(1)").attr("class", "date_box  cur");
$("[class='item-date'] > div:gt(1)").attr("class", "date_box");
//时间的显示
var i = 0;
var day = ["今天", "明天", "后天", "", ""];
var uParams = getRequestParams();
$("[class='item-date']:eq(0) > div").each(function () {
    if ($(this).index() == 0) {
        $(this).find("span").html(day[i] + parseInt(date.getMonth() + 1) + "月" + date.getDate() + "日<em>不可订</em>")
    } else {
        $(this).find("[class='date']").html(day[i] + parseInt(date.getMonth() + 1) + "月" + parseInt(date.getDate() + i) + "日");
        $(this).attr("date-num", date.getFullYear() + "," + parseInt(date.getMonth() + 1) + "," + parseInt(date.getDate() + i));
        $(this).find("[class='price']").html("<dfn>¥</dfn>" + uParams[3]);//价格
        $("#tPrict0").html(uParams[3]);//价格2.0
        $("#price02").html("￥" + uParams[3]);
    }
    i++;
})
//总金额上的票价
$("#tPrice").html(uParams[3]);
//日历上的价格
$("[class='price-info']>span").html("¥" + uParams[3]);
//票名的显示
$("[name='ticketType']").html(uParams[1]);
//总金额
$("[class='total-price']").html(uParams[3]);
//门票名称
$("[name='tTitle']").html(uParams[4]);


//今天、明天 点击时的样式切换获取日期
$("[class='item-date'] > div:gt(0):lt(3)").click(function () {
    $(this).attr("class", "date_box  cur");
    var index = $(this).index();
    $("[class='item-date'] > div").each(function () {//遍历每一个被点击的 div
        if ($(this).index() != index) {
            if ($(this).index() != 0) {
                $(this).attr("class", "date_box");
            }
        }
    })
    var days = $(this).attr("date-num").split(",")[2] - 1;//days 为今天明天、上的天数
    //当点击明天、后天、以及大后天时日历上的日期样式去除 ,
    $("#cdate02").attr("class", "date_box");
    //同时修改日历上的日期为大大大后天
    $("#cdate02").find("span:eq(0)").html(parseInt(date.getMonth() + 1) + "月" + parseInt(date.getDate() + 4) + "日");

    //修改其 date-num 属性为当前时间的大大大后天
    $("#cdate02").attr("date-num", date.getFullYear() + "," + parseInt(date.getMonth() + 1) + "," + parseInt(date.getDate() + 4));
    //同时在在日历上该日期所在的位置添加蓝色背景样式
    $("[class='g-calendar-date'] > div").each(function (e) {
        if (e == days) {//找到该日期在日历中的位置
            $(this).attr("class", "g-calendar-date-item  current")//添加蓝色背景样式
        } else {
            if ($(this).attr("class") != "g-calendar-date-item disable ") {//去除掉之前的样式
                $(this).attr("class", "g-calendar-date-item");
            }
        }
    })

})


//日历功能结束*****************************结束

var priceCount = 0;//总金额
var count = 1;//总数量

//添加票数
$("#ticket-booking-counter-1 span").click(function () {
    if ($(this).index() == 2) { //判断为点击加号
        if (count >= 10) {
            $("#tips").children().remove();
            $('#tips').append("<div class='toast' id='mincount'>" +
                "<i class='info'></i><span>最多购买" + count + "份</span></div>");
            $("#mincount").fadeToggle(5000);
        } else {
            count++;//总数量自增
            var num = $("#pager02>div").length + 1;
            console.log(num);
            //数量加一联系人就框+1
            $('#pager02').append("<div class='ticket_traveler tkt_hairline_t'  style='margin: 10px 30px;' onclick='javascript:addContact(this)'><label class='ticket_label'>" +
                "                                            <!-- react-text: 567 -->出行人" + num + "<!-- /react-text --><span class='required'>*</span></label>" +
                "                                            <div class='vertical-box traveler_list'><p class='vertical-item'><span class='g-info-box-item '><!-- react-text: 572 -->点击添加" +
                "                                                <!-- /react-text --><!-- react-text: 573 -->出行人<!-- /react-text -->" +
                "                                                </span></p></div>" +
                "                                            <span class='f-edit edit_item'></span>" +
                "                                        </div>");
        }

    } else if ($(this).index() == 0) { //判断为点击减号
        if (count <= 1) {
            $("#tips").children().remove();
            $('#tips').append("<div class='toast' id='mincount'>" +
                "<i class='info'></i><span>最少购买" + count + "份</span></div>");
            $("#mincount").fadeToggle(5000);


        } else {
            count--;//总数量自减
            var passengernum = $("#pager02>div:last").attr("passenger");
            $("#pager02>div:last").remove();//减少联系人框
            //同时移除$("#pager02") 与最后一个div对应的出行人的样式
            $("#newContact>div").each(function () {
                if ($(this).attr("id") == passengernum) {
                    $(this).attr("class", "date_box");
                }
            })
        }
    }

    if (count <= 1) {
        //总数小于1时不能自减，并且减号变为灰色
        $("#ticket-booking-counter-1 span:eq(0)").attr("class", "cm-adjust-minus js_num_minus disabled");
        //联系人框变默认
        $("#pager").show();
        $("#pager02").hide();
    } else {
        $("#pager").hide();
        $("#pager02").show();
        $("#ticket-booking-counter-1 span:eq(0)").attr("class", "cm-adjust-minus js_num_minus");

    }


    if (count >= 10) {
        //总数大于10时不能自加，并且加号变为灰色
        $("#ticket-booking-counter-1 span:eq(1)").attr("class", "cm-adjust-plus js_num_plus  disabled");
    } else {
        $("#ticket-booking-counter-1 span:eq(1)").attr("class", "cm-adjust-plus js_num_plus");
    }
    $("[class='cm-adjust-view js_cur_num ']").val(count);//将总数放入 input 中

    //统计票数计算价格
    $("#tNum").html(count);
    //计算总金额
    var totalPrice = count * uParams[3];
    $("[class='total-price']").html(totalPrice);

})

//单击出行人框添加出行人
function addContact(da) {
    $("#contact03").show();
    $("[class='f-close']").click(function () {
        $("#contact03").hide();
    })
    $("[name='cancel02']").click(function () {
        $("#contact03").hide();
    })
    var nResult03 = null;
    var pResult03 = null;
    var iResult03 = null;
    var conName03 = null;//联系人姓名
    var conphone03 = null;//联系人电话
    var identity03 = null;//身份证
//确认添加联系人
    $("[name='complete02']").click(function () {
        $("#contact03").hide();
        // 验证条件nResult03 == true && pResult03 == true && iResult03 == true
        if (true) {
            $('#newContact').append("<div class='date_box'  onclick='javascript:chContact(this)' id='conId" + $('#newContact>div').length + "'>" +
                "<span class='date ellips' phone='" + conphone + "' conName='" + conName + "' indetity='" + identity + "' passengerId='2' contactId='3'>" + conName + "</span>" +
                "<span class='triangle-right-bottom'><em class='f-tick triangle-cancel txt-scale'></em></span></div>");
            $("#contact").hide()
        } else {
            layer.msg("请填写完成")
        }
    })
//监听验证姓名
    $("[name='NameCN03']").bind("input propertychange", function (event) {

        nResult03 = isChinese($(this).val(), 2, 4);//验证名字格式
        if (nResult03 == true) {
            conName03 = $(this).val();
            $("#cName03").hide();
        } else {
            $("#cName03").show().html(nResult);
        }
    });
//监听验证电话号码
    $("[name='MobilePhone03']").bind("input propertychange", function (event) {
        pResult03 = isPhone($(this).val());//验证号码
        console.log(($(this).val()));
        console.log(pResult03);
        if (pResult03 == true) {
            conphone03 = $(this).val();
            $("#phone03").hide();
        } else {
            $("#phone03").show().html(pResult03);
        }
    })

//监听身份证号码
    $("[name='identityCard03']").bind("input propertychange", function (event) {
        iResult03 = IdentityCodeValid($(this).val());
        if (iResult03 == true) {//验证通过
            $("#identity03").hide();
            identity03 = $(this).val();
        } else {
            $("#identity03").show().html(iResult03);
        }

    })


}

//保险的添加
$("[class='insurance-price']").next().click(function () {
    var isBuy = false;//标志是否购买保险
    if ($(this).attr("class") == "f-radiobox2") {//如果点击的是有样式的 radio 怎说明不需要购买保险
        isBuy = true;
    }
    //去除之前选中的保险所在的span的样式
    $("[class='insurance-price']").next().attr("class", "f-radiocircle");
    if (isBuy) {
        var s = confirm("确认不买保险？");
        //不买保险则没有 radio 被选中
        if (!s) {
            $(this).attr("class", "f-radiobox2");
        }
    } else {
        $(this).attr("class", "f-radiobox2");
    }
})

//添加联系人*****************开始*
$("[class='f-close']").click(function () {
    $("#contact").hide()
})
$("#ticket-booking-change-traveler-layer").click(function () {
    $("#contact").show();
})
$("[name='cancel01']").click(function () {
    $("#contact").hide()
})
var nResult = null;
var pResult = null;
var iResult = null;
var conName = null;//联系人姓名
var conphone = null;//联系人电话
var identity = null;//身份证
//确认添加联系人
$("[name='complete01']").click(function () {

    // 验证条件nResult == true && pResult == true && iResult == true
    if (true) {
        $('#newContact').append("<div class='date_box'  onclick='javascript:chContact(this)' id='conId" + $('#newContact>div').length + "'>" +
            "<span class='date ellips' phone='" + conphone + "' conName='" + conName + "' indetity='" + identity + "' passengerId='2' contactId='3'>" + conName + "</span>" +
            "<span class='triangle-right-bottom'><em class='f-tick triangle-cancel txt-scale'></em></span></div>");
        $("#contact").hide()
    } else {
        layer.msg("请填写完成")
    }
})
//监听验证姓名
$("[name='NameCN']").bind("input propertychange", function (event) {
    nResult = isChinese($(this).val(), 2, 4);//验证名字格式
    if (nResult == true) {
        conName = $(this).val();
        $("#cName").hide();
    } else {
        $("#cName").show().html(nResult);
    }
});
//监听验证电话号码
$("[name='MobilePhone']").bind("input propertychange", function (event) {
    pResult = isPhone($(this).val());//验证号码
    if (pResult == true) {
        conphone = $(this).val();
        $("#phone").hide();
    } else {
        $("#phone").show().html(pResult);
    }
})

//监听身份证号码
$("[name='identityCard']").bind("input propertychange", function (event) {
    iResult = IdentityCodeValid($(this).val());
    if (iResult == true) {//验证通过
        $("#identity").hide();
        identity = $(this).val();
    } else {
        $("#identity").show().html(iResult);
    }

})

//点击联系人触发的事件
function chContact(da) {
    var le = $("#newContact div[class='date_box cur']").length;
    if (le < count) {//当有样式的 div 长度小于count时对有样式的div 取消样式，没有的就添加
        if ($(da).attr("class") == "date_box") {//判断该div是否有被选中样式
            $(da).attr("class", "date_box cur");
        } else {
            $(da).attr("class", "date_box");
        }
        //将选中人的信息填入到出行人中
        var name02 = $(da).find("span").attr("conName");//姓名
        $("[name=\"NameCN\"]").val(name02);

        $("#pager").attr("flag", $(da).attr("id"));//用作是否移除出行人模块的内容

        var phone02 = $(da).find("span").attr("phone");//电话
        $("[name='phone']").val(phone02);

        var indetity02 = $(da).find("span").attr("indetity");//身份证
        $("[name='CardNo']").val(indetity02);

        if ($(da).attr("class") == "date_box cur") {//当前按钮为选中时
            //遍历pager02下所有的子元素 div 找到第一个id为空的 div 为其添加内容
            $("#pager02>div").each(function () {
                if ($(this).attr("passenger") == null || $("#pager02>div").attr("passenger") == "") {//找到第一个id属性值为空的div
                    $(this).attr("passenger", $(da).attr("id"));//为该 div 添加id属性值
                    $(this).find("span:eq(1)").html("<p style='color:black'>姓名:" + name02 + "</p><p style='color:black'>手机:" + phone02 + "</p><p style='color:black'>身份证:" + indetity02 + "</p>");
                    return false
                }
            })
        } else {//当前按钮未选中时
            $("#pager02>div").each(function () {
                if ($(this).attr("passenger") == $(da).attr("id")) {//找到与该联系人相等的id的
                    $(this).removeAttr("passenger");//清空该 div 的passenger属性
                    $(this).find("span:eq(1)").html("<p class=\"vertical-item\"><span class=\"g-info-box-item \">点击添加出行人</span></p>");//清空该 div 的内容
                    return false
                }
            })

        }


    } else if (le == count) {
        if ($(da).attr("class") == "date_box") {//判断该div是否有被选中样式
            tips("最多只能添加" + count + "名出行人");
        }
        $(da).attr("class", "date_box");
    }
    //当当前按钮没有样式时清空出行人信息
    if ($(da).attr("class") == "date_box" && $("#pager").attr("flag") == $(da).attr("id")) {
        $("[name=\"NameCN\"]").val("");
        $("[name='phone']").val("");
        $("[name='CardNo']").val("");
    }


}

function tips(content) {
    $("#tips").children().remove();
    $('#tips').append("<div class='toast' id='mincount'>" +
        "<i class='info'></i><span>" + content + "</span></div>");
    $("#mincount").fadeToggle(5000);
}

var canClick = true;

if (true) {
    $("[class='ttd-btn-flat ']").click(function () {
        if (canClick == false) {
            layer.msg("点的太勤快了！");
            return;
        }
        uParams[3] = $("[class='total-price']").html();
        uParams[6] = count;//票数也传过去
        uParams[9] = "前面为日期";//
        uParams[8] = $("#cDate div[class='date_box  cur']").attr("date-num" + "");//出发日期
        uParams[10] = "TK" + getOrderNo();//生成订单编码
        var isPass = $("#newContact div[class='date_box cur']").length;
        var contactId = 2;//联系人id
        var odate = uParams[8].split(",")[0] + "-" + uParams[8].split(",")[1] + "-" + uParams[8].split(",")[2];

        // alert("订单编码orderCode："+uParams[10]+",订单名称orderName:"+uParams[4]+",门票类型："+uParams[1]+",景点id:"+uParams[2]+",总金额："+uParams[3]+",联系人id:"+contactId+",人数："+count);
        var passengerIds = [];//出行人id 可以通过遍历出行人的div获取其中的 出行人id信息即可
        passengerIds[0] = 2;
        //发送请求添加订单
        canClick = false;
        sendAjax("http://localhost:8080/ticket/addTicketOrder",
            {
                orderCode: uParams[10],
                orderName: uParams[4],
                ticketType: uParams[1],
                travelId: uParams[2],
                totalPrice: uParams[3],
                contactId: contactId,
                orderStatus: 1,
                number: count,
                orderTime: odate,
                passengerId: passengerIds
            }
            , "POST", "JSON", function (data) {
                if (data.result) {
                    layer.msg("下单成功！请尽快支付");
                    setTimeout(function () {
                        location.href = "piaoPayment.html?params=" + uParams;
                    }, 1000)
                } else {
                    layer.msg("抱歉下单失败！")
                }
            })
        if (isPass == 1) {

        } else {
            layer.msg("请填写联系人信息！");
        }
    })
}

//取消按钮
$("[class='cancel-btn']").click(function () {
    $("#addContancat11").hide();
    $("body").attr("style", "overflow:");//滚动条停止
})

//添加联系人
$("#addContact").click(function () {
    $("#addContancat11").show();
    $("body").attr("style", "overflow:hidden");//滚动条停止
})
