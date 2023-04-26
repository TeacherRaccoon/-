package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.DataHotelMapper;
import com.example.ctrip.Pojo.Hotel;
import com.example.ctrip.Pojo.TicketSpot;
import com.example.ctrip.Pojo.TravelProduct;
import com.example.ctrip.Service.DataHotelService;
import com.example.ctrip.util.MapUtil;
import com.example.ctrip.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.w3c.dom.ls.LSException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class DataHotelServiceImpl implements DataHotelService {
    @Autowired
    RedisUtil redisUtil;


    Map map = new HashMap();
    @Autowired
    private DataHotelMapper dhM;

    @Override
    public Map addHotel(Hotel hotel) {
        int i = dhM.addHotel(hotel);
        if (i > 0) {
            map.put("msg", "success");
        } else {
            map.put("msg", "error");
        }
        return map;
    }


//    @Override
//    public Map getcity(Integer cityId) {
//        List<Hotel> list = dhM.getcity(cityId);
//        if( list.size() > 0){
//            map = MapUtil.encapsulation(true,"success",list);
//        }else {
//            map = MapUtil.encapsulation(false,"false");
//        }
//        return map;
//    }
//
//    @Override
//    public Map gettravel(Integer departCityId) {
//
//        List<TravelProduct> list1=dhM.gettravel(departCityId);
//        if (list1 !=null){
//
//            map=MapUtil.encapsulation(true,"查询成功",list1);
//        } else {
//            map=MapUtil.encapsulation(false,"查询失败");
//        }
//
//        return map;
//    }

    /**
     * 门票
     *
     * @param cityId
     * @return
     */
    @Override
    public Map getticket(Integer cityId) {
        map = (Map) redisUtil.get("index:getticket:city:" + cityId);
        if (map != null) {
            return map;
        } else {
            List<TicketSpot> list = dhM.getticket(cityId);
            if (list != null) {
                map = MapUtil.encapsulation(true, "查询成功", list);
                redisUtil.set("index:getticket:city:" + cityId, map);

            } else {
                map = MapUtil.encapsulation(false, "查询失败");
            }
        }
        return map;
    }

    /**
     * 酒店
     *
     * @param cityId
     * @return
     */
    @Override
    public Map getcity(Integer cityId) {
        map = (Map) redisUtil.get("index:getcity:cityid:" + cityId);

        if (map != null) {
            return map;
        } else {
            List<Hotel> hotelList = dhM.getcity(cityId);
            if (hotelList != null) {
                map = MapUtil.encapsulation(true, "查询成功", hotelList);
                redisUtil.set("index:getcity:cityid:" + cityId, map);
            } else {
                map = MapUtil.encapsulation(false, "查询失败");
            }
        }
        return map;
    }

    /**
     *  旅游景点
     * @param departCityId
     * @return
     */
    @Override
    public Map gettravel(Integer departCityId) {
        map = (Map) redisUtil.get("index:gettravel:departCityId:" + departCityId);
        if (map != null) {
            return map;
        } else {
            List<TravelProduct> list1 = dhM.gettravel(departCityId);
            if (list1 != null) {
                map = MapUtil.encapsulation(true, "查询成功", list1);
                redisUtil.set("index:gettravel:departCityId:" + departCityId, map);

            } else {
                map = MapUtil.encapsulation(false, "查询失败");
            }
        }
        return map;
    }
}