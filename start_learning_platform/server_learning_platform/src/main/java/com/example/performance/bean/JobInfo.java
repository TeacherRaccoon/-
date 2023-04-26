package com.example.performance.bean;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 作业信息
 * @TableName job_info
 */
@TableName(value ="job_info")
@Data
public class JobInfo implements Serializable {
    /**
     * 作业ID
     */
    @TableId
    private String id;

    /**
     * 标题
     */
    private String title;

    /**
     * 描述
     */
    private String remarks;

    /**
     * 附件地址
     */
    private String attachmentAddress;
    /**
     * 课程ID
     */
    private String coursewareInfoId;
    /**
     * 班级ID
     */
    private String classInfoId;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:ss", timezone = "GMT+8")
    private Date createTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
