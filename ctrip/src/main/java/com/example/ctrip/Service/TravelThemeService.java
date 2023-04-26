package com.example.ctrip.Service;

import com.example.ctrip.Pojo.TravelTheme;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface TravelThemeService {
    /**
     * 获取指定id的旅游产品主题
     * @param travelThemeId
     * @return
     */
    public Map<String,Object> getTravelThemeById(Integer travelThemeId);

    /**
     * 获取旅游产品主题的总数
     * @return
     */
    public Map<String,Object> getCount();

    /**
     * 分页查询所有旅游产品主题
     * @param map
     * @return
     */
    public Map<String,Object> getTravelThemeByPage(Map map);

    /**
     * 添加新的旅游产品主题
     * @param travelTheme
     * @return
     */
    public Map<String,Object> addTravelTheme(TravelTheme travelTheme);

    /**
     * 修改指定id的旅游产品主题
     * @param travelTheme
     * @return
     */
    public Map<String,Object> updateTravelTheme(TravelTheme travelTheme);

    /**
     * 删除指定id的旅游产品主题
     * @param travelThemeId
     * @return
     */
    public Map<String,Object> delTravelThemeById(Integer travelThemeId);
}
