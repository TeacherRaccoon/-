package com.kgc.finance.controller;

import com.kgc.finance.service.FinanceService;
import com.kgc.finance.service.PagingService;
import com.kgc.finance.util.PageUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;



@Controller
public class FinanceController {
    @Resource
    private FinanceService financeService;

    //财务人员分页数据，获取记录数
    @RequestMapping("/financePagingCount")
    @ResponseBody
    public Map getFinancePagingCount(HttpServletRequest req) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("financeId", req.getParameter("financeId"));//业务员id
        map.put("createDate", req.getParameter("createDate"));//订单创建时间
        map.put("orderId", req.getParameter("orderId"));//订单号
        map.put("userName", req.getParameter("userName"));//借款人姓名
        if (req.getParameter("status").length()==0){
            map.put("status",null);//订单状态
        }else {
            map.put("status",req.getParameter("status"));//订单状态
        }

        map.put("payType", req.getParameter("payType"));//交易类型
        System.out.println("++++++++++++>>>"+map.toString());
        return financeService.financePagingCount(map);
    }

    // 财务人员分页数据，获取数据
    @RequestMapping("/financePagingData")
    @ResponseBody
    public Map getFinancePagingData(HttpServletRequest req) {
        Map<String, Object> map = new HashMap<String, Object>();
        Integer curr =Integer.parseInt(req.getParameter("curr"));//页数
        Integer limit =Integer.parseInt(req.getParameter("limit"));//页大小
        Integer index = PageUtils.getStart(curr,limit);
        map.put("index",index);
        map.put("pageSize",limit);
        map.put("financeId", req.getParameter("financeId"));//业务员id
        map.put("createDate", req.getParameter("createDate"));//订单创建时间
        map.put("orderId", req.getParameter("orderId"));//订单号
        map.put("userName", req.getParameter("userName"));//借款人姓名
        if (req.getParameter("status").length()==0){
            map.put("status",null);//订单状态
        }else {
            map.put("status",req.getParameter("status"));//订单状态
        }
        map.put("payType", req.getParameter("payType"));//交易类型
        return financeService.financePagingData(map);
    }
}
