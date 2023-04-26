package com.example.performance.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.performance.bean.CoursewareInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
* @description 针对表【courseware_info(课件信息)】的数据库操作Mapper
* @Entity com.example.performance.bean.CoursewareInfo
*/
@Repository
public interface CoursewareInfoMapper extends BaseMapper<CoursewareInfo> {


    /**
     * 查询列表
     * @param page
     * @param param
     * @return
     */
    IPage<Map<String,Object>> selectCoursewareInfoList(@Param("page")Page<Map<String,Object>> page, @Param("param") Map<String,Object> param);
}




