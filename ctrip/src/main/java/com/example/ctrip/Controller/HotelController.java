package com.example.ctrip.Controller;


import com.alibaba.fastjson.JSON;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.example.ctrip.Pojo.City;
import com.example.ctrip.Pojo.Hotel;
import com.example.ctrip.Pojo.HotelComment;
import com.example.ctrip.Pojo.HotelOrder;
import com.example.ctrip.Service.HotelService;
import com.example.ctrip.Service.impl.HotelServiceImpl;
import com.example.ctrip.util.AlipayConfig;
import com.example.ctrip.util.RedisUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/hotel")
public class HotelController {
    @Autowired
    HotelServiceImpl hotelService;
    @Autowired
    RedisUtil redisUtil;

    /***
     * 获取酒店信息接口
     * @param hotel
     * @return Map
     */
    @RequestMapping("/getHotelList")
    public Map getHotelListByPage(Hotel hotel){
        //Redis
//        Map map = (Map) redisUtil.get("hotel:page"+hotel.getIndex());
//        System.out.println(hotel.getId());
//        System.out.println(hotel.getIndex());
//        if (map.get("data")==null){
//            map = hotelService.getHotelByPage(hotel);
//            redisUtil.set("hotel:page"+hotel.getIndex(),map);
//        }
//        return map;
        //Test
        return hotelService.getHotelByPage(hotel);
    }
    /***
     * 查询所有城市数据接口
     * @return Map
     */
    @RequestMapping("/getAllHotelName")
    public Map getHotelAllHotelName(City city){
        //Redis
//        Map map = (Map) redisUtil.get("city:cityName");
//        if (map.get("data")==null){
//            map = hotelService.getCtiyAllName();
//            redisUtil.set("city:cityName",map);
//        }else
//            return map;

        return hotelService.getCtiyAllName();
    }

    /**
     * 根据酒店名字获取数据总数
     * @param hotel
     * @return int
     */
    @RequestMapping("/getDataCountByHotelName")
    public int getDataCountByhotelName(Hotel hotel){
        System.out.println(hotel.getHotelName());
        return hotelService.getDataCountByHotelName(hotel);
    }

    /**
     * 根据Id查询酒店数据接口
     * @param id
     * @return map
     */
    @RequestMapping("/getHotelInfoById")
    public Map getHotelInfoById(int id){
        return hotelService.getHotel_InfoById(id);
    }

    /**
     * 根据酒店Id获取评论信息;
     * @param hotel
     * @return map
     */
    @RequestMapping("/getHotelComment")
    public Map getHotelCommemtById(HotelComment hotel){
        return hotelService.getHotelAllComment(hotel);
    }

    /***
     * 支付宝接口
     * @return object
     */
    @RequestMapping("/AliPay")
    public Object alipay(HotelOrder hotelOrder){
        System.out.println("数据已到后台");
        System.out.println(hotelOrder.getEmail());
        System.out.println(hotelOrder.getRoomType());
        //初始化AliPay
        AlipayClient alipayClient = new DefaultAlipayClient(
                AlipayConfig.gatewayUrl,
                AlipayConfig.app_id,
                AlipayConfig.merchant_private_key,
                "json",
                AlipayConfig.charset,
                AlipayConfig.alipay_public_key,
                AlipayConfig.sign_type
            );
        //参数 商户订单号
//        String out_trade_no = hotelOrder.getOrderNo();
//        //付款金额，必填
//        String total_amount = hotelOrder.getMoney();
//        //订单名称，必填
//        String subject = hotelOrder.getOrderName();
//        //商品描述，可空
//        String body = hotelOrder.getDesc();
        //插入到数据库
        hotelOrder.setOrderCode(hotelOrder.getOut_trade_no());
        hotelOrder.setTotalPrice(hotelOrder.getTotal_amount());
        Map map =  hotelService.insertHotelOrder(hotelOrder);
        System.out.println(map.get("data"));
        String order_Id = hotelOrder.getOut_trade_no()+map.get("data");
        //实例请求对象
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        //设置支付成功跳转页面
        alipayRequest.setReturnUrl(AlipayConfig.return_url_hxl);
        //设置服务器异步通知页面路径
        alipayRequest.setNotifyUrl(AlipayConfig.notify_url);
        //返回到前台的地址栏数据
        System.out.println(hotelOrder.getOut_trade_no());
        alipayRequest.setBizContent(
                "{\"out_trade_no\":\""+ order_Id +"\","
                + "\"total_amount\":\""+ hotelOrder.getTotal_amount() +"\","
                + "\"subject\":\""+ hotelOrder.getSubject() +"\","
                + "\"body\":\""+ hotelOrder.getBody() +"\","
                + "\"inTime\":\""+ hotelOrder.getInTime() +"\","
                + "\"outTime\":\""+ hotelOrder.getOutTime()+"\","
                + "\"userName\":\""+ hotelOrder.getUserName() +"\","
                + "\"mobilePhone\":\""+ hotelOrder.getMobilePhone() +"\","
                + "\"email\":\""+ hotelOrder.getEmail() +"\","
                + "\"EstimatedTime\":\""+ hotelOrder.getEstimatedTime() +"\","
                + "\"roomType\":\""+ hotelOrder.getRoomType() +"\","
                + "\"mobilePhone\":\""+ hotelOrder.getMobilePhone() +"\","
                + "\"beforePrice\":\""+ hotelOrder.getBeforePrice() +"\","
                + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}"
        );
        //请求
        String result = null;
        try{
            result = alipayClient.pageExecute(alipayRequest).getBody();


        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 修改订单状态
     * @param StatusCode
     * @return map
     */
    @RequestMapping("/updateOrderStatus")
    public Map updateOrderStatus(int id,int StatusCode){
        return hotelService.updateOrderStatus(id,StatusCode);
    }
    /**
     * 订单详情查询
     * @param id
     * @return List
     */
    @RequestMapping("/getOrderList")
    public Map selectHotelBill(int id){
        return hotelService.selectHotelBill(id);
    }

    /***
     * 修改入住偏好
     * @param id
     * @param content
     * @return int
     */
    @RequestMapping("/EnteringHobby")
    public Map updateOrderEnteringHobby(int id,String content){
        return hotelService.updateOrderEnteringHobby(id,content);
    }
    @RequestMapping("/Contacts")
    public Map updateOrderContacts(int id, String phone, String email) {
        return hotelService.updateOrderContacts(id,phone,email);
    }

}
