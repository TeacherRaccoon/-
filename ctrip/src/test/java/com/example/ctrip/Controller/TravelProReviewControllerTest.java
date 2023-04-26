package com.example.ctrip.Controller;

import com.example.ctrip.util.ApplicationContextUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

/**
 * @Descript:
 * @Author: khb
 * @Date: created in 2019/8/17 15:07
 * @Version: 1.0
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TravelProReviewControllerTest {
    @Test
    public void getCountByProductId() {
        TravelProReviewController travelProReviewController= (TravelProReviewController) ApplicationContextUtil.getBean("travelProReviewController");
        System.out.println("=======================================================");
        System.out.println(travelProReviewController.getCountByProductId(1));
        //System.out.println(travelProReviewController.getClass().getName());
        //System.out.println(travelProReviewController.getCountByProductId(1));
    }

    @Test
    public void getTravelProReviewById() {
        TravelProReviewController travelProReviewController= (TravelProReviewController) ApplicationContextUtil.getBean("travelProReviewController");
        System.out.println("=======================================================");
        System.out.println(travelProReviewController.getCountByUserId(1));
    }
    @Test
    public void getTravelProReviewListByPage() {
        TravelProReviewController travelProReviewController= (TravelProReviewController) ApplicationContextUtil.getBean("travelProReviewController");
        Map map=new HashMap<>();
        map.put("tripProductId",1);
        map.put("start",0);
        map.put("length",5);
        System.out.println("=======================================================");
        System.out.println(travelProReviewController.getTravelProReviewListByPage(map).toString());
    }
    @Test
    public void getTravelProReviewListByUerId() {
        TravelProReviewController travelProReviewController= (TravelProReviewController) ApplicationContextUtil.getBean("travelProReviewController");
        Map map=new HashMap<>();
        map.put("userId",1);
        map.put("start",0);
        map.put("length",5);
        System.out.println("=======================================================");
        System.out.println(travelProReviewController.getTravelProReviewListByPage(map).toString());
    }
}
