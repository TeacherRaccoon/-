var layer;
var load;
var obj;
var flag=true;
$(function () {
    layui.use('layer',function () {
        layer=layui.layer;
    })
    var departedName=decodeURI(window.location.search.substring(window.location.search.lastIndexOf("=")+1));
    var startCityId=parseInt(window.location.href.split("startcity=")[1].split("&")[0]);
    setHistoryCity(departedName,startCityId);
    showPageInfo(sessionStorage.getItem("q"));
    obj=JSON.parse(sessionStorage.getItem("search"));
    $(".search_filtrate a:eq(0)").html(sessionStorage.getItem("q")+"<span></span>");
    //制作分页条
    var params={
        q:sessionStorage.getItem("q"),
        pageIndex:"",
        pageSize:""
    }
    getProductListByPage2("_pg",obj.count,params);
    showGroupFieldList(obj.groupFieldList);
    //渲染城市选择
    showDepartCityList(JSON.parse(sessionStorage.getItem("hotDepartCity")));
    $("#_rcmd").remove();
    $(".product_box:gt(0)").remove();
    $(".float_right").remove();
    $("input[name='keyword']").attr("value",sessionStorage.getItem("q"));
    })
function showPageInfo(destinationName) {
    $(".search_txt").val("");
    $("title").text(destinationName+"旅游,"+destinationName+"旅游景点,"+numberToChinese(new Date().getMonth()+1)+"月"+destinationName+"旅游线路报价【携程旅游】")
    $("#travelNotes").attr("style","display:none");
    $("[name='description']").attr("content",numberToChinese(new Date().getMonth()+1)+"月"+destinationName+"旅游景点推荐,携程旅游网提供3000条"+destinationName+"旅游线路报价,"+destinationName+"旅游攻略,"+destinationName+"旅游景点以及"+destinationName+"自由行,跟团游,半自助游,团队游等多种出游形式,想要"+destinationName+"旅游找携程。")
    $("[name='keywords']").attr("content",destinationName+"旅游,"+destinationName+"旅游景点,"+destinationName+"旅游攻略,"+destinationName+"旅游线路报价,"+numberToChinese(new Date().getMonth()+1)+"月"+destinationName+"旅游");
    $("#poiName").text(destinationName);
    $(".line").text("景点的相关描述");
    $(".search_txt").val(destinationName);
    $(".new_search_notice").hide();
}

/**
 * 展示包含的查询条件：日程、线路、供应商、各种排序等
 * @param groupFieldList
 */
