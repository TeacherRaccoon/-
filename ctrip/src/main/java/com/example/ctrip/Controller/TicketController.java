package com.example.ctrip.Controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.example.ctrip.Pojo.CtripOrderRel;
import com.example.ctrip.Pojo.TicketComment;
import com.example.ctrip.Pojo.TicketOrder;
import com.example.ctrip.Pojo.TicketSpot;
import com.example.ctrip.Service.TicketService;
import com.example.ctrip.util.AlipayConfig;
import com.example.ctrip.util.JsoupUse02;
import com.example.ctrip.util.MapUtil;
import com.example.ctrip.util.RedisUtil;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


@RestController
@RequestMapping("/ticket")
public class TicketController {
    @Autowired
    RedisUtil redisUtil;

    @Autowired
    private SolrClient client;

    @Autowired
    TicketService ticketService;


    Map map = new HashMap();

    ExecutorService executorService = Executors.newSingleThreadExecutor();

    /**
     * 插入景点数据（携程上的景点数据）
     *
     * @param params 初始链接
     * @param cityId 所在城市id
     * @return
     */
    @RequestMapping("/addSpot")//配合 src/main/webapp/views/piao/add_data/addSpot.js 该js使用
    public Map addSpot(@RequestParam(value = "data[]") List<String> params, @RequestParam int cityId) {
        List<String> list = new ArrayList();
        for (String pa : params) {//防止获取空的集合
            if (pa != null && pa != "") {
                list.add(pa);
                System.out.println(pa);
            }
        }
        List<TicketSpot> ticketSpot = JsoupUse02.getSpot(list, cityId);//从页面获取数据

        for (int i = 0; i < ticketSpot.size(); i++) {
            ticketService.addSpot(ticketSpot.get(i));
        }
        return null;
    }

    /**
     * 插入评论数据--携程原有评论
     *
     * @return
     */
    @RequestMapping("/addComment_data")
    public Map addComment_data(@RequestParam(value = "commentList") String comments,
                               @RequestParam(value = "spotId") Integer spotId) {

        JSONArray commentList = JSONArray.parseArray(comments);//将获取到的 JSON 字符串转为 json数组
        for (int i = 0; i < commentList.size(); i++) {
            TicketComment ticketComment = new TicketComment();
            JSONObject jsonObject = JSONObject.parseObject(commentList.get(i).toString());//将json 数组中的元素转为json对象
            ticketComment.setContent(jsonObject.get("content").toString());//评论内容
            ticketComment.setScore(Integer.parseInt(jsonObject.get("score").toString()));//评分
            ticketComment.setPostedTime(jsonObject.getDate("dateTime"));//评论时间
            ticketComment.setSpotId(spotId);//景点id
            ticketComment.setUserId(new Random().nextInt(34 - 1) + 1);//用户Id

            map = ticketService.addComment(ticketComment);

        }
        return map;
    }


    //根据地区查询景区信息和门票价格
    @RequestMapping("/selectCityByTicket")
    public Map selectCityByTick(Integer id) {
        return ticketService.selectCityByTicket(id);
    }

    //根据地区分页查询景区信息
    @RequestMapping("/getScenicSpotListPage")
    public Map getScenicSpotListPage(@RequestParam(value = "id") Integer id,
                                     @RequestParam(value = "index") Integer index,
                                     @RequestParam(value = "pageSize") Integer pageSize) {
        Map map = new HashMap();
        map.put("id", id);
        map.put("index", (index - 1) * pageSize);
        map.put("pageSize", pageSize);
        return ticketService.getScenicSpotListPage(map);
    }

    //根据景区id获取所有门票项目类型、票价类型、价格
    @RequestMapping("/getTicketType_priceById")
    public Map<String, Object> getTicketType_priceById(Integer spotId) {
        return ticketService.getTicketType_priceById(spotId);
    }

    /**
     * 获取特权票
     *
     * @return
     */
    @RequestMapping("/getTicket")
    public Map getTicket(int cityId) {
        return ticketService.getTicket(cityId);
    }

