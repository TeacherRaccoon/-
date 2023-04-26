package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.ScenicSpot;
import com.example.ctrip.Service.ScenicSpotService;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;


@RestController
@RequestMapping("/spot")
public class ScenicSpotController {
    //自动注入景点的service层
    @Resource
    private ScenicSpotService scenicSpotService;

    /**
     *
     * @param scenicSpotId
     * @return
     */
    @RequestMapping("/getSpotById")
    public Map<String,Object> getScenicSpotById(Integer scenicSpotId){
        return scenicSpotService.getScenicSpotById(scenicSpotId);
    };

    /**
     *
     * @return
     */
    @RequestMapping("/getCount")
    public Map<String,Object>  getCount(){
        return scenicSpotService.getCount();
    };

    /**
     *
     * @param map
     * @return
     */
    @RequestMapping("/getSpotByPage")
    public Map<String,Object>  getScenicSpotListByPage(Map map){
        return scenicSpotService.getScenicSpotListByPage(map);
    };

    /**
     *
     * @param scenicSpot
     * @return
     */
    @RequestMapping("/addSpot")
    public Map<String,Object>  addScenicSpot(ScenicSpot scenicSpot){
        return scenicSpotService.addScenicSpot(scenicSpot);
    };

    /**
     *
     * @param scenicSpot
     * @return
     */
    @RequestMapping("/updateSpot")
    public Map<String,Object>  updateScenicSpot(ScenicSpot scenicSpot){
        return scenicSpotService.updateScenicSpot(scenicSpot);
    };

    /**
     *
     * @param scenicSpotId
     * @return
     */
    @RequestMapping("/delSpot")
    public Map<String,Object> delScenicSpotById(Integer scenicSpotId){
        return scenicSpotService.delScenicSpotById(scenicSpotId);
    };


}
