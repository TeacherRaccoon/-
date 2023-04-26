package com.kgc.finance.dao;

import com.kgc.finance.pojo.InfoEntry;
import com.kgc.finance.pojo.OutAmountInfo;
import com.kgc.finance.pojo.UploadInfo;
import java.util.List;



public interface ViewMapper {

    /**
     * 查看订单信息
     * @param orderId
     * @return
     */
    InfoEntry orderInfo(Integer orderId);

    /**
     * 查看出款信息
     * @param orderId
     * @return
     */
    OutAmountInfo outAmountInfo(Integer orderId);

    /**
     *查看图片
     * @param orderId
     * @return
     */
    List<UploadInfo> imgInfo(Integer orderId);

    /**
     * 点击通过，修改订单状态
     * @param orderId
     * @param status
     * @return
     */
    Integer alterState(Integer orderId,Integer status,Integer salesmanId,Integer windId,Integer financeId);



    /**
     * 删除订单
     * @param orderId
     * @return
     */
    Integer deleteView(Integer orderId);


}
