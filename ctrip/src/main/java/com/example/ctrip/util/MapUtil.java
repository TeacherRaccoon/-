package com.example.ctrip.util;

import java.util.HashMap;
import java.util.Map;

public class MapUtil {

    public static Map encapsulation(Object result,Object msg,Object data){
        Map<String,Object> map = new HashMap<>();
        map.put("result",result);
        map.put("msg",msg);
        map.put("data",data);
        return map;
    }
    public static Map encapsulation(Object result,Object msg){
        Map<String,Object> map = new HashMap<>();
        map.put("result",result);
        map.put("msg",msg);
        return map;
    }
    public static Map encapsulation(Object result,Object msg,Object data,long count){
        Map<String,Object> map = new HashMap<>();
        map.put("result",result);
        map.put("msg",msg);
        map.put("data",data);
        map.put("count",count);
        return map;
    }
}
