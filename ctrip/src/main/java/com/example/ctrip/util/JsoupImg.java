package com.example.ctrip.util;


import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebWindowEvent;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.sql.*;

public class JsoupImg {

    public static void main(String[] args) {
        //Jsoup+HtmlUnit
        //无界面浏览器
        WebClient webClient =new WebClient();
        //禁止css支持
        webClient.getOptions().setCssEnabled(false);
        //禁止JS抛出异常
        webClient.getOptions().setThrowExceptionOnScriptError(false);
        //禁止JS抛出异常到控制台
        webClient.getOptions().setThrowExceptionOnFailingStatusCode(false);

        String JdbcUrl = "jdbc:mysql://106.52.92.57:3306/ctrip";
        String url;
        HtmlPage page;
        Document document;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection(JdbcUrl,"root","root");
            String Selectsql = "select hotelCode from hotel";
            //图片路径,图片类型:1.酒店 2.用户 3.房间,上传时间,创建时间,修改时间,酒店Id
            String insertSql = "insert into hotel_img(imgUrl,imgType,uploadTime,creationDate,modifyDate,hotelCode)values(?,?,now(),now(),now(),?)";
            PreparedStatement stm = connection.prepareStatement(Selectsql);
            ResultSet resultSet = stm.executeQuery();
            int id;
            while(resultSet.next()){
                System.out.println(resultSet.getString(1));
                url="https://m.ctrip.com/webapp/hotel/hoteldetail/"+resultSet.getString(1)+".html";
                page = webClient.getPage(url);
                document = Jsoup.parse(page.asXml(),url);
                Elements elements = document.select("img[pagecode='H5HotelDetail']");
                id = Integer.parseInt(resultSet.getString(1));
                for (int i=0;i<elements.size();i++){
                    stm = connection.prepareStatement(insertSql);
                    //图片路径
                    stm.setString(1,elements.get(i).attr("data-state"));
                    //图片类型
                    stm.setInt(2,1);
                    //酒店Id
                    stm.setInt(3,id);
//                    stm.executeUpdate();
                    System.out.println("hotelCode:"+id);
                    System.out.println("imgUrl:"+elements.get(i).attr("data-state"));
                    System.out.println("插入成功");
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
