package com.example.ctrip.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;


@RestController
public class PayController {
    @RequestMapping("/payResult")
    public Map paySuccess( List<Integer> params){
        System.out.println(params);
        System.out.println("支付成功！");
        return null;
    }
}
