package com.kgc.finance.service.impl;

import com.kgc.finance.dao.InfoEntryMapper;
import com.kgc.finance.dao.ViewMapper;
import com.kgc.finance.pojo.ImgUp;
import com.kgc.finance.pojo.InfoEntry;
import com.kgc.finance.pojo.UpFiles;
import com.kgc.finance.pojo.UploadInfo;
import com.kgc.finance.service.InfoEntryService;
import com.kgc.finance.util.FtpFileUtil;
import com.kgc.finance.util.MapUtil;
import com.kgc.finance.util.TimelineUtil;
import com.kgc.finance.util.Upload;
import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class InfoEntryServiceImpl implements InfoEntryService {

    @Resource
    private InfoEntryMapper orderMapper;

    @Autowired
    private ViewMapper viewMapper;

    @Autowired
    Upload upload;

    @Autowired
    private TimelineUtil timelineUtil;


    /**
     * 根据订单 id 修改订单信息
     *
     * @param infoEntry
     * @return
     */
    public Map upInfoEntry(InfoEntry infoEntry) {
        int i = orderMapper.upInfoEntry(infoEntry);
        if (i > 0) {
            return MapUtil.encapsulation(true, "succeed", i);
        } else {
            return MapUtil.encapsulation(false, "fail", null);
        }
    }


    /**
     * 录入订单
     *
     * @param infoEntry
     * @param imgUp
     * @return
     */
    @Transactional
    public Map addInfoEntry(InfoEntry infoEntry, ImgUp imgUp, String salesmanId) {
        Integer count = orderMapper.addInfoEntry(infoEntry);//添加订单
        imgUp.setOrderId(infoEntry.getOrderId());//设置图片数据中的订单id
        Map result = upLoadImg(imgUp);//上传图片
        //添加时间线
        boolean falg = timelineUtil.createTimeline(infoEntry.getOrderId(), 1, Integer.valueOf(salesmanId), null);
        if (count > 0 && (boolean) result.get("result") && falg) {
            return MapUtil.encapsulation(true, "OK");
        } else {
            return MapUtil.encapsulation(false, "failed");
        }
    }


    /***
     * 图片批量上传
     * @auther 何夏麟
     * @param imgUp
     * @return map
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Map upLoadImg(ImgUp imgUp) {
        System.out.println("添加图片");
        System.out.println("客户资料长度:" + imgUp.getCustomer().length);
        System.out.println("房产资料长度:" + imgUp.getRealEstate().length);
        System.out.println("银行资料长度:" + imgUp.getBankImg().length);
        System.out.println("账户资料长度:" + imgUp.getAccount().length);
        System.out.println("面签资料长度:" + imgUp.getFaceSigned().length);
        System.out.println("其他资料长度:" + imgUp.getOther().length);
        System.out.println("订单id:" + imgUp.getOrderId());
        //将图片放入数组,易于遍历
        MultipartFile[][] ArrayData = {
                imgUp.getCustomer(), imgUp.getRealEstate(), imgUp.getBankImg(),
                imgUp.getAccount(), imgUp.getFaceSigned(), imgUp.getOther()
        };
        String fileName;
        ArrayList<String> list = new ArrayList<>();
        try {
            //图片类型(1.客户资料，2.房产资料，3.银行资料，4.账户资料，5.面签资料，6.其他)
            for (MultipartFile[] arrayDatum : ArrayData) {
                for (MultipartFile multipartFile : arrayDatum) {
                    fileName = upload.executeUpload("", multipartFile);
                    System.out.println(multipartFile.getName() + ":" + multipartFile.getOriginalFilename());
                    list.add(fileName);
                    imgUp.setImgUrl(fileName);
                    //1.客户资料 customer,2.房产资料 RealEstate,3.银行资料 BankImg
                    //4.账户资料 Account,5.面签资料 FaceSigned,6.其他 Other
                    //选择图片类型
                    switch (multipartFile.getName()) {
                        case "customer":
                            imgUp.setImageType(1);
                            break;
                        case "RealEstate":
                            imgUp.setImageType(2);
                            break;
                        case "BankImg":
                            imgUp.setImageType(3);
                            break;
                        case "Account":
                            imgUp.setImageType(4);
                            break;
                        case "FaceSigned":
                            imgUp.setImageType(5);
                            break;
                        case "Other":
                            imgUp.setImageType(6);
                            break;
                    }
                    orderMapper.inserImgInfo(imgUp);
                }
            }
            return MapUtil.encapsulation(true, "文件上传成功", list);
        } catch (Exception e) {
            //发生异常删除本次上传文件
            for (String s : list) {
                FtpFileUtil.delFile(s);
                System.out.println("删除成功:" + s);
            }
            //打印异常堆栈机制
            e.printStackTrace();
            return MapUtil.encapsulation(false, "发生异常上传失败");
        }
    }


    /**
     * 根据订单Id获取订单信息
     *
     * @param orderId
     * @return
     */
    public Map getInfoEntryByOrderId(Integer orderId) {
        InfoEntry infoEntry = orderMapper.getInfoEntryByOrderId(orderId);
        if (infoEntry != null) {
            return MapUtil.encapsulation(true, "OK", infoEntry);
        } else {
            return MapUtil.encapsulation(false, "failed");
        }
    }

    /**
     * 根据订单Id修改订单
     *
     * @param infoEntry
     * @param imgUp
     * @return
     */
    @Transactional
    public Map upInfoEntry(InfoEntry infoEntry, ImgUp imgUp,String salesmanId) {
        Integer orderId=infoEntry.getOrderId();
        imgUp.setOrderId(orderId);//上传资料中的订单id
        //获取该订单下的所有图片信息
        List<UploadInfo> dbImg = viewMapper.imgInfo(infoEntry.getOrderId());
        boolean flag = false;//标志该图片是否存在于保留的图片中
        //与前端传来的图片名称集合比较
        List<String> notChangeImgs = imgUp.getImgNames();//记录前端传来的图片

        for (int i = 0; i < notChangeImgs.size(); i++) {
            System.out.println("不需要修改的图片：" + notChangeImgs.get(i));
        }

        //记录要删除的图片名称
        List<String> delImgNames = new ArrayList();
        boolean mustDel = false;
        System.out.println("数据库原有图片数量：" + dbImg.size());
        for (int i = 0; i < dbImg.size(); i++) {//外层循环数据库中该订单的所有图片
            mustDel = false;
            System.out.println("第" + i + "张数据库图片：" + dbImg.get(i).getImgUrl());
            for (int j = 0; j < notChangeImgs.size(); j++) {//内层循环前端保留的图片（无需更改）
                //比较数据库中的图片与不需要修改的图片链接
                if ((dbImg.get(i).getImgUrl()).equals((notChangeImgs.get(j)))) {
                    //若存在则标为不能删除
                    mustDel = true;
                }
            }
            if (mustDel == false) {//标志位为false 则说明需要修改，将数据记录到删除图片的集合中。
                delImgNames.add(dbImg.get(i).getImgUrl());
            } else {
                System.out.println("第" + i + "张图片：" + dbImg.get(i).getImgUrl() + "不需要修改。");
            }

        }
        int delDbImgResult = 0;
        boolean delFtpImgResult = false;
        if (delImgNames.size() > 0) {
            //从数据库中删除该图片
            delDbImgResult = orderMapper.delImgByImgName(delImgNames);
            //从静态资源服务器中删除图片
            delFtpImgResult = FtpFileUtil.deLFileByFileNames(delImgNames);
        }
        //修改用户资料
        int insertDbImgResult = orderMapper.upInfoEntry(infoEntry);

        //上传新的图片
        Map upLoadImgResult = new HashMap();
        if (imgUp != null) {
            upLoadImgResult = upLoadImg(imgUp);
        }



        //添加时间线
//        boolean timeFlag=timelineUtil.createTimeline(orderId,infoEntry.getStatus(), Integer.valueOf(salesmanId),infoEntry.getReturnReson());

        return MapUtil.encapsulation(true,"修改成功");
    }


    /**
     * 上传文件2.0   --单次最多传5张图片
     * @param upFiles
     * @return
     */
    @Transactional
    public Map upFiles(UpFiles upFiles) {
        ImgUp imgUp = new ImgUp(); //用于封装上传对象

        imgUp.setImageType(upFiles.getImgType());
        imgUp.setOrderId(upFiles.getOrderId());

        List<String> imgUrls = new ArrayList<>();//记录上传的文件名称
        try {
            for (int i = 0; i < upFiles.getUpFiles().length; i++) {
                String imgName = upload.executeUpload("", upFiles.getUpFiles()[i]);//执行上传
                imgUp.setImgUrl(imgName);//更新图片路径
                imgUrls.add(imgName);
                orderMapper.inserImgInfo(imgUp);//插入到数据库
            }
            //修改订单状态
            System.out.println(upFiles.getImgType());
            if(upFiles.getImgType() == 7){
                viewMapper.alterState(upFiles.getOrderId(),upFiles.getStatus(),null,null,upFiles.getOperatedId());//财务上传
            }else{
                viewMapper.alterState(upFiles.getOrderId(),upFiles.getStatus(),upFiles.getOperatedId(),null,null);//业务上传
            }

            timelineUtil.createTimeline(upFiles.getOrderId(),upFiles.getStatus(),upFiles.getOperatedId(),null);
            return MapUtil.encapsulation(true,"OK",imgUrls);
        } catch (Exception e) {
            FtpFileUtil.deLFileByFileNames(imgUrls);//删除图片
            e.printStackTrace();
            return MapUtil.encapsulation(false,"failed");
        }

    }

    //修改文件2.0   --单次最多修改5张图片
    public Map updateFiles(UpFiles upFiles) {
        return null;
    }

}
