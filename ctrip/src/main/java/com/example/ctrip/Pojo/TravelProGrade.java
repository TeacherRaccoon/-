package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;


@Component
@Data
public class TravelProGrade {
    private int id;//id
    private int tripProductId;//产品id
    private float productAvgGrade;//平均评分
    private float favorableRate;//好评率
    private int count;//评论总数
}
