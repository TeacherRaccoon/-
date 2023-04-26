var loginName = sessionStorage.getItem("loginName");


//日历  txt_birth

laydate.render({
    elem: '#txt_birth'
    ,done: function(value, date){
        console.log(value);
    }
});


$("[name=\"loginName\"]").val(loginName);


//添加旅客
function addPassenger(){
    var myform = $("form").serialize();
    console.log(myform);
    //发送请求修改数据
    sendAjax("http://localhost:8080/user/addPassenger",myform,"POST","JSON",
        function (data) {
            layer.msg(data.msg);
            if(data.result){
                setTimeout(function () {
                    location.href="PassengerList.html"
                },1000)
            }
        })
}

//保存按钮的单击事件
$("#bt_SaveAdd").click(function () {
    //调用添加旅客
    addPassenger();
})
$("body").keypress(function (e) {
    if( e.keyCode == 13){
        addPassenger();
    }
})