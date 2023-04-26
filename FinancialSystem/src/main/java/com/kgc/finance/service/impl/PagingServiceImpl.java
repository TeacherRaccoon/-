package com.kgc.finance.service.impl;

import com.kgc.finance.dao.PagingMapper;
import com.kgc.finance.dao.ViewMapper;
import com.kgc.finance.pojo.InfoEntry;
import com.kgc.finance.service.PagingService;
import com.kgc.finance.util.MapUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class PagingServiceImpl implements PagingService {
    @Resource
    private PagingMapper pagingMapper;
    Map<String, Object> map = new HashMap<String, Object>();

    /**
     * 风控人员分页数据，获取记录数
     * @param map
     * @return
     */
    @Override
    public Map businessPagingCount(Map map) {
        Integer count = pagingMapper.businessPagingCount(map);
        if (count > 0) {
            map = MapUtil.encapsulation(true, "查询成功", count);
        } else {
            map = MapUtil.encapsulation(false, "查询失败");
        }
        return map;
    }
    /**
     * 风控人员分页数据，获取数据
     * @param map
     * @return
     */
    @Override
    public Map businessPagingData(Map map) {
        List<InfoEntry> list= pagingMapper.businessPagingData(map);
        if (list.size() > 0) {
            map = MapUtil.encapsulation(true, "查询成功", list);
        } else {
            map = MapUtil.encapsulation(false, "查询失败");
        }
        return map;
    }


    /**
     * 风控员分页数据，获取数据
     * @param map
     * @return
     */
    @Override
    public Map RiskControlPageData(Map map) {
        List<InfoEntry> list= pagingMapper.RiskControlPageData(map);
        if (list.size() >= 0) {
            map = MapUtil.encapsulation(true, "查询成功", list);
        } else {
            map = MapUtil.encapsulation(false, "查询失败");
        }
        return map;
    }

    @Override
    public Map RiskControlCount(Map map) {
        Integer count = pagingMapper.RiskControlCount(map);
        if (count > 0) {
            map = MapUtil.encapsulation(true, "查询成功", count);
        } else {
            map = MapUtil.encapsulation(false, "查询失败");
        }
        return map;
    }
}
