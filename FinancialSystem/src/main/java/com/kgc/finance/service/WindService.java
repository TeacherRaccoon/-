package com.kgc.finance.service;

import java.util.Map;



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
