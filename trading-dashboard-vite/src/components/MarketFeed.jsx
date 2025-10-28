import React, { useEffect, useState, useRef } from "react";

function MarketFeed() {
  const [isConnected, setIsConnected] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);

  // Replace with your Upstox WebSocket URI
  const WS_URI = "wss://api.upstox.com/v3/feed/market-data-feed";
const token= import.meta.env.VITE_UPSTOX_TOKEN;
  // Subscribe to symbols
  const instrumentKeys = ["NSE_EQ|INE002A01018"]; // RELIANCE example

  useEffect(() => {
    // Create WebSocket
    const connectWebSocket = () => {
      // Use a custom WebSocket that allows headers
      wsRef.current = new WebSocket(WS_URI, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      wsRef.current.onopen = () => {
        setIsConnected(true);
        console.log("✅ WebSocket connected");

        // Subscribe to instruments
        const subscription = {
          guid: "unique-guid",
          method: "sub",
          data: {
            mode: "full",
            instrumentKeys: instrumentKeys,
          },
        };

        wsRef.current.send(JSON.stringify(subscription));
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setFeedData((prev) => [...prev, message]);
        } catch (err) {
          console.error("Error parsing message:", err);
        }
      };

      wsRef.current.onclose = () => {
        console.warn("❌ WebSocket disconnected, retrying in 5s...");
        setIsConnected(false);
        setTimeout(connectWebSocket, 5000); // reconnect after 5 sec
      };

      wsRef.current.onerror = (err) => {
        console.error("⚠️ WebSocket error:", err);
        setError("Connection error");
        setIsConnected(false);
        wsRef.current.close();
      };
    };

    connectWebSocket();

    // Cleanup
    return () => wsRef.current && wsRef.current.close();
  }, [token]);

  return (
    <div className="p-4">
      <h2>📈 Upstox Market Data Feed</h2>
      <p>
        Status:{" "}
        <strong style={{ color: isConnected ? "green" : "red" }}>
          {isConnected ? "Connected" : "Not Connected"}
        </strong>
      </p>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginTop: "1rem",
          height: "400px",
          overflowY: "auto",
          background: "#f8f8f8",
        }}
      >
        {feedData.length === 0 ? (
          <p>No data yet...</p>
        ) : (
          feedData.map((item, i) => (
            <pre key={i} style={{ fontSize: "12px" }}>
              {JSON.stringify(item, null, 2)}
            </pre>
          ))
        )}
      </div>
    </div>
  );
}

export default MarketFeed;
