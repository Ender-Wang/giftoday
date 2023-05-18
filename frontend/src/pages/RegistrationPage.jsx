import React, { useState } from "react";

export default function RegistrationPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const country = "Germany";
  const germanyCities = [
    "Berlin",
    "Hamburg",
    "Munich",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Leipzig",
    "Bremen",
    "Dresden",
    "Hanover",
    "Nuremberg",
    "Duisburg",
    "Bochum",
    "Wuppertal",
    "Bielefeld",
    "Bonn",
    "Münster",
    "Karlsruhe",
    "Mannheim",
    "Augsburg",
    "Wiesbaden",
    "Gelsenkirchen",
    "Mönchengladbach",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      fullName: fullName,
      email: email,
      password: password,
      postalCode: postalCode,
      street: street,
      city: city,
      country: country,
    };
    //post it into the console instead of the database for now, to see if it works
    console.log(data);
    // fetch("http://localhost:4000/api/registration", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    // });

    // Clear the form
    setFullName("");
    setEmail("");
    setPassword("");
    setPostalCode("");
    setStreet("");
    setCity("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      case "street":
        setStreet(value);
        break;
      case "city":
        setCity(value);
        break;
      default:
        break;
    }
  };
  const handleLogin = (event) => {
    event.preventDefault();
    window.location.href = "/login";
  };

  return (
    <div className="h-600 bg-gray-100 flex items-center justify-center">
      <div className="w-2/5 flex items-center justify-center bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1557471311-da136cd4fb86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
          alt="Tetiana Shadrina from UnSplash"
        />
        <img
          src="../images/wallpaper-tetiana-shadrina.jpg"
          alt="A"
          height={300}
        />
      </div>

      <div className="w-2/5 flex flex-col items-center">
        <h1 className="text-6xl mb-8">Registration</h1>
        <div className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="fullName" className="block font-medium mb-2">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="postalCode" className="block font-medium mb-2">
              Postal Code:
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={postalCode}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="street" className="block font-medium mb-2">
              Street:
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={street}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block font-medium mb-2">
              City:
            </label>
            <select
              id="city"
              name="city"
              value={city}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="" disabled>
                Select a city
              </option>
              {germanyCities.map((germanCity) => (
                <option key={germanCity} value={germanCity}>
                  {germanCity}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block font-medium mb-2">
              Country/Region:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
              disabled
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>

        <p className="mt-4">
          Already have an account?{" "}
          <a href="/login" onClick={handleLogin} className="text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