function showGroupFieldList(groupFieldList) {
    //渲染游玩线路
    $(".search_cate:eq(1) .cate_content .area_box").empty();//找到span标签,清空下面的子节点
    $(".search_cate:eq(2) .cate_content .base_label:gt(0)").remove();
    var title="\"游玩线路\"";
    for (var i = 0; i <groupFieldList[0].length ; i++) {
        var $a=$("<a href='javascript:void(0)' onclick='javascript:fqProductList("+title+","+"\""+groupFieldList[0][i]+"\""+")'></a>");
        $a.text(groupFieldList[0][i]);
        $(".search_cate:eq(1) .cate_content .area_box").append($a);
        //渲染隐藏的ul，input
        var $label=$("<label class='base_label'><input type='checkbox' data-tracevalue value/></label>");
        $label.find("input").attr({"data-tracevalue":groupFieldList[0][i],"value":groupFieldList[0][i]}).text(groupFieldList[0][i])
        $(".search_cate:eq(2) .cate_content ").append($label);
    }


    //渲染行程天数
    $(".search_cate:eq(3) .cate_content .area_box").empty();//找到span标签,清空下面的子节点
    //先排序
    var newArr=groupFieldList[3];
    //排序,选择排序
    for(var i=0;i<newArr.length;i++){
        for(var j=i+1;j<newArr.length-1;j++){
            if(parseInt(newArr[i].substring(0,1))>parseInt(newArr[j].substring(0,1))){
                var temple=newArr[i];
                newArr[i]=newArr[j];
                newArr[j]=temple;
            }
        }
    }
    //开始渲染行程天数
    $(".search_cate:eq(4) .cate_content .base_label:gt(0)").remove();
    for (var i = 0; i <newArr.length ; i++) {
        var title="行程天数"
        var $a=$("<a href='javascript:void(0)' onclick='fqProductList("+"\"行程天数\""+","+"\""+newArr[i]+"\""+")'></a>");
        $a.text(newArr[i]);
        $(".search_cate:eq(3) .cate_content .area_box").append($a);
        //渲染隐藏的ul，input
        var $label=$("<label class='base_label'><input type='checkbox' data-tracevalue value/></label>");
        $label.find("input").attr({"data-tracevalue":newArr[i],"value":newArr[i]}).text(newArr[i]);
        $(".search_cate:eq(4) .cate_content ").append($label);
    }
    //渲染出发地
    $(".search_cate:eq(5) .cate_content .area_box").empty();//找到span标签,清空下面的子节点
    $(".search_cate:eq(6) .cate_content .base_label:gt(0)").remove();//删除隐藏的域
    var newCity=["北京","天津","上海","广州"];
    for (var i = 0; i <groupFieldList[4].length ; i++) {
        var $a=$("<a href='javascript:void(0)' onclick='fqProductList("+"\"出发城市\""+","+"\""+groupFieldList[4][i]+"\""+")'></a>");
        $a.text(groupFieldList[4][i]);
        $(".search_cate:eq(5) .cate_content .area_box").append($a);
        //渲染隐藏的ul，input
        var $label=$("<label class='base_label'><input type='checkbox' data-tracevalue value/></label>");
        $label.find("input").attr({"data-tracevalue":groupFieldList[4][i],"value":groupFieldList[4][i]}).text(groupFieldList[4][i]);
        $(".search_cate:eq(6) .cate_content ").append($label);
    }
    for (var i = 0; i <newCity.length ; i++) {
        var $a=$("<a href='javascript:void(0)' onclick='fqProductList("+"\"出发城市\""+","+"\""+newCity[i]+"\""+")'></a>");
        $a.text(newCity[i]);
        $(".search_cate:eq(5) .cate_content .area_box").append($a);
        //渲染隐藏的ul，input
        var $label=$("<label class='base_label'><input type='checkbox' data-tracevalue value/></label>");
        $label.find("input").attr({"data-tracevalue":newCity[i],"value":newCity[i]}).text(newCity[i]);
        $(".search_cate:eq(6) .cate_content ").append($label);
    }


    //渲染产品类型
    $(".search_cate:eq(7) .cate_content .area_box").empty();//找到span标签,清空下面的子节点
    $(".search_cate:eq(8) .cate_content .base_label:gt(0)").remove();//删除隐藏的域
    for (var i = 0; i <groupFieldList[5].length ; i++) {
        if(groupFieldList[5][i]==null){
            continue;
        }
        var $a=$("<a href='javascript:void(0)' onclick='fqProductList("+"\"产品类型\""+","+"\""+groupFieldList[5][i]+"\""+")'></a>");
        $a.text(groupFieldList[5][i]);
        $(".search_cate:eq(7) .cate_content .area_box").append($a);
        //渲染隐藏的ul，input
        var $label=$("<label class='base_label'><input type='checkbox' data-tracevalue value/></label>");
        $label.find("input").attr({"data-tracevalue":groupFieldList[5][i],"value":groupFieldList[5][i]}).text(groupFieldList[5][i]);
        $(".search_cate:eq(8) .cate_content ").append($label);
    }


    //钻级
    var $alast=$(".search_cate:eq(9) .cate_content .area_box a:last");
    $(".search_cate:eq(9) .cate_content .area_box").empty();//找到span标签,清空下面的子节点
    //先排序
    var newArr1=groupFieldList[2];
    //排序,选择排序
    for(var i=0;i<newArr1.length;i++){
        for(var j=i+1;j<newArr1.length-1;j++){
            if(parseInt(newArr1[i])>parseInt(newArr1[j])){
                var temple=newArr1[i];
                newArr1[i]=newArr1[j];
                newArr1[j]=temple;
            }
        }
    }
    $(".search_cate:eq(10) .cate_content .base_label:gt(0)").remove();//删除隐藏的域
    for (var i = 0; i <newArr1.length ; i++) {
        var $a=$("<a href='javascript:void(0)' onclick='fqProductList("+"\"产品钻级\""+","+"\""+newArr1[i]+"钻\""+")'></a>");
        if(newArr1[i]=="0"){
            continue;
        }
        $a.text(newArr1[i]+"钻");
        $(".search_cate:eq(9) .cate_content .area_box").append($a);
        //渲染隐藏的ul，input
        var $label=$("<label class='base_label'><input type='checkbox' data-tracevalue value/></label>");
        $label.find("input").attr({"data-tracevalue":newArr1[i],"value":newArr1[i]}).text(newArr1[i]);
        $(".search_cate:eq(10) .cate_content ").append($label);
    }
    $(".search_cate:eq(9) .cate_content .area_box").append($alast);

    //渲染供应商
    $(".search_cate:eq(11) .cate_content .area_box").empty();//找到span标签,清空下面的子节点
    $(".search_cate:eq(12) .cate_content .base_label:gt(0)").remove();//删除隐藏的域
    for (var i = 0; i <groupFieldList[1].length ; i++) {
        var $a=$("<a href='javascript:void(0)' onclick='fqProductList("+"\"供应商\""+","+"\""+groupFieldList[1][i]+"\""+")'></a>");
        $a.text(groupFieldList[1][i]);
        $(".search_cate:eq(11) .cate_content .area_box").append($a);
        //渲染隐藏的ul，input
        var $label=$("<label class='base_label'><input type='checkbox' data-tracevalue value/></label>");
        $label.find("input").attr({"data-tracevalue":groupFieldList[1][i],"value":groupFieldList[1][i]}).text(groupFieldList[1][i]);
        $(".search_cate:eq(12) .cate_content ").append($label);
    }
}
function showProductList(productList){
    var template=$(".main_mod:eq(0)");
    template.attr({"data-tracevalue":"","data-params":""});
    $(".main_mod").remove();//删除
    //渲染
    for (var i=0;i<productList.length;i++){
        console.log(productList[i].totalPrice);
        var href="vacationGenTuan.html?"+window.location.href.split("?")[1]+"&productId="+productList[i].id;
        //克隆模板
        var $clone=template.clone();
        $clone.find(".product_info").remove();
        $clone.find(".product_pic a").attr({"href":href,"target":"_blank"});
        $clone.find(".product_pic a img").attr("src",(productList[i].imgUrl.indexOf("statics")==0)?("../../"+productList[i].imgUrl):("../../statics/"+productList[i].imgUrl));
        $clone.find(".sr_free").text(productList[i].travelProductType)
        if(productList[i].travelProductType=="跟团游"){
            $clone.find(".sr_free").attr("class","sr_team");
        };
        $clone.find(".product_title a").attr({"href":href,"target":"_blank","title":productList[i].subHead}).html(productList[i].subHead+"<span class=\"0\" data-star=\"1\"></span>")
        //钻级
        if(productList[i].productLevel==null || productList[i].productLevel==0){
            $clone.find(".icon_grade").remove();
        }else{
            $clone.find(".icon_grade").attr({"data-star":productList[i].productLevel,"data-type":2}).text(productList[i].productLevel+"钻");
            switch (productList[i].productLevel) {
                case 3:
                    $clone.find(".icon_grade").attr("title","【3钻】超高性价比,入住舒适性酒店，旅游车一人一座");
                    break;
                case 4:
                    $clone.find(".icon_grade").attr("title","【4钻】旅途更惬意,入住高档型酒店，旅游车上有空座，航班酒店信息一目了然");
                    break;
                case 5:
                    $clone.find(".icon_grade").attr("title","【5钻】贵族的享受,入住豪华型酒店，旅游车座位宽裕，航班酒店信息一目了然，全程不进购物店");
                    break;
            }
        }
        if(productList[i].hasFeature==null){
            $clone.find(".icon_common").remove();
        }else{
            var $span=$clone.find(".icon_common:first");
            $clone.find(".icon_common").remove();
            var str=productList[i].hasFeature.split(";");
            for(var j=0;j<str.length;j++){
                var $cloneSpan=$span.clone();
                $cloneSpan.attr("title",str[j]).text(str[j]);
                $clone.find(".product_icon_mod").append($cloneSpan);
            }
        }
        //订单一经携程旅行网以书面形式确认后均默认发团（不可抗力除外
        if(productList[i].hasServiceAss==null){
            $clone.find(".icon_green").remove();
        }else{
            var $span=$clone.find(".icon_green:first");
            $clone.find(".icon_green").remove();
            var str=productList[i].hasServiceAss.split(";");
            for(var j=0;j<str.length;j++){
                var $cloneSpan=$span.clone();
                $cloneSpan.attr("title",str[j]).text(str[j]);
                if(str[j]=="成团保障"){
                    $cloneSpan.attr("title","订单一经携程旅行网以书面形式确认后均默认发团（不可抗力除外）")
                }
                $clone.find(".product_icon_mod").append($cloneSpan);
            }
        }
        //价格
        $clone.find(".sr_price strong").text(productList[i].totalPrice);
        //出游人数
        $clone.find(".comment em").text(productList[i].travelCount+"人出游");
        $clone.find(".comment a").attr("data-comment","").html("暂时没有评论<b class=\"down\"></b>")
        $clone.find(".grade strong").text("0.0");
        //删除班期
        $clone.find(".product_schedule").remove();
        //供应商
        $clone.find(".product_retail").attr("title",productList[i].prviderName);
        if(productList[i].providerAbb=="携程自营"){
            $clone.find(".product_retail").html("供应商：<i class=\"ctrip_icon\"></i>携程自营<i class=\"saleout_icon\"></i>");
        }else{
            $clone.find(".product_retail").html("供应商："+productList[i].providerAbb);
        }
        $clone.find(".start_info dt").text(decodeURI(window.location.href.split("cityname=")[1])+"出发");
        $clone.find(".start_info dd").attr("title",productList[i].productDetail).text(productList[i].productDetail);
        $("#_pg").before($clone);
    }
}

