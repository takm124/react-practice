package com.practice.login.controller;

import com.practice.login.vo.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api")
public class LoginController {

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        log.info(user.getUserId() + "({}) 접속 완료", user.getUserPw());
        return "success";
    }
}
