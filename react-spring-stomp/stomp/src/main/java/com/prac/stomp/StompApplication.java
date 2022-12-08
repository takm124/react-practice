package com.prac.stomp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class StompApplication {

	public static void main(String[] args) {
		SpringApplication.run(StompApplication.class, args);
	}

}
