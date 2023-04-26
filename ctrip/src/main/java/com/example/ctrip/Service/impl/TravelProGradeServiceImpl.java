package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.TravelProGradeMapper;
import com.example.ctrip.Pojo.TravelProGrade;
import com.example.ctrip.Service.TravelProGradeService;
import com.example.ctrip.util.MapUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Service
public class TravelProGradeServiceImpl implements TravelProGradeService {

    @Resource
    private TravelProGradeMapper travelProGradeMapper;

    /**
     *
     * @param travelProGradeId
     * @return
     */
    @Override
    public Map<String, Object> getTravelProGrade(Integer travelProGradeId) {
        Map result;
        try{
           TravelProGrade travelProGrade=travelProGradeMapper.getTravelProGrade(travelProGradeId);
           if(travelProGrade !=null){
               result= MapUtil.encapsulation("true","查询TravelProGrade成功",travelProGrade);
           }else {
               result=MapUtil.encapsulation("false","查询TravelProGrade失败");
           }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，查询TravelProGrade失败");
        }
        return result;
    }

    /**
     * 获取总数
     * @return
     */
    @Override
    public Map<String,Object>  getCount(){
        Map result;
        try{
            Integer count=travelProGradeMapper.getCount();
            if(count !=null){
                result= MapUtil.encapsulation("true","查询TravelProGrade总数成功",count);
            }else {
                result=MapUtil.encapsulation("false","查询TravelProGrade总数失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，查询TravelProGrade总数失败");
        }
        return result;
    };

    /**
     * 分页查询
     * @param map
     * @return
     */
    @Override
    public Map<String,Object>  getTravelProGradeListByPage(Map map){
        Map result;
        try{
            List list=travelProGradeMapper.getTravelProGradeListByPage(map);
            if(list !=null){
                result= MapUtil.encapsulation("true","分页查询TravelProGrade成功",list);
            }else {
                result=MapUtil.encapsulation("false","分页查询TravelProGrade失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，分页查询TravelProGrade失败");
        }
        return result;
    };
    /**
     *
     * @param travelProGrade
     * @return
     */
    //@Transactional
    @Override
    public Map<String, Object> addTravelProGrade(TravelProGrade travelProGrade) {
        Map result;
        try{
            Integer num=travelProGradeMapper.addTravelProGrade(travelProGrade);
            if(num==1){
                result= MapUtil.encapsulation("true","添加TravelProGrade成功",num);
            }else {
                result=MapUtil.encapsulation("false","添加TravelProGrade失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，添加TravelProGrade失败");
        }
        return result;
    }

    /**
     *
     * @param travelProGrade
     * @return
     */
    @Transactional
    @Override
    public Map<String, Object> updateTravelProGrade(TravelProGrade travelProGrade) {
        Map result;
        try{
            Integer num=travelProGradeMapper.updateTravelProGrade(travelProGrade);
            if(num==1){
                result= MapUtil.encapsulation("true","更新TravelProGrade成功",num);
            }else {
                result=MapUtil.encapsulation("false","更新TravelProGrade失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，更新TravelProGrade失败");
        }
        return result;
    }

    /**
     *
     * @param travelProGradeId
     * @return
     */
    @Transactional
    @Override
    public Map<String, Object> delTravelProGrade(Integer travelProGradeId) {
        Map result;
        try{
            Integer num=travelProGradeMapper.delTravelProGrade(travelProGradeId);
            if(num==1){
                result= MapUtil.encapsulation("true","删除TravelProGrade成功",num);
            }else {
                result=MapUtil.encapsulation("false","删除TravelProGrade失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，删除TravelProGrade失败");
        }
        return result;
    }
}
