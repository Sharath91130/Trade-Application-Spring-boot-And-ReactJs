import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UpstoxFeed from "./UpstockFeed";
import RecommendationForm from "./RecommendationForm";

export default function ChartPanel() {
  const chartRef = useRef();
  const [timeFrame, setTimeFrame] = useState("1D");
  const [hoverData, setHoverData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [livePrice, setLivePrice] = useState(null);
  const [candleInfo, setCandleInfo] = useState(null)
  const [showRecommendation, setShowRecommendation] = useState(false);

 
  const UPSTOX_TOKEN = import.meta.env.VITE_UPSTOX_TOKEN;

  const { state } = useLocation();
  const navigate = useNavigate();
const previousOpen= state?.prev
  const instrumentKey =state.instrumentKey;
  const symbol = state?.symbol;
   const handleRecommend = () => {
    navigate("/recommend", { state: { name: symbol } });
  };
    const fetchCandleInfo = async () => {
    try {
      const url = `https://api.upstox.com/v3/historical-candle/intraday/${instrumentKey}/days/1`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${UPSTOX_TOKEN}`,
        },
      });
      const json = await res.json();

      if (json.status === "success") {
        const candle = json.data.candles[0];
        const [time, open, high, low, close] = candle;
        setCandleInfo({ open, high, low, close });
      }
    } catch (error) {
      console.error("Error fetching candle info:", error);
    }
  };


  console.log(symbol + "sharath-----");
  
   const getPercentageChange = (prev, current) => {
    console.log(prev +"prevois close" +"  " +current);

   
    if (!prev) return "0%";
    const change = ((current - 3007.20) / 3007.20) * 100;
    const rounded = change.toFixed(2);
    return change >= 0 ? `+${rounded}%` : `${rounded}%`;
  };

  


  // ✅ Fetch Live Price (runs every 5 seconds)
  useEffect(() => {
    if (!instrumentKey || !UPSTOX_TOKEN) return;

    const fetchLivePrice = async () => {
      try {
        const res = await fetch(
          `https://api.upstox.com/v3/market-quote/ltp?instrument_key=${instrumentKey}`,
          {
            headers: {
              Authorization: `Bearer ${UPSTOX_TOKEN}`,
            },
          }
        );

        const json = await res.json();
        if (json.status === "success") {
          const data = json.data;
          const key = Object.keys(data)[0];
          const price = data[key].last_price;
          setLivePrice(price);
        }
      } catch (error) {
        console.error("Error fetching live price:", error);
      }
    };

    // Fetch immediately + every 5 seconds
    fetchLivePrice();
    fetchCandleInfo();
    const interval = setInterval(fetchLivePrice, 10000);

    return () => clearInterval(interval);
  }, [instrumentKey, UPSTOX_TOKEN]);

  // ✅ Fetch Historical Candle Data
  const fetchCandleData = async (interval) => {
    try {
      setLoading(true);
      let url = "";
      const baseUrl = "https://api.upstox.com/v3/historical-candle";
      const today = new Date();
      const endDate = today.toISOString().split("T")[0];
      const pastDate = new Date(today);

      if (interval === "1D") url = `${baseUrl}/intraday/${instrumentKey}/minutes/1`;
      else if (interval === "5D") {
        pastDate.setDate(today.getDate() - 5);
        const startDate = pastDate.toISOString().split("T")[0];
        url = `${baseUrl}/${instrumentKey}/minutes/15/${endDate}/${startDate}`;
      } else if (interval === "1W") {
        pastDate.setDate(today.getDate() - 7);
        const startDate = pastDate.toISOString().split("T")[0];
        url = `${baseUrl}/${instrumentKey}/minutes/30/${endDate}/${startDate}`;
      } else if (interval === "1M") {
        pastDate.setMonth(today.getMonth() - 1);
        const startDate = pastDate.toISOString().split("T")[0];
        url = `${baseUrl}/${instrumentKey}/hours/1/${endDate}/${startDate}`;
      } else if (interval === "6M") {
        pastDate.setMonth(today.getMonth() - 6);
        const startDate = pastDate.toISOString().split("T")[0];
        url = `${baseUrl}/${instrumentKey}/days/1/${endDate}/${startDate}`;
      } else if (interval === "1Y") {
        pastDate.setFullYear(today.getFullYear() - 1);
        const startDate = pastDate.toISOString().split("T")[0];
        url = `${baseUrl}/${instrumentKey}/weeks/1/${endDate}/${startDate}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `${UPSTOX_TOKEN}` },
      });

      if (response.data.status === "success") {
        const candles = response.data.data.candles.map((c) => ({
          time: new Date(c[0]).getTime() / 1000,
          open: c[1],
          high: c[2],
          low: c[3],
          close: c[4],
        }));
        return candles.sort((a, b) => a.time - b.time);
      }
      return [];
    } catch (error) {
      console.error("Error fetching candles:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initialize Chart
  useEffect(() => {
    if (!instrumentKey) return;

    let chart, candleSeries;

    const initChart = async () => {
      chart = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 400,
        layout: { backgroundColor: "#0f1b2b", textColor: "#ffffff" },
        grid: { vertLines: { color: "#1b2a40" }, horzLines: { color: "#1b2a40" } },
        crosshair: { mode: 1 },
        rightPriceScale: { borderVisible: false },
        timeScale: { borderVisible: false },
      });

      candleSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      const data = await fetchCandleData(timeFrame);
      candleSeries.setData(data);

      chart.subscribeCrosshairMove((param) => {
        if (!param || !param.time || param.seriesData.size === 0) {
          setHoverData(null);
          return;
        }
        const priceData = param.seriesData.get(candleSeries);
        if (priceData) {
          const date = new Date(param.time * 1000);
          const formattedTime = date.toLocaleString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "short",
          });

          setHoverData({
            time: formattedTime,
            open: priceData.open.toFixed(2),
            high: priceData.high.toFixed(2),
            low: priceData.low.toFixed(2),
            close: priceData.close.toFixed(2),
          });
        }
      });
    };

    initChart();

    const handleResize = () =>
      chart.applyOptions({ width: chartRef.current.clientWidth });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart && chart.remove();
    };
  }, [instrumentKey, timeFrame]);

  return (
    <div className="container py-4">
      {/* Back Button */}
      <div className="mb-3">
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline-light rounded-pill"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Stock Card */}
      <div
        className="card bg-dark text-white shadow-lg p-3 mb-4"
        style={{ borderRadius: "1rem" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="fw-bold mb-0">{symbol}</h4>
          <span
            className={`badge rounded-pill ${
              livePrice > 0 ? "bg-success" : "bg-danger"
            } fs-6`}
          >
            {livePrice ? `₹${livePrice}` : "Loading..."}
          </span>

          <div>
     <button
        className="btn btn-success"
        onClick={() => handleRecommend()}
      >
      Create Recomdation
    </button>
   
    </div>
         {candleInfo ? (
  <div
    className="mt-3 d-flex justify-content-around text-center flex-wrap gap-4 p-3 bg-light rounded shadow-sm"
    style={{ gap: "40px" }}

  >
    
    <div>
      <span className="text-secondary small d-block">Open</span>
      <h6 className="text-info fw-bold mb-0">{candleInfo.open}</h6>
    </div>

    <div>
      <span className="text-secondary small d-block">High</span>
      <h6 className="text-success fw-bold mb-0">{candleInfo.high}</h6>
    </div>

    <div>
      <span className="text-secondary small d-block">Low</span>
      <h6 className="text-danger fw-bold mb-0">{candleInfo.low}</h6>
    </div>

    <div>
      <span className="text-secondary small d-block">Close</span>
      <h6 className="text-warning fw-bold mb-0">{candleInfo.close}</h6>
    </div>
    
  </div>
) : (
  <p className="text-muted mt-2 small text-center">Loading market data...</p>
)}

{candleInfo && (
  <div className="text-center mt-3">
    {(() => {
      const percentage = getPercentageChange(candleInfo.close, livePrice);
      const isUp = !percentage.startsWith("-"); // Positive means going up

      return (
        <>
          <p
            className={`fw-bold fs-5 mb-0 ${
              isUp ? "text-success" : "text-danger"
            }`}
          >
            {isUp ? "📈 " : "📉 "}
            {percentage}
          </p>

          <small className="text-secondary">
            {isUp ? "Stock Going Up" : "Stock Going Down"}
          </small>
        </>
      );
    })()}
  </div>
)}

 
        </div>
        <div>
          
        </div>
        <p className="text-white-50 mb-2" style={{ fontSize: "0.85rem" }}>
          {state?.name || "Company Name N/A"}
        </p>
    
        <div className="d-flex justify-content-between">
          <button className="btn btn-success btn-sm fw-bold rounded-pill px-3">
            Buy
          </button>
          <button className="btn btn-danger btn-sm fw-bold rounded-pill px-3">
            Sell
          </button>
        </div>
      </div>

      {/* Time Frame Selector */}
      <div className="mb-3 d-flex gap-2 align-items-center">
        <span className="text-white">Time Frame:</span>
        <select
          className="form-select w-auto"
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
        >
          <option value="1D">1 Day</option>
          <option value="5D">5 Days</option>
          <option value="1W">1 Week</option>
          <option value="1M">1 Month</option>
          <option value="6M">6 Months</option>
          <option value="1Y">1 Year</option>
        </select>
      </div>

      {/* Chart */}
      {loading ? (
        <div className="text-center text-light mt-5">
          ⏳ Loading {symbol} chart...
        </div>
      ) : (
        <div
          ref={chartRef}
          className="w-100"
          style={{
            height: "400px",
            background: "linear-gradient(145deg, #0d1522, #18283f)",
            borderRadius: "1rem",
            boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        ></div>
      )}

      {/* Hover Info */}
      {hoverData && (
        <div
          className="mt-3 p-2 rounded shadow-sm text-center bg-light text-dark"
          style={{ fontFamily: "monospace" }}
        >
          <span className="fw-bold text-primary">🕒 {hoverData.time}</span>
          <div className="mt-1">
            <span className="me-2 text-success">Open: {hoverData.open}</span>
            <span className="me-2 text-danger">Close: {hoverData.close}</span>
            <span className="me-2">High: {hoverData.high}</span>
            <span>Low: {hoverData.low}</span>
          </div>
        </div>
      )}
     <UpstoxFeed/>
      
    </div>
  );
}
