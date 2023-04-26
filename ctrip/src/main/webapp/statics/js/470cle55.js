//部署于大首页，用于国内酒店业务区块
(function ($) {
    /******* BASE PART *******/
    var MOD = {}, // namespace for mods
        BASE_URL = document.domain.replace(/www/i, 'http://hotels');
    var message = {
        srhLoading: "搜索中…",
        srhLoad: "搜索"
    };
    /******* BASE PART *******/



    //展示tips
    $.fn.showTips = function (options) {
        var tipsEle = options.tipsEle,
            $thisTipsEle,
            preventDisappearEle = options.preventDisappearEle,
            disabledClass = options.disabledClass,
            openArrow = options.openArrow,
            closeArrow = options.closeArrow,
            fnBrforeDisplayTipEle = options.fnBrforeDisplayTipEle,
            callback = options.callback,
            delayDisappearTime = options.delayDisappearTime || 200,
            isNeedDispearTipsManually = options.isNeedDispearTipsManually;
        var delayDisappear;
        var $thisHoverEle = this;
        /*function openArrowDefault(){
            if(openArrowClass && closeArrowClass) $thisHoverEle.removeClass(closeArrowClass).addClass(openArrowClass);
        };
        function closeArrowDefault(){
            if(openArrowClass && closeArrowClass) $thisHoverEle.removeClass(openArrowClass).addClass(closeArrowClass);
        };*/
        function _preventDisappearEleRegister() {
            $(preventDisappearEle).bind('mouseover', function (e) {
                $(preventDisappearEle).attr('data-regisAlready', 'true');
                clearTimeout(delayDisappear);
            });
            if (isNeedDispearTipsManually) {
                $(preventDisappearEle).bind('mouseout', function () {
                    $thisHoverEle.trigger('mouseout');
                });
            };
        };
        function bindEventForIpad() {                    //pad端
            $thisHoverEle.bind('touchstart', function (e) {
                e.stop();
                if (fnBrforeDisplayTipEle) fnBrforeDisplayTipEle($thisHoverEle, e);
                if (tipsEle) $(tipsEle).removeClass('hidden'); //前提：tips的width要事先算好
                openArrow && typeof openArrow === 'function' && openArrow($thisHoverEle, e);
            });
            $('body').bind('touchstart', function (e) {
                if (tipsEle) $(tipsEle).addClass('hidden');
                closeArrow && typeof closeArrow === 'function' && closeArrow($thisHoverEle, e);
            });
        };
        function bindEventForPC() {                        //pc端
            $thisHoverEle.bind('mouseover', function (e) {
                if (disabledClass && $thisHoverEle.hasClass(disabledClass)) return;
                clearTimeout(delayDisappear);
                callback && typeof callback === 'function' && callback($thisHoverEle, e);
                if (fnBrforeDisplayTipEle) $thisTipsEle = fnBrforeDisplayTipEle($thisHoverEle, e);
                if (tipsEle) $(tipsEle).removeClass('hidden'); //前提：tips的width要事先算好
                openArrow && typeof openArrow === 'function' && openArrow($thisHoverEle, e, $thisTipsEle);
                if (preventDisappearEle && !$(preventDisappearEle).attr('data-regisAlready')) _preventDisappearEleRegister();
            });
            $thisHoverEle.bind('mouseout', function (e) {
                delayDisappear = setTimeout(function () {
                    //console.log('close!!')
                    if (tipsEle) $(tipsEle).addClass('hidden');
                    closeArrow && typeof closeArrow === 'function' && closeArrow($thisHoverEle, e, $thisTipsEle);
                }, delayDisappearTime);
            });
            if (preventDisappearEle) _preventDisappearEleRegister();
        };
        function _initBindEvent() {
            if ($thisHoverEle.attr('data-registerAlready')) return;
            $thisHoverEle.attr('data-registerAlready', 'true');
            if ($.browser.isIPad) {
                bindEventForIpad();
            } else {
                bindEventForPC();
            }
        };
        _initBindEvent();
    };


    /*国内酒店搜索框配置BEGIN*/
    //关键字用户行为
    window.userBehaviorKeyWordInfo = {
        "searchType": "S",
        "cityId": null,
        "keyword": null
    };
    //
    window.__uidc_init = new Date * 1;
    window.parseRawData = function () { };
    var fm = document.getElementById('chinaHotelForm');
    var MAX_STAY = 90 * 24 * 3600 * 1000;
    //备用config(简体)
    var addressMessageConfig = {
        cityname: {
            suggestionB: '支持中文/拼音/简拼输入',
            suggestion: "<strong>热门城市</strong>（可直接选择城市或输入城市全拼/简拼）"
        },
        searchHistory: '搜索历史',
        addressTab: "省市",
        hotelPos: {
            suggestion: "可直接选择地理位置或输入位置关键词",
            titles: {
                "zone": "商业区",
                "location": "行政区",
                "metro": "地铁线"
            },
            showAMap: false,
            AMapTitle: '查看商业区地图',
            all: '全部',
            subCity: '下辖市/县：'
        },
        suggestTitle: ["名称", "机场火车站", "位置"],
        defaultValue: ['上海', '2', 'shanghai']
    };
    var validateMessageConfig = {
        hotel: {
            city: '请选择酒店所在城市',
            checkIn: '请选择入住日期',
            checkOut: '请选择离店日期',
            dateErr: '日期格式为yyyy-mm-dd',
            too_early_in: '入住日期不能早于今天',
            too_early_out: '您选择的离店日期早于/等于入住日期，请重新选择',
            too_long: '您入住酒店时间超过90天，请分订单提交预订',
            no_room: '您选择的日期没有房间可供预订!',
            room_num: '请选择预订房间数'
        }
    };
    var noticeMessageConfig = ['中文/拼音'];
    //HD_HOTEL_CONFIG为页面config，使用页面config覆写当前config
    if (window.HD_HOTEL_CONFIG) {
        if (HD_HOTEL_CONFIG.addressMessageConfig) {
            addressMessageConfig = HD_HOTEL_CONFIG.addressMessageConfig;
        }
        if (HD_HOTEL_CONFIG.validateMessageConfig) {
            validateMessageConfig = HD_HOTEL_CONFIG.validateMessageConfig;
        }
        if (HD_HOTEL_CONFIG.noticeMessageConfig) {
            noticeMessageConfig = HD_HOTEL_CONFIG.noticeMessageConfig;
        }
    }

    /*国内酒店搜索框配置END*/
    // 从公共服务提供的隐藏域中获取如下信息来判断跳转的域名：
    // <input type="hidden" id="solution" value="PRO|GB"/>
    // PRO: 生产, UAT UAT, TEST: 测试
    // GB: 简体版, BIG5: 繁体版, HK: 香港版
    /*R
    var envObj = {
        'PRO': {
            'GB': 'http://hotels.ctrip.com',
            'HK': 'http://hotels.ctrip.com.hk',
            'BIG5': 'http://hotels.big5.ctrip.com'
        },
        'UAT': {
            'GB': 'http://hotels.uat.sh.ctriptravel.com',
            'HK': 'http://hotels.big5.uat.sh.ctriptravel.com',
            'BIG5': 'http://hotels.big5.uat.sh.ctriptravel.com'
        },
        'TEST': {
            'GB': 'http://hotels.testp.sh.ctriptravel.com',
            'HK': 'http://hotels.big5.testp.sh.ctriptravel.com',
            'BIG5': 'http://hotels.big5.testp.sh.ctriptravel.com'
        }
    };
    var HD_cookieName = {
        'GB': 'HotelCityID',
        'HK': 'BHotelCityID',
        'BIG5': 'BHotelCityID'
    };
    var arrEnv = solution && solution.value && solution.value.toUpperCase().split('|');
    if (arrEnv && arrEnv.length) {
        ENV = envObj[arrEnv[0]][arrEnv[1]];
    }
    */

    var ENV = '//hotels.ctrip.com';
    var CtripENV = 'http://hotels.ctrip.com';
    var solution = document.getElementById('solution');
    var solutionVal = solution && solution.value;
    //PRO: 生产, UAT_NT：UAT, FAT: 测试
    if (/^FAT/i.test(solutionVal)) {
        ENV = '//hotels.ctrip.fat2.qa.nt.ctripcorp.com';
        CtripENV = 'http://hotels.ctrip.fat2.qa.nt.ctripcorp.com';
    } else if (/^UAT_NT/i.test(solutionVal)) {
        ENV = '//hotels.ctrip.uat.qa.nt.ctripcorp.com';
        CtripENV = 'http://hotels.ctrip.uat.qa.nt.ctripcorp.com';
    }

    /**
     * set positionArea and positionId
     */
    function setLocationHiddens(dataUrl) {
        var positionArea = $('#positionArea'),
            positionId = $('#positionId'),
            regxp = /(zone|location|l|s|sl)(\d+)\w*/i,
            urls = dataUrl.replace('http\:\/\/', '').split('/');

        var data = regxp.exec(urls[urls.length - 1]) || {};
        positionArea.value(data[1] || '');
        positionId.value(data[2] || '');
    }
    window.JSONP_POS_RESPONSE = ''; //searchImprove
    window.CLICK_DATA_TYPE = '';
    window.CLICK_DATA_VALUE = '';
    /*
    * send ajax with keyword
    *@require {String} JSONP_POS_RESPONSE 依赖全局变量 JSONP_POS_RESPONSE
    *@param {Object} ops.KEYWORD_INPIT 关键词搜索框
    *@param {Object} ops.URL ajax提交地址
    *@param {Object} ops.CITYID_HIDDEN_INPUT etc. 各种input隐藏域value
    */
    var sendAjaxWithKeyword = function (ops) {
        ops = ops || {};
        var parseJsonpPosCallback = function (ret) {
            var returnObj = {};
            if (!ret) {
                return returnObj;
            }
            var tempArr = ret.split(/@/);
            for (var i = 0; i < tempArr.length; i++) {
                var tempArrI = tempArr[i].split('|');
                var hotelName = tempArrI[1];
                returnObj[hotelName] = {
                    pinyin: tempArrI[0],
                    keywordClick: tempArrI[2],
                    type: tempArrI[3]
                };
            }
            return returnObj;
        }
        var imgGet = function (url) {
            var imgTemp = new Image();
            imgTemp.src = url;
            imgTemp = null;
        }
        var returnObj = {};
        var options = $.extend({
            KEYWORD_INPIT: 'HD_TxtKeyword',
            URL: '//hotels.ctrip.com/Domestic/Tool/AjaxImpressionLog.aspx',
            CITYID_HIDDEN_INPUT: 'HD_CityId',
            STAR_HIDDEN_INPUT: 'searchHotelLevelSelect',
            KEYWORD_HIDDEN_INPUT: 'hotelAreaName'
        }, ops);
        var paramPool = parseJsonpPosCallback(JSONP_POS_RESPONSE);
        var context = {};
        var val = document.getElementById(options.KEYWORD_INPIT) ? document.getElementById(options.KEYWORD_INPIT).value : '';
        var param = paramPool[val] || {};
        var tempArr = [];
        var tarUrl = options.URL;
        // if (!param) {
        // return returnObj;
        // }
        context.type = param.type || '';
        context.keywordclick = param.keywordClick || '';
        // if (!context.type) {
        // return false;
        // }
        context.url = encodeURIComponent(window.location.href);
        context.city = document.getElementById(options.CITYID_HIDDEN_INPUT) ? document.getElementById(options.CITYID_HIDDEN_INPUT).value : '';
        context.star = document.getElementById(options.STAR_HIDDEN_INPUT) ? document.getElementById(options.STAR_HIDDEN_INPUT).value : '';
        context.keyword = escape(document.getElementById(options.KEYWORD_HIDDEN_INPUT) ? document.getElementById(options.KEYWORD_HIDDEN_INPUT).value : '');
        context.version = '1.0';

        context.isnewsearch = 'true';       // 以下4行为景区优化二期添加
        context.ClickSourceType = '1';
        context.ClickDataType = CLICK_DATA_TYPE || 'city';
        context.ClickDataValue = CLICK_DATA_VALUE || document.getElementById('HD_CityId').value;

        if (!$.isEmptyObject(context)) {
            for (k in context) {
                tempArr.push(k + '=' + context[k]);
            }
            tarUrl += '?' + tempArr.join('&');
        }
        imgGet(tarUrl);
    }

    $.getJsonp = (function () {
        var _i = 0;
        return function (url, callback) {
            var cb = '_json' + _i++;
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.charset = 'utf-8';
            script.src = url + '?callback=' + cb;
            head.appendChild(script);

            window[cb] = function (json) {
                callback(json);
                head.removeChild(script);
                window[cb] = null;
            };
        };
    })();
    var HOTEL_POSITION = {
        dataCash: {
            idFrom1To10: false,
            idFrom11To200: false,
            idFrom201ToMax: false,
            error: true
        }
    };

    var CITYENTER = true;

    MOD.globalForm = {
        form: document.forms[0],
        submit: function (url, target) {
            var fm = this.form;

            fm.action = url;
            fm.target = target || "_self";
            //.net webform 自带的
            if (fm.__VIEWSTATE) fm.__VIEWSTATE.name = "NOVIEWSTATE";
            fm.submit();
        }
    };

    MOD.defaultSuggestionInit = function (obj) {
        /**
         *  代码拷自addresss组件，实现tab切换，
         *  因为address组件只要用户配置了suggestionInit,  就不触发组件自己的suggestionInit，失去了tab切换功能
         */
            //must be opti
        var spans = obj.find('.tab_box li');
        var uls = obj.find('div.city_item');
        if (!spans.length) {
            return;
        }

        function switchTab() {
            var _this = this;
            spans.each(function (span, i) {
                if (span[0] == _this) {
                    span.addClass('hot_selected');
                    uls[i].style.display = '';
                } else {
                    span.removeClass('hot_selected');
                    uls[i].style.display = 'none';
                }
            });
        }
        spans.bind('mousedown', switchTab);
        switchTab.apply(spans[0]);
    }
    MOD.hotelNamePreHtml = ''; // prepare for close button on pad

    function checkExist(pid, key) {
        if (typeof HOTEL_POSITION[pid] == "undefined") { HOTEL_POSITION[pid] = {}; HOTEL_POSITION[pid][key] = (key === "zone" ? {} : []); HOTEL_POSITION[pid]['all'] = []; }
        if (typeof HOTEL_POSITION[pid][key] == "undefined") { HOTEL_POSITION[pid][key] = []; }
        return true;
    }
    /**
     * highlight keyword
     * {String} str
     * {string} words, words need to be highlight
     */
    cQuery.highlightKeyword = function (str, words) {
        if (!words) return str;
        words = words.split(/\s+/);
        words.each(function (word) {
            //highlight only chinese
            /[a-zA-Z]/.test(word) || (str = str.replace(new RegExp('(' + word + ')', 'gi'), "<span class='b'>$1</span>"))
        });
        return str;
    }

    ; (function (WIN, $) {
        var isIE = $.browser.isIE,
            positionId = $('#positionId'),
            positionArea = $('#positionArea'),
            searchKeyword = $('#hotelAreaName'),

            /**
             * 数据层地标分7种类型, 界面显示分3大组，查询时拼URL又分5种类型
             * typeMap存储7类对应5类的关系
             */

            markerTypeMap = {
                //名称
                //酒店，
                hotel: {
                    search: '',
                    view: 'name'
                },
                //景区
                district: {
                    search: 'district',
                    view: 'district'
                },
                //酒店集团
                cityhotelgroup: {
                    search: 'g',
                    view: 'name'
                },
                districthotelgroup: {
                    search: 'g',
                    view: 'name'
                },
                citydistricthotelgroup: {
                    search: 'g',
                    view: 'name'
                },
                //酒店品牌
                cityhotelbrand: {
                    search: 'h',
                    view: 'name'
                },
                districthotelbrand: {
                    search: 'h',
                    view: 'name'
                },
                citydistricthotelbrand: {
                    search: 'h',
                    view: 'name'
                },
                //位置：
                // 地标 landmardId
                markland: {
                    search: 'sl',
                    view: 'position'
                },
                // 地铁站
                metrostation: {
                    search: 's',
                    view: 'position'
                },
                // 商业区
                zone: {
                    search: 'zone',
                    view: 'position'
                },
                // 国内商业区
                domesticzone: {
                    search: 'zone',
                    view: 'position'
                },
                // 景点
                sight: {
                    search: 'sl',
                    view: 'position'
                },
                //行政区
                location: {
                    search: 'location',
                    view: 'position'
                },
                //地铁线
                metro: {
                    search: 'l',
                    view: 'position'
                },

                // 机场火车站：
                airport: {
                    search: 'sl',
                    view: 'station'
                }, // 机场
                railwaystation: {
                    search: 'sl',
                    view: 'station'
                }
            };
        WIN.markerTypeMap = markerTypeMap; //be global temporary
        var RegMod = function (options) {
            this.init(options);
            // this.startLoadMods();
            this.initNotice();
            this.initAddress();
            if (this.ops.startDate.length && this.ops.endDate.length) {
                this.initCalendar(this.ops.startDate, this.ops.endDate);
            }
            if (this.ops.checkInDate.length && this.ops.checkOutDate.length) {
                this.initCalendar(this.ops.checkInDate, this.ops.checkOutDate);
            }
            this.initValidate();
        }
        /**
         * CITY NAME FORMAT
         */

        WIN.Help = {
            format: function (data) {
                var obj = {};
                for (var key in data) {
                    obj[key] = {};
                    if (key.search(/[A-Z]/i) != -1) {
                        for (var i = 0; i < data[key].length; i++) {
                            if (obj[key][data[key][i]['group']]) {
                                obj[key][data[key][i]['group']].push(data[key][i]);
                            } else {
                                obj[key][data[key][i]['group']] = [];
                                obj[key][data[key][i]['group']].push(data[key][i]);
                            }
                        }
                    } else {
                        for (var i = 0; i < data[key].length; i++) {
                            if (obj[key]['']) {
                                obj[key][''].push(data[key][i]);
                            } else {
                                obj[key][''] = [];
                                obj[key][''].push(data[key][i]);
                            }
                        }
                    }
                }
                return obj;
            },
            highlight: function (str, val) {
                var spical = ['\\', '^', '$', '.', '*', '+', '=', ':', '|', '/', '(', ')', '[', ']', '{', '}'];
                for (var i = 0; i < spical.length; i++) {
                    val = val.replace(spical[i], '\\' + spical[i]);
                }
                var re = new RegExp(val, 'i');
                return str.replace(re, '<b>$&</b>');
            },
            getEnumItemType: function (type){
                switch(type){
                    case "City":
                        return "城市";
                    case "District":
                        return "景区";
                    case "Markland":
                        return "地标";
                    case "Location":
                        return "行政区";
                    case "Zone":
                        return "商业区";
                    case "Airport":
                        return "机场";
                    case "RailwayStation":
                        return "车站";
                    case "Hotel":
                        return "酒店";
                    case "MetroStation":
                        return "地铁站";
                    case "CityHotelGroup":
                        return "集团";
                    case "CityHotelBrand":
                        return "品牌";
                    case "Metro":
                        return "地铁线";
                    default:
                        return "";
                }
            },
            getScenic: function (list) {
                var ret = [];
                list.each(function (item) {
                    var arr = item.data.split('|');
                    var obj = ScenicData[arr[2]];
                    if (obj && arr[6] === 'District') {
                        obj.data = item.data;
                        ret.push(obj);
                    }
                });
                return ret;
            },
            groupCityFilterData: function (list) {
                //用户行为
                var result = {
                        'isNewVersion': false
                    },
                    yIndex = 1,
                    i = 0;
                if(list.length > 0){
                    var first = list[0].data.split('|');
                    result.isNewVersion = first.length > 10 && first[10] == 1;
                }

                if(result.isNewVersion){
                    result.list = list;
                    for (i = 0; i < result.list.length; i++) {
                        result.list[i]["yindex"] = yIndex++;
                    }
                } else {
                    //用户行为
                    list.each(function (item) {
                        var arr = item.data.split('|'),
                            type = arr[6];
                        (result[type] || (result[type] = [])).push(item);
                    });
                    /**
                     * 添加埋点的Yindex数据
                     * 注意：这里['City', 'District', 'Sight', 'Location', 'DomesticZone', 'Airport', 'RailwayStation']是有序的，
                     * 渲染浮层模版时和模版中的相关信息位置一一对应
                     */
                    ['City', 'District', 'Sight', 'Location', 'DomesticZone', 'Airport', 'RailwayStation', 'Hotel'].each(function (key) {
                        if (result[key]) {
                            for (i = 0; i < result[key].length; i++) {
                                result[key][i]["yindex"] = yIndex++;
                            }
                        }
                    });
                }
                return result;
            }
        }
        /**
         * set jsonpFilter and jsonpSource dynamicly
         * @param {String|int} id, city id
         * @param {Address} keyword, instance of Address
         */
        function setKeywordJsonpUrl(keyword, id) {
            var rCityId = /\$\{cityId\}/g;

            setTimeout(function () {
                keyword.set('jsonpFilter', id ? cQuery.keywordJsonpFilterTpl.replace(rCityId, id || '') : undefined);
                keyword.set('jsonpSource', id ? cQuery.keywordJsonpSourceTpl.replace(rCityId, id || '') : undefined);
            }, 0)
        };

        WIN.setKeywordJsonpUrl = setKeywordJsonpUrl; //must be global
        /**
         * add style element for iframe
         * be used when city selector appearing, to improve performance in IEs
         * @param {cDOM} a, wrap element
         */
        function addIframeStyle(a) {
            var doc = a[0].ownerDocument,
                stylesheet = doc.createElement('link');

            stylesheet.type = "text/css";
            stylesheet.rel = 'stylesheet';
            stylesheet.href = '//webresource.c-ctrip.com/styles/common/c_address.css';
            doc.getElementsByTagName('head')[0].appendChild(stylesheet);
        }
        /**
         * @param {Address} mod
         * @param {Object} data
         */
        function keywordItemChangeHandler(mod, data) {
            var dataArr = data.data.split('|'),
                EMPTY = '',
                category,
                cityIdElem = $("#HD_CityId"),
                cityId = cityIdElem.value();

            //set positionArea, positionId
            positionId.value(dataArr[2] || EMPTY);
            //国内酒店，目的地为非景区，关键词为景区
            if(cityId.substr(0,1).toUpperCase() !== "D"){
                if(dataArr[3] === "District"){
                    cityIdElem.value("D" + dataArr[2] + "_" + dataArr[4]);
                    $("#HD_CityPy").value(dataArr[8]);
                } else {
                    !!dataArr[4] && cityIdElem.value(dataArr[4]);
                    !!dataArr[6] && $("#HD_CityPy").value(dataArr[6]);
                }
            }

            searchKeyword.value(data.value);
            positionArea.value(dataArr[3] || EMPTY);
            //记录用户行为 && 提交搜索表单
            var btnSearch = $("#HD_Btn");
            if (btnSearch[0]) {
                setTimeout(function () {
                    //触发国内酒店搜索表单提交
                    btnSearch.trigger("click");
                }, 0);
            }
            //选择关键字后搜索
            //submitForm();
        }
        //监听国内酒店搜索表单提交
        ; (function () {
            var btnSearch = $("#HD_Btn");
            btnSearch.bind("click", function (e) {
                window.userBehaviorKeyWordInfo.cityId = $("#HD_CityId").value();
                window.userBehaviorKeyWordInfo.keyword = $("#HD_TxtKeyword").value();
                //发送用户行为记录请求
                window['__bfi'].push(['_tracklog', "SEARCH_AUTOCOMPLET_US", $.stringifyJSON(window.userBehaviorKeyWordInfo)]);
                //请求后还原
                window.userBehaviorKeyWordInfo = {
                    "searchType": "S",
                    "cityId": null,
                    "keyword": null
                };
            });
        })();
        /**
         * submit form
         */
        function submitForm() {
            var btnSearch = document.getElementById("HD_Btn");
            if (btnSearch) {
                btnSearch.click();
            }
        }
        /**
         * select markers, according to bussiness rule
         * privilege rank: name -> position -> station
         * total number: 15
         * @param {Object} data, origin data
         * returns {Object}, filtered data
         */
        function fitMarkerDataToDisplay(data) {
            return filterData(data, 16, 4);
        }
        function filterData(data, total, standard) {
            var i,
                offset = 0,
                item,
                filtered = {};

            for (i in data) {
                item = data[i];
                offset += Math.max(standard - item.length, 0);
            }

            for (i in data) {
                item = data[i];
                a = item.length;
                item = filtered[i] = item.slice(0, offset ? Math.max(standard + offset, standard) : standard);
                offset && (offset = Math.max(offset - (Math.max(item.length - standard, 0)), 0));
            }
            return filtered;
        }
        function groupHotelMarkerData(data) {
            var result = {
                    'isNewVersion': false,
                    'filterResult': []
                },
                rs = {
                    name: [],
                    district: [],
                    station: [],
                    position: []
                },
                list = [],
                map = markerTypeMap,
                SPLIT_STR = '|',
                yIndex = 1,
                i = 0,
                len = 0,
                total = 16,
                hasCityChange = false,
                curCity;

            if(data && data.length > 0){
                var first = data[0].data.split('|');
                result.isNewVersion = first.length > 10 && first[10] == 1;
            } else {
                return null;
            }

            if(result.isNewVersion){
                for (i = 0, len = data.length; i < len; i++) {
                    data[i].data = (data[i].data).replace('$', '@');
                    data[i].right = (data[i].right).replace('$', '@');
                    var item = data[i],
                        arrItem = item.data.split(SPLIT_STR),
                        type = arrItem[3].toLowerCase(),
                        city = arrItem[7];
                    // 初始赋值curCity
                    $.type(curCity) === 'undefined' && (curCity = city);
                    // 无本城市联系数据
                    if(i === 0 && city !== '0'){
                        result.filterResult.push([]);
                    }

                    if(curCity !== city && !hasCityChange){
                        result.filterResult.push(list);
                        curCity = city;
                        list = [];

                        // 如果第一个城市的匹配项>10， 或者 匹配总数>16 退出
                        if ((total < 6 && result.filterResult.length === 1)
                            || total === 0) {
                            list = [];
                            break;
                        }

                        hasCityChange = true;
                    }

                    list.push(item);
                    total--;

                    if(total === 0 || i === len - 1) {
                        if(list.length) {
                            result.filterResult.push(list);
                        }

                        break;
                    }
                }

                /**
                 * 添加埋点的Yindex数据
                 * 注意这里["name", "district", "station", "position"]是有序的，
                 * 渲染浮层模版时和模版中的名字、机场火车站和位置一一对应
                 */
                result.filterResult.each(function(filterData){
                    var curData = filterData || null;
                    if (curData) {
                        curData["yindex"] = yIndex++;
                    }
                });
            } else {
                // 反序列化筛选返回数据, 并按city分组
                for(i = 0, len = data.length; i < len; i++){
                    data[i].data = (data[i].data).replace('$', '@');
                    data[i].right = (data[i].right).replace('$', '@');
                    var item = data[i],
                        arrItem = item.data.split(SPLIT_STR),
                        type = arrItem[3].toLowerCase(),
                        types = map[type],
                        city = arrItem[7] || '0';

                    // 初始赋值curCity
                    $.type(curCity) === 'undefined' && (curCity = city);

                    // 无本城市联系数据
                    if(i === 0 && city !== '0'){
                        result.filterResult.push({
                            name: [],
                            district: [],
                            station: [],
                            position: []
                        });
                    }

                    // city变更时保存上一个城市的数据
                    // 如果第一个city 数量>10 则不在筛选后面的城市数据, 否则填满total
                    if(curCity !== city && !hasCityChange && (rs.name.length || rs.station.length || rs.position.length)) {
                        result.filterResult.push(rs);
                        curCity = city;

                        rs = {
                            name: [],
                            district: [],
                            station: [],
                            position: []
                        };


                        // 如果第一个城市的匹配项>10， 或者 匹配总数>16 退出
                        if ((total < 6 && result.filterResult.length === 1)
                            || total === 0) {
                            rs = null;
                            break;
                        }

                        hasCityChange = true;
                    }

                    rs[types.view].push(item);
                    total--;

                    if(total === 0 || i === len - 1) {
                        if(rs.name.length || rs.station.length || rs.position.length) {
                            result.filterResult.push(rs);
                        }

                        break;
                    }
                }

                //拿取一定数量的数据（此处默认15条）
                result.filterResult.map(function(item){
                    return fitMarkerDataToDisplay(item);
                });

                /**
                 * 添加埋点的Yindex数据
                 * 注意这里["name", "district", "station", "position"]是有序的，
                 * 渲染浮层模版时和模版中的名字、机场火车站和位置一一对应
                 */
                ["name", "district", "station", "position"].each(function (item) {
                    result.filterResult.each(function(filterData){
                        var curData = filterData[item] || null;
                        if (curData) {
                            for (i = 0, len = curData.length; i < len; i++) {
                                curData[i]["yindex"] = yIndex++;
                            }
                        }
                    });
                });
            }
            return result;
        }
        //groupMarkerData must be global accessable, cuz it is used in 'tmpl'
        cQuery.groupHotelMarkerData = groupHotelMarkerData;
        $.extend(RegMod.prototype, {
            init: function (options) {
                this.ops = {
                    city: [],
                    startDate: [],
                    endDate: [],
                    keyword: [],
                    // hotelPos: [],
                    // hotelName: [],
                    checkInDate: [],
                    checkOutDate: [],
                    offsetPos: 5
                };
                this.ops = $.extend(this.ops, options);
            },

            initValidate: function () {
                MOD.formValidator = positionId.regMod("validate", PluginsVersion.validate);
            },
            //init keyword input and selection panel
            initKeyword: function () {
                window.HD_ENV_FOR_TMPL = ENV;
                var searchBtn = $('#HD_Btn'),
                    keyword = this.ops.keyword,
                    keywordFilterTpl = HD_HOTEL_CONFIG.tmpl.keywordFilter,
                    cityId = $('#HD_CityId').value(),
                    charset = cQuery.config("charset");

                cQuery.keywordFilterHighlights = {};
                /**
                 * jsonp callback for keyword search
                 * @param {String} ret, search result
                 */
                cQuery.jsonpPosCallback = function (ret) {
                    if(!ret) {
                        ret = {
                            tokens: '',
                            result: ''
                        };
                    }

                    var result = ret.result,
                        keywordVal = keyword.value();

                    //words need to be highlighted
                    cQuery.keywordFilterHighlights[keywordVal] = ret.tokens;
                    cQuery.jsonpResponse = { key: keywordVal, data: '@' + ret.result + '@' };
                    JSONP_POS_RESPONSE = result; //searchImprove
                };
                $.keywordJsonpFilterTpl = ENV + '/Domestic/Tool/AjaxKeywordAssociate.aspx?cityid=${cityId}&keyword=${key}&from=public&callback=cQuery.jsonpPosCallback';
                $.keywordJsonpSourceTpl = ENV + '/Domestic/Tool/AjaxGetHotKeyword.aspx?cityid=${cityId}';

                //init placeholder for keyword
                MOD.n_keyword = keyword.regMod("notice", PluginsVersion.notice, {
                    name: "keyword",
                    tips: keyword[0].getAttribute('_cqnotice'),
                    selClass: "inputSel"
                });

                MOD.a_keyword = keyword.regMod('address', PluginsVersion.address, {
                    name: "keyword",
                    source: '@@',
                    isFocusNext: !1,
                    //isIframe: isIE,
                    delay: 500,
                    isFilterSelect: false,
                    isAutoCorrect: false,
                    offset: 5,
                    template: {
                        padVersion: '2.0',
                        filterPageSize: -1,
                        suggestion: HD_HOTEL_CONFIG.tmpl.keywordSuggestion,
                        suggestionIpad: HD_HOTEL_CONFIG.tmpl.keywordSuggestionIPad,
                        suggestionStyleIpad: HD_HOTEL_CONFIG.tmpl.keywordSuggestionStyle,
                        filter: keywordFilterTpl,
                        filterIpad: keywordFilterTpl,
                        /**
                         * suggestionInit for keyword
                         * @param {DOM} a, dropdown panel
                         */
                        suggestionInit: function (a) {
                            MOD.defaultSuggestionInit(a);
                            //add css for suggest
                            //isIE && addIframeStyle(a);
                            a.find('.close').bind('mousedown', function () {
                                keyword[0].blur();
                            })
                            //下辖市等链接点击跳转到列表页
                            a.find('a[data-dopost="T"]').bind('mousedown', function (e) {
                                var target = this;
                                setTimeout(function () {
                                    MOD.globalForm.submit(target.getAttribute('href'), target.getAttribute('target'));
                                }, 0);

                            });
                            window.$isPad && a.find('#pad_mini_keyboard').bind('click', function () {
                                var target = keyword[0];
                                var isShowKB = keyword[0].getAttribute('readonly') != 'readonly';

                                if (isShowKB) {
                                    target.setAttribute("readonly", "readonly");
                                    this.className = 'ico_key';

                                } else {
                                    target.removeAttribute('readonly');
                                    this.className = 'ico_unkey';
                                }
                                target.blur();
                                target.select();
                                target.focus();
                            });
                        } .bind(this),
                        filterInit: function (a) {
                            a.find('.close').bind('mousedown', function () {
                                keyword[0].blur();
                            })
                        }
                    }
                });
                MOD.a_keyword.method('bind', 'change', keywordItemChangeHandler);
                //
                MOD.a_keyword.method('bind', 'userinput', function (mod, data) {
                    //var cityVal = this.value;
                    var cityVal = data.autoCorrectValue;
                    var _userBehaviorKeyWordInfo = {
                        "searchType": "S",
                        "cityId": $('#HD_CityId').value(),
                        "keyword": cityVal
                    };
                    //data.eventType === 'suggestionMousedown' 鼠标选择suggestion的数据
                    //data.eventType === 'filterMousedown' 鼠标选择filter的数据
                    //data.eventType === 'keydown' 键盘回车选择filter的数据
                    //evt.eventType === 'keydown' && isSelect 输入字符按回车（两次校验）
                    if (data.eventType === 'suggestionMousedown') {
                        _userBehaviorKeyWordInfo['searchType'] = "S_X";
                        //赋值到全局
                        window.userBehaviorKeyWordInfo = _userBehaviorKeyWordInfo;
                        return;
                    }
                    //筛选
                    if (data.eventType === 'filterMousedown' || data.eventType === 'keydown') {
                        _userBehaviorKeyWordInfo['searchType'] = "B+S";
                        _userBehaviorKeyWordInfo['Yindex'] = (data.target && $(data.target).attr("data-yindex"));
                        _userBehaviorKeyWordInfo['inputkeyword'] = data.value;
                        _userBehaviorKeyWordInfo['fulldata'] = data.data;
                        //赋值到全局
                        window.userBehaviorKeyWordInfo = _userBehaviorKeyWordInfo;
                        return;
                    }
                });

                cityId && setKeywordJsonpUrl(MOD.a_keyword, cityId); //set url of jsonp request for keyword filter
                //MOD.n_keyword.method("checkValue");

                keyword.bind('blur', function () {
                    if (!this.value || this.value != searchKeyword.value()) {
                        searchKeyword.value(this.value);
                        positionId.value("");
                        positionArea.value("");
                    }
                });
                //support enter key submit;
                MOD.a_keyword.method('bind', 'enter', function () {
                    searchBtn.trigger('click');
                });
            },
            initAddress: function () {
                if (this.ops.city.length) {
                    var city = this.ops.city;
                    var checkin = this.ops.startDate;
                    var checkout = this.ops.endDate;
                    var keyword = this.ops.keyword;
                    var timer = setTimeout(function () {
                        initCity();
                    }, 2000);
                    var isIPad = $.browser.isIPad;
                    window.searchHistoryList = '';

                    var cityFilterTmpl = HD_HOTEL_CONFIG.tmpl.cityFilter;
                    var cityFilterStyle = HD_HOTEL_CONFIG.tmpl.cityFilterStyle;

                    /**
                     * 自定义城市选择器初始化
                     * @param {DOM} a, 下拉容器
                     */
                    function customSuggestInit(a) {
                        var historyWrap = a.find('.search_history_box');
                        MOD.defaultSuggestionInit(a);
                        historyWrap.bind(isIPad ? 'touchend' : 'mousedown', function (e) {
                            var target = e.target || e.srcElement || e.host;
                            if (target.tagName === 'A') {
                                var item = $.parseJSON(target.getAttribute('data-history'));
                                city.removeClass('inputSel').value(unescape(item.cityname));
                                $('#HD_CityId').value(item.id);
                                $('#HD_CityPy').value(item.pingying);

                                if (item.isoutdate === 'false') {
                                    checkin.value(item.checkin);
                                    checkout.value(item.checkout);
                                    checkin[0].style.backgroundImage = '';
                                    checkout[0].style.backgroundImage = '';
                                };
                                MOD.a_city.method('hidden');
                                //in case of more than one 'mini_c_address_close';
                                a.find('#mini_c_address_close').each(function (btn) {
                                    btn[0].click();
                                });

                                //fix bug in ie, 'a' still keep hovering status.
                                isIE && historyWrap.html(historyWrap.html());

                                //due to ie can't trigger MOD.a_city's change event
                                cityChange(undefined, { items: [item.pingying, item.cityname, item.id] });
                            }
                        });

                        //add css for suggest START
                        //isIE && addIframeStyle(a);
                        //bind close event to close btn
                        a.find('.close').bind('mousedown', function (e) {
                            e.stop();
                            city[0].blur();
                        })
                    }

                    function filterInit(el) {
                        var timer;
                        var cityScenicPic = el.find('.city_scenic_pic');
                        var itemListScenic = el.find('.item_list_scenic');
                        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                        var innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.offsetHeight;

                        function showScenic() {
                            var elOffset = el.offset();
                            var offset = itemListScenic.offset();
                            if (scrollTop + innerHeight < offset.top + 300) {
                                cityScenicPic.css({
                                    'top': '',
                                    'bottom': elOffset.bottom - offset.bottom + 'px'
                                });
                            } else {
                                cityScenicPic.css({
                                    'top': offset.top - elOffset.top - 1 + 'px',
                                    'bottom': ''
                                });
                            }
                            cityScenicPic.css('display', 'block');
                        }

                        if (!isIPad) {
                            el.find('.close').bind('mousedown', function (e) {
                                e.stop();
                                city[0].blur();
                            });
                        }
                    }

                    function initCity() {
                        MOD.a_city = city.regMod("address", PluginsVersion.address, {
                            name: "cityname",
                            jsonpSource: ENV + '/Domestic/Tool/AjaxGetCitySuggestion.aspx',
                            jsonpFilter: ENV + '/Domestic/Tool/AjaxDestination.aspx?keyword=${key}&from=public',
                            isFocusNext: false,
                            isAutoCorrect: false,
                            //isIframe: isIE,
                            delay: 200,
                            relate: {
                                '2': $("#HD_CityId"),
                                '0': $("#HD_CityPy")
                            },
                            message: {
                                noFilterResult: '对不起，找不到：${$data.val}'
                            },
                            keyboard: {
                                left: false,
                                right: false
                            },
                            template: {
                                padVersion: '2.0',
                                suggestion: HD_HOTEL_CONFIG.tmpl.citySuggestion,
                                suggestionIpad: HD_HOTEL_CONFIG.tmpl.citySuggestionIPad,
                                filter: cityFilterTmpl,
                                filterIpad: cityFilterTmpl,
                                filterPageSize: 15,
                                suggestionInit: function (el) {
                                    MOD.defaultSuggestionInit(el); //初始化TAB
                                    customSuggestInit(el);
                                },
                                suggestionInitIpad: function (el) {
                                    MOD.a_city.get('defaultSuggestionInitIpad')(el);
                                    customSuggestInit(el);
                                },
                                filterInit: filterInit,
                                filterInitIpad: filterInit
                            }
                        });

                        function cityChange(evt, data) {
                            /**
                             城市City
                             景区District
                             行政区Location
                             景点Sight
                             国内商业区DomesticZone
                             机场Airport
                             火车站RailwayStation

                             pinyin|ShowName|ItemId|HotelQuantity|Word|ProvinceName|Type|CityName|CityId      城市/景区
                             pinyin|CityName|CityId|HotelQuantity|Word|ProvinceName|Type|ShowName|ItemId      行政区/景点/国内商业区/机场/火车站
                             */
                            var items = data.items || [];
                            if (items.length >= 9) {
                                CLICK_DATA_TYPE = items[6];
                                CLICK_DATA_VALUE = items[8];
                                var IsOversea = items.length >= 15 && (items[14] > 1);
                                var type = items[6].toLowerCase();
                                if (!(type === 'city' || type === 'district')) {
                                    keyword.removeClass('inputSel').value(items[4]);

                                    keyword.attr('isFormCity', 'true'); // 说明是从city填入keyword
                                    $('#positionArea').value(type);
                                    $('#positionId').value(items[8]);
                                    $('#hotelAreaName').value(items[4]);
                                }
                            }
                            if (type === 'hotel' && !IsOversea && evt !== 'blur') {
                                var btnSearch = $('#HD_Btn');
                                if (btnSearch[0]) {
                                    //此处延迟是为了让MOD.a_city组件中的其他监听事件执行完毕后，
                                    //才将搜索表单提交事件放入执行队列
                                    setTimeout(function () {
                                        //触发表单提交
                                        btnSearch[0].click();
                                    }, 0);
                                }
                            }

                            cityChangeEvent(items[2], items[0]);
                        }
                        //模版中使用的cityChange函数需要在全局作用于下
                        WIN.cityChange = cityChange;

                        MOD.a_city.method('bind', 'change', cityChange);

                        function checkOverseaDestination(data){
                            var temp = (data && data.split("|")) || [],
                                country = 1,
                                type = null,
                                overseaUrl = window.location.protocol + "//hotels.ctrip.com/international/",
                                itemID = 0,
                                cityID = 0,
                                showName = "";

                            if(temp.length >= 15){
                                country = temp[14];
                            }
                            type = temp[6];
                            itemID = temp[8];
                            cityID = temp[2];
                            // 国内不需要跳转
                            if(!country || country == 1 || !cityID){
                                return;
                            }

                            if(type == "Markland" || type == "RailwayStation" || type == "IntlPOIAirport"){
                                if(itemID){
                                    overseaUrl = overseaUrl + "city" + cityID + "/s" + itemID;
                                }
                            } else if(type == "Location"){
                                if(itemID){
                                    overseaUrl = overseaUrl + "city" + cityID + "/location" + itemID;
                                }
                            } else if(type == "IntlDistrict"){
                                overseaUrl = overseaUrl + "D" + cityID;
                            } else if(type == "IntlProvince"){
                                overseaUrl = overseaUrl + "province" + cityID;
                            } else if(type == "IntlCity"){
                                overseaUrl = overseaUrl + "city" + cityID;
                            } else if(type == "MetroStation") {
                                if(itemID){
                                    overseaUrl = overseaUrl + "city" + cityID + "/m" + itemID;
                                }
                            } else if(type == "Zone") {
                                if(itemID){
                                    overseaUrl = overseaUrl + "city" + cityID + "/zone" + itemID;
                                }
                            } else if(type == "Hotel") {
                                showName = temp[7];
                                if(showName){
                                    overseaUrl = overseaUrl + "city" + cityID + "?wd=" + encodeURIComponent(showName);
                                }
                            }
                            window.location.href = overseaUrl;
                        }
                        /**
                         * BI需求，拼成固定字符串
                         * @param {String} 当前input值
                         * @param {String} 传给tracklog的值
                         */
                        function makeTrackLogVals(value, autoCorrect, evtType) {
                            var v = '',
                                isMatch = 0;

                            if (autoCorrect) { //if autoCorrected, isMatch set to true
                                isMatch = 1;
                                v = autoCorrect;
                            } else {
                                isMatch = 0;
                                v = value;
                            };
                            return 'key=' + v + '&isMatch=' + isMatch;
                        };
                        var isSelect = true;
                        MOD.a_city.method('bind', 'userinput', function (mod, data) {
                            var cityId = $('#HD_CityId');
                            var cityPy = $('#HD_CityPy');
                            //var cityVal = this.value;
                            var cityVal = data.autoCorrectValue;
                            var _userBehaviorCityInfo = {
                                "searchType": null,
                                "cityId": cityId.value(),
                                "keyword": cityVal
                            };
                            //data.eventType === 'suggestionMousedown' 鼠标选择suggestion的数据
                            //data.eventType === 'filterMousedown' 鼠标选择filter的数据
                            //data.eventType === 'keydown' 键盘回车选择filter的数据
                            //evt.eventType === 'keydown' && isSelect 输入字符按回车（两次校验）
                            //酒店搜索自动补全用户行为记录
                            if (data.eventType === 'suggestionMousedown') {
                                _userBehaviorCityInfo['searchType'] = "CTY_X";
                                window['__bfi'].push(['_tracklog', "SEARCH_AUTOCOMPLET_US", $.stringifyJSON(_userBehaviorCityInfo)]);
                            }
                            if (data.eventType === 'filterMousedown' || data.eventType === 'keydown') {
                                _userBehaviorCityInfo['searchType'] = "CTY_BS";
                                _userBehaviorCityInfo['Yindex'] = (data.target && $(data.target).attr("data-yindex"));
                                _userBehaviorCityInfo['inputkeyword'] = data.value;
                                _userBehaviorCityInfo['fulldata'] = data.data;
                                window['__bfi'].push(['_tracklog', "SEARCH_AUTOCOMPLET_US", $.stringifyJSON(_userBehaviorCityInfo)]);
                            }

                            checkOverseaDestination(data.data);

                            //
                            if (this.value == cityId.attr('_lastvalue')) return;

                            if (data.eventType === 'suggestionMousedown' || data.eventType === 'filterMousedown' || (data.eventType === 'keydown' && (isSelect || data.data))) {
                                isSelect = true;
                                window['__bfi'].push(['_tracklog', "nhtlcity", makeTrackLogVals(cityVal, cityVal, null)]);
                                return;
                            }
                            // 用户选择，之后失去焦点时，也不再验证
                            if (data.eventType === 'blur' && isSelect) {
                                window['__bfi'].push(['_tracklog', "nhtlcity", makeTrackLogVals(cityVal, cityVal, null)]);
                                return;
                            }
                            var txtCity = $('#HD_CityName');

                            var queryCityId = cityId.value() || '';
                            var queryItemId = '';
                            queryCityId.replace(/D(\d+)_(\d+)/, function (a, b, c) {
                                queryCityId = c;
                                queryItemId = '&itemId=' + b;
                            });

                            function clearCity(notClearAll) {
                                showMesg(searcheTxt);
                                if (!notClearAll) {
                                    txtCity.value('');
                                    txtCity.attr('_lastvalue', '');
                                };
                                cityId.value('');
                                cityId.attr('_lastvalue', '');
                            };
                            function showMesg(txt) {
                                if (!validateMessageConfig['hotel']['noExistCity']) return;
                                MOD.formValidator.method("show", {
                                    $obj: city,
                                    data: validateMessageConfig['hotel']['noExistCity'].replace('{city}', txt),
                                    removeErrorClass: !0,
                                    isScroll: false
                                });
                            };
                            var searcheTxt = txtCity.value();
                            var url = ENV + '/Domestic/Tool/AjaxDestination.aspx?keyword=' + encodeURIComponent(escape(searcheTxt)) + '&from=public';
                            $.loader.jsonp(url, {
                                charset: 'gb2312',
                                onload: function (result) {
                                    var resdata = result.data;
                                    var cityList = resdata.match(/[^@]+\|[^@]+/g); //原先正则有问题，把行政区id过滤掉了
                                    if (!cityList) {
                                        clearCity(true);
                                        return;
                                    }
                                    var autoCorrectCityName = '';

                                    if (cityList && cityList.length > 0) {
                                        var cityData = cityList[0].split('|');
                                        if (cityData.length > 1) {
                                            isSelect = true; //相当于用户选择了第一条
                                            autoCorrectCityName = cityData[1] ? cityData[1] : '';
                                            txtCity.value(autoCorrectCityName);
                                            txtCity.attr('_lastvalue', autoCorrectCityName);
                                            cityId.value(cityData[2] ? cityData[2] : '');
                                            cityId.attr('_lastvalue', cityId.value());
                                            cityPy.value(cityData[0] ? cityData[0] : '');
                                            //触发city-change事件
                                            cityChange(data.eventType, { items: cityData });
                                            if (!txtCity.value()) {
                                                showMesg(searcheTxt);
                                            }
                                        }
                                        cQuery.jsonpResponse = {};
                                    } else {
                                        autoCorrectCityName = '';
                                        clearCity(true);
                                    }
                                    window['__bfi'].push(['_tracklog', "nhtlcity", makeTrackLogVals(data.key, autoCorrectCityName, null)]);
                                },
                                onerror: clearCity
                            });
                        });

                        city.bind('focus', function () {
                            CITYENTER = true;
                        }).bind('keyup', function (e) {
                            e = e || window.event;
                            var keyCode = e.keyCode;
                            if (keyCode == 13) {
                                isSelect = true;
                                if (!CITYENTER) {
                                    CITYENTER = true;
                                } else {
                                    MOD.a_city.method("validate");
                                    if (HotelSearch.submit()) {
                                        fm.submit();
                                    }
                                }
                                e.preventDefault ? e.stopPropagation() : e.cancelBubble = true;
                                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                            } else if([37,38,39,40].indexOf(keyCode)===-1){ //左右键不判断为有效输入
                                isSelect = false;
                            }
                        });

                        /**
                         * 首页搜索框设置焦点方案（国内酒店）
                         **/
                        window.chinaHotelSF = function () {
                            // MOD.a_city为实例化的地址选择器
                            MOD.a_city.method('focus', {
                                isHidden: true,
                                isSelected: true
                            });
                        };
                        chinaHotelSF(); //默认执行一次

                    }
                    // 显示搜索历史
                    function showSearchHistoy(json) {
                        var DATE_FORMATOR = 'yyyy-mm-dd';

                        if (!json) return;
                        var box = $('#HD_SearchHistory');
                        var city = $('#HD_CityName');
                        if (!box.length) return;

                        box[0].style.display = '';
                        city.parentNode().removeClass('w100').addClass('w05');
                        city.removeClass('w01').addClass('w06');

                        var arr = [], len = Math.min(3, json.length);
                        for (var i = 0; i < len; i++) {
                            var item = json[i];
                            var cls = item.isoutdate === 'true' ? ' item_past' : '';
                            //TODO: 不应该出现这种代码，mvc!!!
                            arr.push('<a href="javascript:;" class="history_item' + cls + '" data=\'' + $.stringifyJSON(item).replace(/'/g, "") + '\'><span class="city">' + unescape(item.cityname) + '</span><span class="date">' + item.checkin + ' 至 ' + item.checkout + '</span></a>');
                        }
                        box.find('.history_list').html(arr.join(''));

                        btn = box.find('.s_history_btn');
                        list = box.find('.history_list')[0];
                        btn.bind('click', function (e) {
                            e.stop();
                            //use 'hasClass'.  'xxxs_history_btn_hover'.indexOf('s_history_btn_hover')
                            if (this.className.indexOf('s_history_btn_hover') != -1) {
                                this.className = 's_history_btn';
                                list.style.display = 'none';
                            } else {
                                this.className = 's_history_btn s_history_btn_hover';
                                list.style.display = 'block';
                            }
                        });

                        function setCity(item) {
                            city.removeClass('inputSel');
                            document.getElementById('HD_CityName').value = unescape(item.cityname);
                            document.getElementById('HD_CityId').value = item.id;
                            document.getElementById('HD_CityPy').value = item.pingying;
                            if (item.isoutdate === 'false') { // use boolean
                                var checkin = $('#HD_CheckIn');
                                var checkout = $('#HD_CheckOut');

                                checkin.value(item.checkin);
                                checkout.value(item.checkout);
                                checkin[0].style.backgroundImage = '';
                                checkout[0].style.backgroundImage = '';
                            }
                            cityChangeEvent(item.id, item.cityname);
                        }
                        // setCity(json[0]);

                        box.find('.history_item').bind('click', function () {
                            var obj = $.parseJSON(this.getAttribute('data'));
                            setCity(obj);
                        });

                        $(document).bind('click', function () {
                            btn[0].className = 's_history_btn';
                            list.style.display = 'none';
                        });


                    }
                    $.getJsonp(ENV + '/Domestic/Tool/AjaxGetUserSearchBehavior.aspx', function (json) {
                        if (json) {
                            var len = Math.min(6, json.length);
                            var anchors = [];
                            for (var i = 0; i < len; i++) {
                                var text = unescape(json[i].cityname).replace(/\(.*\)/, '');
                                text = text.length > 4 ? text.substr(0, 4) : text;
                                anchors.push('<a href="javascript:;" title="' + unescape(json[i].cityname) + '" data-history=\'' + $.stringifyJSON(json[i]).replace(/'/g, "") + '\'>' + text + '</a>');
                            }
                            searchHistoryList = '<p class="sarch_history_title">' + addressMessageConfig.searchHistory + '</p>' + '<div class="search_history_box">' + anchors.join('') + '</div>';

                            showSearchHistoy(json);
                        }
                        if (!MOD.a_city) {
                            clearTimeout(timer);
                            initCity();
                        }
                    });
                }

                window.cityChangeEvent = function (id, name) {
                    //set url of jsonp request for position filter
                    var a_keyword = MOD.a_keyword,
                        cityId = $('#HD_CityName').value();

                    a_keyword && id && setKeywordJsonpUrl(a_keyword, id);

                    CITYENTER = false;
                    var cityElem = city[0];
                    if (cityElem.value != cityElem.getAttribute('_lastValue')) {
                        cityElem.setAttribute('_lastValue', cityElem.value);

                        if (MOD.n_keyword) {
                            if (!keyword.attr('isFormCity')) {
                                //change city, reset keyword
                                MOD.n_keyword.method("resetValue");
                                //change city, reset relative hidden field
                                $("#positionArea, #positionId, #hotelAreaName").value("");
                            } else {
                                keyword.attr('isFormCity', '');
                            }
                            //if no city selected clear source of a_keyword
                            if (!cityId) {
                                a_keyword.set("source", {
                                    suggestion: null,
                                    data: "@@"
                                });
                            }

                            if (id) {
                                window.getOtherDataByCity(id, name);
                            } else {
                                checkHotelPosition();
                            }

                        }
                    }
                }

                window.getOtherDataByCity = function (city, name, callback, undefined) {
                    if (city === undefined) {
                        return
                    }
                    var jsID = 'error',
                        jsName = '';
                    if (city >= 1 && city <= 10) {
                        jsID = 'idFrom1To10';
                        jsName = '1_10';
                    } else if (city >= 11 && city <= 200) {
                        jsID = 'idFrom11To200';
                        jsName = '11_200';
                    } else if (city >= 201) {
                        jsID = 'idFrom201ToMax';
                        jsName = '201_99999';
                    } else if (/D\d+_\d+/.test(city)) {
                        if (typeof HOTEL_POSITION[city] == "undefined") { HOTEL_POSITION[city] = {}; }
                    }
                    if (!HOTEL_POSITION['dataCash'][jsID]) {
                        var param = {
                            type: 'text/javascript',
                            async: true,
                            onload: function () {
                                // 商业区
                                CHINA_HOTEL_ZONE_RAW_DATA = CHINA_HOTEL_ZONE_RAW_DATA.replace(/@(\d+)\|([1-9]\d*)\|\s*([^\|]+)\|\s*([^\|]*)\|\s*([^\|]*)\|\s*([A-Z])/g, function (_, id, pid, name, pingYing, PY, letter) {
                                    checkExist(pid, "zone");
                                    // 数目>15时按字母区分显示，<=15时不区分显示
                                    var A2Z = ['ABCDE', 'FGHJK', 'LMNOP', 'QRSTW', 'XYZ'];
                                    A2Z.each(function (str, idx) {
                                        if (str.indexOf(letter) != -1) {
                                            !HOTEL_POSITION[pid]["zone"][str] && (HOTEL_POSITION[pid]["zone"][str] = []);
                                            HOTEL_POSITION[pid]["zone"][str].push({ "display": name, "data": [pingYing, name, id, PY, "zoneId"].join("|") });

                                            // ALl：用于模版里逻辑判断；不区分时，显示全部
                                            !HOTEL_POSITION[pid]["zone"]["ALL"] && (HOTEL_POSITION[pid]["zone"]["ALL"] = []);
                                            HOTEL_POSITION[pid]["zone"]["ALL"].push({ "display": name, "data": [pingYing, name, id, PY, "zoneId"].join("|") });
                                        }
                                    })
                                    HOTEL_POSITION[pid]["all"].push([pingYing, name, id, PY, "zoneId"].join("|"));
                                    return '';
                                });
                                // 行政区
                                CHINA_HOTEL_LOCATION_RAW_DATA = CHINA_HOTEL_LOCATION_RAW_DATA.replace(/@(\d+)\|([1-9]\d*)\|\s*([^\|]+)\|\s*([^\|]*)\|\s*([^@]*)/g, function (_, id, pid, name, pingYing, PY) {
                                    checkExist(pid, "location");
                                    HOTEL_POSITION[pid]["location"].push({ "display": name, "data": [pingYing, name, id, PY, "locationId"].join("|") });
                                    HOTEL_POSITION[pid]["all"].push([pingYing, name, id, PY, "locationId"].join("|"));
                                    return '';
                                });
                                // 地铁线
                                CHINA_HOTEL_METRO_RAW_DATA = CHINA_HOTEL_METRO_RAW_DATA.replace(/@(\d+)\|([1-9]\d*)\|\s*([^\|]+)\|\s*([^\|]*)\|\s*([^\|]*)\|\s*([^@]*)/g, function (_, id, pid, name, pingYing, PY) {
                                    checkExist(pid, "metro");
                                    HOTEL_POSITION[pid]["metro"].push({ "display": name, "data": [pingYing, name, id, PY, "metroId"].join("|") });
                                    HOTEL_POSITION[pid]["all"].push([pingYing, name, id, PY, "metroId"].join("|"));
                                    return '';
                                });
                                // 地铁站
                                CHINA_HOTEL_SPOT_RAW_DATA = CHINA_HOTEL_SPOT_RAW_DATA.replace(/@(\w\d+)\|([1-9]\d*)\|\s*([^\|]+)\|\s*([^\|]*)\|\s*([^@]*)/g, function (_, id, pid, name, pingYing, PY) {
                                    checkExist(pid, "spot");
                                    HOTEL_POSITION[pid]["spot"].push({ "display": name, "data": [pingYing, name, id, PY, "landMarkId"].join("|") });
                                    HOTEL_POSITION[pid]["all"].push([pingYing, name, id, PY, "landMarkId"].join("|"));
                                    return '';
                                });
                                HOTEL_POSITION['dataCash'][jsID] = true;

                                checkHotelPosition(city, name);
                                callback && callback();
                            }
                        }
                        /*cQuery.loader.js('http://webresource.c-ctrip.com/code/js/resource/address_tuna/hotel_domes_zone_130416_' + jsName + '_' + cQuery.config("charset") + '.js?v=' + $('#_releaseNo_').value(), param);*/
                    } else {
                        checkHotelPosition(city, name);
                        callback && callback();
                    }
                }

                //初始化关键词suggest等
                if (this.ops.keyword.length) {
                    this.initKeyword();
                }

                function checkHotelPosition(cityId, cityName) { }
            },
            initNotice: function () {
                this.ops.city.length && (MOD.n_city = this.ops.city.regMod("notice", PluginsVersion.notice, {
                    name: "city",
                    tips: noticeMessageConfig[0],
                    selClass: "inputSel"
                }));
                this.ops.startDate.length && (MOD.n_startDate = this.ops.startDate.regMod("notice", PluginsVersion.notice, {
                    name: "startDate",
                    tips: "yyyy-mm-dd",
                    selClass: "inputSel"
                }));
                this.ops.endDate.length && (MOD.n_endDate = this.ops.endDate.regMod("notice", PluginsVersion.notice, {
                    name: "endDate",
                    tips: "yyyy-mm-dd",
                    selClass: "inputSel"
                }));
                this.ops.checkInDate.length && (MOD.n_checkInDate = this.ops.checkInDate.regMod("notice", PluginsVersion.notice, {
                    name: "checkInDate",
                    tips: "yyyy-mm-dd",
                    selClass: "inputSel"
                }));
                this.ops.checkOutDate.length && (MOD.n_checkOutDate = this.ops.checkOutDate.regMod("notice", PluginsVersion.notice, {
                    name: "checkOutDate",
                    tips: "yyyy-mm-dd",
                    selClass: "inputSel"
                }));
            },
            initCalendar: function (start, end) {
                start.regMod("calendar", PluginsVersion.calendar, {
                    options: {
                        showWeek: !0,
                        container: cQuery.container
                    }
                });
                end.regMod("calendar", PluginsVersion.calendar, {
                    options: {
                        showWeek: !0,
                        reference: '#' + start[0].id,
                        minDate: start.value().toDate() ? start.value().toDate().addDays(1).toStdDateString() : new Date().addDays(1).toStdDateString()
                    }
                });
                start.bind('change', function () {
                    var startDate = start.value().toDate();
                    if (startDate) {
                        var nextDate = startDate.addDays(1);
                        end.data('minDate', nextDate.toStdDateString());
                        var endDate = end.value().toDate();
                        if (!endDate || endDate <= startDate) {
                            end.value(nextDate.toFormatString('yyyy-MM-dd'));
                            end.getMod("notice", PluginsVersion.notice).method("checkValue");
                            end.getMod("calendar", PluginsVersion.calendar).method("setWeek", "#" + end[0].id);
                        } if (endDate && endDate - startDate > MAX_STAY) {
                            setTimeout(function () {
                                MOD.formValidator.method("show", {
                                    $obj: end,
                                    data: validateMessageConfig['hotel']['too_long'],
                                    removeErrorClass: !0,
                                    isScroll: false
                                })
                            } .bind(this), 0);
                        }
                        //auto show next calendar
                        end[0].focus();
                    } else {
                        end.data('minDate', new Date().addDays(1).toStdDateString());
                    }
                } .bind(this)).bind('focus', function () {
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }
                } .bind(this));
                end.bind('focus', function () {
                    var startDate = start.value().toDate();
                    var endDate = end.value().toDate();
                    if (startDate && endDate && endDate - startDate > MAX_STAY) {
                        setTimeout(function () {
                            MOD.formValidator.method("show", {
                                $obj: end,
                                data: validateMessageConfig['hotel']['too_long'],
                                removeErrorClass: !0,
                                isScroll: false
                            })
                        } .bind(this), 0);
                    }
                } .bind(this)).bind('blur', function () {
                    this.timer = setTimeout(function () {
                        var startDate = start.value().toDate();
                        var endDate = end.value().toDate();
                        if (startDate && endDate && endDate > startDate) {
                            if (endDate - startDate > MAX_STAY) {
                                MOD.formValidator.method("show", {
                                    $obj: end,
                                    data: validateMessageConfig['hotel']['too_long'],
                                    removeErrorClass: !0,
                                    isScroll: false
                                })
                            }
                        }
                    } .bind(this), 100);
                } .bind(this));
            }
        });
        WIN.RegMod = RegMod;
    })(window, cQuery);
    $.extend(cQuery, {
        replace: function (template, obj) {
            return template.replace(/\$\{([\w\.?]+)\}/g, function (s, k) {
                var keys = k.split('.'), l = keys.length;
                var key = keys[0];
                if (l > 1) {
                    var o = obj;
                    for (var i = 0; i < l; i++) {
                        if (key in o) {
                            o = o[key];
                            key = keys[i + 1];
                        } else return s;
                    }
                    return o;
                }
                return key in obj ? obj[key] : s;
            });
        },
        format: function (template) {
            var args = arguments, l = args.length;
            if (l > 1) {
                return template.replace(/\$(\d)/g, function (s, k) {
                    return args[k] == undefined ? '' : args[k];
                });
            } else return template;
        },
        create: function (tag, attrs) {
            var el = document.createElement(tag);
            for (var p in attrs) {
                if (attrs.hasOwnProperty(p)) {
                    if (p == 'cssText') {
                        el.style[p] = attrs[p];
                    } else {
                        el[p] = attrs[p];
                    }
                }
            }
            return el;
        }
    });
    var MadCat = function (fn, cfg) {
        this.events = {};
        fn && fn.call(this, cfg);
    };
    $.extend(MadCat.prototype, {
        set: function () { },
        get: function () { return null },
        evt: function (key, fn) { this.events[key] = fn },
        init: function () { }
    });
    var HotelSearch = new MadCat(function () {
        var HD_CheckIn, HD_CheckOut,
            HD_CityName, HD_TxtKeyword;
        var hidCityId, hidCityPY;
        var me = this;
        var submitConfig = {
            isAuto: false,
            isMap: false
        }

        this.init = function () {
            HD_CheckIn = document.getElementById('HD_CheckIn');
            HD_CheckOut = document.getElementById('HD_CheckOut');
            HD_CityName = document.getElementById('HD_CityName');
            HD_TxtKeyword = document.getElementById('HD_TxtKeyword');
            hidCityId = document.getElementById('HD_CityId');
            hidCityPY = document.getElementById('HD_CityPy');
            var Enter = $('#chinaHotelForm');
            Enter.bind('keydown', function (e) {
                e = e || window.event;
                if (e.keyCode == 13) {
                    if (HotelSearch.submit()) {
                        fm.submit();
                    }
                }
            });

        };
        this.set = function () { };
        this.checkDate = function (date, v0) {
            v0 = v0 ? v0.toDate() : new Date().toStdDateString().toDate();
            var dt1 = date[0], dt2 = date[1],
                v1 = dt1.value.toDate() || 0, v2 = dt2.value.toDate() || 0;
            return !$(dt1).value() ? showTips(dt1, 'checkIn') :
                !v1 ? showTips(dt1, 'dateErr') :
                    v1 < v0 ? showTips(dt1, 'too_early_in') :
                        !$(dt2).value() ? showTips(dt2, 'checkOut') :
                            !v2 ? showTips(dt2, 'dateErr') :
                                v1 >= v2 ? showTips(dt2, 'too_early_out') :
                                    v2 - v1 > MAX_STAY ? showTips(dt2, 'too_long') : 1;
        };
        this.checkDateByAuto = function (date, v0) {
            v0 = v0 ? v0.toDate() : new Date().toStdDateString().toDate();
            var dt1 = date[0], dt2 = date[1],
                v1 = dt1.value.toDate() || 0, v2 = dt2.value.toDate() || 0;
            return !$(dt1).value() ? 0 :
                !v1 ? 0 :
                    v1 < v0 ? 0 :
                        !$(dt2).value() ? 0 :
                            !v2 ? 0 :
                                v1 >= v2 ? 0 :
                                    v2 - v1 > MAX_STAY ? 0 : 1;
        };
        this.setSubmit = function (isAuto, isMap) {
            submitConfig.isAuto = !!isAuto;
            submitConfig.isMap = !!isMap;
        };
        this.submit = function (isAuto, isMap) {
            isAuto = isAuto || submitConfig.isAuto;
            isMap = isMap || submitConfig.isMap;
            //以cityId为准，cityName有可能是错的
            if (!$(hidCityId).value()) {
                // if (!$(HD_CityName).value()) {
                if (isAuto) {
                    var param = { cityId: '', cityName: '', cityPY: '' };
                    if (param.cityId && param.cityName && param.cityPY) {
                        HD_CityName.value = param.cityName;
                        hidCityId.value = param.cityId;
                        hidCityPY.value = param.cityPY;
                    } else {
                        HD_CityName.value = addressMessageConfig['defaultValue'][0];
                        hidCityId.value = addressMessageConfig['defaultValue'][1];
                        hidCityPY.value = addressMessageConfig['defaultValue'][2];
                    }
                } else {
                    return showTips(HD_CityName, 'city');
                }
            }
            if (isAuto) {
                if (!this.checkDateByAuto([HD_CheckIn, HD_CheckOut])) {
                    HD_CheckIn.value = HD_CheckIn.defaultValue;
                    HD_CheckOut.value = HD_CheckOut.defaultValue;
                }
            } else if (!this.checkDate([HD_CheckIn, HD_CheckOut])) {
                return false;
            }
            var other = [];
            var pos = '';

            /* 拼接URL */

            var urlType,
                isHotelName,
                positionArea = $('#positionArea')[0],
                positionId = $('#positionId')[0],
                searchKeyword = $('#hotelAreaName')[0],
                keyword = $(HD_TxtKeyword).value();

            ; (function () { //keep variables be local
                if (keyword) {
                    var id = positionId.value,
                        areaTypeVal = positionArea.value;

                    isHotelName = areaTypeVal.toLowerCase() === 'hotel';
                    urlType = markerTypeMap[areaTypeVal.toLowerCase()];
                    urlType = urlType && urlType.search;
                    if (urlType) {
                        //非景区时需要拼接
                        if(urlType !== "district"){
                            (urlType === 's') && (id = id.replace(/^[SL]/, '')); //新地标处理统一，方便查询服务器查询
                            pos += urlType + id;
                        }
                    } else {
                        //positionArea.value = '';
                        //positionId.value = '';
                        searchKeyword.value = keyword;
                    }
                } else {
                    positionArea.value = '';
                    positionId.value = '';
                    searchKeyword.value = '';
                }
            })();


            var searchHotelLevelSelect = document.getElementById('searchHotelLevelSelect');
            if (searchHotelLevelSelect && searchHotelLevelSelect.value != '0') {
                pos += 'star' + searchHotelLevelSelect.value;
            }
            if (pos) {
                other.push(pos);
            }
            if ($(HD_TxtKeyword).value() && !urlType) {
                other.push((isHotelName ? 'k2' : 'k1') + encodeURIComponent(searchKeyword.value.replace(/\+/g, "＋")));
            }

            var url = '/hotel/${city}${map}${other}';
            if (positionArea.value && positionArea.value.toLowerCase() === 'hotel' && positionId.value) {
                //如果联想类型是酒店,跳转到详情页（不考虑客栈）
                url = '/hotel/' + positionId.value + '.html';
            }
            var link = $.replace(url, {
                city: hidCityPY.value.toLowerCase() + '' + hidCityId.value,
                map: isMap ? '/map' : '',
                other: (other.length ? '/' + other.join('/') : '')
            });
            $('#HD_CheckIn').value(HD_CheckIn.value);
            $('#HD_CheckOut').value(HD_CheckOut.value);

            fm.action = CtripENV + link + '#ctm_ref=ctr_hp_sb_lst';
            if (fm.__VIEWSTATE) fm.__VIEWSTATE.name = "NOVIEWSTATE";
            fm.target = '_self';
            saveInfoWhenSubmit && saveInfoWhenSubmit();
            return true;
        };

        this.setCity = function (cityId, cityName, cityPY) {
            if (!cityId || !cityName || !cityPY) return;
            MOD.n_city.method("checkValue");
            //MOD.n_hotelPos.method("checkValue");
            //MOD.n_hotelName.method("checkValue");
        };

        function showTips(obj, msg) {
            obj.focus();
            setTimeout(function () {
                MOD.formValidator.method("show", {
                    $obj: $(obj),
                    data: validateMessageConfig.hotel[msg],
                    removeErrorClass: !0,
                    hideEvent: "blur",
                    //isFocus: !0,
                    isScroll: false
                });
            }, 50)
            return false;
        }
    });

    var HD_COOKIE_NAME = 'HotelCityID';
    /*
    if (arrEnv[1]) {
        HD_COOKIE_NAME = HD_cookieName[arrEnv[1]];
    } else {
        HD_COOKIE_NAME = 'HotelCityID';
    }
    */
    var FIELDS_WITH_BACKWARD_STATUS = {
        cityName: 'HD_CityName',
        cityId: 'HD_CityId',
        cityPY: 'HD_CityPy',
        checkIn: 'HD_CheckIn',
        checkOut: 'HD_CheckOut',
        hotellevel: 'searchHotelLevelSelect'
    };
    var HD_COOKIE_KEY = {
        cityId: 'cityId',
        cityName: 'cityName',
        cityPY: 'cityPY',
        checkIn: 'checkIn',
        checkOut: 'checkOut',
        hotellevel: 'hotellevel'
    }
    function saveInfoWhenSubmit() {
        saveHotelStatus(FIELDS_WITH_BACKWARD_STATUS, HD_COOKIE_NAME);
    }
    function saveHotelStatus(fields, cookieName) {
        if (cQuery.isEmptyObject(fields)) {
            return false;
        }
        setCookie(cookieName, {
            "cityId": document.getElementById(fields.cityId).value,
            "cityName": document.getElementById(fields.cityName).value,
            "cityPY": document.getElementById(fields.cityPY).value,
            "checkIn": document.getElementById(fields.checkIn).value,
            "checkOut": document.getElementById(fields.checkOut).value,
            "hotelLevel": document.getElementById(fields.hotellevel).value
        });
    }
    function restoreHotelStatus(fields, param) {
        document.getElementById(fields.cityId).value = param['cityId'];
        document.getElementById(fields.cityName).value = param['cityName'];
        document.getElementById(fields.cityPY).value = param['cityPY'];

        // 入住日期和退房日期默认是今住明离
        document.getElementById(fields.checkIn).value = (param['checkIn'] === '' ? todayDateStr() : (isOutDate(param['checkIn']) ? todayDateStr() : param['checkIn']));
        document.getElementById(fields.checkOut).value = (param['checkOut'] === '' ? tomorrowDateStr() : (isOutDate(param['checkOut']) ? tomorrowDateStr() : param['checkOut']));

        // 大于0，说明选择了酒店级别
        param['hotellevel'] > 0 && (document.getElementById(fields.hotellevel).value = param['hotellevel']);
    }
    function todayDateStr() {
        var obj = new Date();
        return obj.getFullYear() + '-' + (obj.getMonth() + 1) + '-' + obj.getDate();
    }
    function tomorrowDateStr() {
        return todayDateStr().toDate().addDays(1).toFormatString('yyyy-MM-dd');
    }
    function isOutDate(dateStr) {
        var date = new Date(dateStr.replace(/\-/g, '/')).getTime();
        var now = new Date(todayDateStr().replace(/\-/g, '/')).getTime();
        return date <= now;
    }
    function getCookie(mainKey, fields) {
        var keyMap = {};
        var m = cQuery.cookie.get(mainKey);
        m = (m ? m : "").split("split");
        for (var i = 0, l = m.length; i < l; i++) {
            if (i == 0)
                keyMap[fields.cityId] = unescape(m[i]);
            else if (i == 1)
                keyMap[fields.cityName] = unescape(m[i]);
            else if (i == 2)
                keyMap[fields.cityPY] = unescape(m[i]);
            else if (i == 3)
                keyMap[fields.checkIn] = unescape(m[i]);
            else if (i == 4)
                keyMap[fields.checkOut] = unescape(m[i]);
            else if (i == 5)
                keyMap[fields.hotellevel] = unescape(m[i]);
        }
        return keyMap;
    }
    function setCookie(mainKey, keyMap) {
        var cookiedomain = window.location.host.replace(/www\./, '');
        cQuery.cookie.set(HD_COOKIE_NAME, null, keyMap['cityId'] + 'split' + keyMap['cityName'] + 'split' + keyMap['cityPY'] + 'split' + keyMap['checkIn'] + 'split' + keyMap['checkOut'] + 'split' + keyMap['hotelLevel'], { expires: 30, domain: cookiedomain, path: '/' });
    }

    var PageLoad = (function () {
        var releaseNo = $('#_releaseNo_').value();
        var param = getCookie(HD_COOKIE_NAME, HD_COOKIE_KEY);
        param = cQuery.extend({
            cityName: '',
            cityId: '',
            cityPY: '',
            checkIn: '',
            checkOut: '',
            hotellevel: ''
        }, param);
        restoreHotelStatus(FIELDS_WITH_BACKWARD_STATUS, param);

        // 修复点击浏览器回退，关键词有残留
        document.getElementById('HD_TxtKeyword').value = '';
        document.getElementById('hotelAreaName').value = '';

        var initMod = function () {
            var hotelSearchMod = new RegMod({
                city: $('#HD_CityName'),
                startDate: $('#HD_CheckIn'),
                endDate: $('#HD_CheckOut'),
                keyword: $('#HD_TxtKeyword')
            });
        };

        var initHotelSearch = function () {
            HotelSearch.init();
            HotelSearch.setCity(param.cityId, param.cityName, param.cityPY);
            setKeywordJsonpUrl(MOD.a_keyword, param.cityId); //set url of jsonp request for keyword filter
            $('#HD_Btn').bind('click', function (e) {
                var thisDom = $(this),
                    loadCls = "s_btn_ing";
                thisDom.removeClass(loadCls).value(message.srhLoad);
                if (HotelSearch.submit()) {
                    thisDom.addClass(loadCls).value(message.srhLoading);
                    sendAjaxWithKeyword();
                    fm.submit();
                }
                e.stop();
            });
            $('#HD_MapBtn').bind('click', function (e) {
                if (HotelSearch.submit(false, true)) {
                    sendAjaxWithKeyword();
                    fm.submit();
                }
                e.stop();
            });
        };

        var initPage = function () {
            initMod();
            initHotelSearch();
        };

        return {
            init: initPage
        }
    })()
    PageLoad.init();
})(cQuery);

//create namespace for biz
cQuery.BizMod = cQuery.BizMod || {};
/**
 * 陆续将这里的代码重构，组织成一个SearchPanel的模块，提供API给调用
 * @module search-panel
 *
 */
; (function (exports, WIN) {
    var SearchPanel,
        NOOP = function () { },
        EMPTY = '',
        isBig5 = /big5\./.test(location.host),
        mix = $.extend,
        options = {
            geolocationError: NOOP,
            geolocationConfig: {
                //use GPS, true
                enableHighAccuracy: true,
                //timeout
                timeout: 5000,
                //cache expire time (millisecond)
                maximumAge: 8.64e7
            },
            geolocationToCityService: '/test.ajax',
            cityId: $('#cityId'),
            cityName: $('#txtCity'),
            cityPY: $('#cityPY')
        };


    SearchPanel = {
        /**
         * 获取当前经纬度
         * @param {Function} callback, called after get gelocation
         * @param {Function} errorCallback, called when error occurred
         * @param {Object}
         */
        getGeolocation: function (callback, errorCallback, settings) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(callback, errorCallback || options.geolocationError, settings || options.geolocationConfig);
            } else {
                callback(null);
            };
            return this;
        },
        getCityByGeolocation: function (callback, url) {
            var self = this;

            self.getGeolocation(function (gelocation) {
                var lonlat = gelocation.coords || {};

                $.ajax((url || options.geolocationToCityService) + '?isBig5=' + isBig5 + '&lat=' + lonlat.latitude + '&lon=' + lonlat.longitude, {
                    method: $.AJAX_METHOD_GET,
                    onsuccess: function (rs, rsText) {
                        rsText = rsText && $.parseJSON(rsText);
                        callback.call(self, rsText);
                    }
                });
            });
            return self;
        },
        /**
         * 设置当前城市, 根据城市数据结构调整
         * @TODO: rebuild
         * @param {Object} city
         * <code>
         *   {
         *       name: '', //city name
         *       id: '', //city id
         *       py: '' //pinying
         *   }
         * </code>
         */
        setCity: function (city) {
            var opt = options,
                cityName = opt.cityName,
                id = city.id;

            if (id) {
                opt.cityId.value(id);
                cityName.value(city.name);
                opt.cityPY.value(city.py);
                cityName.removeClass('inputSel');
            };
        },
        init: function (config) {
            mix(options, config);
            return this;
        }
    };
    //test code
    SearchPanel.init({
        geolocationToCityService: '/ajax.url'
    });
    exports.SearchPanel = SearchPanel;

    {
        var content = $('#J_cildNumSelectorBoxTpl').html();

        $("#J_cildNumSelectorBox").html(content);

        var bindNumSelector = function (item, onChange) {
            var selector = {
                val: 0, max: 0, min: 0, item: item,
                setValue: function (val) {
                    if (val <= this.max && val >= this.min) {
                        this.val = val;
                    }
                    else {
                        if (val > this.max)
                            this.val = this.max;
                        else
                            this.val = this.min;
                    }
                    this.item.find(".number_input").value(this.val);
                    setBound();
                    onChange(val);
                },
                init: function (val) {
                    this.setValue(val);
                    onChange(val);
                }
            };
            var setBound = function () {
                if (selector.val > selector.min) {
                    selector.item.find(".number_reduce").removeClass("number_disable");
                }
                if (selector.val < selector.max) {
                    selector.item.find(".number_plus").removeClass("number_disable");
                }
                if (selector.val <= selector.min) {
                    selector.item.find(".number_reduce").addClass("number_disable");
                }
                if (selector.val >= selector.max) {
                    selector.item.find(".number_plus").addClass("number_disable");
                }
            };

            item.find(".number_input").bind("blur", function () {
                selector.setValue(parseIntNull(selector.item.find(".number_input").value()));
                onChange(selector.val);
            });
            item.find(".number_reduce").bind("click", function () {
                if (selector.val > selector.min) {
                    selector.val--;
                    selector.item.find(".number_input").value(selector.val);
                    onChange(selector.val);
                }
                setBound();
            });

            item.find(".number_plus").bind("click", function () {
                if (selector.val < selector.max) {
                    selector.val++;
                    selector.item.find(".number_input").value(selector.val);
                    onChange(selector.val);
                }
                setBound();
            });
            setBound();
            return selector;
        };

        {
            var $J_intelHotelChildPolicyTip = $('#J_intelHotelChildPolicyTip'),
                $J_intelHotelChildPolicyContent = $('#J_intelHotelChildPolicyContent');

            $J_intelHotelChildPolicyTip.showTips({
                tipsEle: '#J_intelHotelChildPolicyContent',
                preventDisappearEle: '#J_intelHotelChildPolicyContent',
                openArrow: function ($thisHoverEle) {
                    //$('.jmpUnBooking').not($thisTipsEle).remove();
                    $J_intelHotelChildPolicyContent.removeClass('hidden').css({
                        top: "90px",
                        left: "390px",
                        width: "220px"
                    });
                },
                isNeedDispearTipsManually: true,
                delayDisappearTime: 100
            });
        }

        $("#J_roomCountList").bind("change", function (e) {
            setRoomGuestCount();
        });

        ////////////////////////////////
        var setRoomGuestCount = function () {
            try {
                var roomCount = $("#J_roomCountList").value();
                var val = roomCount + "," + J_AdultCount.val + "," + J_ChildCount.val;
                for (var i = 0; i < J_ChildCount.val; i++) {
                    val += "," + $("#J_childageVal" + i).value();
                }

                $("#J_RoomGuestCount").value(val);

                $("#J_RoomGuestInfoTxt").value(J_AdultCount.val + "成人 " + (J_ChildCount.val > 0 ? (J_ChildCount.val + "儿童") : ""));
            } catch (ex) { }
        }

        $("#J_RoomGuestInfoTxt,#J_RoomGuestInfoTxt_i").bind("click", function () {
            var dt = new Date($("#HD_CheckIn").value().replace(/-/g,"/"));
            var y = dt.getFullYear();
            var m = dt.getMonth() + 1;
            var d = dt.getDate();
            $(".J_today").html(y + "年" + m + "月" + d + "日");
            //$("#J_RoomGuestInfoDiv").addClass("n_gst_active");
            $("#J_cildNumSelectorBox").show();
        });


        $(".J_childageVal").each(function (item) {
            elem = document.createElement("option");
            elem.value = "0";
            elem.text = "<1岁";
            item.append(elem);
            for (var i = 1; i < 18; i++) {
                elem = document.createElement("option");
                elem.value = i;
                elem.text = i + "岁";
                if (i == 12) {
                    elem.selected = true;
                }
                item.append(elem);
            }
        });

        $("#J_RoomGuestInfoBtnOK").bind("click", function () {
            if (J_ChildCount.val > 0) {
                for (var i = 0; i < J_ChildCount.val; i++) {
                    if ($("#J_childageVal" + i).value() == "") {
                        $("#J_RoomGuestInfoDiv").find("#J_childs_tips").show();
                        return;
                    }
                }
            }
            $("#J_RoomGuestInfoDiv").find("#J_childs_tips").hide();

            setRoomGuestCount();

            //$("#J_RoomGuestInfoDiv").removeClass("n_gst_active");
            $("#J_cildNumSelectorBox").hide();
        });
        $("#J_RoomGuestInfoBtnCancel").bind("click", function () {
            //$("#J_RoomGuestInfoDiv").removeClass("n_gst_active");
            $("#J_cildNumSelectorBox").hide();
        });

        var J_AdultCount = bindNumSelector($("#J_AdultCount"), function () { });
        J_AdultCount.min = 1;
        J_AdultCount.max = 36;
        J_AdultCount.init(1);

        var J_ChildCount = bindNumSelector($("#J_ChildCount"), function () {
            if (J_ChildCount.val == 0) {
                $("#J_childageValDiv").hide();
            }
            else {
                $("#J_childageValDiv").show();
            }
            for (var i = 0; i < 9; i++) {
                if (i < J_ChildCount.val) {
                    $("#J_childageVal" + i).show();
                } else {
                    $("#J_childageVal" + i).hide();
                }
            }
        });
        J_ChildCount.min = 0;
        J_ChildCount.max = 9;
        J_ChildCount.init(0);


        {
            try {
                var val = $("#J_RoomGuestCount").value();

                val = val.split(",");
                $("#J_roomCount").value(parseInt(val[0]) + "间");

                J_AdultCount.setValue(parseInt(val[1]));
                J_ChildCount.setValue(parseInt(val[2]));
                for (var i = 0; i < J_ChildCount.val; i++) {
                    $("#J_childageVal" + i).value(parseInt(val[3 + i]));
                }
                setRoomGuestCount();
            } catch (ex) {
            }
        }



    }











})(cQuery.BizMod, window);

/**
 * CHANGE LOGS
 * - 2014-03-04 xuwei.chen:
 * - 移除所有abtest
 *
 * - 2014-03-12:
 * - 1、酒店搜索埋点
 * - 2、QQ输入法BUG修复
 * - 3、目的地景区示意图更新
 * - 4、用户行为跟踪
 * - 5、目的地搜索关键词找不到，失去焦点时不清空
 */