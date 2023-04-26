package com.example.ctrip.Controller;

import com.example.ctrip.util.FtpFileUtil;
import org.junit.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

/**
 * @description: 文件传输测试类
 * @author: 卢智伟
 * @date: 2019-08 11:59
 */
public class FtpFileUtilTest {
    @Test
    public void uploadFile(){

        try {
            InputStream inputStream = new FileInputStream("src/main/webapp/statics/TravelImg/beijing01.jpg");
            boolean flag = FtpFileUtil.uploadFile("beijing01",inputStream);
            System.out.println(flag);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
}
    }
}

