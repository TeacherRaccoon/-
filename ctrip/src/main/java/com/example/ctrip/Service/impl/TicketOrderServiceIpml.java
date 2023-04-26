package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.TicketOrderMapper;
import com.example.ctrip.Pojo.TicketOrder;
import com.example.ctrip.Pojo.TicketSore;
import com.example.ctrip.Service.TicketOrderService;
import com.example.ctrip.util.MapUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Service
public class TicketOrderServiceIpml implements TicketOrderService {

    @Resource
    private TicketOrderMapper ticketOrderMapper;

    //添加门票订单
    @Override
    public Map<String, Object> addTicketOrder(TicketOrder ticketOrder) {
        Map result;
        try{
            Integer num=ticketOrderMapper.addTicketOrder(ticketOrder);
            if(num==1){
                result= MapUtil.encapsulation("true","添加成功",num);
            }else {
                result= MapUtil.encapsulation("false","添加失败");
            }
        }catch (Exception e){
            result= MapUtil.encapsulation("false","程序异常，添加失败");
        }
        return result;
    }

    //根据景点id查询所有评论
    @Override
    public Map<String, Object> getSoreBySceniSpotId(Integer id) {
        Map result;
        try{
            List<TicketSore> list=ticketOrderMapper.getSoreByScenicSpotId(id);
            if(list != null){
                result= MapUtil.encapsulation("true","查询成功",list);
            }else {
                result= MapUtil.encapsulation("false","查询失败");
            }
        }catch (Exception e){
            result= MapUtil.encapsulation("false","程序异常，查询失败");
        }
        return result;

    }

    //景点评论分页
    @Override
    public Map<String, Object> getSoreListPage(Map map) {
        Map result;
        try{
            List list=ticketOrderMapper.getSoreListPage(map);
            if(list != null){
                result= MapUtil.encapsulation("true","分页查询成功",list);
            }else {
                result= MapUtil.encapsulation("false","分页查询失败");
            }
        }catch (Exception e){
            result= MapUtil.encapsulation("false","程序异常，分页查询失败");
        }
        return result;
    }

    //修改评论
    @Override
    public Map<String, Object> updateTicketSore(TicketSore ticketSore) {
        Map result;
        try{
            Integer num= ticketOrderMapper.updateTicketSore(ticketSore);
            if(num==1){
                result= MapUtil.encapsulation("true","修改评论成功",num);
            }else{
                result= MapUtil.encapsulation("false","修改评论失败");
            }
        }catch (Exception e){
            result= MapUtil.encapsulation("false","程序异常，修改评论失败");
        }
        return result;
    }

    //添加评论
    @Override
    public Map<String, Object> addTicketSore(TicketSore ticketSore) {
        Map result;
        try{
            Integer num= ticketOrderMapper.addTicketSore(ticketSore);
            if(num==1){
                result= MapUtil.encapsulation("true","添加评论成功",num);
            }else{
                result= MapUtil.encapsulation("false","添加评论失败");
            }
        }catch (Exception e){
            result= MapUtil.encapsulation("false","程序异常，添加评论失败");
        }
        return result;
    }

    //删除评论
    @Override
    public Map<String, Object> delectSore(Integer id) {
        Map result;
        try{
            Integer num= ticketOrderMapper.delectTicketSore(id);
            if(num>=1){
                result= MapUtil.encapsulation("true","删除评论成功",num);
            }else{
                result= MapUtil.encapsulation("false","删除评论失败");
            }
        }catch (Exception e){
            result= MapUtil.encapsulation("false","程序异常，删除评论失败");
        }
        return result;
    }


}
