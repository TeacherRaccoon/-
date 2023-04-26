//alert(jQuery(".sqr").width());

var sqr5 = '';
if (sqr != '' || sqr != 'undefined') {
    sqr5 = "<div id='rlist5' class='r2wm'><table width='160' border='0' cellspacing='0' cellpadding='0'><tr><td valign='top' width='36' height='130'><div id='w2wm'><span class='pointl'></span><p>携程旅行</p></div></td><td valign='top' width='124'><div class='ewm'><a href='http://app.ctrip.com/' target='_blank' style='margin-bottom:8px'><img src='//pages.c-ctrip.com/commerce/promote/standard/img/" + sqr + ".gif' /></a></div></td></tr></table></div>"
}


jQuery(".sqr").append("<div id='rlist1' class='cf'><span style='cursor:default'>分享</span><a href='javascript:void(0)' class='a0' title='分享到新浪微博'></a><a href='javascript:void(0)' class='a1' title='分享到qq微博'></a><a href='javascript:void(0)' class='a2' title='分享到人人网'></a></div>" + sqr5 + "<div id='rlist7'></div>");
/*<a href='#' style='margin-bottom:6px; background:#ffffff; display:block' target='_blank'><img src='###' /></a>*/

//<div id='rlist7'><p class='palist'><a href='http://pages.c-ctrip.com/commerce/promote/201503/other/cjdc/index.html' class='azlnk mb6' target='_blank'></a><a href='http://events.ctrip.com/vacations/ziyouxingjiehoucuxiao.html' class='alnk mb10' target='_blank'></a><a href='http://pages.c-ctrip.com/commerce/promote/201503/vacation/travelseason/web/online.html' class='alnk mb10' target='_blank'></a><a href='http://pages.c-ctrip.com/commerce/promote/201503/hotel/chunji/pc/index.html' class='alnk mb10' target='_blank'></a><a href='http://events.ctrip.com/intlflight/chunjidacuguojifenhuichang.html' class='alnk mb20' target='_blank'></a><a href='http://pages.c-ctrip.com/commerce/promote/car/online/201503/yc/index.html' class='alnk mb10' target='_blank'></a><a href='http://pages.c-ctrip.com/commerce/promote/201503/other/zj/index.html' class='alnk' target='_blank'></a><a href='http://pages.c-ctrip.com/commerce/promote/201503/vacation/travelseason-outing/web/index.html' class='alnk mb10' target='_blank'></a><a href='http://pages.c-ctrip.com/tg/2015/02/nrj/tab1.html' class='alnk' target='_blank'></a><a class='alnk mb30' href='javascript:void(0)'></a></p></div>


var ua = navigator.userAgent.toLowerCase() || '', isIOS = /(ios|iphone|ipad|ipod)/.test(ua),
    isInapp = /(ctripwireless)/.test(ua);
if (isIOS && isInapp) {
    var iosex = "<div id='ios'>该活动苹果不是赞助商，并且苹果也不会以任何形式参与其中！</div>"
    jQuery(".pagesFoot").before(iosex);
}

var swch = 1;
/*jQuery('#rlist7 .sh').click(function(){
    if(swch==1){jQuery('#rlist7 .palist').hide(); jQuery('#rlist7').width(14); jQuery('#rlist7 .sh').css('left','0'); swch=0; jQuery(this).text('>')}else{
    jQuery('#rlist7 .palist').show(); jQuery('#rlist7').width(167); jQuery('#rlist7 .sh').css('left','165px'); swch=1; jQuery(this).text('<')}
})*/
//jQuery('#rlist7 .mb30').click(function(){scrollTo(0,1)});
jQuery("#w2wm").toggle(
    function () {
        jQuery("#rlist5").removeClass("r2wm");
        jQuery(this).children("span").removeClass("pointl").addClass("pointr");
    },
    function () {
        jQuery("#rlist5").addClass("r2wm");
        jQuery(this).children("span").removeClass("pointr").addClass("pointl");
    }
);


/*
jQuery('#rlist7 .palist a').click(function(){
    //jQuery('#rlist7 .palist').hide();
    jQuery('#rlist7 .palist').stop().animate({'left':-100,'opacity':0},80);
    jQuery('#rlist7 .pas').show().stop().animate({'left':0,'opacity':100},80);
})
jQuery('#rlist7 .pas').click(function(){
    jQuery(this).stop().animate({'left':-100,'opacity':0},80);
    jQuery('#rlist7 .palist').show().stop().animate({'left':0,'opacity':100},80);
})*/


var sharelink = location.href;
//console.log(typeof sharetitle);
if (typeof sharetitle == 'undefined') {
    sharetitle = document.title + ' @携程旅行网';
    jQuery("#rlist1 a").eq(0).click(function () {
        window.open("http://v.t.sina.com.cn/share/share.php?title=" + sharetitle + "&url=" + sharelink)
    });
    jQuery("#rlist1 a").eq(1).click(function () {
        window.open("http://v.t.qq.com/share/share.php?url=" + sharelink + "&title=" + sharetitle + "&site=www.ctrip.com")
    });
    jQuery("#rlist1 a").eq(2).click(function () {
        window.open("http://share.renren.com/share/buttonshare?link=" + sharelink + "&title=" + sharetitle)
    });
} else {
    jQuery("#rlist1 a").eq(0).click(function () {
        window.open("http://v.t.sina.com.cn/share/share.php?title=" + sharetitle + "&url=" + sharelink)
    });
    jQuery("#rlist1 a").eq(1).click(function () {
        window.open("http://v.t.qq.com/share/share.php?url=" + sharelink + "&title=" + sharetitle + "&site=www.ctrip.com")
    });
    jQuery("#rlist1 a").eq(2).click(function () {
        window.open("http://share.renren.com/share/buttonshare?link=" + sharelink + "&title=" + sharetitle)
    });
}
	