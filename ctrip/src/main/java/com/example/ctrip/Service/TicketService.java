package com.example.ctrip.Service;

import com.example.ctrip.Pojo.CtripOrderRel;
import com.example.ctrip.Pojo.TicketComment;
import com.example.ctrip.Pojo.TicketOrder;
import com.example.ctrip.Pojo.TicketSpot;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;



public interface TicketService {
    //添加景点
    public Map addSpot(TicketSpot ticketSpot);
    //插入评论数据
    public Map addComment(TicketComment ticketComment);



    //根据地区获取景区信息和门票价格
    public Map<String,Object> selectCityByTicket(Integer id);

    //根据地区分页查询景区信息
    public Map<String,Object> getScenicSpotListPage(Map map);

    //根据景区id获取所有门票项目类型、票价类型、价格
    public Map<String,Object> getTicketType_priceById(Integer id);


    //特权门票的获取
    public Map getTicket(int cityId);

    //根据景点 id 获取景点详情
    public Map getSpotById(int spotId);


    //根据景点Id获取景点评论数
    public Map getCommentCount(int spotId);

    //根据景点id 获取景点所有评论
    public Map getCommentBySpotId(Map params);

    //获取所有的该景点评论数，计算平均分，并获取最近一条记录信息
    public Map getAllCommentCount(int spotId);

    //根据城市id获取景点的门票
    public Map getSpotTicket(int cityId);

    //根据城市 id 获取所有该城市的景点数量
    public Map getSpotListCountByCityId(int cityId);

    //根据城市 id 景点名称获取曲该城市的景点数量
    public Map getSpotCountByCityIdSpotName(Map map);

    //根据城市 id 景点名称获取曲该城市的景点列表
    public Map getSpotListByCityIdSpotName(Map map);

    //新建订单
    public Map addTicketOrder(TicketOrder ticketOrder, List<Integer> passengerId);

    //根据订单编码查询订单信息
    public Map getTOrderInfo(String orderCode);

    //根据景点spotId 集合查询景点的名称
    public Map getHotSpotNameId(List spotIds);

}
