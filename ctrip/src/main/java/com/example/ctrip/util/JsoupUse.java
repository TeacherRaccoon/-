package com.example.ctrip.util;

import com.example.ctrip.Pojo.HotelComment;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.sql.*;
import java.util.*;

/**
 * @描述 使用JSoup进行页面数据扒取,并将插入到数据库
 */
public class JsoupUse {


    public static void main(String[] args) {
        org.jsoup.Connection connection;
        List<String> cityId = new ArrayList<>();
        int count = 0;
        for (int j=0;j<JsoupTarget.cityName.length;j++) {
            String url = "https://hotels.ctrip.com/hotel/"+JsoupTarget.cityName[j];
            connection = Jsoup.connect(url);
            connection.ignoreContentType(true).userAgent("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.15)");
            try {
                Document document = connection.get();
                Elements elements = document.getElementsByClass("hotelitem_judge_box");
//            String id = elements.get(0).attr("data-id");
//            System.out.println(id);
                for (int i = 0; i < elements.size(); i++) {
                    cityId.add(elements.get(i).attr("data-id"));
                    System.out.println(cityId.get(i));
                    System.out.println(count++);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

            String JdbcUrl = "jdbc:mysql://106.52.92.57:3306/ctrip";
            Connection jdbc;
            PreparedStatement stm = null;
            String sql =
                    "insert into hotel_comment (hotel_id,user_id,content,score,creationDate,OccupancyType)" +
                            "values (?,?,?,?,?,?)";
            //元素获取
            HotelComment c = new HotelComment();
            Random random = new Random();
            //循坏插入数据
            for (int j=0;j<cityId.size();j++) {
                try{
                    Class.forName("com.mysql.jdbc.Driver");
                    jdbc = DriverManager.getConnection(JdbcUrl,"root","root");
                    String url = "https://m.ctrip.com/webapp/hotel/hoteldetail/dianping/"+cityId.get(j)+".html";
                    org.jsoup.Connection connention = Jsoup.connect(url);
                    connention.ignoreContentType(true).userAgent("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.15)");
                    connention.timeout(5000000);
                if (cityId.get(j)==null){
                    System.out.println(j);
                    System.out.println(cityId.get(j));
                    continue;
                }
                //请求头设置
                Document document = connention.get();
                //评论
                Elements comments = document.getElementsByClass("tree-ellips-line6 comment-swarp");
                Element comment;
                //评分
                Elements scoreAll = document.select(".g-ve strong");
                Element score;
                //评论日期
                Elements createDate = document.select(".checkin-line");
                String date;
                String dateResult;
                for (int i = 0; i < comments.size(); i++) {
                    comment = comments.get(i);
                    score = scoreAll.get(i);
                    date = createDate.get(i).text();
                    dateResult = date.substring(date.indexOf("，")+1,date.indexOf("发"));
//                    System.out.println(comment.text()+" \n"+score.text()+"\n "+"\n "+dateResult);
                    //将爬取到的数据封装在pojo
                    c.setContent(comment.text());
                    c.setScore(Float.parseFloat(score.text()));
                    c.setInserDate(dateResult);
                    c.setUser_id(random.nextInt(34));
                    c.setHotel_id(random.nextInt(107));
                    c.setOccupancyType(random.nextInt(2));
                    System.out.println(c.getContent()+"\n"+c.getInserDate()+"\n"+c.getHotel_id()+"\n"+c.getOccupancyType()+"\n"+c.getScore()+"\n"+c.getUser_id());
                    //(hotel_id,user_id,content,score,creationDate,OccupancyType)
                    stm = jdbc.prepareStatement(sql);
                    stm.setInt(1,c.getHotel_id()+1);
                    stm.setInt(2,c.getUser_id()+1);
                    stm.setString(3,c.getContent());
                    stm.setFloat(4,c.getScore());
                    stm.setString(5, c.getInserDate());
                    stm.setInt(6,c.getOccupancyType());
                    if (stm.executeUpdate()>0){
                        System.out.println("插入成功!");
                    }
                }
                if (stm != null)
                     stm.close();
                    jdbc.close();
            }catch (Exception e){
                    e.printStackTrace();
                }
        }
    }
    /***
     * String转map
     * @param str
     * @return map
     */
    public static Map<String,Object> getStringToMap(String str){
        //根据逗号截取字符串数组
        String[] str1 = str.split(",");
        //创建Map对象
        Map<String,Object> map = new HashMap<>();
        //循环加入map集合
        for (int i = 0; i < str1.length; i++) {
            //根据":"截取字符串数组
            String[] str2 = str1[i].split(":");
            //str2[0]为KEY,str2[1]为值
            map.put(str2[0],str2[1]);
        }
        return map;
    }

}
