var layer=null;
var load=null;
layui.use(['layer'],function () {
    layer=layui.layer;
})
//文档一加载
var startcity;
var salecity;
var departCityName;
var productId;
var product_param;
$(function () {
    sessionStorage.clear();
    $("#J_introduction div p:gt(1)").hide();
    var href=window.location.href;
    departCityName=href.split("cityname=")[1].split("&")[0];
    productId=href.split("productId=")[1];
    startcity=href.split("startcity=")[1].split("&")[0];
    sessionStorage.setItem("departCityName",departCityName);
    sessionStorage.setItem("productId",productId);
    salecity=startcity;
    //获取产品信息
    getProductInfo(departCityName,productId);
   /* //查询并渲染库存
    getAndShowInventory();*/
    appendPeopleList(0);
    appendPeopleList(1);
})


//哪个城市的旅游；例 北京旅游
$(".crumbs ").click(function () {
    alert("点击成功");
})

//产品特色、费用、等div的点击事件
$(".J_productTabItem").click(function () {
    roPlace($(this).attr("data-tag"));
})
//页面内跳转不改变url
function roPlace(id) {
    document.querySelector("#"+id).scrollIntoView(true);
}

//右导航栏
/*var boo=false;
$(".revision_side_function a:eq(0)").click(function () {
    if(boo){
        $(".revision_side_function").empty().html("<li><a class=\"revision_function_appear\" href=\"javascript:void(0);\"></a></li>");
        $(".revision_side_function").attr("style","bottom: 404px;");
        boo=true;
    }else{
        $(".revision_side_function").empty().html("<li><a href=\"javascript:void(0);\" class=\"revision_function_btn\"><i class=\"revision_function_gone\"></i>点击收起</a></li>" +
            "<li><a href=\"javascript:void(0)\" class=\"revision_function_btn\"><i class=\"revision_function_collect\"></i>收藏订阅</a></li>" +
            "<li><a href=\"javascript:;\" rel=\"nofollow\" class=\"revision_function_btn\"><i class=\"revision_function_dao\"></i>优惠券</a></li>" +
            "<li><a href=\"javascript:void(0)\" class=\"revision_function_btn\"><i class=\"revision_function_share\"></i>分享</a></li>" +
            "<li><a href=\"javascript:;\" class=\"revision_function_btn\"><i class=\"revision_function_service\"></i>在线客服</a></li>" +
            "<li><a href=\"javascript:;\" rel=\"nofollow\" class=\"revision_function_btn\"><i class=\"revision_function_top\"></i>回到顶端</a></li>");
        $(".revision_side_function").attr("style","");
    }

});*/

