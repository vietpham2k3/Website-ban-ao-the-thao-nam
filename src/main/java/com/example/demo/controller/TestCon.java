package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestCon {

    @GetMapping("/index")
    public String index(){
        return "/pages/tables";
    }

    @GetMapping("/index1")
    public String index1(){
        return "/pages/billing";
    }

    @GetMapping("/index2")
    public String index2(){
        return "/pages/hoa-don";
    }
}
