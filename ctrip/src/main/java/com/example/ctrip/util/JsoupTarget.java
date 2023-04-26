package com.example.ctrip.util;


import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;


/**
 * 爬虫目标类
 */
public class JsoupTarget {

    //1个参数250条
    public static String[] cityName ={//26
            "beijing1","shenzhen30","shanghai2","chongqing4","nanjing12","guangzhou32",
            "chengdu28","nanjing12","wuhan477","hongkong58","tianjin3",
            "xiamen25","jinan144", "suzhou14","shenyang451",
            "dalian6","qingdao7","ningbo375","zhengzhou559","xian10", "hefei278",
            "xianyang111","quanzhou406","dongguan223","heyuan693","wenzhou491"
    };


//    public static String[] getCityId() {
//        Connection connection;
//        String[] cityId = new String[650];
//        int count = 0;
//        for (int j=0;j<cityName.length;j++) {
//            String url = "https://hotels.ctrip.com/hotel/"+cityName[j];
//            connection = Jsoup.connect(url);
//            connection.ignoreContentType(true).userAgent("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.15)");
//            try {
//                Document document = connection.get();
//                Elements elements = document.getElementsByClass("hotelitem_judge_box");
////            String id = elements.get(0).attr("data-id");
////            System.out.println(id);
//                for (int i = 0; i < elements.size(); i++) {
//                    cityId[i] = elements.get(i).attr("data-id");
//                    System.out.println(elements.get(i).attr("data-id"));
//                    System.out.println(count++);
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//        return cityId;
//    }
}
