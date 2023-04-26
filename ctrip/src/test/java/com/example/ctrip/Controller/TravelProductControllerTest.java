package com.example.ctrip.Controller;


import com.example.ctrip.util.ApplicationContextUtil;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;


/**
 * @Descript:
 * @Author: khb
 * @Date: created in 2019/8/21 16:49
 * @Version: 1.0
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TravelProductControllerTest {

   /* @Test
    public void getCity() {
        TravelProductController travelProductController= (TravelProductController) ApplicationContextUtil.getBean("travelProductController");
        System.out.println("=========================");
        Map map=travelProductController.getCity();
        System.out.println(map.toString());
    }*/

    @Test
    public void getProductListByDaysTrip(){
        TravelProductController travelProductController= (TravelProductController) ApplicationContextUtil.getBean("travelProductController");
        System.out.println("=========================");
        Map map= travelProductController.getProductListByDaysTrip("5日");
        System.out.println(map.toString());
    }
    @Test
    public void getTravelProdictToShouYe(){
        TravelProductController travelProductController= (TravelProductController) ApplicationContextUtil.getBean("travelProductController");
        System.out.println("=========================");
        Map map= travelProductController.getTravelProductToShouYe("北京","深圳",9);
        System.out.println(map.toString());
    }
    @Test
    public void getTravelProductByLevel(){
        TravelProductController travelProductController= (TravelProductController) ApplicationContextUtil.getBean("travelProductController");
        System.out.println("=========================");
        Map map= travelProductController.getProductListByLevel("5钻");
        System.out.println(map.toString());
    }
    @Test
    public void getProductListByCity(){
        TravelProductController travelProductController= (TravelProductController) ApplicationContextUtil.getBean("travelProductController");
        System.out.println("=========================");
        Map map= travelProductController.getProductListByCity(5,null,null,9);
        System.out.println(map.toString());
    }

    @Test
    public void getProductById(){
        TravelProductController travelProductController= (TravelProductController) ApplicationContextUtil.getBean("travelProductController");
        System.out.println("=========================");
        Map map= travelProductController.getProductById("深圳",20);
        System.out.println(map.get("data").toString());
    }
    @Test
    public void getProductInventoryByMap() throws ParseException {
        Map map=new HashMap();
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        map.put("startTime",format.parse("2019-09-06"));
        map.put("endTime",format.parse("2019-09-11"));
        map.put("productId",1);
        TravelProductController travelProductController= (TravelProductController) ApplicationContextUtil.getBean("travelProductController");
        System.out.println("=========================");
        Map result= travelProductController.getProductInventoryByMap("2019-09-06","2019-09-11",1);
        System.out.println(result.get("data"));
    }

}
