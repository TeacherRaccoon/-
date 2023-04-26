package com.example.ctrip.Pojo;


import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;



@Component
@Data
public class HotelComment {
    private int id;//id
    private int hotel_id;//指向被评论酒店的id
    private int user_id;//指向评论用户的id
    private String content;//评论内容
    private float score;//评分
    private Date creationDate;//评论时间
    private int OccupancyType;//入住类型,1.商务出差,2.家庭亲子
    private String inserDate;//装载爬虫日期
    private int CommemtCount;//评论数
    private String userName;//用户名
    private String userCommentImg;//用户评论图片路径地址
    private String Clicks;//点赞数量
    //分页
    private int index;//启示页
    private int end;//截止页

    public int getIndex(){
        return (this.index-1)* this.end;
    }
}
