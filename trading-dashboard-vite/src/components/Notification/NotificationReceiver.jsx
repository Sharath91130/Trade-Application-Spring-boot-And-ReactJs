import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const NotificationReceiver = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // Spring Boot WS URL
    const stomp = over(socket);

    stomp.connect({}, () => {
      console.log("✅ Connected to WebSocket (Receiver)");

      stomp.subscribe("/topic/notifications", (msg) => {
        console.log("📨 Notification received:", msg.body);
        setMessages((prev) => [...prev, msg.body]);
      });
    }, (err) => console.error("❌ WebSocket connection error:", err));

    return () => stomp.disconnect(() => console.log("❌ Disconnected"));
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationReceiver;
