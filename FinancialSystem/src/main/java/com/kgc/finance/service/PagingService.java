package com.kgc.finance.service;

import com.kgc.finance.pojo.InfoEntry;

import java.util.List;
import java.util.Map;

/**
 * @program: demo
 * @Description: $
 * @Param: $
 * @return: $
 * @Author: xieyongde
 * @Date: 2019-09-20
 */

public interface PagingService {
    /**
     * 风控人员分页数据，获取记录数
     * @param map
     * @return
     */
    Map businessPagingCount(Map map);

    /**
     * 风控人员分页数据，获取数据
     * @param map
     * @return
     */
    Map businessPagingData(Map map);


    /**
     * 风控员分页数据，获取数据
     * @param map
     * @return
     */
    Map RiskControlPageData(Map map);

    /**
     * 风控员分页数据，获取记录数
     * @param map
     * @return
     */
    Map RiskControlCount(Map map);
}
