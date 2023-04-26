package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Data
public class ScenicSpot {
    private int id;
    private String scenicSpotName;//景点名
    private int cityId;//城市id
    private String address;//地址
    private String description;//景点描述
    private String special;//景点特色
    private String histories;//历史典故
    private int hasGroupPurchase;//是否团购
    private int sore;//评分
    private String openTime;//开放时间
    private String commitment;//关闭时间
    private int createBy;//创建人id
    private Date creationDate;//创建日期
    private int modifiedBy;//修改人id
    private Date modifyDate;//修改日期
}
