package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Data
public class UserContact {

    private int id;//主键
    private String name;//联系人姓名
    private String phone;//联系人手机号码
    private String email;//邮箱
    private int contactType;//联系人类型 普通 默认
    private int userId;//指向的用户id
    private Date modifyDate = new Date();//修改日期
    private String loginName;//登录名
}
