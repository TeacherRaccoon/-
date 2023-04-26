
var orderCode = getParam();


function getBillInfo(orderCode) {
    sendAjax("http://localhost:8080/user/getTorderInfo",{orderCode:orderCode},"POST","JSON",function(data){
        var da = data.data;
        console.log(da);
        var oTime = renderTime(da.orderTime);
        var orTime = renderTime(da.creationDate);
        //渲染数据
        $("[class='order_product']").html("<span class='name'>订单名称：</span>"+da.orderName);//订单名称
        $("#tPrice").html(da.totalPrice);//总金额
        $("#orderTime").html(orTime);//预订时间
        $("#orderCode").html(da.orderCode);//订单编号
        $("[class='base_txtdiv']").html("<a href='http://localhost:8080/views/piao/mengPiao_guangZhou.html?spotId="+da.ticketSpot.id+"'>"+da.orderName+"("+da.ticketSpot.openTime+")"+"</a>");//详情
        $("#price").html("<dfn>&yen;</dfn>"+da.ticketSpot.price);
        $("#outTime").html(oTime);//使用日期（预订出行日期）
        $("#numbs").html(da.number);//数量
        $("#price02").html(da.totalPrice);//总价

        var passenger = da.passengers;//出行人
        for(var i=0;i<passenger.length;i++){
            $("[class='order_box']").append("<div class='order_mod  order_traveler_info'>"+
                "        <div class='mod_main'>"+
                "                    <dl class='mod_list'>"+
                "                        <dt>"+
                "                            出行人 "+(i+1)+""+
                "                                <br /><span class='adult'>取票人</span>"+
                "                        </dt>"+
                "                        <dd>"+
                "                            <table class='crosswise_tb' width='100%'>"+
                "                                    <tr>"+
                "                                        <th width='80'>中文姓名</th>"+
                "                                        <td>"+
                "                                            "+passenger[i].name+" "+
            " <span class='amend-dsn'>"+
            "                                    </span>"+
            "                                        </td>"+
            "                                    </tr>"+
            "                                        <th>手机号码</th>"+
            "                                        <td>"+passenger[i].phone+"</td>"+
            "                                    </tr>"+
            "                            </table>"+
            "                        </dd>"+
            "                    </dl>"+
            "        </div>"+
            "    </div>");
        }


    })
}

getBillInfo(orderCode)