//供应商详情
$(".pro_det_inf dl:last").prev().find("dd span").hover(function () {
    $("#jmp-tip-uid_15672363803908788982970").attr("style","visibility: visible; display: block; z-index: 1023; margin: 0px; left: 140px; top: 639px; position: absolute; max-width: 420px; min-width: 420px; width: 420px;")
},function () {
    $("#jmp-tip-uid_15672363803908788982970").attr("style","visibility: hidden; display: block; z-index: 1021; margin: 0px; left: -9999px; top: -9999px; position: absolute; max-width: 420px; min-width: 420px; width: 420px;");
})
$("#jmp-tip-uid_15672363803908788982970").hover(function () {
    $(this).attr("style","visibility: visible; display: block; z-index: 1023; margin: 0px; left: 140px; top: 639px; position: absolute; max-width: 420px; min-width: 420px; width: 420px;")
},function () {
    $(this).attr("style","visibility: hidden; display: block; z-index: 1021; margin: 0px; left: -9999px; top: -9999px; position: absolute; max-width: 420px; min-width: 420px; width: 420px;");

})
//点击产品图片查看所有图片
$(".pil-figure-media img,.img_col li:eq(1)").click(function () {
    //layer.msg("查看所有产品照片",{icon:6,time:500});
    layer.open({
        content:" <div style=\"position: absolute; top: 0px; left: 0px;\"></div>"+
                "<div class=\"popup-overlay\" style=\"position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px; background: rgba(0, 0, 0, 0.5); z-index: 999;\">"+
                "<div class=\"popup-content\" style=\"position: absolute; width: 912px; margin: auto; top: 50%; left: 50%; transform: translate(-456px, -268px); backface-visibility: hidden; min-height: 507px; height: 536px;\">"+
                "<div class=\"popup-body\" style=\"height: 536px;\"><div class=\"QA_mask img_broadcast_mask\" style=\"height: auto;\"><h2><a href=\"javascript:void(0)\" class=\"close\" onclick='closeDiv()'></a></h2>"+
                "<div class=\"img_broadcast_con\"><h1></h1><div class=\"mask_score_inf\"><span class=\"score_s\"> <em>5</em>分 </span>"+
                "<span class=\"score_s\">242人出游</span></div><div class=\"pic_loop\"><div class=\"big_pic\"><div style=\"width: 600px; height: 336px; margin: 0px auto;\"> <div class=\"pil-figure\"> <div class=\"pil-figure-placeholder\">"+
                "<div class=\"pil-figure-filler\" style=\"padding-bottom: 56%;\"></div><div class=\"pil-figure-media\"> <img crossorigin=\"Anonymous\" src=\"//dimg04.c-ctrip.com/images/300u13000000tyk4mFFF9_C_600_336_Q90.jpg\" class=\"pil-figure-image pil-figure-image-anim loaded\" width=\"600\" height=\"336\">"+
                "</div></div></div></div><p class=\"img_tit\"><span>1/6</span></p><a class=\"prev\" href=\"javascript:void(0)\" onclick='prevImg()'></a> <a class=\"next\" href=\"javascript:void(0)\" onclick='nextImg()'></a> </div>"+
                "<div class=\"small_pic\"><ul> <li class=\"\"> <div class=\"pil-figure\"> <div class=\"pil-figure-placeholder\"> <div class=\"pil-figure-filler\" style=\"padding-bottom: 56.5217%;\"></div> <div class=\"pil-figure-media\"> <img crossorigin=\"Anonymous\" src=\"//dimg04.c-ctrip.com/images/300u13000000tyk4mFFF9_C_600_336_Q90.jpg\" class=\"pil-figure-image pil-figure-image-anim loaded\" width=\"115\" height=\"65\">"+
                "</div></div></div><span></span></li></ul></div></div></div></div></div></div></div>"
    })
    showImgList();
    /*$(".imvc-view-item>div").append($("<div></div>"));
    var data_index=$(this).attr("data-index");
    $("body").attr("style","overflow: hidden;");
    $(".imvc-view-item>div>div").load("imgDiv.html",function (){showProInfo(data_index)});*/

});

//查看儿童收费标准
$(".base_tip").hover(function () {
    $(".kid_tip").append($("<div class=\"qipao_pop\" style=\"width: 300px; margin-top: 2px; color: rgb(34, 34, 34);\"><div class=\"flt_tip_single\">1.2米以下儿童往返大交通免费无座，价格仅含当地用车、导服、全程半餐费用；<br>1.2~1.5米儿童不占床需要半价往返儿童票请点击预订下一步补车票费用差价奥；<br>1.2米以上儿童占床费用同成人。<br>【关于儿童早餐及门票费用信息说明】家庭出游可免费赠送1名儿童早餐免费，若携带2名儿童出游需现场补第2位儿童早餐费用10元/人；全程儿童门票费用参考：6月份150元/人；暑期7~8月份200元/人（仅针对携带优惠证件儿童；费用仅供参考，具体以景区规定为准）<br><br>【重要提示】：接交通法告知：怀抱婴儿必须占座，否则一律视为超载，所以请务必提交儿童订单谢谢！</div></div>"))
},function () {
    $(".kid_tip .qipao_pop").remove();
});
//拼接成人数和儿童数下拉列表
function appendPeopleList(indexOfInput){
    var $div=$("<div class='sub_list' style='display: none' ></div>");
    for (var i = 0; i <=10 ; i++) {
        var $a=$("<a href='javascript:;' rel='nofollow' onclick='countOfPerson("+indexOfInput+","+i+")'></a>");
        if(i==10){
            $a.text(">"+9);
        }else {
            $a.text(i);
        }
        $div.append($a);
    }
    //拼接
    $(".input_per:eq("+indexOfInput+") label").append($div);
}
//显示人数下拉列表选择人数
$(".input_per label input").focus(function () {
    $(this).next().next().show();
})

//选择日期
$("#J_DepartDate").focus(function () {
    $(".input_box div:eq(0)").addClass("cur");
    selectDate();
}).blur(function () {
    $(".input_box div:eq(0)").removeClass("cur");
});

//选择人数
function countOfPerson(indexOfInput,count) {
    if(count>9){
        $(".input_per label input:eq("+indexOfInput+")").attr("placeholder","请输入").val("");
    }else{
        $(".input_per label input:eq("+indexOfInput+")").attr("value",count);

    };
    $(".sub_list:eq("+indexOfInput+")").hide();
    if(sessionStorage.getItem("startTime")!=null){
        var totalPrice=parseInt($(".total_price em").text())*(parseInt($(".input_per label input:first").val())+parseInt($(".input_per label input:last").val())/2);
        $(".res_fee").html($("<span><dfn>¥</dfn></span>"+totalPrice+"<i class=\"i_fee\"></i>"));
    }
}

