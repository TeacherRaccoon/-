package com.kgc.finance.util;

import com.kgc.finance.pojo.Administrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class TokenUtil {
    @Autowired
    private RedisUtil redisUtil;

    /**
     * 生成Token加密
     * 前缀PC-USERCODE-USERID-CREATIODATE-RONDEM[6位]
     * @param userAgent
     * @param data
     * @return
     */
    public String getToken(String userAgent, Object data) {
        StringBuffer str=new StringBuffer();
        str.append("token:");
        //http协议请求头，判断类型
        if(PortUtil.checkAgentIsMobile(userAgent)){
            str.append("MOBILE-");      //移动端
        }else {
            str.append("PC-");      //pc端
        }

        if (data instanceof Administrator) {
            Administrator administrator= (Administrator) data;
            str.append(MD5.getMd5(administrator.getAccount(), 32) + "-");
            str.append(administrator.getId()+"-");
        }
        str.append(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())+"-");
        str.append(MD5.getMd5(userAgent,6));
        return str.toString();
    }



    public void save(String token,Administrator administrator){
        administrator.setPassword(MD5.getMd5(administrator.getPassword(),16));
        redisUtil.set(token,administrator);
    }

}
