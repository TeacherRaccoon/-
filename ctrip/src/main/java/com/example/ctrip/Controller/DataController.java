package com.example.ctrip.Controller;

import com.alibaba.fastjson.JSONObject;
import com.example.ctrip.Pojo.Hotel;

import com.example.ctrip.Service.DataHotelService;
import com.example.ctrip.util.GetName_phone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/addData")
public class DataController {
    @Autowired
    DataHotelService dhs;
    Map map = new HashMap();

    @RequestMapping("/hotel")
    public Map getHotel(String params) {

        //下面是把拿到的json字符串转成 json对象
        JSONObject ho = JSONObject.parseObject(params); //将字符串{“id”：1}
        Hotel hotel = new Hotel();
        hotel.setHotelCode(ho.get("hotelid").toString());   //酒店编码
        hotel.setHotelName(ho.get("hotelname").toString());//酒店名称
        hotel.setHotelDetails(ho.get("medalhoverdesc").toString());//酒店详情
        int level = (int) Math.floor(Double.parseDouble(ho.get("hotelscore").toString()));
        hotel.setLevel(level);//酒店星级
        hotel.setAddress(ho.get("zone").toString());//酒店地址
        hotel.setModifyDate(new Date());//修改日期
        hotel.setContact(GetName_phone.getName());
        hotel.setPhone(GetName_phone.getTel());
        hotel.setFox("750-8484464");
        hotel.setCityId(2);//深圳
        return dhs.addHotel(hotel);
    }

    /**
     * 根据城市id获取酒店列表
     * @param cityId
     * @return
     */
    @RequestMapping("/city")
    public Map getcity(Integer cityId){
        //  System.out.println(Map);
        return dhs.getcity(cityId);
    }

    /**
     *
     * @param departCityId
     * @return
     */
    @RequestMapping("/travel")
    public Map gettravel(Integer departCityId){
        return  dhs.gettravel(departCityId);
    }

    /**
     *
     * @param cityId
     * @return
     */
    @RequestMapping("mempiao")
    public Map getticket(Integer cityId){
        return dhs.getticket(cityId);
    }
}
