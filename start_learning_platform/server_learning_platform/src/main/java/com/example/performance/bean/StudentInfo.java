package com.example.performance.bean;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 学生信息
 * @TableName student_info
 */
@TableName(value ="student_info")
@Data
public class StudentInfo implements Serializable {
    /**
     *
     */
    @TableId(value = "id")
    private String id;

    /**
     *关联班级ID
     */

    private String classInfoId;

    /**
     * 关联用户ID
     */

    private String userInfoId;

    /**
     * 学号
     */

    private String studentNumber;



    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
