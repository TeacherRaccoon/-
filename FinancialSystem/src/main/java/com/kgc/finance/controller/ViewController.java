package com.kgc.finance.controller;

import com.kgc.finance.service.ViewService;
import com.kgc.finance.util.TimelineUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @program: FinancialSystem
 * @Description: $
 * @Param: $
 * @return: $
 * @Author: xieyongde
 * @Date: 2019-09-17
 */
@Controller
@RequestMapping("/view")
public class ViewController {
    @Resource
    private ViewService viewService;

    //查看订单信息
    @RequestMapping("/orderInfo.htm")
    @ResponseBody
    public Map getOrder(Integer orderId) {
        return viewService.orderInfo(orderId);
    }

    //查看出款信息
    @RequestMapping("/outAmountInfo.htm")
    @ResponseBody
    public Map getOutAmount(Integer orderId) {
        return viewService.outAmountInfo(orderId);
    }

    //查看图片
    @RequestMapping("/imgInfo.htm")
    @ResponseBody
    public Map getImgInfo(Integer orderId) {
        return viewService.imgInfo(orderId);
    }

    //点击通过，修改订单状态
    @RequestMapping("/alterState.htm")
    @ResponseBody
    public Map alterState(Integer orderId,Integer status,Integer salesmanId,Integer windId,Integer financeId,String returnReson) {
        return viewService.alterState(orderId,status,salesmanId,windId,financeId,returnReson);
    }

    //删除订单
    @RequestMapping("/deleteView.htm")
    @ResponseBody
    public Map deleteView(Integer orderId) {
        return viewService.deleteView(orderId);
    }

}
