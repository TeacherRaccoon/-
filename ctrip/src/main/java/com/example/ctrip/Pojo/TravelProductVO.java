package com.example.ctrip.Pojo;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Data
public class TravelProductVO implements Serializable {
    @Field
    private int id;
    @Field
    private String proName;//产品名称
    @Field
    private String subHead;//副标题
    @Field
    private String departCityName;//出发城市id
    @Field
    private String distinationName;
    @Field
    private String travelProductType;//产品类型:自由行、跟团游
    @Field
    private int providerId;//供应商id
    @Field
    private int isHot;//是否热门
    @Field
    private String daysTrip;//行程天数
    @Field
    private int travelCount;//产品销量
    @Field
    private BigDecimal totalPrice;//产品费用
    private String travelRoute;//线路
    @Field
    private String productDetail;//产品说明
    @Field
    private String hasFeature;//产品特色
    @Field
    private int productLevel;//产品钻级
    @Field
    private String hasServiceAss;//服务保障
    @Field
    private String providerName;//供应商
    @Field
    private String providerAbb;
    @Field
    private String imgUrl;
    private TravelProGrade travelProGrade;//评论
}
