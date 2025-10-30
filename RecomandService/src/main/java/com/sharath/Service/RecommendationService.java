package com.sharath.Service;

import com.sharath.Entity.Recommendation;
import com.sharath.Repo.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final NotificationService notificationService;

    public Recommendation createRecommendation(Recommendation recommendation) {

        Recommendation saved = recommendationRepository.save(recommendation);

        // Prepare message
        String msg = String.format(
                "Trader %d recommends %s %s at ₹%.2f. Stop loss: ₹%.2f",
                saved.getTraderId(),
                saved.getAction(),
                saved.getStockSymbol(),
                saved.getTargetPrice(),
                saved.getStopLoss()
        );

        // Get followers of the trader (dummy data for now)
        List<Long> followerIds = List.of(101L, 102L, 103L); // later fetch from DB

        // 🔥 Create notifications + push WebSocket messages
        notificationService.notifyFollowers(saved.getTraderId(), msg, followerIds);

        return saved;
    }
}
