import React, { useEffect, useRef } from "react";

// List of valid NSE symbols
const validSymbols = [
  "RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK",
  "HINDUNILVR", "SBIN", "KOTAKBANK", "ITC", "LT"
];

const TradingViewChart = ({ symbol="TCS" }) => {
  const containerRef = useRef(null);

  // Safely handle undefined or null symbol
  const upperSymbol = symbol ? symbol.toUpperCase() : "";

  useEffect(() => {
    containerRef.current.innerHTML = "";

    if (!upperSymbol || !validSymbols.includes(upperSymbol)) {
      containerRef.current.innerHTML = `<div style="color:red; text-align:center; font-weight:bold; font-size:18px; padding-top:250px;">
        Symbol ${upperSymbol || "N/A"} is not available on TradingView
      </div>`;
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        width: "100%",
        height: 600,
        symbol: `NSE:${upperSymbol}`,
        interval: "5",
        timezone: "Asia/Kolkata",
        theme: "light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_legend: false,
        save_image: false,
        container_id: "tradingview_chart",
        studies: ["Volume@tv-basicstudies", "MACD@tv-basicstudies", "RSI@tv-basicstudies"],
      });
    };

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current.innerHTML = "";
    };
  }, [upperSymbol]);

  return (
    <div className="mt-5 bg-white p-4 rounded-2xl shadow-lg">
      <h2 className="text-center text-xl font-bold mb-3 text-gray-800">
        {upperSymbol || "N/A"} Live Chart
      </h2>
      <div
        id="tradingview_chart"
        ref={containerRef}
        style={{ height: "600px", width: "100%" }}
      ></div>
    </div>
  );
};

export default TradingViewChart;
