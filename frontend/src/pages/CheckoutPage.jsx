import React, { useEffect } from "react";
import { useState } from "react";
import PostalAddress from "../components/PostalAddress";
import PaymentDetail from "../components/PaymentDetail";
import OrderSummary from "../components/OrderSummary";
import { getUserID } from "../states/GlobalState";
function CheckoutPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [id] = useState(getUserID);
  const [isPremium, setPremium] = useState(false);

  useEffect(() => {
    const fetchPremium = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/user/" + id + "/premium",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setPremium(responseData);
        } else {
          console.log("Fetching data failed.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPremium();
  }, [id, isPremium]);

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
      let calculatedTotalPrice = totalPrice;

      if (isPremium) {
        calculatedTotalPrice *= 0.9;
      }
      calculatedTotalPrice = Number(calculatedTotalPrice.toFixed(2));
      const orderData = {
        total: calculatedTotalPrice,
        address: selectedAddress,
        card: selectedCard,
      };

      const response = await fetch(`http://localhost:4000/user/${id}/order`, {
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
      <div
        className="fixed bottom-4 right-4 rounded-lg bg-gray-100 p-4"
        style={{ zIndex: 9999 }}
      >
        {!isPremium && (
          <span className="basis-5/6 font-bold text-lightFontColor">
            Total Price: € {totalPrice}
          </span>
        )}
        {isPremium && (
          <div className="basis-5/6 font-bold text-lightFontColor ">
            <span className="line-through">€ {totalPrice}</span>
            <span className=" ml-4 basis-5/6 text-xl font-bold text-orangeFontColor ">
              {/* toFixed Retain two decimal places */}
              Total Price: €{(totalPrice * 0.9).toFixed(2)}
            </span>
          </div>
        )}
        <button
          className="mt-4 rounded bg-orangeFontColor px-4 py-2 font-bold text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <PostalAddress onSelectAddress={handleSelectAddress} />

      <PaymentDetail onSelectCard={handleSelectCard} />
    </div>
  );
}

export default CheckoutPage;
