package com.kgc.finance.dao;

import com.kgc.finance.pojo.ImgUp;
import com.kgc.finance.pojo.InfoEntry;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @auther 何鑫
 * @Date 2019/9/1620:02
 */
public interface InfoEntryMapper {
    /**
     * 添加订单信息
     *
     * @param infoEntry
     * @return
     */
    public Integer addInfoEntry(InfoEntry infoEntry);


    /**
     * 根据订单 id 修改订单信息
     * @param infoEntry
     * @return
     */
    public Integer upInfoEntry(InfoEntry infoEntry);

    /***
     * 添加图片
     * @param imgUp
     * @return
     */
    public int inserImgInfo(ImgUp imgUp);


    //根据订单Id获取订单信息
    public InfoEntry getInfoEntryByOrderId(Integer orderId);


    //根据图片imgURL删除图片
    public Integer delImgByImgName(List imgNames);
}
