package com.example.ctrip.Pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;


@Component
@Data
public class Hotel {
    private int id;//主键酒店id
    private String hotelCode;//酒店编码
    private String hotelName;//酒店名称
    private int level;//酒店星级
    private int cityId;//城市Id
    private String hotelDetails;//酒店详情
    private String address;//酒店地址
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date creationDate;//创建时间
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date modifyDate;//修改时间
    private String contact;//联系人
    private String phone;//电话
    private String fox;//传真
    private String imgUrl;//图片头像
    private List<Img> img;//酒店详情介绍地址
    private int price;//价格
    private int CommentCount;//评论人数
    private Float score;//评论分数
    private String oneComment;//最新的一条评论
    private int Discount;//酒店折扣
    private int commemtCount;//评论数
    private String lateComment;//最近时间一次评论
    private String Recommend;//用户支持率
    private int pictureCount;//图片数量
    /**
     * 以下是酒店模块的查询条件,根据pojo来封装
     */
    private String levelRange;//等级范围,solr搜索条件
    private String priceRange;//价钱范围,solr搜索条件
    private String sorting_txt;//欢迎度排序
    private String Destination;//目的地
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date Arrival;//入住日期
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date CheckOut;//退房日期
    private Integer RoomNum;//房间数量
    private Integer ResidentsNum;//住客数量
    private Integer DayOfPlay;//游玩的天数
    private int index;//分页起始页
    private int end;//分页页数
    private String CommentName;//用户评论姓名
    public int getIndex(){
        return (this.index-1)* this.end;
    }



}
