package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.TravelProReviewMapper;
import com.example.ctrip.Pojo.TravelProReview;
import com.example.ctrip.Service.TravelProReviewService;
import com.example.ctrip.util.MapUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Service
public class TravelProReviewServiceImpl implements TravelProReviewService {

    @Resource
    private TravelProReviewMapper travelProReviewMapper;
    /**
     * 根据产品id获取所有评论总数
     * @return
     */
    @Override
    public Map<String, Object> getCountByProductId(Integer productId) {
        Map result;
        try{
            Integer count=travelProReviewMapper.getCountByProductId(productId);
            if(count>0){
                result= MapUtil.encapsulation("true","获取当前产品评论总数成功",count);
            }else{
                result=MapUtil.encapsulation("false","获取当前产品评论总数失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，获取当前产品评论总数失败");
        }
        return result;
    }
    /**
     * 获取指定id的评论
     * @param TravelProReviewId
     * @return
     */
    @Override
    public Map<String, Object> getTravelProReviewById(Integer TravelProReviewId) {
        Map result;
        try{
            TravelProReview travelProReview=travelProReviewMapper.getTravelProReviewById(TravelProReviewId);
            if(travelProReview !=null){
                result= MapUtil.encapsulation("true","获取产品评论成功",travelProReview);
            }else{
                result=MapUtil.encapsulation("false","获取产品评论失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，获取产品评论失败");
        }
        return result;
    }
    /**
     * 获取某一用户的所有旅游产品评论总数
     * @param userId
     * @return
     */
    @Override
    public Map<String, Object> getCountByUserId(Integer userId) {
        Map result;
        try{
            Integer count=travelProReviewMapper.getCountByUserId(userId);
            if(count>0){
                result= MapUtil.encapsulation("true","获取当前用户的评论总数成功",count);
            }else{
                result=MapUtil.encapsulation("false","获取当前用户的评论总数失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，获取当前用户的评论总数失败");
        }
        return result;
    }
    /**
     * 获取某一用户的所有评论
     * @param userId
     * @return
     */
    @Override
    public Map<String, Object> getTroProRevByUserId(Integer userId) {
        Map result;
        try{
            List list= travelProReviewMapper.getTroProRevListByUserId(userId);
            if(list.size()>0){
                result= MapUtil.encapsulation("true","获取当前用户的所有产品评论成功",list);
            }else{
                result=MapUtil.encapsulation("false","获取当前用户的所有产品评论失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，获取当前用户的所有产品评论失败");
        }
        return result;
    }
    /**
     * 分页查询
     * @param map
     * @return
     */
    @Override
    public Map<String, Object> getTravelProReviewListByPage(Map map) {
        Map result;
        try{
            List list= travelProReviewMapper.getTravelProReviewListByPage(map);
            if(list.size()>0){
                result= MapUtil.encapsulation("true","分页查询产品评论成功",list);
            }else{
                result=MapUtil.encapsulation("false","分页查询产品评论失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，分页查询产品评论失败");
        }
        return result;
    }
    /**
     * 添加评论
     * @param travelProReview
     * @return
     */
    @Transactional
    @Override
    public Map<String, Object> addTraProRev(TravelProReview travelProReview) {
        Map result;
        try{
            Integer num= travelProReviewMapper.addTraProRev(travelProReview);
            if(num==1){
                result= MapUtil.encapsulation("true","添加产品评论成功",num);
            }else{
                result=MapUtil.encapsulation("false","添加产品评论失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，添加产品评论失败");
        }
        return result;
    }
    /**
     * 修改评论
     * @param travelProReview
     * @return
     */
    @Transactional
    @Override
    public Map<String, Object> updateTraProRev(TravelProReview travelProReview) {
        Map result;
        try{
            Integer num= travelProReviewMapper.updateTraProRev(travelProReview);
            if(num==1){
                result= MapUtil.encapsulation("true","修改产品评论成功",num);
            }else{
                result=MapUtil.encapsulation("false","修改产品评论失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，修改产品评论失败");
        }
        return result;
    }
    /**
     * 删除评论
     * @param TravelProReviewId
     * @return
     */
    @Transactional
    @Override
    public Map<String, Object> delTrApRroRev(Integer TravelProReviewId) {
        Map result;
        try{
            Integer num= travelProReviewMapper.delTrApRroRev(TravelProReviewId);
            if(num==1){
                result= MapUtil.encapsulation("true","删除产品评论成功",num);
            }else{
                result=MapUtil.encapsulation("false","删除产品评论失败");
            }
        }catch (Exception e){
            result=MapUtil.encapsulation("false","程序异常，删除产品评论失败");
        }
        return result;
    }
}