/**
 * 只显示上一页和下一页按钮
 * @param divId
 * @param count
 * @param productList
function getProductListByPage1(divId,count,productList) {
    layui.use('laypage',function () {
        laypage=layui.laypage;
        laypage.render({
            elem: divId
            ,count: 50
            ,layout: ['prev', 'next']
            ,jump: function(obj, first){
                if(!first){
                    layer.msg('第 '+ obj.curr +' 页');
                }
            }
        });
    })
}*/
function getProductListByPage2(divId,counts,params) {
    if(counts>0){
        console.log("ele:"+divId+";count:"+counts)
        layui.use('laypage',function () {
            laypage=layui.laypage;
            laypage.render({
                elem: divId
                ,count: counts
                ,limit:10
                ,layout: ['count','prev','page','next','skip']
                ,jump: function(obj, first){
                    //layer.msg('第 '+ obj.curr +' 页');
                    //发送ajax请求
                    params.pageIndex=obj.curr;
                    params.pageSize=10;
                    commonAjax("/product/search","get",params,"json",function (data) {
                        if(data.result){
                            console.log(data.data.productList);
                            showProductList(data.data.productList);
                        }
                    })
                }
            });
        })
    }else{
        layer.msg("该条件下无匹配");
        $(".main_mod").hide();
    }

}

