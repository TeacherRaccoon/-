package com.example.ctrip.Pojo;


import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Component
@Data
public class TravelProduct implements Serializable {
    @Field
    private int id;
    @Field
    private String proName;//产品名称
    @Field
    private String subHead;//副标题
    @Field
    private String departCityName;//出发城市id
    private int departCityId;
    @Field
    private String distinationName;
    private String suitable;//主题名称：爸妈游、亲子游、蜜月游
    @Field
    private String travelProductType;//产品类型:自由行、跟团游
    @Field
    private int providerId;//供应商id
    @Field
    private int isHot;//是否热门
    private String daysTrip;//行程天数
    @Field
    private int travelCount;//产品销量
    @Field
    private BigDecimal totalPrice;//产品费用
    private String travelRoute;//线路
    @Field
    private String productDetail;//产品说明
    private int productGradeId;//产品综合评分id
    private String sellingPoints;//产品卖点
    @Field
    private String hasFeature;//产品特色
    private String routing;//行程安排
    @Field
    private String productLevel;//产品钻级
    private int hasDiscounts;//是否优惠
    @Field
    private String hasServiceAss;//服务保障
    private int createBy;//创建人id
    private Date creationDate;//创建日期
    private int modifiedBy;//修改人id
    private Date modifyDate;//修改日期
    private List<ScenicSpot> spotsList;//包含景点
    private List<Img> imgList; //产品图片
    private TravelProvider provider;//供应商
    private TravelProGrade travelProGrade;//评论

    private String imgUrl;//图片连接

}
