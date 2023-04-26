$(function () {
    inquire()
    $(".layui-btn layui-btn-lg").onclick(function () {
        $(this).attr('disabled', true);
    })
})

//获取传过来的值
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
//发送请求到后台拿数据
function inquire() {
    var orderId = getParams("orderId");//订单号id
    //获取订单信息
    $.ajax({
        url: "/view/orderInfo.htm?orderId=" + orderId,
        type: 'get',
        contentType: 'json',
        success: function (data) {
            if (data.result) {
                showOrder(data.data)
            } else {
                alert("查询失败")
            }
        },
        error: function (result) {
        }
    });
    //获取出款信息
    $.ajax({
        url: "/view/outAmountInfo.htm?orderId=" + orderId,
        type: 'get',
        contentType: 'json',
        success: function (data) {
            if (data.result) {
                if (data.data != null) {
                    showOutAmount(data.data)
                } else {
                    without()
                }
            } else {
                alert("查询失败")
            }
        },
        error: function (result) {
        }
    });
    //获取图片
    $.ajax({
        url: "/view/imgInfo.htm?orderId=" + orderId,
        type: 'get',
        contentType: 'json',
        success: function (data) {
            if (data.result) {
                imgshow(data.data)
            } else {
                alert("查询失败")
            }
        },
        error: function (result) {
        }
    });
}

//订单信息的数据渲染
function showOrder(data) {
    $("span[name='orderId']").html(data.userName)//借款人姓名
    $("span[name='identity']").html(data.identity)//身份证
    $("span[name='phone']").html(data.phone)//手机号码
    var maritalStatus = "";
    if ((data.maritalStatus) == 1) {
        maritalStatus = "已婚"
    } else if ((data.maritalStatus) == 2) {
        maritalStatus = "未婚"
    } else if ((data.maritalStatus) == 3) {
        maritalStatus = "离异"
    }
    $("span[name='maritalStatus']").html(maritalStatus)//婚姻状态1.已婚2.未婚3.离异
    $("span[name='spouseNname']").html(data.spouseNname)//配偶姓名
    $("span[name='spouseIdentity']").html(data.spouseIdentity)//配偶身份证号码
    $("span[name='privateLending']").html(data.privateLending == "" ? "无" : data.privateLending)//民间借贷情况
    $("span[name='lawsuitCase']").html(data.lawsuitCase == "" ? "无" : data.privateLending)//诉讼情况
    $("span[name='totalAmount']").html((data.totalAmount) + "万人民币")//总负债金额
    $("span[name='foreclosure']").html((data.foreclosure) + "%")//赎楼成数
    $("span[name='houseName']").html(data.houseName)//房产名称
    $("span[name='area']").html(data.area)//面积
    $("span[name='address']").html(data.address)//房产所在地
    $("span[name='assessment']").html(data.assessment) + "万人民币"//房产评估
    $("span[name='ownerName']").html(data.ownerName)//产权人姓名
    $("span[name='originalBank']").html(data.originalBank)//原贷款银行
    $("span[name='originalAmount']").html((data.originalAmount) + "万人民币")//原贷款金额
    $("span[name='amountBlance']").html((data.amountBlance) + "万人民币")//原贷款余额
    $("span[name='newBank']").html(data.newBank == "" ? "无" : data.newBank)//新贷款银行
    $("span[name='newAmount']").html(data.newAmount == "" ? "无" : (data.newAmount) + "万人民币")//新贷款金额
    $("span[name='managerName']").html(data.managerName)//客户经理姓名
    $("span[name='managerPhone']").html(data.managerPhone)//客户经理手机号码
    $("span[name='amount']").html((data.amount) + "万人民币")//借款金额
    $("span[name='amountDays']").html(data.amountDays)//借款天数
    $("span[name='rate']").html((data.rate) + "%")//费率
    $("span[name='brokerage']").html((data.brokerage) + "人民币")//收费金额
    $("span[name='feeWay']").html(data.feeWay == 0 ? "费用前置" : "费用后置")//0.费用前置1.费用后置
    $("span[name='paragraphTime']").html(data.paragraphTime)//预计出款时间（筛选时间）
    $("span[name='dealPrice']").html(data.dealPrice)//成交价格
    $("span[name='orderAmount']").html(data.orderAmount)//定金金额
    $("span[name='superviseAmount']").html(data.superviseAmount)//监管金额
    $("span[name='buyerName']").html(data.buyerName)//买家姓名
    $("span[name='buyerIdentity']").html(data.buyerIdentity)//买家身份证号码
    $("#status").val(data.status);
    var payType = "";
    if ((data.payType) == 1) {
        payType = "非交易类型"
    } else if ((data.payType) == 2) {
        payType = "交易类型"
    } else if ((data.payType) == 3) {
        payType = "过桥类型"
    }
    $("span[name='payType']").html(payType)//交易类型（1.非交易 2.交易类 3.过桥）
    if (data.status == 1) {
        $("#reject").children().attr("style", "display:none;");//隐藏div
    }
}

