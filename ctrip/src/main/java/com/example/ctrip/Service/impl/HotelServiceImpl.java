package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.HotelMapper;
import com.example.ctrip.Pojo.City;
import com.example.ctrip.Pojo.Hotel;
import com.example.ctrip.Pojo.HotelComment;
import com.example.ctrip.Pojo.HotelOrder;
import com.example.ctrip.Service.HotelService;
import com.example.ctrip.util.MapUtil;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.impl.XMLResponseParser;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;



@Service
@Transactional
public class HotelServiceImpl implements HotelService {
    @Resource
    HotelMapper hotelMapper;
    @Autowired
    private SolrClient client;

    @Override
    public Map getHotelByPage(Hotel hotel) {
        try{
            //Solr
            SolrQuery solrQuery = new SolrQuery();
            if (!hotel.getHotelName().equals("")&&hotel.getHotelName()!=null) {
                solrQuery.set("q", "hotelName:*"+hotel.getHotelName()+"*");
            }else{
                solrQuery.set("q","*:*");
            }
            if (!hotel.getLevelRange().equals("")&&hotel.getLevelRange()!=null){
                solrQuery.addFilterQuery("level:"+hotel.getLevelRange());
            }
            if(!hotel.getPriceRange().equals("")&&hotel.getPriceRange()!=null){
                solrQuery.addFilterQuery("price:"+hotel.getPriceRange());
            }
            if (!hotel.getSorting_txt().equals("")&&hotel.getSorting_txt()!=null){
                if (hotel.getSorting_txt().equals("[commemtCount desc]")){
                    solrQuery.setSort("commemtCount", SolrQuery.ORDER.desc);
                }
                if (hotel.getSorting_txt().equals("[score desc]")){
                    solrQuery.setSort("score",SolrQuery.ORDER.desc);
                }
                if (hotel.getSorting_txt().equals("[price asc]")){
                    solrQuery.setSort("price", SolrQuery.ORDER.asc);
                }
                if (hotel.getSorting_txt().equals("[price desc]")){
                    solrQuery.setSort("price", SolrQuery.ORDER.desc);
                }
                if (hotel.getSorting_txt().equals("[level desc]")){
                    solrQuery.setSort("level", SolrQuery.ORDER.desc);
                }
                if (hotel.getSorting_txt().equals("[level asc]")){
                    solrQuery.setSort("level", SolrQuery.ORDER.asc);
                }
            }
            System.out.println(hotel.getSorting_txt());
            System.out.println(hotel.getLevelRange());
            System.out.println(hotel.getPriceRange());
            solrQuery.setStart(hotel.getIndex());
            solrQuery.setRows(hotel.getEnd());
            QueryResponse queryResponse = client.query("hotel",solrQuery);
            SolrDocumentList results =queryResponse.getResults();
            long cnt = results.getNumFound();
//            List list = hotelMapper.getHotelDataByPage(hotel);
            return MapUtil.encapsulation(true,"查询成功!",results,cnt);
        }catch (Exception e){
            e.printStackTrace();
            return MapUtil.encapsulation(false,"发生异常查询失败!");
        }
    }

    @Override
    public Map getCtiyAllName() {
        try {
            List<City> list = hotelMapper.getCityName();
            return MapUtil.encapsulation(true,"查询成功",list);
        }catch (Exception e){
            e.printStackTrace();
            return MapUtil.encapsulation(false,"查询发生异常!");
        }
    }

    @Override
    public int inserDiscount(int i,int id) {
        return hotelMapper.inserDiscount(i,id);
    }

    /**
     * 根据酒店名称获取数据总数
     * @param hotelName
     * @return int
     */
    @Override
    public int getDataCountByHotelName(Hotel hotelName) {
        return hotelMapper.getDataCountByHotelName(hotelName);
    }

    @Override
    public Map getHotel_InfoById(int id) {
        try{
            List<Hotel> list = hotelMapper.getHotelInfoById(id);
            return MapUtil.encapsulation(true,"查询成功",list);
        }catch (Exception e){
            e.printStackTrace();
            return MapUtil.encapsulation(true,"发生异常查询失败!");
        }
    }

    /**
     * 根据酒店Id获取评论信息;
     * @param hotel
     * @return map
     */
    @Override
    public Map getHotelCommemtById(HotelComment hotel) {
        try {
            List<HotelComment> list = hotelMapper.getHotelCommemtById(hotel);
            return MapUtil.encapsulation(true,"查询成功",list);
        }catch (Exception e){
            e.printStackTrace();
            return MapUtil.encapsulation(true,"发生异常查询失败!");
        }
    }
    /***
     * 根据酒店Id获取所有评论
     * @param hotelComment
     * @return map
     */
    @Override
    public Map getHotelAllComment(HotelComment hotelComment) {
        try{
            List list = hotelMapper.getHotelAllComment(hotelComment);
            return MapUtil.encapsulation(true,"查询成功",list);
        }catch (Exception e){
            e.printStackTrace();
            return MapUtil.encapsulation(true,"发生异常查询失败!");
        }
    }
    /**
     * 讲支付成功的订单插入到数据库
     * @param hotelOrder
     * @return int/返回主机ID映射到实体类中
     */
    @Override
    public Map insertHotelOrder(HotelOrder hotelOrder) {
        int result = hotelMapper.insertHotelOrder(hotelOrder);
        int returnId = hotelOrder.getId();
        if (result!=0){
            return MapUtil.encapsulation(true,"插入成功",returnId);
        }
        return MapUtil.encapsulation(false,"插入失败");

    }
    /**
     * 支付成功后修改订单状态
     * @param Status
     * @return map
     */
    @Override
    public Map updateOrderStatus(int id,int Status) {
        int result = hotelMapper.updateOrderStatus(id,Status);
        if (result!=0){
            return MapUtil.encapsulation(true,"插入成功",result);
        }
        return MapUtil.encapsulation(false,"插入失败");
    }
    /**
     * 订单详情查询
     * @param id
     * @return List
     */
    @Override
    public Map selectHotelBill(int id) {
        try {
            List list = hotelMapper.selectHotelBill(id);
            return MapUtil.encapsulation(true,"查询成功!",list);
        }catch (Exception e){
            e.printStackTrace();
            return MapUtil.encapsulation(false,"查询发生异常");
        }
    }
    /***
     * 修改入住偏好
     * @param id
     * @param content
     * @return int
     */
    @Override
    public Map updateOrderEnteringHobby(int id, String content) {
        int result = hotelMapper.updateOrderEnteringHobby(id,content);
        if (result!=0){
            return MapUtil.encapsulation(true,"修改成功!");
        }
        return MapUtil.encapsulation(false,"修改失败!");
    }
    /**
     * 修改联系人
     * @param id
     * @param phone
     * @param email
     * @return int
     */
    @Override
    public Map updateOrderContacts(int id, String phone, String email) {
        int result = hotelMapper.updateOrderContacts(id,phone,email);
        if (result!=0){
            return MapUtil.encapsulation(true,"修改成功!");
        }
        return MapUtil.encapsulation(false,"修改失败!");
    }
}
