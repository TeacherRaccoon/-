var flag = false;
var phone = null;
$("#mobilephone").bind("input propertychange", function () {
    flag = false;
    var result = isPhone($(this).val());
    if (result == true) {
        phone = $(this).val();
        flag = true;
    }

})
var canclick = true;
$("#sendvalcode").click(function () {//返送短信的按钮
    if (canclick == true) {
        $(this).unbind("click");
        sendMsg();
        if (flag == true) {
            countTimes();
        }
    }

})

function sendMsg() {
    if (flag == true) {
        layer.msg("正在发送验证码！");
        sendAjax("http://localhost:8080/user/register01", {phone: phone}, "POST", "JSON", function (data) {
           layer.msg(data.msg);
        })
    } else {
        layer.msg("请输入正确的手机号码！");
    }
}

var tim = 60;

function countTimes() {
    var times = setInterval(function () {
        $("#sendvalcode").html(tim + "s后可重新发送");
        tim--;
        if (tim < 0) {
            canclick = true;
            tim = 60;//重置时间
            $("#sendvalcode").click(function () {
                if (canclick == true) {
                    $(this).unbind("click");
                    sendMsg();
                }
            })
            $("#sendvalcode").html("发送验证码");
            clearInterval(times)//清除定时
        }
    }, 1000)
}

//点击校验验证码
$("#register").click(function(){
   var valcode= $("#valcode").val();//获取用户输入的验证码 传到后台进行验证
    sendAjax("http://localhost:8080/user/validate",{code:valcode,phone:phone},"POST","JSON",
        function(data){
            console.log(data.msg);
        if(data.result == true){
            setTimeout(function(){location.href="setPassword.html?phone="+phone},1000);
        }

    })




})