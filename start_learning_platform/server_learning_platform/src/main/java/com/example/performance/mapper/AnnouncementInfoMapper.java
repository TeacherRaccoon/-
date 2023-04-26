package com.example.performance.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.performance.bean.AnnouncementInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
* @description 针对表【announcement_info(通知信息)】的数据库操作Mapper
* @Entity com.example.performance.bean.AnnouncementInfo
*/
@Repository
public interface AnnouncementInfoMapper extends BaseMapper<AnnouncementInfo> {


    /**
     * 查询列表
     * @param param
     * @return
     */
   Map<String,Object> selectHomePageData(Map<String,Object> param);
}




