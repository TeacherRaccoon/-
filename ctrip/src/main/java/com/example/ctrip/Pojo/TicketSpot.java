package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Data
public class TicketSpot {

    private int id;//主键
    private String spotName;//景点名称
    private String address;//景点地址
    private String openTime;//开放时间
    private Double price;//价格
    private String level;//等级
    private String imgUrl;//图片路径
    private String notice;//预订须知
    private String reduce;//景点简介
    private Date creationDate;//创建时间
    private int cityId;//城市id
    private String special;//特色
    private String trainAdvice;//交通指南

}
