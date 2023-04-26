package com.kgc.finance.service.impl;

import com.kgc.finance.dao.PagingMapper;
import com.kgc.finance.dao.WindMapper;
import com.kgc.finance.pojo.InfoEntry;
import com.kgc.finance.service.PagingService;
import com.kgc.finance.service.WindService;
import com.kgc.finance.util.MapUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class WindServiceImpl implements WindService {
    @Resource
    private WindMapper windMapper;
    Map<String, Object> map = new HashMap<String, Object>();

    /**
     * 业务员分页数据，获取记录数
     * @param map
     * @return
     */
    @Override
    public Map windPagingCount(Map map) {
        Integer count = windMapper.windPagingCount(map);
        if (count >= 0) {
            map = MapUtil.encapsulation(true, "查询成功", count);
        } else {
            map = MapUtil.encapsulation(false, "查询失败");
        }
        return map;
    }
    /**
     * 业务员分页数据，获取数据
     * @param map
     * @return
     */
    @Override
    public Map windPagingData(Map map) {
        List<InfoEntry> list= windMapper.windPagingData(map);
        if (list.size() >= 0) {
            map = MapUtil.encapsulation(true, "查询成功", list);
        } else {
            map = MapUtil.encapsulation(false, "查询失败");
        }
        return map;
    }
}
