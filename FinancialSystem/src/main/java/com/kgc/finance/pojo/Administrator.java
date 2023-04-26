package com.kgc.finance.pojo;


import lombok.Data;

import java.util.Date;

/**
 * @author: 方子瑞
 * @program: com.kgc.finance.pojo.Administrator
 * @explain: 管理员pojo
 * @create: 2019-09-07 13:55
 **/
@Data
public class Administrator {

    //管理员id
    private Integer id;
    //管理员姓名
    private String name;
    //登录账户
    private String account;
    //登录密码
    private String password;
    //性别(1.男 2.女)
    private Integer gender;
    //用户角色（0.超级 1.业务 2.风控 3.财务）
    private Integer role;
    //管理员状态(1.启用 2.禁用)
    private Integer status;
    //注册时间
    private Date registerDate;
    //最后一次修改时间
    private Date modifyDate;
}
