package com.kgc.finance.controller;

import com.kgc.finance.service.PagingService;
import com.kgc.finance.service.ViewService;
import com.kgc.finance.util.PageUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


/**
 * @program: demo
 * @Description: $
 * @Param: $
 * @return: $
 * @Author: xieyongde
 * @Date: 2019-09-20
 */
@Controller
@RequestMapping("/paging")
public class PagingController {
    @Resource
    private PagingService pagingService;

    //业务员分页数据，获取记录数
    @RequestMapping("/businessPagingCount.htm")
    @ResponseBody
    public Map getBusinessPagingCount(HttpServletRequest req) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("salesmanId", req.getParameter("salesmanId"));//业务员id
        map.put("createDate", req.getParameter("createDate"));//订单创建时间
        map.put("orderId", req.getParameter("orderId"));//订单号
        map.put("userName", req.getParameter("userName"));//借款人姓名
        map.put("status", req.getParameter("status"));//订单状态
        map.put("payType", req.getParameter("payType"));//交易类型
        return pagingService.businessPagingCount(map);
    }

    // 业务员分页数据，获取数据
    @RequestMapping("/businessPagingData.htm")
    @ResponseBody
    public Map getBusinessPagingData(HttpServletRequest req) {
        Map<String, Object> map = new HashMap<String, Object>();
        Integer curr =Integer.parseInt(req.getParameter("curr"));//页数
        Integer limit =Integer.parseInt(req.getParameter("limit"));//页大小
        Integer index = PageUtils.getStart(curr,limit);
        map.put("index",index);
        map.put("pageSize",limit);
        map.put("salesmanId", req.getParameter("salesmanId"));//业务员id
        map.put("createDate", req.getParameter("createDate"));//订单创建时间
        map.put("orderId", req.getParameter("orderId"));//订单号
        map.put("userName", req.getParameter("userName"));//借款人姓名
        map.put("status", req.getParameter("status"));//订单状态
        map.put("payType", req.getParameter("payType"));//交易类型
        System.out.println("=====>>"+map.toString());
        return pagingService.businessPagingData(map);
    }

    // 风控员分页数据，获取数据
    @RequestMapping("/RiskControlPageData.htm")
    @ResponseBody
    public Map RiskControlPageData(HttpServletRequest req) {
        Map<String, Object> map = new HashMap<String, Object>();
        Integer curr =Integer.parseInt(req.getParameter("curr"));//页数
        Integer limit =Integer.parseInt(req.getParameter("limit"));//页大小
        Integer index = PageUtils.getStart(curr,limit);
        map.put("index",index);
        map.put("pageSize",limit);
        map.put("id", req.getParameter("id"));//风控员id
        map.put("createDate", req.getParameter("createDate"));//订单创建时间
        map.put("orderId", req.getParameter("orderId"));//订单号
        map.put("userName", req.getParameter("userName"));//借款人姓名
        map.put("status", req.getParameter("status"));//订单状态
        map.put("payType", req.getParameter("payType"));//交易类型
        System.out.println("=====>>"+map.toString());
        return pagingService.RiskControlPageData(map);
    }


    //风控员分页数据，获取记录数
    @RequestMapping("/RiskControlCount.htm")
    @ResponseBody
    public Map RiskControlCount(HttpServletRequest req) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("id", req.getParameter("id"));//风控员id
        map.put("createDate", req.getParameter("createDate"));//订单创建时间
        map.put("orderId", req.getParameter("orderId"));//订单号
        map.put("userName", req.getParameter("userName"));//借款人姓名
        map.put("status", req.getParameter("status"));//订单状态
        map.put("payType", req.getParameter("payType"));//交易类型
        System.out.println("---------------????"+map.toString());
        return pagingService.RiskControlCount(map);
    }
}