    /**
     * 获取景点详情
     *
     * @param spotId
     * @return
     */
    @RequestMapping("/getSpot")
    public Map getSpot(Integer spotId) {
        //查询该 value 的分数 该项可用作热搜
     /*   Double score = redisUtil.getSortSetScore("ticketSpost:spotId:",spotId);
        if(score !=null ){
            redisUtil.addSortScore("ticketSpost:spotId:",spotId,1);
        }else{
            redisUtil.addSortSet("ticketSpost:spotId:",spotId,1);
        }*/
        return ticketService.getSpotById(spotId);
    }

    /**
     * 获取热门搜索景点详情
     * @return
     */
    @RequestMapping("/getHotSpot")
    public Map getHotSpot(){
        Set set = redisUtil.reverseRange("ticketSpost:spotId:",0,6);
        if(set !=null){
            List<String> list = new ArrayList();
            for(Object obj:set){
                list.add(obj.toString());
               map = ticketService.getHotSpotNameId(list);
            }
            return MapUtil.encapsulation(true,"success",map);
        }else{
            return MapUtil.encapsulation(false,"failed");
        }
    }




    /**
     * 获取所有景点的所有评论数
     *
     * @param spotId
     * @return
     */
    @RequestMapping("/getCommentCount")
    public Map getCommentCount(Integer spotId) {
        return ticketService.getCommentCount(spotId);
    }


    /**
     * 获取景点的评论
     *
     * @param spotId
     * @return
     */
    @RequestMapping("/getCommet")
    public Map getComment(Integer spotId, Integer startIndex, Integer endIndex) {
        Map params = new HashMap();
        int start = (startIndex - 1) * endIndex;
        params.put("start", start);
        params.put("end", endIndex);
        params.put("spotId", spotId);
        return ticketService.getCommentBySpotId(params);
    }

    /**
     * 获取景点所有评论数
     */
    @RequestMapping("/getAllComment")
    public Map getAllComment(Integer spotId) {
        return ticketService.getAllCommentCount(spotId);
    }

    /**
     * 根据城市id获取景点门票信息
     *
     * @param cityId
     * @return
     */
    @RequestMapping("/getTicketSpot")
    public Map getTicketSpot(int cityId) {
        return ticketService.getSpotTicket(cityId);
    }

    /**
     * 根据城市 id 获取所有该城市的景点数量
     *
     * @param cityId
     * @return
     */
    @RequestMapping("/getSpotCount")
    public Map getSpotCount(int cityId) {
        return ticketService.getSpotListCountByCityId(cityId);
    }

    /**
     * 根据城市Id景点名称查询景点数
     *
     * @param cityId
     * @param spotName
     * @return
     */
    @RequestMapping("/getSpotCountBySname")
    public Map getSpotCountByCityIdSpotName(Integer cityId, String spotName) {
        Map params = new HashMap();
        params.put("cityId", cityId);
        params.put("spotName", spotName);
        return ticketService.getSpotCountByCityIdSpotName(params);
    }

    /**
     * 根据城市 id 景点名称 获取取该城市的景点列表
     *
     * @param cityId
     * @param spotName
     * @param startIndex
     * @param pageSize
     * @return
     */
    @RequestMapping("/getSpotListByCityIdSpotName")
    public Map getSpotListByCityIdSpotName(Integer cityId, String spotName,
                                           Integer startIndex, Integer pageSize) {
        Map params = new HashMap();
        params.put("cityId", cityId);
        params.put("spotName", spotName);
        int start = (startIndex - 1) * pageSize;
        params.put("start", start);
        params.put("pageSize", pageSize);
        return ticketService.getSpotListByCityIdSpotName(params);
    }

