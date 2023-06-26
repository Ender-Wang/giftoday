import React, { useEffect } from "react";
import { useState } from "react";
import PostalAddress from "../components/PostalAddress";
import PaymentDetail from "../components/PaymentDetail";
import OrderSummary from "../components/OrderSummary";
function CheckoutPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    document.title = "Giftoday - Checkout";
  }, []);
  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  return (
    <div>
      <OrderSummary
        onTotalPriceChange={(totalPrice) => {
          setTotalPrice(totalPrice);
        }}
      />
      {/* <div>Total Price: €{totalPrice}</div> */}
      <PostalAddress />
      <PaymentDetail onSelectCard={handleSelectCard} />
      {/* {selectedCard && (
        <div>
          <h2>Selected Card:</h2>
          <p>Card Number: {selectedCard.cardNumber}</p>
          <p>Expiry Date: {selectedCard.expiryDate.substring(0, 7)}</p>
          <p>CVV: {selectedCard.cvv}</p>
        </div>
      )} */}
    </div>
  );
}

export default CheckoutPage;
