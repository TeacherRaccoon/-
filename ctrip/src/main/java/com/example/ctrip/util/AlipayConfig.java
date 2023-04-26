package com.example.ctrip.util;

public class AlipayConfig {

	// ************应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016101300674974";

	// ************商户私钥，您的PKCS8格式RSA2私钥
	public static String merchant_private_key ="MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyHjCyA9mM8afhT6PdqDctJxkS23llHMb+DQeYIzZrick1pAh5Vgr0GIygOumywJY1cHuwqsUL4szI5iWauO2J3bE/8RrpKYfRkK5CWZuNwn0DlXEpFZTAOXoqUoUL5SDtp3OXxasxaG9FYU4g+zgCxxABTTNR7akGCYsDdgOaceqNkjqOKV8xGmTEELsoI4ztiucJli8IV6mDTrw9EHqhlNLDywjucF5/e4mSV0GaAn45H+h1FajPC98sUDkxYuJ0RQhTp5BOUOAkMOeS22HinozoLDFab9+gLvZXA8TqfoCZzsbka+Rkp9danlvlPZ9Q88rClAzfWz0/Rjr8/6+1AgMBAAECggEAIk9Ocfvr3ApwnCYLGpdciYYOfmNobuGsMyOvYs7lnLFd4MdIGpdIZNyVugefHJ+cT47rRIygiDmX2Nr8Q2F74CKkEf0PgfpN/0AvUPiRziy4iAgxVAikLqLjtWNP3Yq1XRH0YjfhUhMb2/Fya0f48hAGNTn5uL5e4JrV/ESvTQBxqmdMgSmr9bGgswo1FQKx5GirqECUshEWInGtrmbNJ8C3bLAFZB/Y89IAi7rJ0qSxAvoHhmdh3m6C9/0znn1H3hvuFJHk+2/gnZd3qJz0snaJlUv2wSXO8I6BYy4hSQw6dRQ67Z4alyKuoABqe+/nkkE6tUyyrvyUW4ylS4hKAQKBgQDv9KZjAcAmwu/8xYZ+PHihCzLJ2iBTTtUGDN2TKXiUCkB7mBg1ac1YHpP6BzS87HmAZ717E45RpDvCUIzrZ3N5g4Bi9HFc/siWF7d4POeZ6/Bag57Msvj70B2tUQaGmHwFCU/fIBiFZ+AvwmWLGh5ruuMBjdNiuiFY0w/u6H0B3QKBgQC+Bw5rVM2Jjvwz/F8+jwnZPu0KWRFWUT2vuHlE+oTY/joTaTH5ElH4ByGM/mnJhAjBUAZkSYpq12stRi7KJRcwk+UrXUP1ZIYZGzxUZ2Et2zKoQbjzecj6Ek83yvJyFq8GaEoEm0KoNZ2urafkqNe/ta8vR2vRfiS8Bk+WilbDuQKBgEhu2ncShTVuLNFpstKSYHuEjN0/ufhL2KQN6CjPIPXXLmXgoJYnDPRnrpWP7UyGOZsYNatcWN6uK9fZRuCchtAMcQnt7fZ7doNQP3LNN8BP52r7RklWUTB6PysdRVIF35IJoJGi96P1mkfwb4SQ6tPsQzAp5sBrnTtZ4vpkNbAFAoGAP8UMcLZnt1b1idiSeeL0kiQM1iEnsUjYI6ULhTtw44UFJkhyDby5Jzv1ZWRnScn2SjE5w+PuAIbEH9BimVGzI4kuKcxFpw8R9VDvgP+kXAgoStCraYGgEVOdpAKGNAUqvUK4PC2CRAKiJOF/6ztCE8K7xGj6ZLYpS7Pud317OnkCgYEA3lrkKDMAciFTDdoH1gFR0reeLgMHYCETth9Cj+lh9f6IHn1gK7RcRIqmfEed0Se/WU/jwLHAqsc5e/5kWdaXIq3bIIRrdlggTLOyTgrGl78khIKMYeQS0d0hzc+ZSrCOOTmezNztkd78YUsO7ofx5+7PQqDMjXdn+SlCFENHgQ4=";

	// ************支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
	public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsh4wsgPZjPGn4U+j3ag3LScZEtt5ZRzG/g0HmCM2a4nJNaQIeVYK9BiMoDrpssCWNXB7sKrFC+LMyOYlmrjtid2xP/Ea6SmH0ZCuQlmbjcJ9A5VxKRWUwDl6KlKFC+Ug7adzl8WrMWhvRWFOIPs4AscQAU0zUe2pBgmLA3YDmnHqjZI6jilfMRpkxBC7KCOM7YrnCZYvCFepg068PRB6oZTSw8sI7nBef3uJkldBmgJ+OR/odRWozwvfLFA5MWLidEUIU6eQTlDgJDDnktth4p6M6CwxWm/foC72VwPE6n6Amc7G5GvkZKfXWp5b5T2fUPPKwpQM31s9P0Y6/P+vtQIDAQAB";

	// ************服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http:/localhost:8080/payResult";

	// ************页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://localhost:8080/views/piao/paySuccess.html";
	//何夏麟的支付成功跳转页面
	public static String return_url_hxl = "http://localhost:8080/paySuccess.html";
	// 签名方式
	public static String sign_type = "RSA2";

	// 字符编码格式
	public static String charset = "utf-8";

	// ************支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

}

