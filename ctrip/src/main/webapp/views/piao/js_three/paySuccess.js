

var payParams = getRequestParams();
console.log(payParams);
$("[class='game-account']:eq(1)").html(payParams[2])//订单编码
sendAjax("http://localhost:8080/ticket/getTicketInfo",{orderCode:payParams[2]},"POSt","JSON",
    function(data){
    var da = data.data;
        console.log(data)
        $("#orderName").html(da.orderName);//订单名称
        $("[class='game-name']").html(da.orderTime);//预订日期
        $("#price").html(da.totalPrice);//消费金额
        $("#ticketType").html(da.ticketType);//门票类型
        $("#payDate").html(da.payDate);//支付日期


    })