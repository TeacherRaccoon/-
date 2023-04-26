package com.example.ctrip.Pojo;

import lombok.Data;
import org.springframework.stereotype.Component;


@Component
@Data
public class TravelTheme {
    private int id;
    private String travelTheme;
    private String themeName;

}
