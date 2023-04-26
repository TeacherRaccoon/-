package com.example.ctrip;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;


/***
 * SpringBoot启动类
 * @Date 2022/3/25
 */
@SpringBootApplication
//扫描Mapper注解
@MapperScan("com.example.ctrip.Dao")
//扫描Filter路径
@ServletComponentScan("com.example.ctrip.Filter")
//扫描Component路径
public class CtripApplication {

    public static void main(String[] args) {
        SpringApplication.run(CtripApplication.class, args);
    }

    /**
     * 处理请求参数里的特殊符号：{}等
     * @return
     */
    @Bean
    public ConfigurableServletWebServerFactory webServerFactory() {
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
        factory.addConnectorCustomizers((TomcatConnectorCustomizer) connector -> connector.setProperty("relaxedQueryChars", "|{}[]\\"));
        return factory;
    }
}
