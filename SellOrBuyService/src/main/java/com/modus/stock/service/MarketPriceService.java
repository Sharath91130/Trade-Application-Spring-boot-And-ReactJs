package com.modus.stock.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MarketPriceService {

    private String accessToken="eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI0SENYTlgiLCJqdGkiOiI2OTBjMmNiYzg3NTViZjFhZTQyZDgwYTYiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNQbHVzUGxhbiI6ZmFsc2UsImlhdCI6MTc2MjQwNTU2NCwiaXNzIjoidWRhcGktZ2F0ZXdheS1zZXJ2aWNlIiwiZXhwIjoxNzYyNDY2NDAwfQ.njFPiz6aZGdxZ1kompcK7WRj6_VIbLOJuOrqvyFJtA0";

    private static final String UPSTOX_LTP_URL =
            "https://api.upstox.com/v3/market-quote/ltp?instrument_key=NSE_EQ|INE467B01029";

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Fetches the latest LTP (Last Traded Price) from Upstox.
     */
    public String getCurrentPrice() {
        try {
            // Prepare headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");

            // Create request entity
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Call Upstox API
            ResponseEntity<String> response = restTemplate.exchange(
                    UPSTOX_LTP_URL,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                throw new RuntimeException("Unexpected response from Upstox: " + response.getStatusCode());
            }

        } catch (Exception e) {
            throw new RuntimeException("❌ Failed to fetch LTP: " + e.getMessage(), e);
        }
    }
}
