package com.example.ctrip.Controller;

import com.example.ctrip.Pojo.TravelProvider;
import com.example.ctrip.Service.TravelProviderService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;


@RestController
@RequestMapping("/travel")
public class TravelProviderController {
    @Resource
    private TravelProviderService travelProviderService;

    /**
     * 获取指定id的供应商
     * @param id
     * @return
     */
    @RequestMapping("/getProById")
    public Map<String,Object> getProviderById(Integer id){
        return travelProviderService.getProviderById(id);
    };

    /**
     * 获取满足map集合中条件的供应商集合
     * @param map
     * @return
     */
    @RequestMapping("/getProByCondition")
    public Map<String,Object> getProviderByCondition(Map map){
        return travelProviderService.getProviderByCondition(map);
    };

    /**
     * 分页查询，查询条件包括页码，页容量和其他条件
     * @param map
     * @return
     */
    @RequestMapping("/getProByPage")
    public Map<String,Object> getProviderByPage(Map map){
        return travelProviderService.getProviderByPage(map);
    };

    /**
     * 添加供应商
     * @param travelProvider
     * @return
     */
    @RequestMapping("/addPro")
    public Map<String,Object> addProvider(TravelProvider travelProvider){
        return travelProviderService.addProvider(travelProvider);
    };

    /**
     * 更新供应商信息
     * @param travelProvider
     * @return
     */
    @RequestMapping("/updatePro")
    public Map<String,Object> updateProvider(TravelProvider travelProvider){
        return travelProviderService.updateProvider(travelProvider);
    };

    /**
     * 删除指定id的供应商
     * @param id
     * @return
     */
    @RequestMapping("/delProById")
    public Map<String,Object> delProviderById(Integer id){
        return travelProviderService.delProviderById(id);
    };
}
