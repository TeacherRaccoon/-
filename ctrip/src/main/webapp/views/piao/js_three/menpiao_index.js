function getRandoms() {
    var data = [];//记录index
    for (var i = 0; i < 4; i++) {
        for (var k = 0; ; k++) {
            var flag = false;
            var num = Math.floor(Math.random() * (8));//随机数
            for (var j = 0; j <= i; j++) {//遍历数据
                if (num == data[j]) {
                    flag = true;
                }
            }
            if (!flag) {
                data[i] = num;
                break;
            }
        }
    }
    return data;
}

getRandoms();

//特权票显示
function getTicket01(cityId) {
    sendAjax("http://localhost:8080/ticket/getTicketSpot", {cityId: cityId}, "POST", "JSON",
        function (data) {
            var index = getRandoms();
            var da = data.data;


            for (var i = 0; i < 4; i++) {
                $_li = $("<li></li>");
                var inLi = "<a target='_blank'" +
                    "                               href='mengPiao_guangZhou.html?spotId=" + da[index[i]].id + "'" +
                    "                               title='" + da[index[i]].spotName + "'>" +
                    "                               <img src='" + da[index[i]].imgUrl.split("=")[0] + "' alt='" + da[index[i]].spotName + "'" +
                    "                                     class='list_pic'/>" +
                    "                                <em class='icon_discount'>5<span>折</span><i></i></em>" +
                    "                                <h3 class='list_title' title='" + da[index[i]].spotName + "门票'>" +
                    "                                    " + da[index[i]].spotName + "</h3>" +
                    "                                <p class='list_time' title='" + da[index[i]].special + "'>" + da[index[i]].special + "</p>" +
                    "                                <span class='btn_panic'>抢购<i></i></span>" +
                    "                                <p>" +
                    "                                    <em class='base_price'>" +
                    "                                        特权价<dfn>&yen;</dfn><strong>" +
                    "                                        " + da[index[i]].price + "" +
                    "                                    </strong>" +
                    "                                    </em>" +
                    "                                </p>" +
                    "                            </a>"
                $_li.html(inLi);
                $("#privilege_list").append($_li);
            }
        })
}

//特权票
getTicket01(2);

//城市切换功能
var canChangeCity = true;

function changeCity() {
    $("#ticket_tab a").click(function () {
        $(this).prop("class", "cur");
        var index = $(this).index();
        $("#ticket_tab a").each(function () {
            if (index != $(this).index()) {
                $(this).prop("class", "");
            }
        })
        //获取当前城市的id
        var s = $(this).attr("data-tabid");
        getTicket02(s);
    })
}


//获取城市
function getCity() {
    sendAjax("http://localhost:8080/user/getCity", "", "POST", "JSON",
        function (data) {
            var da = data.data;
            var cla = "cur";
            for (var i = 0; i < da.length; i++) {
                if (i != 0) {
                    cla = "";
                }
                $('#ticket_tab').append("<a href='javascript:void(0)' data-tabid='" + da[i].id + "' class=" + cla + ">" + da[i].cityName + "</a>");
            }
            changeCity();//样式转换
        })
}

getCity();

//城市切换提供不同的票供选择
function getTicket02(cityId) {
    $("#ticket_tab a").unbind("click");
    sendAjax("http://localhost:8080/ticket/getTicketSpot", {cityId: cityId}, "POST", "JSON",
        function (data) {
            $("#ticket_tab a").bind("click",function(){changeCity()});
            var da = data.data;
            $("#area_list li").remove();
            for (var i = 0; i < 8; i++) {
                $('#area_list').append("<li>" +
                    "                        <a target='_blank' href='http://localhost:8080/views/piao/mengPiao_guangZhou.html?spotId=" + da[i].id + "' title='" + da[i].spotName + "'>" +
                    "                            <img src='" + da[i].imgUrl.split("=")[0] + "' alt='" + da[i].spotName + "' class='list_pic'>" +
                    "                            <h3 class='list_title' title='" + da[i].spotName + "'>" + da[i].spotName + "</h3>" +
                    "                            <p class='list_time' title='" + da[i].special + "" +
                    "'>" + da[i].special + "" +
                    "                                ...</p>" +
                    "                            <p>" +
                    "                                <em class='base_price'>" +
                    "                                    <dfn>¥</dfn><strong>" +
                    "                                    " + da[i].price + "" +
                    "                                </strong>" +
                    "                                </em>起" +
                    "                            </p>" +
                    "                        </a>" +
                    "                    </li>");
            }
        })
}
getTicket02(1);//区域门票显示

//人气榜单--深圳
function renqi(cityId) {
    sendAjax("http://localhost:8080/ticket/getTicketSpot", {cityId: cityId}, "POST", "JSON",
        function (data) {
            var da = data.data;
            //渲染
            for (var i = 0; i < 4; i++) {
                var k = 4 * i - 1;
                for (var j = 0; j < 4; j++) {
                    $("#basefix0" + i + "").append("<a href='mengPiao_guangZhou.html?spotId=" + da[i + j].id + "'" +
                        "                       title='" + da[i + j].spotName + "' target='_blank'>" +
                        "                        <img src='" + da[j + i].imgUrl.split("=")[0] + "' width='230'" +
                        "                             height='130'/>" +
                        "                        <h3 title='" + da[i + j].spotName + "'>" + da[j].spotName + "</h3>" +
                        "                        <p class='price_box'>" +
                        "                            <em class='base_price'>" +
                        "                                <dfn>&yen;</dfn><strong>" +
                        "                                " + da[i + j].price + "" +
                        "                            </strong>" +
                        "                            </em>起 " +
                        "                        </p>" +
                        "                        <span class='btn_buy'>抢购</span>" +
                        "                        <p class='discount_price'>" +
                        "                            <em>9.0</em>折&nbsp;/&nbsp;省&nbsp;<span>" +
                        "                                        <dfn>&yen;</dfn>" +
                        "                                        25" +
                        "                                    </span>" +
                        "                        </p>" +
                        "                    </a>");
                }

            }
        })
}

renqi(2);
//搜索的单击事件 获取搜索框的内容传递至景点 list
$("#main_search_btn").click(function () {
    var params = $("#mainInput").val();
    sessionStorage.setItem("mparams",params);

    setTimeout(function () {
        location.href = "http://localhost:8080/views/piao/piaoList.html";
    }, 500);
})

var carousel = null;
layui.use('carousel', function () {
    carousel = layui.carousel;
});

carousel.render({
    elem: '#test10'
    , width: '778px'
    , height: '440px'
    , interval: 5000
});

function getHotSpot(){
    sendAjax("http://localhost:8080/ticket/getHotSpot","","POST","JSON",function(data){
        var da = data.data.data;
       $("#recommend a").remove();
        for(var j=0;j<4;j++){
        $('#recommend').append("<a href='mengPiao_guangZhou.html?spotId="+da[j].id+"'"+
            "                               target='_blank'>"+da[j].spotName+"</a>");

        }


    })
}
getHotSpot();
