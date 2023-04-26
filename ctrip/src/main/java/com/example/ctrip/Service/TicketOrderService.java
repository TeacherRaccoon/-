package com.example.ctrip.Service;

import com.example.ctrip.Pojo.TicketOrder;
import com.example.ctrip.Pojo.TicketSore;

import java.util.Map;


public interface TicketOrderService {

    //添加门票订单
    public Map<String ,Object> addTicketOrder(TicketOrder ticketOrder);


    //根据景点id查询所有评论
    Map<String,Object> getSoreBySceniSpotId(Integer id);

    //景点评论分页
    Map<String,Object> getSoreListPage(Map map);

    //修改评论
    Map<String,Object> updateTicketSore(TicketSore ticketSore);

    //添加评论
    Map<String,Object> addTicketSore(TicketSore ticketSore);

    //删除评论
    Map<String,Object> delectSore(Integer id);
}
