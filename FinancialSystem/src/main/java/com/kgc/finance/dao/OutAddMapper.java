package com.kgc.finance.dao;

import com.kgc.finance.pojo.OutAmountInfo;
import com.kgc.finance.service.OutAddService;

import java.util.Map;


public interface OutAddMapper {
    /**
     * 添加一条出款信息
     * @param outAmountInfo
     * @return
     */
    Integer out_add(OutAmountInfo outAmountInfo);

    /**
     * 修改出款信息
     * @param outAmountInfo
     * @return
     */
    Integer out_up(OutAmountInfo outAmountInfo);
    /**
     * 删除出款信息
     * @param outAmountId
     * @return
     */
    Integer out_dele(Integer outAmountId);
}
