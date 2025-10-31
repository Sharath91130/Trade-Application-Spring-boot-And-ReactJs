package com.sharath.RealtimeNotification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;

@SpringBootApplication
public class RealtimeNotificationApplication {

    ArrayList<Integer> i=new ArrayList<>();


	public static void main(String[] args) {
        ArrayList<Integer> i=new ArrayList<>(10);
        i.add(10);
        System.out.println(i.size());
        i.add(20);
        System.out.println(i.size());
        i.add(30);
        System.out.println(i.size());
        i.add(40);
        System.out.println(i.size());
        //i.add(8,40);
		SpringApplication.run(RealtimeNotificationApplication.class, args);
	}

}
