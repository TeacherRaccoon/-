package com.example.ctrip.Pojo;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;


@Component
@Data
public class UserOrder {
    private String orderCode;//订单编码
    private String orderName;//订单名称
    private int orderType;//订单类型
    private double price;//费用
    private int orderStatus;//订单状态
    private int userId;//用户Id
    private String pName;//旅客姓名
    private String loginName;//登录名

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date travelEndTime;//行程结束日期

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date orderTime;//订单日期

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date travelTime;//行程日期

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startTime;//查询起始日期

    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endTime;//查询结束日期

}
