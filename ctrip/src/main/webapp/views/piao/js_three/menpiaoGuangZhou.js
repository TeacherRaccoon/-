var inPartAddress = null;
$(function () {
    $("#booking-btn").click(function () {
        location.href = "piaoChangLongBill.html";
    })

    //服务承诺功能
    $(".show-promise-detail").click(function () {
        $("body").attr("style", "overflow:hidden");//滚动条停止
        $("#filter_modal").prop("class", "filter-modal in");
        $("#text_center").show();
    })
    $(".f-close").click(function () {
        $("body").attr("style", "");//滚动条停止
        $("#filter_modal").prop("class", "");
        $("#text_center").hide();
    })

    //预订门票时的展开功能
    $(".arrow_box").attr("flag", 0);
    $(".arrow_box").click(function () {

        var flag = $(this).attr("flag");
        if (flag == 0) {

            $(this).html("收起" + "<i class='arrow_top' data-reactid='117'></i>");
            $(this).attr("flag", 1);
            $(this).parents(".ticket-table").next().show();
        } else {
            $(this).html("展开" + "<i class=\"arrow_bottom\" data-reactid=\"117\"></i>");
            $(this).attr("flag", 0);
            $(this).parents(".ticket-table").next().hide();
        }
    })
    //预订门票展开功能end

    $(".ticket-title ").attr("flag", 0).attr("index", 0).click(function () {

        var index = $(this).attr("index");
        if (index == 0) {//第一次点击时触发的函数

            $(this).parent().parent().parent().append("<tr class='detail-layer '>" +
                "    <td>" +
                "        <div class='ticket-detail-wrapper'><i class='arrow'></i>" +
                "            <div class='ticket-detail-content'>" +
                "                <div class='ticket-detail-info'>" +
                "                    <div class='consult_box'>" +
                "                        <div class='consult_item service'><span class='f-consult'></span><span class='txt'>在线咨询</span>" +
                "                        </div>" +
                "                    </div><!-- react-empty: 825 -->" +
                "                    <div class='ticket-detail-desc'><strong>预订说明</strong>" +
                "                        <div>" +
                "                            <dl>" +
                "                                <dt>预订时间</dt>" +
                "                                <dd><span><span class='ticket-bg-newblue'>随买随用</span></span>" +
                "                                    <p><!-- react-text: 835 -->最晚需在<!-- /react-text --><i" +
                "                                            class='ticket-color-newyellow'>出行当天17:00(当地时间)</i><!-- react-text: 837 -->" +
                "                                        前购买<!-- /react-text --></p></dd>" +
                "                            </dl>" +
                "                            <dl>" +
                "                                <dt>有效期</dt>" +
                "                                <dd><span><span class='ticket-bg-newblue'>30天有效期</span></span>" +
                "                                    <p>选择的使用日期起30天内使用有效，限使用1次。</p>" +
                "                                    <p>所有日期均为当地时间。</p></dd>" +
                "                            </dl>" +
                "                            <dl>" +
                "                                <dt>出票速度</dt>" +
                "                                <dd><p>平均1秒出票</p></dd>" +
                "                            </dl>" +
                "                            <dl>" +
                "                                <dt>适用条件</dt>" +
                "                                <dd><p>" + $(this).html().split("【")[1].split("】")[0] + "</p></dd>" +
                "                            </dl>" +
                "                        </div>" +
                "                    </div>" +
                "                    <div class='ticket-detail-desc'><strong>费用说明</strong>" +
                "                        <div>" +
                "                            <dl>" +
                "                                <dt>费用包含</dt>" +
                "                                <dd><p>" + $("title").html() + "</p>" +
                "                                    <p>不含：一切个人消费及费用包含中未提及的任何费用</p></dd>" +
                "                            </dl>" +
                "                        </div>" +
                "                    </div>" +
                "                    <div class='ticket-detail-desc'><strong>使用说明</strong>" +
                "                        <div>" +
                "                            <dl>" +
                "                                <dt>使用方法</dt>" +
                "                                <dd><span class='ticket-bg-newblue'>无需取票，快速入园</span>" +
                "                                    <p>凭携程发送的二维码直接验证入园</p></dd>" +
                "                            </dl>" +
                "                            <dl>" +
                "                                <dt></dt>" +
                "                                <div class='info_right detail-layer-ticket-li'></div>" +
                "                                <div><!-- react-empty: 873 -->" +
                "                                    <table class='detail-ticket-table'>" +
                "                                        <tbody>" +
                "                                        <tr class='tkt-table-title'>" +
                "                                            <td class='table-title-add'><!-- react-text: 878 -->入园<!-- /react-text -->" +
                "                                                <!-- react-text: 879 -->地址<!-- /react-text --></td>" +
                "                                            <td class='table-title-time'><!-- react-text: 881 -->入园<!-- /react-text -->" +
                "                                                <!-- react-text: 882 -->时间<!-- /react-text --></td>" +
                "                                        </tr>" +
                "                                        <tr class='tkt-table-li'>" +
                "                                            <td class='table-li-add'>" +
                "                                                <div class='table-li-add-container'>" + $("title").html() + "：" + inPartAddress + "" +
                "                                                </div>" +
                "                                            </td>" +
                "                                            <td class='table-li-time'><span><!-- react-text: 888 -->10:00~20:00(周末及假日 19:00停止入场)" +
                "                                                <!-- /react-text --><br></span><span><!-- react-text: 891 -->11:00~20:00(平日 19:00停止入场)" +
                "                                                <!-- /react-text --><br></span></td>" +
                "                                        </tr>" +
                "                                        </tbody>" +
                "                                    </table>" +
                "                                </div>" +
                "                            </dl>" +
                "                            <dl>" +
                "                                <dt>补充说明</dt>" +
                "                                <dd><p>上述时间均为日本时间，请于入园时出示确认单页面：我的-全部订单-点开对应订单后展开全部订单信息即可扫码入园。</p></dd>" +
                "                            </dl>" +
                "                        </div>" +
                "                    </div>" +
                "                    <div class='ticket-detail-desc'><strong>退改说明</strong>" +
                "                        <div>" +
                "                            <dl>" +
                "                                <dt>退改规则</dt>" +
                "                                <dd><p>不可退</p>" +
                "                                    <p>该产品一经预订成功，不支持退改，敬请谅解。</p></dd>" +
                "                            </dl>" +
                "                        </div>" +
                "                    </div>" +
                "                    <div class='ticket-detail-desc'><strong>其他说明</strong>" +
                "                        <div>" +
                "                            <dl>" +
                "                                <dt>发票说明</dt>" +
                "                                <dd><p>" +
                "                                    如需发票，请在游玩结束次日登录最新版本的携程旅行手机客户端，或点击携程确认短信中的查看订单详情链接，在订单详情页中申请，发票金额不含优惠券或礼品卡支付部分。</p>" +
                "                                </dd>" +
                "                            </dl>" +
                "                            <dl>" +
                "                                <dt>其他须知</dt>" +
                "                                <dd><p>1）票券有效期：下单指定日期起30内有效</p>" +
                "                                    <p>2）园区可能根据现场状况调整营业时间，出行前请查询官网。https://tokyo.legolanddiscoverycenter.jp" +
                "                                        访问路径：设施概要-营业时间</p></dd>" +
                "                            </dl>" +
                "                        </div>" +
                "                    </div>" +
                "                    <div class='ticket-detail-desc ticket-supplier-box'>" +
                "                        <dl>" +
                "                            <dt class='name'>供应商：</dt>" +
                "                            <dd><p>上海携程国际旅行社有限公司</p>" +
                "                                <p><span><!-- react-text: 924 -->许可证<!-- /react-text --><!-- react-text: 925 -->编号：" +
                "                                    <!-- /react-text --><!-- react-text: 926 -->L-SH-CJ00025<!-- /react-text --></span>" +
                "                                </p></dd>" +
                "                        </dl>" +
                "                    </div>" +
                "                </div>" +
                "            </div>" +
                "            <div class='packup-btn'><!-- react-text: 942 -->收起<!-- /react-text --><i></i></div>" +
                "        </div>" +
                "    </td>" +
                "</tr>");
            $(this).attr("class", "ticket-title on").attr("flag", 0);
        } else {
            //多次打开预订须知
            if ($(this).attr("flag") == 0) {
                $(this).parent().parent().next().attr("class", "detail-layer hide");
                $(this).attr("flag", 1).attr("class", "ticket-title");
            } else {
                $(this).parent().parent().next().attr("class", "detail-layer ");
                $(this).attr("flag", 0).attr("class", "ticket-title on");
            }
        }


        //预订说明收起功能
        $(".packup-btn").click(function () {

            $(this).parent().parent().parent().attr("class", "detail-layer hide");
            $(this).parent().parent().parent().prev("tr").find("a").attr("flag", 1).attr("class", "ticket-title");

        })
        var j = 1;
        $(this).attr("index", j++);
    });
    //预订须知end

    //预订须知-景点简介-用户点评的悬浮
    $("[data-reactid='477'] li").click(function () {
        navH = $("[data-reactid='475']").offset().top;
        know = $("[data-reactid='487']").offset().top - 49;//预订须知
        spot = $("[data-reactid='504']").offset().top - 49;//获取景点的滑动距离
        ways = $("[data-reactid='517']").offset().top - 49;//交通
        comt = $("[class='label user-reviews-label']").offset().top - 49;//用户点评
        var index = $(this).index();//获取当前被点击的 li 下标

        $("[data-reactid='477'] li").each(function () {
            if ($(this).index() != index) {
                $(this).attr("class", "");
            } else {
                $(this).attr("class", "selected");
            }
        })
        if (index == 0) {//定位至所对应的模块 如：点击悬浮的预订须知会跳至预订须知模块
            $("html,body").animate({scrollTop: know}, 500);
        } else if (index == 1) {
            $("html,body").animate({scrollTop: spot}, 500);
        } else if (index == 2) {
            $("html,body").animate({scrollTop: ways}, 500);
        } else if (index == 3) {
            $("html,body").animate({scrollTop: comt}, 500);
        }


    })
    //点击查看所有评论按钮触发点击用户评论的事件
    $("#count1").click(function () {
        $("[data-reactid='477'] li:eq(3)").trigger("click");
    })
    var navH = $("[data-reactid='475']").offset().top;
    var know = $("[data-reactid='487']").offset().top - 49;//预订须知
    var spot = $("[data-reactid='504']").offset().top - 49;//获取景点的滑动距离
    var ways = $("[data-reactid='517']").offset().top - 49;//交通
    var comt = $("[class='label user-reviews-label']").offset().top - 49;//用户点评
//49
    $(window).scroll(function () {
        var scroH = $(this).scrollTop();//获取滚动条的滑动距离
        if (scroH >= navH) {
            $("[data-reactid='476']").css({"position": "fixed", "top": 0, "z-index": 10001});
        } else if (scroH < navH) {
            $("[data-reactid='476']").css({"position": "static"});
        }

        if (scroH < spot) {//滚动条距离小于旅游景点时  旅游景点呗选中
            $("[data-reactid='477'] li").each(function () {
                if ($(this).index() != 0) {
                    $(this).attr("class", "");
                } else {
                    $(this).attr("class", "selected");
                }
            })
        } else if (spot <= scroH && scroH < ways) {//滚动条位于景点简介和交通指南之间
            $("[data-reactid='477'] li").each(function () {
                if ($(this).index() != 1) {
                    $(this).attr("class", "");
                } else {
                    $(this).attr("class", "selected");
                }
            })
        } else if (ways <= scroH && scroH < comt) {//当前滚动条大于交通指南的滚动距离
            $("[data-reactid='477'] li").each(function () {
                if ($(this).index() != 2) {
                    $(this).attr("class", "");
                } else {
                    $(this).attr("class", "selected");
                }
            })
        } else if (comt <= scroH) {//当前滚动条距离大于用户点评
            $("[data-reactid='477'] li").each(function () {
                if ($(this).index() != 3) {
                    $(this).attr("class", "");
                } else {
                    $(this).attr("class", "selected");
                }
            })
        }


    })
})


