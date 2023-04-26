package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.TravelProviderMapper;
import com.example.ctrip.Pojo.TravelProvider;
import com.example.ctrip.Service.TravelProviderService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class TravelProviderServiceImpl implements TravelProviderService {
    @Resource
    private TravelProviderMapper travelProviderMapper;
    /**
     * 获取指定id的供应商
     * @param id
     * @return
     */
    @Override
    public Map<String, Object> getProviderById(Integer id) {
        //存储查询结果
        Map result=new HashMap();
        try{
            //调用dao层接口
            TravelProvider travelProvider=travelProviderMapper.getProviderById(id);
            //判断是否为空
            if(travelProvider !=null){
                result.put("result",true);
                result.put("data",travelProvider);
                result.put("mes","查询指定供应商");
            }else{
                result.put("result",false);
                result.put("mes","查询指定供应商失败");
            }
        }catch (Exception e){
            result.put("result",false);
            result.put("mes","程序异常，查询指定供应商失败");
        }
        return result;
    }
    /**
     * 获取满足map集合中条件的供应商集合
     * @param map
     * @return
     */
    @Override
    public Map<String, Object> getProviderByCondition(Map map) {
        //存储查询结果
        Map result=new HashMap();
        List<TravelProvider> list=new ArrayList<>();
        try{
            //调用dao层接口
            list=travelProviderMapper.getProviderByCondition(map);
            //判断是否为空
            if(list.size()<1){
                result.put("result",true);
                result.put("data",list);
                result.put("mes","查询对应的供应商");
            }else{
                result.put("result",false);
                result.put("mes","查询供应商失败");
            }
        }catch (Exception e){
            result.put("result",false);
            result.put("mes","程序异常，查询供应商失败");
        }
        return result;
    }
    /**
     * 分页查询，查询条件包括页码，页容量和其他条件
     * @param map
     * @return
     */
    @Override
    public Map<String, Object> getProviderByPage(Map map) {
        //存储查询结果
        Map result=new HashMap();
        List<TravelProvider> list=new ArrayList<>();
        try{
            //调用dao层接口
            list=travelProviderMapper.getProviderByPage(map);
            //判断是否为空
            if(list.size()<1){
                result.put("result",true);
                result.put("data",list);
                result.put("mes","查询供应商成功");
            }else{
                result.put("result",false);
                result.put("mes","查询供应商失败");
            }
        }catch (Exception e){
            result.put("result",false);
            result.put("mes","程序异常，查询供应商失败");
        }
        return result;
    }
    /**
     * 添加供应商
     * @param travelProvider
     * @return
     */
    @Override
    public Map<String, Object> addProvider(TravelProvider travelProvider) {
        //存储查询结果
        Map result=new HashMap();
        try{
            //调用dao层接口
            Integer num=travelProviderMapper.addProvider(travelProvider);
            //判断是否为空
            if(num==1){
                result.put("result",true);
                result.put("mes","添加供应商成功");
            }else{
                result.put("result",false);
                result.put("mes","添加供应商失败");
            }
        }catch (Exception e){
            result.put("result",false);
            result.put("mes","程序异常，添加供应商失败");
        }
        return result;
    }
    /**
     * 更新供应商信息
     * @param travelProvider
     * @return
     */
    @Override
    public Map<String, Object> updateProvider(TravelProvider travelProvider) {
        //存储查询结果
        Map result=new HashMap();
        try{
            //调用dao层接口
            Integer num=travelProviderMapper.updateProvider(travelProvider);
            //判断是否为空
            if(num==1){
                result.put("result",true);
                result.put("mes","成功更新供应商信息");
            }else{
                result.put("result",false);
                result.put("mes","供应商信息更新失败");
            }
        }catch (Exception e){
            result.put("result",false);
            result.put("mes","程序异常，更新供应商信息失败");
        }
        return result;
    }
    /**
     * 删除指定id的供应商
     * @param id
     * @return
     */
    @Override
    public Map<String, Object> delProviderById(Integer id) {
        //存储查询结果
        Map result=new HashMap();
        try{
            //调用dao层接口
            Integer num=travelProviderMapper.delProviderById(id);
            //判断是否为空
            if(num==1){
                result.put("result",true);
                result.put("mes","成功删除指定供应商");
            }else{
                result.put("result",false);
                result.put("mes","删除指定供应商失败");
            }
        }catch (Exception e){
            result.put("result",false);
            result.put("mes","程序异常，删除供应商失败");
        }
        return result;
    }
}
