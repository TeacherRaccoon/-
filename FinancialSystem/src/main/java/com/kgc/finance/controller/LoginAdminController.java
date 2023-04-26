package com.kgc.finance.controller;

import com.kgc.finance.pojo.Administrator;
import com.kgc.finance.service.AdministratoService;
import com.kgc.finance.util.MapUtil;
import com.kgc.finance.util.RedisUtil;
import com.kgc.finance.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @author: 方子瑞
 * @program: com.kgc.finance.controller.LoginAdminController
 * @explain: 登录操作控制层
 * @create: 2019-09-07 17:59
 **/
@RequestMapping("/background/login")
@RestController
public class LoginAdminController {

    @Autowired
    private AdministratoService administratoService;

    @Autowired
    private RedisUtil redisUtil;

    /**
     * 登录
     * @param account 账户
     * @param password 密码
     * @param token 加密的token
     * @param request 请求
     * @return
     */
    @RequestMapping(value = "/loginAdmin")
    public Map loginAdmin(String account,String password,String token,HttpServletRequest request) {
        if (token!=null&&!token.equals("")){
            Administrator administrator= (Administrator) redisUtil.get(token);
            if(administrator!=null){
                if(administrator.getPassword().equals(password)){
                    password="true";
                }
                redisUtil.del(token);
            }
        }
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("account",account);
        param.put("password",password);
        param.put("userAgent",request.getHeader("user-agent"));
        return administratoService.loginAdmin(param);
    }


    /**
     * 获取登录信息
     * @param token  加密的token
     * @return
     */
    @RequestMapping("/getLoginInfo")
    public Map getLoginInfo(String token) {
        if(redisUtil.hasKey(token)){
            return MapUtil.encapsulation(true,"获取数据",redisUtil.get(token));
        }
        return MapUtil.encapsulation(false,"数据获取失败！登录已过期");
    }

    /**
     * 注销
     * @param token 加密的token
     * @param response 请求
     * @return
     */
    @RequestMapping("/logout")
    public Map logout(String token, HttpServletResponse response) {
        if(redisUtil.hasKey(token)){
            redisUtil.del(token);
            Cookie cookie = new Cookie("token","");
            cookie.setPath("/");
            cookie.setMaxAge(0);
            response.addCookie(cookie);
            return MapUtil.encapsulation(true,"注销成功！");
        }else {
            return MapUtil.encapsulation(false,"注销失败");
        }
    }

    /**
     * 密码修改
     * @param password 修改的后的密码
     * @param oldPassword 旧密码
     * @param token 用于获取当前登录数据
     * @return
     */
    @RequestMapping("/changePassword")
    public Map changePassword(String password,String oldPassword,String token, HttpServletResponse response) {
        Administrator administrator= (Administrator) redisUtil.get(token);
        if(administrator!=null){
            Map<String, Object> param=new HashMap<>();
            param.put("id",administrator.getId());
            param.put("password",password);
            param.put("oldPassword",oldPassword);
            Map map=administratoService.changePassword(param);
          if ((map.get("result").toString().equals("true"))){
              System.out.println("----------->>   清除cookie");
                  redisUtil.del(token);
                  Cookie cookie = new Cookie("token","");
                  cookie.setPath("/");
                  cookie.setMaxAge(0);
                  response.addCookie(cookie);
            }
            return  map;
        }
        return MapUtil.encapsulation(false,"非法登录！");
    }



}
