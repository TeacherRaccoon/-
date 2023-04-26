package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.ScenicSpot;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface ScenicSpotMapper {

    /**
     * 获取指定id的景点
     * @param scenicSpotId
     * @return
     */
    public ScenicSpot getScenicSpotById(@Param(value = "id") Integer scenicSpotId);

    /**
     * 获取景点总数
     * @return
     */
    public Integer getCount();

    /**
     * 分页查询景点
     * @param map
     * @return
     */
    public List<ScenicSpot> getScenicSpotListByPage(Map map);

    /**
     * 添加新景点
     * @param scenicSpot
     * @return
     */
    public Integer addScenicSpot(ScenicSpot scenicSpot);

    /**
     * 更新指定id的景点
     * @param scenicSpot
     * @return
     */
    public Integer updateScenicSpot(ScenicSpot scenicSpot);

    /**
     * 删除指定id的景点
     * @param scenicSpotId
     * @return
     */
    public Integer delScenicSpotById(@Param(value = "id") Integer scenicSpotId);

}
