package com.example.ctrip.Pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;


@Component
@Data
public class TicketComment {
    private int id;//评论主键
    private int userId;//评论用户id
    private int score;//评分
    private String content;//评论内容

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date postedTime;//评论时间
    private int spotId;//景点id

    private String petName;//评论者昵称


}
