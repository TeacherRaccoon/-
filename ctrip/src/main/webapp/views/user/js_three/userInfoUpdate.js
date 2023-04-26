
function page() {
    var laydate = null;
    layui.use('laydate',function () {
        laydate = layui.laydate;
    })

    //收起和编辑操作   编辑时隐藏显示信息，显示编辑内容 收起隐藏编辑内容，显示显示框 #info_icon_id
    $("#button_edit").click(function () {
        $(".view_model").hide();
        $(".edit_model").show();
    })

    $("#info_icon_id").click(function () {
        $(".view_model").show();
        $(".edit_model").hide();
    })

    //头像设置的收起和显示
    $("#shouqi").click(function () {
        $("#myPicture").hide();
    })

    $("h3:eq(1)").click(function () {
        $("#myPicture").show();
    });


    //编辑生日时的日历
    //选中后的回调
    laydate.render({
        elem: '#test20'
        ,done: function(value, date){
        }
    });
    //编辑信息时城市的下拉框
    sendAjax("http://localhost:8080/user/getCity","","POST","JSON",function (data) {
        var da= data.data;
        /*for(var i=0;i<=da.length;i++){
            var $_op = $("<option value='"+i+"')>"+da[i].cityName+"</option>")
            $("#myCity").append($_op);
        }*/
    })
}

//加载页面功能
page();


//获取用户信息并渲染到页面上
function getUserInfo() {
    //获取用户名：
    var loginName = sessionStorage.getItem("loginName");

    //获取用户信息
    sendAjax("http://localhost:8080/user/getUserByL", {loginName: loginName}, "POST", "JSON",
        function (data) {
            var da = data.data;
            //渲染数据
            if (da.phone != null) {
                $("#li_edit_mobile span:eq(0)").html(da.phone);//电话
                $("#li_save_mobile span:eq(0)").html(da.phone);
            }
            if (da.email != null) {
                $("#li_edit_email span:eq(0)").html(da.email);//邮箱
                $("#li_save_email span:eq(0)").html(da.email);
            }
            if (da.petName != null) {
                $("#li_edit_nickname span:eq(0)").html(da.petName);//昵称
                $("#nickName").attr("placeholder",da.petName);
            }
            if (da.userName != null) {
                $("#li_edit_username span:eq(0)").html(da.userName);//用户真实姓名
                $("#name").attr("placeholder",da.userName);
            }
            if (da.gender != null) {
                var ge = da.gender-1;
                var gender1 = da.gender == 1 ? "男" : "女";
                $("#li_edit_sex span:eq(0)").html(gender1);//性别
                $("[name='sex']:eq("+ge+")").prop("checked",true);
            }
            if (da.birthday != null) {
                $("#li_edit_birth span:eq(0)").html(da.birthday);//生日
                $("#test20").attr("placeholder",da.birthday);
            }
            if (da.tel != null) {
                $("#li_edit_tel span:eq(0)").html(da.tel);//固话
                $("#phone").attr("placeholder",da.tel);
            }
            if (da.departureCity != null) {
                var index = da.departureCity-1;
                var cityName = null;
                //获取常用出发城市的名称
                sendAjax("http://localhost:8080/user/getCity","","POST","JSON",function (data) {
                    cityName = data.data[index].cityName;
                    $("#li_edit_homeCity span:eq(0)").html(cityName);//常用出发城市
                })
               $("select option:eq("+index+")").prop("selected","selected");
            }

        })



}

getUserInfo();


//保存数据
$("#btnSave").click(function () {
    var petName = $("#nickName").val();//昵称
    var userName = $("#name").val();//真实姓名：
    var gender = $("[name='sex']:checked").val();//性别；
    var birthday = $("#test20").val();//生日
    var tel =  $("#phone").val();//固话
    var departureCity = $("#myCity").val();//常用出发城市；
var loginName = sessionStorage.getItem("loginName");
    params={petName:petName,userName:userName,gender:gender,birthday:birthday,tel:tel,departureCity:departureCity,loginName:loginName}

    //发送请求修改数据
    sendAjax("http://localhost:8080/user/editUserInfo",params,"POST","JSON",function (data) {
       layer.msg(data.msg);
        setTimeout(function () {
            location.href="http://localhost:8080/views/user/userInfoUpdate.html"
        },1000)
    })

})



layui.use('upload', function() {
    var $ = layui.jquery
        , upload = layui.upload;

    //普通图片上传
    layui.use('upload', function () {
        var $ = layui.jquery
            , upload = layui.upload;

        //普通图片上传
        var loginName = sessionStorage.getItem("loginName");

        var uploadInst = upload.render({
            elem: '#test1'
            ,url: 'http://localhost:8080/user/addPicture?loginName='+loginName
            ,methor:"post"
            ,data:{da:123}
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#demo1').attr('src', result); //图片链接（base64
                });
            }
            ,done: function(res){
                console.log(res);
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }
                //上传成功
            }
            ,error: function(){
                //演示失败状态，并实现重传
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function(){
                    uploadInst.upload();
                });
            }
        });



    })

})
