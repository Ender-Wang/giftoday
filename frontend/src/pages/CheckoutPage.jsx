import React, { useEffect } from "react";
import PostalAddress from "../components/PostalAddress";
import OrderSummary from "../components/OrderSummary";

function CheckoutPage() {
  useEffect(() => {
    document.title = "Giftoday - Checkout";
  }, []);
  return (
    <div>
      <h1>Checkout</h1>
      <div
        style={{
          marginTop: "-60px",
          marginLeft: "40px",
          transform: "scale(1.0)",
        }}
      >
        <OrderSummary />
      </div>
      <PostalAddress />
      <PaymentDetail />
    </div>
  );
}

export default CheckoutPage;
