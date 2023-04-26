package com.example.ctrip.Dao;


import com.example.ctrip.Pojo.City;
import com.example.ctrip.Pojo.HotelComment;
import com.example.ctrip.Pojo.Hotel;
import com.example.ctrip.Pojo.HotelOrder;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
public interface HotelMapper {
    /**
     * 酒店查询接口
     * @param hotel
     * @return List
     */

    public List<Hotel> getHotelDataByPage(Hotel hotel);

    /***
     * 酒店评论插入接口
     * @param comment
     * @return int
     */
    public int insertHotelComment(HotelComment comment);

    /**
     * 获取城市名称
     * @return List
     */
    public List<City> getCityName();

    /**
     * 插入折扣接口
     * @return int
     * @描述 随机插入浮点型折扣接口,私人接口
     */
    public int inserDiscount(int f,int id);

    //根据酒店名获取数据数量
    public int getDataCountByHotelName(Hotel hotelName);

    /**
     * 根据酒店Id获取酒店数据
     * @param id
     * @return list
     */
    public List<Hotel> getHotelInfoById(int id);

    /**
     * 根据酒店Id获取评论信息;
     * @param hotel
     * @return list
     */
    public List<HotelComment> getHotelCommemtById(HotelComment hotel);

    /**
     * 根据Id获取酒店所有评论
     * @param hotelComment
     * @return list
     */
    public List<HotelComment> getHotelAllComment(HotelComment hotelComment);

    /**
     * 讲支付成功的订单插入到数据库
     * @param hotelOrder
     * @return int/返回主机ID映射到实体类中
     */
    public int insertHotelOrder(HotelOrder hotelOrder);

    /**
     * 支付成功后修改订单状态
     * @return int
     */
    public int updateOrderStatus(int id,int StatusCode);

    /**
     * 订单详情查询
     * @param id
     * @return List
     */
    public List<HotelOrder> selectHotelBill(int id);

    /***
     * 修改入住偏好
     * @param id
     * @param content
     * @return int
     */
    public int updateOrderEnteringHobby(int id,String content);

    /**
     * 修改联系人
     * @param id
     * @param phone
     * @param email
     * @return int
     */
    public int updateOrderContacts(int id,String phone,String email);

}
