package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;


@Component
@Data
public class TravelOrder {

    private int id;//主键
    private String orderCode;//订单编码
    private String travelProTitle;//旅游产品标题
    private int travelProId;//预订产品类型id
    private String travelProTheme;//产品主题
    private String tradeNo;//交易编号
    private double totalPrice;//总价格
    private int orderStatus;//订单状态
    private int payType;//支付方式
    private int orderType;//订单类型
    private int isCommen;//是否评论
    private String scheduledWay;//预订方式
    private String originId;//出发地
    private String startDate;//出发日期
    private String endDate;//返回日期
    private int adultNum;//成人数量
    private int childNum;//儿童数量
    private int hotelRomNum;//房间数量
    private double hotelRomPrice;//房间费用
    private int isNeedTraIns;//是否需要旅游险
    private String creationDate;//创建日期
    private String modifiedBy;//修改人姓名
    private String modifyDate;//修改日期
    private List<UserPassenger> userPassengerList;//旅客列表
    private UserContact userContact;//联系人
    private int userId;//用户id
    private int hasInvoice;//是否有发票
    private int userContactId;//联系人id
    private String moreRequirements;
    private String orginName;
}
