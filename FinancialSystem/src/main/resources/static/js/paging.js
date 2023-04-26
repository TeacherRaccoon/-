$(function () {
    $(".layui-btn").click(function () {
        role();
    })
    role();
})

function role() {
    //拿到浏览器存入的cookie
    var token=getCookie("token");
    //获取用户信息
    requestAjax("/background/login/getLoginInfo",{token:token},function (data){
        if(data.result){
            var salesmanId=data.data.id
            var role = data.data.role;//用户角色（0.超级 1.业务 2.风控 3.财务）
            if(role==1){
                $(".td-manage").show()
            }else {
                $(".td-manage a:not(:first-child)").attr("style", "display:none;");
            }
            if(role==0){
                inquire()
            }else {
                inquire(salesmanId)
            }
        }else {
            alert("获取数据失败！")
        }
    })
}


//发送请求到后台拿数据
//分页记录数
function inquire(id) {
    var salesmanId = id;//业务员id
    var createDate = $("#start").val();//订单创建时间
    var orderId = $("#orderId").val();//订单号
    var userName = $("#userName").val();//借款人姓名
    var status = $("#status").val();//订单状态
    var payType = $("#payType").val();//交易类型
    // console.log("业务员id"+salesmanId+"订单创建时间"+createDate+"订单号"+orderId+"借款人姓名"+userName+"订单状态"+status+"交易类型"+payType)
    //获取业务员分页数据
    requestAjax(
        "/paging/businessPagingCount.htm",
        {
            salesmanId: salesmanId,
            createDate: createDate,
            orderId: orderId,
            userName: userName,
            status: status,
            payType: payType
        },
        function (data) {
            console.log(data)
            if (data.result) {
                //制作分页条
                articlePage(data.data,salesmanId)
            } else {
                alert(data.msg);
            }
        })
}

//制作分页条
function articlePage(page,id) {
    var salesmanId = id;//业务员id
    var laypage = layui.laypage;
    layui.use(['layer', "laypage"], function () {
        var laypage = layui.laypage;
        //完整功能
        laypage.render({
            elem: "page",
            limit: 10,
            count: page, //数据总数
            //自定义排版。可选值有：count（总条目输区域）、prev（上一页区域）、page（分页区域）、next（下一页区域）、limit（条目选项区域）、refresh（页面刷新区域。注意：layui 2.3.0 新增） 、skip（快捷跳页区域）
            layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
            , jump: function (obj, first) {
                //obj包含了当前分页的所有参数
                pageData(obj.curr, obj.limit,salesmanId);
                //首次不执行
                if (!first) {
                    //do something
                }
            }
        });
    })
}

//分页数据
function pageData(curr, limit,id) {
    var salesmanId = id;//业务员id
    var createDate = $("#start").val();//订单创建时间
    var orderId = $("#orderId").val();//订单号
    var userName = $("#userName").val();//借款人姓名
    var status = $("#status").val();//订单状态
    var payType = $("#payType").val();//交易类型
    requestAjax(
        "/paging/businessPagingData.htm",
        {
            curr: curr,
            limit: limit,
            salesmanId: salesmanId,
            createDate: createDate,
            orderId: orderId,
            userName: userName,
            status: status,
            payType: payType
        },
        function (data) {
            console.log(data)
            if (data.result) {
                //制作分页条
                renderPageData(data.data,salesmanId)
            } else {
                alert(data.msg);
            }
        })
}

var $tr_template = $(".templateTbody tr:last");

//数据渲染
function renderPageData(infoEntrylist,id) {
    var salesmanId = id;//业务员id
    var $tbody = $(".templateTbody");
    $(".layui-card-body tr:gt(0)").remove();
    for (var i = 0; i < infoEntrylist.length; i++) {
        var $tr = $tr_template.clone();
        $tr.find(".orderId").html(infoEntrylist[i].orderId);
        $tr.find(".orderId").hover(
            function () {
                $(this).css('background', '#bce8f1')
            }, //鼠标移入
            function () {
                $(this).css('background', '')
            } //鼠标移出
        )
        $tr.find(".orderId").click(function () {
            location.href = "fengKongXQ.html";
        })
        $tr.find(".userName").html(infoEntrylist[i].userName);
        $tr.find(".phone").html(infoEntrylist[i].phone);
        $tr.find(".amount").html(infoEntrylist[i].amount + "万人民币");
        $tr.find(".amountDays").html(infoEntrylist[i].amountDays + "年");
        $tr.find(".feeWay").html(infoEntrylist[i].feeWay == 0 ? "费用前置" : "费用后置");
        var payType = "";
        if ((infoEntrylist[i].payType) == 1) {
            payType = "非交易类型"
        } else if ((infoEntrylist[i].payType) == 2) {
            payType = "交易类型"
        } else if ((infoEntrylist[i].payType) == 3) {
            payType = "过桥类型"
        }
        //  $tr.find(".payType").attr("style","color:red");
        $tr.find(".payType").html(payType);
        var status = "";
        switch (infoEntrylist[i].status) {
            //订单状态(1.待处理 ，2.风控审批通过，3.风控二审 ，4.风控审批不通过 ，
            // 5.财务审批通过 ，6.财务二审，7.财务审批不通过 ，8.审批通过， 9.审批不通过)
            case 1:
                status = "待处理"
                break;
            case 2:
                status = "代提案"
                break;
            case 3:
                status = "风控审批通过"
                break;
            case 4:
                status = "风控二审"
                break;
            case 5:
                status = "风控审批不通过"
                break;
            case 6:
                status = "财务审批通过"
                break;
            case 7:
                status = "财务二审"
                break;
            case 8:
                status = "财务审批不通过"
                break;
            case 9:
                status = "审批不通过"
                break;
            case 10:
                status = "未还款"
                break;
            case 11:
                status = "已还款"
                break;
            case 12:
                status = "订单实效"
                break;
            default :
                status = "错误状态"
                break;
        }
        $tr.find(".status").html(status);
        $tr.find(".createDate").html(infoEntrylist[i].createDate);
        // $tr.find("#show").html("<a class=\"layui-btn layui-btn-xs\" lay-event=\"edit\" href=\"fengKongXQ.html?orderId=" + infoEntrylist[i].orderId + "\">查看详情</a>");
        $tr.find("#show").attr("href","fengKongXQ.html?orderId=" + infoEntrylist[i].orderId+"&salesmanId="+salesmanId)
        $tbody.append($tr);
    }
    $tr_template.remove()
}
