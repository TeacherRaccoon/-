package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;


@Component
@Data
public class City {
    private int id;//id
    private String cityName;//城市名
    private int isHot;//是否热门
}
