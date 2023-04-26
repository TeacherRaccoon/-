package com.example.ctrip.config;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */
public class TravelAlipayConfig {
    //买家账号 iksswf0701@sandbox.com
    //登录密码： 111111
    //支付密码： 111111


//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2016101300674959";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZDsrn0HqM65OHKBjDbuTKIXhkIeroKNn7BIw9HhKfw0JeK5CWD9vkLePKhrNy5rM0uIkipHk+viISbJzxEvftbkXUnvMIHKYIQodq8FfreizsdisNAH9ecjJWX61p4ifBZ0H+ob0hHIjPnWF0pg7BmoU0SsLCogWPwfU5zELwBROrJceaNqDcH5Gg27/hqK5qG5mk8h9rBVIQtyP5zgdro1iiy0UNem0gDPYQJU0u59pgbZtDXlLQHi8PVYgGwNYoiQzyiqvOspuzCua5Vj4OR5XoufW/pbzfJD5oxzilnEVkB+0I47c/Td6GwqESWbrIEgttdrk03uwF5hlhPOibAgMBAAECggEBANaqoZO4BKvABEykJDGMR+t8RKPLQ5ZNaJ+v9L4xMrwckVOvBDTVBGTb2bAfnfPiI5PdeYrwXRTnV60fC+wEFX0VFSzd8n+wTahXm7PwdRNm5m0JxTP7rPwMNqpjv467YxQMeiFJdlH79XZXMN37qRZiKqD32zxAnv15Fn0N/Zl/qBGf7ODdin77EoOcFyNJbGrDLZoYHt1248ZHsJWttxIOcQOI7ocUL0BKvCzNr3JUh3ZaJXir5xodOOE2xZ5rZFw7WWmdVcPw6XFtTT67XEYUfFoQs87sMMFqRSI3hT6zXGKZ5tJVI8mCxpeWCK+1GFd6GZbMdz90R/aNfsS7LmkCgYEA/6j1Kyx4JIdT047JalHCMfgT5hSI3jG2EAEuSN109ZlumX2g6+rwobp2SxjhWG7V7BXhxy49dIgLP7L8bWMDZoPMQ1kb5dDoQgi45z6rTFfGUXsCeoN++yzmsMAxppP6HJp/v2DNCSnxSG0Lv+dxYj1c0Dy9+2ps9X6flCy4adUCgYEA2VixPjSVE1eVBXVynPmmw0VRLSKIEQsHJ8BEI7Z0zS0aPGj8abMudNJHzWGnu4LYhdBqP69c4YczZs5RcDeRxeQFTzTCfWQKp2LgCNb/YIEZF5jnDlndcYng2gYsgLF5u9i/v75LQgtuDS+/TqF1c+g1H1FSgMy/7K62ITiyUK8CgYAaY+ly3HNGagW4J9wYsnnWSKJdNK9wKDd/7W9GrD1/gKgPBg3PbIAMYcAGPno8c6x3Y0bcFaTYW5a1q5cs/3SBZ4d1SER985OWBWp4zFpIViMtlAIMfXhlGxxxEFXPuSSvQS+ApNBlasPyUvdMhuqIVoc3I54EztaSfNCiLf+XRQKBgFBy9dgymmN4bZ6BpJTaC5IH3E46k+bLEDD0h8Q4Su+PHED0E0oEmtN+6jjpRq6vdfnB9THxdQ29f5c0EwzYZMq85gI1YzAKka73eDmNayWLY4BKhmvXc5INGP9afap9BrQzPHZ6t1yQ4oFbBRLTzKfEcbVP4pvuLbQrzxpo5AfdAoGAKKzr5IirGn/G07Wh/imqxwOh96Y7ynkXR3xcRjK7fD/msnv5uzEDrOokvsNCx5zIZchkc9A8dNfuV76lbB7tSuZIUe/MPeZfke+foLrmOThHes6Z4oIsHNWeKgW4YedSp0nxTolf24pRf53zPx840Z+ep0pVwAYE2ybz/RjRotY=";

    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxpPhHB8a2k3wBDbOAkP8BMSRbRKDnAcKAcDiJENy3FpAD4qYbmjrQ15PTSMnC5QYsRywYdIzaj5uCJJ/JcBG26RCEy5+vbE9/+iyu4hrIoBn6R47A2REKUaBRyzLBCwbM4TmPQPp2KJvUQUZVbVqgNxzuhXFie93YM90M8Zc7zLknqfh3tknDnxim7WxADYldXOQQyN4r3EImop2UPpsP6/ymUbwEYhNDHwioYNOt0EcrdV+5TskegrJ/+tmkkGi+9Vc7VojRBxG88XqdhhUsyt7fbROoRJFObPacByQZvQr30KxUVn0FXFkPK1MbvUmLMk2rNHFSZOgG7Yk/ssubwIDAQAB";

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://localhost:8080/notify_url";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String return_url = "http://localhost:8081/return_url";

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    // 日志
    public static String log_path = "e:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

