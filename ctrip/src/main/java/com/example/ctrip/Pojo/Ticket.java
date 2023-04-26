package com.example.ctrip.Pojo;

import org.springframework.stereotype.Component;


@Component
public class Ticket {
    private int id;//门票主键
    private String ticketName;//门票名称
    private String description;//门票描述
    private int spotId;//景区id
    private String projectName;//门票项目类型
    private String fareType;//票价类型
    private int price;//价格
    private String scenicSpotName;//景点名称
    private String special;//特色
    private String imgUrl;//图片地址

    private int sellNumber;//出售数量
    private int inventory;//库存
}
