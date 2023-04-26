package com.kgc.finance.pojo;

import lombok.Data;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author 何夏麟
 * @date 9/24/2019 15:46
 */
@ComponentScan
@Data
public class ImgUp {
    private MultipartFile[] customer={}; //客户资料
    private MultipartFile[] RealEstate={}; //房产资料
    private MultipartFile[] BankImg={}; //银行资料
    private MultipartFile[] Account={}; //账户资料
    private MultipartFile[] FaceSigned={}; //面签资料
    private MultipartFile[] Other={}; //其他
    private List imgNames;//图片名称
    private int OrderId;    //订单Id
    private String imgUrl;  //图片名字
    private int imageType;  //图片类型

}
