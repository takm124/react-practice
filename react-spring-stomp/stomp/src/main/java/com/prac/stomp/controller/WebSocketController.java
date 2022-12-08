package com.prac.stomp.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class WebSocketController {

    @MessageMapping("/chat")
    @SendTo("/sub/msg") // /sub/msg를 구독하고 있는 client들에게 메시지 전송
    public String sendChat(String message) {
        log.info("get message : {}", message);
        return "success";
    }

    @MessageMapping("/video")
    @SendTo("/sub/video")
    public String sendVideo(String message) {
        log.info("get message : {}", message);
        return message;
    }
}
