package com.example.performance.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.performance.bean.ClassInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
* @description 针对表【class_info(班级信息)】的数据库操作Mapper
* @Entity com.example.vehicleinformationsystem.bean.ClassInfo
*/
@Repository
public interface ClassInfoMapper extends BaseMapper<ClassInfo> {
    /**
     * 查询全部记录
     * @param page
     * @param param
     * @return
     */
    IPage<Map<String,Object>> selectClassInfoAllList(@Param("page") Page<Map<String,Object>> page, @Param("param") Map<String,Object> param);


    int updateClassInfoUserInfoId(Map<String,Object> param);
}





