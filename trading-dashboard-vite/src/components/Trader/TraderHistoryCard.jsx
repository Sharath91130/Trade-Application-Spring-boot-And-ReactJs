import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import ChartPanel from "../ChartPanel";

export default function TraderHistoryCard() {
  const doughnutRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // 🎯 Doughnut Chart — Trader Score
    const ctx1 = doughnutRef.current.getContext("2d");
    const gradient1 = ctx1.createLinearGradient(0, 0, 0, 180);
    gradient1.addColorStop(0, "#00c6ff");
    gradient1.addColorStop(1, "#0072ff");

    const doughnutChart = new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: ["Score", "Remaining"],
        datasets: [
          {
            data: [85, 15],
            backgroundColor: [gradient1, "#e9ecef"],
            borderWidth: 0,
            cutout: "75%",
            hoverOffset: 8,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        },
        animation: {
          animateRotate: true,
          duration: 1800,
          easing: "easeOutElastic",
        },
      },
    });

    // 📊 Bar Chart — Monthly Performance
    const ctx2 = barRef.current.getContext("2d");
    const gradient2 = ctx2.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, "rgba(75,192,192,1)");
    gradient2.addColorStop(1, "rgba(153,102,255,0.8)");

    const barChart = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Profit %",
            data: [8, 12, 7, 15, 18, 10],
            backgroundColor: gradient2,
            borderRadius: 10,
            barThickness: 25,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#6c757d", stepSize: 5 },
            grid: { color: "rgba(0,0,0,0.05)" },
          },
          x: {
            ticks: { color: "#6c757d" },
            grid: { display: false },
          },
        },
        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        },
      },
    });

    return () => {
      doughnutChart.destroy();
      barChart.destroy();
    };
  }, []);

  return (
    <div
      className="card shadow-lg border-0 rounded-4 p-4"
      style={{
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #f1f3f6 50%, #e3e6eb 100%)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        border: "1px solid #dee2e6",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Trader"
            alt="Trader"
            width="65"
            height="65"
            className="rounded-circle shadow-sm border border-2 border-light"
          />
          <div>
            <h5 className="fw-bold text-dark mb-0">John Doe</h5>
            <small className="text-muted">Elite Trader • 4 Years</small>
          </div>
        </div>
        <div className="text-center">
          <h6 className="fw-bold text-primary mb-0">Trader Score</h6>
          <span
            className="badge text-white fs-6 p-2 rounded-pill shadow-sm"
            style={{
              background: "linear-gradient(90deg, #0072ff, #00c6ff)",
            }}
          >
            ⭐ 85 / 100
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="row align-items-center mb-4">
        <div className="col-md-4 text-center">
          <div style={{ width: "150px", margin: "auto" }}>
            <canvas ref={doughnutRef} />
          </div>
        </div>
        <div className="col-md-8" style={{ height: "180px" }}>
          <canvas ref={barRef} />
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="d-flex justify-content-around text-center p-3 rounded-3 mb-3"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(5px)",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <div>
          <h6 className="fw-bold text-success mb-1">+18.7%</h6>
          <small className="text-muted">Profit Growth</small>
        </div>
        <div>
          <h6 className="fw-bold text-warning mb-1">Low</h6>
          <small className="text-muted">Risk Level</small>
        </div>
        <div>
          <h6 className="fw-bold text-primary mb-1">47</h6>
          <small className="text-muted">Total Trades</small>
        </div>
      </div>

      {/* Followers & Reputation */}
      <div className="text-center mt-3">
        <div className="d-flex justify-content-center gap-4 mb-2">
          <div>
            <h6 className="fw-bold text-dark mb-1">1.2K</h6>
            <small className="text-muted">Followers</small>
          </div>
          <div>
            <h6 className="fw-bold text-dark mb-1">320</h6>
            <small className="text-muted">Following</small>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2 mb-3">
          <span className="badge bg-success-subtle text-success border border-success">
            🏅 Top Rated
          </span>
          <span className="badge bg-info-subtle text-info border border-info">
            💎 Consistent Performer
          </span>
          <span className="badge bg-warning-subtle text-warning border border-warning">
            ⚡ Quick Trader
          </span>
        </div>

        {/* 🧠 Investors Who Bought */}
        <div
          className="mt-3 py-2 px-3 rounded-3 mx-auto"
          style={{
            width: "fit-content",
            background: "linear-gradient(90deg, #00b09b, #96c93d)",
            color: "white",
            fontWeight: "600",
            fontSize: "0.95rem",
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
          }}
        >
          📈 <span style={{ fontSize: "1.1rem" }}>400</span> investors bought this trader’s recommendation
        </div>
      </div>
      <ChartPanel/>
    </div>
  );
}
