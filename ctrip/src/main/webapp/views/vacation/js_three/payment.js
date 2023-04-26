var layer;
layui.use(['layer'],function () {
    layer=layui.layer;
})
var order;
$(function () {
    order=JSON.parse(sessionStorage.getItem("order"));
    alert(typeof order)
    showOrderInfo(order);
})

function showOrderInfo(order) {
    if(order==null){
        layer.msg("失败，即将返回上一页面",{icon:0,time:1000});
        setTimeout("window.history.back()",2000);
    }else{
        console.log("渲染订单的一些信息");
        console.log(typeof order.adultNum)
        $(".price_s1:eq(0)").html("¥<i w-html=\"amount|number:2\">"+order.totalPrice+"</i>");
        $(".price_s5:eq(0)").html("¥<i w-html=\"parent.payCurrent.restAmount|number:2\">"+order.totalPrice+"</i>");
        $(".order_tit>h2").text(order.travelProTitle).next().text("人数："+(order.adultNum==0?"":order.adultNum+"成人")+(order.childNum==0?"":order.childNum+"儿童")
            +" 出发日期："+order.startDate.substring(0,10));
    }
}

$(".btn_area:eq(4)").click(function () {
    console.log("拼装订单数据")
    var params={
            "orderCode":order.orderCode,
            "totalPrice":order.totalPrice,
            "travelProTitle":order.travelProTitle,
            "desc":"旅游订单"
    }
    console.log(params);
    payOrder(params);
})
function payOrder(params) {
    console.log("开始发送ajax请求")
    commonAjax("/alipay.trade.page.pay","post",params,"html",
        function (data) {
                layer.msg("即将跳转到支付宝支付界面")
                document.write(data);
    })
}