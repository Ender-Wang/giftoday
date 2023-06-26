import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostalAddress from "../components/PostalAddress";
import PaymentDetail from "../components/PaymentDetail";
import OrderSummary from "../components/OrderSummary";
import { getUserID } from "../states/GlobalState";
function CheckoutPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  const [id] = useState(getUserID);
  useEffect(() => {
    document.title = "Giftoday - Checkout";
  }, []);
  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };
  const handleSubmit = async () => {
    try {
      const orderData = {
        totalPrice: totalPrice,
        selectedAddress: selectedAddress,
        selectedCard: selectedCard,
      };

      const response = await fetch(`http://localhost:4000/user/${id}//order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        window.location.href = "/order-confirmation";
      } else {
        console.error("Failed to submit order");
      }
    } catch (error) {
      console.error("An error occurred while submitting the order", error);
    }
  };
  return (
    <div>
      <OrderSummary
        onTotalPriceChange={(totalPrice) => {
          setTotalPrice(totalPrice);
        }}
      />

      <PostalAddress onSelectAddress={handleSelectAddress} />

      <PaymentDetail onSelectCard={handleSelectCard} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CheckoutPage;

{
  /* <div>Total Price: €{totalPrice}</div> */
}
{
  /* {selectedAddress && (
        <div>
          <h2>Selected Address:</h2>
          <p>Full Name: {selectedAddress.fullName}</p>
          <p>Postal Code: {selectedAddress.postalCode}</p>
          <p>Street: {selectedAddress.street}</p>
          <p>City: {selectedAddress.city}</p>
        </div>
      )} */
}
{
  /* {selectedCard && (
        <div>
          <h2>Selected Card:</h2>
          <p>Card Number: {selectedCard.cardNumber}</p>
          <p>Expiry Date: {selectedCard.expiryDate.substring(0, 7)}</p>
          <p>CVV: {selectedCard.cvv}</p>
        </div>
      )} */
}
