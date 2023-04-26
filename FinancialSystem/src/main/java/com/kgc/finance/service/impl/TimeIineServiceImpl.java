package com.kgc.finance.service.impl;

import com.kgc.finance.dao.AdministratorDao;
import com.kgc.finance.dao.TimeIineDao;
import com.kgc.finance.pojo.TimeIine;
import com.kgc.finance.service.TimeIineService;
import com.kgc.finance.util.MapUtil;
import com.kgc.finance.util.TimelineUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author: 方子瑞
 * @program: com.kgc.finance.service.impl.TimeIineServiceImpl
 * @explain: 时间线业务接口实现类
 * @create: 2019-09-20 11:27
 **/
@Service
@Transactional
public class TimeIineServiceImpl implements TimeIineService {

    @Autowired
    private TimeIineDao timeIineDao;

    @Autowired
    private TimelineUtil timelineUtil;

    @Override
    public int getIdfinInfoEntry(Integer operatorId) {
        List<Integer> count= timeIineDao.getIdfinInfoEntry(operatorId);
        return count.size();
    }

    @Override
    public Map getOrderIdFindAll(Integer orderId) {
       List list= timeIineDao.getOrderIdFindAll(orderId);
       if (list.size()!=0){
           return MapUtil.encapsulation(true,"时间线数据获取成功！",list);
       }else {
           return MapUtil.encapsulation(false,"该订单暂无操作！");
       }
    }

    @Override
    public Boolean insertTimeIine(Integer orderId, String status, String operatorName, String returnReson) {
        TimeIine timeIine=new TimeIine();
        timeIine.setOrderId(orderId);
        timeIine.setStatusName(status);
        timeIine.setOperatorId(operatorName);
        timeIine.setReturnReson(returnReson);
        Integer i= timeIineDao.insertTimeIine(timeIine);
        if (i>0)
            return true ;
        else
            return false;
    }

    @Override
    public Boolean getBooleans(Integer orderId) {
        Integer i=timeIineDao.getBooleans(orderId);
        if (i>0)
            return false;
        else
         return true;
    }

    @Override
    public Map getPing(Integer orderId) {
        Map map=  timeIineDao.getPing(orderId);
        switch (map.get("statusName").toString()){
            case "财务进行出款并上传凭证":
                map.put("day",3);
                return MapUtil.encapsulation(true,"",map);
            case "客户结清原贷款":
                map.put("day",5);
                return MapUtil.encapsulation(true,"",map);
            case "业务员上传原房产信息":
                map.put("day",5);
                return MapUtil.encapsulation(true,"",map);
            case "业务上传过户信息":
                map.put("day",5);
                return MapUtil.encapsulation(true,"",map);
            case "业务员上传新房产信息":
                map.put("day",3);
                return MapUtil.encapsulation(true,"",map);
            default:
                return  MapUtil.encapsulation(false,"");
        }
    }

    @Override
    public Map getTime() {
        Map map=new HashMap();
        map.put("d1",timeIineDao.getTime(timelineUtil.GetDay(-2)));
        map.put("d2",timeIineDao.getTime(timelineUtil.GetDay(-1)));
        map.put("d3",timeIineDao.getTime(timelineUtil.GetDay(0)));
        map.put("d4",timeIineDao.getTime(timelineUtil.GetDay(1)));
        map.put("d5",timeIineDao.getTime(timelineUtil.GetDay(2)));
        return map;
    }


}
