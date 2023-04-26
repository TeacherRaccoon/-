
$(function () {
    /*$("#btn-booking").click(function () {
        location.href="piaoChangLong.html";
    })*/

    //显示城市
    $("[class='city-wrap show-city-box']").click(function () {
        $("[data-reactid=\"14\"]").toggle();
    });
    $("[data-reactid='52']").click(function(){
        $("[data-reactid=\"14\"]").hide();
    })
    $("[class='main_search_txt main_search_cur']").click(function(){
        $("[data-reactid=\"14\"]").hide();
    })
    //点击下拉框中的城市，将城市名放到最上面,在链接上也显示选中的景点门票
    $("[data-reactid=\"14\"] li").click(function () {
        $("[data-reactid=\"10\"]").html("<i class='f-position' data-reactid='11'></i>" +
            "                                    <!-- react-text: 12 -->"+$(this).html()+"<!-- /react-text --><span class='btn-morecity' data-reactid='13'></span>")
        $("[data-reactid=\"56\"]").html($(this).html()+" "+"景点门票");
        $(this).parent().hide();
    })

    //城市切换时的样式selected
    $("[class='clearfix'] li").click(function(){
        $(this).attr("class","selected");
        $("[data-reactid=\"69\"]").attr("class","");
        var index1 =  $(this).index();//获取当前的下标
        $("[class='clearfix'] li").each(function () {
            if($(this).index() != index1){
                $(this).attr("class","");
            }
        })
    })
    //点击不限 不限颜色变懒，其他li没有样式
    $("[data-reactid=\"69\"]").click(function () {
        $("[class='clearfix'] li").attr("class","");
        $(this).attr("class","more selected");
    })
})


//获取该城市的所有景点数不制作下拉框***开始
function getAllCountByCityId(cityId){
    sendAjax("http://localhost:8080/ticket/getSpotCount",{cityId:cityId},"POST","JSON",
        function(data){
            $("[data-reactid=\"62\"]").html("景点("+data.data+")");
        })
}
    getAllCountByCityId(1);//当默认搜索为空时则显示北京的信息
//获取该城市的所有景点数不制作下拉框***结束

//根据城市Id景点名称查询景点数***开始
function getSpotCountBySname(cityId,spotName){
    sendAjax("http://localhost:8080/ticket/getSpotCountBySname",{cityId:cityId,spotName:spotName},"POST","JSON",
        function(data){
            var da = data.data;
            //制作分页条
            laypage.render({
                elem: 'page01'
                , count: da
                , limit: 10
                , theme: '#4e9fff'
                , jump: function (obj) {
                    //根据cityId,spotName,起始位置查询景点列表详情
                    getSpotListByCityIdSpotName(cityId,spotName,obj.curr,obj.limit);
                }
            });

        })
}
/*
var param = getParam();//获取页面传来的参数
*/

var mparams = sessionStorage.getItem("mparams");

//根据用户输入查询景点信息
if(mparams !=null && mparams !=""){
    getSpotInfoBysolr(mparams);
}else {
    getSpotCountBySname(1,"");
}

//从solr中查询数据，并渲染
function getSpotInfoBysolr(mparams){
    sendAjax("http://localhost:8080/ticket/searchTicSpot",{q:"keyword:"+mparams},"POST","JSON",function (data) {
        //制作分页条
        laypage.render({
            elem: 'page01'
            , count: data.count
            , limit: 10
            , theme: '#4e9fff'
            , jump: function (obj) {

                sendAjax("http://localhost:8080/ticket/searchTicSpot",{q:"keyword:"+mparams,start:obj.curr,pageSize:obj.limit},"POST","JSON",function(data){
                    var da = data.data;
                console.log(da);
                    //渲染数据
                    $("[class='spot-list'] div").remove();
                    for(let i=0;i<da.length;i++){
                        var imgUrl = da[i].imgUrl.split("=")[0];
                           var score2 = Number( da[i].avgScore.toString().match(/^\d+(?:\.\d{0,1})?/));

                        $("[class='spot-list']").append("<div class='view-spot clearfix' data-reactid='80' onclick='javascript:getSpotInfo("+da[i].spotId+")'>"+
                            "                                        <div class='spot-img' data-reactid='81'><img class='img-auto'"+
                            "                                                                                     src='"+imgUrl+"'"+
                            "                                                                                     data-reactid='82'/></div>"+
                            "                                        <div class='spot-info' data-reactid='83'><h4 data-reactid='84'><em"+
                            "                                                data-reactid='85'>"+da[i].spotName+"</em><span"+
                            "                                                data-reactid='86'>【"+da[i].address+"】</span></h4>"+
                            "                                            <div class='spot-comment' data-reactid='87'><span class='spot-score'"+
                            "                                                                                              data-reactid='88'><span"+
                            "                                                    class='score-star' data-reactid='89'><i style='width:90.0%;'"+
                            "                                                                                            data-reactid='90'></i></span></span><span"+
                            "                                                    data-reactid='91'><!-- react-text: 92 -->"+score2+"<!-- /react-text -->"+
                            "                                                <!-- react-text: 93 -->分<!-- /react-text --></span><span"+
                            "                                                    data-reactid='94'>99%推荐</span></div>"+
                            "                                            <div class='spot-label' data-reactid='95'><span data-reactid='96'><span"+
                            "                                                    class='label label-blue' data-reactid='97'>随买随用</span><span"+
                            "                                                    class='label label-orange' data-reactid='98'>自驾观赏</span><span"+
                            "                                                    class='label label-blue' data-reactid='99'>亲子同乐</span></span>"+
                            "                                            <p class='desc' data-reactid='101'>"+da[i].special+"</p>"+
                            "                                            <div class='price-box' data-reactid='102'>"+
                            "                                                <div class='price-num' data-reactid='103'><span data-reactid='104'><!-- react-text: 105 -->¥"+
                            "                                                    <!-- /react-text --><!-- react-text: 106 -->"+da[i].price+""+
                            "                                                    <!-- /react-text --></span><!-- react-text: 107 -->起"+
                            "                                                    <!-- /react-text --></div>"+
                            "                                                <span id='btn-booking' class='btn-booking'"+
                            "                                                      data-reactid='108'>立即预订</span>"+
                            "                                                <p class='sale' data-reactid='109'><!-- react-text: 110 -->已售："+
                            "                                                    <!-- /react-text --><!-- react-text: 111 -->20.2万+"+
                            "                                                    <!-- /react-text --></p></div>"+
                            "                                        </div>"+
                            "                                    </div>");
                    }
                    $("html,body").animate({scrollTop: ($("[data-reactid='62']").offset().top)-9},500);

                })


            }
        });




    })
}



