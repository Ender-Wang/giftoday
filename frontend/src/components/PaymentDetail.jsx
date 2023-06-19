import React, { useState } from "react";
import { getUserID } from "../states/GlobalState";

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [id] = useState(getUserID);
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [cardExistsError, setCardExistsError] = useState("");

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
        const cardInfo = data.cardInfo;
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

      const requestBody = {
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
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
            }, 500);
          } else {
            console.log("Payment failed. Please try again.");
          }
        } else if (response.status === 409) {
          setCardExistsError(
            "Card already exists. Please enter a different card number."
          );
          setTimeout(() => {
            setCardExistsError("");
          }, 500);
        } else {
          console.log("Error updating card information:", response.status);
          console.log("Error updating card information. Please try again.");
        }
      } catch (error) {
        console.log("Error updating card information:", error);
        console.log("Error updating card information. Please try again.");
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={{ position: "absolute", top: 80, right: 500 }}>
      {/* new card */}
      <h1 className="font-sans text-xl">Payment Detail:</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className=" mb-4">
            <label htmlFor="cardNumber" className="block font-bold">
              Card Number:
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="Enter card number"
              pattern="\d{16}"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              style={{
                border: formErrors.cardNumber
                  ? "2px solid pink"
                  : "1px solid #ccc",
              }}
            />
            {formErrors.cardNumber && <p>{formErrors.cardNumber}</p>}
            {cardExistsError && <p>{cardExistsError}</p>}
          </div>

          <div className=" mb-4">
            <label htmlFor="cvv" className="block font-bold">
              CVV:
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="Enter CVV"
              pattern="\d{3}"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              style={{
                border: formErrors.cvv ? "2px solid pink" : "1px solid #ccc",
              }}
            />
            {formErrors.cvv && <p>{formErrors.cvv}</p>}
          </div>

          <div className=" mb-4">
            <label htmlFor="expiryDate" className="block font-bold">
              Expiry Date:
            </label>
            <input
              type="month"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              min={today}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              style={{
                border: formErrors.expiryDate
                  ? "2px solid pink"
                  : "1px solid #ccc",
              }}
            />
            {formErrors.expiryDate && <p>{formErrors.expiryDate}</p>}
          </div>
        </div>

        <div className="mb-4 ">
          <button
            type="submit"
            className="hover:scale-102 transform rounded-lg bg-lightButton px-5 py-1 hover:bg-normalButton"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditCardForm;
