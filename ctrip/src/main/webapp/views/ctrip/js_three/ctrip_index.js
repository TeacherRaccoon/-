


//城市切换js
function changeCity() {
    $("#city li").click(function () {
        if ($(this).index() != 7) {

            $(this).prop("class", "active");
        }

        var index = null;
        index = $(this).index();

        $("#city li").each(function () {
            if ($(this).index() != index) {
                $(this).prop("class", "");
            }
        })
    })
}

changeCity();


//酒店搜索
$(function () {
    $("#HD_Btn").click(function () {
        location.href = "hotelList.html"
    })
})


//页面加载获取酒店列表信息
$(function () {

})

function getHotelList(cityId) {
    // // if(flag){
    // //     $("#city li").prop("class","");
    // // }else{
    // //     $("[value='0']").prop("selected",true).hide();
    // }


//首页酒店
    $("#cityList div").remove();
    sendAjax("http://localhost:8080/addData/city", {cityId: cityId}, "get", "JSON",
        function (data) {


            //渲染数据
            var da = data.data;
            for (var i = 0; i < da.length; i++) {
                //  alert(da[1].imgUrl);
                $_div = $("<div class='product-item' title='"+da[i].hotelName+")'></div>");

                var _div =
                    "                                <div class='item-thumbnail'>"+
                    "                                    <a href='http://hotels.ctrip.com/hotel/1816847.html#ctm_ref=ssc_hp_htl_snd_pro_1'"+
                    "                                       target='_blank' group='a'>"+
                    "                                        <img src='../../"+da[i].imgUrl+"'"+
                    "                                             alt='"+da[i].hotelName+"'></a></div>"+
                    "                                <p class='item-name item-name-space'>"+
                    "                                    <a group='a'"+
                    "                                       href='http://hotels.ctrip.com/hotel/1816847.html#ctm_ref=ssc_hp_htl_snd_pro_1'"+
                    "                                       target='_blank'>"+da[i].hotelName+"</a></p>"+
                    "                                <p class='item-info'><span class='price'><dfn>￥</dfn>"+da[i].price+"<i"+
                    "                                        class='price_info'>起</i></span>"+
                    "                                    <span class='diamond star0"+da[i].level+"'></span>"+
                    "                                    <a class='item-type' target='_blank'"+
                    "                                       href='http://hotels.ctrip.com/hotel/Beijing1/zone138#ctm_ref=ssc_hp_htl_snd_txt_6'>"+da[i].address+"</a>"


                $_div.html(_div);
                $("#cityList").append($_div);

            }

        })

}
getHotelList(1);

/*
function more() {
$(".dropdown-menu-list").show();

}

*/
$("[value='0']").prop("selected",true).hide();
$("#more").change(function () {
    var id = $(this).val();
    getHotelList(id,true);

})




//城市切换js
function change() {
    $("#travel li").click(function () {
        if ($(this).index() != 7) {

            $(this).prop("class", "active");
        }

        var index = null;
        index = $(this).index();

        $("#travel li").each(function () {
            if ($(this).index() != index) {
                $(this).prop("class", "");
            }
        })


    })
}

change();

//页面加载获取旅游景点列表信息
$(function () {
    layui.use(['carousel', 'form'], function(){

        var carousel = layui.carousel
            ,form = layui.form;

        //常规轮播
        carousel.render({
            elem: '#test1'
            ,width: '100%'
            ,height: '440px'
            ,arrow: 'always'
        });

    })
})
function getProduct(departCityId) {
    /* if (flag) {
         $("travel li").prop("clsaa", "");
     } else {
         $("[value='0']").prop("selected", true).hide();
     }*/

    $("#travelList div").remove();
    sendAjax("http://localhost:8080/addData/travel", {departCityId: departCityId}, "get", "JSON",
        function (data) {
            //渲染数据
            var d = data.data;

            for (var i = 0; i < d.length; i++) {

                $_div = $("<div class='product-item' title='" + d[i].subHead+ "'></div>");
                var href='/views/vacation/vacationGenTuan.html?startcity=2&salecity=2&cityname=深圳&productId='+d[i].id;
                var _div =

                    "<a href="+href+" target='_blank'>" +
                    "<div class='item-thumbnail'>" +
                    "<img src='../../../statics/"+d[i].imgUrl+"' alt='"+d[i].subHead+"'></div>" +
                    "<p class='item-name'>"+d[i].subHead+"</p>" +
                    "<p class='item-info'><span class='price'><dfn>¥</dfn>"+d[i].totalPrice+"<i class='price_info'>起</i></span>" +
                    "<span class='diamond diamond0"+d[i].productLevel+"'></span></p></a>";
                $_div.html(_div);
                $("#travelList").append($_div);


            }
        })
}

