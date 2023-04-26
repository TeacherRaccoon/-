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


    //*********************新的上传获取传过来的值*********************************************
    function getParams(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    layui.use(['form', 'layer'],
        function () {
            $ = layui.jquery;
            var form = layui.form,
                layer = layui.layer;
        });

    function switchItem(tag) {
        if (tag == '非交易类型') {
            $("#userInfo6").hide()
        } else {
            $("#userInfo6").show()
        }
    }

//退出
    function backs() {
        //关闭当前frame
        xadmin.close();
    }


    $("#add").click(function () {
        tuanBut(getParams("orderId"), getParams("financeId"))
    });


//财务上传出款凭证
    function tuanBut(orderId, financeId) {
        layer.confirm('是否上传凭证？', function () {
            // console.log("客户资料:", upFiles.notempty());//3
            console.log(financeId)
            let fromData = new FormData();

            //文件数据
            let fileDate = upFiles.notempty();//去除非空内容
            for(let i = 0;i<fileDate.length;i++){
                fromData.append("upFiles",fileDate[i]);//将数据追加到fromDate中
                console.log(fromData);
            }
            fromData.append("imgType",7);//文件类型为7（出款凭证）
            fromData.append("orderId",orderId);//订单编码orderId
            fromData.append("operatedId",financeId);//
            fromData.append("status",13);
            jQuery.ajax({
                url: "/upFiles",
                dataType: "json",
                type: "post",
                processData: false,
                contentType: false,
                data: fromData,
                beforeSend: function () {
                    layer.msg("正在上传！请稍等...")
                },
                success: function (data) {
                    console.log(data);
                    if (data.result){
                        layer.alert("上传成功!", {
                                icon: 1
                            },
                            function () {
                                //关闭当前frame
                                xadmin.close();
                                // 可以对父窗口进行刷新
                                xadmin.father_reload();
                            });
                    } else {
                        layer.msg('上传失败!',{icon:2,time:1000});
                    }
                }
            })
        });
    }

//*******************新的上传**************************


    /***
     * 获取id方法
     * @param id
     * @returns {HTMLElement}
     */
    function getId(id) {
        return document.getElementById(id);
    }

    //上传资料数组
    let upFiles = [];

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

                upFiles.push(fileList[i]);
                // console.log("客户资料:", customer);
                $section = $("<section class='up-section fl loading' attrName='upFiles' attr-index=" + (upFiles.length - 1) + ">");


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


    $("#submitOk").on("click", function () {
        console.log("客户资料:", upFiles.notempty());//3

        let fromData = new FormData();

        //文件数据
        let fileDate = upFiles.notempty();//去除非空内容
        for(let i = 0;j<fileDate.length;i++){
            fromData.append("upFiles",fileDate[i]);//将数据追加到fromDate中
            console.log(fromData);
        }


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

        delete upFiles[arr_index];

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

