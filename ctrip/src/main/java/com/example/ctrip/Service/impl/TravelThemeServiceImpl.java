package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.TravelThemeMapper;
import com.example.ctrip.Pojo.TravelTheme;
import com.example.ctrip.Service.TravelThemeService;
import com.example.ctrip.util.MapUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service
public class TravelThemeServiceImpl implements TravelThemeService {
    @Resource
    private TravelThemeMapper travelThemeMapper;


    @Override
    public Map<String, Object> getTravelThemeById(Integer travelThemeId) {
        Map result;
        try{
            TravelTheme travelTheme=travelThemeMapper.getTravelThemeById(travelThemeId);
            if(travelTheme !=null){
                result= MapUtil.encapsulation("true","查询指定id的TravelTheme成功",travelTheme);
            }else {
                result=MapUtil.encapsulation("false","查询指定id的TravelTheme失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，查询指定id的TravelTheme失败");
        }
        return result;
    }

    @Override
    public Map<String, Object> getCount() {
        Map result;
        try{
            Integer count=travelThemeMapper.getCount();
            if(count !=null){
                result= MapUtil.encapsulation("true","查询TravelTheme总数成功",count);
            }else {
                result=MapUtil.encapsulation("false","查询TravelTheme总数失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，查询TravelTheme总数失败");
        }
        return result;
    }

    @Override
    public Map<String, Object> getTravelThemeByPage(Map map) {
        Map result;
        try{
            List list=travelThemeMapper.getTravelThemeByPage(map);
            if(list !=null){
                result= MapUtil.encapsulation("true","分页查询TravelTheme成功",list);
            }else {
                result=MapUtil.encapsulation("false","分页查询TravelTheme失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，分页查询TravelTheme失败");
        }
        return result;
    }
    //@Transactional
    @Override
    public Map<String, Object> addTravelTheme(TravelTheme travelTheme) {
        Map result;
        try{
            Integer num=travelThemeMapper.addTravelTheme(travelTheme);
            if(num !=null){
                result= MapUtil.encapsulation("true","添加TravelTheme成功",num);
            }else {
                result=MapUtil.encapsulation("false","添加TravelTheme失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，添加TravelTheme失败");
        }
        return result;
    }
    //@Transactional
    @Override
    public Map<String, Object> updateTravelTheme(TravelTheme travelTheme) {
        Map result;
        try{
            Integer num=travelThemeMapper.updateTravelTheme(travelTheme);
            if(num !=null){
                result= MapUtil.encapsulation("true","更新指定id的TravelTheme成功",num);
            }else {
                result=MapUtil.encapsulation("false","更新指定id的TravelTheme失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，更新指定id的TravelTheme失败");
        }
        return result;
    }

    //@Transactional
    @Override
    public Map<String, Object> delTravelThemeById(Integer travelThemeId) {
        Map result;
        try{
            Integer num=travelThemeMapper.delTravelTheme(travelThemeId);
            if(num !=null){
                result= MapUtil.encapsulation("true","删除指定id的TravelTheme成功",num);
            }else {
                result=MapUtil.encapsulation("false","删除指定id的TravelTheme失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，删除指定id的TravelTheme失败");
        }
        return result;
    }
}
