$(function () {
    //输入时间时的日历
    laydate.render({
        elem: '#inputStartDate'
        , done: function (value, date) {
        }
    });
    laydate.render({
        elem: '#inputEndDate1'
        , done: function (value, date) {
        }
    });
    //类型下拉框
    $("#type01").mousemove(function () {
        $("#yewu").show();
    }).mouseout(function () {
        $("#yewu").hide();
    })
    $("#yewu").mouseover(function () {
        $(this).show();
    }).mouseout(function () {
        $("#yewu").hide();
    });

    //订单状态下拉框
    $("#ord").mousemove(function () {
        $("#all").show();
    }).mouseout(function () {
        $("#all").hide();
    })
    $("#all").mouseover(function () {
        $(this).show();
    }).mouseout(function () {
        $("#all").hide();
    });

    //全选功能
    $("[name='allSel']").click(function () {

        if ($(this).is(':checked')) {
            console.log("a")
            $("[name='select']").prop('checked', true);
        } else {
            $("[name='select']").prop('checked', false);
            console.log("b")
        }
    })


    //全部订单-未出行-待付款-待评价切换
    $("[name='top']").click(function () {
        $("[name='top']").removeAttr("class");
        $(this).prop("class", "current");
        var ind = $(this).index();
        if(ind == 0){
            getAllBill(0, 0);
        }else if(ind ==1){
            getAllBill(0,5)
        }else if(ind == 2){
            getAllBill(0,1);
        }else if(ind == 3){
            getAllBill(0,7);
        }

    })
})
var orderStatus = [];//记录订单状态
function getStatus() {
    //获取订单状态
    sendAjax("http://localhost:8080/user/getOrderStatus", "", "POST", "JSON", function (data) {
        var da = data.data;
        for (var i = 0; i < da.length; i++) {
            var id = i + 1;
            var $_li = $("<li></li>")
            var inli = "<a os='" + id + "' nam='' typ='orderStatus' onclick='javaScript:status1(this)'>" + da[i] + "</a>";
            $_li.html(inli);
            $("#all").append($_li);
            orderStatus[i] = da[i];
        }
    })
}

