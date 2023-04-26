package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.City;
import com.example.ctrip.Pojo.Img;
import com.example.ctrip.Pojo.TravelProduct;
import com.example.ctrip.Pojo.TravelProductInventory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface TravelProductMapper {
    /**
     * 获取指定id的产品
     * @param id
     * @param departCityName
     * @return
     */
    TravelProduct getProductById(@Param(value = "departCityName") String departCityName, @Param(value = "id") Integer id);

    /**
     * 根据产品主题查询所有产品；例：跟团游、自由行
     * @param travelProductType
     * @return
     */
     List<TravelProduct> getProductListByTheme(String travelProductType);

    /**
     * 根据景点名查询相关产品；多表联查，获取包含该景点的产品id
     * @param sciSpotName
     * @return
     */
     List<TravelProduct> getProductListBySciSpot(String sciSpotName);

    /**
     * 根据目的地名查询所有产品
     * @param cityName
     * @param cityId
     * @param departCityName
     * @return
     */
     List<TravelProduct> getProductListByCity(@Param(value = "id") Integer cityId,
                                                    @Param(value = "cityName") String cityName,
                                                    @Param(value = "departCityName") String departCityName,
                                                    @Param(value = "num") Integer num);

    /**
     * 根据供应商名查询其所有产品
     * @param providerName
     * @return
     */
    List<TravelProduct> getProductListByProvider(String providerName);

    /**
     * 根据行程天数查询所有产品
     * @param daysTrip
     * @return
     */
     List<TravelProduct> getProductListByDaysTrip(String daysTrip);
    /**
     * 根据产品钻级查询所有产品
     * @param productLevel
     * @return
     */
     List<TravelProduct> getProductListByLevel(String productLevel);

    /**
     * 根据产品特色查询所有产品
     * @param productFeature
     * @return
     */
     List<TravelProduct> getProductListByProductFeature(String productFeature);

    /**
     * 根据产品的相关服务保障查询所有产品
     * @return
     */
     List<TravelProduct> getProductListByServiceAss(String serviceAssName);

    /**
     * 产品页面高级搜索功能；条件包括：（关键字、主题、目的地）、出发日期（查询在指定日期内，有库存的产品）、价格范围、天数等
     * @param map
     * @return
     */
     List<TravelProduct> getProductListByAdvanceSearch(Map map);
    /**
     * 多条件查询满足条件的所有产品；关键字、主题、目的地、游玩线路、出发日期（暂时不实现）、出发城市、供应商、价格区间、排序、limit查询
     * @param map
     * @return
     */
    List<TravelProduct> getProductListByCondition(Map map);

    /**
     * 多条件分页查询满足条件的所有产品
     * @param map
     * @return
     */
     List<TravelProduct> getProductListByPage(Map map);

    /**
     * 添加新的产品
     * @param travelProduct
     * @return
     */
     Integer addProduct(TravelProduct travelProduct);

    /**
     * 更新指定id的产品信息
     * @param travelProduct
     * @return
     */
     Integer updateProduct(TravelProduct travelProduct);

    /**
     * 删除指定id的产品
     * @param id
     * @return
     */
     Integer delProductById(Integer id);

    /**
     * 获取城市列表
     * @return
     */
     List<City> getCity();

    /**
     * 旅游首页
     * @param distinationName
     * @param departCityName
     * @param num
     * @return
     */
    List<TravelProduct> getTravelProductToShouYe(@Param(value = "distinationName") String distinationName,
                                                        @Param(value = "departCityName") String departCityName,
                                                        @Param(value = "num")Integer num);

    /**
     * 随机获取指定个数的城市
     * @param num
     * @param cityIdList
     * @return
     */
    List<City> getRandomCity(@Param(value = "cityIdList") List<Integer> cityIdList, Integer num);

    /**
     * 获取指定类型的所有照片的集合
     * @return
     */
    List<Img> getImgList(int imgType);

    /**
     * 根据多条件查询产品库存：起使日期、结束日期、产品id
     * @param map
     * @return
     */
    List<TravelProductInventory> getProductInventoryByMap(Map map);

}
