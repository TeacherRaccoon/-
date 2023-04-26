package com.example.ctrip.Controller;

import com.alibaba.fastjson.JSON;
import com.example.ctrip.Pojo.TravelProduct;
import com.example.ctrip.Pojo.TravelProductVO;
import com.example.ctrip.Service.TravelProductService;
import com.example.ctrip.util.MapUtil;
import com.example.ctrip.util.SolrDocumentListToTravelProductVO;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.Group;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.apache.solr.client.solrj.response.GroupResponse;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.params.GroupParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/product")
public class TravelProductController {

    private String coreName = "ctrip-travelProduct";

    @Autowired
    private SolrClient client;
    @Resource
    private TravelProductService travelProductService;

    /**
     * 获取城市
     * @param cityIdList
     * @param num
     * @return
     */
    @RequestMapping("/getHotCity")
    public Map getCityByCityList(String cityIdList, Integer num){
        return travelProductService.getCity(cityIdList,num);
    }
    /**
     * 获取指定id的产品
     * @param id
     * @return
     */
    @RequestMapping("/getProductById")
    public Map<String,Object> getProductById(String departCityName,Integer id){
        return travelProductService.getProductById(departCityName,id);
    };

    /**
     * 根据产品主题查询所有产品；例：跟团游、自由行
     * @param productTheme
     * @return
     */
    @RequestMapping("/getProductByType")
    public Map<String,Object> getProductListByTheme(String productTheme){
        return travelProductService.getProductListByTheme(productTheme);
    };

    /**
     * 根据景点名查询相关产品；多表联查，获取包含该景点的产品id
     * @param sciSpotName
     * @return
     */
    public Map<String,Object> getProductListBySciSpot(String sciSpotName){
        return travelProductService.getProductListBySciSpot(sciSpotName);
    };

    /**
     * 根据目的地名查询所有产品
     * @param cityName
     * @param cityId
     * @param departCityName
     * @return
     */
    @RequestMapping("/getProductByCity")
    public Map<String,Object> getProductListByCity(Integer cityId,String cityName ,String departCityName,Integer num){
        return travelProductService.getProductListByCity(cityId,cityName,departCityName,num);
    };

    /**
     * 根据供应商名查询其所有产品
     * @param providerName
     * @return
     */
    public Map<String,Object> getProductListByProvider(String providerName){
        return travelProductService.getProductListByProvider(providerName);
    };

    /**
     * 根据行程天数查询所有产品
     * @param daysTrip
     * @return
     */
    @RequestMapping("/getProductByDays")
    public Map<String,Object> getProductListByDaysTrip(String daysTrip){
        System.out.println("控制器："+daysTrip);
        return travelProductService.getProductListByDaysTrip(daysTrip);
    };
    /**
     * 根据产品钻级查询所有产品
     * @param productLevel
     * @return
     */
    @RequestMapping("/getProByLevel")
    public Map<String,Object> getProductListByLevel(String productLevel){
        return travelProductService.getProductListByLevel(productLevel);
    };

    /**
     * 根据产品特色查询所有产品
     * @param productFeature
     * @return
     */
    public Map<String,Object> getProductListByProductFeature(String productFeature){
        return travelProductService.getProductListByProductFeature(productFeature);
    };

    /**
     * 根据产品的相关服务保障查询所有产品
     * @return
     */
    public Map<String,Object> getProductListByServiceAss(String serviceAssName){
        return travelProductService.getProductListByServiceAss(serviceAssName);
    };

    /**
     * 产品页面高级搜索功能；条件包括：（关键字、主题、目的地）、出发日期（查询在指定日期内，有库存的产品）、价格范围、天数等
     * @param map
     * @return
     */
    public Map<String,Object> getProductListByAdvanceSearch(Map map){
        return travelProductService.getProductListByAdvanceSearch(map);
    };
    /**
     * 多条件查询满足条件的所有产品；关键字、主题、目的地、游玩线路、出发日期（暂时不实现）、出发城市、供应商、价格区间
     * @param map
     * @return
     */
    public Map<String,Object> getProductListByCondition(Map map){
        return getProductListByCondition(map);
    };

