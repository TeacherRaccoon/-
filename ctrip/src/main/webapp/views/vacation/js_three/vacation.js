var layer=null;
var load=null;

//目的地名
var distinationName;
//出发地
var departCityName;
//对原页面的一些处理
$(function () {
    layui.use(['layer'],function () {
        layer=layui.layer;
    })
    //修改class=theme_box下的a的href属性
    change_a_href();
    //隐藏不需要的模块
    $(".international_product").hide()
    $(".cruise_product").hide();
    $(".ttd_product").hide();
    if(location.href.split("?").length>1){
        var cityname=getQueryString("cityname");
            //cityname=cityname.replaceAll("%", "_PERCENT_");
            cityname=decodeURI(window.location.search.substring(window.location.search.lastIndexOf("=")+1));
       $(".start_city_station:eq(1) dt").html("<i></i>"+cityname+"<span>站</span><b></b>")
    }
})

$(function(){
    $(".search_txt").val("");
    //调用查询热门城市的方法，并渲染数据
    getHotDepartCity();
    departCityName=$(".start_city_station:last dt").text().trim().substring(0,2);
    distinationName=$(".search_txt").val();
    //境内模块随机推荐城市
    get_random_city("domestic_product");
    //为境内旅游精选渲染推荐产品
    get_recommend_productList("domestic_product",0,distinationName,departCityName,9)
    //周边模块随机推荐城市
    get_random_city("around_product");
    get_recommend_productList("around_product",0,distinationName,departCityName,9)
})

//境内旅游，当地玩乐绑定点击事件,改变样式,推荐产品
$(".tab_wrap ul li").click(function () {
    $(this).addClass("current").siblings().removeClass("current");
    //获取目的地城市名
    var cityName=$(this).find("span").text()=="精选"?null:$(this).find("span").text();
    var className=$(this).parent().parent().parent().attr("class").split(" ")[1];
    var id=$(this).attr("id")
    get_recommend_productList(className,id,cityName,departCityName)
})

//为输入的内容创建推荐列表：放弃实现
function createList() {

}

/**
 * 获取随机城市
 * @param divClassName
 */
function get_random_city(divClassName){
        //实现一个获取随机推荐城市的方法
        //生成随机id
        var cityIdList=new Array(9);
        var i=0;
        while(cityIdList[8]==undefined){
            var id=Math.round(Math.random()*16)
            if(cityIdList.indexOf(id)==-1){
                cityIdList[i]=id;
                i++;
            }else{
                continue;
            }
        }
        commonAjax("/product/getHotCity","get",{cityIdList:JSON.stringify(cityIdList),num:9},"json",function (data) {
            if (data.result) {
                //缓存
                showRecommentCity(divClassName,data.data);
            } else {
                console.log(data.msg);
            }
        })
}

/**
 * 渲染推荐的城市
 * @param divClassName
 * @param cityList
 */
function showRecommentCity(divClassName,cityList){
    for (var i = 0; i <cityList.length ; i++) {
        var $li=$("."+divClassName+" .tab_wrap ul li:eq("+(i+1)+")");
        $li.attr("id",cityList[i].id).find("span").text(cityList[i].cityName);
    }
}

/**
 * 获取指定城市id的推荐产品
 * @param cityId
 */
function get_recommend_productList(className,cityId,cityName,departCityName,num) {

         var params={cityId:null,
             cityName:cityName,
             departCityName:departCityName,
             num:num
         }
         //发送ajax请求
         commonAjax("/product/getProductByCity","get",params,"json",function (data) {
             //console.log("得到推荐城市的推荐产品:"+typeof data.data+"="+data.data);
             show_productInfo(className,data.data);
         })
}
//渲染推荐产品信息的方法
function show_productInfo(className,productList) {
    if(productList==null){
        layer.msg("该城市暂时没有数据", {icon: 6,time:500})
        //alert("该城市暂时没有数据")
        $("."+className+" .product_list li").hide();
    }else{
        $("."+className+" .product_list li").show()
        for(var i=0;i<productList.length;i++){
            var $li=$("."+className+" .product_wrap .product_list li:eq("+i+")")
            var imgUrl=productList[i].imgList[0].imgUrl;
            //有些路径不一致
            imgUrl=imgUrl.indexOf("statics")==0?imgUrl:"statics/"+imgUrl;
            //渲染路径
            $li.find("a[class='product_pic']").attr("href","vacationGenTuan.html?"+window.location.href.split("?")[1]+"&productId="+productList[i].id).find("img").attr({"src":"/"+imgUrl,"alt":productList[i].subHead})
            //钻级
            if(productList[i].productLevel !=null){
                //有钻级就增加<i></i>标签和属性
                $li.find("h3 a").attr("title",productList[i].subHead).html("<i class="+"diamond_"+productList[i].productLevel+"></i>"+productList[i].subHead)
            }else{
                $li.find("h3 a").attr("title",productList[i].subHead).html(productList[i].subHead)
            }
            //价格
           // console.log("金额："+productList[i].totalPrice)
            $li.find(".price").html("<dfn>¥</dfn>"+productList[i].totalPrice+"<em>起</em>");
        }
    }

}
//左侧导航栏添加复合事件
var data_index;
$(".destination_list li").hover(function () {
    //增加样式
    $(this).addClass("cur");
    //获取data-index
    data_index=$(this).attr("data-index");
    //显示隐藏div,根据对应的data-index属性值
    $(".sidenav_destination div[data-index='"+data_index+"']").attr("style","visibility: visible; top: 0px;");
},function () {
    //删除样式
    $(this).removeClass("cur");
    //关闭隐藏div
    $(".sidenav_destination div[data-index='"+data_index+"']").attr("style","visibility: hidden; top: 0px;");
})
$(".side_jmp").hover(function () {
    $(this).attr("style","visibility: visible; top: 0px;");
},function () {
    $(this).attr("style","visibility: hidden; top: 0px;")
})




function getQueryString(name) {
    var reg = new RegExp( " (^|&) " + name + " = ([^&]*)(&|$) " );
    var r = window.location.search.substr( 1 ).match( reg );
    if( r != null ) return unescape( r[2] ); return null;

}

