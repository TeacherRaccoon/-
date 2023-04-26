package com.kgc.finance.dao;

import com.kgc.finance.pojo.Administrator;
import com.kgc.finance.pojo.TimeIine;

import java.util.List;
import java.util.Map;

/**
 * @author: 方子瑞
 * @program: com.kgc.finance.dao.TimeIineDao
 * @explain: 业务时间线
 * @create: 2019-09-20 11:20
 **/
public interface TimeIineDao {

    /**
     * 通过操作员id在时间线中获取处理的订单数据
     * @param operatorId 操作人员id
     * @return
     */
    public List<Integer> getIdfinInfoEntry(Integer operatorId);


    /**
     * 获取订单的时间线数据
     * @param orderId 订单id
     * @return
     */
    public List<TimeIine> getOrderIdFindAll(Integer orderId);



    /**
     * 添加时间线节点
     * @param timeIine 时间线对象
     * @return
     */
    public Integer insertTimeIine(TimeIine timeIine);

    /**
     * 判断财务初审是否通过
     * @param orderId 订单id
     * @return
     */
    public Integer getBooleans(Integer orderId);

    /**
     * 上传凭证，获取时间
     * @param orderId 订单id
     * @return
     */
    public Map getPing(Integer orderId);

    /**
     * 根据时间，获得结单数量
     * @param modeifyDate 时间模糊查询
     * @return
     */
    public Integer getTime(String modeifyDate);

}
