package com.example.ctrip.Service;


import com.example.ctrip.Pojo.UserContact;
import com.example.ctrip.Pojo.UserPassenger;
import com.example.ctrip.Pojo.User;
import com.example.ctrip.Pojo.UserOrder;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface UserService {
    public String Test();

    //登录验证
    public Map login(String loginName, String password);

    //注册用户
    public Map addUser(Map params);

    //根据用户的登录名获取用户信息
    public Map getUserByLName(String loginName);

    //编辑用户信息
    public Map updateUserInfo(User user);


    //根据登录名修改密码
    public Map updatePassword(Map params);

    //获取城市名称
    public Map getCity();

    //根据旅客姓名查询旅客信息
    public Map getPassenger(Map params);

    //根据旅客id查询旅客信息
    public Map getPassengerById(Integer id);

    //根据旅客 id 修改旅客信息
    public Map updatePassengderInfoByid(UserPassenger userPassenger);

    //添加旅客信息
    public Map addPassenger(UserPassenger userPassenger);

    //根据旅客 id 批量删除旅客
    public Map delPassengder(List passengerIds);

    //根据联系人姓名查询联系人信息
    public Map getContactInfo(Map parmas);

    //根据 id 修改联系人信息
    public Map updateContactById(UserContact userContact);

    //添加常用联系人
    public Map addContact(UserContact userContact);

    //根据id删除常用联系人
    public Map delContact(List ids);

    //跟据id获取联系人信息
    public Map getContactByid(int id);

    //获取订单状态
    public Map getOrderStatus();

    //根据订单编码、旅客姓名、预订日期‘ 订单类型’ 未出行（行程有效时间） ‘订单状态’ 查询所有订单
    public Map getUserOrder(UserOrder params);

    //根据入住人、入住日期、订单状态查询酒店订单信息
    public Map getHotelOrder(UserOrder params);

    //根据出行人、出行日期、订单状态查询门票订单信息
    public Map getTicketOrder(UserOrder params);

    //根据出行人、出行日期、订单状态查询旅游订单信息
    public Map getTravelOrder(UserOrder params);

    //根据订单编码查询门票订单详情包括景点信息、旅客信息、订单详情
    public Map getOrderInfo(@Param("orderCode")String orderCode);

    //根据订单编码查询门票订单详情包括景点信息、旅客信息、订单详情 涵盖旅客详情
    public Map getTOrderInfo(@Param("orderCode")String orderCode);

    //添加用户头像
    public Map addImg(Map params);

    //登录时获取用户信息用户头像
    public Map getUserInfoImgByLoginName(@Param("loginName")String loginName);

}