getStatus();
var loginName = sessionStorage.getItem("loginName");//获取登录的用户名
function getAllBill(type1, status1) {

    //获取订单号、旅客、预订查询开始日期、预订查询结束日期、类型、订单状态的值
    var orderCode = $("#inputOrderId").val();//订单编码
    var pName = $("#inputPassengerName").val();//旅客
    var startTime = $("#inputStartDate").val();//开始时间
    var endTime = $("#inputEndDate1").val();//结束时间

    sendAjax("http://localhost:8080/user/getUserOrder",
        {
            orderCode: orderCode,
            pName: pName,
            startTime: startTime,
            endTime: endTime,
            orderType: type1,
            orderStatus: status1,
            loginName: loginName
        },
        "POST", "JSON",
        function (data) {
            var da = data.data;
            console.log(da[0]);
            $("#orderList0 li").remove();
            for (var i = 0; i < da.length; i++) {
                $_li = $("<li></li>");

                var typeNum = da[i].orderType - 1;//订单类型
                var type = ["酒店", "旅游", "门票"];

                var oNum = da[i].orderStatus - 1;//订单状态

                _inli = "<li biz='HotelDomestic' class='item' operatebiz='Hotel'>" +
                    "                                    <h3>" +
                    "                                        <label class='base_label'><input rid='10413869549' type='checkbox' name='select'" +
                    "                                                                         value=''></label>" +
                    "                                        <span class='ilb mr10'>" +
                    "                订单号：<a href='https://hotels.ctrip.com/DomesticBook/ShowOrderDetail.aspx?orderid=10413869549&amp;RepeatAction=HotelDomestic_Repeat_ReadOrder'" +
                    "                       class='fs14' target='_blank'>" + da[i].orderCode + "</a>" +
                    "        </span>" +
                    "                                        <span class='ilb mr10 bookingDate'" +
                    "                                              bd='2019-08-06 18:53:43'>预订日期：" + da[i].orderTime + "</span>" +
                    "                                    </h3>" +
                    "                                    <table>" +
                    "                                        <tbody>" +
                    "                                        <tr>" +
                    "                                            <td width='180px' class='tal pl10'>" +
                    "                                                <a href='https://hotels.ctrip.com/hotel/651.html?checkin=2019-08-06&amp;checkout=2019-08-07&amp;RepeatAction=HotelDomestic_Repeat_HotelDetail'" +
                    "                                                   class='fh_box' title='" + da[i].orderName + "' target='_blank'>" + da[i].orderName + "</a>" +
                    "                                            </td>" +
                    "                                            <td width='10%' class='td_left'>" + type[typeNum] + "</td>" +
                    "                                            <td width='9.04%'>" +
                    "                                                <div class='people_box'>" +
                    "                                                    <div class='people' title='" + da[i].pname + "'>" + da[i].pname + "</div>" +
                    "                                                </div>" +
                    "                                            </td>" +
                    "                                            <td width='20%' style='white-space: nowrap;'>" +
                    "                                                " + da[i].travelTime + "<br>" +
                    "                                            </td>" +
                    "                                            <td width='7%'>" +
                    "                                                <span class='base_price fs14'><dfn>¥</dfn>" + da[i].price + "</span>" +
                    "                                            </td>" +
                    "                                            <!-- 操作按钮容器（Modify，Extend, ModifyCoupon, SendClientSMS, ModifyInvoice, SendCouponConfirmEmail, CopyOrder） -->" +
                    "                                            <td class='tal pl10'>" +
                    "                                                <!-- 按钮样式（unsubscribe，booking again） -->" +
                    "                                                <a href='https://hotels.ctrip.com/hotel/651.html?checkin=2019-08-06&amp;checkout=2019-08-07&amp;RepeatAction=HotelDomestic_Repeat_CopyOrder'" +
                    "                                                   class='btn_modify' target='_blank'>再次预订</a>" +
                    "                                            </td>" +
                    "                                            <!-- 操作按钮容器 （ModifyContactInfo, ModifyPaymentWay）-->" +
                    "                                            <td width='10%' class='bd'>" +
                    "                                                <p>" + orderStatus[oNum] + "</p>" +
                    "                                                <p>" +
                    "                                                    <a href='https://hotels.ctrip.com/DomesticBook/ShowOrderDetail.aspx?orderid=10413869549&amp;RepeatAction=HotelDomestic_Repeat_ReadOrder'" +
                    "                                                       target='_blank'>订单详情</a></p>" +
                    "                                            </td>" +
                    "                                            <!-- 操作按钮容器（Cancel，Commit，ReadComment, AddComment, AddAdditionalComment, MakeUrgent） -->" +
                    "                                            <td width='10%' class='bd'>" +
                    "                                                <p>" +
                    "                                                    <a href='https://hotels.ctrip.com/DomesticBook/ShowOrderDetail.aspx?orderid=10413869549&amp;RepeatAction=HotelDomestic_Repeat_Cancel'" +
                    "                                                       target='_blank'>取消</a></p>" +
                    "                                            </td>" +
                    "                                        </tr>" +
                    "                                        </tbody>" +
                    "                                    </table>" +
                    "                                </li>"

                $_li.html(_inli);

                $(".t_body").append($_li);
            }
            //单选
            $("[name='select']").click(function () {
                var flag = false;
                $("[name='select']").each(function () {
                    if (!$(this).is(":checked")) {
                        flag = true;
                    }
                })
                if (flag) {
                    $("[name='allSel']").prop('checked', false);
                } else {
                    $("[name='allSel']").prop('checked', true);
                }
            })
        })
}

getAllBill(0, 0);

var type = 0;//订单状态
var status = 0;//订单类型
//查询
$("#btnSearch").click(function () {
    console.log(type + "_" + status);
    getAllBill(type,status);
})


//类型下拉框的点击事件,也会触发查询
$("#yewu li a").click(function () {
    $("#yewu").hide();
    $("#type01").text($(this).text());
    type = $(this).attr("os");
    getAllBill(type,status);
})

//状态下拉框的点击事件，触发查询
function status1(da) {
    $("#all").hide();
    $("#ord").html($(da).html());
    status = $(da).attr("os");
    getAllBill(type,status);
}
