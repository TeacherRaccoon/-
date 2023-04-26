package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.TravelTheme;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface TravelThemeMapper {
    /**
     * 获取指定id的旅游产品主题
     * @param travelThemeId
     * @return
     */
    public TravelTheme getTravelThemeById(@Param(value = "id") Integer travelThemeId);

    /**
     * 获取旅游产品主题的总数
     * @return
     */
    public Integer getCount();

    /**
     * 分页查询所有旅游产品主题
     * @param map
     * @return
     */
    public List<TravelTheme> getTravelThemeByPage(Map map);

    /**
     * 添加新的旅游产品主题
     * @param travelTheme
     * @return
     */
    public Integer addTravelTheme(TravelTheme travelTheme);

    /**
     * 修改指定id的旅游产品主题
     * @param travelTheme
     * @return
     */
    public Integer updateTravelTheme(TravelTheme travelTheme);

    /**
     * 删除指定id的旅游产品主题
     * @param travelThemeId
     * @return
     */
    public Integer delTravelTheme(@Param(value = "id")Integer travelThemeId);
}
