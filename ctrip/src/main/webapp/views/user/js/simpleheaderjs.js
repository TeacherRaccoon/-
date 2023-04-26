(function () {
    var win = window, doc = win.document, loc = win.location;
    var utils = {
        // convert html to dom
        html2dom: function (html) {
            var fragment = document.createDocumentFragment();
            var div = document.createElement('div');

            div.innerHTML = html;
            var children = div.children;

            while (children.length > 0) {
                fragment.appendChild(children[0]);
            }

            return fragment;
        },
        createScript: function (url, isAsync) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = isAsync;
            s.src = url;
            var h = document.getElementsByTagName('head')[0];
            h.appendChild(s);
        },
        createStyleTag: function (css) {
            head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        }
    };

    window.BuildHTML = function (data) {
        if (document.getElementById('cui_hd')) {
            if (navigator.userAgent.indexOf('MSIE') > 0) {
                document.getElementById('cui_hd').parentNode.removeChild(document.getElementById('cui_hd'));
            } else {
                document.getElementById('cui_hd').parentNode.remove();
            }
        }
        var thisURL = document.URL;
        var v16 = (thisURL.indexOf('big5.') >= 0 || thisURL.indexOf('Big5.') >= 0 || thisURL.indexOf('.hk') >= 0 || thisURL.indexOf('.HK') >= 0 || thisURL.indexOf('/youpiao/TravelTicketBig5') >= 0) ? '會員' : '会员';

        var strhtml = '<div class="cui_hd_cont"><div id="cui_hd" class="cui_hd"><div class="ctriplogo"><a target="_blank" href="http://www.ctrip.com" alt="携程旅行网">携程旅行网</a><div id="cui_provider_logo" class="supplier_logo"></div></div>';
        if (data == undefined || data == null) {
            strhtml += '<div class="cui_toolkit"><a target="_blank" href="http://kefu.ctrip.com" class="cui_kefu">客服中心</a></div>';
        } else if (data.hascookieuser == 'F') {
            strhtml += '<div class="cui_toolkit"><a target="_blank" href="http://kefu.ctrip.com" class="cui_kefu">客服中心</a></div>';
        } else {
            if (data.usershortname != '') {
                if (data.usershortname != data.username) {
                    data.usershortname = data.username.length > 7 ? (data.username.substring(0, 7) + '…') : data.username;
                }
                //样式控制长度
                strhtml += '<div class="cui_toolkit"><span class="cui_username">' + data.usershortname + '</span>\n|\n<a target="_blank" href="http://kefu.ctrip.com" class="cui_kefu">客服中心</a></div>';
            } else {
                if (data.vipgradename == '普通会员' || data.vipgradename == '普通會員') {
                    data.vipgradename = v16;
                }
                strhtml += '<div class="cui_toolkit"><span class="cui_username">尊敬的' + data.vipgradename + '</span>\n|\n<a target="_blank" href="http://kefu.ctrip.com" class="cui_kefu">客服中心</a></div>';
            }
        }

        strhtml += "</div></div>";
        var bodyelem = document.getElementsByTagName("body")[0];
        bodyelem.insertBefore(utils.html2dom(strhtml), bodyelem.firstChild);
    };

    var getUserHTML = function () {
		var envir = 'other';
		var crossdomain = 'F';
		if(typeof(globalConfig) != 'undefined')
		{
			envir = typeof(globalConfig.Environment) == 'undefined' || globalConfig.Environment == null ? 'other' : globalConfig.Environment;
			crossdomain = typeof(globalConfig.CrossDomain) == 'undefined' || globalConfig.CrossDomain == null ? 'F' : globalConfig.CrossDomain;
		}
		var temp = Math.random();
		var envirjson = { 'dev': 'dev.sh.ctriptravel.com', 'fat': 'fat49.qa.nt.ctripcorp.com','uat_nt': 'uat.qa.nt.ctripcorp.com','other': 'ctrip.com' };
		var DC1 = envirjson['' + envir + ''];
		var ticket_cookie=null;
	    var getCookie = function (name) {
		 try{
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
				return unescape(arr[2]); 
			else 
				return null; 
				}
		  catch(e)
		  {
			return null; 
		  }
		};
		ticket_cookie = getCookie("ticket_ctrip");
		if(ticket_cookie == null||crossdomain == 'F')
		{
			var ajaxUrl1 = 'https://accounts.' + DC1 + '/member/ajax/AjaxGetCookie.ashx?jsonp=BuildHTML&r=' + temp;
		}
		else
		{
			var ajaxUrl1 = 'https://accounts.' + DC1 + '/CrossDomainGetTicket/ajax/GetHeadShow.ashx?jsonp=BuildHTML&ticket=' + ticket_cookie + "&r=" + temp;
		}
        utils.createScript(ajaxUrl1, true);
    };

    var buildStyleTag = function () {
        var protocol = 'http://';
        if ('https:' == document.location.protocol) 
		{
			protocol = 'https://';
		} 
        var css = '	body{margin:0;background-color:#fff;}' +
                    '.cui_hd_cont{background-color:#fff;clear:both;}' +
                    '#cui_hd{font-family:Arial,tahoma,verdana,"Microsoft YaHei",Simsun,sans-serif;line-height:1.5;font-size:12px;}' +
                    '.cui_hd{min-width:980px;max-width:1180px;height:59px;margin:0 auto;padding:0 10px;background-color:#fff;}' +
                    '.ctriplogo{position:relative;float:left;width:126px;padding-top:8px;padding-bottom:8px;}' +
                    '.ctriplogo a{display:block;width:126px;height:43px;overflow:hidden;text-indent:-999px;background:url('+protocol+'pic.c-ctrip.com/common/c_logo2013.png) 0 0 no-repeat;}' +
                    ':root .ctriplogo a{background-image:url('+protocol+'pic.c-ctrip.com/common/c_logo2013_2x.png);background-size:100% 100%;}' +
                    '.ctriplogo .supplier_logo{position:absolute;top:8px;left:140px;width:900px;height:25px;line-height:25px;overflow:hidden;padding:18px 0 0 0;font-family:Simsun;color:#999;border-left:1px solid #E8E8E8;}' +
                    '.ctriplogo .supplier_logo img{float: left;display:inline-block;margin:-10px 10px 0 18px;}' +
                    '.hhlogo{float:left;width:55px;height:43px;margin-top:6px;padding-left:10px;text-indent:-999px;overflow:hidden;border-left:1px solid #B4B4B4;background:url('+protocol+'pic.c-ctrip.com/common/hh_logo.png) no-repeat 10px 100%;}' +
                    '.cui_toolkit{float:right;width:422px;padding-top:20px;text-align:right;color:#bbb;}' +
                    '.cui_toolkit a{text-decoration:none;}' +
                    '.cui_toolkit a:hover{text-decoration:underline;}' +
                    '.cui_kefu{color:#4c4c4c;margin-left:8px;}' +
                    '.cui_username{color:#06c;margin-right:8px;}' +
                    /* ft */
                    '#base_ft{width:950px;clear:both;text-align:center;padding-top:15px;margin:0 auto 20px;font-family:Arial,verdana;color:#4c4c4c;font-size:12px;}' +
                    '#base_ft a{color:#4c4c4c;margin:0 1px;text-decoration:none;}' +
                    '#base_ft a:hover{text-decoration:underline;}' +
                    '#base_ft p .suggestions{color:#06c;}'
        ;
        utils.createStyleTag(css);
    };

    var buildFooter = function () {
		var cDate = new Date();
        var strhtml = '<div id="base_ft">' +
            '<p class="copyright"><a href="http://pages.ctrip.com/public/copyright.htm">Copyright&copy;</a> 1999-'+cDate.getFullYear()+', <a href="http://www.ctrip.com">ctrip.com</a>. All rights reserved. | <a rel="nofollow" target="_blank" href="http://www.miibeian.gov.cn/">ICP证：沪B2-20050130</a></p>' +
            '</div>';
        var bodyelem = document.getElementsByTagName('body')[0];
        bodyelem.appendChild(utils.html2dom(strhtml));

        var base_ft = document.getElementById('base_ft'),
            elems = base_ft.getElementsByTagName('p'),
            i,
            matchClass = 'copyright',
            content;

        if ('https:' == document.location.protocol) {
            for (i in elems) {
                if ((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) {
                    content = elems[i].innerHTML;
                    break;
                }
            }
            if (content != null) {
                base_ft.innerHTML = content;
            }
        }
    };
	
    var addEventHandler = function (obj, eventName, fun) {
        var fn = fun;
        if (obj.attachEvent) {
            obj.attachEvent('on' + eventName, fn);
        } else if (obj.addEventListener) {
            obj.addEventListener(eventName, fn, false);
        } else {
            obj["on" + eventName] = fn;
        }
    }
	
    addEventHandler(window, "load", function () {
        getUserHTML();
        buildStyleTag();
        buildFooter();
        window.SHead = window.SHead || {};
        window.SHead.getUserHTML = getUserHTML;
    })
})();
