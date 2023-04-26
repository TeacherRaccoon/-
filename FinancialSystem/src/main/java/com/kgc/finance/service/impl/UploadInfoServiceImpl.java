package com.kgc.finance.service.impl;

import com.kgc.finance.dao.UploadInfoMapper;
import com.kgc.finance.pojo.UploadInfo;
import com.kgc.finance.service.UploadInfoService;
import com.kgc.finance.util.MapUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @version 1.0
 * @auther 何鑫
 * @Date 2019/9/1719:27
 */
@Service
public class UploadInfoServiceImpl implements UploadInfoService {

    @Resource
    private UploadInfoMapper uploadInfoMapper;

    /**
     * 上传资料
     *
     * @param uploadInfo
     * @return
     */
    @Override
    public Map addUploadInfo(UploadInfo uploadInfo) {
        if (uploadInfoMapper.addUploadInfo(uploadInfo) > 0) {
            return MapUtil.encapsulation(true, "succeed");
        } else {
            return MapUtil.encapsulation(true, "fail");
        }
    }
}
