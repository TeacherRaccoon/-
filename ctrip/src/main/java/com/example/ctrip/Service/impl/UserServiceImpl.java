package com.example.ctrip.Service.impl;

import com.example.ctrip.Dao.TicketMapper;
import com.example.ctrip.Dao.UserMapper;
import com.example.ctrip.Pojo.*;
import com.example.ctrip.Service.UserService;
import com.example.ctrip.util.MapUtil;
import com.example.ctrip.util.RedisUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class UserServiceImpl implements UserService {
    private Map map = new HashMap();


    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    public TicketMapper ticketMapper;
    @Override
    //申明事务注解
    @Transactional
    public String Test() {
        return userMapper.Test();
    }

    /**
     * 用户登录验证
     *
     * @param loginName
     * @param password
     * @return
     */
    @Transactional
    public Map login(String loginName, String password) {
        //判断用户是否存在
        User user = userMapper.getPasswordByName(loginName);
        if (user != null) {
            //判断密码输入是否正确
            if (user.getPassword().equals(password)) {
                map = MapUtil.encapsulation(true, "验证成功！", user);
            } else {
                map = MapUtil.encapsulation(false, "密码输入有误！", "");
            }
        } else {
            map = MapUtil.encapsulation(false, "不存在该用户！", "");
        }
        return map;
    }


    /**
     * 用户注册
     *
     * @param params
     * @return
     */
    @Transactional //事务注解
    public Map addUser(Map params) {

        //判断用户名是否存在
        String loginName = (String) params.get("loginName");
        User pwd = userMapper.getPasswordByName(loginName);
        if (pwd == null) {
            userMapper.addUser(params);//添加用户
            map.put("result",true);
            map.put("msg", "注册成功,请妥善保管密码！");
        } else {
            map.put("msg", "该用户名已经存在！");
            map.put("result", false);
        }
        return map;
    }


    /**
     * //根据用户的登录名获取用户信息
     *
     * @param loginName
     * @return
     */
    public Map getUserByLName(String loginName) {
        User user = userMapper.getUserByName(loginName);
        if (user != null) {
            map.put("msg", "查询用户信息成功！");
            map.put("result", true);
            map.put("data", user);
        } else {
            map.put("msg", "查询失败！");
            map.put("resutlt", false);
        }

        return map;
    }

    /**
     * 根据登录名修改密码
     *
     * @param params
     * @return
     */
    public Map updatePassword(Map params) {
        int i = userMapper.updatePasswordByLoginName(params);
        if (i > 0) {
            map.put("msg", "修改密码成功！");
            map.put("result", true);
        } else {
            map.put("msg", "修改密码失败！");
            map.put("resutlt", false);
        }
        return map;
    }

    /**
     * //编辑用户信息
     *
     * @param user
     * @return
     */
    @Transactional
    public Map updateUserInfo(User user) {
        int i = userMapper.updateUserInfo(user);

        if (i > 0) {
            map.put("msg", "修改数据成功！");
            map.put("result", true);
        } else {
            map.put("msg", "修改数据失败！");
            map.put("result", false);
        }
        return map;
    }

    /**
     * //获取城市名称
     *
     * @return
     */
    public Map getCity() {
        List<City> citys = (List) redisUtil.get("city");
        if (citys == null) {
            citys = userMapper.getCity();
            redisUtil.set("city", citys);
        }
        map.put("data", citys);
        return map;
    }


    /**
     * //根据旅客姓名查询旅客信息
     *
     * @param params
     * @return
     */
    public Map getPassenger(Map params) {
        List<UserPassenger> list = userMapper.getPassenger(params);
        if (list != null) {
            map = MapUtil.encapsulation(true, "查询成功！", list);
        } else {
            map = MapUtil.encapsulation(false, "查询失败！");
        }
        return map;
    }


    /**
     * 根据旅客id查询旅客信息
     *
     * @param id
     * @return
     */

    public Map getPassengerById(Integer id) {
        UserPassenger userPassenger = userMapper.getPassengerById(id);
        if (userPassenger != null) {
            map = MapUtil.encapsulation(true, "查询旅客成功！", userPassenger);
        } else {
            map = MapUtil.encapsulation(false, "查询失败！");
        }
        return map;
    }

    /**
     * 根据旅客 id 修改旅客信息
     *
     * @param userPassenger
     * @return
     */
    public Map updatePassengderInfoByid(UserPassenger userPassenger) {

        int i = userMapper.updatePassengerInfo(userPassenger);

        if (i > 0) {
            map = MapUtil.encapsulation(true, "修改旅客信息成功！", i);
        } else {
            map = MapUtil.encapsulation(false, "修改旅客信息失败！");
        }
        return map;

    }

    /**
     * 添加旅客信息
     *
     * @param userPassenger
     * @return
     */
    public Map addPassenger(UserPassenger userPassenger) {
        int i = userMapper.addPassenger(userPassenger);
        if (i > 0) {
            map = MapUtil.encapsulation(true, "添加旅客成功！", i);
        } else {
            map = MapUtil.encapsulation(false, "添加旅客信息失败");
        }
        return map;
    }

    /**
     * //根据旅客 id 批量删除旅客
     *
     * @param passengerIds
     * @return
     */
    public Map delPassengder(List passengerIds) {
        int i = userMapper.delPassengerById(passengerIds);
        if (i > 0) {
            map = MapUtil.encapsulation(true, "删除成功！");
        } else {
            map = MapUtil.encapsulation(false, "删除失败！");
        }
        return map;
    }

    /**
     * 根据联系人姓名查询联系人信息
     *
     * @param params
     * @return
     */
    public Map getContactInfo(Map params) {
        List<UserContact> list = userMapper.getContactByName(params);
        if (list != null) {
            map = MapUtil.encapsulation(true, "查询联系人成功！", list);
        } else {
            map = MapUtil.encapsulation(false, "查询失败！");
        }
        return map;
    }


    /**
     * 根据 id 修改联系人信息
     *
     * @param userContact
     * @return
     */
    @Transactional
    public Map updateContactById(UserContact userContact) {
        int i = userMapper.updateContact(userContact);
        if (i > 0) {
            map = MapUtil.encapsulation(true, "修改联系人信息成功！");
        } else {
            map = MapUtil.encapsulation(false, "修改联系人信息失败！");
        }
        return map;
    }

    /**
     * 添加常用联系人
     *
     * @param userContact
     * @return
     */
    public Map addContact(UserContact userContact) {
        int i = userMapper.addContact(userContact);
        if (i > 0) {
            map = MapUtil.encapsulation(true, "添加联系人成功！");
        } else {
            map = MapUtil.encapsulation(false, "添加联系人失败！");
        }
        return map;
    }

    /**
     * 根据id删除常用联系人
     *
     * @param ids
     * @return
     */
    public Map delContact(List ids) {
        int i = userMapper.delContact(ids);
        if (i > 0) {
            map = MapUtil.encapsulation(true, "删除联系人成功！");
        } else {
            map = MapUtil.encapsulation(false, "删除联系人失败！");
        }
        return map;
    }

    /**
     * 跟据id获取联系人信息
     *
     * @param id
     * @return
     */
    public Map getContactByid(int id) {
        UserContact userContact = userMapper.getContactById(id);
        if (userContact != null) {
            map = MapUtil.encapsulation(true, "查询常用联系人成功！", userContact);
        } else {
            map = MapUtil.encapsulation(false, "失败!");
        }
        return map;
    }

    /**
     * 获取订单状态
     *
     * @return
     */
    public Map getOrderStatus() {
        List<String> list = userMapper.getOrderStatus();
        return MapUtil.encapsulation(true, "success", list);
    }

    /**
     * 根据订单编码、旅客姓名、预订日期‘ 订单类型’ 未出行（行程有效时间） ‘订单状态’ 查询所有订单
     *
     * @param params
     * @return
     */
    public Map getUserOrder(UserOrder params) {
        List<UserOrder> list = userMapper.getUserOrder(params);
        if (list != null) {
            map = MapUtil.encapsulation(true, "查询订单成功！", list);
        } else {
            map = MapUtil.encapsulation(false, "查询订单失败！");
        }
        return map;
    }

    /**
     * 根据入住人、入住日期、订单状态查询酒店订单信息
     *
     * @return
     */
    @Override
    public Map getHotelOrder(UserOrder params) {
        List<UserOrder> list = userMapper.getHotelOrder(params);
        if (list != null) {
            map = MapUtil.encapsulation(true, "查询订单成功！", list);
        } else {
            map = MapUtil.encapsulation(false, "查询订单失败！");
        }
        return map;
    }

    /**
     * 根据出行人、出行日期、订单状态查询门票订单信息
     *
     * @return
     */
    @Override
    public Map getTicketOrder(UserOrder params) {
        List<UserOrder> list = userMapper.getTicketOrder(params);
        if (list != null) {
            map = MapUtil.encapsulation(true, "查询订单成功！", list);
        } else {
            map = MapUtil.encapsulation(false, "查询订单失败！");
        }
        return map;
    }

    /**
     * 根据出行人、出行日期、订单状态查询旅游订单信息
     *
     * @return
     */
    @Override
    public Map getTravelOrder(UserOrder params) {
        List<UserOrder> list = userMapper.getTravelOrder(params);
        if (list != null) {
            map = MapUtil.encapsulation(true, "查询订单成功！", list);
        } else {
            map = MapUtil.encapsulation(false, "查询订单失败！");
        }
        return map;
    }

    /**
     * 根据订单编码查询门票订单详情包括景点信息、旅客信息、订单详情
     * @param orderCode
     * @return
     */
    public Map getOrderInfo(@Param("orderCode")String orderCode){
        List<Map> tikInfo = ticketMapper.getOrderInfo(orderCode);

        if(tikInfo !=null){
            return MapUtil.encapsulation(true,"success",tikInfo);
        }else{
            return MapUtil.encapsulation(false,"falied");
        }
    }

    /**
     * 根据订单编码查询门票订单详情包括景点信息、旅客信息、订单详情 涵盖旅客详情
     * @param orderCode
     * @return
     */
    public Map getTOrderInfo(@Param("orderCode")String orderCode){
        TicketOrder ticketOrders = ticketMapper.getTorderInfo(orderCode);
        if(ticketOrders !=null){
            return MapUtil.encapsulation(true,"ok",ticketOrders);
        }else{
            return MapUtil.encapsulation(false,"failed");
        }
    }

    //添加用户头像
    public Map addImg(Map params){
          int i=  userMapper.addImg(params);
          if(i>0){
              return MapUtil.encapsulation(true,"ok",i);
          }else{
              return MapUtil.encapsulation(false,"failed",i);
          }
    }

    //登录时获取用户信息用户头像
    public Map getUserInfoImgByLoginName(@Param("loginName")String loginName){
       Map result =  userMapper.getUserInfoImgByLoginName(loginName);
       if(result!=null){
           return MapUtil.encapsulation(true,"ok",result);
       }
       else{
           return MapUtil.encapsulation(false,"failed");

       }
    }

}