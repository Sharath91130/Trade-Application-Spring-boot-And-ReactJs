package com.modus.stock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableScheduling
public class SellOrBuyServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SellOrBuyServiceApplication.class, args);
	}

}