    /**
     * 多条件分页查询满足条件的所有产品
     * @param map
     * @return
     */
    public Map<String,Object> getProductListByPage(Map map){
        return  travelProductService.getProductListByPage(map);
    };

    /**
     * 添加新的产品
     * @param travelProduct
     * @return
     */
    public Map<String,Object> addProduct(TravelProduct travelProduct){
        return travelProductService.addProduct(travelProduct);
    };

    /**
     * 更新指定id的产品信息
     * @param travelProduct
     * @return
     */
    public Map<String,Object> updateProduct(TravelProduct travelProduct){
        return travelProductService.updateProduct(travelProduct);
    };

    /**
     * 删除指定id的产品
     * @param id
     * @return
     */
    public Map<String,Object> delProductById(Integer id){
        return travelProductService.delProductById(id);
    };



    /**
     * 旅游首页
     * @param distinationName
     * @param departCityName
     *
     * @return
     */
    @RequestMapping("/shouye")
    @ResponseBody
    public Map<String,Object> getTravelProductToShouYe(String distinationName, String departCityName,Integer num){
        return travelProductService.getTravelProductToShouYe(distinationName,departCityName,num);
    };

    @RequestMapping("/getAllInv")
    @ResponseBody
    public Map<String,Object> getProductInventoryByMap(String startTime,String endTime,Integer productId){
        Map map=new HashMap();
        DateFormat format=new SimpleDateFormat("yyyy-MM-dd");
        try {
            map.put("startTime",format.parse(startTime));
            map.put("endTime",format.parse(endTime));
            map.put("productId",productId);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return travelProductService.getProductInventoryByMap(map);
    }

    /**
     *
     * @param q
     * @param pageIndex
     * @param pageSize
     * @return
     */
    @RequestMapping("/search")
    public Map<String,Object> search(String q,Integer pageIndex,Integer pageSize,String travelRoute,String daysTrip,
                                     String productLevel,String departCityName,String travelProductType,String providerAbb,
                                     String priceRange,String sortType) {
        Map result;
        System.out.println("productLevel:"+productLevel+"\ndepartCityName:"+departCityName+"\ntravelProductType:"
                +travelProductType+"\nproviderAbb:"+providerAbb+"\npriceRange:"+priceRange+"\nsortType:"+sortType);
        try {
            SolrQuery params = new SolrQuery();
            //查询条件, 这里的 q 对应 下面图片标红的地方
            params.set("q","keyword:"+q);

            //过滤条件
            if(travelRoute!=null && travelRoute!=""){
                params.addFilterQuery("travelRoute:"+travelRoute);
            }
            if(daysTrip!=null && daysTrip!=""){
                params.addFilterQuery("daysTrip:"+daysTrip);
            }
            if(productLevel!=null && productLevel!=""){
                params.addFilterQuery("productLevel:"+Integer.parseInt(productLevel));
            }
            if(departCityName!=null && departCityName!=""){
                params.addFilterQuery("departCityName:"+departCityName);
            }
            if(travelProductType!=null && travelProductType!=""){
                params.addFilterQuery("travelProductType:"+travelProductType);
            }
            if(providerAbb!=null && providerAbb!=""){
                params.addFilterQuery("providerAbb:"+providerAbb);
            }
            if(priceRange!=null && priceRange!=""){
                params.addFilterQuery("totalPrice:"+priceRange);
            }
            //排序：参数格式为：totalPrice-desc
            if(sortType!=null && sortType!=""){
                System.out.println("排序参数为："+sortType);
                params.setSort(sortType.split("-")[0],sortType.split("-")[1]=="asc"? SolrQuery.ORDER.asc: SolrQuery.ORDER.desc);
            }
//          params.set("fq", "product_price:[100 TO 100000]");

            //排序
//          params.addSort("product_price", SolrQuery.ORDER.asc);

            //分页
            if(pageIndex!=null && pageSize!=null){
                params.setStart(pageIndex-1);
                params.setRows(pageSize);
                System.out.println("分页参数为："+pageIndex+";"+pageSize);
            }
            //默认域
//          params.set("df", "product_title");

            //只查询指定域
            //params.set("fl", "id,address,keyword,userCode");

            //高亮
            //打开开关
            params.setHighlight(true);
            //指定高亮域
            params.addHighlightField("keyword");
            //设置前缀
            params.setHighlightSimplePre("<span style='color:red'>");
            //设置后缀
            params.setHighlightSimplePost("</span>");

            QueryResponse queryResponse = client.query(coreName,params);
            SolrDocumentList results = queryResponse.getResults();
            //获取高亮显示的结果, 高亮显示的结果和查询结果是分开放的
            Map<String, Map<String, List<String>>> highlight = queryResponse.getHighlighting();

            // 查询结果总数
            long cnt = results.getNumFound();
            System.out.println("查询结果总数:" + cnt);
            //System.out.println(results.toString());

            //可以百度了解一下Solrj 常用的api
            /*for (SolrDocument solrDocument : results) {
                System.out.println(solrDocument.get("id"));
                //Highlighting 再通过id查询出数据,再从数据中获取属性,但默认返回的是一个list,那就取第一个
                System.out.println( queryResponse.getHighlighting().get(solrDocument.get("id")).get("address").get(0));
                System.out.println(solrDocument.get("address"));
                System.out.println(solrDocument.get("userCode"));
            }*/
            //接收solr分组结果
            List groupFieldList=this.groupFieldQuery(q);
            /*  return highlight;*/
            if(results.getNumFound()==0 || groupFieldList.size()<=0){
                result= MapUtil.encapsulation("false","查询失败");
            }else{
                Map resultMap=new HashMap();
                resultMap.put("productList",SolrDocumentListToTravelProductVO.parse(results));
                resultMap.put("groupFieldList",groupFieldList);
                resultMap.put("count",cnt);
                result= MapUtil.encapsulation("true","查询成功",resultMap);
            }
            return  result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return MapUtil.encapsulation("false","程序异常，查询失败");
    }
    /**
     * 删除所有的索引
     * @return
     */
    @RequestMapping("deleteAll")
    public String deleteAll() {
        try {

            client.deleteByQuery(coreName, "*:*");
            client.commit(coreName);

            return "success";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "error";
    }

    /**
     * solr分组查询GroupResponse
     * @param
     * @return
     */
    @RequestMapping("/group")
    public List<List<String>> groupFieldQuery(String q){
        System.out.println("===============================================");
        SolrQuery params=new SolrQuery();
        params.set("q","keyword:"+q);
        // 设置通过facet查询为true，表示查询时使用facet机制
        params.setParam(GroupParams.GROUP,true);
        params.setParam(GroupParams.GROUP_FIELD,new String[] {"travelRoute","providerAbb","productLevel","daysTrip","departCityName","travelProductType"});//,"daysTrip"
        // 设置每个quality对应的
        params.setParam(GroupParams.GROUP_LIMIT,new String[] {"1"});
        // 设置返回doc文档数据，因只需要数量，故设置为0
        params.setRows(1000);//设置每组返回多少条结果
        QueryResponse response = null;
        try {
            response = client.query(coreName,params);
        } catch (SolrServerException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //打印结果
        List<List<String>> resultList=new ArrayList<>();
        if(response!=null){
            GroupResponse groupResponse =response.getGroupResponse();
            if(groupResponse!=null){
                List<GroupCommand> groupList =groupResponse.getValues();
                for(GroupCommand groupCommand : groupList){
                    List<Group> groups =groupCommand.getValues();
                    List<String> groupValueList=new ArrayList<>();
                    for (Group group:groups) {
                        groupValueList.add(group.getGroupValue());
                        //System.out.println("group查询:"+group.getGroupValue()+"数量为："+group.getResult().getNumFound());
                    }
                    resultList.add(groupValueList);
                }
                return  resultList;
            }
            return  null;
        }
        return null;
    }
}
