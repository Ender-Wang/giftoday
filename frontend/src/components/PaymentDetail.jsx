import React, { useState } from "react";

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation or submit the form data to the server
    // You can access the card details in the state variables (cardNumber, cardName, expiryDate, cvv)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="cardNumber">Card Number:</label>
      <input
        type="text"
        id="cardNumber"
        // name="cardNumber"
        placeholder="Enter card number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        required
      />

      <label htmlFor="expiryDate">Expiry Date:</label>
      <input
        type="text"
        id="expiryDate"
        name="expiryDate"
        placeholder="MM/YY"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
      />

      <label htmlFor="cvv">CVV:</label>
      <input
        type="text"
        id="cvv"
        name="cvv"
        placeholder="Enter CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreditCardForm;
