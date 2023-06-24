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
      <OrderSummary />
      <PostalAddress />
      <PaymentDetail />
    </div>
  );
}

export default CheckoutPage;
