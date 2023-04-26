package com.kgc.finance.controller;

import com.kgc.finance.pojo.Administrator;
import com.kgc.finance.service.AdministratoService;
import com.kgc.finance.service.TimeIineService;
import com.kgc.finance.util.MapUtil;
import com.kgc.finance.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;


@RequestMapping("/background/administrator")
@RestController
public class AdministratorController {



    @Resource
    private AdministratoService administratoService;

    @Resource
    private RedisUtil redisUtil;

    /**
     * 添加   ||   修改数据
     * @param administrator 数据封装对象
     * @return
     */
    @RequestMapping("/insertAndUpdateAdministrator")
    public Map insertAdmin(Administrator administrator) {
        if (administrator.getId() != null) {            //修改管理员数据操作
            return administratoService.updateAdministrator(administrator);
        } else {
            return administratoService.insertAdministrator(administrator);
        }
    }

    /**
     * 删除数据
     * @param id 管理员id
     * @return
     */
    @RequestMapping("/deleteAdministrator")
    public Map deleteAdministrator(Integer id) {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", id);
        return administratoService.deleteAdministrator(param);
    }

    /**
     * 通过id查询信息
     * @param id
     * @return
     */
    @RequestMapping("/getIdFindAdministrator")
    public Map getIdFindAdministrator(Integer id) {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", id);
        return administratoService.getIdFindAdministrator(param);
    }


    /**
     * 获取管理员表数据总数
     * @param name 管理员姓名(模糊查询)
     * @param role 角色
     * @param registerDate 注册时间（模糊查询）
     * @return
     */
    @RequestMapping("/getAdminCount")
    public Map getAdminCount(String name, Integer role,String registerDate) {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("name", name);
        param.put("role", role);
        param.put("registerDate", registerDate);
        Map map = (Map) redisUtil.get("getAdminCount:" + param);
        if (map != null) {
            System.out.println("缓存获取数据成功！");
            return map;
        } else {
            return administratoService.getAdminCount(param);
        }
    }

    /**
     * 获取管理员表数据分页
     * @param name 管理员姓名(模糊查询)
     * @param role 角色
     * @param registerDate 注册时间（模糊查询）
     * @param curr 当前页
     * @param limit 页容量
     * @return
     */
    @RequestMapping("/getAdminPage")
     public Map getAdminPage(String name, Integer role,String registerDate, Integer curr, Integer limit) {
        Map<String, Object> param = new HashMap<String, Object>();
        //   pageNo （当前页-1）*页容量
        param.put("pageNo", (curr - 1) * limit);
        param.put("pageSize", limit);
        param.put("name", name);
        param.put("registerDate", registerDate);
        param.put("role", role);
        Map map = (Map) redisUtil.get("getAdminPage:" + param);
        if (map != null) {
            System.out.println("缓存获取数据成功！");
            return map;
        } else {
            return administratoService.getAdminPage(param);
        }
    }


    /**
     * 获取首页操作员处理订单数据
     * @param curr 当前页
     * @param limit 页容量
     * @return
     */
    @RequestMapping("/getIdfinInfoEntry")
    public Map getIdfinInfoEntry(Integer curr, Integer limit) {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("pageNo", (curr - 1) * limit);
        param.put("pageSize", limit);
        return administratoService.homepage(param);
    }

    /**
     * 获取不同状态下的订单数量
     * @return
     */
    @RequestMapping("/getStatusFindNum")
    public Map getStatusFindNum() {
        return administratoService.getStatusFindNum();
    }



}
