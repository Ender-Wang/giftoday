import React, { useState } from "react";
import { useEffect } from "react";
import { getUserID, getSelectedDate } from "../states/GlobalState";
import { AiOutlineHome } from "react-icons/ai";
import { TrashIcon } from "@heroicons/react/20/solid";
export default function PostalAddress({ onSelectAddress }) {
  const [fullName, setFullName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country] = useState("Germany");
  const [phoneNumber, setPhoneNumber] = useState("");

  const selectedDate =
    getSelectedDate() === null
      ? null
      : new Date(getSelectedDate()).toLocaleDateString("en-GB");

  const [preAddress, setPreAddress] = useState([]);
  const userID = getUserID();

  const [formErrors, setFormErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/user/" + userID + "/address",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setPreAddress([...responseData]);
        } else {
          console.log("Fetching data failed.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userID, phoneNumber]);

  //If newMessage is entered or tag is selected
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        break;
      case "street":
        setStreet(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, street: "" }));
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
        break;
      case "postalCode":
        setPostalCode(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, postalCode: "" }));
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

    if (data.fullName.trim() === "") {
      errors.name = "Full Name is required!";
    }
    if (data.postalCode.trim() === "") {
      errors.postalCode = "Postal Code is required!";
    }
    if (data.phoneNumber.trim() === "") {
      errors.phoneNumber = "Phone Number is required!";
    }
    if (data.street.trim() === "") {
      errors.street = "Street is required!";
    }
    if (data.city.trim() === "") {
      errors.city = "City is required!";
    }

    return errors;
  };
  // Save new address and post it into mongoDB
  const handleSave = async () => {
    const data = {
      fullName: fullName,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      city: city,
      country: country,
      street: street,
    };
    const errors = validateForm(data);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(
          "http://localhost:4000/user/" + userID + "/address",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          const result = await response.json();
          setFullName("");
          setPostalCode("");
          setStreet("");
          setCity("");
          setPhoneNumber("");

          setPreAddress(preAddress.concat(result));
        } else {
          console.log("Save address failed.");
        }
      } catch (error) {
        console.log("An error occurred while processing the request.", error);
      }
    }
  };
  //delete pre Address
  const handleDelete = async (aID) => {
    try {
      const response = await fetch(
        "http://localhost:4000/user/" + userID + "/address/" + aID,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setPreAddress(preAddress.filter((preA) => preA.id !== aID));
      } else {
        console.log("Deleting data failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
    setSelectedAddress(address.id);
  };
  return (
    <div className=" mb-8 mr-72 rounded-md border-2 border-lightButton">
      {/* "choose address" container */}
      <div className=" h-2/5 min-w-[300px]  px-8 py-2">
        {/* <h1 className=" font-sans text-xl">Choose address</h1> */}

        <h1 className="font-sans text-3xl tracking-tight text-gray-900 sm:text-3xl">
          Choose address
        </h1>
        <div className=" grid h-full w-full grid-cols-2 grid-rows-3">
          {/* previous addresses */}
          <div className="row-span-3 h-[200px] overflow-auto pb-2 pr-10 pt-4">
            {preAddress.map((item, index) => (
              <div
                className={`${
                  selectedAddress === item.id ? "border-price" : ""
                } hover:scale-102 mb-4 h-[90px]
              transform rounded-lg border-2 duration-300`}
                key={index}
                onClick={() => handleSelectAddress(item)}
              >
                <div className="grid grid-cols-4">
                  <div className="flex items-center justify-center">
                    <AiOutlineHome className=" text-6xl " />
                  </div>
                  <div className="col-span-2 pl-4 pt-2">
                    <div>{item.fullName}</div>
                    <div>
                      <span>{item.phoneNumber}, </span>
                      <span>{item.postalCode}, </span>
                      <span>{item.street}, </span>
                      <span>{item.city}</span>
                    </div>
                  </div>
                  {item.id === 0 ? (
                    <div
                      className="col-span-1 flex items-center justify-center pr-4 pt-2"
                      title="Please correct the default address in the Profile"
                    >
                      <TrashIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  ) : (
                    <div className="col-span-1 flex items-center justify-center pr-4 pt-2">
                      <TrashIcon
                        type="button"
                        className="h-6 w-6 text-normalButton"
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* new address */}
          <div className="row-span-3 grid grid-cols-6 gap-4 pl-4 pt-2">
            {/* full name */}
            <div className="col-span-4 mb-4">
              <label htmlFor="fullName" className=" block font-bold">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.fullName ? formErrors.fullName : ""}
              />
            </div>
            {/* shipping date */}
            <div className="col-span-2 mb-4">
              <label htmlFor="shippingDate" className=" block font-bold">
                Shipping Date
              </label>
              <input
                type="text"
                id="shippingDate"
                name="shippingDate"
                defaultValue={selectedDate}
                className="border-themeColor w-full border-b-2 outline-none"
                title="please select date in the calendar on the homepage"
              />
            </div>
            {/* Street */}
            <div className="col-span-4 mb-4">
              <label htmlFor="street" className=" block font-bold">
                Street
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={street}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.street ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.street ? formErrors.street : ""}
              />
            </div>
            {/* phone number */}
            <div className="col-span-2 mb-4">
              <label htmlFor="phoneNumber" className=" block font-bold">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.phoneNumber ? "border-red-500" : ""
                }`}
                required
                placeholder={
                  formErrors.phoneNumber ? formErrors.phoneNumber : ""
                }
              />
            </div>
            {/* city */}
            <div className="col-span-2 mb-4">
              <label htmlFor="city" className=" block] font-bold">
                City/Town
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
                placeholder={formErrors.city ? formErrors.city : ""}
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
            {/* country */}
            <div className="col-span-1 mb-4">
              <label htmlFor="country" className=" block  font-bold">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                className="border-themeColor w-full border-b-2 outline-none "
                required
              />
            </div>
            {/* postal code */}
            <div className="col-span-2 mb-4">
              <label htmlFor="postalCode" className=" block font-bold">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={postalCode}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.postalCode ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.postalCode ? formErrors.postalCode : ""}
              />
            </div>
            {/* save button */}
            <div className=" mb-4">
              <button
                type="button"
                className="hover:scale-102 transform rounded-lg bg-lightButton px-5  py-1 hover:bg-normalButton"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
