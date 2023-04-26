package com.example.performance.controller;

import cn.hutool.core.date.DateUnit;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.performance.bean.*;
import com.example.performance.mapper.*;
import com.example.performance.util.SnowflakeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.*;

/**
 * @Description:
 */
@RestController
@RequestMapping("/system")
@CrossOrigin
public class RegistrationInformationController {

    @Autowired
    private UserInfoMapper userInfoMapper;
    @Autowired
    private AnnouncementInfoMapper announcementInfoMapper;
    @Autowired
    private CoursewareInfoMapper coursewareInfoMapper;
    @Autowired
    private ClassInfoMapper classInfoMapper;
    @Autowired
    private StudentInfoMapper studentInfoMapper;
    @Autowired
    private JobInfoMapper jobInfoMapper;
    @Autowired
    private JobRecordsMapper jobRecordsMapper;
   @Autowired
    private CoursewareClassRelationshipMapper coursewareClassRelationshipMapper;


    //文件上传保存路径
    @Value("${upload.file.path}")
    private String filePath;

    /**
     * 登录
     *
     * @param userInfo
     * @return
     */
    @PostMapping(value = "/login")
    public CommonResult<UserInfo> login(@RequestBody UserInfo userInfo) {
        if (userInfo != null) {
            QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("code", userInfo.getCode());
            queryWrapper.eq("password", userInfo.getPassword());
            UserInfo userMsg = userInfoMapper.selectOne(queryWrapper);
            if (userMsg != null) {
                return CommonResult.success(userMsg);
            }

        }
        return CommonResult.fail("用户昵称或密码错误");
    }


