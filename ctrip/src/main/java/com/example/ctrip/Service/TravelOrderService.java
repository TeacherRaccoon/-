package com.example.ctrip.Service;

import com.example.ctrip.Pojo.TravelOrder;
import com.example.ctrip.Pojo.UserContact;
import com.example.ctrip.Pojo.UserPassenger;

import java.util.List;
import java.util.Map;


public interface TravelOrderService {
    /**
     * 添加新的订单
     * @param travelOrder
     * @return
     */
    Map addTravelOrder(TravelOrder travelOrder);

    /**
     * 根据id获取订单
     * @param id
     * @return
     */
    Map getTravelOrder(Integer id);

    /**
     * 更新订单
     * @param map
     * @return
     */
    Map updateTravelOrder(Map map);

    /**
     * 删除指定id的订单
     * @param id
     * @return
     */
    Map delTravelOrder(Integer id);
    /**
     * 插入旅客，并返回插入旅客的id
     * @param userPassenger
     * @return
     */
    Integer insertUserPassenger(UserPassenger userPassenger);

    /**
     * 插入联系人
     * @param userContact
     * @return
     */
    Integer insertUserContact(UserContact userContact);

    /**
     * 插入订单和旅客的关联
     * @param orderId
     * @param userPassengerId
     * @return
     */
    Integer insertOrderAndContactAndPassenger(Integer orderId,Integer userPassengerId);
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
    Map getAllPassengerByUserId(Integer userId);

    /**
     *获取联系人id
     * @param userId
     * @return
     */
    Integer getUserContactId(Integer userId);

    /**
     * 获得最新的暂存，未提交，未付款订单
     * @param userId
     * @return
     */
    Map<String, Object> getTravelOrderByTime(Integer userId);
    /**
     *
     * @param orderCode
     * @return
     */
    Map updateInventory(String orderCode);
}
