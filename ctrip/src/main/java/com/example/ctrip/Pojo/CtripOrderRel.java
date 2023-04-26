package com.example.ctrip.Pojo;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import javax.annotation.security.DenyAll;
import java.util.Date;


@Component
@Data
public class CtripOrderRel {
    private int id;//主键
    private String orderCode;//订单编码
    private int orderType;//订单类型
    private int passengerId;//旅客（入住人id）


    @JsonFormat(pattern = "yyyy-MM-dd ")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date creationDate;//创建日期

    @JsonFormat(pattern = "yyyy-MM-dd ")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date modifyDate;//修改日期
}
