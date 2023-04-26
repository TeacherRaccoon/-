package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.TravelProReview;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface TravelProReviewMapper {
    /**
     * 根据产品id获取所有评论总数
     * @return
     */
    public Integer getCountByProductId(@Param(value = "tripProductId") Integer productId);
    /**
     * 获取指定id的评论
     * @param TravelProReviewId
     * @return
     */
    public TravelProReview getTravelProReviewById(@Param(value = "id") Integer TravelProReviewId);


   public Integer getCountByUserId(Integer userId);
    /**
     * 获取某一用户的所有评论
     * @param userId
     * @return
     */
    public List<TravelProReview> getTroProRevListByUserId(Integer userId);

    /**
     * 分页查询
     * @param map
     * @return
     */
    public List<TravelProReview> getTravelProReviewListByPage(Map map);

    /**
     * 添加评论
     * @param travelProReview
     * @return
     */
    public Integer addTraProRev(TravelProReview travelProReview);

    /**
     * 修改评论
     * @param travelProReview
     * @return
     */
    public Integer updateTraProRev(TravelProReview travelProReview);

    /**
     * 删除评论
     * @param TravelProReviewId
     * @return
     */
    public Integer delTrApRroRev(@Param(value = "id")Integer TravelProReviewId);
}
