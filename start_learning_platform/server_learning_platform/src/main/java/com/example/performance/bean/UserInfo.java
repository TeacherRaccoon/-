package com.example.performance.bean;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

/**
 * @Description: 用户信息
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@TableName("user_info")
public class UserInfo {
  @TableId(value = "id")
  private String  id;
  private String  nickName;
  private String  code;
  private String  headSculpture;
  private String  password;
  private String  gender;
  private Integer  age;
  private Integer  userIdentity;
  @TableField(value = "create_time", fill = FieldFill.INSERT)
  @JsonFormat(pattern = "yyyy-MM-dd HH:MM:ss", timezone = "GMT+8")
  private Date createTime;
}
