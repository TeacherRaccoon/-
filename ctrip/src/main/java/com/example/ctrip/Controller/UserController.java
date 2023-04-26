package com.example.ctrip.Controller;


import com.example.ctrip.Pojo.UserContact;
import com.example.ctrip.Pojo.UserPassenger;
import com.example.ctrip.Pojo.User;
import com.example.ctrip.Pojo.UserOrder;
import com.example.ctrip.Service.UserService;
import com.example.ctrip.util.MapUtil;
import com.example.ctrip.util.RedisUtil;
import com.example.ctrip.util.SendMsg;
import com.example.ctrip.util.Upload;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = "/user")
public class UserController {

    Map map = new HashMap();
    @Autowired
    UserService userService;
    @Autowired
    RedisUtil redisUtil;
    @Autowired
    SendMsg sendMsg;

    @RequestMapping("/hello")
    public String sayHello() {
        return userService.Test();
    }

    /**
     * 发送验证码
     *
     * @param phone
     * @return
     */
    @RequestMapping("/register01")
    public Map register01(String phone) {
        String code = sendMsg.sendMsg(phone);
        if (code != null) {
            redisUtil.set("phone:" + phone, code, 300);//将验证码放入redis中
            return MapUtil.encapsulation(true, "获取验证码成功，请尽快使用！");
        } else {
            return MapUtil.encapsulation(false, "获取验证码失败！");
        }
    }

    /**
     * 注册验证
     *
     * @param phone
     * @param code
     * @return
     */
    @RequestMapping("/validate")
    public Map validate(String phone, String code) {
        //根据用户输入的 phone 去redis中查询验证码
        String valcode = (String) redisUtil.get("phone:" + phone);
        if (code.equals(valcode)) {
            redisUtil.del("phone:" + phone);
            return MapUtil.encapsulation(true, "注册成功！");
        } else {
            return MapUtil.encapsulation(false, "注册失败！");
        }
    }

    /**
     * 登录
     *
     * @param loginName
     * @param password
     * @return
     */
    @RequestMapping("/login")
    public Map login(@RequestParam(required = true) String loginName, @RequestParam(required = false) String password) {
        Map login = new HashMap();
        try {
            if (loginName == null || loginName == "" || password == null || password == "") {
                map.put("msg", "用户名密码不能为空");
                return map;
            } else {
                login = (Map) redisUtil.get("user:loginName:" + loginName);
                if (login == null) {//从Redis中没有找到该用户登录记录  从数据库中查找
                    login = userService.login(loginName, password);//后端登录验证
                    if ((Boolean) login.get("result")) {
                        //登录成功将 loginName 存入redis 中
                        redisUtil.set("user:loginName:" + loginName, login, 50000);
                    }
                }
            }
        } catch (Exception e) {
            map.put("msg", "发生未知异常！");
            e.printStackTrace();
        }
        return login;
    }

    /**
     * 退出登录
     *
     * @param loginName
     * @return
     */
    @RequestMapping("/validateLogin")
    public Map validateLogin(String loginName) {
        try {
            redisUtil.del("user:loginName:" + loginName);
            return MapUtil.encapsulation(true, "注销登录成功！");
        } catch (Exception e) {
            return MapUtil.encapsulation(false, "该账号未登录（或注销失败！）");
        }

    }


    /**
     * 从redis中获取登录名
     *
     * @param loginName
     * @return
     */
    @RequestMapping("/getRLoginName")
    public Map getLoginName(String loginName) {
        map = (Map) redisUtil.get("user:loginName:" + loginName);
        return map;
    }

    /**
     * 删除redis中的登录名
     *
     * @param loginName
     * @return
     */
    @RequestMapping("/delRLoginName")
    public Map delLoginName(String loginName) {
        try {
            redisUtil.del("user:loginName:" + loginName);
            map = MapUtil.encapsulation(true, "退出成功！");
        }catch (Exception e){
            map = MapUtil.encapsulation(false,"退出异常！");
        }
        return map;
    }

    /**
     * 用户注册
     *
     * @param loginName
     * @param password
     * @param phone
     * @return
     */
    @RequestMapping("/register")
    public Map addUser(String loginName, String password, String phone) {
        Map params = new HashMap();
        params.put("loginName", loginName);
        params.put("password", password);
        params.put("phone", phone);
        if (loginName == "" || loginName == null) {
            map.put("msg", "用户名不能为空！");
            return map;
        }
        return userService.addUser(params);
    }

    /**
     * 根据登录名获取用户信息
     *
     * @param loginName
     * @return
     */
    @RequestMapping("/getUserByL")
    public Map getUser(String loginName) {
        return userService.getUserByLName(loginName);
    }

    /**
     * 编辑用户信息
     *
     * @param user
     * @return
     */
    @RequestMapping("/editUserInfo")
    public Map editUserInfo(User user) {
        return userService.updateUserInfo(user);
    }


    @RequestMapping("/updatePassword")
    public Map upPwd(String loginName, String password) {
        Map params = new HashMap();
        params.put("loginName", loginName);
        params.put("password", password);
        return userService.updatePassword(params);
    }

    /**
     * 获取城市
     *
     * @return
     */
    @RequestMapping("/getCity")
    public Map getCity() {
        return userService.getCity();
    }

    @RequestMapping("/getPassenger")
    public Map getPassenger(String name, String loginName) {
        Map params = new HashMap();
        params.put("loginName", loginName);
        params.put("name", name);
        return userService.getPassenger(params);
    }

    /**
     * 根据旅客 id 获取旅客信息
     *
     * @param id
     * @return
     */
    @RequestMapping("/getPassengerByid")
    public Map getPassengerByid(Integer id) {
        return userService.getPassengerById(id);
    }

