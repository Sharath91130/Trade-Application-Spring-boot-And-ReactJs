import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

export default function RecommendationForm({name}) {
  const location = useLocation();
  const stockNames = location.state?.name || "";

    console.log(stockNames+ "----");
    
  const [formData, setFormData] = useState({
    stockName: stockNames,
    action: "BUY",
    targetPrice: "",
    stopLoss: "",
    message: "",
  });

  console.log("i am inside ");
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recommendation Data:", formData);
    alert("✅ Recommendation Submitted Successfully!");
    // You can later connect this to your Spring Boot API
  };

  return (
    <div
      className="container mt-5 p-4 shadow-lg rounded"
      style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}
    >
      <h3 className="text-center mb-4 text-success fw-bold">
        📈 Create Stock Recommendation
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Stock Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Stock Name</label>
          <input
            type="text"
            className="form-control"
            name="stockName"
            placeholder="e.g. TCS, RELIANCE"
            value={formData.stockName}
          //  onChange={handleChange}
            readOnly
          />
        </div>

        {/* Action */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Action</label>
          <select
            className="form-select"
            name="action"
            value={formData.action}
            onChange={handleChange}
          >
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
            <option value="HOLD">Hold</option>
          </select>
        </div>

        {/* Target Price */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Target Price (₹)</label>
          <input
            type="number"
            className="form-control"
            name="targetPrice"
            placeholder="Enter target price"
            value={formData.targetPrice}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stop Loss */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Stop Loss (₹)</label>
          <input
            type="number"
            className="form-control"
            name="stopLoss"
            placeholder="Enter stop loss"
            value={formData.stopLoss}
            onChange={handleChange}
          />
        </div>

        {/* Message */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Message</label>
          <textarea
            className="form-control"
            name="message"
            rows="3"
            placeholder="Add your analysis or reason for recommendation"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-success px-5 py-2 fw-semibold">
            Submit Recommendation
          </button>
        </div>
      </form>
    </div>
  );
}
