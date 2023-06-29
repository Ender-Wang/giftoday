import {
  PlusCircleIcon,
  TrashIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { getUserID } from "../states/GlobalState";

export default function OrderSummary({ onTotalPriceChange }) {
  const [id] = useState(getUserID);

  const [carts, setCarts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Track total price

  //get ready to fetch data from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    // Fetch user information from the backend

    fetch(`http://localhost:4000/user/${id}/finalcart`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const carts = data;
          setCarts(carts);
          calculateTotalPrice(carts); // Calculate total price
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching user info:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  // Calculate total price based on cart items
  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setTotalPrice(totalPrice);
    onTotalPriceChange(totalPrice);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  const handleDelete = async (OID) => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/${id}/cart/${OID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCarts(carts.filter((cart) => cart.id !== OID));
        // Refresh the page
        window.location.reload();
      } else {
        console.log("Deleting data failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (giftId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/${id}/cartAdd/${giftId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        window.location.reload(); // reload current page
      } else {
        console.log("Failed to add gift to cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReduce = async (giftId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/${id}/cartReduce/${giftId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Gift added successfully to cart");

        window.location.reload(); // reload current page
      } else {
        console.log("Failed to add gift to cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mx-auto sm:px-2 lg:px-8">
        <h1 className="font-sans text-3xl tracking-tight text-gray-900 sm:text-3xl">
          Cart
        </h1>
      </div>

      <div className="h-[400px] w-[500px] overflow-y-auto rounded border border-white p-4">
        {/* give some blank between the top */}
        <div className="mt-0 ">
          <div className="">
            {carts !== null && (
              <div className="space-y-3  lg:px-0">
                {carts.map((cart) => (
                  <div
                    key={cart.id}
                    className="border-radius: 30px border-gray-300 bg-white hover:shadow-md sm:rounded-lg sm:border"
                  >
                    {/* Products */}
                    <div class="scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-w-2 h-64 overflow-y-scroll">
                      <ul className="divide-y divide-gray-200">
                        <li key={cart.id} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                              <img
                                src={
                                  "https://github.com/Ender-Wang/giftoday/blob/master/frontend/src/images/shopItems/" +
                                  cart.image +
                                  "?raw=true"
                                }
                                alt={cart.name}
                                className="h-full w-full object-cover object-center"
                                style={{ aspectRatio: "1/1" }}
                              />
                            </div>

                            <div className="ml-6 flex-1 text-sm">
                              <div className="font-medium text-gray-900">
                                <br />
                                <h5 className="mt-1">Name: {cart.name}</h5>

                                <p className="mt-4">Price: €{cart.price}</p>

                                <p className="mt-4">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <p> Amount : </p>

                                    <MinusCircleIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                      style={{ color: "#892455" }}
                                      onClick={() => handleReduce(cart.id)}
                                    />
                                    <span style={{ margin: "0 5px" }}>
                                      {cart.quantity}{" "}
                                    </span>
                                    <PlusCircleIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                      style={{ color: "#892455" }}
                                      onClick={() => handleAdd(cart.id)}
                                    />
                                  </div>
                                </p>

                                <h5 className="mt-1 flex justify-end">
                                  <TrashIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                    style={{ color: "#DD7E9A" }}
                                    onClick={() => handleDelete(cart.id)}
                                  />
                                </h5>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
