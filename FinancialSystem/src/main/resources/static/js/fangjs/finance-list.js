$(function () {
    $(".layui-btn").click(function () {
        role();
    });
    role();
});

function role() {
    //拿到浏览器存入的cookie
    var token=getCookie("token");
    //获取用户信息
    requestAjax("/background/login/getLoginInfo",{token:token},function (data){
        if(data.result){
            var financeId=data.data.id
            var role = data.data.role;//用户角色（0.超级 1.业务 2.风控 3.财务）
            /*    if(role==1){
                    $(".td-manage").show()
                }else {
                    $(".td-manage a:not(:first-child)").attr("style", "display:none;");
                }*/
            if(role==0){
                inquire()
            }else {
                inquire(financeId)
            }
        }else {
            alert("获取数据失败！")
        }
    })
}


//发送请求到后台拿数据
//分页记录数
function inquire(financeId) {
    if (financeId==null||financeId==''){
        $("#t2").remove();
        $("#t1").remove();
    }

    var createDate = $("#start").val();//订单创建时间
    var orderId = $("#orderId").val();//订单号
    var userName = $("#userName").val();//借款人姓名
    var status = $("#status").val();//订单状态
    var payType = $("#payType").val();//交易类型
    // console.log("业务员id"+salesmanId+"订单创建时间"+createDate+"订单号"+orderId+"借款人姓名"+userName+"订单状态"+status+"交易类型"+payType)
    //获取业务员分页数据
    requestAjax(
        "/financePagingCount",
        {
            financeId: financeId,
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
               articlePage(data.data,financeId)
            } else {
                layer.log(data.msg);
            }
        })
}

//制作分页条
function articlePage(page,financeId) {
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
                pageData(obj.curr, obj.limit,financeId);
                //首次不执行
                if (!first) {
                    //do something
                }
            }
        });
    })
}

//分页数据
function pageData(curr, limit,financeId) {
    var createDate = $("#start").val();//订单创建时间
    var orderId = $("#orderId").val();//订单号
    var userName = $("#userName").val();//借款人姓名
    var status = $("#status").val();//订单状态


    var payType = $("#payType").val();//交易类型
    requestAjax(
        "/financePagingData",
        {
            curr: curr,
            limit: limit,
            financeId: financeId,
            createDate: createDate,
            orderId: orderId,
            userName: userName,
            status: status,
            payType: payType
        },
        function (data) {
            if (data.result) {
                $("#imgs").remove();
                $(".layui-card-body tr:gt(0)").remove();
                if (data.data.length==0) {
                    $("#z1").append(" <img id='imgs' src=\"../images/img/chas.png\" style=\"width: 100%;height: 400px\">")
                    return ;
                }else {
                    //制作分页条
                    renderPageData(data.data,financeId)
                }

            } else {
                layer.log(data.msg);
            }
        })
}

var $tr_template = $(".templateTbody tr:last");

//数据渲染
function renderPageData(infoEntrylist,financeId) {
    var $tbody = $(".templateTbody");

    for (var i = 0; i < infoEntrylist.length; i++) {
        var $tr = $tr_template.clone();
        $tr.find(".orderId").html("<a href=\"javascript:void (0)\" onclick=\"xadmin.open('订单状态','log.html?orderId="+infoEntrylist[i].orderId+"',$(window).width()*0.4,$(window).height() - 50)\">"+infoEntrylist[i].orderId+"</a>");
        $tr.find(".orderId").hover(
            function () {
                $(this).css('background', '#bce8f1')
            }, //鼠标移入
            function () {
                $(this).css('background', '')
            } //鼠标移出
        );

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
                status = "待提案";
                break;
            case 2:
                status = "风控初审中";
                break;
            case 3:
                status = "财务初审中";
                break;
            case 4:
                status = "风控二审中";
                break;
            case 5:
                status = "未通过风控审核";
                break;
            case 6:
                status = "已通过财务审核";
                break;
            case 7:
                status = "财务二审中";
                break;
            case 8:
                status = "已未通过财务审核";
                break;
            case 9:
                status = "审核失败";
                break;
            case 10:
                status = "已回款";
                break;
            case 11:
                status = "已逾期";
                break;
            case 12 :
                status = "订单已失效";
                break;
            case 13:
                status = "财务已出款";
                break;
            case 14:
                status = "已结清原贷款";
                break;
            case 15:
                status = "已上传原房产信息";
                break;
            case 16:
                status = "已上传过户凭证";
                break;
            case 17:
                status = "已上传新房产信息";
                break;
            case 18:
                status = "已上传抵押凭证";
                break;
            default :
                status = "财务已结单";
                break;
        }

        $tr.find(".status").html(status);
        $tr.find(".createDate").html(infoEntrylist[i].createDate);
        $tr.find("#a1").attr("onclick","xadmin.open('客户信息','finance-info.html?status="+infoEntrylist[i].status+"&orderId=' + "+infoEntrylist[i].orderId+"+'&financeId='+"+financeId+",$(window).width()*0.9,$(window).height() - 50)");
       if (infoEntrylist[i].status==6){
           $tr.find("#a2").attr("onclick","xadmin.open('出款凭证','upImg.html?orderId=' + "+infoEntrylist[i].orderId+"+'&financeId='+"+financeId+",$(window).width()*0.6,$(window).height()-240)");
       }else
           $tr.find("#a2").remove();

        if (infoEntrylist[i].status==10){
            $tr.find("#a3").attr("onclick","jiedan("+infoEntrylist[i].orderId+","+financeId+")");
        }else
            $tr.find("#a3").remove();

        $tbody.append($tr);
    }
    $tr_template.remove()
}

//结单
function jiedan(orderId,financeId) {
    layer.confirm('是否结单！！！',function(){
        requestAjax("/view/alterState.htm", {orderId:orderId,status:19,financeId:financeId}, function (data) {
            if (data.result){
                layer.alert("结单成功!", {
                        icon: 1
                    },
                    function () {
                        history.go(0)
                    });
            } else {
                layer.msg('结单失败!',{icon:2,time:1000});
            }
        });
    });







}


