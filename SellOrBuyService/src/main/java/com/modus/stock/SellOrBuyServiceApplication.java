package com.modus.stock;

import com.modus.stock.service.MarketPriceService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableScheduling
public class SellOrBuyServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SellOrBuyServiceApplication.class, args);
        MarketPriceService m=new MarketPriceService();
        System.out.println(m.getCurrentPrice());
	}



}
