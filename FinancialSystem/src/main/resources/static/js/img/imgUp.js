$(function () {
    let delParent;
    let defaults = {
        fileType: ["jpg", "png", "bmp", "jpeg", "zip", "rar", "word"],   // 上传文件的类型
        fileSize: 1024 * 1024 * 10                  // 上传文件的大小 10M
    };
    layui.use(['form', "laydate"], function () {
        //表单验证
        let form = layui.form;
        //日期选择器
        let laydate = layui.laydate;
        laydate.render({
            elem: "#moiveName2",
            type: "date"
        });


        //客户资料 customer,房产资料 RealEstate,银行资料 BankImg
        // 账户资料 Account,面签资料 FaceSigned,其他 Other
        //表单验证,如果表单有问题则不弹出确认显示框
        $("#add").on("click", function () {
            form.on('submit(*)', function (data) {
                $("#submitAside").show();
                console.log(data.elem); //被执行事件的元素DOM对象，一般为button对象
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            })
        });
    });

    /***
     * 获取id方法
     * @param id
     * @returns {HTMLElement}
     */
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
                console.log(idFile);
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

    // $(".file").on("change", function () {
    //     id = $(this).attr("id");
    //     let input = getId(id);
    //     console.log("inputId:"+input.id);
    //         //图片索引
    //         let imgIndex = $(this).parents().parents().find(".up-section");
    //         console.log(fileList[i].name);
    //         //id file1:客户资料  file2:房产资料  file3:银行资料  file4:账户资料  file5:面签资料 file6:其他
    //         // console.log(input.id);
    //
    //
    //     }
    //     // console.log(customer);
    // });
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
        var c = $("#user").serialize();
        /*alert(JSON.stringify(c));*/
        jQuery.ajax({
            url: "/addInfoEntry?" + c,
            dataType: "json",
            type: "post",
            processData: false,
            contentType: false,
            data: fromData,
            beforeSend: function () {
                layer.msg("信息正在上传中,请稍等片刻...");
            },
            success: function (data) {
                if (data.result) {
                    layer.msg("上传成功", {time: 3000}, function () {
                        //关闭当前frame
                        xadmin.close();
                        //对父窗体刷新
                        xadmin.father_reload();
                    });
                }
            },error:function () {
                layer.msg("上传失败", {time: 3000});
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
