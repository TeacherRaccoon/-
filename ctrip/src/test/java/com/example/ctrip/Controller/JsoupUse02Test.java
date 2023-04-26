package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.TicketSpot;
import com.example.ctrip.util.JsoupUse02;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * @description: 景点数据爬取测试类
 * @author: 卢智伟
 * @date: 2019-08 23:08
 */

public class  JsoupUse02Test {

    @Test
    public void getSpots(){
        List list = new ArrayList();
        list.add("t1966382");
        List<TicketSpot> list1 = JsoupUse02.getSpot(list,2);
        for(TicketSpot ticketSpot:list1){
            System.out.println(ticketSpot.getSpecial());
        }
    }
    @Test
    public void getSpotsUrl(){



    }

}
