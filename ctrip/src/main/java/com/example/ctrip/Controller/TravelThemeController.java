package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.TravelTheme;
import com.example.ctrip.Service.TravelThemeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;


@RestController
@RequestMapping("/theme")
public class TravelThemeController {

    @Resource
    private TravelThemeService travelThemeService;

    /**
     * 获取指定id的旅游产品主题
     * @param travelThemeId
     * @return
     */
    @RequestMapping("/getThemeById")
    public Map<String,Object> getTravelThemeById(Integer travelThemeId){
        return  travelThemeService.getTravelThemeById(travelThemeId);
    };

    /**
     * 获取旅游产品主题的总数
     * @return
     */
    @RequestMapping("/getCount")
    public Map<String,Object> getCount(){
        return  travelThemeService.getCount();
    };

    /**
     * 分页查询所有旅游产品主题
     * @param map
     * @return
     */
    @RequestMapping("/getThemeByPage")
    public Map<String,Object> getTravelThemeByPage(Map map){
        return  travelThemeService.getTravelThemeByPage(map);
    };

    /**
     * 添加新的旅游产品主题
     * @param travelTheme
     * @return
     */
    @RequestMapping("/addTheme")
    public Map<String,Object> addTravelTheme(TravelTheme travelTheme){
        return  travelThemeService.addTravelTheme(travelTheme);
    };

    /**
     * 修改指定id的旅游产品主题
     * @param travelTheme
     * @return
     */
    @RequestMapping("/updateTheme")
    public Map<String,Object> updateTravelTheme(TravelTheme travelTheme){
        return  travelThemeService.updateTravelTheme(travelTheme);
    };

    /**
     * 删除指定id的旅游产品主题
     * @param travelThemeId
     * @return
     */
    @RequestMapping("/delTheme")
    public Map<String,Object> delTravelThemeById(Integer travelThemeId){
        return travelThemeService.delTravelThemeById(travelThemeId);
    };


}
