import React, { useEffect } from "react";
import protobuf from "protobufjs";

export default function UpstoxWebSocket() {
  useEffect(() => {
    const connect = async () => {
      try {
        console.log("🌐 Connecting to backend proxy...");
        const response = await fetch("http://localhost:8080/api/upstox/connect");
        const text = await response.text();
        console.log("✅ Backend response:", text);
      } catch (error) {
        console.error("⚠️ Connection error:", error);
      }
    };

    connect();
  }, []);

  return <div>🔌 Connecting to Upstox WebSocket via Spring Boot...</div>;
}
