package com.kgc.finance.service.impl;

import com.kgc.finance.dao.FinanceMapper;
import com.kgc.finance.dao.WindMapper;
import com.kgc.finance.pojo.InfoEntry;
import com.kgc.finance.service.FinanceService;
import com.kgc.finance.service.WindService;
import com.kgc.finance.util.MapUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
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
@Service
public class FinanceServiceImpl implements FinanceService {
    @Resource
    private FinanceMapper financeMapper;
    Map<String, Object> map = new HashMap<String, Object>();

    /**
     * 财务分页数据，获取记录数
     * @param map
     * @return
     */
    @Override
    public Map financePagingCount(Map map) {
        Integer count = financeMapper.financePagingCount(map);
        if (count >= 0) {
            map = MapUtil.encapsulation(true, "查询成功", count);
        } else {
            map = MapUtil.encapsulation(false, "查询失败");
        }
        return map;
    }
    /**
     * 财务分页数据，获取数据
     * @param map
     * @return
     */
    @Override
    public Map financePagingData(Map map) {
        List<InfoEntry> list= financeMapper.financePagingData(map);
        if (list.size() >=0) {
            map = MapUtil.encapsulation(true, "查询成功", list);
        } else {
            map = MapUtil.encapsulation(false, "查询失败");
        }
        return map;
    }
}
