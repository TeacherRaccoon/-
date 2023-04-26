package com.example.ctrip.Service;

import com.example.ctrip.Pojo.TravelProvider;

import java.util.Map;

public interface TravelProviderService {
    /**
     * 获取指定id的供应商
     * @param id
     * @return
     */
    public Map<String,Object> getProviderById(Integer id);

    /**
     * 获取满足map集合中条件的供应商集合
     * @param map
     * @return
     */
    public Map<String,Object> getProviderByCondition(Map map);

    /**
     * 分页查询，查询条件包括页码，页容量和其他条件
     * @param map
     * @return
     */
    public Map<String,Object> getProviderByPage(Map map);

    /**
     * 添加供应商
     * @param travelProvider
     * @return
     */
    public Map<String,Object> addProvider(TravelProvider travelProvider);

    /**
     * 更新供应商信息
     * @param travelProvider
     * @return
     */
    public Map<String,Object> updateProvider(TravelProvider travelProvider);

    /**
     * 删除指定id的供应商
     * @param id
     * @return
     */
    public Map<String,Object> delProviderById(Integer id);
}