//根据城市Id景点名称查询景点数***结束

//根据cityId,spotName,起始位置查询景点列表详情***开始
function getSpotListByCityIdSpotName(cityId,spotName,startIndex,pageSize){
    sendAjax("http://localhost:8080/ticket/getSpotListByCityIdSpotName",{cityId:cityId,spotName:spotName,startIndex:startIndex,pageSize:pageSize},"POST","JSON",
        function(data){
            console.log(data.data);
            var da = data.data;
            //渲染数据
            $("[class='spot-list'] div").remove();
            for(let i=0;i<da.length;i++){
                var imgUrl = da[i].imgUrl.split("=")[0];
                var score = da[i].avgScore.toFixed(1);
                $("[class='spot-list']").append("<div class='view-spot clearfix' data-reactid='80' onclick='javascript:getSpotInfo("+da[i].spotId+")'>"+
                    "                                        <div class='spot-img' data-reactid='81'><img class='img-auto'"+
                    "                                                                                     src='"+imgUrl+"'"+
                    "                                                                                     data-reactid='82'/></div>"+
                    "                                        <div class='spot-info' data-reactid='83'><h4 data-reactid='84'><em"+
                    "                                                data-reactid='85'>"+da[i].spotName+"</em><span"+
                    "                                                data-reactid='86'>【"+da[i].address+"】</span></h4>"+
                    "                                            <div class='spot-comment' data-reactid='87'><span class='spot-score'"+
                    "                                                                                              data-reactid='88'><span"+
                    "                                                    class='score-star' data-reactid='89'><i style='width:90.0%;'"+
                    "                                                                                            data-reactid='90'></i></span></span><span"+
                    "                                                    data-reactid='91'><!-- react-text: 92 -->"+score+"<!-- /react-text -->"+
                    "                                                <!-- react-text: 93 -->分<!-- /react-text --></span><span"+
                    "                                                    data-reactid='94'>99%推荐</span></div>"+
                    "                                            <div class='spot-label' data-reactid='95'><span data-reactid='96'><span"+
                    "                                                    class='label label-blue' data-reactid='97'>随买随用</span><span"+
                    "                                                    class='label label-orange' data-reactid='98'>自驾观赏</span><span"+
                    "                                                    class='label label-blue' data-reactid='99'>亲子同乐</span></span>"+
                    "                                            <p class='desc' data-reactid='101'>"+da[i].special+"</p>"+
                    "                                            <div class='price-box' data-reactid='102'>"+
                    "                                                <div class='price-num' data-reactid='103'><span data-reactid='104'><!-- react-text: 105 -->¥"+
                    "                                                    <!-- /react-text --><!-- react-text: 106 -->"+da[i].price+""+
                    "                                                    <!-- /react-text --></span><!-- react-text: 107 -->起"+
                    "                                                    <!-- /react-text --></div>"+
                    "                                                <span id='btn-booking' class='btn-booking'"+
                    "                                                      data-reactid='108'>立即预订</span>"+
                    "                                                <p class='sale' data-reactid='109'><!-- react-text: 110 -->已售："+
                    "                                                    <!-- /react-text --><!-- react-text: 111 -->20.2万+"+
                    "                                                    <!-- /react-text --></p></div>"+
                    "                                        </div>"+
                    "                                    </div>");
            }
            $("html,body").animate({scrollTop: ($("[data-reactid='62']").offset().top)-9},500);

        })
}

function getSpotInfo(da){
    location.href="http://localhost:8080/views/piao/mengPiao_guangZhou.html?spotId="+da;
}

//点击城市时的景点切换
$("[data-reactid='14'] li").click(function(){
    var spotId = $(this).attr("id");
    getSpotCountBySname(spotId,"");
})

//门票列表的搜索功能
$("[data-reactid='49']").click(function(){
   var keyword =  $("[data-reactid='48']").val();
   //调用从solr查询方法
    if(keyword !=null && keyword!=""){
        getSpotInfoBysolr(keyword);
    }

})



