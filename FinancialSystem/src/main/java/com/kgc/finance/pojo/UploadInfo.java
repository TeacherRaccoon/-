package com.kgc.finance.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Data
//上传信息表
public class UploadInfo {
    private Integer infoId;//主键
    private String imgUrl;//图片路径
    private Integer orderId;//用户Id
    private Integer imageType;//图片类型（1.客户资料，2.房产资料，3.银行资料，4.账户资料，5.面签资料，6.其他）
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date creationDate;//创建日期
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date modifyDate;//修改日期
 }
