import { useEffect, useState, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useNavigate } from "react-router-dom";

export default function StockDashboard() {
  const [stocks, setStocks] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [prevClosePrices, setPrevClosePrices] = useState({}); // store previous prices
  const chartRef = useRef();
  const navigate = useNavigate();

  const UPSTOX_TOKEN = import.meta.env.VITE_UPSTOX_TOKEN;


  const   openprice=async()=>{
    const response=await fetch('')
  }

  

  const handleStockClick = (stock) => {
    navigate(`/chart`, {
      state: {
        instrumentKey: stock.instrumentKey,
        symbol: stock.tradingSymbol,
        name: stock.companyName,
        livePrice: livePrices[stock.instrumentKey] || 0,
        prev:prevClosePrices[stock.instrumentKey] 
      },
    });
  };


  // Load stock list from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/stocks")
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);

        // Initialize previous close prices (replace with actual prev close from API if available)
        const prevPrices = {};
        data.forEach(async(s) => {

         
                 const response=await fetch(`https://api.upstox.com/v3/historical-candle/intraday/${s.instrumentKey}/days/1`,{
                  headers: { Authorization: `Bearer ${UPSTOX_TOKEN}` },
                 })


                 const json = await response.json();
            if (json.status === "success" && json.data.candles.length) {
              const prevOpen = json.data.candles[0][1]; 
              console.log(prevOpen);
              // 2nd element = open price
              prevPrices[s.instrumentKey] = prevOpen || 200// fallback

            }

  
        });
        setPrevClosePrices(prevPrices);
      })
      .catch((err) => console.error("Error fetching stocks:", err));
  }, []);

  // Calculate percentage change
  const getPercentageChange = (prev, current) => {
    if (!prev) return "0%";
    const change = ((current - prev) / prev) * 100;
    const rounded = change.toFixed(2);
    return change >= 0 ? `+${rounded}%` : `${rounded}%`;
  };

  // Fetch live prices per second
  useEffect(() => {
    if (!stocks.length) return;

    const fetchPrices = async () => {
      try {
        const allKeys = stocks.map((s) => s.instrumentKey).join(",");
        const response = await fetch(
          `https://api.upstox.com/v2/market-quote/ltp?instrument_key=${allKeys}`,
          {
            headers: { Authorization: `Bearer ${UPSTOX_TOKEN}` },
          }
        );
        const json = await response.json();

        if (json.status === "success") {
          const prices = {};
          Object.keys(json.data).forEach((key) => {
            const value = json.data[key];
            prices[value.instrument_token] = value.last_price;
          });
          setLivePrices(prices);
        }
      } catch (error) {
        console.error("Error fetching live prices:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 1000); // update every second
    return () => clearInterval(interval);
  }, [stocks]);

  return (
    <div
      className="min-vh-100 text-light"
      style={{
        background:
          "linear-gradient(135deg, #0d1b2a, #1b263b, #415a77, #778da9)",
        padding: "30px",
      }}
    >
      <h2 className="text-center mb-4 fw-bold">💹 Real-Time Stock Dashboard</h2>

      <div className="row g-4">
        {stocks.map((stock) => {
          const domain = stock.website?.replace(/^https?:\/\//, "");
          const logoUrl = `https://img.logo.dev/${domain}?token=pk_Nd54HdyYTXOmJE73n_Xj2A`;

          const price = livePrices[stock.instrumentKey];
          const prevPrice = prevClosePrices[stock.instrumentKey];
          const change = getPercentageChange(prevPrice, price);

          return (
            <div className="col-md-4" key={stock.id}>
              <div
                className="card p-4 shadow-lg border-0 text-center"
                onClick={() => handleStockClick(stock)}
                style={{
                  cursor: "pointer",
                  borderRadius: "18px",
                  background: "#cccc",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Company Logo */}
                <img
                  src={logoUrl}
                  alt={`${stock.tradingSymbol} logo`}
                  className="mx-auto mb-2"
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    objectFit: "contain",
                    padding: "6px",
                    boxShadow: "0 0 10px rgba(177, 39, 170, 0.3)",
                  }}
                  onError={(e) => (e.target.style.display = "none")}
                />

                {/* Company Name */}
                <h5 className="fw-bold mt-2">{stock.tradingSymbol}</h5>

                {/* Live Price with percentage */}
                {price ? (
                  <h4
                    className={`fw-bold mt-2 ${
                      change.startsWith("+") ? "text-success" : "text-danger"
                    }`}
                    style={{
                      textShadow: change.startsWith("+")
                        ? "0 0 10px #26a69a"
                        : "0 0 10px #ef5350",
                    }}
                  >
                    ₹{price.toLocaleString("en-IN")} {change}
                  </h4>
                ) : (
                  <p className="text-muted small">Loading price...</p>
                )}

                <p className="text-muted small mb-1">{stock.instrumentKey}</p>
                <a
                  href={`https://${domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-info small"
                >
                  {stock.website}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
