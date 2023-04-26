package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Data
public class TravelProductInventory {
    private int id;//id
    private int productId;//旅游产品id
    private Date recordDate;//最后一次更新库存日期
    private int store;//剩余库存
    private Date creationDate;//创建日期

}
