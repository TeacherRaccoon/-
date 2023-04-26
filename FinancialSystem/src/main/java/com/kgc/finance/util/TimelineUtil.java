package com.kgc.finance.util;

import com.kgc.finance.dao.AdministratorDao;
import com.kgc.finance.service.TimeIineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;


@Component
public class TimelineUtil {

    @Autowired
    private TimeIineService timeIineService;

    @Autowired
    private AdministratorDao administratorDao;

    /**
     * 添加时间线节点（驳回调用）
     * @param orderId 订单id
     * @param status  订单状态id
     * @param operatorId  操作员id
     * @param returnReson 驳回原因
     * @return
     */
    public boolean createTimeline(Integer orderId,Integer status,Integer operatorId,String returnReson){
        return timeIineService.insertTimeIine(orderId,this.transforStatus(status),this.transforAid(operatorId),returnReson);
    }




    //获得当前时间的前或者后几天
    public String GetDay(Integer day){
        // 时间表示格式可以改变，yyyyMMdd需要写例如20160523这种形式的时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // 将字符串的日期转为Date类型，ParsePosition(0)表示从第一个字符开始解析
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        // add方法中的第二个参数n中，正数表示该日期后n天，负数表示该日期的前n天
        calendar.add(Calendar.DATE, -day);
        Date date1 = calendar.getTime();
        return sdf.format(date1);
    }



    /**
     * 对操作人员的id进行转换
     * @param operatorId
     * @return
     */
    private String  transforAid(Integer operatorId){
       Map map= administratorDao.getIdFindnameAndRole(operatorId);
        String name= (String) map.get("name");
        Integer role= (Integer) map.get("role");
        switch (role){
            case 1:
                return operatorId+"业务员:  "+name;
            case 2:
                return operatorId+"风控员:  "+name;
            case 3:
                return operatorId+"财务员:  "+name;
            default:
                return operatorId+"超管:  "+name;
        }
    }






    /**
     * 对操作人员的id进行转换
     * @param status
     * @return
     */
    private String  transforStatus(Integer status){
        switch (status){
            case 1:
                return "信息录入";
            case 2:
                return "业务员进行提案";
            case 3:
                return "风控审批通过";
            case 4:
                return "风控初审驳回，业务员修改数据，提案";
            case 5:
                return "风控初审不通过（驳回）";
            case 6:
                return "财务审批通过";
            case 7:
                return "财务初审驳回，业务员修改数据，提案";
            case 8:
                return "财务初审不通过（驳回）";
            case 9:
                return "审核失败（订单失效，驳回）";
            case 10:
                return "业务回款并上传凭证";
            case 11:
                return "逾期未还";
            case 12:
                return "订单失效";
            case 13:
                return "财务进行出款并上传凭证";
            case 14:
                return "客户结清原贷款";
            case 15:
                return "业务员上传原房产信息";
            case 16:
                return "业务上传过户信息";
            case 17:
                return "业务员上传新房产信息";
            case 18:
                return "上传抵押凭证";
            case 19:
                return "财务结单";
            default:
                return "";
        }
    }
}
