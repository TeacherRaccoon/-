$(function () {
    var loginName = sessionStorage.getItem("loginName")
    $("#userName").attr("placeholder",loginName);


    var newpwd = null;//第一次输入新密码
    var repwd = null;//第二次输入新密码
    var pwdPass = null;
    //检验密码格式
    $("#password1").bind("blur", function () {
        pwdPass = checkSafePwd($("#password1"), $("#password2"), $("#errPassword"), $("#errRepassword"), $("#strongPwd1"), $("#strongPwd2"), $("#strongPwd3"));
    });

    //校验确认密码
    $("#password2").bind("blur", function () {
        newpwd=$("#password1").val();
        repwd=$("#password2").val();

        if(newpwd!=repwd){
            errShow($("#errRepassword"), true, getSafeCenterMessage("modifypwdsdk")[10116]);
        }else{
            errShow($("#errRepassword"), false, getSafeCenterMessage("modifypwdsdk")[10116]);
        }
    });


    //修改密码
    $("#btnSubmit").click(function () {
        newpwd=$("#password1").val();
        if(newpwd == repwd && pwdPass){//密码格式验证通过并且两次密码输入一致。执行修改密码
            sendAjax("http://localhost:8080/user/updatePassword",{loginName:loginName,password:newpwd},"POST","JSON",
                function (data) {
                    layer.msg(data.msg);
                    setTimeout(function () {
                        location.href="http://localhost:8080/views/user/login.html"
                    },1000)
                })
        }
    })

})