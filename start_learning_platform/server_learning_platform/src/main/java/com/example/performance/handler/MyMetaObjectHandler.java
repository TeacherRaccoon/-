package com.example.performance.handler;


import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.example.performance.util.SnowflakeUtil;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @Description: 字段自动填充映射
 */

@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    /**
     * 新增时，自动填充规则
     * @param metaObject
     */
    @Override
    public void insertFill(MetaObject metaObject) {
        //填充创建时间
        this.setFieldValByName("createTime",new Date(),metaObject);
        this.setFieldValByName("ID", SnowflakeUtil.getID(),metaObject);
    }

    /**
     * 修改时，自动填充规则
     * @param metaObject
     */
    @Override
    public void updateFill(MetaObject metaObject) {

    }
}