function getProductInfo(departCityName,productId){
    commonAjax("/product/getProductById","get",{departCityName:departCityName,id:productId},"json",
        function (data) {
            if(data.result){
                showProductInfo(data.data);
            }else{
                layer.msg(data.msg)
            }
    })
}
//渲染产品详细信息
function showProductInfo(product){
    product_param=product;
    sessionStorage.setItem("product",product);
    //标题
    sessionStorage.setItem("subHead",product.subHead);
    $("title").text(product.subHead+"-【携程旅游】");
    //副标题
    $("meta").attr("content",product.subHead);
    //查看所有照片的div的标题
    $(".img_broadcast_con h2").text(product.subHead);
    //属于哪个目的地
    $(".crumbs a:eq(1)").attr("title",product.distinationName+"旅游").html(product.distinationName+"<!---->旅游").next().text(product.subHead);
    //详细说明
    $(".detail_summary").find("h1").text(product.proName).next().text(product.productDetail);
    //钻级
    if(product.productLevel!=null){
        $(".detail_summary h1").append($("<a href='javascript:void(0)' target='_blank' ><span class='diamond_"+product.productLevel+"' onmouseover='javascript:layer.msg(\"没有其他的东西!没有实现\",{icon:6,time:1000})' data-role='jmp'></span></a>"))
    }
    //价格说明绑定mouseover事件
    $(".price_explain").attr("onmouseover","javascript:layer.msg(\"查看失败！没有实现\",{icon:6,time:1000});")
    //价格
    $(".total_price em").text(product.totalPrice);
    //出售总数和产品评论相关
    if(product.travelCount!=null){
        if(product.travelProGrade!=null){
            $(".score_inf").html("<span class=\"score_s\"><em>"+product.travelProGrade.productAvgGrade+"</em>分</span><span class=\"score_s score_dp\">"+product.travelProGrade.count+"条点评</span><span>"+product.travelCount+"<!-- -->人出游</span>");
        }else{
            $(".score_inf").html("<span class=\"score_s\"><em>"+5+"</em>分</span><span class=\"score_s score_dp\">假的100条点评</span><span>"+product.travelCount+"<!-- -->人出游</span>");
        }
    }else{
        $(".score_inf").html();
    }
    //获取产品照片，渲染
    var imgList=product.imgList;
    for (var i = 0; i<4 ; i++) {
        //产品页面只显示前四张照片
        $(".pil-figure-media:lt(5) img:eq("+i+")").attr({"src":"/"+(imgList[i].imgUrl.indexOf("statics")!=0?"statics/"+imgList[i].imgUrl:imgList[i].imgUrl),"data-index":i});
    }
    //查看图片总数
    $(".img_col li:last a span").html("查看全部图片<br/>(<!---->"+imgList.length+"<!---->)");

    //用来标记是否有产品特色这个dl
    var flag=false;
    if(product.hasFeature!=null){
        flag=true;
        $(".pro_det_inf").prepend($("<dl><dt>产品特色</dt><dd></dd></dl>"));
        var tagArr=product.hasFeature.split(";");
        for (var i = 0; i <tagArr.length ; i++) {
            if(/\b特卖汇\b|\b十一大促\b/.test(tagArr)){
                $(".pro_det_inf dl:eq(0)").append($("<span class='hot_tag' title='"+tagArr[i]+"'>"+tagArr[i]+"</span>"))
            }else{
                $(".pro_det_inf dl:eq(0)").append($("<span class='tag_com' title='"+tagArr[i]+"'>"+tagArr[i]+"</span>"))
            }
        }
    }
    //渲染服务保障
    if(product.hasServiceAss!=null){
        var $dl=$("<dl><dt>服务保障</dt><dd class='service_guarantee'></dd></dl>");
        var tagArr=product.hasServiceAss.split(";");
        for (var i = 0; i <tagArr.length ; i++) {
            if(tagArr[i]=="成团保障"){
                $dl.find("dd").append($("<span title=\"订单一经携程旅行网以书面形式确认后均默认发团（不可抗力除外）\"><i></i>成团保障</span><span></span>"))
            }else{
                $dl.find("dd").append($("<span title=\""+tagArr[i]+"\"><i></i>"+tagArr[i]+"</span><span></span>"))
            }

        }
        //根据flag决定插入的位置
        if(flag){
            $(".pro_det_inf dl:first").after($dl);
        }else{
            $(".pro_det_inf").prepend($dl);
        }
    }
    //渲染供应商
    $(".pro_det_inf dl:last").prev().find("dd i").attr("class",product.provider.providerAbb=="携程自营"?"ctrip_icon":"other_icon");
    $(".pro_det_inf dl:last").prev().find("dd span").text(" "+product.provider.providerAbb).attr({"data-tipinfo":product.provider.providerAbb+"("+product.provider.providerName+")","data-params":""});
    //渲染查看供应商经营许可证
    $("#jmp-tip-uid_15672363803908788982970 div[class='base_jmp jmp_title qipao_pop credentials_content base_jmp_c']").find("div[class='jmp_content'] div div:first").html(product.provider.providerAbb+"("+product.provider.providerName+")"+
        "<br/>许可证编号："+product.provider.licenseNo+"<a href=\"javascript:void(0)\"  class=\"credentials_content_blue\" onclick='javascript:alert(\"查看不了\")'><i></i>经营许可证</a>");
    //渲染产品特点
    $(".pro_det_inf dl:last dd ul li").remove();//移除原有的li
    if(product.isHot !=null){
        //添加人气产品li
        $(".pro_det_inf dl:last dd ul").append($("<li class='pm_rec_special'><span class='pm_rec_icon'></span>"+"「"+product.distinationName+"·"+product.travelProductType+"」人气产品"+"</li>"))
    }else{

    }
    var sellingPoint=product.sellingPoints.split("★");
    for (var i = 1; i <sellingPoint.length; i++) {
        //渲染卖点
        $(".pro_det_inf dl:last dd ul").append($("<li>★"+sellingPoint[i]+"</li>"))
    }
    //渲染评论
    layer.msg("评论还没有做",{icon:6,time:1000});
    $(".prd_num").text("编号:"+product.id)
}
$(".res_btn ").click(function () {
   if($(".res_fee").text()!="--"){
       sessionStorage.setItem("adultNum",$(".input_per:eq(0) label input").val());
       sessionStorage.setItem("childrenNum",$(".input_per:eq(1) label input").val());
       sessionStorage.setItem("totalPrice",$(".res_fee").text().substring(1));
       //先查询库存
       commonAjax("/product/getAllInv","get",{startTime:sessionStorage.getItem("startTime"),endTime:sessionStorage.getItem("startTime"),productId:productId},"json",function (data) {
           if(data.data[0].store>$(".input_per:eq(0) label input").val()){
               setTimeout( window.location.href="vacation_bill.html",5000);
           }else{
               layer.msg("当前日期的库存不足，请重新挑选出行日期");
           }
       })

    }else{
       if($(".input_per:eq(0) label input").val()=="0" || $(".input_per:eq(0) label input").val()=="请输入"){
           layer.msg("请确认成人数");
       }else if($(".end_cal").text()=="请选择出发日期"){
           layer.msg("请选择出发日期");
       }
   }
})

