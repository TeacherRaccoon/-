

//获取URL传过来的id
var id = getParam();
console.log(id);

//发送请求查询旅客信息
sendAjax("http://localhost:8080/user/getPassengerByid",{id:id},"POST","JSON",
    function (data) {
        console.log(data.data);
        var passenger = data.data;

        if(passenger.name!=null){
            $("#txt_namecn").html(passenger.name);//旅客姓名
        }
        if(passenger.englishName!=null){
            $("#txt_middlename").html(passenger.englishName);//英文名
        }
        if(passenger.nationalityId!=null){
            $("#txt_country").html(passenger.nationalityId);//国籍
        }
        if(passenger.gender!=null){
            var sex = passenger.gender == 1?"男":"女";
            $("#txt_sex").html(sex);//性别
        }
        if(passenger.birthday!=null){
            $("#txt_birth").html(passenger.birthday);//生日
        }
        if(passenger.birthPlace!=null){
            $("#txt_address").html(passenger.birthPlace);//出生地
        }
        if(passenger.phone!=null){
            $("#txt_mobile").html(passenger.phone);//手机号码
        }
        if(passenger.tel!=null){
            $("#txt_contactTel").html(passenger.tel);//固话
        }
        if(passenger.fox!=null){
            $("#txt_contactFax").html(passenger.fox);//传真
        }
        if(passenger.email!=null){
            $("#txt_email").html(passenger.email);//邮箱
        }
        if(passenger.certificateType !=null){
            $("#cardType").html(passenger.certificateType);//证件类型
            $("#cardNum").html(passenger.certificateNumber);//证件号码
        }



    })