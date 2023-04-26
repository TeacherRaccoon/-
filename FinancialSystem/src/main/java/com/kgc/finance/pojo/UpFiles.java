package com.kgc.finance.pojo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @description:
 * @author: 卢智伟
 * @date: 2019-10 23:57
 */
@Data
public class UpFiles {
    private MultipartFile[] upFiles;//要上传的文件
    private Integer imgType;//文件类型（图片类型）
    private int orderId;//订单编码
    private String imgUrl;//图片路径（图片名称）
    private List imgName;//不需要修改的图片名称


    private int status;//订单状态(用于时间线)
    private int operatedId;//操作员id(时间线)

 }
