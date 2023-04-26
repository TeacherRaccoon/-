require(['jquery', 'base', 'imagePlayer', 'tab', 'lazayloader', 'autocomplete', 'placeholder'], function ($, Base, ImagePlayer, Tab, lazayloader, AutoComplete) {

        var App = Base.Base.extend({
            init: function (options) {

                // banner轮播
                // var data = this.getBannerData();

                //   this.getBannerDataByAsync();

                // var imagePlayer = new ImagePlayer({
                //     wrap: $('#ticket_banner'),
                //     loop: !0
                // });
                // imagePlayer.setData(data);
                // imagePlayer.start();

                //底部banner
                // this.getBottomBannerByAsync();

                // tab切换
                var tab = new Tab({
                    onSelect: this.onSelect,
                    tabs: $('#ticket_tab a')
                });

                // 搜索自动补全
                var autoComplete = new AutoComplete({
                    input: $('#mainInput'),
                    dropBox: $('#HotSearchBox'),
                    searchBtn: $('.main_search_btn'),
                    onChange: $.proxy(this.onChange, this),
                    onSearch: $.proxy(this.onSearch, this),
                    onSelect: function (data) {
                        console.log(data);
                    }
                });

                // 站点切换
                var station = $('.city_station');
                station.bind('click', function (e) {
                    station.toggleClass("city_station_on");
                });

                $(document).bind('click', $.proxy(this.onDelegate, this));
                this.getRecommend();
            },

            onDelegate: function (e) {
                var station = this.getTargetByClassName(e.target, 'city_station');
                if (!station) {
                    station = $('.city_station');
                    station.removeClass('city_station_on');
                }
            },

            getTargetByClassName: function (target, className) {
                while (target) {
                    if ($(target).hasClass(className))
                        return target;
                    target = target.parentNode;
                }
            },

            onChange: function (e) {
                debugger;
            },

            onSearch: function (e) {
                debugger;
            },


            //合并两个请求

            getBannerDataByAsync: function () {
                //1006 海外特殊处理biztype=62&siteids=1
                var AdList = encodeURIComponent('[{"pagecode":1,"domID":"ticket_banner","type":1}]');
                var ads = document.createElement('script');
                ads.type = 'text/javascript';
                ads.async = true;
                ads.src = '//crm.ws.ctrip.com/Customer-Market-Proxy/AdCallProxyV2.aspx?biztype=62&siteids=1&adlist=' + AdList;
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(ads, s);
            },
            getRecommend: function () {
                //top {siteId:"1006",adsiteid:"1"}
                //bottom {siteId:"1006",adsiteid:"32"}
                var _this = this;
                var siteId = jQuery("#hdSiteID").val();

                if (siteId != "1006") {
                    var siteid = _this.getAdsiteids();
                    var ads = document.createElement("script");
                    ads.type = "text/javascript";
                    ads.async = true;

                    var adlist = encodeURIComponent('[{"pagecode":1,"domID":"ticket_banner","type":1},{"pagecode":3,"domID":"s_1","type":1},{"pagecode":5,"domID":"s_2","type":1},{"pagecode":6,"domID":"s_3","type":1},{"pagecode":7,"domID":"s_4","type":1},{"pagecode":2,"domID":"b_1","type":1},{"pagecode":4,"domID":"b_2","type":1}]');
                    ads.src = '//crm.ws.ctrip.com/Customer-Market-Proxy/AdCallProxyV2.aspx?biztype=61&siteids=' + siteid +
                        '&adlist=' + adlist;
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(ads, s);

                } else {
                    _this.getBannerDataByAsync();
                    _this.getBottomBannerByAsync();

                }

            },
            getAdsiteids: function () {
                var siteId = jQuery("#hdSiteID").val();
                var AdList = [{siteId: "1007", adsiteid: "17"}, {siteId: "1008", adsiteid: "1"}, {
                    siteId: "1009",
                    adsiteid: "4"
                }, {siteId: "1010", adsiteid: "19"}, {siteId: "1011", adsiteid: "13"}, {
                    siteId: "1012",
                    adsiteid: "23"
                }, {siteId: "1013", adsiteid: "24"}, {siteId: "1014", adsiteid: "26"}, {
                    siteId: "1015",
                    adsiteid: "31"
                }, {siteId: "1016", adsiteid: "8"}, {siteId: "1017", adsiteid: "9"}, {
                    siteId: "1018",
                    adsiteid: "5"
                }, {siteId: "1019", adsiteid: "20"}, {siteId: "1020", adsiteid: "21"}, {
                    siteId: "1032",
                    adsiteid: "6"
                }, {siteId: "1004", adsiteid: "15"}, {siteId: "1021", adsiteid: "18"}, {
                    siteId: "1022",
                    adsiteid: "7"
                }, {siteId: "1023", adsiteid: "28"}, {siteId: "1024", adsiteid: "14"}, {
                    siteId: "1025",
                    adsiteid: "27"
                }, {siteId: "1026", adsiteid: "10"}, {siteId: "1027", adsiteid: "11"}, {
                    siteId: "1028",
                    adsiteid: "12"
                }, {siteId: "1001", adsiteid: "2"}, {siteId: "1005", adsiteid: "22"}, {
                    siteId: "1029",
                    adsiteid: "3"
                }, {siteId: "1030", adsiteid: "30"}, {siteId: "1031", adsiteid: "29"}, {
                    siteId: "1002",
                    adsiteid: "25"
                }, {siteId: "1003", adsiteid: "16"}];
                for (var i = 0, len = AdList.length; i < len; i++) {
                    if (siteId == AdList[i].siteId) {
                        return AdList[i].adsiteid;
                    }
                }
            },
            getBottomBannerByAsync: function () {
                //1006 海外特殊处理,biztype=61&siteids=32
                var AdList = encodeURIComponent('[{"pagecode":3,"domID":"s_1","type":1},{"pagecode":5,"domID":"s_2","type":1},{"pagecode":6,"domID":"s_3","type":1},{"pagecode":7,"domID":"s_4","type":1},{"pagecode":2,"domID":"b_1","type":1},{"pagecode":4,"domID":"b_2","type":1}]');
                var ads = document.createElement("script");
                ads.type = "text/javascript";
                ads.async = true;
                ads.src = '//crm.ws.ctrip.com/Customer-Market-Proxy/AdCallProxyV2.aspx?biztype=61&siteids=32&adlist=' + AdList;
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(ads, s);
            },
            //***********************异步获取banner结束**************
            onSelect: function (index) {
                var url = '/Thingstodo-Booking-ShoppingWebSite/TabResource/GetTabResource';
                jQuery.ajax({
                    url: url,
                    type: "POST",
                    data: {
                        tabId: $(this.tabs[index]).attr('data-tabid'),
                        siteId: $('#hdSiteID').val(),
                        index: index
                    },
                    success: function (data) {
                        $('#ticket_list').html(data);
                    },
                    error: function () {
                    }
                });
            }


        });
        var app = new App({a: 1, b: 2});

        $.imgLazyLoad({
            container: '#base_bd > div:gt(0)',
            autoProxy: true,
            diff: 300
        });
        $(".area_seo").removeClass("whole").addClass("line");
        $('.J-expand').on('click', 'a', function () {
            var className = this.className;
            if (className == 'ico_unfold') {
                $(this).text('+');
                this.className = 'ico_fold';
                $(this).parents("dl").removeClass("whole").addClass("line");
            } else {
                $(this).text('-');
                this.className = 'ico_unfold';
                $(this).parents("dl").removeClass("line").addClass("whole");
            }
            ;
        });

        //微信活动
        (function () {
            //扫一扫
            var dom_weixin_code = ' <i class="close"></i>\
                        <a class="b_code" href="javascript:;"></a>\
                        <a class="s_code" href="javascript:;"></a>';
            var weixin_code = document.createElement("div");
            weixin_code.setAttribute("class", "weixin_code");
            weixin_code.innerHTML = dom_weixin_code;
            document.body.appendChild(weixin_code);
            var side = $(".weixin_code");
            side.find(".close").on("click", function () {
                var _this = $(this);
                _this.css("display", "none");
                _this.next().css("display", "none");
                _this.next().next().css("display", "block");
                //_this.hide();
                //_this.next().hide();
                //_this.next().next().show();
            });

            side.find(".s_code").on("click", function (event) {
                var _this = $(this);
                _this.css("display", "none");
                _this.prev().css("display", "block");
                _this.prev().prev().css("display", "block");

                //_this.hide();
                //_this.prev().show();
                //.prev().prev().show();
            });
        })();
    }
);