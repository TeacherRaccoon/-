package com.kgc.finance.service.impl;

import com.kgc.finance.dao.AdministratorDao;
import com.kgc.finance.pojo.Administrator;
import com.kgc.finance.service.AdministratoService;
import com.kgc.finance.service.TimeIineService;
import com.kgc.finance.util.MapUtil;
import com.kgc.finance.util.RedisUtil;
import com.kgc.finance.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Transactional
public class AdministratoServiceImpl implements AdministratoService {

    @Autowired
    private AdministratorDao administratorDao;

    @Autowired
    private TimeIineService timeIineService;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    private RedisUtil redisUtil;

    @Override
    public Map insertAdministrator(Administrator administrator) {
        //判断账号是否存在
        if (getNameFindAdministrator(administrator.getAccount())){   //可添加
            if(administratorDao.insertAdministrator(administrator)>0){
                redisUtil.clearRedis(new String[]{"getAdminPage", "getAdminCount"});
                return MapUtil.encapsulation(true,"添加成功！");
            }else {
                return MapUtil.encapsulation(false, "添加失败！");
            }
        }else {    //不可添加
            return MapUtil.encapsulation(false, "账号已存在");
        }
    }

    @Override
    public Map deleteAdministrator(Map param) {
        if(administratorDao.deleteAdministrator(param)>0){
            redisUtil.clearRedis(new String[]{"getAdminPage", "getAdminCount"});
            return MapUtil.encapsulation(true,"删除成功！");
        }else {
            return MapUtil.encapsulation(false, "删除失败！");
        }
    }

    @Override
    public Map updateAdministrator(Administrator administrator) {
        Integer paleng=0;
        if (administrator.getPassword()!=null){
            paleng= administrator.getPassword().length();
        }
       if ((paleng>5&&paleng<17)||paleng==0){
           if(administratorDao.updateAdministrator(administrator)>0){
               redisUtil.clearRedis(new String[]{"getAdminPage"});
               return MapUtil.encapsulation(true,"修改成功！");
           }else {
               return MapUtil.encapsulation(false,"修改失败！");
           }
       }else
           return MapUtil.encapsulation(false,"修改失败！~新密码格式错误！");
    }

    @Override
    public Map getIdFindAdministrator(Map param) {
        Administrator administrator=administratorDao.getIdFindAdministrator(param);
        if(administrator!=null){
            return MapUtil.encapsulation(true,"查找成功！",administrator);
        }else {
            return MapUtil.encapsulation(false,"查找失败！");
        }
    }

    @Override
    public Boolean getNameFindAdministrator(String account) {
        Map<String, Object> param=new HashMap();
        param.put("account",account);
        Administrator administrator=administratorDao.getNameFindAdministrator(param);
        if (administrator!=null){
            return false;
         }else {
            return true;
        }
    }

    @Override
    public Map loginAdmin(Map<String, Object> param) {
        String password= (String) param.get("password");
        Administrator administrator=administratorDao.getNameFindAdministrator(param);
        //通过用户名判断管理员是否存在
        if(administrator!=null){
            //密码判断
            if(administrator.getPassword().equals(password)||password.equals("true")){
                if (administrator.getStatus()==1){
                    //生成加密的token
                    String token=tokenUtil.getToken((String) param.get("userAgent"),administrator) ;
                    //存入redis
                    tokenUtil.save(token,administrator);
                    return MapUtil.encapsulation(true,"登录成功！",token);
                }else {
                    return MapUtil.encapsulation(false,"未获得使用权限");
                }
            }else {
                return MapUtil.encapsulation(false,"密码输入错误！");
            }
        }else {
            return MapUtil.encapsulation(false,"账户输入错误！");
        }
    }

    @Override
    public Map getAdminCount(Map<String, Object> param) {
        Integer count= administratorDao.getAdminCount(param);
        if (count>0){
            redisUtil.set("getAdminCount:"+param,MapUtil.encapsulation(true,"总数获取成功！",count));
            return MapUtil.encapsulation(true,"总数获取成功！",count);
        }else {
            return MapUtil.encapsulation(false,"总数获取失败！");
        }
    }

    @Override
    public Map getAdminPage(Map<String, Object> param) {
        List list=administratorDao.getAdminPage(param);
        if(list.size()>0){
            redisUtil.set("getAdminPage:"+param,MapUtil.encapsulation(true,"分页数据获取成功！",list));
            return MapUtil.encapsulation(true,"分页数据获取成功！",list);
        }else {
            return MapUtil.encapsulation(false,"数据查找为空！");
        }
    }

    @Override
    public Map changePassword(Map<String, Object> param) {
       Administrator administrator= administratorDao.getIdFindAdministrator(param);
       String password= (String) param.get("password");
       String oldPassword= (String) param.get("oldPassword");
       if(administrator.getPassword().equals(oldPassword)){
           Administrator admin=new Administrator();
           admin.setId(administrator.getId());
           admin.setPassword(password);
           Integer i= administratorDao.updateAdministrator(admin);
           if (i>0)
               return MapUtil.encapsulation(true,"密码修改成功！");
           else
               return MapUtil.encapsulation(false,"密码修改失败！");
       }else {
           System.out.println("------------->>旧密码输入错误");
           return MapUtil.encapsulation(false,"旧密码输入错误！");
       }
    }

    @Override
    public Map homepage(Map<String, Object> param) {
        List<Map> list=administratorDao.homepage(param);
        for (Map map:list){
            Integer amount= timeIineService.getIdfinInfoEntry((Integer) map.get("id"));
            map.put("amount",amount);
        }
        return MapUtil.encapsulation(true,"数据",list);
    }


    @Override
    public Map getStatusFindNum() {
        List list=administratorDao.getStatusFindNum();
        if (list!=null){
            return MapUtil.encapsulation(true,"数据获取成功！",list);
        }
        return MapUtil.encapsulation(false,"数据为空！");
    }


}
