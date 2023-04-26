
//获取景点的评论内容**********************开始
var spotId = 1  ;
var commentList = [];//用来封装评论
var i = 0;//记录评论的下标
//获取某个景点的评论
window.scrollTo(0,15000);
function getComments(){
    $("[class='comments'] li").each(function(){
        var doc = $(this).find("span").next().html();
        var score = doc.split(">")[3].split("<")[0];//分数
        var content = $(this).find("p").html();//评论内容
        var dateTime = $(this).find("[class='user-date']").html().split(">")[6].split("<")[0];//评论时间
        var comment ={score:score,content:content,dateTime:dateTime}
        commentList[i] = comment;
        i++;
    })

    console.log(commentList);//查看数组中的内容
    if(i>=50){//获取指定的评论条数后发送请求至后台存储
        alert("开始存储...");
        $.ajax({
            url:"http://localhost:8080/ticket/addComment_data",
            data:{commentList: JSON.stringify(commentList),
            spotId:spotId
            },type:"POST",dataType:"JSON",
            before:function () {//发送ajax前执行的函数
            },
            success:function(data){
                alert(data.msg);
            },//发送成功后的回调函数
            error:function (jqxhr) {//请求错误时执行的函数
                confirm("有异常哦！！！")
            },
            complete:function () {//请求完成后执行的函数
            }
        })
    }
}
$("[class='pkg_page'] a").click(function(){
    getComments();
    window.scrollTo(0,10000);
})
//获取景点评论*****************************结束