    /**
     * 根据id 修改旅客信息
     *
     * @param userPassenger 旅客
     * @param telzoon       区号
     * @param telnum        电话号码
     * @param foxzoon       传真区号
     * @param foxnum        传真号码
     * @return
     */
    @RequestMapping("/editPassenger")
    public Map updatePassengerInfoById(UserPassenger userPassenger,
                                       String telzoon,
                                       String telnum,
                                       String foxzoon,
                                       String foxnum) {

        telnum = telzoon + "-" + telnum;
        foxnum = foxzoon + "-" + foxnum;
        System.out.println(telnum);
        System.out.println(foxnum);
        userPassenger.setTel(telnum);
        userPassenger.setFox(foxnum);
        return userService.updatePassengderInfoByid(userPassenger);
    }

    /**
     * 添加旅客信息
     *
     * @param userPassenger
     * @return
     */
    @RequestMapping("/addPassenger")
    public Map addPassenger(UserPassenger userPassenger) {
        return userService.addPassenger(userPassenger);
    }

    /**
     * 批量删除旅客
     *
     * @param params
     * @return
     */
    @RequestMapping("/delPassenger")
    public Map delPassengder(@RequestParam(value = "params[]") List<Integer> params) {
        return userService.delPassengder(params);
    }

    /**
     * 根据联系人姓名查找联系人信息
     *
     * @param name
     * @return
     */
    @RequestMapping("/getContact")
    public Map getContact(String name, String loginName) {
        Map params = new HashMap();
        params.put("name", name);
        params.put("loginName", loginName);
        return userService.getContactInfo(params);
    }

    /**
     * 根据联系人 id 修改联系人信息
     *
     * @param userContact
     * @return
     */
    @RequestMapping("/upContact")
    public Map upContact(UserContact userContact) {
        return userService.updateContactById(userContact);
    }

    /**
     * 添加联系人
     *
     * @param userContact
     * @return
     */
    @RequestMapping("/addContact")
    public Map addContact(UserContact userContact) {
        return userService.addContact(userContact);
    }

    /**
     * 删除联系人
     *
     * @param params
     * @return
     */
    @RequestMapping("/delContact")
    public Map delContact(@RequestParam(value = "params[]") List<Integer> params) {
        return userService.delContact(params);
    }

    @RequestMapping("/getOrderStatus")
    public Map getOrderStatus() {
        return userService.getOrderStatus();
    }


    /**
     * 根据id获取联系人信息
     *
     * @param id
     * @return
     */
    @RequestMapping("/getContactById")
    public Map getContact(Integer id) {
        return userService.getContactByid(id);
    }

    //根据订单编码、旅客姓名、预订日期‘ 订单类型’ 未出行（行程有效时间） ‘订单状态’ 查询所有订单
    @RequestMapping("/getUserOrder")
    public Map getUserOrder(UserOrder params) {
        return userService.getUserOrder(params);
    }

    //根据入住人、入住日期、订单状态查询酒店订单信息
    @RequestMapping("/getHotelOrder")
    public Map getHotelOrder(UserOrder params) {
        return userService.getHotelOrder(params);
    }

    //根据出行人、出行日期、订单状态查询门票订单信息
    @RequestMapping("/getTicketOrder")
    public Map getTicketOrder(UserOrder params) {
        return userService.getTicketOrder(params);
    }

    //根据出行人、出行日期、订单状态查询旅游订单信息
    @RequestMapping("/getTravelOrder")
    public Map getTravelOrder(UserOrder params) {
        return userService.getTravelOrder(params);
    }

    /**
     * 根据订单编码查询门票订单详情包括景点信息、旅客信息、订单详情
     * @param orderCode
     * @return
     */
    @RequestMapping("/getTicInfo")
    public Map getOrderInfo(@Param("orderCode")String orderCode){
        return  userService.getOrderInfo(orderCode);
    }

    /**
     * 根据订单编码查询门票订单详情包括景点信息、旅客信息、订单详情 涵盖旅客详情
     * @param orderCode
     * @return
     */
    @RequestMapping("/getTorderInfo")
    public Map getTOrderInfo(@Param("orderCode")String orderCode){
        return userService.getTOrderInfo(orderCode);
    }

    /**
     * 上传头像
     * @return
     */
    @RequestMapping("/addPicture")
    public Map addPicture(HttpServletRequest request, @RequestParam("file") MultipartFile file,String loginName){
        Upload upload = new Upload();
        try {
            //上传目录地址
            //String uploadDir = request.getSession().getServletContext().getRealPath("upload");
            String uploadDir = request.getSession().getServletContext().getRealPath("/") + "upload/";
            System.out.println(uploadDir);
            //如果目录不存在，自动创建文件夹
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdir();
            }
            //调用上传方法
            String fileName = upload.executeUpload(uploadDir, file);

            //往数据库里插入数据
            // uploadDir = uploadDir.substring(0, uploadDir.length() - 1);
            Map params = new HashMap();
            params.put("imgName",fileName);
            params.put("loginName",loginName);
            Map result = userService.addImg(params);
            if((boolean)result.get("result") == true ){
                System.out.println("OK");
            }
            map.put("fileName", fileName);
            map.put("dir", uploadDir);
            map.put("code",1);
            map.put("msg","上传成功");

        } catch (Exception e) {
            map.put("code",2);
            map.put("msg","上传失败");
            e.printStackTrace();
        }
        return  map;
    }

    /**
     * 登录时获取用户信息用户头像
     * @param loginName
     * @return
     */
    @RequestMapping("/getImg")
    public Map getUserInfoImgByLoginName(String loginName){
        return userService.getUserInfoImgByLoginName(loginName);
    }



}
