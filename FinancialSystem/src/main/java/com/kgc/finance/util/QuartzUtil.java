package com.kgc.finance.util;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@EnableScheduling
@Component
public class QuartzUtil {
    Integer i=1;
   // https://blog.csdn.net/qq_39101581/article/details/79308851

    //initialDelay :初次执行任务之前需要等待的时间
/*
    @Scheduled( initialDelay =10000,fixedDelay =2000)
    public void doSomething() {
        System.out.println("执行成功！"+i++);
    }
*/

    //启动项目定时执行
/*    @Scheduled(cron = "0/10 * * * * ?")
    public void getToken() {
        System.out.println("==========="+i++);
    }*/




}
