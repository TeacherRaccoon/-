package com.example.performance.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 班级信息
 * @TableName class_info
 */
@TableName(value ="class_info")
@Data
public class ClassInfo implements Serializable {
    /**
     *
     */
    @TableId(value = "id")
    private String id;

    /**
     * 年级
     */
    @TableField(value = "grade")
    private String grade;

    /**
     * 班级名称
     */
    @TableField(value = "class_name")
    private String className;

    /**
     * 班级人数
     */
    @TableField(value = "class_size")
    private Integer classSize;

    /**
     * 班主任
     */
    @TableField(value = "user_info_id")
    private String userInfoId;

    /**
     * 班级编号
     */
    @TableField(value = "class_number")
    private String classNumber;

    /**
     * 建班时间
     */
    @TableField(value = "construction_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date constructionTime;

    /**
     * 关联课程关系
     */
    @TableField(exist = false)
    private List<CoursewareClassRelationship>  coursewareClassRelationshipList;


    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
