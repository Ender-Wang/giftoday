import React, { useState, useContext } from "react";
import sideImg from "../images/wallpaper-tetiana-shadrina.jpg";
import { setUserID, setLoggedInDate } from "../states/GlobalState";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const { login } = useContext(AuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        break;
      case "password":
        setPassword(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, password: "" }));
        break;
      default:
        break;
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (data.email.trim() === "") {
      errors.email = "Email Address is required!";
    }
    if (data.password.trim() === "") {
      errors.password = "Password is required!";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const errors = validateForm(data);
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
    if (Object.keys(errors).length === 0) {
      fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 401) {
            return res.json().then((data) => {
              setFormErrors({ password: data.error });
            });
          } else if (res.status === 404) {
            return res.json().then((data) => {
              setFormErrors({ email: data.error });
            });
          } else {
            alert("Login failed Please retry later!");
          }
        })
        .then((data) => {
          const { userID } = data;
          setUserID(userID);
          setLoggedInDate();
          login();
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          alert("Login failed Please retry later!");
        });
    }
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    window.location.href = "/registration";
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-2/5 items-center justify-center">
        <img
          src={sideImg}
          alt="Tetiana Shadrina from UnSplash"
          style={{ height: "670px" }}
          className="rounded-lg"
        />
      </div>

      <div className="w-2/5 flex flex-col items-center">
        <h1 className="text-6xl mb-8 font-sans">Login</h1>

        <div className="w-full max-w-sm">
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email Address
              {formErrors.email && (
                <span className="text-sm text-red-500 ml-2">
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
              {formErrors.password && (
                <span className="text-sm text-red-500 ml-2">
                  {formErrors.password}
                </span>
              )}
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

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-themeColor-400 hover:bg-themeColor-200 text-white font-medium py-2 px-4 rounded transition-colors duration-600 ease-in-out"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>

        {/* Registration link */}
        <div className="mt-4 text-xs flex flex-row">
          <div className="flex opacity-50">*Don't have an account? &nbsp;</div>
          <div className="flex">
            <a
              href="/registration"
              onClick={handleRegistration}
              className="text-themeColor-400"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
