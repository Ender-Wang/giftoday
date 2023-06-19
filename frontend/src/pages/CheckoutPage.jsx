import React, { useEffect } from "react";
import PostalAddress from "../components/PostalAddress";
import PaymentDetail from "../components/PaymentDetail";
function CheckoutPage() {
  useEffect(() => {
    document.title = "Giftoday - Checkout";
  }, []);
  return (
    <div>
      <h1>Checkout</h1>
      <h1>Checkout</h1>
      <h1>Checkout</h1>
      <h1>Checkout</h1>
      <h1>Checkout</h1>
      <h1>Checkout</h1>
      <PostalAddress />
      <PaymentDetail />
    </div>
  );
}

export default CheckoutPage;
