$(function(){

    //输入时间时的日历
    laydate.render({
        elem: '#inputStartDate'
        , done: function (value, date) {
        }
    });

    //全选功能
    $("[name='allSel']").click(function () {

        if($(this).is(":checked")){
            $("[name='select']").prop('checked',true);
        }else{
            $("[name='select']").prop('checked',false);
        }
    })
    //单选
    $("[name='select']").click(function () {
        //遍历每一个checkbox
        var flag = false;
            $("[name='select']").each(function () {
                    if(!$(this).is(":checked")){
                        flag = true;
                    }
            })
        //判断全选按钮是否勾选
        if(flag){
            $("[name='allSel']").prop("checked",false);
        }else{
            $("[name='allSel']").prop("checked",true);
        }

    })
})

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
            var status1 = da[i];
           /* console.log(status1);*/
            gethotelBill(status1);

        }
    })

}

getStatus();

function gethotelBill(status1) {
    var loginName = sessionStorage.getItem("loginName");
    //获取出行人、使用日期、订单状态的值
    var pName = $("#inputPassengerName").val();//旅客
    var startTime = $("#inputStartDate").val();//使用日期
    var ord = $("#ord").val();

    sendAjax("http://localhost:8080/user/getTicketOrder",
        {pName:pName,travelTime:startTime,orderStatus:ord},"GET","JSON",
        function (data) {
            var da = data.data;
            $("#orderList li").remove();
            for (var i = 0; i < da.length; i++){
                $_li = $("<li></li>");
                switch(da[i].orderStatus) {
                    case 1:
                        orderStatus = "已预订";
                        break;
                    case 2:
                        orderStatus = "预订超时";
                        break;
                    case 3:
                        orderStatus = "审核中";
                        break;
                    case 4:
                        orderStatus = "已取消";
                        break;
                    case 5:
                        orderStatus = "已支付";
                        break;
                    case 6:
                        orderStatus = "已过期";
                        break;
                    case 7:
                        orderStatus = "已完成";
                        break;
                    case 8:
                        orderStatus = "待评价";
                        break;
                }

                _inli =" <li biz=\"HotelDomestic\" class=\"item\" operatebiz=\"Hotel\">\n" +
                    "                                <h3>\n" +
                    "                                    <label class=\"base_label\"><input rid=\"10403683475\"name=\"select\" type=\"checkbox\" value=\"\"></label>\n" +
                    "                                    <span class=\"ilb mr10\">\n" +
                    "            订单号：\n" +
                    "\n" +
                    "                <a href=\"https://hotels.ctrip.com/DomesticBook/ShowOrderDetail.aspx?orderid=10403683475&amp;RepeatAction=HotelDomestic_Repeat_ReadOrder\" class=\"fs14\" target=\"_blank\">" + da[i].orderCode + "</a>\n" +
                    "\n" +
                    "        </span>\n" +
                    "                                    <span class=\"ilb mr10 bookingDate\" bd=\"2019-08-04 18:17:59\">预订日期："+ da[i].orderTime +"</span>\n" +
                    "\n" +
                    "                                  \n" +
                    "\n" +
                    "                                </h3>\n" +
                    "                                <table>\n" +
                    "                                    <tbody>\n" +
                    "                                    <tr>\n" +
                    "                                        <td width=\"164px\" class=\"tal pl10\">\n" +
                    "\n" +
                    "                                            <a href=\"https://hotels.ctrip.com/hotel/638257.html?checkin=2019-08-06&amp;checkout=2019-08-07&amp;RepeatAction=HotelDomestic_Repeat_HotelDetail\" class=\"fh_box\" title='" + da[i].orderName + "' target=\"_blank\">" + da[i].orderName + "</a>\n" +
                    "\n" +
                    "                                        </td>\n" +
                    "\n" +
                    "                                        <td width=\"16%\">\n" +
                    "                                            <div class=\"people_box\">\n" +
                    "                                                <div class=\"people\" title='"+da[i].pname+"'>"+da[i].pname+"</div>\n" +
                    "                                            </div>\n" +
                    "                                        </td>\n" +
                    "                                        <td width=\"20%\" style=\"white-space: nowrap;\">\n" +
                    "\n" +
                    "                                            " + da[i].travelTime + "<br>\n" +
                    "\n" +
                    "                                        </td>\n" +
                    "                                        <td width=\"8%\">\n" +
                    "                                            <span class=\"base_price fs14\"><dfn>¥</dfn>" + da[i].price + "</span>\n" +
                    "                                        </td>\n" +
                    "                                        <!-- 操作按钮容器（Modify，Extend, ModifyCoupon, SendClientSMS, ModifyInvoice, SendCouponConfirmEmail, CopyOrder） -->\n" +
                    "                                        <td class=\"tal pl10\">\n" +
                    "\n" +
                    "\n" +
                    "                                            <!-- 按钮样式（unsubscribe，booking again） -->\n" +
                    "\n" +
                    "\n" +
                    "                                        </td>\n" +
                    "                                        <!-- 操作按钮容器 （ModifyContactInfo, ModifyPaymentWay）-->\n" +
                    "                                        <td width=\"14.5%\" class=\"bd\">\n" +
                    "                                            <p>" + orderStatus + "</p>\n" +
                    "\n" +
                    "\n" +
                    "                                            <p><a href=\"https://hotels.ctrip.com/DomesticBook/ShowOrderDetail.aspx?orderid=10403683475&amp;RepeatAction=HotelDomestic_Repeat_ReadOrder\" target=\"_blank\">订单详情</a></p>\n" +
                    "\n" +
                    "\n" +
                    "                                        </td>\n" +
                    "                                        <!-- 操作按钮容器（Cancel，Commit，ReadComment, AddComment, AddAdditionalComment, MakeUrgent） -->\n" +
                    "                                        <td width=\"12%\" class=\"bd\">\n" +
                    "\n" +                                         "<p><a href=\"http://vacations.ctrip.com/tour/order_detail/order_details?orderId=272669510&amp;RepeatAction=Vacation_Repeat_Repeat\" target=\"_blank\" class=\"l_btn01\">继续预订</a></p>\n" +
                    "                                        </td>\n" +
                    "                                    </tr>\n" +
                    "                                    </tbody>\n" +
                    "                                </table>\n" +
                    "                            </li>"

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
gethotelBill(0);



//查询
$("#btnSearch").click(function () {
    console.log(status);
    gethotelBill(status);
})
/*
//状态下拉框的点击事件，触发查询
function status1(da) {
    $("#all").hide();
    $("#ord").html($(da).html());
    status = $(da).attr("os");
    gethotelBill(status);
}*/
