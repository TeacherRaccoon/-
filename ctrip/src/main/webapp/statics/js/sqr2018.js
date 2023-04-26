//jQuery("<link>").attr({ rel: "stylesheet",type: "text/css",href: "//10.32.41.129:8860/promote/standard/monograph/sqr2018.css"}).appendTo("head");
var sqr5 = '';
if (sqr != '' || sqr != 'undefined') {
    sqr5 = "<div id='rlist5'><table width='160' border='0' cellspacing='0' cellpadding='0'><tr><td valign='top' width='36' height='130'><div id='w2wm'><span class='pointr'></span><p>携程旅行</p></div></td><td valign='top' width='124'><div class='ewm'><a href='http://app.ctrip.com/' target='_blank' style='margin-bottom:8px'><img src='//pages.c-ctrip.com/commerce/promote/standard/img/" + sqr + ".gif' /></a></div></td></tr></table></div>"
}
jQuery(".sqr").append("<div id='rlist1' class='cf'><span style='cursor:default'>分享</span><a href='javascript:void(0)' class='a0' title='分享到新浪微博'></a></div>" + sqr5);

jQuery("#w2wm").toggle(
    function () {
        jQuery("#rlist5").addClass("r2wm");
        jQuery(this).children("span").removeClass("pointr").addClass("pointl");
    },
    function () {
        jQuery("#rlist5").removeClass("r2wm");
        jQuery(this).children("span").removeClass("pointl").addClass("pointr");
    }
);
var sharelink = location.href;

//console.log(typeof sharetitle);
if (typeof sharetitle == 'undefined') {
    sharetitle = document.title + ' @携程旅行网';
    jQuery("#rlist1 a").eq(0).click(function () {
        window.open("http://v.t.sina.com.cn/share/share.php?title=" + sharetitle + "&url=" + sharelink)
    });
} else {
    jQuery("#rlist1 a").eq(0).click(function () {
        window.open("http://v.t.sina.com.cn/share/share.php?title=" + sharetitle + "&url=" + sharelink)
    });
}
	