package com.example.performance.bean;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 通知信息
 * @TableName announcement_info
 */
@TableName(value ="announcement_info")
@Data
public class AnnouncementInfo implements Serializable {
    /**
     * 通知信息Id
     */
    @TableId
    private String id;
    /**
     * 通知标题
     */
    private String title;
    /**
     * 通知内容
     */
    private String content;
    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:ss", timezone = "GMT+8")
    private Date createTime;
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
