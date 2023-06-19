import React, { useEffect } from "react";
import PostalAddress from "../components/PostalAddress";
import PaymentDetail from "../components/PaymentDetail";
import OrderSummary from "../components/OrderSummary";
function CheckoutPage() {
  useEffect(() => {
    document.title = "Giftoday - Checkout";
  }, []);
  return (
    <div>
      <div
        style={{
          flex: "1 1 auto",
          marginTop: "-10px",
          marginLeft: "35px",
        }}
      >
        {" "}
        <OrderSummary />
      </div>

      <PostalAddress />
      <PaymentDetail />
    </div>
  );
}

export default CheckoutPage;
