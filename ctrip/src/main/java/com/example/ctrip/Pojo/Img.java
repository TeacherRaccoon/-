package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Data
public class Img {
    private int id;//主键
    private String imgUrl;//图片路径
    private int imgType;//图片类型,1.酒店图片,2.用户图片,3.房间图片
    private Date uploadTime;//图片上传时间
    private int uploadSerial;//图片的上传顺序
    private int travelProRewId;//旅游产品评论id
    private int travelProId;//旅游产品id
    private int scenicSpotsId;//景点id
    private int userId;//用户id
    private int providerId;//供应商id
    private int hotelId;//酒店id
    private int hotelOrderId;//
    private int romeId;//房间类型id
    private Date creationDate;//创建日期
    private int modifiedBy;//修改人id
    private Date modifyDate;//修改日期
}
