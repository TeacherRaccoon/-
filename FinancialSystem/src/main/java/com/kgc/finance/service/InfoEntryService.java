package com.kgc.finance.service;

import com.kgc.finance.pojo.ImgUp;
import com.kgc.finance.pojo.InfoEntry;
import com.kgc.finance.pojo.UpFiles;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface InfoEntryService {

    /**
     * 添加订单
     * @param infoEntry
     * @param imgUp
     * @return
     */
    public Map addInfoEntry(InfoEntry infoEntry,ImgUp imgUp,String salesmanId);
    /**
     * 根据订单 id 修改订单信息
     *
     * @param infoEntry
     * @return map
     */
    public Map upInfoEntry(InfoEntry infoEntry);

    /**
     * 上传图片
     *
     * @param imgUp
     * @return map
     */
    public Map upLoadImg(ImgUp imgUp);

    //根据订单Id获取订单信息
    public Map getInfoEntryByOrderId(Integer orderId);

    //根据订单Id修改订单
    public Map upInfoEntry(InfoEntry infoEntry,ImgUp imgUp,String salesmanId);

    //上传文件2.0   --单次最多传5张图片
    public Map upFiles(UpFiles upFiles);

    //修改文件2.0   --单次最多修改5张图片
    public Map updateFiles(UpFiles upFiles);
}
