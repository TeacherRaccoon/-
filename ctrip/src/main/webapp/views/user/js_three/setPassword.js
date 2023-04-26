$(function () {
var pwdPass = null; //标识格式验证是否通过
    //检验密码格式
    $("#password1").bind("blur", function () {
        pwdPass = checkSafePwd($("#password1"), $("#password2"), $("#errPassword"), $("#errRepassword"), $("#strongPwd1"), $("#strongPwd2"), $("#strongPwd3"));
    });

    //校验确认密码
    $("#password2").bind("blur", function () {
        var newpwd=$("#password1").val();
        var repwd=$("#password2").val();

        console.log(newpwd+"--"+repwd);
        console.log(newpwd==repwd);
        if(newpwd!=repwd){
            errShow($("#errRepassword"), true, getSafeCenterMessage("modifypwdsdk")[10116]);
        }else{
            errShow($("#errRepassword"), false, getSafeCenterMessage("modifypwdsdk")[10116]);
        }
    });


    var mobileNumber = getParam();
    console.log("电话号码："+mobileNumber);

    $("#btnSubmit").click(function () {

        var userName = $("#userName").val();
        var password = $("#password2").val();
        var password2 = $("#password1").val();

        if(password == password2 && pwdPass){
            sendAjax("http://localhost:8080/user/register",{phone:mobileNumber,loginName:userName,password:password},"POST","JSON",
                function (data) {
                layer.msg(data.msg);
                    if(data.result == true){
                        $("[class='reg_step'] li:eq(2)").attr("class","current");
                        layer.mst("注册成功！稍后返回登录界面。");
                        setTimeout(function(){
                            location.href="http://localhost:8080/views/user/login.html";
                        },1000)
                    }else{
                        layer.msg(data.msg);
                    }

                })
        }
    })


})