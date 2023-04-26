package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.TravelProductMapper;
import com.example.ctrip.Pojo.Img;
import com.example.ctrip.Pojo.TravelProduct;
import com.example.ctrip.Pojo.TravelProductInventory;
import com.example.ctrip.Service.TravelProductService;
import com.example.ctrip.util.MapUtil;
import com.example.ctrip.util.RedisUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
public class TravelProductServiceImpl implements TravelProductService {

    @Resource
    private TravelProductMapper travelProductMapper;
    @Resource
    private RedisUtil redisUtil;


    @Override
    public Map<String, Object> getProductById(String departCityName,Integer id) {
        Map result;
        String name="getProductById:"+departCityName+":"+id;
            //redisUtil.del(name);
            //TravelProduct travelProduct= (TravelProduct) redisUtil.get(name);
            //if(travelProduct==null){
        TravelProduct  travelProduct=travelProductMapper.getProductById(departCityName,id);
                if(travelProduct !=null){
                    //redisUtil.set(name,travelProduct);
                    result=MapUtil.encapsulation("true","查询指定旅游产品成功",travelProduct);
                }else{
                    result=MapUtil.encapsulation("false","查询指定旅游产品失败");
                }
            //}else{
               // result=MapUtil.encapsulation("true","查询指定旅游产品成功",travelProduct);
           // }


        return result;
    }

    @Override
    public Map<String, Object> getProductListByTheme(String productTheme) {
        String name="getProductListByTheme:productTheme:"+productTheme;
        Map result;
        //List list= (List) redisUtil.get(name);

        //if(list.size()<1){
        List list=travelProductMapper.getProductListByTheme(productTheme);
            if(list !=null){
                result=MapUtil.encapsulation("true","查询指定主题旅游产品成功",list);
            }else{
                result=MapUtil.encapsulation("false","查询指定主题旅游产品失败");
            }
       // }else{
           // result=MapUtil.encapsulation("true","查询指定主题旅游产品成功",list);
        //}
        return result;
    }

    @Override
    public Map<String, Object> getProductListBySciSpot(String sciSpotName) {
        String name="getProductListBySciSpot:sciSpotName:"+sciSpotName;
        Map result;
        //List list= (List) redisUtil.get(name);
        //if(list==null){
        List list=travelProductMapper.getProductListBySciSpot(sciSpotName);
            if(list.size()>0){
                //redisUtil.set(name,list);
                result=MapUtil.encapsulation("true","查询旅游产品成功",list);
            }else{
                result=MapUtil.encapsulation("false","查询旅游产品失败");
            }
       // }else{
           // result=MapUtil.encapsulation("true","查询旅游产品成功",list);
        //}

        return result;
    }

    @Override
    public Map<String, Object> getProductListByCity(Integer cityId,String cityName,String departCityName,Integer num) {

        String name="getProductListByCity:"+departCityName+":"+cityName;
        System.out.println(cityName+";"+departCityName);
        Map result;
       // List<TravelProduct> list= (List)redisUtil.get(name);
       // if(list==null){
        List list=travelProductMapper.getProductListByCity(cityId,cityName,departCityName,num);
            if(list.size()>0){
                //redisUtil.set(name,list);
                result=MapUtil.encapsulation("true","查询旅游产品成功",list);
            }else{
                result=MapUtil.encapsulation("false","查询旅游产品失败");
            }
       // }else{
        //    result=MapUtil.encapsulation("true","查询旅游产品成功",list);
        //}

        return result;
    }

    @Override
    public Map<String, Object> getProductListByProvider(String providerName) {
        String name="getProductListByProvider:providerName:"+providerName;
        Map result;
       // List list= (List) redisUtil.get(name);
        //if(list==null){
        List list=travelProductMapper.getProductListByProvider(providerName);
            if(list !=null){
               // redisUtil.set(name,list);
                result=MapUtil.encapsulation("true","查询指定主题旅游产品成功",list);
            }else{
                result=MapUtil.encapsulation("false","查询指定主题旅游产品失败");
            }
        //}else{
           // result=MapUtil.encapsulation("true","查询指定主题旅游产品成功",list);
      //  }

        return result;
    }

    @Override
    public Map<String, Object> getProductListByDaysTrip(String daysTrip) {
        System.out.println("业务层："+daysTrip);
        Map result;
            List list=travelProductMapper.getProductListByDaysTrip(daysTrip);
            if(list.size()>0){
                result=MapUtil.encapsulation("true","查询指定日程旅游产品成功",list);
            }else{
                result=MapUtil.encapsulation("false","查询指定日程旅游产品失败");
            }
        return result;
    }

    @Override
    public Map<String, Object> getProductListByLevel(String productLevel) {
        Map result;
            List list=travelProductMapper.getProductListByLevel(productLevel);
            System.out.println(list.toArray().toString());
            if(list.size()>0){
                result=MapUtil.encapsulation("true","查询指定钻级旅游产品成功",list);
            }else{
                result=MapUtil.encapsulation("false","查询指定钻级旅游产品失败");
            }
        return result;
    }

