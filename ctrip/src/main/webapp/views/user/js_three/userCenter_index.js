var loginName = sessionStorage.getItem("loginName");//获取页面间的session
console.log(loginName);

var userImg = sessionStorage.getItem("userImg");
if(userImg!=null && userImg!=''){
    $("#userImg02").attr("src","http://106.52.92.57/img/"+userImg);
}



//全部订单、为出行、待付款、待评价样式切换
$("#myOrder li").click(function () {
    $(this).prop("class", "orderTab current");
    var index = $(this).index();
    $("#myOrder li").each(function () {
        if ($(this).index() != index) {
            $(this).prop("class", "");
        }
    })
    if (index == 0) {
        getAllBill(0);
    } else if (index == 1) {
        getAllBill(5);
    } else if (index == 2) {
        getAllBill(1);
    } else if (index == 3) {
        getAllBill(7);
    }

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


function getAllBill(status1) {

    sendAjax("http://localhost:8080/user/getUserOrder",
        {
            orderStatus: status1,
            loginName: loginName
        },
        "POST", "JSON",
        function (data) {
            var da = data.data;
            console.log(da[0]);
            $("#orderList01 li").remove();
            for (var i = 0; i < da.length; i++) {
                var $_li = $("<li></li>");

                var div_ = "        <div class='order-hd'>" +
                    "            <i class='order-type type-team'></i>" +
                    "        </div>" +
                    "        <div class='order-cont'>" +
                    "           <a target='_blank' href='http://localhost:8080/views/user/piaobillInfo.html?orderCode="+da[i].orderCode+"' class='needHrefZ '>" +
                    "                <h2>" + da[i].orderName + "</h2>" +
                    "                <div class='status-position'>" +
                    "                    <span class='order-price f-price'><dfn>￥</dfn>" + da[i].price + "</span>|" +
                    "                    <span class='order-status '>" + orderStatus[da[i].orderStatus - 1] + "</span>" +
                    "                </div>" +
                    "                <p class='order-info'>" +
                    "                    " + da[i].travelTime + "&nbsp;至&nbsp;" + da[i].travelEndTime + "&nbsp;&nbsp;" +
                    "                </p>" +
                    "            </a>" +
                    "        </div>" +
                    "        <div class='order-ft'>" +
                    "            <a href='http://vacations.ctrip.com/tour/order_detail/order_details?orderId=272794462' class='btn01' target='_blank'>继续预订</a>" +
                    "        </div>"
                $_li.html(div_);
                $("#orderList01").append($_li);
            }

        })
}

getAllBill(0);

$("[class='set-list myctrip-name']").mouseover(function () {
    $(this).attr("class", "set-list myctrip-name my_current");
    $(this).find("ul").show();
}).mouseout(function () {
    $(this).attr("class", "set-list myctrip-name");
    $(this).find("ul").hide();
})


if (loginName == null || loginName == "") {
    $("#nav-bar-set-myctrip-name").hide();//尊贵的会员隐藏
    $("#nav-bar-set-login").show();//您好请登录显示
    $("#nav-bar-set-reg").show();//免费注册显示
    $("#uLoginName").html("");
} else {
    $("#nav-bar-set-myctrip-name").show();//尊贵的会员隐藏
    $("#nav-bar-set-login").hide();//您好请登录显示
    $("#nav-bar-set-reg").hide();//免费注册显示
    $("#uLoginName").html(loginName);
}


function loginOut() {
    loginName = null;
    sessionStorage.clear();
    $("body").html("正在退出请稍后！");
    sendAjax("http://localhost:8080/user/delRLoginName", {loginName: loginName}, "POST", "JSON", function (data) {
        if (data.result) {
            layer.msg("退出成功！稍后返回主页。");
            setTimeout(function () {
                location.href = "http://localhost:8080/views/ctrip/ctrip_index.html"
            }, 1000)
        } else {
            layer.msg(data.msg);
        }
    })


}