//获取参数
var spotId = getParam();
if (spotId == null || spotId == '') {
    spotId = 1;
}


//根据 spotId查询景点详情***************************开始******************************
function getSpot(spotId) {
    sendAjax("http://localhost:8080/ticket/getSpot", {spotId: spotId}, "POST", "JSON",
        function (data) {
            var page = 0;//用来记录当前图片所在的页数，从0开始;
            var left = null; //记录 Ul的left属性值;
            var da = data.data;//返回的数据
            inPartAddress = da.address;
            //渲染数据
            $("title").html(da.spotName + "【门票】");
            $("div[class='brief-right'] h2").html(da.spotName);
            $("#address").html(da.address);
            $("#openTime").html(da.openTime);
            if (da.level != null && da.levle != '') {
                $("h2").next().attr("class", "spot-grade").children().html(da.level);
            }

            //景点门票名称
            $("[data-reactid=\"151\"]").html(da.spotName + "门票");

            //特色
            if (da.special != null) {
                $("[class='introduce-feature']").append("<li data-reactid='506'>" +
                    "<span class='icon' data-reactid='507'>特色</span>" +
                    "<span data-reactid='508'>" + da.special + "</span>" +
                    "</li>");
            }
            var price = da.price;
            //门票价格
            $("[data-reactid='163']").html(Math.ceil(price * 0.4));//成人票起步
            $("[data-reactid='191']").html(price);//成人通票
            $("[data-reactid='215']").html(Math.ceil(price * 0.4));//夜场票
            $("[data-reactid='239']").html(Math.ceil(price * 0.95));//提前预定
            $("#fir05").html(Math.ceil(price * 0.7));//情侣票
            $("").html(Math.ceil(price * 0.7));//情侣票
            $("[data-reactid='272']").html(Math.ceil(price * 1.4));//亲子票
            $("#fir08").html(Math.ceil(price * 1.4));//亲子票
            $("#fir09").html(Math.ceil(price * 0.7));//学生票
            $("#fir10").html(Math.ceil(price * 0.7));//学生票
            $("#fir11").html(Math.ceil(price * 0.6));//优待票
            $("#fir12").html(Math.ceil(price * 0.6));//优待票
            $("#fir13").html(Math.ceil(price * 2.1));//家庭票
            $("#fir14").html(Math.ceil(price * 2.1));//家庭票

            /*
                        成人票：原价
                        情侣票：原价*1.8
                        夜场票：原价*0.4
                        亲子票（1大1小）：原价*1.4
                        学生票：原价*0.7
                        优待票：原价*0.8
                        家庭票（2大1小）：原价*2.1*/

            //预订须知
            $("[class='notice-content']").children().remove();
            $("[class='notice-content']").html(da.notice);

            //景点简介
            $("[class='introduce-content']").children().remove();
            $("[class='introduce-content']").html(da.reduce);

            //交通信息
            $("[class='traffic-content']").html("").html(da.trainAdvice);
            ;


            var imgs = [];//图片链接  small_photo_wrap

            imgs = da.imgUrl.split("=");

            $("[class='small_photo_wrap'] ul li").remove();
            for (var i = 0; i < imgs.length - 1; i++) {//渲染图片
                $("[class='small_photo_wrap'] ul").append("<li><a href='javascript:;' class=''>" +
                    "<img src='" + imgs[i] + "'></a>" +
                    "</li>");
            }
            $("#j-preview-photo img").attr("src", imgs[0]);
            $("#imgList li:eq(0)").children().prop("class", "current");//页面加载默认选中第一张图片


            //向前浏览功能
            $("[title='向前浏览']").click(function () {//点击向前浏览

                if (page > 0) {//如果页面大于0则需要 -1
                    page -= 1;
                }
                $("#imgList").css("left", -450 * page);//设置图片 ul 的位置属性为当前页码 * 450
                var cunImg = page * 5;//计算当前选中图片的位置
                $("#imgList li:eq(" + cunImg + ")").children().prop("class", "current");
                var upImg = $(this).index();//当前选中图片的下标

                if ($("#imgList li").index() != upImg) {
                    $(this).children().prop("class", "");
                }
                var imgSmall2 = $("#imgList li:eq(" + cunImg + ")").find("img").attr("src"); //获取当前图片的连接放到大图上去
                $("[class='attraction_photo_big']").children().attr("src", imgSmall2);
                $("[class='photo_name'] p").html(cunImg * 5 + 1 + "/" + imgs.length);//修改当前图片和总图片的数据关系

                left = $("[class='small_photo_wrap'] ul").css("left").split("p")[0];//获取图片ul的位置属性值
                if (parseInt(left) >= 0) {//当left为0时点击向前浏览无效
                    $("[title='向前浏览']").prop("class", "prev arrow-disable");
                    $("[title='向后浏览']").attr("class", "next ");
                } else {
                    $("[title='向前浏览']").prop("class", "prev");
                    $("[title='向后浏览']").attr("class", "next arrow-disable");
                }
            })

            //向前浏览功能结束*********************

            var maxPage = Math.ceil(imgs.length / 5);
            //向后浏览功能开始
            $("[title='向后浏览']").click(function () {//点击向前浏览
                if (page < maxPage - 1) {//如果页面小于最大页码则需要 +1
                    page += 1;
                }
                $("#imgList").css("left", -page * 450 + "px");//设置图片 ul 的位置属性为当前页码 * 450
                var cunImg = Math.abs(page * 5);//计算当前选中图片的位置
                $("#imgList li:eq(" + cunImg + ")").children().prop("class", "current");
                var upImg = $(this).index();//当前选中图片的下标

                if ($("#imgList li").index() != upImg) {
                    $(this).children().prop("class", "");
                }
                var imgSmall2 = $("#imgList li:eq(" + cunImg + ")").find("img").attr("src"); //获取当前图片的连接放到大图上去
                $("[class='attraction_photo_big']").children().attr("src", imgSmall2);
                cunImg += 1;
                $("[class='photo_name'] p").html(cunImg + "/" + imgs.length);//修改当前图片和总图片的数据关系

                left = $("[class='small_photo_wrap'] ul").css("left").split("p")[0];//获取图片ul的位置属性值
                if (parseInt(left) > 0) {//当left为0时点击向前浏览无效
                    $("[title='向前浏览']").prop("class", "prev arrow-disable");
                    $("[title='向后浏览']").attr("class", "next ");
                } else {
                    $("[title='向前浏览']").prop("class", "prev");
                    $("[title='向后浏览']").attr("class", "next arrow-disable");
                }
            })
            // })


            $("[class='photo_name'] p").html(1 + "/" + imgs.length);//显示当前图片的下标

            //点击小图片时的js
            $("#imgList li").click(function () {
                $(this).children().prop("class", "current");//为当前点击到的li添加样式
                var imgSmall = $(this).find("img").attr("src"); //获取当前图片的连接放到大图上去
                $("[class='attraction_photo_big']").children().attr("src", imgSmall);

                var index = $(this).index();//获取当前Li 的下标
                $("[class='photo_name'] p").html(index + 1 + "/" + imgs.length);
                //遍历同类 li 如果下标不符合则不为其添加样式
                $("#imgList li").each(function (e) {
                    if ($(this).index() != index) {
                        $(this).children().prop("class", "");//去除为其添加的样式
                    }
                })
            })
        }
    )
}

