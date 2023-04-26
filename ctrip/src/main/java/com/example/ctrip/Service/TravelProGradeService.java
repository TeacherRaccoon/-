package com.example.ctrip.Service;

import com.example.ctrip.Pojo.TravelProGrade;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface TravelProGradeService {
    /**
     * 获取指定id的产品等级评分对象
     * @param travelProGradeId
     * @return
     */
    public Map<String,Object> getTravelProGrade(Integer travelProGradeId);

    /**
     * 获取总数
     * @return
     */
    public Map<String,Object> getCount();

    /**
     * 分页查询
     * @param map
     * @return
     */
    public Map<String,Object>  getTravelProGradeListByPage(Map map);
    /**
     * 添加
     * @param travelProGrade
     * @return
     */
    public Map<String,Object> addTravelProGrade(TravelProGrade travelProGrade);

    /**
     * 更新
     * @param travelProGrade
     * @return
     */
    public Map<String,Object> updateTravelProGrade(TravelProGrade travelProGrade);

    /**
     * 删除
     * @param travelProGradeId
     * @return
     */
    public Map<String,Object> delTravelProGrade(Integer travelProGradeId);

}