    /**
     * 创建用户
     *
     * @param userInfo
     * @return
     */
    @PostMapping(value = "/addUser")
    public CommonResult<String> register(@RequestBody UserInfo userInfo) {
        if (userInfo != null) {
            QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("code", userInfo.getCode());
            //判断当前用户昵称是否已经存在
            if (userInfoMapper.selectOne(queryWrapper) != null) {
                return CommonResult.fail(100, "用户昵称已被注册");
            }
            //设置默认头像
            userInfo.setHeadSculpture("img.jpg");

            return userInfoMapper.insert(userInfo) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }

        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 修改用户信息
     *
     * @param userInfo
     * @return
     */
    @PostMapping(value = "/updateUser")
    public CommonResult<String> updateUser(@RequestBody UserInfo userInfo) {
        if (userInfo != null) {
            QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("code", userInfo.getCode());
            queryWrapper.ne("id", userInfo.getId());

            //判断当前用户昵称是否已经存在
            if (userInfoMapper.selectOne(queryWrapper) != null) {
                return CommonResult.fail(100, "用户昵称已被注册");
            }

            return userInfoMapper.updateById(userInfo) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }

    /**
     * 删除用户信息
     *
     * @param userId
     * @return
     */
    @GetMapping(value = "/deleteUser/{userId}")
    public CommonResult<String> deleteUser(@PathVariable("userId") String userId) {
        if (StrUtil.isNotBlank(userId)) {
            return userInfoMapper.deleteById(userId) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 获取用户信息
     *
     * @param userId
     * @return
     */
    @GetMapping(value = "/queryUserDetails/{userId}")
    public CommonResult<UserInfo> queryUserDetails(@PathVariable("userId") String userId) {
        if (StrUtil.isNotBlank(userId)) {
            return CommonResult.success(userInfoMapper.selectById(userId));
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }

    /**
     * 获取用户列表
     *
     * @param pamram
     * @return
     */
    @PostMapping(value = "/queryUserList")
    public CommonResult<Page<UserInfo>> queryUserList(@RequestBody Map<String, Object> pamram) {
        Integer page = MapUtil.getInt(pamram, "pageIndex", 1);
        Integer size = MapUtil.getInt(pamram, "pageSize", 10);
        if (page != null && size != null) {
            //创建分页对象,当前页码数为 1 ，每页展示 10 条数据
            Page<UserInfo> result = new Page<>(page, size);
            //查询count
            result.setSearchCount(true);
            QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
            queryWrapper.orderByDesc("create_time");
            if (StrUtil.isNotBlank(MapUtil.getStr(pamram, "nickName"))) {
                queryWrapper.like("nick_name", MapUtil.getStr(pamram, "nickName"));
            }
            if (StrUtil.isNotBlank(MapUtil.getStr(pamram, "userIdentity"))) {
                queryWrapper.eq("user_identity", MapUtil.getStr(pamram, "userIdentity"));
            }
            userInfoMapper.selectPage(result, queryWrapper);
            return CommonResult.success(result);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 创建通知信息
     *
     * @param announcementInfo
     * @return
     */
    @PostMapping(value = "/addAnnouncementInfo")
    public CommonResult<String> addAnnouncementInfo(@RequestBody AnnouncementInfo announcementInfo) {
        if (announcementInfo != null) {
            return announcementInfoMapper.insert(announcementInfo) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }

        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 修改通知信息
     *
     * @param announcementInfo
     * @return
     */
    @PostMapping(value = "/updateAnnouncementInfo")
    public CommonResult<String> updateAnnouncementInfo(@RequestBody AnnouncementInfo announcementInfo) {
        if (announcementInfo != null) {
            return announcementInfoMapper.updateById(announcementInfo) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }

    /**
     * 删除通知信息
     *
     * @param announcementInfoId
     * @return
     */
    @GetMapping(value = "/deleteAnnouncementInfo/{announcementInfoId}")
    public CommonResult<String> deleteAnnouncementInfo(@PathVariable("announcementInfoId") String announcementInfoId) {
        if (StrUtil.isNotBlank(announcementInfoId)) {
            return announcementInfoMapper.deleteById(announcementInfoId) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 获取通知信息列表
     *
     * @param pamram
     * @return
     */
    @PostMapping(value = "/queryAnnouncementInfoList")
    public CommonResult<Page<AnnouncementInfo>> queryAnnouncementInfoList(@RequestBody Map<String, Object> pamram) {
        Integer page = MapUtil.getInt(pamram, "pageIndex", 1);
        Integer size = MapUtil.getInt(pamram, "pageSize", 10);
        if (page != null && size != null) {
            //创建分页对象,当前页码数为 1 ，每页展示 10 条数据
            Page<AnnouncementInfo> result = new Page<>(page, size);
            //查询count
            result.setSearchCount(true);

            QueryWrapper<AnnouncementInfo> queryWrapper = new QueryWrapper<>();
            queryWrapper.orderByDesc("create_time");
            if (StrUtil.isNotBlank(MapUtil.getStr(pamram, "title"))) {
                queryWrapper.like("title", MapUtil.getStr(pamram, "title"));
            }
            announcementInfoMapper.selectPage(result, queryWrapper);
            return CommonResult.success(result);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }

    /**
     * 获取首页数据
     *
     * @param pamram
     * @return
     */
    @PostMapping(value = "/queryHomePageData")
    public CommonResult<Map<String, Object>> queryHomePageData(@RequestBody Map<String, Object> pamram) {
        if (StrUtil.isNotBlank(MapUtil.getStr(pamram,"userInfoId"))) {
            Map<String,Object> result=new HashMap<>();
            result.put("userData",announcementInfoMapper.selectHomePageData(pamram));
            result.put("announcementInfoData",announcementInfoMapper.selectPage(new Page<>(1, 5),null));
            return CommonResult.success(result);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }










    /**
     * 创建课件信息
     *
     * @param coursewareInfo
     * @return
     */
    @PostMapping(value = "/addCoursewareInfo")
    public CommonResult<String> addCoursewareInfo(@RequestBody CoursewareInfo coursewareInfo) {
        if (coursewareInfo != null) {
            return coursewareInfoMapper.insert(coursewareInfo) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }

        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 修改课件信息
     *
     * @param coursewareInfo
     * @return
     */
    @PostMapping(value = "/updateCoursewareInfo")
    public CommonResult<String> updateCoursewareInfo(@RequestBody CoursewareInfo coursewareInfo) {
        if (coursewareInfo != null) {
            return coursewareInfoMapper.updateById(coursewareInfo) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }

    /**
     * 删除课件信息
     *
     * @param coursewareInfoId
     * @return
     */
    @GetMapping(value = "/deleteCoursewareInfo/{coursewareInfoId}")
    public CommonResult<String> deleteCoursewareInfo(@PathVariable("coursewareInfoId") String coursewareInfoId) {
        if (StrUtil.isNotBlank(coursewareInfoId)) {
            return coursewareInfoMapper.deleteById(coursewareInfoId) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 获取课件信息列表
     *
     * @param pamram
     * @return
     */
    @PostMapping(value = "/queryCoursewareInfoList")
    public CommonResult<Page<Map<String, Object>>> queryCoursewareInfoList(@RequestBody Map<String, Object> pamram) {
        Integer page = MapUtil.getInt(pamram, "pageIndex", 1);
        Integer size = MapUtil.getInt(pamram, "pageSize", 10);
        if (page != null && size != null) {
            //创建分页对象,当前页码数为 1 ，每页展示 10 条数据
            Page<Map<String, Object>> result = new Page<>(page, size);
            //查询count
            result.setSearchCount(true);
            coursewareInfoMapper.selectCoursewareInfoList(result, pamram);
            return CommonResult.success(result);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }










    /**
     * 上传文件
     *
     * @param file
     * @return
     */
    @PostMapping(value = "/filesUpload")
    public CommonResult<String> upload(@RequestParam(value = "file") MultipartFile file) {
        //将相对路径转化为绝对路径
        String destPath = new File(filePath).getAbsolutePath();
        //文件夹路径名称
        String originalFilename = file.getOriginalFilename();
        //文件大小
        double size = file.getSize();
        //文件类型
        String type = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();

        //使用uuid生成随机唯一值

        //新的文件名称，uuid+文件类型
        String fileUuid = SnowflakeUtil.getID() + "." + type;
        //新的文件地址，绝对路径+新的文件名称
        File uploadFile = new File(destPath + "/" + fileUuid);

        //判断配置的文件目录是否存在，若不存在则创建一个新的文件目录
        File parentFile = uploadFile.getParentFile();
        if (!parentFile.exists()) {
            parentFile.mkdirs();
        }

        try {
            file.transferTo(uploadFile);//把获取到的文件存储带磁盘目录
            //返回文件下载路径url
            return CommonResult.success(fileUuid);
        } catch (IOException e) {
            e.printStackTrace();
            return CommonResult.fail("上传失败：" + e.getMessage());
        }
    }


    /**
     * 下载文件
     *
     * @param filesUUID
     * @param request
     * @param response
     */
    @GetMapping("/downloadFile/{filesUUID}")
    public void downloadFiles(@PathVariable String filesUUID, HttpServletRequest request, HttpServletResponse response) {
        OutputStream outputStream = null;
        InputStream inputStream = null;
        BufferedInputStream bufferedInputStream = null;
        byte[] bytes = new byte[1024];
        File file = new File(filePath + filesUUID);
        String fileName = file.getName();

        // 获取输出流
        try {
            // StandardCharsets.ISO_8859_1 *=UTF-8'
            // response.setHeader("Content-Disposition", "attachment;filename=" +  new String(fileName.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1));
            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
            // 以流的形式返回文件
            response.setContentType("application/octet-stream;charset=utf-8");
            inputStream = new FileInputStream(file);
            bufferedInputStream = new BufferedInputStream(inputStream);
            outputStream = response.getOutputStream();
            int i = bufferedInputStream.read(bytes);
            while (i != -1) {
                outputStream.write(bytes, 0, i);
                i = bufferedInputStream.read(bytes);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
                if (outputStream != null) {
                    outputStream.close();
                }
                if (bufferedInputStream != null) {
                    bufferedInputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }


    }

    /**
     * 创建班级信息
     *
     * @param classInfo
     * @return
     */
    @PostMapping(value = "/addClassInfo")
    @Transactional
    public CommonResult<String> addClassInfo(@RequestBody ClassInfo classInfo) {
        if(classInfo!=null){
            List<CoursewareClassRelationship> relationshipList = classInfo.getCoursewareClassRelationshipList();
            if(relationshipList!=null&&relationshipList.size()>0){
                classInfo.setId(SnowflakeUtil.getID());
                relationshipList.forEach(data->{
                    data.setId(SnowflakeUtil.getID());
                    data.setClassInfoId(classInfo.getId());
                    coursewareClassRelationshipMapper.insert(data);
                });
                }
            classInfo.setClassNumber(DateUtil.format(new Date(),"yyyyMMdd").concat(RandomUtil.randomNumbers(4)));
            return classInfoMapper.insert(classInfo) >0?CommonResult.success("成功"):CommonResult.fail(CodeEnum.ERROR);
        }

        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }



    /**
     * 修改班级信息
     *
     * @param classInfo
     * @return
     */
    @PostMapping(value = "/updateClassInfo")
    @Transactional
    public CommonResult<String> updateClassInfo(@RequestBody ClassInfo classInfo) {
        if(classInfo!=null){

            List<CoursewareClassRelationship> relationshipList = classInfo.getCoursewareClassRelationshipList();
            if(relationshipList!=null&&relationshipList.size()>0){
                Map<String,Object> deleteMap=new HashMap<>();
                deleteMap.put("class_info_id",classInfo.getId());
                coursewareClassRelationshipMapper.deleteByMap(deleteMap);

                relationshipList.forEach(data->{
                    data.setId(SnowflakeUtil.getID());
                    data.setClassInfoId(classInfo.getId());
                    coursewareClassRelationshipMapper.insert(data);
                });
            }

            return classInfoMapper.updateById(classInfo) >0?CommonResult.success("成功"):CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }

    /**
     * 删除班级信息
     *
     * @param classInfoId
     * @return
     */
    @GetMapping(value = "/deleteClassInfo/{classInfoId}")
    @Transactional
    public CommonResult<String> deleteClassInfo(@PathVariable("classInfoId") String classInfoId) {
        if(StrUtil.isNotBlank(classInfoId)){
            Map<String,Object> deleteMap=new HashMap<>();
            deleteMap.put("class_info_id",classInfoId);
            coursewareClassRelationshipMapper.deleteByMap(deleteMap);

            return classInfoMapper.deleteById(classInfoId) >0?CommonResult.success("成功"):CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }




    /**
     * 获取班级信息列表
     *
     * @param pamram
     * @return
     */
    @PostMapping(value = "/queryClassInfoList")
    public CommonResult<Page<Map<String,Object>>> queryClassInfoList(@RequestBody Map<String, Object> pamram) {
        Integer page = MapUtil.getInt(pamram, "pageIndex", 1);
        Integer size = MapUtil.getInt(pamram, "pageSize", 10);
        if (page != null && size != null) {
            //创建分页对象,当前页码数为 1 ，每页展示 10 条数据
            Page<Map<String,Object>> result = new Page<>(page, size);
            //查询count
            result.setSearchCount(true);
            classInfoMapper.selectClassInfoAllList(result,pamram);
            return CommonResult.success(result);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 创建学生信息
     *
     * @param studentInfo
     * @return
     */
    @PostMapping(value = "/addStudentInfo")
    public CommonResult<String> addStudentInfo(@RequestBody StudentInfo studentInfo) {
        if(studentInfo!=null){
            try {
                return studentInfoMapper.insert(studentInfo) >0?CommonResult.success("成功"):CommonResult.fail(CodeEnum.ERROR);
            }catch (Exception e){
                return CommonResult.fail(CodeEnum.DUPLICATE_USER);
            }

        }

        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }



    /**
     * 修改学生信息
     *
     * @param studentInfo
     * @return
     */
    @PostMapping(value = "/updateStudentInfo")
    public CommonResult<String> updateStudentInfo(@RequestBody StudentInfo studentInfo) {
        if(studentInfo!=null){
            return studentInfoMapper.updateById(studentInfo) >0?CommonResult.success("成功"):CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }

    /**
     * 删除学生信息
     *
     * @param studentInfoId
     * @return
     */
    @GetMapping(value = "/deleteStudentInfo/{studentInfoId}")
    public CommonResult<String> deleteStudentInfo(@PathVariable("studentInfoId") String studentInfoId) {
        if(StrUtil.isNotBlank(studentInfoId)){
            return studentInfoMapper.deleteById(studentInfoId) >0?CommonResult.success("成功"):CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }




    /**
     * 获取学生信息列表
     *
     * @param pamram
     * @return
     */
    @PostMapping(value = "/queryStudentInfoList")
    public CommonResult<Page<Map<String, Object>>> queryStudentInfoList(@RequestBody Map<String, Object> pamram) {
        Integer page = MapUtil.getInt(pamram, "pageIndex", 1);
        Integer size = MapUtil.getInt(pamram, "pageSize", 10);
        if (page != null && size != null) {
            //创建分页对象,当前页码数为 1 ，每页展示 10 条数据
            Page<Map<String, Object>> result = new Page<>(page, size);
            //查询count
            result.setSearchCount(true);
            studentInfoMapper.selectStudentInfoList(result,pamram);
            return CommonResult.success(result);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 创建作业信息
     *
     * @param jobInfo
     * @return
     */
    @PostMapping(value = "/addJobInfo")
    public CommonResult<String> addJobInfo(@RequestBody JobInfo jobInfo) {
        if (jobInfo != null) {
            return jobInfoMapper.insert(jobInfo) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }

        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 修改作业信息
     *
     * @param jobInfo
     * @return
     */
    @PostMapping(value = "/updateJobInfo")
    public CommonResult<String> updateJobInfo(@RequestBody JobInfo jobInfo) {
        if (jobInfo != null) {
            return jobInfoMapper.updateById(jobInfo) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }

    /**
     * 删除作业信息
     *
     * @param jobInfoId
     * @return
     */
    @GetMapping(value = "/deleteJobInfo/{jobInfoId}")
    public CommonResult<String> deleteJobInfo(@PathVariable("jobInfoId") String jobInfoId) {
        if (StrUtil.isNotBlank(jobInfoId)) {
            return jobInfoMapper.deleteById(jobInfoId) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 获取作业信息列表
     *
     * @param pamram
     * @return
     */
    @PostMapping(value = "/queryJobInfoList")
    public CommonResult<Page<Map<String, Object>>> queryJobInfoList(@RequestBody Map<String, Object> pamram) {
        Integer page = MapUtil.getInt(pamram, "pageIndex", 1);
        Integer size = MapUtil.getInt(pamram, "pageSize", 10);
        if (page != null && size != null) {
            //创建分页对象,当前页码数为 1 ，每页展示 10 条数据
            Page<Map<String, Object>> result = new Page<>(page, size);
            //查询count
            result.setSearchCount(true);
            jobInfoMapper.selectJobInfoList(result, pamram);
            return CommonResult.success(result);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 创建作业记录
     *
     * @param jobRecords
     * @return
     */
    @PostMapping(value = "/addJobRecords")
    public CommonResult<String> addJobRecords(@RequestBody JobRecords jobRecords) {
        if (jobRecords != null) {
            return jobRecordsMapper.insert(jobRecords) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }

        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 修改作业记录
     *
     * @param jobRecords
     * @return
     */
    @PostMapping(value = "/updateJobRecords")
    public CommonResult<String> updateJobRecords(@RequestBody JobRecords jobRecords) {
        if (jobRecords != null) {
            return jobRecordsMapper.updateById(jobRecords) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }

    /**
     * 删除作业记录
     *
     * @param jobRecordsId
     * @return
     */
    @GetMapping(value = "/deleteJobRecords/{jobRecordsId}")
    public CommonResult<String> deleteJobRecords(@PathVariable("jobRecordsId") String jobRecordsId) {
        if (StrUtil.isNotBlank(jobRecordsId)) {
            return jobRecordsMapper.deleteById(jobRecordsId) > 0 ? CommonResult.success("成功") : CommonResult.fail(CodeEnum.ERROR);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 获取作业记录列表
     *
     * @param pamram
     * @return
     */
    @PostMapping(value = "/queryJobRecordsList")
    public CommonResult<Page<Map<String, Object>>> queryJobRecordsList(@RequestBody Map<String, Object> pamram) {
        Integer page = MapUtil.getInt(pamram, "pageIndex", 1);
        Integer size = MapUtil.getInt(pamram, "pageSize", 10);
        if (page != null && size != null) {
            //创建分页对象,当前页码数为 1 ，每页展示 10 条数据
            Page<Map<String, Object>> result = new Page<>(page, size);
            //查询count
            result.setSearchCount(true);
            jobRecordsMapper.selectJobRecordsList(result, pamram);
            return CommonResult.success(result);
        }
        return CommonResult.fail(CodeEnum.ILLEGAL_PARAMETER);
    }


    /**
     * 启动jmter软件
     *
     * @return
     */
    @PostMapping(value = "/startProgram")
    public CommonResult<String> startProgram(@RequestBody Map<String, Object> pamram) {
        if (StrUtil.isNotBlank(MapUtil.getStr(pamram,"path"))) {
            String cmd = "cmd /c start "+MapUtil.getStr(pamram,"path")+"\\jmeter.bat";
            try {
                Process ps = Runtime.getRuntime().exec(cmd);
                ps.waitFor();
                return CommonResult.success("成功");
            } catch (Exception ioe) {
                return CommonResult.fail(CodeEnum.ERROR);
            }
       }
        return CommonResult.fail(CodeEnum.ERROR);
    }
}
