package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.TicketOrder;
import com.example.ctrip.Pojo.TicketSore;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface TicketOrderMapper {

    //添加门票订单
    Integer addTicketOrder(TicketOrder ticketOrder);

    //根据景点id查询所有评论
    List<TicketSore> getSoreByScenicSpotId(@Param(value = "id") Integer id);

    //景点评论分页
    List<TicketSore> getSoreListPage(Map map);

    //添加评论
    Integer addTicketSore(TicketSore ticketSore);

    //删除评论
    Integer delectTicketSore(Integer id);

    //修改评论
    Integer updateTicketSore(TicketSore ticketSore);

}
