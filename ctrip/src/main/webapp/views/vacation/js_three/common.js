var layer=null;
var  loadIndex;
layui.use(['layer'],function () {
    layer=layui.layer;
})

function commonAjax(url,type,params,dataType,$success) {

    $.ajax({
        url:url,
        data:params,
        type:type,
        dataType:dataType,
        success:$success,
        beforeSend:function(){
            //发送请求前，打开layui的load--加载中的动态图片
           //loadIndex = layer.load(1);
        },
        complete:function () {
            //请求完成，关闭
            //layer.close(loadIndex);
        },
        error:function () {
            //layer.msg("发生异常");
        }

    })
}

function formAjax(formId,url,type,dataType,$success) {
    $("#" + formId).ajaxForm({
        url: url, type: type, dataType: dataType,
        before: function () { //请求发送前执行的函数
            index = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
        },
        success: $success,
        error: function () {
            layer.msg("请求异常！");
        },
        complete: function () {
            console.log("发送请求完成")
            layer.close(index);
        }
    });
}