    @Override
    public Map<String, Object> getProductListByProductFeature(String productFeature) {
        Map result;
            List list=travelProductMapper.getProductListByProductFeature(productFeature);
            if(list.size()>0){
                result=MapUtil.encapsulation("true","查询旅游产品成功",list);
            }else{
                result=MapUtil.encapsulation("false","查询旅游产品失败");
            }
        return result;
    }

    @Override
    public Map<String, Object> getProductListByServiceAss(String serviceAssName) {
        Map result;
            List list=travelProductMapper.getProductListByServiceAss(serviceAssName);
            if(list !=null){
                result=MapUtil.encapsulation("true","查询旅游产品成功",list);
            }else{
                result=MapUtil.encapsulation("false","查询旅游产品失败");
            }
        return result;
    }

    @Override
    public Map<String, Object> getProductListByAdvanceSearch(Map map) {
        return null;
    }

    @Override
    public Map<String, Object> getProductListByCondition(Map map) {
        return null;
    }

    @Override
    public Map<String, Object> getProductListByPage(Map map) {
        return null;
    }


    @Override
    public Map<String, Object> addProduct(TravelProduct travelProduct) {
        Map result;
            Integer num=travelProductMapper.addProduct(travelProduct);
            if(num==1){
                result=MapUtil.encapsulation("true","添加旅游产品成功",num);
            }else{
                result=MapUtil.encapsulation("false","添加旅游产品失败");
            }
        return result;
    }

    @Override
    public Map<String, Object> updateProduct(TravelProduct travelProduct) {
        Map result;
            Integer num=travelProductMapper.updateProduct(travelProduct);
            if(num==1){
                result=MapUtil.encapsulation("true","更新旅游产品成功",num);
            }else{
                result=MapUtil.encapsulation("false","更新旅游产品失败");
            }
        return result;
    }

    @Override
    public Map<String, Object> delProductById(Integer id) {
        Map result;
            Integer num=travelProductMapper.delProductById(id);
            if(num==1){
                result=MapUtil.encapsulation("true","删除旅游产品成功",num);
            }else{
                result=MapUtil.encapsulation("false","删除旅游产品失败");
            }
            result=MapUtil.encapsulation("false","程序异常，删除旅游产品失败");
        return result;
    }

    @Override
    public Map<String, Object> getCity(String cityIdList, Integer num) {
        Map result;
        List cityList;
            //获取指定id的城市
            if(cityIdList !=null && num !=null){
                String[] cityId=cityIdList.substring(cityIdList.indexOf("[")+1,cityIdList.indexOf("]")).split(",");
                List<Integer> list=new ArrayList();
                for (int i=0;i<cityId.length;i++) {
                    list.add(new Integer(cityId[i]));
                }
                String name="getRandomCity";
                //cityList= (List) redisUtil.get(name);
                //if(cityList==null){
                    cityList=travelProductMapper.getRandomCity(list,num);
                   // redisUtil.set(name,cityList);
                //}
            }else{
                //推荐热门城市
                String name="getCity";
                //cityList= (List) redisUtil.get(name);
                //System.out.println("cityList是否为空:"+cityList);
                //if(cityList==null){
                    cityList=travelProductMapper.getCity();
                    //redisUtil.set(name,cityList);
                //}
            }

            if(cityList!=null){
                result=MapUtil.encapsulation("true","获取城市成功",cityList);
            }else{
                result=MapUtil.encapsulation("false","获取城市失败");
            }
        return result;
    }

    @Override
    public Map<String, Object> getTravelProductToShouYe(String distinationName, String departCityName ,Integer num) {
        String name="String distinationName:"+departCityName+":"+departCityName;
        Map result;
           // List list= (List) redisUtil.get(name);
        //if(list.size()<1){
            List list=travelProductMapper.getTravelProductToShouYe(distinationName,departCityName,num);
            if(list.size()>0){
                //redisUtil.set(name,list);
                result=MapUtil.encapsulation("true","获取旅游产品成功",list);
            }else{
                result=MapUtil.encapsulation("false","获取旅游产品失败");
            }
       // }else {
         //   result=MapUtil.encapsulation("false","获取旅游产品失败");
        //}

        return result;
    }
    /**
     * 根据多条件查询产品库存：起使日期、结束日期、产品id
     * @param map
     * @return
     */
    public Map getProductInventoryByMap(Map map){
        System.out.println(map.get("startTime"));
        Map result;
        List list=travelProductMapper.getProductInventoryByMap(map);
        if(list.size()>0){
            result=MapUtil.encapsulation("true","获取旅游产品库存成功",list);
        }else{
            result=MapUtil.encapsulation("false","获取旅游产品库存失败");
        }
        return result;
    };
}
