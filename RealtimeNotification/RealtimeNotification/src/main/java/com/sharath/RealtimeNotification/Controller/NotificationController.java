package com.sharath.RealtimeNotification.Controller;

import com.sharath.RealtimeNotification.Payload.Notification;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@RestController
@RequestMapping("/notifications")
//@CrossOrigin("http://localhost:5173")
public class NotificationController {

    private final Sinks.Many<Notification>  notificationsSink = Sinks.many().multicast().onBackpressureBuffer();

    // this API help us publish the notification
    @GetMapping ("/send")
     public String publishNotification(@RequestParam String message ){

        Notification notification = new Notification(message);
        notificationsSink.tryEmitNext(notification);
        return "Notification send" +message;
    }

  // endpoint to stream the notification
    @GetMapping (produces  = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Notification> streamNotification(){

      return notificationsSink.asFlux();
    }



}