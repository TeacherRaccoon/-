package com.example.ctrip.Pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Data
public class TicketSore {
    private int id;//评论主键
    private int userId;//用户id
    private int sore;//评分
    private String content;//用户评论
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date cretionDate;//创建时间
    private int ticketId;//门票id

}
