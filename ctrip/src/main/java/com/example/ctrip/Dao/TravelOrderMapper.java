package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.Img;
import com.example.ctrip.Pojo.TravelOrder;
import com.example.ctrip.Pojo.UserContact;
import com.example.ctrip.Pojo.UserPassenger;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;


@Mapper
public interface TravelOrderMapper {
    /**
     * 添加新的订单
     * @param travelOrder
     * @return
     */
    Integer addTravelOrder(TravelOrder travelOrder);

    /**
     * 根据id获取订单
     * @param id
     * @return
     */
    TravelOrder getTravelOrder(Integer id);

    /**
     * 更新订单,支付成功后更新订单的状态和支付宝交易号
     * @param map
     * @return
     */
    Integer updateTravelOrder(Map map);

    /**
     * 删除指定id的订单
     * @param id
     * @return
     */
    Integer delTravelOrder(Integer id);

    /**
     * 插入旅客，并返回插入旅客的id
     * @param userPassenger
     * @return
     */
    Integer insertUserPassenger(UserPassenger userPassenger);

    /**
     * 插入联系人，并返回联系人id
     * @param userContact
     * @return
     */
    Integer insertUserContact(UserContact userContact);

    /**
     * 添加订单和旅客的关系
     * @param orderId
     * @param passengerId
     * @return
     */
    Integer insertOrderAndContactAndPassenger(@Param(value = "orderId") Integer orderId
                                                ,@Param(value = "userPassengerId") Integer passengerId);

    /**
     * 获得最新的暂存，未提交，未付款订单
     * @param userId
     * @return
     */
    TravelOrder getTravelOrderByTime(Integer userId);

    /**
     * 获取最新插入的联系人ID
     * @return
     */
    Integer getUserOrderId(Integer userId);

    /**
     * 获取新插入的旅客Id
     * @param userId
     * @return
     */
    Integer getUserPassengerId(Integer userId,Integer orderId);

    /**
     * 获取指定用户的添加的所有旅客
     * @param userId
     * @return
     */
    List<UserPassenger> getAllPassengerByUserId(Integer userId);

    /**
     *获取联系人id
     * @param userId
     * @return
     */
    Integer getUserContactId(Integer userId);

    /**
     *
     * @param orderCode
     * @return
     */
    Integer updateInventory(String orderCode);

    /**
     * 查询指定产品，指定日期的库存
     * @param productId
     * @param startDate
     * @return
     */
    Integer getInventory(int productId,String startDate);
}
