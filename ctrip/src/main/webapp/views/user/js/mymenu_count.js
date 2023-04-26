/*
 * date:1563948530490
 * author:ddyin
 */

(function() {
	//data
	var contentObj = JSON.parse('{"0":"&lt;div id=&quot;sideNavCss&quot;&gt;&lt;/div&gt;&lt;div id=&quot;sideNav&quot; class=&quot;aside clearfix&quot;&gt;&lt;dl class=&quot;sidenav&quot;&gt;&lt;dt&gt;&lt;a id=&quot;index&quot; href=&quot;userCenter_index.html&quot;&gt;&lt;span&gt;我的携程首页&lt;/span&gt;&lt;/a&gt;&lt;/dt&gt;&lt;/dl&gt;&lt;dl class=&quot;sidenav&quot;&gt;&lt;dt class=&quot;toggleSide&quot;&gt;&lt;a href=&quot;javascript:;&quot;&gt;&lt;span&gt;订单&lt;/span&gt;&lt;i class=&quot;ico_arr&quot;&gt;&lt;/i&gt;&lt;/a&gt;&lt;/dt&gt;&lt;dd&gt;&lt;a href=&quot;all_bill.html&quot; class=&quot;&quot; id=&quot;order_all&quot;&gt;&lt;span&gt; 全部订单 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;HotelOrderList.html&quot; class=&quot;&quot; id=&quot;order_hotel&quot;&gt;&lt;span&gt; 酒店订单 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;http://localhost:8080/views/user/ticketOrderList.html &quot; class=&quot;&quot; id=&quot;order_flt&quot;&gt;&lt;span&gt; 门票订单 &lt;/span&gt;&lt;/a&gt;&lt;div id=&quot;hideOrder&quot; class=&quot;hide_order&quot; style=&quot;display: block;&quot;&gt;&lt;a href=&quot;LocalUnionOrderList.html&quot; class=&quot;&quot; id=&quot;order_localunion&quot;&gt;&lt;span&gt; 旅游订单 &lt;/span&gt;&lt;/a&gt;&lt;/div&gt;&lt;a  id=&quot;moreOrder&quot; href=&quot;javascript:;&quot; class=&quot;more_order&quot;&gt; 更多订单&lt;i class=&quot;ico_arr&quot;&gt;&lt;/i&gt;&lt;/a&gt;&lt;/dd&gt;&lt;/dl&gt;&lt;dl class=&quot;sidenav&quot;&gt;&lt;dt class=&quot;toggleSide&quot;&gt;&lt;a href=&quot;javascript:;&quot;&gt;&lt;span&gt;钱包&lt;/span&gt;&lt;i class=&quot;ico_arr&quot;&gt;&lt;/i&gt;&lt;/a&gt;&lt;/dt&gt;&lt;dd&gt;&lt;a href=&quot;https://secure.ctrip.com/webwallet/index&quot; class=&quot;https://secure.ctrip&quot; id=&quot;pay_mywallet&quot;&gt;&lt;span&gt; 我的钱包 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;https://zc.ctrip.com&quot; class=&quot;&quot; id=&quot;pay_myticket&quot;&gt;&lt;span&gt; 礼品卡 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;https://secure.ctrip.com/webwallet/card/index&quot; class=&quot;&quot; id=&quot;pay_mycard&quot;&gt;&lt;span&gt; 银行卡 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;https://secure.ctrip.com/webwallet/cash/index&quot; class=&quot;&quot; id=&quot;pay_mycash&quot;&gt;&lt;span&gt; 返现账户 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;https://secure.ctrip.com/webwallet/safety/index&quot; class=&quot;&quot; id=&quot;pay_tpassword&quot;&gt;&lt;span&gt; 安全中心 &lt;/span&gt;&lt;/a&gt;&lt;/dd&gt;&lt;/dl&gt;&lt;dl class=&quot;sidenav&quot;&gt;&lt;dt&gt;&lt;/dt&gt;&lt;/dl&gt;&lt;dl class=&quot;sidenav&quot;&gt;&lt;dt&gt;&lt;a id=&quot;ticket_myjifen&quot; href=&quot;https://sinfo.ctrip.com/MyInfo/AccountCenter/MineMileage.aspx&quot;&gt;&lt;/dt&gt;&lt;/dl&gt;&lt;dl class=&quot;sidenav&quot;&gt;&lt;dt&gt;&lt;a id=&quot;info_hotelfavorites&quot; href=&quot;//my.ctrip.com/favorite/myfav&quot;&gt;&lt;span&gt;收藏&lt;/span&gt;&lt;/a&gt;&lt;/dt&gt;&lt;/dl&gt;&lt;dl class=&quot;sidenav&quot;&gt;&lt;dt class=&quot;toggleSide&quot;&gt;&lt;a href=&quot;javascript:;&quot;&gt;&lt;span&gt;个人中心&lt;/span&gt;&lt;i class=&quot;ico_arr&quot;&gt;&lt;/i&gt;&lt;/a&gt;&lt;/dt&gt;&lt;dd&gt;&lt;a href=&quot;messagelist.html&quot; class=&quot;&quot; id=&quot;info_messageremind&quot;&gt;&lt;span&gt; 消息提醒 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;userInfoUpdate.html&quot; class=&quot;&quot; id=&quot;info_myaccount&quot;&gt;&lt;span&gt; 我的信息 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;javascript:void(0)&quot; class=&quot; &quot; id=&quot;info_bindrelation&quot;&gt;&lt;span&gt; 绑定与关联 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;safecenterhome.html&quot; class=&quot;&quot; id=&quot;info_accountsecurity&quot;&gt;&lt;span&gt; 账户安全 &lt;/span&gt;&lt;/a&gt;&lt;/dd&gt;&lt;/dl&gt;&lt;dl class=&quot;sidenav&quot;&gt;&lt;dt class=&quot;toggleSide&quot;&gt;&lt;a href=&quot;javascript:;&quot;&gt;&lt;span&gt;常用信息&lt;/span&gt;&lt;i class=&quot;ico_arr&quot;&gt;&lt;/i&gt;&lt;/a&gt;&lt;/dt&gt;&lt;dd&gt;&lt;a href=&quot;PassengerList.html&quot; class=&quot;&quot; id=&quot;common_passenger&quot;&gt;&lt;span&gt; 常用旅客信息 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;ContactList.html&quot; class=&quot;&quot; id=&quot;common_contacts&quot;&gt;&lt;span&gt; 常用联系人 &lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;javascript:void(0)&quot; class=&quot;&quot; id=&quot;common_commonlyinvoice&quot;&gt;&lt;a href=&quot;AddressInfoShow.html&quot; class=&quot;&quot; id=&quot;common_usefuladdress&quot;&gt;&lt;span&gt; 常用地址 &lt;/span&gt;&lt;/a&gt;&lt;/dd&gt;&lt;/dl&gt;&lt;dl class=&quot;sidenav&quot;&gt;"}');
	var menuType = document.getElementById("leftNavWrapper").getAttribute("menutype");
	var id = document.getElementById("leftNavWrapper").getAttribute("menuid");
	var appendToDom = function(s) {
		var div = document.createElement('div');
		div.innerHTML = s;
		document.getElementById("leftNavWrapper").innerHTML = div.innerText || div.textContent;
	};
	var queryString = function(item) {
		var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	}

	var selectMenuItem = function(id) {
		var listA = document.getElementById("sideNav").getElementsByTagName('A');
		for(var i = 0; i < listA.length; i++) {
			if(listA[i].getAttribute("id") == id) {
				listA[i].className = "selected";
				if(listA[i].parentNode.getAttribute("id") == "hideOrder") {
					listA[i].parentNode.parentNode.parentNode.className = "sidenav sidenav_c";
					listA[i].parentNode.nextSibling.click();
				} else {
					listA[i].parentNode.parentNode.className = "sidenav sidenav_c";
				}
				return;
			}
		};
	}
	var compatible4Css = function() {
		var cssStr = "<style>.sidenav{background-color:#f7f7f7;border-bottom:1px solid #ececec;font-family:microsoft yahei;color:#333}.sidenav a{position:relative;z-index:1;display:block;line-height:1;padding-left:4px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;color:#333;_zoom:1}.sidenav a:hover{color:#06c;text-decoration:none}.sidenav dt a{font-size:14px}.sidenav dt a span{display:block;padding:14px 10px 14px 14px}.sidenav .ico_arr{position:absolute;border:5px solid #fcfcfc;border-top-color:#afafaf;border-bottom:0 none;font-size:0;line-height:0;overflow:hidden;-webkit-transition:-webkit-transform .3s ease-in;transition:transform .3s ease-in}.sidenav dt .ico_arr{top:18px;right:10px}.sidenav dt a:hover .ico_arr{border-top-color:#06c}.sidenav dd{overflow:hidden;position:relative;padding-bottom:5px;display:none}.sidenav dd a{border-top:1px solid #f7f7f7;border-bottom:1px solid #f7f7f7}.sidenav dd a span{display:block;padding:8px 10px 8px 24px}.sidenav dd a.more_order{position:relative;display:inline-block;margin:5px 0 10px 20px;padding:5px 28px 5px 14px;background-color:#e5f0ff;border-radius:20px}.sidenav dd a.more_order:hover{background-color:#2577e3;color:#fff}.sidenav dd a.more_order .ico_arr{top:8px;right:12px;border-color:#E5F0FF;border-top-color:#afafaf}.sidenav dd a.more_order:hover .ico_arr{border-color:#2577e3;border-top-color:#fff}.sidenav dd a.up_order .ico_arr{border:5px solid #E5F0FF;border-bottom-color:#afafaf;border-top:0 none}.sidenav dd a.up_order:hover .ico_arr{border-color:#2577e3;border-bottom-color:#fff}.ico_new2{position:absolute;z-index:3;width:24px;height:11px;top:16px;margin-left:5px;background-position:-162px -9px}.sidenav dd .ico_new2{top:9px}.hide_order{display:none}.sidenav .selected{width:auto;border-left-color:#2577e3;border-right-color:#fff;background-color:#06c;color:#06c}.sidenav dd .selected{border-color:#ececec #fff #ececec #ececec}.sidenav .selected span{background-color:#fff}.sidenav_c dt .ico_arr{border:5px solid #fcfcfc;border-bottom-color:#afafaf;border-top:0 none;-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}.sidenav_c dt a:hover .ico_arr{border-bottom-color:#06c}.aside_fixed{position:fixed;top:-10px}.sidenav_c dd{display:block;}</style>";
		var cssdom = document.getElementById("sideNavCss");
		try {
			if(navigator.userAgent.indexOf("MSIE") > 0) {
				var version = navigator.appVersion.split(";");
				var trim_Version = version[1].replace(/[ ]/g, "");
				if(navigator.appName == "Microsoft Internet Explorer" && (trim_Version == "MSIE7.0" || trim_Version == "MSIE6.0" || trim_Version == "MSIE8.0")) {
					cssStr = "_<style>.sidenav{background-color:#f7f7f7;border-bottom:1px solid #ececec;font-family:microsoft yahei;color:#333}.sidenav a{position:relative;z-index:1;display:block;line-height:1;padding-left:4px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;color:#333;_zoom:1}.sidenav a:hover{color:#06c;text-decoration:none}.sidenav dt a{font-size:14px}.sidenav dt a span{display:block;padding:14px 10px 14px 14px}.sidenav .ico_arr{position:absolute;border:5px solid #fcfcfc;border-top-color:#afafaf;border-bottom:0 none;font-size:0;line-height:0;overflow:hidden;-webkit-transition:-webkit-transform .3s ease-in;transition:transform .3s ease-in}.sidenav dt .ico_arr{top:18px;right:10px}.sidenav dt a:hover .ico_arr{border-top-color:#06c}.sidenav dd{overflow:hidden;position:relative;padding-bottom:5px;display:none}.sidenav dd a{border-top:1px solid #f7f7f7;border-bottom:1px solid #f7f7f7}.sidenav dd a span{display:block;padding:8px 10px 8px 24px}.sidenav dd a.more_order{position:relative;display:inline-block;margin:5px 0 10px 20px;padding:5px 28px 5px 14px;background-color:#e5f0ff;border-radius:20px}.sidenav dd a.more_order:hover{background-color:#2577e3;color:#fff}.sidenav dd a.more_order .ico_arr{top:8px;right:12px;border-color:#E5F0FF;border-top-color:#afafaf}.sidenav dd a.more_order:hover .ico_arr{border-color:#2577e3;border-top-color:#fff}.sidenav dd a.up_order .ico_arr{border:5px solid #E5F0FF;border-bottom-color:#afafaf;border-top:0 none}.sidenav dd a.up_order:hover .ico_arr{border-color:#2577e3;border-bottom-color:#fff}.ico_new2{position:absolute;z-index:3;width:24px;height:11px;top:16px;margin-left:5px;background-position:-162px -9px}.sidenav dd .ico_new2{top:9px}.hide_order{display:none}.sidenav .selected{width:auto;border-left-color:#2577e3;border-right-color:#fff;background-color:#06c;color:#06c}.sidenav dd .selected{border-color:#ececec #fff #ececec #ececec}.sidenav .selected span{background-color:#fff}.sidenav_c dt .ico_arr{border:5px solid #fcfcfc;border-bottom-color:#afafaf;border-top:0 none;-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}.sidenav_c dt a:hover .ico_arr{border-bottom-color:#06c}.aside_fixed{position:fixed;top:-10px}.sidenav_c dd{display:block;}</style>";
					cssdom.innerHTML = cssStr;
					cssdom.removeChild(cssdom.firstChild);
					return;
				}
			}
		} catch(e) {}
		cssdom.innerHTML = cssStr;
	}
	var navInit = function() {

		var menu_fold = {
			getClass: function(id, className) {
				var tags = id.getElementsByTagName('DT');

				var classArry = [];
				var reg = new RegExp("(^|\\s)" + className + "(|\\s$)");
				for(var i = 0; i < tags.length; i++) {
					if(reg.test(tags[i].parentNode.className)) {

						classArry.push(tags[i]);

					}
				}
				return classArry;
			}
		};

		var menu_sideBox = document.getElementById("sideNav");
		var menu_sidenav = menu_fold.getClass(menu_sideBox, "sidenav");
		var menu_moreOrder = document.getElementById("moreOrder");
		var menu_hideOrder = document.getElementById("hideOrder");

		for(var i = 0; i < menu_sidenav.length; i++) {
			menu_sidenav[i].onclick = function(e) {
				var strClassName = this.parentNode.className;
				for(var j = 0; j < menu_sidenav.length; j++) {
					if(menu_sidenav[j].parentNode.className == "sidenav sidenav_c") {
						menu_sidenav[j].parentNode.className = "sidenav";
					}
				}

				if(strClassName == "sidenav sidenav_c") {
					this.parentNode.className = "sidenav";
				} else {
					this.parentNode.className = "sidenav sidenav_c";
				}
			}

			try {
				if(ClubInfoForMenuStr.IsSnateClub) {
					document.getElementById("pagemenu_cyjlb").style.display = "block";
				} else {
					document.getElementById("pagemenu_cyjlb").style.display = "none";
				}
			} catch(e) {
				//
			}

			try {
				if(ClubInfoForMenuStr.IsPkgClub) {
					document.getElementById("pagemenu_djcmlt").style.display = "block";
				} else {
					document.getElementById("pagemenu_djcmlt").style.display = "none";
				}
			} catch(e) {
				//
			}

			try {
				if(!ClubInfoForMenuStr.IsCorpMileage) {
					document.getElementById("pagemenu_myjifen").style.display = "block";
				} else {
					document.getElementById("pagemenu_myjifen").style.display = "none";
				}
			} catch(e) {
				//
			}
		}

		menu_moreOrder.onclick = function() {
			if(this.className == "more_order") {
				menu_hideOrder.style.display = "block";
				this.className = "more_order up_order";
				this.innerHTML = "收起订单<i class='ico_arr'></i>";
			} else {
				menu_hideOrder.style.display = "none";
				this.className = "more_order";
				this.innerHTML = "更多订单<i class='ico_arr'></i>";
			}
		}
	}

	appendToDom(contentObj[menuType]);
	compatible4Css();
	navInit();
	selectMenuItem(id);
})();