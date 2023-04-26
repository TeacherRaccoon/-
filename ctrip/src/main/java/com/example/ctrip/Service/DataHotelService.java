package com.example.ctrip.Service;

import com.example.ctrip.Pojo.Hotel;
import com.example.ctrip.Pojo.TicketSpot;

import java.util.List;
import java.util.Map;


public interface DataHotelService {
    public Map addHotel(Hotel hotel);

    public Map getcity(Integer cityid);

    //根据城市id查询旅游产品，名称，价格
    public Map gettravel( Integer departCityId);

    //根据城市id查询旅游景点门票的名称，价格
    public Map getticket(Integer cityId);
}
