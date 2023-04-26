package com.example.ctrip.Dao;


import com.example.ctrip.Pojo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface TicketMapper {
    //添加景点信息
    public int addSpot(TicketSpot ticketSpot);
    //添加景点评论信息
    public int addComments(TicketComment ticketComment);



    //根据地区查询景区信息和门票价格
    List<ScenicSpot> selectCityByTicket(int id);

    //根据地区分页查询景区信息
    List<ScenicSpot> getScnicSpotListPage(Map map);

    //根据景区id获取所有门票项目类型、票价类型、价格
    List<Ticket> getTicketType_priceById(int id);


    //特权门票的显示
    List<Ticket> getTicket(int cityId);

    //根据景点id获取景点详情
    public TicketSpot getSpotById(int spotId);

    //特权门票的景点
    List<TicketSpot> getTicketSopt(int cityId);

    //根据景点 id 获取景点评论总数
    public int getComentCount(int spotId);

    //根据景点 id ,起始位置 获取该景点的所有评论
    public List<TicketComment> getCommentBySpotId(Map map);

    //获取所有的该景点评论数，计算平均分，并获取最近一条记录信息
    public Map getAllCommentCount(int spotId);

    //根据城市 id 获取所有该城市的景点数量
    public int getSpotListCountByCityId(int cityId);

    //根据城市 id 景点名称获取曲该城市的景点数量
    public int getSpotCountByCityIdSpotName(Map map);

    //根据城市id景点名查询
    public List<Map> getSpotListByCityIdSpotName(Map map);

    //添加门票订单--添加订单时需要完成订单与游客的映射-往ctrip_orderRel中添加相应的映射
    public int addTicketOrder(TicketOrder ticketOrder);

    //添加订单与联系人的关系
    public int addTicOrderRel(CtripOrderRel orl);

    //根据订单编码查询订单信息
    public TicketOrder getTOrderInfo(@Param("orderCode")String orderCode);
    //支付成功修改订单状态
    public int upTorderStatus(Map params);

    //根据订单编码查询订单详情包括景点信息、旅客信息、订单详情
    public List<Map> getOrderInfo(@Param("orderCode")String orderCode);

    public TicketOrder getTorderInfo(@Param("orderCode")String orderCode);

    //根据景点spotId 集合查询景点的名称
    public List<Map> getHotSpotNameId(List spotIds);
}
