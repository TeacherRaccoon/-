package com.example.ctrip.util;

import com.example.ctrip.Pojo.TicketSpot;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @description: 爬取门票数据
 */

public class JsoupUse02 {
    public static TicketSpot ticketSpot;

    //获取景点的 集合
    public static List<TicketSpot> getSpot(List list, int cityId) {
        List ticketSpots = new ArrayList();
        for (int j = 0; j < list.size(); j++) {
            ticketSpot = new TicketSpot();
            try {
                Document doc = Jsoup.connect("https://piao.ctrip.com/dest/" + list.get(j) + ".html").data("query", "java").userAgent("Mozilla").post();

                //景点基本信息
                Elements espot = doc.select("div[class='brief-right']");
                String spotName = espot.select("h2").html();//景点名称
                String level = espot.select("strong").html();//等级
                String address = espot.select("li:eq(0) span").html();//地址
                String openTime = espot.select("li:eq(1) span").html();//开放时间

                //景点首张图片
                Elements reduceImg = doc.select("[class='small_photo_wrap'] img");

                StringBuffer stb = new StringBuffer();
                stb.append(reduceImg.attr("src") + "=");

                //景点简介+图片链接
                Elements spotInfo = doc.select("[class='detail-left']");
                Elements imgUrls = spotInfo.select("img");


                for (int i = 0; i < imgUrls.size(); i++) {
                    stb.append(imgUrls.get(i).attr("src") + "=");
                }

                String[] s = stb.toString().split("=");

                for (String s1 : s) {
                }

                //价格
                Elements prices = doc.select("[class='ctrip-price']");
                Double price = 0.0;
              try{
               price= Double.parseDouble(prices.select("strong").get(0).html());
              }catch (Exception e){

              }

                //预订须知
                Elements bookingInfos = doc.select("dl[class='notice-content']");
                String notice = bookingInfos.html();

                //景点简介
                Elements reduce = doc.select("[class='introduce-content']");
                String reduces = reduce.html();
                //特色
                String feature = doc.select("[class='introduce-feature'] li span:eq(1)").html();

                //交通指南
                String trainSpot = doc.select("[class='traffic-content']").html();


                ticketSpot.setSpotName(spotName);//名称
                ticketSpot.setAddress(address);//dizhi
                ticketSpot.setLevel(level);//等级
                ticketSpot.setOpenTime(openTime);//开放时间
                ticketSpot.setPrice(price);//价格
                ticketSpot.setNotice(notice);//预订须知
                ticketSpot.setReduce(reduces);//景点简介
                ticketSpot.setImgUrl(stb.toString());//图片路径
                ticketSpot.setCityId(cityId);//城市id
                ticketSpot.setSpecial(feature);//特色
                ticketSpot.setTrainAdvice(trainSpot);//交通指南

                ticketSpots.add(ticketSpot);

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ticketSpots;
    }

    //获取景点 url 执行以下代码 -- 会的到https://piao.ctrip.com/ticket/dest/t1966382.html 中的 t1966382 参数
    public static void main(String[] args) {
        //在 https://piao.ctrip.com/dest/u-_b1_b1_be_a9/s-tickets/#ctm_ref=vat_hp_sb_lst 执行以下代码；
     /*   //获取景点详情的URL******************开始
        var i = 0;
        var data = new Array();
        var getURL = setInterval(function() {
            $("[class='view-spot clearfix']:eq(" + i + ")").trigger("click")
            if (i >= 5) {
                clearInterval(getURL);
                console.log(data);
                $.ajax({
                        url:"http://localhost:8080/ticket/getUrl", data:{
                    data:
                    data
                },type:
                "POST", dataType:"JSON",
                        before:function() {//发送ajax前执行的函数
                },
                success:
                function(data) {
                    console.log(data.msg);
                },//发送成功后的回调函数
                error:
                function(jqxhr) {//请求错误时执行的函数
                },
                complete:
                function() {//请求完成后执行的函数
                }
    })
            }
            var str = document.URL;//获取页面的URL
            var params = str.split("/");
            console.log(params[params.length - 1].split(".")[0]);
            var param = params[params.length - 1].split(".")[0];
            i++;
            data[i] = param;
            var hiback = setInterval(function() {
                history.back();
            },5000)
            clearInterval(hiback);
        },1000)
*/
//获取景点详情的URL**********************结束

    }


}
