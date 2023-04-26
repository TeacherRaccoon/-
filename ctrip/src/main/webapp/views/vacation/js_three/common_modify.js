//用来修改多个页面共有的部分的修改操作
$(function () {
    //隐藏不需要展示的div
    $("#cui_nav_flight").hide().next().hide().next().hide().next().hide().next().hide().next().hide().next().hide().next().hide();
    $("#cui_c_ph_you").hide().next().hide().next().hide().next().hide().next().hide().next().hide().next().hide().next().hide().next().hide()
    $("#cui_nav_mudidi").hide().next().hide().next().hide().next().next().hide()
})
//改变一些a标签的href属性
function change_a_href() {
    $(".theme_box a").attr("href","javascript:;");
    $(".product_list li a").attr("href","javascript:;")
}
//获取热门出发地城市
function getHotDepartCity() {
    //先查看本地缓存是否有过查询历史
    var hotDepartCity=JSON.parse(sessionStorage.getItem("hotDepartCity"))
    //没有则发送ajax请求
    if(hotDepartCity==null){
        commonAjax("/product/getHotCity","get","","json",function (data) {
            if(data.result){
                //缓存
                sessionStorage.setItem("hotDepartCity",JSON.stringify(data.data));
                showDepartCityList(data.data);
            }else {
                console.log(data.msg);
            }
        })
    }else{
        //直接渲染
        showDepartCityList(hotDepartCity);
    }
}
//渲染出发地城市列表
function showDepartCityList(hotCityList) {
    //得到该div下的p标签
    var $p=$(".hot_station p");
    $p.empty();
    for (var i = 0; i <hotCityList.length ; i++) {
        //alert(hotCityList[i])
        //只推荐16个城市
        if(i>16){
            break;
        }
        //创建a节点
        var $a=$("<a href='javascript:;'></a>");
        $a.text(hotCityList[i].cityName);
        $a.attr({"data-index":i,"id":hotCityList[i].id,"onclick":"javascript:bindCity("+hotCityList[i].id+","+i+")"});
        //插入子节点
        $p.append($a);
    }
}

//首页定位绑定点击事件
$(".start_city_station:last dt").click(function () {
    //隐藏和显示
    $(".city_searchBox").toggle();
    //切换该节点的class属性
    $(this).toggleClass("city_spread");
})
//监听输入定位城市输入框中输入值的改变事件，绑定两个事件：input和propertychange
$(".station_search_box input").on("input propertychange",function () {
    //获取输入的值
    var $val=$(this).val();
    //判断输入框中的值是否为空
    if($val==""){
        $(this).prev().show();
        //隐藏并删除增加的节点
        $(".station_search_result").empty().hide();
    }else{
        //隐藏输入框例的默认提示
        $(this).prev().hide();
        //显示结果div station_search_result,暂时把输入框的值显示
        $(".station_search_result").empty().append("<a href='javascript:;'>"+$val+"</a>").show();

    }
})
//搜索输入框绑定复合事件
$(".search_txt").focus(function () {
    var $val=$(this).val();
    if($val==""){
        $(".hot_search_box").show()
    }
}).blur(function () {
    $(".hot_search_box").hide()
}).on("input propertychange",function () {
    var $val=$(this).val();
    //判断$val的值是否为空
    if($val==""){
        $(".new_search_notice").show()
        $(".hot_search_box").show()
    }else{
        $(".new_search_notice").hide();
        $(".hot_search_box").hide();
        //显示推荐列表
        //放弃
    }
})
//点击搜索
var href="vacationList.html?"+window.location.href.split("?")[1];
$(".main_search_btn").click(function () {
    var keyword=$(".search_txt").val();
   alert("输入内容："+keyword)
    var params={q:keyword};
    commonAjax("/product/search","get",params,"json",function (data) {
        if(data.result=="true"){
            //1秒后跳转
            sessionStorage.setItem("q",keyword);
            sessionStorage.setItem("search",JSON.stringify(data.data));
            layer.msg(data.msg,{icon:6,time: 1000})
            if(window.location.href.indexOf("vacationList.html")>0){
                location.reload();
            }else{
                setTimeout("window.location.href=href",2000);
                console.log(data.data);
            }
        }else{
            layer.msg("查询失败！",{icon:0,time:500});
        }
    })

})
/**
 * 选择定位城市
 * @param id
 * @param data_index
 */
function bindCity(id,data_index) {
    var cityname=$(".hot_station p a:eq("+data_index+")").text();
    setHistoryCity(cityname,id);
    window.location.href=window.location.href.split("?")[0]+"?startcity="+id+"&salecity="+id+"&cityname="+cityname;
}

//为搜索框的全部产品下拉框绑定复合事件
$(".catalog_list").hover(
    function () {
        $(this).removeClass("catalog_icon_down").addClass("catalog_icon_up").find("dd").show();
    },function () {
        $(this).removeClass("catalog_icon_up").addClass("catalog_icon_down").find("dd").hide();

    })

//点击x关闭推荐的div
$(".close").click(function () {
    $(".hot_search_box").hide()
})
//设置出发地,并存入本地缓存
function setHistoryCity(cityname,cityid) {
    var str="{startid:"+cityid+","+
        "salesid:"+cityid+","+
        "departCityName:"+cityname+
        "}";
    $(".start_city_station:eq(1) dt").html("<i></i>"+cityname+"<span>站</span><b></b>")
    var departCityJson=JSON.stringify(str);
    // console.log(departCityJson)
    setMyCookie("cityHistory",departCityJson);
}