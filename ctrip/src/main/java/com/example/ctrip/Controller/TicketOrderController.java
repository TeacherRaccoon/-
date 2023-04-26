package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.TicketOrder;
import com.example.ctrip.Pojo.TicketSore;
import com.example.ctrip.Service.TicketOrderService;
import com.example.ctrip.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/ticketOrder")
public class TicketOrderController {

    @Resource
    private TicketOrderService ticketOrderService;
    @Autowired
    RedisUtil redisUtil;

    //添加门票订单
    @RequestMapping("/addTicketOrder")
    public Map<String,Object> addTicketOrder(TicketOrder ticketOrder){
        return  ticketOrderService.addTicketOrder(ticketOrder);
    }

    //根据景点id查询所有评论
    @RequestMapping("/getSoreBySceniSpotId")
    public Map<String,Object> getSoreBySceniSpotId(Integer id){
        return ticketOrderService.getSoreBySceniSpotId(id);
    }

    //景点评论分页
    @RequestMapping("/getSoreListPage")
    public Map<String,Object> getSoreListPage(@RequestParam(value = "id")Integer id,
                                              @RequestParam(value = "index")Integer index,
                                              @RequestParam(value = "pageSize")Integer pageSize){
        Map map = new HashMap();
        map.put("id",id);
        map.put("index",(index-1)*pageSize);
        map.put("pageSize",pageSize);
        return ticketOrderService.getSoreListPage(map);
    }

    //添加评论
    @RequestMapping("/addTicketSore")
    public Map<String,Object> addTicketSore(TicketSore ticketSore){
        return ticketOrderService.addTicketSore(ticketSore);
    }

    //删除评论
    @RequestMapping("/delectTicketSore")
    public Map<String,Object> delectTicketSore(Integer id){
        return ticketOrderService.delectSore(id);
    }

    //修改评论
    @RequestMapping("/updateTicketSore")
    public Map<String,Object> updateTicketSore(TicketSore ticketSore){
        return ticketOrderService.updateTicketSore(ticketSore);
    }

}
