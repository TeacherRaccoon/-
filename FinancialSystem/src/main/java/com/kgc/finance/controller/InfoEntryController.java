package com.kgc.finance.controller;

import com.kgc.finance.pojo.ImgUp;
import com.kgc.finance.pojo.InfoEntry;
import com.kgc.finance.pojo.UpFiles;
import com.kgc.finance.service.InfoEntryService;

import com.kgc.finance.util.DateUtil;
import com.kgc.finance.util.MapUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


import java.util.Date;
import java.util.Map;
import java.util.concurrent.ExecutionException;


@RestController
public class InfoEntryController {

    @Resource
    private InfoEntryService infoEntryService;

    @Resource
    private DateUtil dateUtil;

    /**
     * 添加订单
     *
     * @param infoentry
     * @param imgUp
     * @return
     */
    @RequestMapping("/addInfoEntry")
    public Map addInfoEntry(InfoEntry infoentry, ImgUp imgUp, HttpServletRequest request) {
        String salesmanId = request.getParameter("salesmanId");
        System.out.println("salesmanId======>>>>" + salesmanId);
        return infoEntryService.addInfoEntry(infoentry, imgUp, salesmanId);
    }


    /**
     * 上传图片
     *
     * @param imgUp
     * @return
     */
    @RequestMapping("/upload")
    public Map upLoadImg(ImgUp imgUp) {
        return infoEntryService.upLoadImg(imgUp);
    }

    /**
     * 根据订单Id获取订单信息
     *
     * @param orderId
     * @return
     */
    @RequestMapping("/getInfoEntryByOrderId")
    public Map getInfoEntryByOrderId(Integer orderId) {
        return infoEntryService.getInfoEntryByOrderId(orderId);
    }

    /**
     * 根据订单 id 修改订单信息
     *
     * @param infoEntry
     * @return
     */
    @RequestMapping("/upOrderByOrderId")
    public Object upInfoEntry(InfoEntry infoEntry, ImgUp imgUp, HttpServletRequest request) {

        try {
            //获取操作员Id
            String salesmanId = request.getParameter("salesmanId");

            System.out.println(infoEntry.getOrderId());
            for (int i = 0; i < imgUp.getImgNames().size(); i++) {
                System.out.println(imgUp.getImgNames().get(i));
            }
            infoEntryService.upInfoEntry(infoEntry, imgUp, salesmanId);//调用service层修改订单的方法，修改基本信息和上传资料。
            System.out.println(1);
            return MapUtil.encapsulation(true, "succed");
        } catch (Exception e) {
            return MapUtil.encapsulation(false, "failed", "error");
        }

    }


    /**
     * 上传文件2.0
     *
     * @param upFiles
     * @return
     */
    @RequestMapping("/upFiles")
    public Object upFiles(UpFiles upFiles) {
        return infoEntryService.upFiles(upFiles);
    }


}
