package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.TravelProGrade;
import com.example.ctrip.util.ApplicationContextUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Map;


/**
 * @Descript:
 * @Author: khb
 * @Date: created in 2019/8/19 9:01
 * @Version: 1.0
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TravelProGradeControllerTest {

    @Test
    public void getTravelProGrade() {
        TravelProGradeController travelProGradeController= (TravelProGradeController) ApplicationContextUtil.getBean("travelProGradeController");
        System.out.println("=========================");
            Map map=travelProGradeController.getTravelProGrade(1);
        System.out.println(map.toString());
    }

    @Test
    public void addTravelProGrade() {
        TravelProGradeController travelProGradeController= (TravelProGradeController) ApplicationContextUtil.getBean("travelProGradeController");
        System.out.println("=========================");
        TravelProGrade travelProGrade=new TravelProGrade();
        travelProGrade.setCount(250);
        travelProGrade.setFavorableRate((float) 0.11);
        travelProGrade.setProductAvgGrade((float) 4.5);
        Map map=travelProGradeController.addTravelProGrade(travelProGrade);
        System.out.println(map.toString());
    }
}
