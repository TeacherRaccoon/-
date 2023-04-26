//页面功能，点击添加旅客信息时增加一个li
function page() {
    var $_li = $("<li></li>")
    var lis = "<label class='tit'>航空公司</label><input class='m_input w05 ipt_ffp_nm' value=''"+
        "                                                                              maxlength='30' type='text'"+
        "                                                                              autocomplete='on'><input type='hidden'"+
        "                                                                                                       value=''"+
        "                                                                                                       class='ipt_ffp_nm_h'><label"+
        "                                            class='tit'>卡号</label><input class='m_input w05 ipt_ffp_no' value=''"+
        "                                                                         maxlength='30' type='text'><a href='###'"+
        "                                                                            class='ico_del' onclick='javascript:delp(this)'>删除</a>"
    $_li.html(lis);
    //追加到ul后面
    $("#travel_form").append($_li);

   var $_passenger = $(".li_add").clone();
    $(".li_add").remove();
    $("#travel_form").append($_passenger);

}

function addPassenger() {
    page();
}
function delp(da) {
    $(da).parent().remove();
}





//获取旅客信息
//发送请求查询旅客信息
function getInfo() {
    var id = getParam();
    $("#passengerId").val(id);
    sendAjax("http://localhost:8080/user/getPassengerByid", {id: id}, "POST", "JSON",
        function (data) {
            var da = data.data;
            $("#txt_namecn").val(da.name);//旅客姓名
            $("#txt_lastname").val(da.englishName);//英文名

            $("#txt_country").val(da.nationalityId);//国籍
            var sex = da.gender - 1;
            $("[name='gender']:eq(" + sex + ")").attr("checked", true);//性别
            $("#txt_birth").val(da.birthday);//生日
            $("#txt_address").val(da.birthPlace);//出生地
            $("#txt_mobile").val(da.phone);//手机号码
            if(da.tel!=null){
                var pretel = da.tel.split("-");
                $("#txt_contel_zone").val(pretel[0]);//区号
                $("#txt_contel_phone").val(pretel[1]);//固话号码
            }

            $("#txt_email").val(da.email);//邮箱
            if(da.fox!=null){
                var prefox = da.fox.split("-");
                $("#txt_confax_zone").val(prefox[0]);//区号
                $("#txt_confax_phone").val(prefox[1]);//传真号码
            }

            $("option:eq("+da.certificateType+")").attr("selected",true);
            $("[name=\"certificateNumber\"]").val(da.certificateNumber);//证件号码
        })
}

getInfo();


    laydate.render({
        elem: '#txt_birth'
        ,done: function(value, date){
            console.log(value);
        }
    });



//保存按钮的单击事件
$("#bt_SaveAdd").click(function () {
    var myform = $("form").serialize();
    console.log(myform);
    //发送请求修改数据
    sendAjax("http://localhost:8080/user/editPassenger",myform,"POST","JSON",
        function (data) {
            layer.msg(data.msg);
            if(data.result){
                setTimeout(function () {
                    location.href="PassengerList.html"
                },1000)
            }
        })
})