function selectDate(){
    var nowDate=new Date();
    layui.use(['laydate'], function(){
        var laydate = layui.laydate;
        //常规用法
        laydate.render({
            elem: '#J_DepartDate',
            btns:[],
            min: nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+"-"+(nowDate.getDate()+1),
            done:function(value,date){
                var start=new Date(value);
                //出发日期
                sessionStorage.setItem("startTime",value);
                var proName=$(".detail_summary h1").text();
                //行程天数
                sessionStorage.setItem("daysTrip",proName.substring().substring(proName.indexOf("日")-1,proName.indexOf("日")));
                var day=parseInt(proName.substring().substring(proName.indexOf("日")-1,proName.indexOf("日")));
                var end=new Date(start.getTime()+(day*24-12)*60*60*1000);
                $(this).val(value);
                $(".input_star").html("<span class=\"end_cal\" style=\"margin-top:9px\">请选择出发日期</span><b class=\"b\"></b>");
                $(".input_star span:first").text(value+" 星期"+selectWeek(start.getDay())).after($("<span class='end_cal'>至 "+((end.getMonth()+1)>=10?(end.getMonth()+1):("0"+(end.getMonth()+1)))+"-"+(end.getDate()>=10?end.getDate():("0"+end.getDate()))+" 星期"+selectWeek(end.getDay())+" 返回</span>"));
                $(".input_star span:first").attr("style","margin-top:0px");
                if($(".input_star  span:first").text()!="请选择出发日期"){
                    var price=$(".total_price em").text();
                    sessionStorage.setItem("price",price);
                    var totalPrice=parseInt(price)*(parseInt($(".input_per label input:first").val())+parseInt($(".input_per label input:last").val())/2);
                    $(".res_fee").html($("<span><dfn>¥</dfn></span>"+totalPrice+"<i class=\"i_fee\"></i>"));
                }

            }
        })
    })

}


