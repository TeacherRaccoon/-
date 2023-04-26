//获取传过来的值
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}





var layer;
var form;
layui.use(['layer', 'form'], function () {
    layer = layui.layer
    form = layui.form;
    layer.msg('Hello World');
});


var delTarget = "";//要删除的图片

//获取订单数据
function getOrderInfo(orderId) {
    requestAjax("http://localhost:8090/getInfoEntryByOrderId", {orderId: orderId}, function (data) {
        var da = data.data;
        console.log(da)
        //数据渲染
        if (da.returnReson != null) {//驳回原因
            $("#reson").html(da.returnReson);
        } else {
            $("[ data-my='reson01']").hide();
        }
        //交易类型
        /*var s = $("[class='layui-input-block']:eq(0)").html();*/
        /*alert(da.payType)*/
        var payType = da.payType;
        console.log(payType);
        if (payType == 1) {
            /*$("[value='1']").css(checked="true")*/
            $("input[name='payType']:eq(0)").prop("checked", true);
        } else if (payType == 2) {
            /*$("[title='非交易类型']").attr("checked","checked")*/
            $("input[name='payType']:eq(1)").prop("checked", true);
        }
        console.log(da.maritalStatus)
        var maritalStatus = da.maritalStatus;
        if (maritalStatus == 0) {
            $("input[name='maritalStatus']:eq(0)").attr("checked", true);
            $("#spouseName").attr("disabled", true);
            $("#spouseIdentity").attr("disabled", true);
            $("[name='spouseName']").val("");//配偶姓名
            $("[name='spouseIdentity']").val("");//配偶身份证号码
        } else if (maritalStatus == 1) {
            $("input[name='maritalStatus']:eq(1)").attr("checked", true);
            $("#spouseName").attr("disabled", true);
            $("#spouseIdentity").attr("disabled", true);
            $("[name='spouseName']").val("");//配偶姓名
            $("[name='spouseIdentity']").val("");//配偶身份证号码
        } else if (maritalStatus == 2) {
            $("input[name='maritalStatus']:eq(2)").attr("checked", true);
            $("#spouseName").removeAttr("disabled");
            $("#spouseIdentity").removeAttr("disabled");
            $("[name='spouseName']").val(da.spouseName);//配偶姓名
            $("[name='spouseIdentity']").val(da.spouseIdentity);//配偶身份证号码
        }

        $("[name='orderId']").val(orderId);//订单编码
        $("[class='layui-input-block']:eq(0)")
        $("#userName").val(da.userName);//客户姓名
        $("[name='identity']").val(da.identity);//身份证号码
        $("[name='phone']").val(da.phone);//手机号码
        //婚配情况
        /*  $("[name='spouseName']").val(da.spouseName);//配偶姓名
          $("[name='spouseIdentity']").val(da.spouseIdentity);//配偶身份证号码*/
        $("[name='amount']").val(da.amount);//借款金额
        $("[name='moiveName']").val(da.moiveName);//借款时间
        $("[name='amountDays']").val(da.amountDays);//借款天数
        //收费方式
        $("[name='rate']").val(da.rate);//费率
        $("[name='brokerage']").val(da.brokerage);//收费金额
        $("[name='totalAmount']").val(da.totalAmount);//总负债金额
        $("[name='houseName']").val(da.houseName);//总房产名称
        $("[name='area']").val(da.area);//面积
        $("[name='address']").val(da.address);//房产所在地
        $("[name='assessment']").val(da.assessment);//房产评估
        $("[name='ownerName']").val(da.ownerName);//产权人姓名
        $("[name='originalBank']").val(da.originalBank);//源贷款银行
        $("[name='amountBlance']").val(da.amountBlance);//原贷款余额
        $("[name='originalAmount']").val(da.originalAmount);//原贷款金额
        $("[name='newBank']").val(da.newBank);//新贷款银行
        $("[name='newAmount']").val(da.newAmount);//新贷款金额
        $("[name='managerName']").val(da.managerName);//客户经理姓名
        $("[name='managerPhone']").val(da.managerPhone);//客户经理手机号码
        $("[name='dealPrice']").val(da.dealPrice);//成交价格
        $("[name='orderAmount']").val(da.orderAmount);//定金金额
        $("[name='superviseAmount']").val(da.superviseAmount);//监管金额
        $("[name='buyerName']").val(da.buyerName);//买家姓名
        $("[name='buyerIdentity']").val(da.buyerIdentity);//买家身份证
        $("[name='privateLending']").val(da.privateLending);//民间借贷情况
        $("[name='lawsuitCase']").val(da.lawsuitCase);//诉讼情况
        $("[name='paragraphTime']").val(da.paragraphTime);//预计出款时间
        $("[name='foreclosure']").val(da.foreclosure);//赎楼成数
        console.log(da.imgUp)
        for (var i = 0; i < da.imgUp.length; i++) {
            var index = da.imgUp[i].imageType - 1;
            $("[class='z_photo upimg-div clear']:eq(" + index + ")").prepend("<section isDb='" + da.imgUp[i].imgUrl + "' class='up-section fl' attrname='customer' attr-index='1'>" +
                "<span class='up-span'></span><img class='close-upimg' src='../images/img/a7.png'>" +
                "<img class='up-img' src='http://106.52.92.57/img/" + da.imgUp[i].imgUrl + "'>" +
                "<p class='img-name-p'>" + da.imgUp[i].imgUrl + "</p>" +
                "</section>");

            //判断图片是否有五张 若有则隐藏上传图片的按钮
            $("[class='z_photo upimg-div clear']:eq(" + index + ")").each(function () {
                var slength = $(this).find("section").length;
                if (slength == 6) {
                    $(this).find("section:eq(5)").hide();
                }
            })
        }

        //删除图片

        $("[class='close-upimg']").click(function () {
            $("#imgAside2").show();
            /* $(this).parent().parent().find("[class='z_file fl']").show();
             $(this).parentsUntil("[class='z_photo upimg-div clear']")
             $(this).parent().remove();*/
            delTarget = $(this).next().attr("src");
        })

        //更新单选按钮
        form.render('radio');
    })
}

