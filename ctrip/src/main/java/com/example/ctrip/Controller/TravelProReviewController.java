package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.TravelProReview;
import com.example.ctrip.Service.TravelProReviewService;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;


@RestController
@RequestMapping("/review")
public class TravelProReviewController {

    @Resource
    private TravelProReviewService travelProReviewService;
    /**
     * 根据产品id获取所有评论总数
     * @return
     */
    @RequestMapping("/getCountById")
    public Map<String,Object> getCountByProductId(@Param(value = "tripProductId") Integer productId){
        return travelProReviewService.getCountByProductId(productId);
    };
    /**
     * 获取指定id的评论
     * @param TravelProReviewId
     * @return
     */
    @RequestMapping("/getRevById")
    public Map<String,Object> getTravelProReviewById(@Param(value = "id") Integer TravelProReviewId){
        return  travelProReviewService.getTravelProReviewById(TravelProReviewId);
    };

    /**
     * 获取某一用户的所有旅游产品评论
     * @param userId
     * @return
     */
    @RequestMapping("/getCountByUserId")
    public Map<String,Object> getCountByUserId(Integer userId){
        return  travelProReviewService.getCountByUserId(userId);
    };
    /**
     * 获取某一用户的所有评论
     * @param userId
     * @return
     */
    @RequestMapping("/getRevByUserId")
    public Map<String,Object> getTroProRevByUserId(Integer userId){
        return  travelProReviewService.getTroProRevByUserId(userId);
    };

    /**
     * 分页查询
     * @param map
     * @return
     */
    @RequestMapping("/getRevByPage")
    public Map<String,Object> getTravelProReviewListByPage(Map map){
        return travelProReviewService.getTravelProReviewListByPage(map);
    };

    /**
     * 添加评论
     * @param travelProReview
     * @return
     */
    @RequestMapping("/addRev")
    public Map<String,Object> addTraProRev(TravelProReview travelProReview){
        return  travelProReviewService.addTraProRev(travelProReview);
    };

    /**
     * 修改评论
     * @param travelProReview
     * @return
     */
    @RequestMapping("/updateRev")
    public Map<String,Object> updateTraProRev(TravelProReview travelProReview){
        return  travelProReviewService.updateTraProRev(travelProReview);
    };

    /**
     * 删除评论
     * @param TravelProReviewId
     * @return
     */
    @RequestMapping("/delRev")
    public Map<String,Object> delTrApRroRev(@Param(value = "id") Integer TravelProReviewId){
        return  travelProReviewService.delTrApRroRev(TravelProReviewId);
    };
}
