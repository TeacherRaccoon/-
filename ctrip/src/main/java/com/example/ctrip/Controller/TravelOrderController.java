package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.TravelOrder;
import com.example.ctrip.Pojo.UserContact;
import com.example.ctrip.Pojo.UserPassenger;
import com.example.ctrip.Service.TravelOrderService;
import com.example.ctrip.util.MapUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.Map;


@RestController
@RequestMapping("/travelOrder")
public class TravelOrderController {
    @Resource
    private TravelOrderService travelOrderService;
    private Integer orderId;
    /**
     * 添加新的订单
     * @param travelOrder
     * @return
     */
    @RequestMapping("/addTravelOrder")
    public Map addTravelOrder(TravelOrder travelOrder){
        Map result;
        //查询库存
        //得到userContact对象
        UserContact userContact=travelOrder.getUserContact();
        //向数据库中新增联系人记录
        Integer num=travelOrderService.insertUserContact(userContact);
        //是否添加成功
        if(num==1){
            //得到新添加的联系人id
            Integer contactId=travelOrderService.getUserContactId(travelOrder.getUserId());
            travelOrder.setUserContactId(contactId);
            result=travelOrderService.addTravelOrder(travelOrder);
            if(result.get("result").equals("false")){
                result= MapUtil.encapsulation("false","新增顶单失败");
            }else{
                orderId=travelOrderService.getUserOrderId(travelOrder.getUserId());
            }
        }else{
            result= MapUtil.encapsulation("false","新增顶单失败");
        }

        return result;
    };

    /**
     *
     * @param userPassenger
     * @return
     */
    @RequestMapping("/addUserPassenger")
    public Map addUserPassenger( UserPassenger userPassenger){
        Map result;
        //插入一个旅客
        userPassenger.setOrderId(orderId);
        int addPassengerNum=travelOrderService.insertUserPassenger(userPassenger);
        if(addPassengerNum==1 && orderId !=null){
            //查询新旅客的id
            Integer passengerId=travelOrderService.getUserPassengerId(userPassenger.getUserId(),orderId);
            //在订单和旅客关系表中插入一条记录
            int num=travelOrderService.insertOrderAndContactAndPassenger(orderId,passengerId);
            if(num==1){
                result=MapUtil.encapsulation("true","添加完整订单成功",orderId);
            }else {
                result = MapUtil.encapsulation("false", "添加完整订单失败");
            }
        }else {
            result=MapUtil.encapsulation("false","添加完整订单失败");
        }
        return result;
    }
    /**
     * 根据id获取订单
     * @param id
     * @return
     */
    @RequestMapping("/getTravelOrder")
    public Map getTravelOrder(Integer id){
        return travelOrderService.getTravelOrder(id);
    };

    /**
     * 更新订单
     * @param map
     * @return
     */
    @RequestMapping("/updateTravelOrder")
    public Map updateTravelOrder(Map map){
        return travelOrderService.updateTravelOrder(map);
    };

    /**
     * 删除指定id的订单
     * @param id
     * @return
     */
    @RequestMapping("/delTravelOrder")
    public Map delTravelOrder(Integer id){
        return travelOrderService.delTravelOrder(id);
    };

    /**
     *
     * @param userId
     * @return
     */
    @RequestMapping("/getOrderByTime")
    public Map getTravelOrderByTime(Integer userId){
        return travelOrderService.getTravelOrderByTime(userId);
    }

    /**
     * 更新库存
     * @param orderCode
     * @return
     */
    @RequestMapping("/updateInventory")
    public Map updateTravelInventory(String orderCode){
       return travelOrderService.updateInventory(orderCode);
    }

}
