package com.kgc.finance.service;

import java.util.Map;

/**
 * @program: demo
 * @Description: $
 * @Param: $
 * @return: $
 * @Author: xieyongde
 * @Date: 2019-09-20
 */

public interface FinanceService {
    /**
     * 财务分页数据，获取记录数
     * @param map
     * @return
     */
    Map financePagingCount(Map map);

    /**
     * 财务分页数据，获取数据
     * @param map
     * @return
     */
    Map financePagingData(Map map);
}
