package com.kgc.finance.service;

import com.kgc.finance.pojo.TimeIine;

import java.util.List;
import java.util.Map;


public interface TimeIineService {


    /**
     * 通过操作员id在时间线中获取处理的订单数据
     * @param operatorId 操作人员id
     * @return
     */
    public int getIdfinInfoEntry(Integer operatorId);

    /**
     * 获取订单的时间线数据
     * @param orderId 订单id
     * @return
     */
    public Map getOrderIdFindAll(Integer orderId);

    /**
     * 添加时间线节点
     * @param orderId 订单id
     * @param status  状态
     * @param operatorName  操作员
     * @param returnReson 驳回原因（可空）
     * @return
     */
    public Boolean insertTimeIine(Integer orderId,String status,String operatorName,String returnReson);

    /**
     * 判断财务初审是否通过
     * @param orderId 订单id
     *                true 通过
     *                false 不通过
     * @return
     */
    public Boolean getBooleans(Integer orderId);

    /**
     * 上传凭证，获取时间
     * @param orderId 订单id
     * @return
     */
    public Map getPing(Integer orderId);

    /**
     * 根据当前时间获得前后2提天的结单数量
     * @return
     */
    public Map getTime();


}
