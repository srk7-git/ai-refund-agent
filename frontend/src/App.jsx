import { useState } from "react";

function App() {
  const [result, setResult] = useState(null);
  const [messages, setMessages] = useState([]);
  const [orderId, setOrderId] = useState("");

  const checkRefund = async () => {
    const match = orderId.match(/O\d+/i);

    if (!match) {
      setResult({
        status: "ERROR",
        reason: "No valid order ID found",
        logs: ["Could not identify an order ID"]
      });
      return;
    }

    const extractedOrderId = match[0].toUpperCase();

    const response = await fetch(
      `http://127.0.0.1:8000/refund/${extractedOrderId}`
    );

    const data = await response.json();

    setResult(data);

    setMessages((prev) => [
  ...prev,
  {
    customer: orderId,
    agent: data.reason,
    status: data.status
  }
]);
  };

  return (
    <div
      style={{
  display: "flex",
  Height: "100vh",
  padding: "20px",
  gap: "20px",
  fontFamily: "Arial",
  backgroundColor: "#f5f5f5",
  color: "#000"
}}
    >
      <div
        style={{
          flex: 1,
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "white"
        }}
      >
        <>
  <h2>🤖 AI Customer Support Agent</h2>
  <p style={{ marginBottom: "20px" }}>
    Automated E-Commerce Refund Processing
  </p>
</>

        <input
          type="text"
          placeholder="Example: I want a refund for O1004"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{
            width: "70%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={checkRefund}
          style={{
            marginLeft: "10px",
            padding: "12px 18px",
borderRadius: "8px",
border: "none",
cursor: "pointer",
backgroundColor: "#2563eb",
color: "white",
fontWeight: "bold"
          }}
        >
          Send
        </button>

        <div style={{ marginTop: "20px" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ddd",
                marginBottom: "15px",
                paddingBottom: "10px"
              }}
            >
              <p>
                <strong>Customer:</strong> {msg.customer}
              </p>

              <p>
                <strong>Agent:</strong> {msg.agent}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      msg.status === "APPROVED"
                        ? "green"
                        : "red",
                    fontWeight: "bold"
                  }}
                >
                  {msg.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "white"
        }}
      >
        <h2>📊 Admin Dashboard</h2>

        {result && (
          <>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "20px",
                backgroundColor: "#f9f9f9"
              }}
            >
              <h3>Customer Details</h3>

              <p>
                <strong>Customer:</strong> {result.customer_name}
              </p>

              <p>
                <strong>Customer ID:</strong> {result.customer_id}
              </p>

              <p>
                <strong>Loyalty Level:</strong> {result.loyalty_level}
              </p>

              <p>
                <strong>Order ID:</strong> {result.order_id}
              </p>

              <p>
                <strong>Status:</strong> {result.status}
              </p>
            </div>

            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                backgroundColor: "#f9f9f9"
              }}
            >
              <h3>Reasoning Logs</h3>

              <ul>
                {result.logs.map((log, index) => (
                  <li key={index}>{log}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;