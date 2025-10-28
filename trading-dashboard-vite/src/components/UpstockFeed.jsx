import React, { useEffect, useState } from "react";
import protobuf from "protobufjs";

export default function UpstoxFeed() {
  const [status, setStatus] = useState("Disconnected");
  const [marketInfo, setMarketInfo] = useState({});
  const [liveFeed, setLiveFeed] = useState([]);
  const UPSTOX_TOKEN = import.meta.env.VITE_UPSTOX_TOKEN;

  useEffect(() => {
    let ws;
    let FeedResponse;

    // Load proto file
    protobuf
      .load("/market_data_feed_v3.proto")
      .then((root) => {
        FeedResponse = root.lookupType(
          "com.upstox.marketdatafeederv3udapi.rpc.proto.FeedResponse"
        );
        startWebSocket();
      })
      .catch((err) => console.error("Proto load error:", err));

    const startWebSocket = async () => {
      try {
        setStatus("Authorizing...");

        const res = await fetch(
          "https://api.upstox.com/v3/feed/market-data-feed/authorize",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${UPSTOX_TOKEN}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        const wsUrl = data.data?.authorized_redirect_uri;
        if (!wsUrl) throw new Error("Authorization failed: missing redirect URL");

        setStatus("Connecting to WebSocket...");
        ws = new WebSocket(wsUrl);
        ws.binaryType = "arraybuffer";

        ws.onopen = () => {
          setStatus("Connected ✅");

          // Subscribe to live feed (LTP updates)
          const request = {
            guid: '13syxu852ztodyqncwt0',
            method: "sub",         // subscribe
            data: {
              mode: "option_greeks",       // live tick updates
              instrumentKeys: ["NSE_EQ|INE002A01018"], // Replace with desired instrument
            },
          };

          ws.send(new TextEncoder().encode(JSON.stringify(request)));
        };

        ws.onmessage = (event) => {
          try {
            let buffer;
            if (event.data instanceof Blob) {
              const reader = new FileReader();
              reader.onload = () => {
                buffer = new Uint8Array(reader.result);
                decodeFeed(buffer);
              };
              reader.readAsArrayBuffer(event.data);
            } else if (event.data instanceof ArrayBuffer) {
              buffer = new Uint8Array(event.data);
              decodeFeed(buffer);
            }
          } catch (err) {
            console.error("WebSocket message error:", err);
          }
        };

        ws.onerror = (err) => {
          console.error("WebSocket error:", err);
          setStatus("Error ❌");
        };

        ws.onclose = () => setStatus("Disconnected ❌");
      } catch (err) {
        console.error("WebSocket start error:", err);
        setStatus("Authorization failed ❌");
      }
    };

    const decodeFeed = (buffer) => {
      try {
        const message = FeedResponse.decode(buffer);
        const obj = FeedResponse.toObject(message, {
          longs: String,
          enums: String,
          defaults: true,
        });
           console.log(obj);
           
        // Market info updates
        if (obj.marketInfo && obj.marketInfo.segmentStatus) {
          setMarketInfo(obj.marketInfo.segmentStatus);
        }

        // Live feed updates (LTP / tick data)
        if (obj.feeds) {
          const feedsArray = Object.entries(obj.feeds).map(([key, val]) => {
            const ltpc = val.ltpc || val.firstLevelWithGreeks?.ltpc || {};
            const depth = val.firstLevelWithGreeks?.firstDepth || {};
            const greeks = val.firstLevelWithGreeks?.optionGreeks || {};

            return {
              key,
              ltp: ltpc.ltp,
              bidP: depth.bidP || 0,
              bidQ: depth.bidQ || 0,
              askP: depth.askP || 0,
              askQ: depth.askQ || 0,
            
            };
          });

          setLiveFeed((prev) => [...feedsArray, ...prev].slice(0, 20));
        }
          console.log("----");
          
        console.log(liveFeed);
        
      } catch (err) {
        console.error("Protobuf decode error:", err);
      }
    };

    return () => ws && ws.close();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>📈 Upstox Market Feed</h2>
      <p><strong>Status:</strong> {status}</p>

      {/* Market Info */}
      <h3>Market Info</h3>
      {Object.keys(marketInfo).length > 0 ? (
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr><th>Segment</th><th>Status</th></tr>
          </thead>
          <tbody>
            {Object.entries(marketInfo).map(([segment, status]) => (
              <tr key={segment}><td>{segment}</td><td>{status}</td></tr>
            ))}
          </tbody>
        </table>
      ) : <p>Waiting for market info...</p>}

      {/* Live Feed */}
      <h3>Live Feed (latest 20)</h3>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Instrument</th>
            <th>LTP</th>
            <th>BidPrice</th>
            <th>BidQuantity</th>
            <th>AspPrice</th>
            <th>AskQuantity</th>
           
          </tr>
        </thead>
        <tbody>
          {liveFeed.map((feed, i) => (
            <tr key={i}>
              <td>{feed.key}</td>
              <td>{feed.ltp}</td>
              <td>{feed.bidP}</td>
              <td>{feed.bidQ}</td>
              <td>{feed.askP}</td>
              <td>{feed.askQ}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
