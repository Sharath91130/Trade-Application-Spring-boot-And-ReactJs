import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SseEvent({ sidebarOpen, resetNotifications }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/notifications");

    eventSource.onopen = () => console.log("✅ Connected to SSE");

    eventSource.onmessage = (event) => {
      // Backend sends plain text
      const data = event.data;
      setMessages((prev) => [
        { sender: "System Bot", message: data, time: new Date().toLocaleTimeString() },
        ...prev,
      ]);
      resetNotifications();
    };

    eventSource.onerror = (err) => {
      console.error("❌ SSE connection error:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="d-flex flex-column gap-3">
      {messages.length === 0 ? (
        <p className="text-muted text-center mt-4">No notifications yet.</p>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={idx}
            className="card border-0 shadow-sm rounded-4 p-3"
            style={{
              backgroundColor: "#f8f9fa",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
            }}
          >
            <div className="d-flex align-items-start">
              {/* 🧑 Sender Avatar */}
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${msg.sender}`}
                alt="avatar"
                className="rounded-circle me-3"
                width="50"
                height="50"
                style={{ objectFit: "cover" }}
              />

              {/* 📄 Notification Details */}
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold mb-1 text-dark">{msg.sender}</h6>
                  <small className="text-muted">{msg.time}</small>
                </div>
                <p className="mb-0 text-secondary" style={{ fontSize: "0.9rem" }}>
                  {msg.message}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
