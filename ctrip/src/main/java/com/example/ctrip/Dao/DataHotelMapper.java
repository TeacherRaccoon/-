package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.Hotel;
import com.example.ctrip.Pojo.TicketSpot;
import com.example.ctrip.Pojo.TravelProduct;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface DataHotelMapper {

    //插入酒店信息
    public int addHotel(Hotel hotel);

    //根据城市Id查询酒店名称，地址，价格
    public List<Hotel> getcity(@Param("cityId")Integer cityId);

    //根据城市id查询旅游产品，名称，价格
    public List<TravelProduct> gettravel(@Param("departCityId") Integer departCityId);

    //根据城市id查询旅游景点门票的名称，价格
    public List<TicketSpot> getticket(@Param("cityId") Integer cityId);
}
