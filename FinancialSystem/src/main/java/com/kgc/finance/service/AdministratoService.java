package com.kgc.finance.service;

import com.kgc.finance.pojo.Administrator;

import java.util.List;
import java.util.Map;



public interface AdministratoService {


    /**
     * 添加信息
     * @param  administrator
     * @return
     */
    public Map insertAdministrator(Administrator administrator);

    /**
     * 通过id删除信息
     * @param param id
     * @return
     */
    public Map deleteAdministrator(Map param);

    /**
     * 修改信息
     * @param  administrator
     * @return
     */
    public Map updateAdministrator(Administrator administrator);

    /**
     * 通过id查询信息
     * @param param id
     * @return
     */
    public Map getIdFindAdministrator(Map param);



    /**
     * 添加管理员判断账号是否存在
     * @param account
     * @return
     */
    public Boolean getNameFindAdministrator(String account);


    /**
     * 登录
     * @param param account 用户名
     *              password 密码
     * @return
     */
    public Map loginAdmin(Map<String, Object> param);


    /**
     * 获取管理员表数据总数
     * @param param name 管理员姓名(模糊查询)
     *              role 角色
     *              registerDate 注册时间（模糊查询）
     * @return
     */
    public Map getAdminCount(Map<String, Object> param);

    /**
     * 获取管理员表数据分页
     * @param param name 管理员姓名(模糊查询)
     *              role 角色
     *              registerDate 注册时间（模糊查询）
     *              pageNo （当前页-1）*页容量
     *              pageSize 页容量
     * @return
     */
    public Map getAdminPage(Map<String, Object> param);

    /**
     * 修改密码
     * @param param password 新密码
     *              oldPassword 旧密码
     *              id 用于查询信息获取密码，用于判断
     * @return
     */
    public Map changePassword(Map<String, Object> param);


    /**
     *首页管理员数据显示
     * @param map
     *      pageNo （当前页-1）*页容量
     *      pageSize 页容量
     * @return
     */
    public Map homepage(Map<String, Object> map);



    /**
     * 获取不同状态下的订单数量
     * @return
     */
    public Map getStatusFindNum();






}
