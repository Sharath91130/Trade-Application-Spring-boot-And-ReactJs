package com.sharathtrade.StockDeatils.Service;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BasketOrderService {

    private static final String API_KEY = "YOUR_API_KEY";
    private static final String ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"; // Store securely later

    public void placeBasket() throws Exception {
        System.out.println("checlll");

        String authHeader = "token " + API_KEY + ":" + ACCESS_TOKEN;

        List<Map<String, String>> orders = List.of(
                Map.of(
                        "exchange", "NSE",
                        "tradingsymbol", "INFY",
                        "transaction_type", "BUY",
                        "quantity", "1",
                        "product", "CNC",
                        "order_type", "MARKET"
                ),
                Map.of(
                        "exchange", "NSE",
                        "tradingsymbol", "RELIANCE",
                        "transaction_type", "BUY",
                        "quantity", "1",
                        "product", "CNC",
                        "order_type", "MARKET"
                )
        );

        for (Map<String, String> order : orders) {

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.kite.trade/orders/regular"))
                    .header("Authorization", authHeader)
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(getFormData(order)))
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Order Response: " + response.body());
        }

        System.out.println("✅ Basket Executed Successfully");
    }

    private String getFormData(Map<String, String> data) {
        return data.entrySet()
                .stream()
                .map(e -> e.getKey() + "=" + e.getValue())
                .collect(Collectors.joining("&"));
    }
}
