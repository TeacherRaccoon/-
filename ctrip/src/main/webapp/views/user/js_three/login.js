var layer = null;
layui.use('element', function () {
    layer = layui.layer;
})


function  login(){
    var logName = $("#nloginname").val();
    var pwd = $("#npwd").val();

    console.log(logName + "_" + pwd);

    sendAjax("http://localhost:8080/user/login", {loginName: logName, password: pwd}, "POST", "JSON",
        function (data) {
            if (data.result) {
                layer.msg(data.msg);
                //获取用户头像等其他信息
                sendAjax("http://localhost:8080/user/getImg",{loginName:logName},"POST","JSON",function (data) {
                  var imgs = data.data.imgUrl;
                  console.log(imgs);

                   sessionStorage.setItem("userImg",imgs);
                })
                setTimeout(function () {
                    //登录成功保存用户名：
                    sessionStorage.setItem("loginName", logName);
                    location.href = "http://localhost:8080/views/ctrip/ctrip_index.html";
                }, 5000)
            } else {
                layer.msg(data.msg);
            }
        })
}

//登录验证
    $("#nsubmit").click(function () {
            login();
    })



$("body").keypress(function (e) {
    var code = e.keyCode;
    if (code == 13) {
        login();
    }
})