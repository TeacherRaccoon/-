package com.kgc.finance.util;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component
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


}
