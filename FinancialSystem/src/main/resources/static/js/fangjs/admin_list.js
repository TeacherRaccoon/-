$(function () {
    getAdminListCount();
});

var name;
var role;
var registerDate;
$("#search").click(function () {
    registerDate= $("input[name=\"end\"]").val();
    name= $("input[name=\"username\"]").val();
    role= $("select[name=\"role\"]").val();
    getAdminListCount();
    return false;
});



/**
 * 获取管理员总数
 * @param name 姓名（模糊查询）
 * @param role 角色
 * @param registerDate 注册时间（模糊查询）
 */
function getAdminListCount() {
    requestAjax("/background/administrator/getAdminCount",{name:name,role:role,registerDate:registerDate},function (data) {
        makePage(data.data);
    })
}

    /**
     * 制作分页条
 * @param count
 */
function makePage(count) {
    layui.use(['laypage', 'layer'], function() {
        var laypage = layui.laypage
            , layer = layui.layer;

        //总页数低于页码总数
        laypage.render({
            elem: 'page',
            limit:10,
            count: count //数据总数
            ,jump: function(obj, first) {
                getAdminListData(obj.curr,obj.limit)
            }
            });
    });
}

/**
 * 获取数据
 * @param curr 当前页码
 * @param limit 页容量
 */
function getAdminListData(curr,limit) {
    $("#adminData").empty();
    $("#imgs").remove();
    requestAjax("/background/administrator/getAdminPage",{curr:curr,limit:limit,name:name,role:role,registerDate:registerDate},function (data) {
       if (!data.result){
           $("#z1").append(" <img id='imgs' src=\"../images/img/chas.png\" style=\"width: 100%;height: 400px\">")
           return ;
       }
        for ( var i in data.data) {
            var role;
            if (data.data[i].role===0)
                role="超级管理员";
            else  if (data.data[i].role===1)
                role="业务员";
            else  if (data.data[i].role===2)
                role="风控员";
            else
                role="财务员";
            $("#adminData").append("<tr>\n" +
                "  <td>"+data.data[i].id+"</td>\n" +
                "  <td>"+data.data[i].name+"</td>\n" +
                "  <td>"+data.data[i].account+"</td>\n" +
                "  <td>"+(data.data[i].gender===1?'男':'女')+"</td>\n" +
                "  <td>"+role+"</td>\n" +
                "  <td>"+renderTime(data.data[i].registerDate)+"</td>\n" +
                "  <td class='td-status'><span style='color:"+(data.data[i].status?'#00FF00':'red')+" '>"+(data.data[i].status?'已启用':'已停用')+"</span></td>\n" +
                "    <td >\n" +
                "    <a onclick=\"member_stop(this,"+data.data[i].id+")\" href=\"javascript:;\"  title="+(data.data[i].status?'停用':'启用')+">\n" +
                "      <i class=\"layui-icon\" >"+(data.data[i].status?'&#xe601;':'&#xe62f;')+"</i>\n" +
                "    </a>\n" +
                "    <a title=\"编辑\"  onclick=\"xadmin.open('修改管理员','admin-updatas.html?id="+data.data[i].id+"',800,500)\" href=\"javascript:;\">\n" +
                "      <i class=\"layui-icon\">&#xe642;</i>\n" +
                "    </a>\n" +
                "    <a title=\"删除\" onclick=\"member_del(this,"+data.data[i].id+")\" href=\"javascript:;\">\n" +
                "      <i class=\"layui-icon\">&#xe640;</i>\n" +
                "    </a>\n" +
                "    <a title=\"查看\" onclick=\"xadmin.open('个人信息','admin-info.html?id="+data.data[i].id+"',800,390)\" href=\"javascript:;\">\n" +
                "      <i class=\"layui-icon\">&#xe602;</i>\n" +
                "    </a>\n" +
                "  </td>\n" +
                "</tr>")
        }
    });
}



/*用户-停用*/
function member_stop(obj,id){
    if (id===1){
        layer.msg('不能操作!',{icon:2,time:1000});
        return false;
    }
    layer.confirm(($(obj).attr('title')==='停用'?'确认要停用吗':'确认要启用吗'),function(index){
        if($(obj).attr('title')=='启用'){
            //发异步把用户状态进行更改
            $(obj).attr('title','停用');
           $(obj).find('i').html('&#xe601;');
           $(obj).parents("tr").find(".td-status").find('span').html('已启用');
            $(obj).parents("tr").find(".td-status").find('span').attr('style','color: #00FF00');
           layer.msg('已启用!',{icon: 5,time:1000});
           upStatus(id,1);
        }else{
            $(obj).attr('title','启用');
            $(obj).find('i').html('&#xe62f;');
            $(obj).parents("tr").find(".td-status").find('span').html('已停用');
            $(obj).parents("tr").find(".td-status").find('span').attr('style','color: red')
            layer.msg('已停用!',{icon: 5,time:1000});
            upStatus(id,0);
        }
    });
}


/*用户-删除*/
function member_del(obj,id){
    if(id==1){
        layer.msg('不能删除!',{icon:7,time:1000});
    }else {
        layer.confirm('确认要删除吗？',function(){
            requestAjax("/background/administrator/deleteAdministrator",{id:id},function (data) {
                if (data.result){
                    layer.msg('已删除!',{icon:1,time:1000});
                    setInterval(function () {
                        history.go(0);
                    },1000)
                } else {
                    layer.msg('删除失败!',{icon:1,time:1000});
                }

            });
        });
    }



}



/**
 * 修改状态
 */
function upStatus(id,status) {
    requestAjax("/background/administrator/insertAndUpdateAdministrator",{id:id,status:status},function (data) {
        console.log(data)
        if (!data.result){
            layer.msg('操作异常!',{icon: 5,time:1000});
            history.go(0);
        }
    });

}