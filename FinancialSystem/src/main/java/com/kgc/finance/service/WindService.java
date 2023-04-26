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

public interface WindService {
    /**
     * 业务员分页数据，获取记录数
     * @param map
     * @return
     */
    Map windPagingCount(Map map);

    /**
     * 业务员分页数据，获取数据
     * @param map
     * @return
     */
    Map windPagingData(Map map);
}
