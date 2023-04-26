package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.ScenicSpotMapper;
import com.example.ctrip.Pojo.ScenicSpot;
import com.example.ctrip.Service.ScenicSpotService;
import com.example.ctrip.util.MapUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Service
public class ScenicSpotServiceImpl implements ScenicSpotService {
    @Resource
    private ScenicSpotMapper scenicSpotMapper;

    @Override
    public Map<String, Object> getScenicSpotById(Integer scenicSpotId) {
        Map result;
        try{
            ScenicSpot scenicSpot=scenicSpotMapper.getScenicSpotById(scenicSpotId);
            if(scenicSpot !=null){
                result= MapUtil.encapsulation("true","查询指定id的ScenicSpot成功",scenicSpot);
            }else {
                result=MapUtil.encapsulation("false","查询指定id的ScenicSpot失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，查询指定id的ScenicSpot失败");
        }
        return result;
    }

    @Override
    public Map<String, Object> getCount() {
        Map result;
        try{
            Integer count=scenicSpotMapper.getCount();
            if(count !=null){
                result= MapUtil.encapsulation("true","查询ScenicSpot总数成功",count);
            }else {
                result=MapUtil.encapsulation("false","查询ScenicSpot总数失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，查询ScenicSpot总数失败");
        }
        return result;
    }

    @Override
    public Map<String, Object> getScenicSpotListByPage(Map map) {
        Map result;
        try{
            List list=scenicSpotMapper.getScenicSpotListByPage(map);
            if(list !=null){
                result= MapUtil.encapsulation("true","分页查询ScenicSpot成功",list);
            }else {
                result=MapUtil.encapsulation("false","分页查询ScenicSpot失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，分页查询ScenicSpot失败");
        }
        return result;
    }

    @Override
    public Map<String, Object> addScenicSpot(ScenicSpot scenicSpot) {
        Map result;
        try{
            Integer num =scenicSpotMapper.addScenicSpot(scenicSpot);
            if(num !=null){
                result= MapUtil.encapsulation("true","添加ScenicSpot成功",num);
            }else {
                result=MapUtil.encapsulation("false","添加ScenicSpot失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，添加ScenicSpot失败");
        }
        return result;
    }

    @Override
    public Map<String, Object> updateScenicSpot(ScenicSpot scenicSpot) {
        Map result;
        try{
            Integer num=scenicSpotMapper.updateScenicSpot(scenicSpot);
            if(num !=null){
                result= MapUtil.encapsulation("true","更新指定id的ScenicSpot成功",num);
            }else {
                result=MapUtil.encapsulation("false","更新指定id的ScenicSpot失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，更新指定id的ScenicSpot失败");
        }
        return result;
    }

    @Override
    public Map<String, Object> delScenicSpotById(Integer scenicSpotId) {
        Map result;
        try{
            Integer num=scenicSpotMapper.delScenicSpotById(scenicSpotId);
            if(num !=null){
                result= MapUtil.encapsulation("true","删除指定id的ScenicSpot成功",num);
            }else {
                result=MapUtil.encapsulation("false","删除指定id的ScenicSpot失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，删除指定id的ScenicSpot失败");
        }
        return result;
    }
}
