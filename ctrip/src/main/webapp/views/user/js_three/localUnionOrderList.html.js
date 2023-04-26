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
            gethotelBill(status1);

        }
    })

}

getStatus();

function gethotelBill(status1) {
    var loginName = sessionStorage.getItem("loginName");
    //获取入住人、入住日期、订单状态的值
    var pName = $("#inputPassengerName").val();//旅客
    var startTime = $("#inputStartDate").val();//使用日期
    var ord = $("#ord").val();

    sendAjax("http://localhost:8080/user/getTravelOrder",
        {pName:pName,travelTime:startTime,orderStatus:ord},"GET","JSON",
        function (data) {
            var da = data.data;
            console.log("data"+da.length);
            var $li_temp=$("#orderList li:eq(0)");
            $("#orderList li").remove();

            for (var i = 0; i < da.length; i++){
                console.log("data2"+da[i].pname);
                console.log("riqi"+da[i].travelTime);
                var $li_clone=$li_temp.clone();

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
                $li_clone.find(".ilbmr10 a").html(da[i].orderCode);
                $li_clone.find("#oderTime").html("预订日期:"+da[i].orderTime);
                $li_clone.find(".fh_box").html(da[i].orderName);
                $li_clone.find(".people").html(da[i].pname);
                $li_clone.find("#travelTime").html(da[i].travelTime);
                $li_clone.find(".base_pricefs14").html("¥"+da[i].price);
                $li_clone.find(".bd p:eq(0)").html(orderStatus);
                $(".t_body").append($li_clone);
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
