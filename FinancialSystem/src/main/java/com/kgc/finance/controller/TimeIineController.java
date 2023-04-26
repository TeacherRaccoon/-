package com.kgc.finance.controller;

import com.kgc.finance.service.TimeIineService;
import com.kgc.finance.util.MapUtil;
import com.kgc.finance.util.TimelineUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author: 方子瑞
 * @program: com.kgc.finance.controller.TimeIineController
 * @explain: 时间线控制层
 * @create: 2019-09-20 11:30
 **/
@RequestMapping("/background/timeIine")
@RestController
public class TimeIineController {

    @Autowired
    private TimeIineService timeIineService;


    @Autowired
    private TimelineUtil timelineUtil;

    /**
     * 获取操作员处理订单的数量
     * @param operatorId 操作员id
     * @return
     */
    @RequestMapping("/getIdfinInfoEntry")
    public Map getIdfinInfoEntry(Integer operatorId) {
        int i=timeIineService.getIdfinInfoEntry(operatorId);
        return MapUtil.encapsulation(true,"获取成功",i);
    }


    /**
     * 获取订单的时间线数据
     * @param orderId 订单id
     * @return
     */
    @RequestMapping("/getOrderIdFindAll")
    public Map getOrderIdFindAll(Integer orderId) {
        return timeIineService.getOrderIdFindAll(orderId);
    }

    @RequestMapping("/getBooleans")
    public Map getBooleans(Integer orderId) {
        return MapUtil.encapsulation(timeIineService.getBooleans(orderId),"true通过，falser不通过");
    }


    @RequestMapping("/getPing")
    public Map getPing(Integer orderId) {
        return timeIineService.getPing(orderId);
    }


    @RequestMapping("/getTime")
    public Map getTime() {
        return timeIineService.getTime();
    }

}
