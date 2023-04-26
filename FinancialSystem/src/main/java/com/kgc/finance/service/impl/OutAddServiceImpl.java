package com.kgc.finance.service.impl;

import com.kgc.finance.dao.OutAddMapper;
import com.kgc.finance.dao.PagingMapper;
import com.kgc.finance.pojo.InfoEntry;
import com.kgc.finance.pojo.OutAmountInfo;
import com.kgc.finance.service.OutAddService;
import com.kgc.finance.service.PagingService;
import com.kgc.finance.util.MapUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class OutAddServiceImpl implements OutAddService {
    @Resource
    private OutAddMapper outAddMapper;
    Map<String, Object> map = new HashMap<String, Object>();
    /**
     * 添加一条出款信息
     * @param outAmountInfo
     * @return
     */
    @Override
    public Map out_add(OutAmountInfo outAmountInfo) {
        Integer count = outAddMapper.out_add(outAmountInfo);
        if (count >= 0) {
            map = MapUtil.encapsulation(true, "添加成功", count);
        } else {
            map = MapUtil.encapsulation(false, "添加失败");
        }
        return map;
    }

    /**
     * 修改出款信息
     * @param outAmountInfo
     * @return
     */
    @Override
    public Map out_up(OutAmountInfo outAmountInfo) {
        Integer count = outAddMapper.out_up(outAmountInfo);
        if (count > 0) {
            map = MapUtil.encapsulation(true, "修改成功", count);
        } else {
            map = MapUtil.encapsulation(false, "修改失败");
        }
        return map;
    }
    /**
     * 删除出款信息
     * @param outAmountId
     * @return
     */
   public Map out_dele(Integer outAmountId){
       Integer count = outAddMapper.out_dele(outAmountId);
       if (count > 0) {
           map = MapUtil.encapsulation(true, "删除成功", count);
       } else {
           map = MapUtil.encapsulation(false, "删除失败");
       }
       return map;
   }
}
