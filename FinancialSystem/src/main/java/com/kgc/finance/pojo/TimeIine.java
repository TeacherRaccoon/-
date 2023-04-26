package com.kgc.finance.pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Data
//时间线表
public class TimeIine {
    private int timeId;//主键
    private String statusName;//状态说明
    private String operatorId;//操作员
    private String returnReson;//驳回说明
    private Date modeifyDate;//时间
    private int orderId;//订单Id
}
