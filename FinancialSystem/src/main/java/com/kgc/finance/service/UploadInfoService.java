package com.kgc.finance.service;

import com.kgc.finance.pojo.UploadInfo;

import java.util.Map;


public interface UploadInfoService {
    /**
     * 上传资料
     *
     * @param uploadInfo
     * @return
     */
    public Map addUploadInfo(UploadInfo uploadInfo);
}
