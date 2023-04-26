var loginName = sessionStorage.getItem("loginName");

//页面功能
function page(){
    //全选
    $("[name=\"allSel\"]").click(function () {
        if($(this).is(":checked")){
            $("[name='select']").prop('checked',true);
        }else{
            $("[name='select']").prop('checked',false);
        }
    })



}
page();


//查询所有的旅客信息
function getPassengerList(name,LoginName){
    //获取所有旅客总数
    sendAjax("http://localhost:8080/user/getPassenger",{name:name,loginName:loginName},"POST","JSON",
        function (data) {
            var da = data.data;
            $("tbody tr:gt(0)").remove();
            //渲染数据
            for(var i=0;i<da.length;i++){
                var $_tr = $("<tr rid='"+da[i].id+"'></tr>");//新建一个tr
                var sex = da[i].gender == 1 ?"男":"女"
                var td =    "        <td class='check_box'><input type='checkbox' name='select' onclick='javascript:checked02()' value='"+da[i].id+"'></td>"+
                    "        <td class='check_box'></td>"+
                    "        <td>"+da[i].name+"</td>"+
                    "        <td>"+da[i].phone+"</td>"+
                    "        <td>身份证</td>"+
                    "        <td>"+da[i].certificateNumber+"</td>"+
                    "        <td>"+da[i].nationalityId+"</td>"+
                    "        <td>"+sex+"</td>"+
                    "        <td>无</td>"+
                    "        <td><a href='PassengerInfoShow.html?id="+da[i].id+"' class='mr20 act_look_s'>查看</a><a href='PassengerInfoEdit.html?id="+da[i].id+"' class='mr20 act_modify_s'>编辑</a><a"+
                    "                class='act_del_s' href='javascript:delByPid("+da[i].id+")'>删除</a></td>"
                //将td写入tr
                $_tr.html(td);
               // 追加到table后面
                $("tbody").append($_tr);
            }
        })

}

//获取旅客信息的方法的调用
getPassengerList("",loginName);

//checkbox 单击时触发的方法
function checked02(){
    //单选
        //遍历每一个 select是否为选中状态
        var flag = true;
        $("[name='select']").each(function () {
            if(!$(this).is(":checked")){
                flag = false;
            }
        })
        //不为全选中状态
        if(flag){
            $("[name=\"allSel\"]").prop("checked",true);
        }else{
            $("[name=\"allSel\"]").prop("checked",false);
        }
}
//查询功能
$("#bt_Search").click(function () {
    var name = $("#txt_keyword").val();
    getPassengerList(name,loginName);
})

//回车键查询功能
$("body").keypress(function (e) {
    if(e.keyCode ==13){
        var name = $("#txt_keyword").val();
        getPassengerList(name,loginName);
    }
})
//批量删除
function delPassenger(){

    var passengerIds = new Array();
    var i = 0;
    $("[name='select']").each(function () {
        if( $(this).is(":checked")){
            passengerIds[i] = $(this).val(); //将被选中的旅客 id  放入数组中，
            i ++;
        }
    })
    if(passengerIds.length > 0){
      console.log(passengerIds);
        layer.confirm('确认要删除吗？', {
            btn: ['嗯嗯','再想想'] //按钮
        }, function(){
            console.log(passengerIds);
            //发送请求删除旅客信息
            sendAjax("http://localhost:8080/user/delPassenger",{params:passengerIds},"POST","JSON",
                function (data) {
                    layer.msg("删除成功！");
                    if(data.result){
                        setTimeout(function () {
                            location.href="PassengerList.html"
                        },1000)
                    }
                })
        });
    }
}

//单个删除
function delByPid(da){
    layer.confirm('您确定要删除吗？', {
        btn: ['是的','再考虑一下'] //按钮
    }, function(){
        var das = new Array();
        das[0] = da;
        sendAjax("http://localhost:8080/user/delPassenger",{params:das},"POST","JSON",
            function (data) {
                layer.msg("删除成功！");
                if(data.result){
                    setTimeout(function () {
                        location.href="PassengerList.html"
                    },1000)
                }
            })
    });
}
