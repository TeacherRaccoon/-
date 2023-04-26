package com.kgc.finance.service.impl;

import com.kgc.finance.dao.ViewMapper;
import com.kgc.finance.pojo.InfoEntry;
import com.kgc.finance.pojo.OutAmountInfo;
import com.kgc.finance.pojo.UploadInfo;
import com.kgc.finance.service.ViewService;
import com.kgc.finance.util.MapUtil;
import com.kgc.finance.util.TimelineUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: FinancialSystem
 * @Description: $
 * @Param: $
 * @return: $
 * @Author: xieyongde
 * @Date: 2019-09-17
 */
@Service
public class ViewServiceImpl implements ViewService {
    @Resource
    private ViewMapper viewMapper;
    Map<String, Object> map = new HashMap<String, Object>();
    @Resource
    private TimelineUtil timelineUtil;
    /**
     * 查看订单信息
     *
     * @param orderId
     * @return
     */
    @Override
    public Map orderInfo(Integer orderId) {
        InfoEntry infoEntry = viewMapper.orderInfo(orderId);
        if (infoEntry != null) {
            map = MapUtil.encapsulation(true, "查询成功", infoEntry);
        } else {
            map = MapUtil.encapsulation(false, "查询失败");
        }
        return map;
    }

    /**
     * 查看出款信息
     *
     * @param orderId
     * @return
     */
    @Override
    public Map outAmountInfo(Integer orderId) {
        OutAmountInfo outAmountInfo =viewMapper.outAmountInfo(orderId);
        if(outAmountInfo!=null){
            map = MapUtil.encapsulation(true,"查询成功",outAmountInfo);
        }else{
            map=MapUtil.encapsulation(false,"查询失败");
        }
        return map;
    }

    /**
     * 查看图片
     *
     * @param orderId
     * @return
     */
    @Override
    public Map imgInfo(Integer orderId) {
        List<UploadInfo> list =viewMapper.imgInfo(orderId);
        if(list.size()>0){
            map = MapUtil.encapsulation(true,"查询成功",list);
        }else{
            map=MapUtil.encapsulation(false,"查询失败");
        }
        return map;
    }

    /**
     * 点击通过，修改订单状态
     * @param orderId
     * @param status
     * @return
     */
    public Map alterState(Integer orderId,Integer status,Integer salesmanId,Integer windId,Integer financeId,String returnReson){
        Integer count = viewMapper.alterState(orderId,status, salesmanId, windId, financeId);
        Integer id = null;
        if (salesmanId!=null){
            id=salesmanId;
        }else if (windId!=null){
            id=windId;
        }else if (financeId!=null){
            id=financeId;
        }
        if(count>0){
            if (timelineUtil.createTimeline(orderId,status,id,returnReson))
              map = MapUtil.encapsulation(true,"修改成功",count);
            else
              map=MapUtil.encapsulation(false,"修改失败");
        }else{
            map=MapUtil.encapsulation(false,"修改失败");
        }
        return map;
    }

    @Override
    public Map deleteView(Integer orderId) {
        Integer i = viewMapper.deleteView(orderId);
        if(i>0){
            map = MapUtil.encapsulation(true,"删除成功！");
        }else{
            map=MapUtil.encapsulation(false,"删除失败！");
        }
        return map;
    }
}
