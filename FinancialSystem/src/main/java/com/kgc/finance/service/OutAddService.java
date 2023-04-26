package com.kgc.finance.service;

import com.kgc.finance.pojo.OutAmountInfo;

import java.util.Map;

/**
 * @program: demo
 * @Description: $
 * @Param: $
 * @return: $
 * @Author: xieyongde
 * @Date: 2019-09-20
 */

public interface OutAddService {
    /**
     * 添加一条出款信息
     * @param outAmountInfo
     * @return
     */
    Map out_add(OutAmountInfo outAmountInfo);
    /**
     * 修改出款信息
     * @param outAmountInfo
     * @return
     */
    Map out_up(OutAmountInfo outAmountInfo);
    /**
     * 删除出款信息
     * @param outAmountId
     * @return
     */
    Map out_dele(Integer outAmountId);
}
