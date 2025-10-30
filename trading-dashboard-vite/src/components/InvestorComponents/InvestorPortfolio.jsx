import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SeeEvents from "../Notification/SeeEvents"; // import the SSE component

export default function InvestorPortfolio() {
  const investorId = 123;
  const [portfolio, setPortfolio] = useState([
    { id: 1, stock: "TCS", quantity: 20, avgPrice: 3600, currentPrice: 4100 },
    { id: 2, stock: "RELIANCE", quantity: 15, avgPrice: 2300, currentPrice: 2450 },
    { id: 3, stock: "INFY", quantity: 30, avgPrice: 1450, currentPrice: 1550 },
  ]);

  const [notifications, setNotifications] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalInvestment = portfolio.reduce((acc, s) => acc + s.quantity * s.avgPrice, 0);
  const currentValue = portfolio.reduce((acc, s) => acc + s.quantity * s.currentPrice, 0);
  const profitLoss = currentValue - totalInvestment;
  const profitPercent = ((profitLoss / totalInvestment) * 100).toFixed(2);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) setNotifications(0); // reset badge on open
  };

  const handleNewMessage = () => setNotifications((prev) => prev + 1);

  return (
    <div className="container py-5 position-relative">
      {/* 🔔 Notification Button */}
      <button
        className="btn btn-light position-fixed top-0 end-0 m-3 shadow-sm rounded-circle"
        style={{ width: "48px", height: "48px", zIndex: 1050 }}
        onClick={toggleSidebar}
      >
        <i className="bi bi-bell fs-4 text-success"></i>
        {notifications > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.7rem" }}
          >
            {notifications}
          </span>
        )}
      </button>

      {/* Notification Sidebar */}
      <div
        className="position-fixed top-0 end-0 bg-white shadow-lg"
        style={{
          width: "350px",
          height: "100vh",
          transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1040,
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h5 className="mb-0">🔔 Notifications</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setSidebarOpen(false)}>
            Close
          </button>
        </div>

        {/* Render SSE messages as cards */}
        <SeeEvents sidebarOpen={sidebarOpen} resetNotifications={handleNewMessage} />
      </div>

      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">📊 Investor Portfolio</h2>
        <p className="text-muted">
          Monitor your investments and track performance in real time
        </p>
      </div>

      {/* Summary Section */}
      <div className="row text-center mb-5">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Investment</h6>
              <h4 className="fw-bold text-primary">
                ₹{totalInvestment.toLocaleString()}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Current Value</h6>
              <h4 className="fw-bold text-success">
                ₹{currentValue.toLocaleString()}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Profit / Loss</h6>
              <h4 className={`fw-bold ${profitLoss >= 0 ? "text-success" : "text-danger"}`}>
                ₹{profitLoss.toLocaleString()} ({profitPercent}%)
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Cards */}
      <div className="row">
        {portfolio.map((stock) => {
          const gain = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
          return (
            <div key={stock.id} className="col-md-4 mb-4">
              <div className="card border-0 shadow-lg rounded-4 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold text-primary">{stock.stock}</h5>
                    <span className={`badge ${gain >= 0 ? "bg-success" : "bg-danger"}`}>
                      {gain.toFixed(2)}%
                    </span>
                  </div>

                  <hr />

                  <p className="text-muted mb-1">
                    Quantity: <strong>{stock.quantity}</strong>
                  </p>
                  <p className="text-muted mb-1">
                    Avg. Price: ₹<strong>{stock.avgPrice}</strong>
                  </p>
                  <p className="text-muted mb-1">
                    Current Price: ₹<strong>{stock.currentPrice}</strong>
                  </p>

                  <div className="progress my-3" style={{ height: "8px" }}>
                    <div
                      className={`progress-bar ${gain >= 0 ? "bg-success" : "bg-danger"}`}
                      role="progressbar"
                      style={{ width: `${Math.min(100, Math.abs(gain))}%` }}
                      aria-valuenow={Math.abs(gain)}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <button className="btn btn-outline-primary w-100 mt-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
