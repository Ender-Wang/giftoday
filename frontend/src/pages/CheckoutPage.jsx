import React, { useEffect } from "react";
import PostalAddress from "../components/PostalAddress";
function CheckoutPage() {
  useEffect(() => {
    document.title = "Giftoday - Checkout";
  }, []);
  return (
    <div>
      <h1>Checkout</h1>
      <PostalAddress />
    </div>
  );
}

export default CheckoutPage;
