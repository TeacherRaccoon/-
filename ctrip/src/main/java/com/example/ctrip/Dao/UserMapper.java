package com.example.ctrip.Dao;

import com.example.ctrip.Pojo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface UserMapper {
    //测试Mapper映射
    public String Test();

    //根据用户名获取用用户
    public User getPasswordByName(@Param("loginName")String loginName);

    //添加用户
    public Integer addUser(Map map);

    //根据用户登录名获取用户信息
    public User getUserByName(@Param("loginName")String loginName);

    //修改用户信息
    public int updateUserInfo(User user);


    //根据用户名修改用户密码
    public int updatePasswordByLoginName(Map params);

    //查询常用城市
    public List<City> getCity();

    //根据旅客姓名模糊查询旅客信息
    public List<UserPassenger> getPassenger(Map params);

    //根据Id获取旅客信息
    public UserPassenger getPassengerById(@Param("id")Integer id);

    //根据旅客 id 修改旅客信息
    public int updatePassengerInfo(UserPassenger userPassenger);

    //添加旅客信息
    public int addPassenger(UserPassenger userPassenger);

    //删除旅客信息
    public int delPassengerById(List passengerIds);

    //根据联系人姓名查询联系人信息
    public List<UserContact> getContactByName(Map params);

    //根据联系人 id 修改联系人信息
    public int updateContact(UserContact userContact);

    //添加联系人
    public int addContact(UserContact userContact);

    //根据 id 删除联系人
    public int delContact(List ids);

    //根据 id 获取联系人信息
    public UserContact getContactById(int id);

    //获取订单状态
    public List<String> getOrderStatus();

    //根据订单编码、旅客姓名、预订日期‘ 订单类型’ 未出行（行程有效时间） ‘订单状态’ 查询所有订单
    public List<UserOrder> getUserOrder(UserOrder params);


    public List<UserOrder> getHotelOrder(UserOrder params);

    public List<UserOrder> getTicketOrder(UserOrder params);

    public List<UserOrder> getTravelOrder(UserOrder params);

    //添加用户头像
    public Integer addImg(Map params);

    //登录时获取用户信息用户头像
    public Map getUserInfoImgByLoginName(@Param("loginName")String loginName);

}
