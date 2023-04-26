package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Data
public class TravelProvider {
    private int id;
    private String providerName;//供应商全称
    private String providerAbb;//供应商简称
    private String productDetails;//供应商说明
    private String licenseNo;//许可证编号
    private int provinceId;//所在省份
    private int cityId;//地区
    private String providerAddress;//详细地址
    private int createBy;//创建人id
    private Date creationDate;//创建日期
    private int modifiedBy;//修改人id
    private Date modifyDate;//修改日期
    private Img img;//经营许可证



}
