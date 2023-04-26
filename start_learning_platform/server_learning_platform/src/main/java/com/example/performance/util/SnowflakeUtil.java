package com.example.performance.util;

import cn.hutool.core.util.IdUtil;

/**
 * @Description: 生成分布式ID
 */
public class SnowflakeUtil {
    private SnowflakeUtil(){}

    /**
     * 获取分布式ID
     * @return
     */
    public  static String getID(){
    return String.valueOf(IdUtil.getSnowflakeNextId());
    }

}
