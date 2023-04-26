package com.example.performance.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.performance.bean.StudentInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
* @description 针对表【student_info(学生信息)】的数据库操作Mapper
* @Entity com.example.vehicleinformationsystem.bean.StudentInfo
*/
@Repository
public interface StudentInfoMapper extends BaseMapper<StudentInfo> {

    /**
     * 查询列表
     * @param page
     * @param param
     * @return
     */
    IPage<Map<String,Object>> selectStudentInfoList(@Param("page")Page<Map<String,Object>> page, @Param("param") Map<String,Object> param);
}