//orderId


/*$("input[name='maritalStatus']").click(function () {
    var maritalStatus = $("input[name='maritalStatus']:checked").val();
    alert("ddd")
    if (maritalStatus == 0) {
        alert("fdsf")
        $("#spouseName").attr("disabled", true);
        $("#spouseIdentity").attr("disabled", true);
        $("#spouseName").attr("lay-verify", "");
        $("#spouseIdentity").attr("lay-verify", "");
    } else if (maritalStatus == 1) {
        $("#spouseName").attr("disabled", true);
        $("#spouseIdentity").attr("disabled", true);
        $("#spouseName").attr("lay-verify", "");
        $("#spouseIdentity").attr("lay-verify", "");
    } else if (maritalStatus == 2) {
        $("#spouseName").removeAttr("disabled");
        $("#spouseIdentity").removeAttr("disabled");
        $("#spouseName").attr("lay-verify", "required");
        $("#spouseIdentity").attr("lay-verify", "required");
        $("[name='spouseName']").val(spouseName);//配偶姓名
        $("[name='spouseIdentity']").val(spouseIdentity);//配偶身份证号码
    }
})*/


// alert(getParams("orderId"))
getOrderInfo(getParams("orderId"));
//getOrderInfo("1")
//图片删除

$(function () {
    //图片删除
    $("#ImgOk2").click(function () {
        $(this).parent().parent().parent().hide();
        $("#userInfo8 img").each(function () {
            if ($(this).attr("src") == delTarget) {
                $(this).parent().parent().find("[class='z_file fl']").show();
                $(this).parent().remove();
            }
        })

    })

    //取消
    $("#ImgCenal2").click(function () {
        $("#imgAside2").hide();
    })

})


