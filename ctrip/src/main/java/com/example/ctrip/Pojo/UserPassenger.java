package com.example.ctrip.Pojo;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Data
public class UserPassenger {
    private int id;//主键
    private String name;//旅客姓名A
    private int gender;//性别
    private String phone;//联系电话
    private int certificateType;//证件类型
    private String certificateNumber;//证件号码
    private String nationalityId;//国籍
    private Date modifyDate = new Date();//修改日期
    private String englishName;//英文名
    private String tel;//固话
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;//出生日期
    private String birthPlace;//出生地
    private String email;//邮箱
    private String fox;//传真
    private int userId;//用户id
    private int orderId;//订单id
    private int contactId;//联系人id
    private String loginName;//登录名
}
