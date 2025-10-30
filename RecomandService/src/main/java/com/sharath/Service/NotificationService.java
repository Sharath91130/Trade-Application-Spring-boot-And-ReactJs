package com.sharath.Service;

import com.sharath.Entity.Notification;
import com.sharath.Repo.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyFollowers(Long traderId, String message, List<Long> followerIds) {

        for (Long investorId : followerIds) {
            Notification notification = new Notification();
            notification.setTraderId(traderId);
            notification.setInvestorId(investorId);
            notification.setMessage(message);

            Notification saved = notificationRepository.save(notification);

            // 🔥 Send live notification to each investor
            messagingTemplate.convertAndSend("/topic/notifications/" + investorId, saved);
        }
    }
}
