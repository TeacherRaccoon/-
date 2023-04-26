//页面功能*********************************
//全选
$("[name='allcheck']").click(function () {

    if ($(this).is(":checked")) {
        $("[name='check']").prop("checked", true);
    } else {
        $("[name='check']").prop("checked", false);
    }

})

function checkbox01() {
    //单选
    $("[name='check']").click(function () {
        var flag = false;
        //遍历每一个checkbox 如果全选中则全选的checkbox被选中 否则不然
        $("[name='check']").each(function () {
            if (!$(this).is(":checked")) {
                flag = true;
            }
        })

        if (flag) {
            $("[name='allcheck']").prop("checked", false);
        } else {
            $("[name='allcheck']").prop("checked", true);
        }

    })
}

//业务功能*******************************************
//单击查询时触发的功能
$("#bt_Search").click(function () {
   search();
})

function search() {
    $("[name='allcheck']").prop("checked", false);
    var name = $("#txt_keyword").val();
    //移除掉页面之前的数据
    $("[name='contactList']").remove();
    getContactList(name, loginName);
}
$("body").keypress(function (e) {//按下确认键执行查询
    if(e.keyCode == 13){
        search();
    }
})
var loginName = sessionStorage.getItem("loginName");

//显示常用联系人信息
function getContactList(name, loginName) {
    sendAjax("http://localhost:8080/user/getContact", {name: name, loginName: loginName}, "POSt", "JSON",
        function (data) {
            var da = data.data;
            //渲染数据
            for (var i = 0; i < da.length; i++) {
                //判断是否为默认联系人
                var isDefault = da[i].contactType == 1 ? "<i class='default-tag' >默认</i>" : "";
                var $_tr = $("<tr name='contactList'></tr>");

                var td = "                            <td class='check_box'><input type='checkbox' name='check' value='" + da[i].id + "'></td>" +
                    "                            <td class='check_box'>" + isDefault + "</td>" +
                    "                            <td>" + da[i].name + "</td>" +
                    "                            <td>" + da[i].phone + "</td>" +
                    "                            <td>" + da[i].email + "</td>" +
                    "                            <td><a href='ContactEdit.html?id=" + da[i].id + "' class='mr20 act_modify_s'>编辑</a><a class='act_del_s' href='javascript:delContact(" + da[i].id + ")'>删除</a>" +
                    "                            </td>"

                $_tr.html(td);
                $("tbody").append($_tr);
            }
            checkbox01();//单选框全选中时...功能
        })
}

getContactList("", loginName);

//单个删除功能
function delContact(da) {
    var params = []
    params[0] = da;
    layer.confirm('确认要删除吗？', {
        btn: ['嗯嗯', '再想想'] //按钮
    }, function () {
        sendAjax("http://localhost:8080/user/delContact", {params: params}, "POST", "JSON", function (data) {
            layer.msg(data.msg);
            if (data.result) {
                setTimeout(function () {
                    location.href = "ContactList.html";
                }, 1000)
            }
        })
    })
}

//批量删除功能
function delSelect() {
    var i = 0;//params 的下标
    var params = [];
    $("[name='check']").each(function () {
        if ($(this).is(":checked")) {
            var ids = $(this).val();
            params[i] = ids;
            console.log(ids);
        }
        i++;
    })
    if (params.length > 0) { //只有选择了要删除的内容时才有该提示
        layer.confirm('确认删除选中？', {
            btn: ['嗯嗯', '再想想'] //按钮
        }, function () {
            sendAjax("http://localhost:8080/user/delContact",{params:params},"POST","JSON",
                function (data) {
                    layer.msg(data.msg);
                    if(data.result){
                        setTimeout(function () {
                            location.href="ContactList.html";
                        },1000)
                    }
                })
        })
    }
}
