package com.sharathtrade.StockDeatils.Websokcet;

import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.WebSocket;
import java.util.concurrent.CompletionStage;

@RestController
@RequestMapping("/api/upstox")
@CrossOrigin(origins = "*")
public class UpstoxProxyController {

    private static final String UPSTOX_WS_URL = "wss://api.upstox.com/v3/feed/market-data-feed";

    @GetMapping("/connect")
    public String connect(@RequestHeader("Authorization") String authHeader) {
        try {
            // ✅ Build HTTP Client
            HttpClient client = HttpClient.newHttpClient();

            // ✅ Build the WebSocket request (with Authorization header)
            client.newWebSocketBuilder()
                    .header("Authorization", authHeader)
                    .buildAsync(URI.create(UPSTOX_WS_URL), new UpstoxWebSocketListener());

            return "✅ WebSocket connection initiated with Upstox.";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Connection failed: " + e.getMessage();
        }
    }
}
