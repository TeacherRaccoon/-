package com.example.ctrip.util;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

/**
 * @description: 上传文件工具类
 */
@Component
public class FtpFileUtil {
    //ftp服务器地址
    private static final String FTP_ADDRESS = "106.52.92.57";
    //端口号
    private static final int FTP_PORT = 21;
    //用户名
    private static final String FTP_USERNAME = "ftpadmin";
    //密码
    private static final String FTP_PASSWORD = "qw1234";
    //图片路径
    private static final String FTP_BASEPATH = "/home/ftpadmin/img";

    public static boolean uploadFile(String originFileName, InputStream input) {
        boolean success = false;
        FTPClient ftp = new FTPClient();
        ftp.setControlEncoding("UTF-8");

        try {
            int reply;
            ftp.connect(FTP_ADDRESS);//连接FTP服务器
            ftp.login(FTP_USERNAME, FTP_PASSWORD);//登录
            reply = ftp.getReplyCode();

            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                return success;
            }
            ftp.setFileType(FTPClient.BINARY_FILE_TYPE);
            ftp.makeDirectory(FTP_BASEPATH);
            ftp.changeWorkingDirectory(FTP_BASEPATH);
            ftp.storeFile(originFileName,input);
            input.close();
            ftp.logout();
            success = true;

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(ftp.isConnected()){
                try {
                    ftp.disconnect();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return success;
    }


}
