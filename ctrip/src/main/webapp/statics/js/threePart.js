/*! 2019-07-09_14:13:28 sem.am@ctrip.com */
!function(){var e=/(?!.*secure.ctrip.com)^.*$/gi;e.test(document.location.href)&&(!function(){if("http:"==document.location.protocol||"https:"==document.location.protocol){var e=document.createElement("script");e.type="text/javascript",e.async=!0;var t=/trains.ctrip.com/gi;t.test(document.location.href)?e.src="//webresource.c-ctrip.com/ResUnionOnline/R1/remarketing/js/mba_ctrip_trains.js":e.src="//webresource.c-ctrip.com/ResUnionOnline/R1/remarketing/js/mba_ctrip.js";var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(e,i)}}(),_zpq=window._zpq||[],_zpq.push(["_setAccount",9]),_zpq.push(["_setUserID",""]),function(){if("http:"==document.location.protocol||"https:"==document.location.protocol){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="//webresource.c-ctrip.com/ResUnionOnline/R1/remarketing/js/s.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}}(),function(e){function t(t){if(!document.getElementById("conversion_google")){var i=e.createElement("script");i.type="text/javascript",i.id="conversion_google",i.src="//www.googleadservices.com/pagead/conversion_async.js",i.onload=function(){var e=document.createElement("script");e.type="text/javascript",e.innerHTML="if(window.google_trackConversion){window.google_trackConversion({google_conversion_id: 1066331136, google_custom_params: "+JSON.stringify(t)+",google_remarketing_only: true})};",document.getElementsByTagName("head")[0].appendChild(e)},document.getElementsByTagName("head")[0].appendChild(i)}}function i(e){var t=location.href.match(new RegExp("[?&]"+e+"=([^&#]+)","i"));return null==t||t.length<1?"":t[1]}window.bd_cpro_rtid="PWTzPjD";var o=e.createElement("script");o.type="text/javascript",o.async=!0,o.src=location.protocol+"//cpro.baidu.com/cpro/ui/rt.js";var n=e.getElementsByTagName("script")[0];n.parentNode.insertBefore(o,n);try{var c=document.createElement("noscript"),r=document.createElement("div");r.style.display="inline";var a=document.createElement("img");a.style.border="none",a.width="1",a.height="1",a.src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/1066331136/?value=0&label=cG9hCIyRngMQgNi7_AM&guid=ON&script=0",r.appendChild(a),c.appendChild(r),document.getElementsByTagName("head")[0].appendChild(c)}catch(s){console.log("noscript:",s)}var p=window.location.href,l=/\/([^\/]+)\.html/;if(p.indexOf("flights.ctrip.com")>-1){var m,d,g="";if(p.indexOf("international")>-1)p.indexOf("FlightResult.aspx")>-1&&i("DCity")&&i("ACity")?(m=i("DCity").toUpperCase(),d=i("ACity").toUpperCase()):(g=((p.split("?")?p.split("?")[0]:"")?p.split("?")[0].split("/"):"")?p.split("?")[0].split("/")[p.split("?")[0].split("/").length-1]:"no match",g.split("-").length>1&&(m=g.split("-")[g.split("-").length-2].toUpperCase(),d=g.split("-")[g.split("-").length-1].toUpperCase()));else{var u=/(\.html|\/\?)/,h=p.match(u);h=h?h[1]:"涓嶅瓨鍦�",p.indexOf("/?")>-1?g=((p.split("/?")?p.split("/?")[0]:"")?p.split("/?")[0].split("/"):"")?p.split("/?")[0].split("/")[p.split("/?")[0].split("/").length-1]:"no match":p.indexOf("?")>-1&&(g=((p.split("?")?p.split("?")[0]:"")?p.split("?")[0].split("/"):"")?p.split("?")[0].split("/")[p.split("?")[0].split("/").length-1]:"no match"),g.split("-").length>1&&(m=g.split("-")[0].toUpperCase(),d=g.split("-")[1].toUpperCase())}var f={flight_originid:m,flight_destid:d,flight_pagetype:"searchresults"};t(f)}else if(p.indexOf("www.ctrip.com")>-1){var f={dynx_pagetype:"home"};t(f)}else if(p.indexOf("hotels.ctrip.com")>-1){var v=p.match(l),y=document.querySelector(".staring_price .price")?document.querySelector(".staring_price .price").innerHTML:"0",f={hrental_id:null!==v?v[1]:"no match",hrental_totalvalue:y,hrental_pagetype:"offerdetail"};t(f)}else if(p.indexOf("vacations.ctrip.com")>-1||p.indexOf("taocan.ctrip.com")>-1||p.indexOf("cruise.ctrip.com")>-1||p.indexOf("piao.ctrip.com")>-1){var _=p.match(l),w=_?_[1]:"no match";w=w.match(/^t([\d]+)/)?w.match(/^t([\d]+)/)[1]:w;var f={travel_destid:w,travel_pagetype:"offerdetail"};t(f)}}(document))}(),function(){for(var e,t=["order","success","c/booking/","bookingnesx","inputPassengers","payReturn","Book/Review","Book/Book","Book/Commit","NewUI/Complete","FltRebookTicke","FltRefundTicketNew","zijia/i/booking","daijia/o/booking","daijia/o/booking","CarBooking","traininput","otinput","accounts.ctrip.com","my.ctrip.com","secure.ctrip.com","smarket.ctrip.com","sinfo.ctrip.com"],i=window.location.href,o=!1,n=0;e=t[n++];){if(i.indexOf(e)>-1){o=!1;break}o=!0}}();