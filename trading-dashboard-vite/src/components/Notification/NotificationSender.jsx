import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const NotificationSender = () => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // Spring Boot WS URL
    const stomp = over(socket);

    stomp.connect({}, () => {
      console.log("✅ Connected to WebSocket");
      setStompClient(stomp);
    }, (err) => console.error("❌ WebSocket connection error:", err));
  }, []);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      stompClient.send("/app/sendMessage", {}, message);
      console.log("Sent message:", message);
      setMessage("");
    } else {
      console.error("❌ WebSocket not connected");
    }
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default NotificationSender;
