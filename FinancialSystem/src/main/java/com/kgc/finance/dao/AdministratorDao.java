package com.kgc.finance.dao;

import com.kgc.finance.pojo.Administrator;

import java.util.List;
import java.util.Map;

/**
 * @author: 方子瑞
 * @program: com.kgc.finance.dao.AdministratorDao
 * @explain: 管理员表dao
 * @create: 2019-09-07 14:06
 **/
public interface AdministratorDao {
    /**
     * 添加信息
     * @param administrator
     * @return
     */
    public Integer insertAdministrator(Administrator administrator);

    /**
     * 通过id删除信息
     * @param map
     * @return
     */
    public Integer deleteAdministrator(Map map);

    /**
     * 修改信息
     * @param administrator
     * @return
     */
    public Integer updateAdministrator(Administrator administrator);

    /**
     * 通过id查询信息
     * @param map
     * @return
     */
    public Administrator getIdFindAdministrator(Map<String, Object> map);


    /**
     * 通过管理员账户查询信息
     * @param map
     * @return
     */
    public Administrator getNameFindAdministrator(Map<String, Object> map);


    /**
     * 获取管理员表数据总数
     * @param map name 管理员姓名
     *            role 角色
     * @return
     */
    public Integer getAdminCount(Map<String, Object> map);

    /**
     * 获取管理员表数据分页
     * @param map name 管理员姓名
     *            role 角色
     *            pageNo （当前页-1）*页容量
     *            pageSize 页容量
     * @return
     */
     public List<Administrator> getAdminPage(Map<String, Object> map);


    /**
     *首页管理员数据显示
     * @param map
     *      pageNo （当前页-1）*页容量
     *      pageSize 页容量
     * @return
     */
     public List<Map> homepage(Map<String, Object> map);


    /**
     * 获取不同状态下的订单数量
     * @return
     */
     public List<Map> getStatusFindNum();

    /**
     * 根据id获取name和role
     * @return
     */
    public Map getIdFindnameAndRole(Integer id);


}
