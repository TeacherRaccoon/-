package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Data
public class TravelProReview {
    private int id;//该条评论id
    private int tripProductId; //产品id
    private String reviewType;//评论类型
    private int travelOrderId;//订单id
    private int productScore;//评分
    private int userId;//用户id
    private Date createDate;//评论日期
    private String reviewComment;//评论内容
    private int guideIsOk;//导游是否满意
    private String guideComment;//对导游的评论
    private String journeyComment;//行程安排是否ok
    private int journeyIsOk;//行程安排的评论
    private String productDescComment;//产品说明的评论
    private int productDescIsOk;//产品说明是否ok
    private int hasUploadImg;//是否有上传图片
    //评论图片
}
