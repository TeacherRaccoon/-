package com.kgc.finance.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @version 1.0
 * @auther 何鑫
 * @Date 2019/9/916:13
 */
@Component
@Data
//出款账户信息表
public class OutAmountInfo {
    private int outAmountId;//主键
    private String amountNo;//出款账户
    private String amountName;//户主姓名
    private String amountBank;//开户银行
    private String returnedName;//回款户名
    private String returnedBank;//回款银行
    private String returnedAmount;//回款账号
    private int orderId;//订单Id
}
