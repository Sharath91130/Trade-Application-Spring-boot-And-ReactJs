package com.sharath.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {

    @MessageMapping("/sendMessage") // frontend sends to /app/sendMessage
    @SendTo("/topic/messages") // subscribers listen to /topic/messages
    public String sendMessage(String message) {
        System.out.println("📩 Message received: " + message);
        return "Server received: " + message;
    }
}
