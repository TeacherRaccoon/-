package com.kgc.finance.dao;

import com.kgc.finance.pojo.InfoEntry;

import java.util.List;
import java.util.Map;

public interface PagingMapper {
    /**
     * 业务员分页数据，获取记录数
     * @param map
     * @return
     */
   Integer businessPagingCount(Map map);

    /**
     * 业务员分页数据，获取数据
     * @param map
     * @return
     */
   List<InfoEntry> businessPagingData(Map map);


    /**
     * 风控员分页数据，获取数据
     * @param map
     * @return
     */
    List<InfoEntry> RiskControlPageData(Map map);

    /**
     * 风控员分页数据，获取记录数
     * @param map
     * @return
     */
    Integer RiskControlCount(Map map);
}
