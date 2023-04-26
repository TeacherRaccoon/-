//获取景点的评论内容**********************开始
var spotId =1;
var commentList = [];//用来封装评论
var i = 0;//记录评论的下标
//获取某个景点的评论
window.scrollTo(0, 15000);

function getComments() {
    $("[class='comments'] li").each(function () {
        var doc = $(this).find("span").next().html();
        var score = doc.split(">")[3].split("<")[0];//分数
        var content = $(this).find("p").html();//评论内容
        var dateTime = $(this).find("[class='user-date']").html().split(">")[6].split("<")[0];//评论时间
        var comment = {spotId:spotId, score: score, content: content, dateTime: dateTime}
        commentList[i] = comment;
        i++;
    })
    console.log(commentList);//查看数组中的内容

}

$("[class='pkg_page'] a").click(function () {
    getComments();
    window.scrollTo(0, 10000);
})
//获取景点评论*****************************结束

