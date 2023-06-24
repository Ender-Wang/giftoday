import React, { useState } from "react";
import { Link } from "react-router-dom";
import sideImg from "../images/wallpaper-tetiana-shadrina.jpg";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country] = useState("Germany");

  const [formErrors, setFormErrors] = useState({});

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        break;
      case "email":
        setEmail(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        break;
      case "password":
        setPassword(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, password: "" }));
        break;
      case "postalCode":
        setPostalCode(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, postalCode: "" }));
        break;
      case "street":
        setStreet(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, street: "" }));
        break;
      case "city":
        setCity(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, city: "" }));
        break;
      default:
        break;
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (data.name.trim() === "") {
      errors.name = "Full Name is required!";
    }
    if (data.email.trim() === "") {
      errors.email = "Email Address is required!";
    }
    if (data.password.trim() === "") {
      errors.password = "Password is required!";
    }
    if (data.address.postalCode.trim() === "") {
      errors.postalCode = "Postal Code is required!";
    }
    if (data.address.street.trim() === "") {
      errors.street = "Street is required!";
    }
    if (data.address.city.trim() === "") {
      errors.city = "City is required!";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      address: {
        postalCode: postalCode,
        street: street,
        city: city,
        country: country,
      },
    };
    const errors = validateForm(data);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      fetch("http://localhost:4000/user/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            setName("");
            setEmail("");
            setPassword("");
            setPostalCode("");
            setStreet("");
            setCity("");
            setFormErrors({});
            window.location.href = "/giftoday.com/login";
          } else {
            // Check if the email is already registered
            if (res.status === 409) {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: "Email already registered!",
              }));
            } else {
              console.log("Registration failed! Error: " + res.status);
            }
          }
        })
        .catch((error) => {
          console.log("Registration failed! Error: " + error);
        });
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    window.location.href = "/giftoday.com/login";
  };

  return (
    <div className="flex items-center justify-center pt-[100px]">
      <div className="flex w-2/5 items-center justify-center">
        <img
          src={sideImg}
          alt="Tetiana Shadrina from UnSplash"
          style={{ height: "670px" }}
          className="rounded-lg"
        />
      </div>

      <div className="flex w-2/5 flex-col items-center">
        <h1 className="mb-8 font-sans text-6xl">Registration</h1>

        <div className="w-full max-w-sm">
          {/* Full Name input */}
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block font-bold">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              className={`border-themeColor w-full border-b-2 p-2 outline-none ${
                formErrors.name ? "border-red-500" : ""
              }`}
              required
              placeholder={formErrors.name ? formErrors.name : ""}
            />
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block font-bold">
              Email Address{" "}
              {formErrors.email && (
                <span className="text-sm text-red-500">
                  {" *"}
                  {formErrors.email}
                </span>
              )}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className={`border-themeColor w-full border-b-2 p-2 outline-none ${
                formErrors.email ? "border-red-500" : ""
              }`}
              required
              placeholder={formErrors.email ? formErrors.email : ""}
            />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="mb-2 block font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className={`border-themeColor w-full border-b-2 p-2 outline-none ${
                formErrors.password ? "border-red-500" : ""
              }`}
              required
              placeholder={formErrors.password ? formErrors.password : ""}
            />
          </div>

          {/* Address input */}
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block font-bold">
              Address
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Postal Code input */}
              <div className="mb-4">
                <label htmlFor="postalCode" className="font-small mb-2 block">
                  Postal Code:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={postalCode}
                  onChange={handleInputChange}
                  className={`border-themeColor w-full border-b-2 p-2 outline-none ${
                    formErrors.postalCode ? "border-red-500" : ""
                  }`}
                  required
                  placeholder={
                    formErrors.postalCode ? formErrors.postalCode : ""
                  }
                />
              </div>

              {/* Street input */}
              <div className="mb-4">
                <label htmlFor="street" className="font-small mb-2 block">
                  Street:
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={street}
                  onChange={handleInputChange}
                  className={`border-themeColor w-full border-b-2 p-2 outline-none ${
                    formErrors.street ? "border-red-500" : ""
                  }`}
                  required
                  placeholder={formErrors.street ? formErrors.street : ""}
                />
              </div>

              {/* City input */}
              <div className="mb-4">
                <label htmlFor="city" className="font-small mb-2 block">
                  City:
                </label>
                <select
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleInputChange}
                  className={`border-themeColor w-full border-b-2 p-2 outline-none ${
                    formErrors.city ? "border-red-500" : ""
                  }`}
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

              {/* Country input */}
              <div className="mb-4">
                <label htmlFor="country" className="font-small mb-2 block">
                  Country/Region:
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={country}
                  onChange={handleInputChange}
                  className="border-themeColor w-full border-b-2 p-2 outline-none"
                  required
                  // disabled
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-themeColor-100 hover:bg-themeColor-60 rounded px-4 py-2 font-medium text-white transition duration-300 ease-in-out hover:scale-110 hover:text-black"
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Login link */}
        <div className="mt-4 flex flex-row text-xs">
          <div className="flex opacity-50">
            *Already have an account? &nbsp;
          </div>
          <div className="flex">
            <Link
              to="/giftoday.com/login"
              onClick={handleLogin}
              className="text-themeColor-400 hover:text-themeColor-100 transition duration-300 ease-in-out hover:scale-110"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
