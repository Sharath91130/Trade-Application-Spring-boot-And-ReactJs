package com.sharathtrade.StockDeatils.Websokcet;

import java.net.http.WebSocket;
import java.util.concurrent.CompletionStage;

public class UpstoxWebSocketListener implements WebSocket.Listener {

    @Override
    public void onOpen(WebSocket webSocket) {
        System.out.println("✅ Connected to Upstox WebSocket!");
        webSocket.request(1); // Request 1st message

        // Example: subscribe payload (you can replace with dynamic one)
        String subscription = """
            {
              "guid": "unique-guid",
              "method": "sub",
              "data": {
                "mode": "full",
                "instrumentKeys": ["NSE_EQ|INE002A01018"]
              }
            }
        """;
        webSocket.sendText(subscription, true);
    }

    @Override
    public CompletionStage<?> onText(WebSocket webSocket, CharSequence data, boolean last) {
        System.out.println("📩 Message received: " + data);
        webSocket.request(1); // Request next message
        return null;
    }

    @Override
    public CompletionStage<?> onClose(WebSocket webSocket, int statusCode, String reason) {
        System.out.println("❌ Connection closed: " + reason);
        return null;
    }

    @Override
    public void onError(WebSocket webSocket, Throwable error) {
        System.err.println("⚠️ WebSocket error: " + error.getMessage());
    }
}
