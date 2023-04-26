package com.kgc.finance.controller;

import com.kgc.finance.pojo.OutAmountInfo;
import com.kgc.finance.service.OutAddService;
import com.kgc.finance.service.PagingService;
import com.kgc.finance.util.PageUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;



@Controller
public class OutAddController {
    @Resource
    private OutAddService outAddService;

    //添加一条出款信息
    @RequestMapping("/outAdd")
    @ResponseBody
    public Map outAdd(OutAmountInfo outAmountInfo) {
        return outAddService.out_add(outAmountInfo);
    }

    //修改出款信息
    @RequestMapping("/outUp")
    @ResponseBody
    public Map outUp(OutAmountInfo outAmountInfo) {
        return outAddService.out_up(outAmountInfo);
    }

    //删除出款信息
    @RequestMapping("/outDele")
    @ResponseBody
    public Map out_dele(Integer outAmountId) {
        return outAddService.out_dele(outAmountId);
    }

    //删除出款信息
    @RequestMapping("/test")
    @ResponseBody
    @Scheduled(cron = "0/30 * * * * ? ")
    public String test(){
        return "信息";
    }
}
