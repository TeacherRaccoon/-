package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.TravelProGrade;
import com.example.ctrip.Service.TravelProGradeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;


@RestController
@RequestMapping("/traGrade")
public class TravelProGradeController {

    @Resource
    private TravelProGradeService travelProGradeService;

    /**
     * 获取指定id的产品等级评分对象
     * @param travelProGradeId
     * @return
     */
    @RequestMapping("/getGra")
    public Map<String,Object> getTravelProGrade(Integer travelProGradeId){
        return travelProGradeService.getTravelProGrade(travelProGradeId);
    };

    /**
     * 添加
     * @param travelProGrade
     * @return
     */
    @RequestMapping("/addGra")
    public Map<String,Object> addTravelProGrade(TravelProGrade travelProGrade){
        return  travelProGradeService.addTravelProGrade(travelProGrade);
    };

    /**
     * 更新
     * @param travelProGrade
     * @return
     */
    @RequestMapping("/updateGra")
    public Map<String,Object> updateTravelProGrade(TravelProGrade travelProGrade){
        return  travelProGradeService.updateTravelProGrade(travelProGrade);
    };

    /**
     * 删除
     * @param travelProGradeId
     * @return
     */
    @RequestMapping("/delGra")
    public Map<String,Object> delTravelProGrade(Integer travelProGradeId){
        return travelProGradeService.delTravelProGrade(travelProGradeId);
    };
}
