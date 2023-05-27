import React, { useEffect, useState } from "react";

export default function UserInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country] = useState("Germany");

  const [formErrors, setFormErrors] = useState({});

  //get ready to fetch data from backend
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user information from the backend
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);

        if (data && data.length > 0) {
          const user = data[0];
          setName(user.name);
          setEmail(user.email);
          setPassword(user.password);

          if (user.address && user.address.length > 0) {
            const address = user.address[0];
            setPostalCode(address.postalCode);
            setStreet(address.street);
            setCity(address.city);
          }
        }

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

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
            alert("Registration successful!");
            setName("");
            setEmail("");
            setPassword("");
            setPostalCode("");
            setStreet("");
            setCity("");
            setFormErrors({});
          } else {
            // // Check if the email is already registered
            // if (res.status === 409) {
            //   setFormErrors((prevErrors) => ({
            //     ...prevErrors,
            //     email: "Email already registered!",
            //   }));
            // } else {
            //   alert("Registration failed!");
            // }
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Update failed!");
        });
    }
  };

  return (
    <div className="flex items-center justify-start">
      {/* <div className="flex w-2/5 items-center justify-center"></div> */}

      <div className="flex w-3/5 flex-col items-center justify-left">
        <h1 className="text-3xl mb-4 font-sans">General Information</h1>

        <div className="w-full max-w-sm">
          {/* Full Name input */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              className={`w-full border-b-2 border-themeColor p-2 outline-none ${
                formErrors.name ? "border-red-500" : ""
              }`}
              required
              placeholder={formErrors.name ? formErrors.name : ""}
            />
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email Address{" "}
              {formErrors.email && (
                <span className="text-red-500 text-sm">
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
              className={`w-full border-b-2 border-themeColor p-2 outline-none ${
                formErrors.email ? "border-red-500" : ""
              }`}
              required
              placeholder={formErrors.email ? formErrors.email : ""}
            />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className={`w-full border-b-2 border-themeColor p-2 outline-none ${
                formErrors.password ? "border-red-500" : ""
              }`}
              required
              placeholder={formErrors.password ? formErrors.password : ""}
            />
          </div>

          {/* Address input */}
          <div className="mb-4">
            <label htmlFor="address" className="block font-bold mb-2">
              Address
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Postal Code input */}
              <div className="mb-4">
                <label htmlFor="postalCode" className="block font-small mb-2">
                  Postal Code:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={postalCode}
                  onChange={handleInputChange}
                  className={`w-full border-b-2 border-themeColor p-2 outline-none ${
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
                <label htmlFor="street" className="block font-small mb-2">
                  Street:
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={street}
                  onChange={handleInputChange}
                  className={`w-full border-b-2 border-themeColor p-2 outline-none ${
                    formErrors.street ? "border-red-500" : ""
                  }`}
                  required
                  placeholder={formErrors.street ? formErrors.street : ""}
                />
              </div>

              {/* City input */}
              <div className="mb-4">
                <label htmlFor="city" className="block font-small mb-2">
                  City:
                </label>
                <select
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleInputChange}
                  className={`w-full border-b-2 border-themeColor p-2 outline-none ${
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
                <label htmlFor="country" className="block font-small mb-2">
                  Country/Region:
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={country}
                  onChange={handleInputChange}
                  className="w-full border-b-2 border-themeColor p-2 outline-none"
                  required
                  // disabled
                />
              </div>
            </div>
          </div>

          {/* two button */}
          <div className="flex flex-row justify-center gap-20">
            {/* cancel button */}
            <button
              type="cancel"
              className="flex col bg-themeColor-400 hover:bg-themeColor-200 text-white font-medium py-2 px-4 rounded transition-colors duration-600 ease-in-out"
            >
              cancel
            </button>

            {/* save button */}
            <button
              type="submit"
              className="flex col bg-themeColor-400 hover:bg-themeColor-200 text-white font-medium py-2 px-4 rounded transition-colors duration-600 ease-in-out"
              onClick={handleSubmit}
            >
              save
            </button>
          </div>
        </div>

        {/* Login link */}
        {/* <div className="mt-4 text-xs flex flex-row">
          <div className="flex opacity-50">
            *Already have an account? &nbsp;
          </div>
          <div className="flex">
            <a
              href="/login"
              onClick={handleLogin}
              className="text-themeColor-400"
            >
              Login
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
