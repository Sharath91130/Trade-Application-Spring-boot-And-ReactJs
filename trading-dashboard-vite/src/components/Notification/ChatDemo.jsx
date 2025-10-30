import React, { useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export default function ChatDemo() {
  useEffect(() => {
    console.log("Opening WebSocket connection...");

    // ✅ Connect to your Spring Boot WebSocket endpoint
    const socket = new SockJS("http://localhost:8080/recomand/ws");
    const stompClient = over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("✅ Connected to WebSocket");

        // ✅ Subscribe to a topic
        stompClient.subscribe("/topic/messages", (message) => {
          console.log("📨 Received message:", message.body);
        });

        // ✅ Send a test message to the backend
        stompClient.send("/app/sendMessage", {}, "Hello from frontend!");
      },
      (error) => {
        console.error("❌ WebSocket connection error:", error);
      }
    );

    // Cleanup when component unmounts
    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("🔌 Disconnected from WebSocket");
        });
      }
    };
  }, []);

  return <div>Connecting to WebSocket...</div>;
}
