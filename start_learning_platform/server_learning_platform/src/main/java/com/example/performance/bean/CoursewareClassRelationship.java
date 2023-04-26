package com.example.performance.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 课件班级关联信息
 * @TableName courseware_class_relationship
 */
@TableName(value ="courseware_class_relationship")
@Data
public class CoursewareClassRelationship implements Serializable {
    /**
     * 课件班级关联ID
     */
    @TableId
    private String id;

    /**
     * 班级ID
     */
    private String classInfoId;

    /**
     * 课件ID
     */
    private String coursewareInfoId;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}