$(".from_city").hover(function () {
    $(this).find(".from_city_list").show();
},function () {
    $(this).find(".from_city_list").hide();
})
$(".from_city_list").hover(function () {
    $(this).show();
},function () {
    $(this).hide();
})

function selectWeek(num) {
    switch (num) {
        case 0:
            return "日";
            break;
        case 1:
            return "一";
            break;
        case 2:
            return "二";
            break;
        case 3:
            return "三";
            break;
        case 4:
            return "四";
            break;
        case 5:
            return "五";
            break;
        case 6:
            return "六";
            break;
    }
}
var count=1;//删除重复的标签
var imgUrl;//img路径
var imgList;//img对象集合
var imgCount;//img总数
var index=0;//渲染的小img下标
function showImgList() {
    showProInfo(sessionStorage.getItem("product"))
}
//渲染照片
function showProInfo(data_index) {
    var obj=product_param;
    $(".imvc-view-item>div>div:gt(0)").remove();
    if(count<=1){
        //渲染产品副标题
        $(".img_broadcast_con h1").text(obj.subHead);
        //渲染产品评分和出游总数
        if(obj.travelCount!=null){
            $(".mask_score_inf span").remove();
            if(obj.travelProGrade!=null){
                $(".mask_score_inf").html("<span class=\"score_s\"><em>"+obj.travelProGrade.productAvgGrade+"</em>分</span><span class=\"score_s score_dp\">"+obj.travelProGrade.count+"条点评</span><span>"+obj.travelCount+"<!-- -->人出游</span>");
            }
        }else{
            $(".score_inf").html();
        }
        //渲染大照片
        if((typeof data_index)=="undefined"){
            index=0;
        }else{
            index=data_index;
        };
        //选取小照片模板
        var $temp=$(".small_pic ul li:eq(0)");
        $(".small_pic ul li").remove();
        imgList=obj.imgList;
        imgCount=imgList.length;
        for (var i = 0; i <imgList.length ; i++) {
            //赋值模板
            var $clone=$temp.clone();
            $clone.find(".pil-figure-media img").attr({"src":(imgList[i].imgUrl.indexOf("statics")!=0?"/statics/"+imgList[i].imgUrl:"/"+imgList[i].imgUrl),"data-index":i});
            if(i==index){
                $clone.attr("class","current");
            }
            if(i>=5){
                $clone.attr("class"," hidden");
            }
            $(".small_pic ul").append($clone);
        }
        imgUrl=$(".small_pic ul li[class='current']").find("img").attr("src");
        //alert(parseInt(index)+1+"/"+imgList.length)
        //alert($(".big_pic img").attr("src"));
        showBigImg(imgUrl,index);

        $("div[class='pil-figure-media'] img").click(function () {
            $(this).attr("class","current").siblings().attr("class","");
            imgUrl=$(this).attr("src");
            index=$(this).attr("data-index");
            $(this).parent().parent().parent().parent().attr("class","current").siblings().attr("class","");
            showBigImg(imgUrl,index);
        });

    }
    count ++;

}
//切换至上一张照片
function prevImg() {
    if(index>0){
        index--;
    }else{
        index=imgCount-1;
    }
    imgUrl=$(".small_pic ul li img:eq("+index+")").attr("src");
    $(".small_pic ul li:not("+index+")").attr("class","");
    $(".small_pic ul li:eq("+index+")").attr("class","current")
    showBigImg(imgUrl,index);
}
//点击切换下一张照片
function nextImg() {
    if(index<imgCount-1){
        index++;
    }else{
        index=0;
    }
    imgUrl=$(".small_pic ul li img:eq("+index+")").attr("src");
    $(".small_pic ul li:not("+index+")").attr("class","");
    $(".small_pic ul li:eq("+index+")").attr("class","current")
    showBigImg(imgUrl,index);
}
function showBigImg(imgUrl,index) {
    $(".big_pic img").attr("src",imgUrl);
    $(".img_tit span").text((parseInt(index)+1)+"/"+imgCount);
}
//点击关闭
function closeDiv() {
    $("body").attr("style","overflow: auto;");
    $(".imvc-view-item>div div").remove();
    window.location.reload();
}