package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.TravelProGrade;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface TravelProGradeMapper {
    /**
     * 获取指定id的产品等级评分对象
     * @param travelProGradeId
     * @return
     */
    public TravelProGrade getTravelProGrade(@Param(value = "id") Integer travelProGradeId);

    /**
     * 获取总数
     * @return
     */
    public Integer getCount();

    /**
     * 分页查询
     * @param map
     * @return
     */
    public List<TravelProGrade> getTravelProGradeListByPage(Map map);

    /**
     * 添加
     * @param travelProGrade
     * @return
     */
    public Integer addTravelProGrade(TravelProGrade travelProGrade);

    /**
     * 更新
     * @param travelProGrade
     * @return
     */
    public Integer updateTravelProGrade(TravelProGrade travelProGrade);

    /**
     * 删除
     * @param travelProGradeId
     * @return
     */
    public Integer delTravelProGrade(@Param(value = "id") Integer travelProGradeId);

}
