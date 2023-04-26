package com.example.ctrip.Pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;


@Component
@Data
public class TicketOrder {
    private int id;//主键
    private String orderCode;//订单编码
    private String orderName;//订单名称
    private String ticketType;//门票类型
    private int orderType=3;//订单类型
    private int travelId;//景区id
    private int contactId;//联系人id
    private int orderStatus;//订单状态
    private double totalPrice;//总金额
    private int number;//数量
    private String insurance;//保险


    private List passengers;//旅客
    private TicketSpot ticketSpot;//景点信息

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date creationDate;//创建日期

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date orderTime;//预订日期（预订出行日期）

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date travelEndTime;//结束日期 （过期时间)

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date travelInTime;//使用时间

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date modifyDate ;//修改日期

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date payDate;//支付时间
}
