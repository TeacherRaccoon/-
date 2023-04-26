package com.kgc.finance.util;

/**
 * @author: 方子瑞
 * @program: com.token.util.PortUtil
 * @explain: 判断是不是移动端
 * @create: 2019-09-09 09:48
 **/
public class PortUtil {

    private final static String[] agent = {"Android", "iPhone", "iPod", "iPad", "Windows", "Phone", "MQQBrowser"}; //定义移动端请求的所有可能类型

    /**
     * 判断User-Agent 是不是来自于手机
     * @param ua
     * @return
     */
    public static boolean checkAgentIsMobile(String ua) {
        boolean flag = false;
        if (!ua.contains("Windows NT") || (ua.contains("Windows NT") && ua.contains("compatible; MSIE 9.0;"))) {
            // 排除 苹果桌面系统
            if (!ua.contains("Windows NT") && !ua.contains("Macintosh")) {
                for (String item : agent) {
                    if (ua.contains(item)) {
                        flag = true;
                        break;
                    }
                }
            }
        }
        return flag;
    }

}
