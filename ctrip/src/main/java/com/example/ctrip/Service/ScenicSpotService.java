package com.example.ctrip.Service;

import com.example.ctrip.Pojo.ScenicSpot;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ScenicSpotService {
    /**
     *
     * @param scenicSpotId
     * @return
     */
    public Map<String,Object>  getScenicSpotById(@Param(value = "id") Integer scenicSpotId);

    /**
     *
     * @return
     */
    public Map<String,Object>  getCount();

    /**
     *
     * @param map
     * @return
     */
    public Map<String,Object>  getScenicSpotListByPage(Map map);

    /**
     *
     * @param scenicSpot
     * @return
     */
    public Map<String,Object>  addScenicSpot(ScenicSpot scenicSpot);

    /**
     *
     * @param scenicSpot
     * @return
     */
    public Map<String,Object>  updateScenicSpot(ScenicSpot scenicSpot);

    /**
     *
     * @param scenicSpotId
     * @return
     */
    public Map<String,Object> delScenicSpotById(@Param(value = "id") Integer scenicSpotId);

}
