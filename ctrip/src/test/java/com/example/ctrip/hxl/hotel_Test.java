package com.example.ctrip.hxl;


import com.example.ctrip.Controller.test;
import com.example.ctrip.Service.HotelService;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class hotel_Test {
    @Autowired
    HotelService hotelService;
    @Autowired
    test test;
    @Test
    public void inserDisCount(){
        for (int i = 1;i<=107;i++){
            int f = (int) ((Math.random())*6+5);
            hotelService.inserDiscount(f,i);
        }
    }

    @Test
    public void abc(){
        System.out.println(test.getAbc());
    }

}
