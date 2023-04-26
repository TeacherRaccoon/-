package com.example.performance.bean;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 课件信息
 * @TableName courseware_info
 */
@TableName(value ="courseware_info")
@Data
public class CoursewareInfo implements Serializable {
    /**
     * 课件信息ID
     */
    @TableId
    private String id;

    /**
     * 课件名称
     */
    private String coursewareName;

    /**
     * 课件文件路径
     */
    private String coursewarePath;

    /**
     * 课件视频路径
     */
    private String coursewareVideo;

    /**
     * 课件备注
     */
    private String coursewareDescription;

    /**
     * 教师ID
     */
    private String teacherId;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:ss", timezone = "GMT+8")
    private Date createTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
