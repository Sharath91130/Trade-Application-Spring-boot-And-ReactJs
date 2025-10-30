import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SseEvent({ sidebarOpen, resetNotifications }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/notifications");

    eventSource.onopen = () => console.log("Connected to SSE");

    eventSource.onmessage = (event) => {
      setMessages((prev) => [event.data, ...prev]);
      resetNotifications(); // notify parent to update count
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="d-flex flex-column gap-2">
      {messages.length === 0 ? (
        <p className="text-muted">No notifications yet.</p>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} className="card shadow-sm border-0">
            <div className="card-body">
              <p className="mb-0">{msg}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
