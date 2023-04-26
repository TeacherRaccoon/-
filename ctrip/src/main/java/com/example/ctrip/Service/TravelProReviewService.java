package com.example.ctrip.Service;

import com.example.ctrip.Pojo.TravelProReview;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface TravelProReviewService {
    /**
     * 根据产品id获取所有评论总数
     * @return
     */
    public Map<String,Object> getCountByProductId(@Param(value = "tripProductId") Integer productId);
    /**
     * 获取指定id的评论
     * @param TravelProReviewId
     * @return
     */
    public Map<String,Object> getTravelProReviewById(@Param(value = "id") Integer TravelProReviewId);

    /**
     * 获取某一用户的所有旅游产品评论
     * @param userId
     * @return
     */
   public Map<String,Object> getCountByUserId(Integer userId);
    /**
     * 获取某一用户的所有评论
     * @param userId
     * @return
     */
    public Map<String,Object> getTroProRevByUserId(Integer userId);

    /**
     * 分页查询
     * @param map
     * @return
     */
    public Map<String,Object> getTravelProReviewListByPage(Map map);

    /**
     * 添加评论
     * @param travelProReview
     * @return
     */
    public Map<String,Object> addTraProRev(TravelProReview travelProReview);

    /**
     * 修改评论
     * @param travelProReview
     * @return
     */
    public Map<String,Object> updateTraProRev(TravelProReview travelProReview);

    /**
     * 删除评论
     * @param TravelProReviewId
     * @return
     */
    public Map<String,Object> delTrApRroRev(@Param(value = "id") Integer TravelProReviewId);
}
