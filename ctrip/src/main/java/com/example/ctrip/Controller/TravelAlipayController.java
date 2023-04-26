package com.example.ctrip.Controller;

import com.alibaba.fastjson.JSON;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.example.ctrip.Service.TravelOrderService;
import com.example.ctrip.config.TravelAlipayConfig;
import com.example.ctrip.util.AlipayConfig;
import com.example.ctrip.util.MapUtil;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.jws.WebParam;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@RestController
public class TravelAlipayController {
    @Resource
    private TravelOrderService travelOrderService;

    @RequestMapping("/alipay.trade.page.pay")
    public void pay(HttpServletRequest request, HttpServletResponse response) throws IOException, AlipayApiException {

        //获得初始化的AlipayClient
        AlipayClient alipayClient = new DefaultAlipayClient(TravelAlipayConfig.gatewayUrl, TravelAlipayConfig.app_id, TravelAlipayConfig.merchant_private_key, "json", TravelAlipayConfig.charset, TravelAlipayConfig.alipay_public_key, AlipayConfig.sign_type);


        PrintWriter out =response.getWriter();

        response.setContentType("text/html; charset=utf-8");
        //设置请求参数
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl(TravelAlipayConfig.return_url);
        alipayRequest.setNotifyUrl(TravelAlipayConfig.notify_url);

        //商户订单号，商户网站订单系统中唯一订单号，必填
        String out_trade_no = new String(request.getParameter("orderCode").getBytes("ISO-8859-1"),"UTF-8");
        //付款金额，必填
        String total_amount = new String(request.getParameter("totalPrice").getBytes("ISO-8859-1"),"UTF-8");
        //订单名称，必填
        System.out.println(request.getParameter("travelProTitle").split("·")[0]);
        String subject = new String(request.getParameter("travelProTitle").getBytes("ISO-8859-1"),"UTF-8");
        //商品描述，可空
        String body = new String(request.getParameter("desc").getBytes("ISO-8859-1"),"UTF-8");
        //订购日期
        alipayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","
                + "\"total_amount\":\""+ total_amount +"\","
                + "\"subject\":\""+ subject +"\","
                + "\"body\":\""+ body +"\","
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
        String result = alipayClient.pageExecute(alipayRequest).getBody();

        //返回结果
        out.println(result);
    }

    @Transactional
    @RequestMapping("/return_url")
    public void  return_url(HttpServletRequest request, HttpServletResponse response) throws IOException, AlipayApiException, ServletException {
        Map<String,String> params = new HashMap<String,String>();
        PrintWriter out =response.getWriter();
        response.setContentType("text/html; charset=utf-8");
        Map<String,String[]> requestParams = request.getParameterMap();
        for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i]
                        : valueStr + values[i] + ",";
            }
            //乱码解决，这段代码在出现乱码时使用
            valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
            params.put(name, valueStr);
        }

        boolean signVerified = AlipaySignature.rsaCheckV1(params, TravelAlipayConfig.alipay_public_key, TravelAlipayConfig.charset, TravelAlipayConfig.sign_type); //调用SDK验证签名

        //——请在这里编写您的程序（以下代码仅作参考）——
        if(signVerified) {
            //商户订单号
            String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");

            //支付宝交易号
            String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");

            //付款金额
            String total_amount = new String(request.getParameter("total_amount").getBytes("ISO-8859-1"),"UTF-8");
            //支付日期
            String payDate=new String(request.getParameter("timestamp").getBytes("ISO-8859-1"),"UTF-8");
            //支付成功，保存数据到数据库
            Map map=new HashMap();
            map.put("orderCode",out_trade_no);
            map.put("tradeNo",trade_no);
            map.put("orderStatus",5);
            map.put("isComment",1);

            //更新订单状态为已支付，待评论评论状态

            Map map1=travelOrderService.updateTravelOrder(map);
            System.out.println("订单号："+out_trade_no+"；支付流水号："+trade_no);
            Map map2=travelOrderService.updateInventory(out_trade_no);
            //out.println("trade_no:"+trade_no+"<br/>out_trade_no:"+out_trade_no+"<br/>total_amount:"+total_amount);
            if(Boolean.valueOf((String) map1.get("result")) && Boolean.valueOf((String) map2.get("result"))){
                //out.write(MapUtil.encapsulation("true","更新成功").toString());
                response.sendRedirect("/views/vacation/paySuccess.html?orderNo="+out_trade_no+"&totalPrice="+total_amount+"&payDate="+payDate);
            }else{
                out.write(MapUtil.encapsulation("false","更新失败").toString());
            }
        }else {
            //out.println("验签失败");
            out.write(MapUtil.encapsulation("false","更新失败").toString());
        }
    }
}




