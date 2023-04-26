package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.TravelProvider;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
public interface TravelProviderMapper {
    /**
     * 获取指定id的供应商
     * @param id
     * @return
     */
    public TravelProvider getProviderById(Integer id);

    /**
     * 获取满足map集合中条件的供应商集合
     * @param map
     * @return
     */
    public List<TravelProvider> getProviderByCondition(Map map);

    /**
     * 分页查询，查询条件包括页码，页容量和其他条件
     * @param map
     * @return
     */
    public List<TravelProvider> getProviderByPage(Map map);

    /**
     * 添加供应商
     * @param travelProvider
     * @return
     */
    public Integer addProvider(TravelProvider travelProvider);

    /**
     * 更新供应商信息
     * @param travelProvider
     * @return
     */
    public Integer updateProvider(TravelProvider travelProvider);

    /**
     * 删除指定id的供应商
     * @param id
     * @return
     */
    public Integer delProviderById(Integer id);
}
