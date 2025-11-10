package com.modus.stock.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class MarketPriceService {

    private static final String UPSTOX_LTP_URL =
            "https://api.upstox.com/v3/market-quote/ltp?instrument_key=NSE_EQ|INE467B01029"; // Example: TCS ISIN

    private final RestTemplate restTemplate = new RestTemplate();

//    @Value("${upstox.api.access-token}")
    private String accessToken="eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI0SENYTlgiLCJqdGkiOiI2OTExNzI5NzAwMGE4YzY0YWM5OTA4ZTEiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNQbHVzUGxhbiI6ZmFsc2UsImlhdCI6MTc2Mjc1MTEyNywiaXNzIjoidWRhcGktZ2F0ZXdheS1zZXJ2aWNlIiwiZXhwIjoxNzYyODEyMDAwfQ.JmHXG-RyH1LBg_vp3YjaZlSQXzqSJ3MIFIZiZ3awEAY";


    @Value("${app.name}")
    private String demo;

    public double getCurrentPrice() {

        System.out.println(demo+"===================");
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

            if (response.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException("Unexpected response from Upstox: " + response.getStatusCode());
            }

            // Parse JSON to extract only last_price
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode dataNode = root.path("data");

            // The key inside "data" varies (e.g., NSE_EQ:INE467B01029)
            // So, get the first child dynamically:
            JsonNode firstInstrument = dataNode.elements().next();

            double lastPrice = firstInstrument.path("last_price").asDouble();

            return lastPrice;

        } catch (Exception e) {
            throw new RuntimeException("❌ Failed to fetch LTP: " + e.getMessage(), e);
        }
    }
}
