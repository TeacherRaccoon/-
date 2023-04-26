package com.kgc.finance.dao;

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
public interface FinanceMapper {
    /**
     * 财务人员分页数据，获取记录数
     * @param map
     * @return
     */
   Integer financePagingCount(Map map);

    /**
     * 财务人员分页数据，获取数据
     * @param map
     * @return
     */
   List<InfoEntry> financePagingData(Map map);



}
