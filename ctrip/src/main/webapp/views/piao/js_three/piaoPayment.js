var params = (getRequestParams() + "").split(",");
console.log(params);
//金额
$("[w-html='amount|number:2']").html(params[4]);
$("[w-html='parent.payCurrent.restAmount|number:2']").html(params[4]);
//门票
$(".order_tit h2").html(params[5] + params[6]);

//人数出发日期
$("#num-date").html("人数：" + params[7] + "人" + " 出发日期：" + params[9] + "-" + params[10] + "-" + params[11]);

$(".btn_area").click(function () {
    sendAjax("http://localhost:8080/ticket/alipay",
        {orderNo: params[13], money: params[4], orderName: params[5], desc: params[6]},
        "POST", "html",
        function (data) {
            document.write(data);
        })
})