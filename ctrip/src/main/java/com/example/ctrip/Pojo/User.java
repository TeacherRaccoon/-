package com.example.ctrip.Pojo;


import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * UserPoJo类
 * 使用lombok
 */
@Component
@Data
public class User {
    private int id;     //用户id
    private String userName;//用户真实姓名
    private int gender; //性别1.男 2.女
    private String loginName;//登录名
    private String password;//登录密码
    //解决字符串转日期格式问题
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;//出生日期
    private String phone;//电话号码
    private String address;//地址
    private String picture;//头像
    private String tel;//固话
    private String email;//邮箱
    private Date creationDate;//创建日期
    private Date modifyDate = new Date();
    private String petName;//昵称
    private String departureCity;//常用出发城市
    private int certificateType;//证件类型
    private String certificateNumber;//证件号码
}
