package com.practice.login.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api")
public class LoginController {
    @GetMapping("/user_inform/login")
    public String login() {
        log.info("통신 성공");
        return "success";
    }
}
