package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.TravelOrder;
import com.example.ctrip.Pojo.UserContact;
import com.example.ctrip.Pojo.UserPassenger;
import com.example.ctrip.util.ApplicationContextUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @Descript:
 * @Author: khb
 * @Date: created in 2019/9/10 11:19
 * @Version: 1.0
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TravelOrderControllerTest {

    @Test
    public void addTravelOrder() {
        TravelOrderController travelOrderController= (TravelOrderController) ApplicationContextUtil.getBean("travelOrderController");
        System.out.println("=========================");
        Map params=new HashMap();
    }

    @Test
    public void getTravelOrder() {
        TravelOrderController travelOrderController= (TravelOrderController) ApplicationContextUtil.getBean("travelOrderController");
        System.out.println("=========================");
        Map map= travelOrderController.getTravelOrder(1);
        TravelOrder travelOrder= (TravelOrder) map.get("data");
        System.out.println(travelOrder.getUserPassengerList().toString());
    }

    @Test
    public void updateTravelOrder() {
    }

    @Test
    public void delTravelOrder() {
    }

    @Test
    public void insertUserContact() {
        TravelOrderController travelOrderController= (TravelOrderController) ApplicationContextUtil.getBean("travelOrderController");
        UserContact userContact= (UserContact) ApplicationContextUtil.getBean("userContact");
        userContact.setName("康师傅");
        userContact.setPhone("13337222234");
        userContact.setEmail("113546@qq.com");
        userContact.setUserId(1);
        TravelOrder travelOrder= (TravelOrder) ApplicationContextUtil.getBean("travelOrder");
        travelOrder.setOrderCode("123165103465132");
        travelOrder.setTotalPrice(4000);
        travelOrder.setTravelProId(1);
        travelOrder.setTravelProTheme("跟团游");
        travelOrder.setTravelProTitle("xxxxxxxx");
        travelOrder.setOrderStatus(1);
        travelOrder.setTradeNo("6516165161");
        travelOrder.setPayType(1);
        travelOrder.setOrginName(null);
        travelOrder.setStartDate("2019-09-11");
        travelOrder.setEndDate("2019-09-13");
        travelOrder.setAdultNum(2);
        travelOrder.setChildNum(0);
        travelOrder.setMoreRequirements("没有");
        travelOrder.setOrderStatus(1);
        travelOrder.setOrderType(1);
        travelOrder.setUserId(1);
        travelOrder.setUserContact(userContact);
        Map result=travelOrderController.addTravelOrder(travelOrder);
        UserPassenger userPassenger=new UserPassenger();
        userPassenger.setName("康师傅");
        userPassenger.setGender(1);
        userContact.setUserId(1);
        userPassenger.setCertificateType(1);
        userPassenger.setCertificateNumber("151316513101321654131316");
        userPassenger.setBirthday(new Date());
        userPassenger.setPhone("151451316516");
        userPassenger.setUserId(1);
        Map result1=travelOrderController.addUserPassenger(userPassenger);
        System.out.println(result.toString());
    }
}