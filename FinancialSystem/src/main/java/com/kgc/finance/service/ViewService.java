package com.kgc.finance.service;

import java.util.Map;

/**
 * @program: FinancialSystem
 * @Description: $
 * @Param: $
 * @return: $
 * @Author: xieyongde
 * @Date: 2019-09-17
 */

public interface ViewService {
    /**
     * 查看订单信息
     *
     * @param orderId
     * @return
     */
    Map orderInfo(Integer orderId);

    /**
     * 查看出款信息
     *
     * @param orderId
     * @return
     */
    Map outAmountInfo(Integer orderId);

    /**
     *查看图片
     * @param orderId
     * @return
     */
    Map imgInfo(Integer orderId);

    /**
     * 点击通过，修改订单状态
     * @param orderId
     * @param status
     * @return
     */
    Map alterState(Integer orderId,Integer status,Integer salesmanId,Integer windId,Integer financeId,String returnReson);

    /**
     * 删除订单
     * @param orderId
     * @return
     */
    Map deleteView(Integer orderId);
}
