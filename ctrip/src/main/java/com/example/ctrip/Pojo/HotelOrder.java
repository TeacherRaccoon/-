package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import java.util.Date;


@Component
@Data
public class HotelOrder {
    private int id;//主键
    private String orderCode;//订单编码
    private String userName;//用户名
    private String mobilePhone;//用户电话
    private String hotelName;//酒店名称
    private String email;//邮箱
    private String EstimatedTime;//具体进入酒店时间
    private String hotel_Code;//酒店编号
    private int roomId;//房间id
    private String roomType;//房型
    private int orderType;//订单类型
    private int orderStatus;//订单状态
    private double totalPrice;//总金额
    private String inTime;//入住日期
    private String outTime;//退房日期
    private Date orderPayDate;//支付日期
    private Date creationDate;//创建日期
    private int roomNum;//房间数量
    private double beforePrice;//打折前的金额
    private String address;//酒店地址
    private int level;//酒店星级
    private int hotelId;//酒店id
    private String EnteringHobby;//用户偏好
    /**
     * 支付宝接口必要参数
     */
    @NotNull
    private String out_trade_no;//商户订单号,唯一订单号,非空
    @NotNull
    private double total_amount;//付款金额,非空
    @NotNull
    private String subject;//订单名称,非空
    private String body;//商品描述,可空

}