//出款信息的数据渲染
function showOutAmount(data) {
    $("span[name='amountNo']").html(data.amountNo == "" ? "无" : data.amountNo)//出款账户
    $("span[name='amountName']").html(data.amountName == "" ? "无" : data.amountName)//户主姓名
    $("span[name='amountBank']").html(data.amountBank == "" ? "无" : data.amountBank)//开户银行
    $("span[name='returnedName']").html(data.returnedName == "" ? "无" : data.returnedName)//回款户名
    $("span[name='returnedBank']").html(data.returnedBank == "" ? "无" : data.returnedBank)//回款银行
    $("span[name='returnedAmount']").html(data.returnedAmount == "" ? "无" : data.returnedAmount)//回款账号
}

function without(data) {
    $("span[name='amountNo']").html("无")//出款账户
    $("span[name='amountName']").html("无")//户主姓名
    $("span[name='amountBank']").html("无")//开户银行
    $("span[name='returnedName']").html("无")//回款户名
    $("span[name='returnedBank']").html("无")//回款银行
    $("span[name='returnedAmount']").html("无")//回款账号
}

function imgshow(data) {
    $(".layui-input-block img").remove();
    //订单id和资料类型
    for (var i = 0; i < data.length; i++) {
        //创建一个图片
        var img = ("<img src=" + data[i].imgUrl + ">")
        // 图片类型（1.客户资料，2.房产资料，3.银行资料，4.账户资料，5.面签资料，6.其他）
        if (data[i].imageType == 1) {
            $("#client").append(img);
        } else if (data[i].imageType == 2) {
            $("#house").append(img);
        } else if (data[i].imageType == 3) {
            $("#bank").append(img);
        } else if (data[i].imageType == 4) {
            $("#account").append(img);
        } else if (data[i].imageType == 5) {
            $("#interview").append(img);
        } else if (data[i].imageType == 6) {
            $("#rest").append(img);
        }
    }


}

/*//点击通过
function pass() {
    $(this).attr('disabled', true);
}*/

//点击回退
function rollback() {
    var orderId = getParams("orderId");//订单号id
    var status = $("#status").val();//订单状态
    var operatorId = 1;//操作员id
    var returnReson = $(".layui-textarea").val();//驳回原因
    console.log(returnReson)
    if(returnReson!=""){
        if (status == 1) {
            status = 4;
        } else if (status == 4) {
            status = 5
        } else if (status == 5) {
            status = 9
        } else if (status == 3) {
            status = 7
        } else if (status == 7) {
            status = 8
        } else if (status == 8) {
            status = 9
        }
        //信息录入--修改状态为业务员进行提案
        $.ajax({
            url: "/view/alterState.htm?orderId=" + orderId + "&status=" + status,
            type: 'get',
            contentType: 'json',
            success: function (data) {
                if (data.result) {
                    console.log(data.data)
                } else {
                    alert("查询失败")
                }
            },
            error: function (result) {
            }
        });
        //添加一条数据线记录
        $.ajax({
            url: "/view/reject.htm?orderId=" + orderId + "&status=" + status + "&operatorId=" + operatorId+"&returnReson"+returnReson,
            type: 'get',
            contentType: 'json',
            success: function (data) {
                if (data) {
                    alert("回退成功")
                    window.location.href = "finance-list.html"
                } else {
                    alert("查询失败")
                }
            },
            error: function (result) {
            }
        });
    }else {
        layer.msg("请填写驳回原因！");
    }

}