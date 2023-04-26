package com.example.ctrip;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UrlTest {
    public class test {

        @RequestMapping("/test")
        public String get() {
            return "hello";
        }

    }
}
