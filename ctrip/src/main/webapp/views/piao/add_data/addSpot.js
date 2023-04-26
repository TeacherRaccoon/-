

//在 https://piao.ctrip.com/dest/u-_b1_b1_be_a9/s-tickets/#ctm_ref=vat_hp_sb_lst 执行以下代码；
//获取景点详情的URL******************开始
var i = 0;
var data = new Array();
var getURL = setInterval(function() {
    $("[class='view-spot clearfix']:eq(" + i + ")").trigger("click")
    if (i >= 15) {
        clearInterval(getURL);
        console.log(data);
        $.ajax({
            url:"http://localhost:8080/ticket/addSpot", data:{
                data:
                data,cityId:cityId
            },type:
                "POST", dataType:"JSON",
            before:function() {//发送ajax前执行的函数
            },
            success:
                function(data) {
                    alert("正在插入！！！")
                },//发送成功后的回调函数
            error:
                function(jqxhr) {//请求错误时执行的函数
                },
            complete:
                function() {//请求完成后执行的函数
                }
        })
    }
    var str = document.URL;//获取页面的URL
    var params = str.split("/");
    console.log(params[params.length - 1].split(".")[0]);
    var param = params[params.length - 1].split(".")[0];
    i++;
    data[i] = param;
    var hiback = setInterval(function() {
        history.back();
    },5000)
    clearInterval(hiback);
},1000)
//获取景点详情的URL**********************结束