    /**
     * 支付接口
     *
     * @param orderNo
     * @param money
     * @param orderName
     * @param desc
     * @return
     */
    @RequestMapping("/alipay")
    public Object alipay(String orderNo, String money, String orderName, String desc) {
        //获得初始化的AlipayClient
        AlipayClient alipayClient = new DefaultAlipayClient(
                AlipayConfig.gatewayUrl,
                AlipayConfig.app_id,
                AlipayConfig.merchant_private_key,
                "json",
                AlipayConfig.charset,
                AlipayConfig.alipay_public_key,
                AlipayConfig.sign_type
        );
        //设置请求参数
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl(AlipayConfig.return_url);
        alipayRequest.setNotifyUrl(AlipayConfig.notify_url);

        //商户订单号，商户网站订单系统中唯一订单号，必填
        String out_trade_no = new String(orderNo);
        //付款金额，必填
        String total_amount = new String(money);
        //订单名称，必填
        String subject = new String(orderName);
        //商品描述，可空
        String body = new String(desc);

        alipayRequest.setBizContent("{\"out_trade_no\":\"" + out_trade_no + "\","
                + "\"total_amount\":\"" + total_amount + "\","
                + "\"subject\":\"" + subject + "\","
                + "\"body\":\"" + body + "\","
                + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");

        //若想给BizContent增加其他可选请求参数，以增加自定义超时时间参数timeout_express来举例说明
        //alipayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","
        //		+ "\"total_amount\":\""+ total_amount +"\","
        //		+ "\"subject\":\""+ subject +"\","
        //		+ "\"body\":\""+ body +"\","
        //		+ "\"timeout_express\":\"10m\","
        //		+ "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");
        //请求参数可查阅【电脑网站支付的API文档-alipay.trade.page.pay-请求参数】章节

        //请求
        String result = null;
        try {
            result = alipayClient.pageExecute(alipayRequest).getBody();
        } catch (AlipayApiException e) {
            e.printStackTrace();
        }
        return result;
    }


    /**
     * 新建订单
     *
     * @param ticketOrder
     * @return
     */
    @RequestMapping("/addTicketOrder")
    public Map addTicketOrder(TicketOrder ticketOrder,
                              @RequestParam(value = "passengerId[]") List<Integer> passengerId) {
        return ticketService.addTicketOrder(ticketOrder, passengerId);
    }

    /**
     * 成功后获取订单信息,并修改订单状态为已支付
     *
     * @param orderCode
     * @return
     */
    @RequestMapping("/getTicketInfo")
    public Map getTOrderInfo(String orderCode) {
        return ticketService.getTOrderInfo(orderCode);
    }


    /**
     * 综合查询: 在综合查询中, 有按条件查询, 条件过滤, 排序, 分页, 高亮显示, 获取部分域信息
     *
     * @param q
     * @return
     */
    @RequestMapping("/searchTicSpot")
    public Map search(String q, Integer start, Integer pageSize) {

        try {
            SolrQuery params = new SolrQuery();
            //查询条件, 这里的 q 对应 下面图片标红的地方
            params.set("q", q);

            //过滤条件
//            params.set("fq", "product_price:[100 TO 100000]");

            //排序
//            params.addSort("product_price", SolrQuery.ORDER.asc);

            //分页
            if (start != null && pageSize != null) {
                int starts = (start - 1) * pageSize;
                params.setStart(starts);
                params.setRows(pageSize);
            }


            //默认域
//            params.set("df", "product_title");

            //只查询指定域
            // params.set("fl", "id,address,keyword,userCode");

            //高亮
            //打开开关
            params.setHighlight(true);
            //指定高亮域
            params.addHighlightField("keyword");
            //设置前缀
            params.setHighlightSimplePre("<span style='color:red'>");
            //设置后缀
            params.setHighlightSimplePost("</span>");

            QueryResponse queryResponse = client.query("tickets_spot", params);

            SolrDocumentList results = queryResponse.getResults();


            Map<String, Map<String, List<String>>> map = queryResponse.getHighlighting();
            // 查询结果总数
            long cnt = results.getNumFound();
            System.out.println("查询结果总数:" + cnt);
            Map data = new HashMap();
            data.put("data", results);
            data.put("count", cnt);
        /*    //可以百度了解一下Solrj 常用的api
            for (SolrDocument solrDocument : results) {

                System.out.println(solrDocument.get("id"));
                //Highlighting 再通过id查询出数据,再从数据中获取属性,但默认返回的是一个list,那就取第一个
                System.out.println( queryResponse.getHighlighting().get(solrDocument.get("id")).get("address").get(0));
                System.out.println(solrDocument.get("address"));
                System.out.println(solrDocument.get("userCode"));
            }
*/

            //获取高亮显示的结果, 高亮显示的结果和查询结果是分开放的
            /*    Map<String, Map<String, List<String>>> highlight = queryResponse.getHighlighting();*/
            /*  return highlight;*/
            return data;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
