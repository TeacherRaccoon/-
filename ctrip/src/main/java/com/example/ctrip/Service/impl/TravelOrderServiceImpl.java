package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.TravelOrderMapper;
import com.example.ctrip.Dao.UserMapper;
import com.example.ctrip.Pojo.TravelOrder;
import com.example.ctrip.Pojo.UserContact;
import com.example.ctrip.Pojo.UserPassenger;
import com.example.ctrip.Service.TravelOrderService;
import com.example.ctrip.util.MapUtil;
import com.example.ctrip.util.RedisUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
public class TravelOrderServiceImpl implements TravelOrderService {

    @Resource
    private TravelOrderMapper travelOrderMapper;

    @Transactional
    @Override
    public Map addTravelOrder(TravelOrder travelOrder) {
        //添加一个订单号
        //接收结果
        Map result = null;
        try{
            travelOrder.setOrderCode(createOrderCode());
            System.out.println("==================================\n生成的订单号："+travelOrder.getOrderCode());

            Integer num=travelOrderMapper.addTravelOrder(travelOrder);
            System.out.println("==================================\n"+travelOrder.toString());
            if(num==1){
                result=MapUtil.encapsulation("true","新增订单成功",num);
            }else{
                result=MapUtil.encapsulation("false","新增订单失败");
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public Map getTravelOrder(Integer id) {
        Map<String,Object> result;
        TravelOrder travelOrder=travelOrderMapper.getTravelOrder(id);
        if(travelOrder!=null){
            result=MapUtil.encapsulation(true,"查询成功",travelOrder);
        }else{
            result=MapUtil.encapsulation(false,"查询失败");
        }
        return result;
    }
    @Transactional
    @Override
    public Map updateTravelOrder(Map map) {
        Map<String,Object> result;

        Integer num=travelOrderMapper.updateTravelOrder(map);
        if(num==1){
            result=MapUtil.encapsulation("true","更新订单成功");
        }else{
            result=MapUtil.encapsulation("false","更新订单失败");
        }
        return result;
    }
    @Transactional
    @Override
    public Map delTravelOrder(Integer id) {
        return null;
    }

    @Transactional
    @Override
    public Integer insertUserPassenger(UserPassenger userPassenger) {
        return travelOrderMapper.insertUserPassenger(userPassenger);
    }

    @Transactional
    @Override
    public Integer insertUserContact(UserContact userContact) {
        return travelOrderMapper.insertUserContact(userContact);
    }
    @Transactional
    @Override
    public Integer insertOrderAndContactAndPassenger(Integer orderId, Integer userPassengerId) {
        return travelOrderMapper.insertOrderAndContactAndPassenger(orderId,userPassengerId);

    }

    @Override
    public Integer getUserOrderId(Integer userId) {
        return travelOrderMapper.getUserOrderId(userId);
    }

    @Override
    public Integer getUserPassengerId(Integer userId,Integer orderId) {
        return travelOrderMapper.getUserPassengerId(userId,orderId);
    }

    @Override
    public Map getAllPassengerByUserId(Integer userId) {
        Map<String,Object> result;
        List<UserPassenger> list=travelOrderMapper.getAllPassengerByUserId(userId);
        if(list.size()>0){
            result=MapUtil.encapsulation(true,"查询成功",list);
        }else{
            result=MapUtil.encapsulation(false,"查询失败");
        }
        return result;
    }

    @Override
    public Integer getUserContactId(Integer userId) {
        return travelOrderMapper.getUserContactId(userId);
    }

    @Override
    public Map<String, Object> getTravelOrderByTime(Integer userId) {
        Map<String,Object> result;
        TravelOrder travelOrder=travelOrderMapper.getTravelOrderByTime(userId);
        if(travelOrder!=null){
            result=MapUtil.encapsulation("true","查询成功",travelOrder);
        }else{
            result=MapUtil.encapsulation("false","查询失败");
        }
        return result;
    }
    @Transactional
    @Override
    public Map updateInventory(String orderCode) {
        Map<String,Object> result;
        Integer num=travelOrderMapper.updateInventory(orderCode);
        if(num==1){
            result=MapUtil.encapsulation("true","更新库存成功");
        }else{
            result=MapUtil.encapsulation("false","更新库存失败");
        }
        return result;
    }

    /**
     * 随机生成订单号
     * @return
     */
    public String createOrderCode() {
    int machineId =1;//最大支持1-9个集群机器部署  
    int hashCodeV = UUID.randomUUID().toString().hashCode();

    if(hashCodeV<0){//有可能是负数  
        hashCodeV=-hashCodeV;
}
    return machineId+String.format("%015d",hashCodeV);

    }
}
