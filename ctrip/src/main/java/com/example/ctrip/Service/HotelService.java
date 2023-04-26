package com.example.ctrip.Service;


import com.example.ctrip.Dao.HotelMapper;
import com.example.ctrip.Pojo.Hotel;
import com.example.ctrip.Pojo.HotelComment;
import com.example.ctrip.Pojo.HotelOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;


public interface HotelService {

    /**
     * 酒店列表查询
     * @param hotel
     * @return map
     */
    public Map getHotelByPage(Hotel hotel);

    /**
     * 获取城市名称
     * @return map
     */
    public Map getCtiyAllName();

    /**
     * 随机插入折扣
     * @return int
     */
    public int inserDiscount(int i,int id);

    /**
     * 获取数据总数
     * @return int
     */
    public int getDataCountByHotelName(Hotel ho);

    /**
     * 根据酒店Id获取酒店数据
     * @param id
     * @return
     */
    public Map getHotel_InfoById(int id);

    /**
     * 根据酒店Id获取评论信息
     * @param hotel
     * @return
     */
    public Map getHotelCommemtById(HotelComment hotel);

    /***
     * 根据酒店Id获取所有评论
     * @param hotelComment
     * @return map
     */
    public Map getHotelAllComment(HotelComment hotelComment);

    /**
     * 讲支付成功的订单插入到数据库
     * @param hotelOrder
     * @return int/返回主机ID映射到实体类中
     */
    public Map insertHotelOrder(HotelOrder hotelOrder);

    /**
     * 支付成功后修改订单状态
     * @param Status
     * @return map
     */
    public Map updateOrderStatus(int id,int Status);

    /**
     * 订单详情查询
     * @param id
     * @return List
     */
    public Map selectHotelBill(int id);

    /***
     * 修改入住偏好
     * @param id
     * @param content
     * @return int
     */
    public Map updateOrderEnteringHobby(int id,String content);

    /**
     * 修改联系人
     * @param id
     * @param phone
     * @param email
     * @return map
     */
    public Map updateOrderContacts(int id,String phone,String email);
}
