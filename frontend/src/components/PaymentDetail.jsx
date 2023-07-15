import React, { useState, useEffect } from "react";
import { getUserID } from "../states/GlobalState";
import visalogo from "../images/Visa_Logo.svg.png";
import mastercardlogo from "../images/MasterCard_Logo.svg.png";
import unionpaylogo from "../images/UnionPay_logo.svg.png";

import { TrashIcon } from "@heroicons/react/20/solid";

const CreditCardForm = ({ onSelectCard }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [id] = useState(getUserID);
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [cardExistsError, setCardExistsError] = useState("");
  const [existingCardInfo, setExistingCardInfo] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

  const checkCardExists = async (cardNumber) => {
    try {
      const response = await fetch(`http://localhost:4000/user/${id}/card`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const cardInfo = data;
        return cardInfo.some((card) => card.cardNumber === cardNumber);
      } else {
        console.log("Error checking card existence:", response.status);
        return false;
      }
    } catch (error) {
      console.log("Error checking card existence:", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/${id}/card`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const cardInfo = data.cardInfo;
          if (cardInfo && cardInfo.length > 0) {
            const existingCard = cardInfo;
            setExistingCardInfo(existingCard);
          }
        } else {
          console.log("Error fetching card details:", response.status);
        }
      } catch (error) {
        console.log("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [id]);

  const validateForm = () => {
    const errors = {};

    if (!cardNumber.match(/^\d{16}$/)) {
      errors.cardNumber =
        "Invalid card number. Please enter a 16-digit number.";
    }

    const currentDate = new Date();
    const selectedDate = new Date(expiryDate);
    if (selectedDate < currentDate) {
      errors.expiryDate = "Invalid expiry date. Please select a future date.";
    }

    if (!cvv.match(/^\d{3}$/)) {
      errors.cvv = "Invalid CVV. Please enter a 3-digit number.";
    }

    if (!selectedLogo) {
      errors.selectedLogo = "Please select a card type.";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const cardExists = await checkCardExists(cardNumber);
      if (cardExists) {
        setCardExistsError(
          "Card already exists. Please enter a different card number."
        );

        return;
      }

      // Format expiryDate to store only month and year
      const formattedExpiryDate = expiryDate.substring(0, 7);
      const requestBody = {
        cardNumber: cardNumber,
        expiryDate: formattedExpiryDate,
        cvv: cvv,
        logo: selectedLogo,
      };

      try {
        const response = await fetch(`http://localhost:4000/user/${id}/card`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.message === "Card information updated.") {
            setSuccessMessage("Payment successful!");
            setTimeout(() => {
              setSuccessMessage("");
              // Refresh the page
              window.location.reload();
            }, 500);
          } else {
            console.log("Payment failed. Please try again.");
          }
        } else if (response.status === 409) {
          setCardExistsError(
            "Card already exists. Please enter a different card number."
          );
          // setTimeout(() => {
          //   setCardExistsError("");
          // }, 1500);
        } else {
          console.log("Error updating card information:", response.status);
        }
      } catch (error) {
        console.log("Error updating card information:", error);
      }
    }
  };

  const deleteCard = async (cardNumber) => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/${id}/card/${cardNumber}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(response);
        setExistingCardInfo(
          existingCardInfo.filter((card) => card.cardNumber !== cardNumber)
        );
        // Show success message
        alert("Card deleted successfully");
        // Refresh the page
        // window.location.reload();
      } else {
        console.log("Error deleting card:", response.status);
      }
    } catch (error) {
      console.log("Error deleting card:", error);
    }
  };

  const selectCard = (Card) => {
    setSelectedCard(Card);
    onSelectCard(Card);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h1 className="font-sans text-3xl tracking-tight text-gray-900 sm:text-3xl">
        Payment Detail
      </h1>
      <div className="h-[200px] w-[450px] overflow-y-auto rounded border border-white p-4">
        <div className="mx-auto max-w-lg ">
          {existingCardInfo && existingCardInfo.length > 0 ? (
            // Display existing card information
            <div>
              {existingCardInfo.map((Card, index) => (
                <div
                  key={index}
                  className={`${
                    selectedCard === Card ? "border-price" : ""
                  } hover:scale-102 mb-4
                h-[120px] transform rounded-lg border-2 px-4 py-4 duration-300`}
                  onClick={() => selectCard(Card)}
                >
                  <div className="mb-2 flex items-center">
                    {Card.logo === "Visa" && (
                      <img
                        src={visalogo}
                        alt="Visa Logo"
                        className="mr-2 w-8"
                      />
                    )}
                    {Card.logo === "Mastercard" && (
                      <img
                        src={mastercardlogo}
                        alt="Mastercard Logo"
                        className="mr-2 w-8"
                      />
                    )}
                    {Card.logo === "UnionPay" && (
                      <img
                        src={unionpaylogo}
                        alt="UnionPay Logo"
                        className="mr-2 w-8"
                      />
                    )}
                    <p>Card Number: {Card.cardNumber}</p>
                  </div>

                  <p>Expiry Date: {Card.expiryDate.substring(0, 7)}</p>
                  <div className="flex justify-between  ">
                    <div className="left-element">CVV: {Card.cvv}</div>
                    <div className="right-element">
                      <TrashIcon
                        type="button"
                        className="h-6 w-6  text-normalButton"
                        onClick={() => deleteCard(Card.cardNumber)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Display "Your card is empty" message
            <div>
              <h2 className="text-lg font-bold text-gray-500">
                Your Card 💳 is Empty 😥
              </h2>
              <br />
            </div>
          )}
        </div>
      </div>
      <br />
      {/* new card */}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <img
            src={visalogo}
            alt="Visa Logo"
            className={`mr-2 ${
              selectedLogo === "Visa" ? "ring-2 ring-red-500" : ""
            }`}
            style={{ width: "50px", cursor: "pointer" }}
            onClick={() => setSelectedLogo("Visa")}
          />
          <img
            src={mastercardlogo}
            alt="Mastercard Logo"
            className={`mr-2 ${
              selectedLogo === "Mastercard" ? "ring-2 ring-red-500" : ""
            }`}
            style={{ width: "50px", cursor: "pointer" }}
            onClick={() => setSelectedLogo("Mastercard")}
          />
          <img
            src={unionpaylogo}
            alt="UnionPay Logo"
            className={`mr-2 ${
              selectedLogo === "UnionPay" ? "ring-2 ring-red-500" : ""
            }`}
            style={{ width: "50px", cursor: "pointer" }}
            onClick={() => setSelectedLogo("UnionPay")}
          />
          {formErrors.selectedLogo && <p>{formErrors.selectedLogo}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className=" mb-2">
            <label htmlFor="cardNumber" className="block font-bold">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="Enter card number"
              pattern="\d{16}"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border-themeColor w-full border-b-2 p-2"
            />
            {formErrors.cardNumber && <p>{formErrors.cardNumber}</p>}
            {cardExistsError && <p>{cardExistsError}</p>}
          </div>

          <div className=" mb-2">
            <label htmlFor="cvv" className="block font-bold">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="Enter CVV"
              pattern="\d{3}"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="border-themeColor w-full border-b-2 p-2"
            />
            {formErrors.cvv && <p>{formErrors.cvv}</p>}
          </div>

          <div className=" mb-4">
            <label htmlFor="expiryDate" className="block font-bold">
              Expiry Date
            </label>
            <input
              type="month"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              min={today}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="border-themeColor w-full border-b-2 p-2"
            />
            {formErrors.expiryDate && <p>{formErrors.expiryDate}</p>}
          </div>
          <div className="mb-4 mt-2">
            <button
              type="submit"
              className="hover:scale-102 transform rounded-lg bg-lightButton px-5 py-1 hover:bg-normalButton"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreditCardForm;
