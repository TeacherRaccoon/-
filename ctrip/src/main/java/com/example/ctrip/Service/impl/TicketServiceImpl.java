package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.TicketMapper;
import com.example.ctrip.Pojo.*;
import com.example.ctrip.Service.TicketService;
import com.example.ctrip.util.MapUtil;
import com.example.ctrip.util.RedisUtil;
import javafx.beans.binding.MapExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TicketServiceImpl implements TicketService {
    Map map = new HashMap();

    @Resource
    private TicketMapper ticketMapper;
    @Autowired
    RedisUtil redisUtil;

    //插入评论数据
    public Map addComment(TicketComment ticketComment) {
        int i = ticketMapper.addComments(ticketComment);
        if (i > 0) {
            return MapUtil.encapsulation(true, "OK", i);
        } else {
            return MapUtil.encapsulation(false, "failed", i);
        }
    }


    //添加景点
    public Map addSpot(TicketSpot ticketSpot) {
        int i = ticketMapper.addSpot(ticketSpot);
        if (i > 0) {
            return MapUtil.encapsulation(true, "success");
        } else {
            return MapUtil.encapsulation(false, "faile");
        }
    }

    //根据地区获取景区信息和门票价格
    @Override
    public Map<String, Object> selectCityByTicket(Integer id) {
        Map result;
        try {
            List<ScenicSpot> scenicSpot = ticketMapper.selectCityByTicket(id);
            if (scenicSpot != null) {
                result = MapUtil.encapsulation(true, "查询成功！", scenicSpot);
            } else {
                result = MapUtil.encapsulation(false, "查询失败！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = MapUtil.encapsulation(false, "查询出现异常！");
        }
        return result;
    }

    //根据地区分页查询景区信息
    @Override
    public Map<String, Object> getScenicSpotListPage(Map map) {
        Map result;
        List list = ticketMapper.getScnicSpotListPage(map);
        if (list != null) {
            result = MapUtil.encapsulation(true, "分页查询成功！", list);
        } else {
            result = MapUtil.encapsulation(false, "分页查询失败！");
        }
        return result;
    }

    //根据景区id获取所有门票项目类型、票价类型、价格
    @Override
    public Map<String, Object> getTicketType_priceById(Integer id) {
        Map result;
        try {
            List<Ticket> ticketList = ticketMapper.getTicketType_priceById(id);
            if (ticketList != null) {
                result = MapUtil.encapsulation(true, "查询成功！", ticketList);
            } else {
                result = MapUtil.encapsulation(false, "查询失败！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = MapUtil.encapsulation(false, "查询出现异常！");
        }
        return result;
    }

    /**
     * 特权门票的获取
     *
     * @return
     */
    public Map getTicket(int cityId) {
        List<Ticket> list = ticketMapper.getTicket(cityId);
        if (list.size() > 0) {
            map = MapUtil.encapsulation(true, "查询特权票成功！", list);
        } else {
            map = MapUtil.encapsulation(false, "false");
        }
        return map;
    }

    /**
     * 根据景点 id 获取景点详情
     *
     * @param spotId
     * @return
     */
    public Map getSpotById(int spotId) {
        TicketSpot ticket = ticketMapper.getSpotById(spotId);
        if (ticket != null) {
            return MapUtil.encapsulation(true, "success", ticket);
        } else {
            return MapUtil.encapsulation(false, "faild");
        }
    }

    /**
     * 根据景点Id获取景点评论数
     *
     * @param spotId
     * @return
     */
    public Map getCommentCount(int spotId) {
        int i = ticketMapper.getComentCount(spotId);
        if (i > 0) {
            map = MapUtil.encapsulation(true, "success", i);
        } else {
            map = MapUtil.encapsulation(false, "failed");
        }

        return map;
    }

    /**
     * 根据景点id 获取景点所有评论
     *
     * @param params
     * @return
     */
    public Map getCommentBySpotId(Map params) {
        List list = ticketMapper.getCommentBySpotId(params);
        if (list != null) {
            return MapUtil.encapsulation(true, "success", list);
        } else {
            return MapUtil.encapsulation(false, "false");
        }
    }

    /**
     * 获取所有的该景点评论数，计算平均分，并获取最近一条记录信息
     *
     * @param spotId
     * @return
     */
    public Map getAllCommentCount(int spotId) {
        Map recentComment = ticketMapper.getAllCommentCount(spotId);
        if (recentComment != null) {
            return MapUtil.encapsulation(true, "ok", recentComment);
        } else {
            return MapUtil.encapsulation(false, "failed");
        }
    }


    /**
     * 根据城市id获取景点的门票
     */

    public Map getSpotTicket(int cityId) {


        //从redis中获取 list 如果 list 为空则去数据库中查
        map = (Map) redisUtil.get("ticketSpot:cityId:" + cityId);

        if (map != null) {//有结果直接return map;
            return map;
        } else {
            //在 redis 中没有找到直接查询数据库
            List<TicketSpot> list = ticketMapper.getTicketSopt(cityId);

            if (list != null) {

                map = MapUtil.encapsulation(true, "ok", list);
                redisUtil.set("ticketSpot:cityId:" + cityId, map);
            } else {
                map = MapUtil.encapsulation(false, "faield", "200");
            }
        }
        return map;
    }

    /**
     * 根据城市 id 获取所有该城市的景点数量
     *
     * @param cityId
     * @return
     */
    public Map getSpotListCountByCityId(int cityId) {
        int i = ticketMapper.getSpotListCountByCityId(cityId);
        if (i > 0) {
            return MapUtil.encapsulation(true, "OK", i);
        } else {
            return MapUtil.encapsulation(false, "failed");
        }
    }

    /**
     * 根据城市 id 景点名称获取曲该城市的景点数量
     *
     * @param map
     * @return
     */
    public Map getSpotCountByCityIdSpotName(Map map) {
        int i = ticketMapper.getSpotCountByCityIdSpotName(map);
        if (i > 0) {
            return MapUtil.encapsulation(true, "OK", i);
        } else {
            return MapUtil.encapsulation(false, "failed", i);
        }
    }

    /**
     * 根据城市 id 景点名称获取曲该城市的景点列表
     */
    public Map getSpotListByCityIdSpotName(Map map) {
        List<Map> spots = ticketMapper.getSpotListByCityIdSpotName(map);
        if (spots != null) {
            return MapUtil.encapsulation(true, "OK", spots);
        } else {
            return MapUtil.encapsulation(false, "failed");
        }
    }

    /**
     * 新建订单
     * 添加订单与联系人的关系
     *
     * @param ticketOrder
     * @return
     */
    @Transactional
    public Map addTicketOrder(TicketOrder ticketOrder, List<Integer> passengerIds) {
        Date date = new Date();
        ticketOrder.setCreationDate(date);//设置创建日期
        int i = ticketMapper.addTicketOrder(ticketOrder);//添加订单
        boolean flag = true;
        for (int j = 0; j < passengerIds.size(); j++) {
            CtripOrderRel corl = new CtripOrderRel();
            corl.setOrderCode(ticketOrder.getOrderCode());//订单编码
            corl.setOrderType(3);//订单类型
            corl.setPassengerId(passengerIds.get(j));//出行人
            corl.setCreationDate(date);
            int k = ticketMapper.addTicOrderRel(corl);//添加订单与联系人的映射
            if (k <= 0) {
                flag = false;
            }
        }
        if (i > 0 && flag == true) {
            return MapUtil.encapsulation(true, "OK", i);
        } else {
            return MapUtil.encapsulation(false, "failed");
        }
    }

    /**
     * 根据订单编码查询订单信息
     *
     * @param orderCode
     * @return
     */
    @Transactional
    public Map getTOrderInfo(String orderCode) {
        TicketOrder ticketOrder = ticketMapper.getTOrderInfo(orderCode);
        Map params = new HashMap();
        params.put("orderCode", orderCode);//设置订单编码
        params.put("orderStatus",2);//修改订单状态
        int i =  ticketMapper.upTorderStatus(params);
        if (ticketOrder != null && i>0) {
            return MapUtil.encapsulation(true, "OK", ticketOrder);
        } else {
            return MapUtil.encapsulation(false, "failed");
        }
    }

    /**
     * 根据景点spotId 集合查询景点的名称    热搜功能
     * @param spotIds
     * @return
     */
    public Map getHotSpotNameId(List spotIds){
        List list = ticketMapper.getHotSpotNameId(spotIds);
        if(list!=null){
           return  MapUtil.encapsulation(true,"success",list);
        }else{
            return MapUtil.encapsulation(false,"failed");
        }
    }

}
