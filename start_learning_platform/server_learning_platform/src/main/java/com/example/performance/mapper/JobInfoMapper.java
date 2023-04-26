package com.example.performance.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.performance.bean.JobInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
* @description 针对表【job_info(作业信息)】的数据库操作Mapper
* @Entity com.example.performance.bean.JobInfo
*/
@Repository
public interface JobInfoMapper extends BaseMapper<JobInfo> {


    /**
     * 查询全部记录
     * @param page
     * @param param
     * @return
     */
    IPage<Map<String,Object>> selectJobInfoList(@Param("page") Page<Map<String,Object>> page, @Param("param") Map<String,Object> param);


}