getSpot(spotId);
//根据 spotId查询景点详情***************************结束******************************

//根据 spotId 查询该景点的所有评论数制作分页条
var canClick = true;
if(true){
    function getCount(spotId) {
        canClick = false;
        sendAjax("http://localhost:8080/ticket/getCommentCount", {spotId: spotId}, "POST", "JSON",
            function (data) {
                var da = data.data;
                //制作分页条
                laypage.render({
                    elem: 'page01'
                    , count: da
                    , limit: 10
                    , theme: '#4e9fff'
                    , jump: function (obj) {
                        getComment(spotId, obj.curr, obj.limit);//调用获取评论信息详情方法
                    }
                });
                $("#page01").click(function () {
                    $("[data-reactid=\"484\"]").trigger("click");
                })

            })
    }

    getCount(spotId);

//根据景区id获取景区的评论

    function getComment(spotId, startIndex, pageSize) {
        sendAjax("http://localhost:8080/ticket/getCommet",
            {spotId: spotId, startIndex: startIndex, endIndex: pageSize}, "POST", "JSON",
            function (data) {
                canClick = true;
                var da = data.data;
                //渲染数据
                $("[class='comments'] li").remove();
                for (var i = 0; i < da.length; i++) {
                    var scoreRate = percentage(da[i].score, 5);
                    $("[class='comments']").append("<li><h4><span class='score-star'><i style='width: " + scoreRate + ";'></i></span><span><!-- react-text: 740 -->&nbsp;&nbsp;" +
                        "                                                                    <!-- /react-text --><!-- react-text: 741 -->" + da[i].score + "" +
                        "                                                                    <!-- /react-text --><!-- react-text: 742 -->分" +
                        "                                                                    <!-- /react-text --></span></h4>" +
                        "                                                                    <p>" +
                        "                                                                        " + da[i].content + "</p>" +
                        "                                                                    <div class='user-date'><span><!-- react-text: 746 -->" + da[i].petName + "" +
                        "                                                                        <!-- /react-text --><!-- react-text: 747 -->&nbsp;&nbsp;&nbsp;" +
                        "                                                                        <!-- /react-text --><!-- react-text: 748 -->" + da[i].postedTime + "" +
                        "                                                                        <!-- /react-text --></span></div>" +
                        "                                                                </li>");
                }
            })
    }

//获取最近的一条评论
    function getRentComment(spotId) {

        sendAjax("http://localhost:8080/ticket/getAllComment", {spotId: spotId}, "POST", "JSON", function (data) {
            var da = data.data;
            console.log(da);
            var scoreRate = percentage2(Math.floor(da.avgScore), 5) - 15;
            $("[class='score-star']").children().css("width", scoreRate);    //评分等级
            $("[class='num']").html(Math.floor(da.avgScore));//评分分数
            $("#count1").html("查看" + da.allCount + "条评论");//总评论条数
            $("[class='word']").html(da.content);//最近一条的评论内容
            $("[class='from']").html("<i></i><!-- react-text: 1063 -->" + da.petName + "<!-- /react-text -->");//最近一次评论者的昵称
            $("[class='t-comments']").html("<span>" + da.avgScore.toFixed(1) + "</span>" +
                "<!-- react-text: 731 -->/5分&nbsp;（共<!-- /react-text --> " +
                "<!-- react-text: 732 -->" + da.allCount + "<!-- /react-text --><!-- react-text: 733 -->人点评）<!-- /react-text -->");
        })
    }

    getRentComment(spotId);

//门票预订功能
    $("[class='booking-btn booking-btn-able']").click(function () {
        var ticketType = $(this).parent().prev().prev().prev().prev().html().split("】")[0].split("【")[1];
        var oSpotId = spotId;
        var price = $(this).parent().prev().find("strong").html();
        var title = $("title").html();
        var openTime = $("#openTime").html();
        var searchUrl = encodeURI("piaoChangLongBill.html?ticketType=" + ticketType + "&oSpotId=" + oSpotId + "&price=" + price + "&title=" + title+"&openTime="+openTime);   //使用encodeURI编码
        location.href = searchUrl;
    })

}