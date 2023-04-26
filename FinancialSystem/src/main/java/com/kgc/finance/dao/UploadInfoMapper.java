package com.kgc.finance.dao;

import com.kgc.finance.pojo.UploadInfo;

/**
 * @version 1.0
 * @auther 何鑫
 * @Date 2019/9/1719:16
 */
public interface UploadInfoMapper {
    /**
     * 上传信息
     *
     * @param uploadInfo
     * @return
     */
    public Integer addUploadInfo(UploadInfo uploadInfo);
}