/**
 * 点击筛选条件，发送请求得到筛选后的旅游产品
 */
var index=0;
function fqProductList(title,value) {
    //单选的情况下，隐藏已经选择的条件
    $("span[class='b']:contains('"+title+"')").parent().parent().hide();
    $("input[title='"+title+"']").attr("value",value)
    //$("input[title='"+title+"']").val(value);
    //将选择集中起来
    if($("#chose").html()==undefined){
        //创建class为list_choose_select的div用来展示选择的条件
        var div=$("<ul class='search_cate' id='chose'><li class='cate_content search_height'><span class=\"b\">您已选择</span><div class='area_box' style=''><span class='recommend_cur mychose'  data-value='"+index+"' style='background-color: #0086f6;font-size: 14px;width: 150px;margin-left: 10px;color: white' onclick='delChose("+index+")'>"+title+" | "+value+"<span id='cha'><i class='layui-icon layui-icon-close'></i></span></span></div></li></ul>");
        $("#_flt").append(div);
    }else{
        $("#chose").find(".area_box").append($("<span class='recommend_cur mychose' style='background-color: #0086f6;font-size: 14px;width: 150px;margin-left: 10px;color: white' data-value='"+index+"' onclick='delChose("+index+")' >"+title+" | "+value+"<span id='cha'><i class='layui-icon layui-icon-close'></i></span></span>"))
    }
    index++;
    setTimeout("fqsearch(\"condition\")",1000);
    
}
function delChose(index) {
    console.log("点击删除");
    $("span[class='b']:contains('"+$("[data-value='"+index+"']").text().split(" | ")[0]+"')").parent().parent().show();
    $("input[title='"+$("[data-value='"+index+"']").text().substring(0,$("[data-value='"+index+"']").text().indexOf(" "))).attr("value","");
    $("[data-value='"+index+"']").remove();
    if($("div[class='area_box']").html()==""){
        $("#chose").remove();
    }
    setTimeout("fqsearch(\"condition\")",1000);
}
function fqsearch(formid) {
    var params={
        q:sessionStorage.getItem("q"),
        travelRoute:$("input[name='travelRoute']").attr("value"),
        daysTrip:$("input[name='daysTrip']").attr("value"),
        productLevel:$("input[name='productLevel']").attr("value").substring(0,1),
        departCityName:$("input[name='departCityName']").attr("value"),
        travelProductType:$("input[name='travelProductType']").attr("value"),
        providerAbb:$("input[name='providerAbb']").attr("value"),
        priceRange:$("input[name='priceRange']").attr("value"),
        pageIndex:"",
        pageSize:""
    }
    console.log(JSON.stringify(params));
    commonAjax("/product/search","get",params,"json",function (data) {
        if(data.result=="true"){
            //1秒后跳转
            sessionStorage.setItem("search",JSON.stringify(data.data));
            console.log("开始分页");
            getProductListByPage2("_pg",data.data.count,params);

        }else{
            layer.msg("查询失败！",{icon:0,time:500});
        }
    })
}
$("#_sort li a").click(function () {
    $("a[class='all current']").attr("class","");
    $(this).addClass("all current");
    switch ($(this).attr("title")) {
        case "综合":
            $("[name=sortType]").attr("value","");
            break;
        case "点击按近期销量由高到低排序":
            $("[name=sortType]").attr("value","travelCount-desc");
            break;
        case "点击按价格从低到高排序":
            $("[name=sortType]").attr("value","totalPrice-asc");
            break;
        case "点击按价格从高到低排序":
            $("[name=sortType]").attr("value","totalPrice-desc");
            break;
    }
    commonajax();
})
function commonajax() {
    var params={
        q:sessionStorage.getItem("q"),
        travelRoute:$("input[name='travelRoute']").attr("value"),
        daysTrip:$("input[name='daysTrip']").attr("value"),
        productLevel:$("input[name='productLevel']").attr("value").substring(0,1),
        departCityName:$("input[name='departCityName']").attr("value"),
        travelProductType:$("input[name='travelProductType']").attr("value"),
        providerAbb:$("input[name='providerAbb']").attr("value"),
        priceRange:$("input[name='priceRange']").attr("value"),
        sortType:$("input[name='sortType']").attr("value"),
        pageIndex:"",
        pageSize:"",

    }
    commonAjax("/product/search","get",params,"json",function (data) {
        if(data.result=="true"){
            //1秒后跳转
            sessionStorage.setItem("search",JSON.stringify(data.data));
            getProductListByPage2("_pg",data.data.count,params);

        }else{
            layer.msg("查询失败！",{icon:0,time:500});
        }
    })
}
$(".input_range").focus(function () {
    $(".ctrl").show();
})
function numberToChinese(num) {
    switch (num) {
        case 1:
            return "一";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        case 5:
            return "五";
        case 6:
            return "六";
        case 7:
            return "七";
        case 8:
            return "八";
        case 9:
            return "九";
        case 10:
            return "十";
        case 11:
            return "十一";
        case 12:
            return "十二";
    }
}

