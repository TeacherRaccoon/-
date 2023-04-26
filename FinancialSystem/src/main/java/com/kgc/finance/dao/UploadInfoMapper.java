package com.kgc.finance.dao;

import com.kgc.finance.pojo.UploadInfo;

public interface UploadInfoMapper {
    /**
     * 上传信息
     *
     * @param uploadInfo
     * @return
     */
    public Integer addUploadInfo(UploadInfo uploadInfo);
}
