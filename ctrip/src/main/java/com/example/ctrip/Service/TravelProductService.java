package com.example.ctrip.Service;

import com.example.ctrip.Pojo.Img;
import com.example.ctrip.Pojo.ScenicSpot;
import com.example.ctrip.Pojo.TravelProduct;
import com.example.ctrip.Pojo.TravelProductInventory;

import java.util.Arrays;
import java.util.List;
import java.util.Map;


public interface TravelProductService {
    /**
     * 获取指定id的产品
     * @param id
     * @param departCityName
     * @return
     */
    public Map<String,Object> getProductById(String departCityName,Integer id);

    /**
     * 根据产品主题查询所有产品；例：跟团游、自由行
     * @param productTheme
     * @return
     */
    public Map<String,Object> getProductListByTheme(String productTheme);

    /**
     * 根据景点名查询相关产品；多表联查，获取包含该景点的产品id
     * @param sciSpotName
     * @return
     */
    public Map<String,Object> getProductListBySciSpot(String sciSpotName);

    /**
     * 根据目的地名查询所有产品
     * @param cityName
     * @param cityId
     * @param departCityName
     * @param num
     * @return
     */
    public Map<String,Object> getProductListByCity(Integer cityId ,String cityName,String departCityName,Integer num);

    /**
     * 根据供应商名查询其所有产品
     * @param providerName
     * @return
     */
    public Map<String,Object> getProductListByProvider(String providerName);

    /**
     * 根据行程天数查询所有产品
     * @param daysTrip
     * @return
     */
    public Map<String,Object> getProductListByDaysTrip(String daysTrip);
    /**
     * 根据产品钻级查询所有产品
     * @param productLevel
     * @return
     */
    public Map<String,Object> getProductListByLevel(String productLevel);

    /**
     * 根据产品特色查询所有产品
     * @param productFeature
     * @return
     */
    public Map<String,Object> getProductListByProductFeature(String productFeature);

    /**
     * 根据产品的相关服务保障查询所有产品
     * @return
     */
    public Map<String,Object> getProductListByServiceAss(String serviceAssName);

    /**
     * 产品页面高级搜索功能；条件包括：（关键字、主题、目的地）、出发日期（查询在指定日期内，有库存的产品）、价格范围、天数等
     * @param map
     * @return
     */
    public Map<String,Object> getProductListByAdvanceSearch(Map map);
    /**
     * 多条件查询满足条件的所有产品；关键字、主题、目的地、游玩线路、出发日期（暂时不实现）、出发城市、供应商、价格区间
     * @param map
     * @return
     */
    public Map<String,Object> getProductListByCondition(Map map);

    /**
     * 多条件分页查询满足条件的所有产品
     * @param map
     * @return
     */
    public Map<String,Object> getProductListByPage(Map map);

    /**
     * 添加新的产品
     * @param travelProduct
     * @return
     */
    public Map<String,Object> addProduct(TravelProduct travelProduct);

    /**
     * 更新指定id的产品信息
     * @param travelProduct
     * @return
     */
    public Map<String,Object> updateProduct(TravelProduct travelProduct);

    /**
     * 删除指定id的产品
     * @param id
     * @return
     */
    public Map<String,Object> delProductById(Integer id);

    /**
     * 获取数据库中所有的城市
     * @param cityIdList
     * @param num
     * @return
     */
    public Map<String,Object> getCity(String cityIdList, Integer num);

    /**
     * 旅游首页
     * @param distinationName
     * @param departCityName
     * @return
     */
    public Map<String,Object> getTravelProductToShouYe(String distinationName, String departCityName,Integer num);
    /**
     * 根据多条件查询产品库存：起使日期、结束日期、产品id
     * @param map
     * @return
     */
    public Map getProductInventoryByMap(Map map);

}
