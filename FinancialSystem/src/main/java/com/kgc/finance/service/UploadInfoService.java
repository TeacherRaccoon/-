package com.kgc.finance.service;

import com.kgc.finance.pojo.UploadInfo;

import java.util.Map;

/**
 * @version 1.0
 * @auther 何鑫
 * @Date 2019/9/1719:26
 */
public interface UploadInfoService {
    /**
     * 上传资料
     *
     * @param uploadInfo
     * @return
     */
    public Map addUploadInfo(UploadInfo uploadInfo);
}
