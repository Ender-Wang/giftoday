import React, { useEffect, useState } from "react";
import PostalAddress from "../components/PostalAddress";
import PaymentDetail from "../components/PaymentDetail";
import OrderSummary from "../components/OrderSummary";
function CheckoutPage() {
  const [totalPrice, setTotalPrice] = useState(0);
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
        <OrderSummary
          onTotalPriceChange={(totalPrice) => {
            setTotalPrice(totalPrice);
          }}
        />
      </div>
      {/* <div
        className="fixed bottom-4 right-4 rounded-lg bg-gray-100 p-4"
        style={{ zIndex: 9999 }}
      >
        Total Price: €{totalPrice}
      </div> */}
      <PostalAddress />
      <PaymentDetail />
    </div>
  );
}

export default CheckoutPage;
