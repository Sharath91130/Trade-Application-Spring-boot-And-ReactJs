export default function Trade() {
  const accessToken = "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI0SENYTlgiLCJqdGkiOiI2OTExNzI5NzAwMGE4YzY0YWM5OTA4ZTEiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNQbHVzUGxhbiI6ZmFsc2UsImlhdCI6MTc2Mjc1MTEyNywiaXNzIjoidWRhcGktZ2F0ZXdheS1zZXJ2aWNlIiwiZXhwIjoxNzYyODEyMDAwfQ.JmHXG-RyH1LBg_vp3YjaZlSQXzqSJ3MIFIZiZ3awEAY" // RAW token, no "Bearer"

  const placeOrder = () => {

    const orders = [
      {
        quantity: 1,
        product: "D",
        validity: "DAY",
        price: 0,
        instrument_token: "NSE_EQ|INFY",
        order_type: "MARKET",
        transaction_type: "BUY",
        disclosed_quantity: 0,
        trigger_price: 0,
        is_amo: false
      }
    ];

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://api.upstox.com/v2/uplink/order/place";

    form.innerHTML = `
      <input type="hidden" name="access_token" value="${accessToken}">
      <input type="hidden" name="redirect_url" value="http://localhost:5173/order-status">
      <input type="hidden" name="data" value='${JSON.stringify(orders)}'>
    `;

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button onClick={placeOrder} style={{ padding: "12px", fontSize: "16px" }}>
      Test Order (UpLink)
    </button>
  );
}
