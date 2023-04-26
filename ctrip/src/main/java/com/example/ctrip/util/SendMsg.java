package com.example.ctrip.util;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

/**
 * @description:
 */
@Component
public class SendMsg {

    @Autowired
    RedisUtil redisUtil;

    public  String sendMsg(String phone) {
        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI8XwFFZoBTM2Z", "5t8nd5imOBOTSpqgbVvBnh7hc8SZCm");
        IAcsClient client = new DefaultAcsClient(profile);
        String randCode =verifyCode();
        CommonRequest request = new CommonRequest();
        request.setMethod(MethodType.POST);
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        //手机号码
        request.putQueryParameter("PhoneNumbers", phone);
        //签名
        request.putQueryParameter("SignName", "Sunshine");
        //模板
        request.putQueryParameter("TemplateCode", "SMS_173247072");
        //模板上的参数
        request.putQueryParameter("TemplateParam", "{\"code\":\""+randCode+"\"}");
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
        redisUtil.set(phone,randCode,300);
        return randCode;
    }

    //生成随机数
    public static String verifyCode(){
        Random random = new Random();
        String str ="";
        for (int i = 0; i <6; i++){
            int num = random.nextInt(10);
            str += num;
        }
        return str;
    }


    public boolean Validate(String phone ,String code){
        String randcode = (String) redisUtil.get(phone);
        if(randcode.equals(code)){
            System.out.println("注册成功");
            return true;
        }else{
            System.out.println("验证码有误，重新输入");
            return false;
        }
    }




}
