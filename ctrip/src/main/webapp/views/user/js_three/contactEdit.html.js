
var id = getParam();//获取参数
//添加常用联系人
$("#bt_SaveAdd").click(function () {
var loginName = sessionStorage.getItem("loginName");
    var name = $("#txt_namecn").val();
    var phone = $("#txt_mobileF").val();
    var email = $("#txt_email").val();
    var contactType = 2;
    if($("#chkIsSelf").is(":checked")){
        contactType = 1;
    }
    var murl = null;
    if(id != null){//id 有值执行修改
        murl = "http://localhost:8080/user/upContact";
    }else{//没值执行插入
        murl = "http://localhost:8080/user/addContact";
    }

    sendAjax(murl,{loginName:loginName,name:name,phone:phone,email:email,contactType:contactType,id:id},"POST","JSON",
        function (data) {
            if(data.result){
                layer.msg(data.msg);
                setTimeout(function () {
                    location.href="ContactList.html";
                },1000)
            }
    })
})

//编辑联系人信息

if(id!=null){
    //将新增改为修改
    $("#lbl_Title").html("修改");

   //获取联系人信息
    sendAjax("http://localhost:8080/user/getContactById",{id:id},"POST","JSON",
        function (data) {
        var da = data.data;
            //渲染数据
        $("#txt_namecn").val(da.name);//真实姓名
        $("#txt_mobileF").val(da.phone);//电话
        $("#txt_email").val(da.email);//邮箱
            if(da.contactType == 1){//设置默认联系人
                $("#chkIsSelf").prop("checked",true);
            }
        })
}