$(function () {
    let delParent;
    let defaults = {
        fileType: ["jpg", "png", "bmp", "jpeg"],   // 上传文件的类型
        fileSize: 1024 * 1024 * 10                  // 上传文件的大小 10M
    };

    function getId(id) {
        return document.getElementById(id);
    }

    //客户资料数组
    let customer = [];
    //房产资料
    let RealEstate = [];
    //银行资料
    let BankImg = [];
    //账户资料
    let Account = [];
    //面签资料
    let FaceSigned = [];
    //其他
    let Other = [];

    let id;
    let arr_index;
    let arr_Name;
    /*点击图片的文本框*/
    $(".file").on('change', function () {
        let idFile = $(this).attr("id");
        let file = document.getElementById(idFile);
        let imgContainer = $(this).parents(".z_photo"); //存放图片的父亲元素
        let fileList = file.files; //获取的图片文件
        let input = $(this).parent();//文本框的父亲元素
        let imgArr = [];
        //遍历得到的图片文件
        let numUp = imgContainer.find(".up-section").length;
        let totalNum = numUp + fileList.length;  //总的数量
        if (fileList.length > 5 || totalNum > 5) {
            alert("上传图片数目不可以超过5个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
        } else if (numUp < 5) {
            fileList = validateUp(fileList);
            for (let i = 0; i < fileList.length; i++) {
                let imgUrl = window.URL.createObjectURL(fileList[i]);
                imgArr.push(imgUrl);

                // let $section = $("<section class='up-section fl loading'>");
                let $section;
                //为img属性附上数组与索引
                switch (idFile) {
                    //客户资料
                    case "file1":
                        customer.push(fileList[i]);
                        // console.log("客户资料:", customer);
                        $section = $("<section class='up-section fl loading' attrName='customer' attr-index=" + (customer.length - 1) + ">");
                        break;
                    case "file2":
                        RealEstate.push(fileList[i]);
                        // console.log("房产资料:", RealEstate);
                        $section = $("<section class='up-section fl loading' attrName='RealEstate' attr-index=" + (RealEstate.length - 1) + ">");
                        break;
                    case "file3":
                        BankImg.push(fileList[i]);
                        // console.log("银行资料:", BankImg);
                        $section = $("<section class='up-section fl loading' attrName='BankImg' attr-index=" + (BankImg.length - 1) + ">");
                        break;
                    case "file4":
                        Account.push(fileList[i]);
                        // console.log("账号资料:", Account);
                        $section = $("<section class='up-section fl loading' attrName='Account' attr-index=" + (Account.length - 1) + ">");
                        break;
                    case "file5":
                        FaceSigned.push(fileList[i]);
                        // console.log("面签资料:", FaceSigned);
                        $section = $("<section class='up-section fl loading' attrName='FaceSigned' attr-index=" + (FaceSigned.length - 1) + ">");
                        break;
                    case "file6":
                        Other.push(fileList[i]);
                        // console.log("其他:", Other);
                        $section = $("<section class='up-section fl loading' attrName='Other' attr-index=" + (Other.length - 1) + ">");
                        break;
                }
                imgContainer.prepend($section);
                let $span = $("<span class='up-span'>");
                $span.appendTo($section);

                //关闭按钮事件
                let $img0 = $("<img class='close-upimg'>").on("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $("#imgAside").show();
                    delParent = $(this).parent();
                    arr_index = delParent.attr("attr-index");
                    arr_Name = delParent.attr("attrname");
                    //客户资料 customer,房产资料 RealEstate,银行资料 BankImg,账户资料 Account,面签资料 FaceSigned,其他 Other

                });

                $img0.attr("src", "../images/img/a7.png").appendTo($section);
                let $img = $("<img class='up-img up-opcity'>");
                $img.attr("src", imgArr[i]);
                $img.appendTo($section);
                let $p = $("<p class='img-name-p'>");
                $p.html(fileList[i].name).appendTo($section);
                let $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                $input.appendTo($section);
                let $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                $input2.appendTo($section);
            }
        }
        setTimeout(function () {
            $(".up-section").removeClass("loading");
            $(".up-img").removeClass("up-opcity");
        }, 450);
        numUp = imgContainer.find(".up-section").length;
        if (numUp >= 5) {
            $(this).parent().hide();
        }
    });


    /**
     * 根据Js原型扩展Array方法, 去除数组中空白数据
     */
    Array.prototype.notempty = function () {
        let arr = [];
        this.map(function (val, index) {
            //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
            if (val !== "" && val !== undefined) {
                arr.push(val);
            }
        });
        return arr;
    };

    //客户资料 customer,房产资料 RealEstate,银行资料 BankImg
    // 账户资料 Account,面签资料 FaceSigned,其他 Other
    $("#add").on("click", function () {
        $("#submitAside").show();

    });
    $("#submitOk").on("click", function () {
        console.log("客户资料:", customer.notempty());//3
        console.log("房产资料:", RealEstate.notempty());//2
        console.log("银行资料:", BankImg.notempty());//5
        console.log("账户资料:", Account.notempty());
        console.log("面签资料:", FaceSigned.notempty());
        console.log("其他:", Other.notempty());
        let fromData = new FormData();
        let DataName = ["customer", "RealEstate", "BankImg", "Account", "FaceSigned", "Other"];
        let DataArray = [
            customer.notempty(), RealEstate.notempty(), BankImg.notempty(), Account.notempty(),
            FaceSigned.notempty(), Other.notempty()
        ];
        for (let j = 0; j < DataArray.length; j++) {
            for (let i = 0; i < DataArray[j].length; i++) {
                if (DataArray[j].length > 0) {
                    fromData.append(DataName[j].toString(), DataArray[j][i]);
                    console.log("fileName:" + DataName[j] + ";内容:", DataArray[j][i]);
                    console.log(DataName[j] + ":" + DataArray[j].length)
                }
            }
        }
        // fromData.append("OrderId", data.data);
        var params = $("#user").serialize();//获取表单信息
        var imgNames = [];//用来记录从数据库中获取的所有图片名称
        var isdb;//记录单个图片名称
        $("[class='z_photo upimg-div clear'] section").each(function () {
            isdb = $(this).attr("isdb");
            if (isdb != null && isdb != '') {
                imgNames.push(isdb);
            }
        })
        fromData.append("imgNames", imgNames);
        jQuery.ajax({
            url: "/upOrderByOrderId?" + params,
            dataType: "json",
            type: "post",
            processData: false,
            contentType: false,
            data: fromData,
            beforeSend: function () {
                layer.msg("信息正在修改中,请稍等片刻...");
            },
            success: function (data) {
                console.log("data=====>>>>"+data.result);
                if (data.result) {
                    layer.msg("修改成功", {time: 2000}, function () {
                        //关闭当前frame
                        xadmin.close();
                        //对父窗体刷新
                        xadmin.father_reload();
                    });
                }
            },error:function () {
                layer.msg("修改失败", {time: 2000});
            }
        })
    });

    $("#submitCancel").click(function () {
        $("#submitAside").hide();
    });


    $("#ImgOk").on("click", function () {
        $("#imgAside").hide();
        let numUp = delParent.siblings().length;
        console.log("所属数组名称:" + arr_Name);
        console.log("数组索引为:" + arr_index);
        //客户资料 customer,房产资料 RealEstate,银行资料 BankImg,账户资料 Account,面签资料 FaceSigned,其他 Other
        switch (arr_Name) {
            case "customer":
                delete customer[arr_index];
                // console.log(customer);
                break;
            case "RealEstate":
                delete RealEstate[arr_index];
                // console.log(RealEstate);
                break;
            case "BankImg":
                delete BankImg[arr_index];
                // console.log(BankImg);
                break;
            case "Account":
                delete Account[arr_index];
                // console.log(Account);
                break;
            case "FaceSigned":
                delete FaceSigned[arr_index];
                // console.log(FaceSigned);
                break;
            case "Other":
                delete Other[arr_index];
                // console.log(Other);
                break;
        }
        if (numUp < 6) {
            delParent.parent().find(".z_file").show();
        }
        delParent.remove();
    });

    $("#ImgCenal").click(function () {
        $("#imgAside").hide();
    });


    function validateUp(files) {
        let arrFiles = [];//替换的文件数组
        for (let i = 0, file; file = files[i]; i++) {
            //获取文件上传的后缀名
            let newStr = file.name.split("").reverse().join("");
            if (newStr.split(".")[0] != null) {
                let type = newStr.split(".")[0].split("").reverse().join("");
                if (jQuery.inArray(type, defaults.fileType) > -1) {
                    // 类型符合，可以上传
                    if (file.size >= defaults.fileSize) {
                        alert(file.size);
                        alert('您这个"' + file.name + '"文件大小过大');
                    } else {
                        // 在这里需要判断当前所有文件中
                        arrFiles.push(file);
                    }
                } else {
                    alert('您这个"' + file.name + '"上传类型不符合');
                }
            } else {
                alert('您这个"' + file.name + '"没有类型, 无法识别');
            }
        }
        return arrFiles;
    }

    $("body").on("keydown", function (e) {
        if (e.keyCode === 27) {
            $(".works-mask").hide();
        }
    })
});
