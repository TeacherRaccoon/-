package com.example.ctrip.Controller;

import com.example.ctrip.util.ApplicationContextUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @Descript:
 * @Author: khb
 * @Date: created in 2019/8/14 16:16
 * @Version: 1.0
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TravelProviderControllerTest {

    @Test
    public void getProviderById() {
        TravelProviderController travelProviderController= (TravelProviderController) ApplicationContextUtil.getBean("travelProviderController");
        //通过自己创建的ApplicationContextUtil的getBean方法得到TravelProviderController，调用getProviderById
        //TravelProvider对象的toString打印信息
        System.out.println(travelProviderController.getProviderById(1).toString());
    }
}
