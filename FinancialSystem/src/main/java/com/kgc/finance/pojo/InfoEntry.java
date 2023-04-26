package com.kgc.finance.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


//订单录入
@Component
@Data
public class InfoEntry implements Serializable {
    private Integer orderId;//主键
    private String userName;//借款人姓名
    private String identity;//身份证号
    private String phone;//手机号
    private Integer maritalStatus;//婚姻状态(1.已婚 2.未婚 3.离异)
    private String spouseName;//配偶姓名
    private String spouseIdentity;//配偶身份证号
    private String privateLending;//民间借贷情况
    private String lawsuitCase;//诉讼情况
    private String totalAmount;//总负债金额
    private String foreclosure;//赎楼成数
    private String houseName;//房产名称
    private String area;//面积
    private String address;//房产所在地
    private String assessment;//房产评估
    private String ownerName;//产权人姓名
    private String originalBank;//原贷款银行
    private String originalAmount;//原贷款金额
    private String amountBlance;//原贷款余额
    private String newBank;//新贷款银行
    private String newAmount;//新贷款金额
    private String managerName;//客户经理姓名
    private String managerPhone;//客户经理手机号码
    private String amount;//借款金额
    private Integer amountDays;//借款天数
    private String rate;//费率
    private String brokerage;//收费金额
    private Integer feeWay;//收费方式  0.费用前置 1.费用后置
    private List imgUp;//上传资料信息
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date paragraphTime;//预计出款时间
    private String dealPrice;//成交价格
    private String orderAmount;//定金金额
    private String superviseAmount;//监管金额
    private String buyerName;//买家姓名
    private String buyerIdentity;//买家身份证号
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createDate;//订单创建时间
    private Integer status;//订单状态 (1.待处理 2.风控初审 3.风控审批通过（财务初审）4.风控审批不通过 5.风控终审 6.特审（对财务不通过，进行审核）7.财务审批不通过 8.财务终审 9.不通过审核（作废）)
    private Integer payType;//交易类型
    private Integer salesmanId;//业务员id
    private String returnReson;//驳回原因

}
