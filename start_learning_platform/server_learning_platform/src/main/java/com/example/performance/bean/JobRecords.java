package com.example.performance.bean;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 作业记录
 * @TableName job_records
 */
@TableName(value ="job_records")
@Data
public class JobRecords implements Serializable {
    /**
     * 作业记录ID
     */
    @TableId
    private String id;

    /**
     * 作业ID；关联作业信息
     */
    private String jobInfoId;

    /**
     * 用户ID；关联用户信息
     */
    private String userInfoId;

    /**
     * 得分
     */
    private Double score;

    /**
     * 作业备注
     */
    private String jobNotes;

    /**
     * 作业文件
     */
    private String jobFiles;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:ss", timezone = "GMT+8")
    private Date createTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
