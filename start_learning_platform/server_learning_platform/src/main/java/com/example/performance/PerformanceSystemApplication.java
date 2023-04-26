package com.example.performance;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan("com.example.performance.mapper")
@Slf4j
@EnableScheduling
public class PerformanceSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(PerformanceSystemApplication.class, args);
        log.info("启动成功");
    }
}
