package com.example.ctrip;

import com.example.ctrip.Dao.HotelMapper;
import com.example.ctrip.Pojo.Hotel;
import com.example.ctrip.Pojo.User;
import com.example.ctrip.Service.DataHotelService;
import com.example.ctrip.util.GetName_phone;
import com.example.ctrip.Dao.UserMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CtripApplicationTests {
    @Autowired
    UserMapper userMapper;
    @Autowired
    HotelMapper hotelMapper;

    @Test
    public void contextLoads() {
        System.out.println(userMapper.Test());
    }

    @Test
    public void test(){
        Date date = new Date();
        System.out.println(date);

    }

    @Test
    public void getName(){
        System.out.println(GetName_phone.getName());
        System.out.println(GetName_phone.getTel());
    }
    /**
     * 测试Lambda表达式
     */

    public interface LambdaTest{
        void abc();

    }
    @Test
    public void Lambda(){
        LambdaTest test = ()-> System.out.println("hexialin");
        test.abc();
    }


    /**
     * 添加图爿信息
     */
    @Test
    void insertImg(){

    }

}