getProduct(1);

$("[value='0']").prop("selected",true).hide();
$("#lvyou").change(function () {
    var id = $(this).val();
    getProduct(id,true);
})



//城市切换js
function menCity() {
    $("#menpiaoid li").click(function () {
        if ($(this).index() != 7) {

            $(this).prop("class", "active");
        }

        var index = null;
        index = $(this).index();

        $("#menpiaoid li").each(function () {
            if ($(this).index() != index) {
                $(this).prop("class", "");
            }
        })


    })
}
menCity();

function getticket(cityId) {

    $("#ticketlist div").remove();
    sendAjax("http://localhost:8080/addData/mempiao", {cityId: cityId}, "get", "JSON",
        function (data) {
            //渲染数据

            var d = data.data;
            for (var i = 0; i < d.length; i++) {
                imgUrl = d[i].imgUrl.split("=")[0];
                $_div = $("<div class='product-item' onclick='javascript:toSpotInfo("+d[i].id+")' title='" + d[i].spotName + "'></div>");
                var _div =
                    "<a  onclick='javascript:toSpotInfo(\"+d[i].id+\")'  target='_blank'>" +
                    "<div class='item-thumbnail'><img src='"+imgUrl+ "' alt='" + d[i].spotName + "'></div>" +
                    "<p class='item-name'>" + d[i].spotName + "</p>" +
                    "<p class='item-info'><span class='price'><dfn>¥</dfn>" + d[i].price + "<i class='price_info'>起</i></span>"+
                    "   <span class='diamond diamond0"+d[i].level.length+"'></span></p></a>";
                $_div.html(_div);
                $("#ticketlist").append($_div);

            }
        })
}

getticket(1);
$("[value='0']").prop("selected",true).hide();
$("#menpiao").change(function () {
    var id = $(this).val();
    getticket(id,true);
})

function toSpotInfo(spotId){
    location.href="http://localhost:8080/views/piao/mengPiao_guangZhou.html?spotId="+spotId+"";
}

$("#searchBoxUl li").hover(function(){
    $("#searchBoxUl li").attr("class","");
    $(this).attr("class","s_tab_current");
    var index01 = $(this).index();
    console.log(index01)

})

$("#searchBoxUl li").on("click",function(){
    if($(this).text()=="旅游"){
        $("#hotelSwitch").parent().hide(); //酒店
        $("#vacationSwitch").parent().show()//旅游
        $("#Taocan_switch ").parent().hide()//门票

        $("#vacationForm5 ").hide()//门票
        $("#chinaHotelForm ").hide()//酒店
        $("#vacationForm2 ").show()//旅游
    }else if($(this).text()=="门票"){
        $("#hotelSwitch").parent().hide(); //酒店
        $("#vacationSwitch").parent().hide()//旅游
        $("#Taocan_switch ").parent().show()//门票
        $("#vacationForm5 ").show()//门票
        $("#chinaHotelForm ").hide()//酒店
        $("#vacationForm2 ").hide()//旅游
    }
    else if($(this).text()=="酒店"){
        $("#hotelSwitch").parent().show(); //酒店
        $("#vacationSwitch").parent().hide()//旅游
        $("#Taocan_switch ").parent().hide()//门票
        $("#vacationForm5 ").hide()//门票
        $("#chinaHotelForm ").show()//酒店
        $("#vacationForm2 ").hide()//旅游
    }
})


