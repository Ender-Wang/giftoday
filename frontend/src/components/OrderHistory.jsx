import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { getUserID } from "../states/GlobalState";

export default function UserInfo() {
  const [id] = useState(getUserID);

  const [orders, setOrders] = useState(null);

  //get ready to fetch data from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user information from the backend

    fetch(`http://localhost:4000/user/${id}/order`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const orders = data;
          setOrders(orders);

          // if (order.gift && order.gift.length > 0) {
          //   setGift(order.gift);
          // }
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching user info:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  const handleDelete = async (OID) => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/${id}/order/${OID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setOrders(orders.filter((order) => order.id !== OID));
      } else {
        console.log("Deleting data failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-start">
        <div>
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="font-sans text-3xl tracking-tight text-gray-900 sm:text-3xl">
              Order History
            </h1>
          </div>

          <div
            className="rounded border border-white p-4"
            style={{ maxHeight: "84vh", overflowY: "auto" }}
          >
            {/* give some blank between the top */}
            <div className="mt-0 ">
              <div className="mx-auto max-w-lg ">
                {orders == null && (
                  // Display "Your card is empty" message
                  <div>
                    <h2 className="mt-16 text-lg font-bold text-gray-500">
                      Your Order is Empty 😥
                    </h2>
                    <br />
                  </div>
                )}
                {orders !== null && (
                  <div className="mx-auto max-w-md space-y-3  lg:px-0">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border-radius: 30px border-gray-300 bg-white hover:shadow-md sm:rounded-lg sm:border"
                      >
                        <div className="flex items-center border-b border-gray-300 p-4">
                          <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-2 sm:grid-cols-3 lg:col-span-2">
                            <div>
                              <dt className="font-bold text-gray-900">
                                Order ID
                              </dt>
                              <dd
                                className="mt-1 text-gray-900"
                                style={{ textAlign: "left" }}
                              >
                                {order.id}
                              </dd>
                            </div>

                            <div>
                              <dt className="font-bold text-gray-900">
                                Total Price
                              </dt>
                              <dd
                                className="mt-1 font-medium text-gray-900"
                                style={{ textAlign: "left" }}
                              >
                                {order.total}
                              </dd>
                            </div>

                            {/* Cancel button */}
                            <div className="flex justify-center">
                              <button
                                type="submit"
                                className="duration-600 hover:bg-themeColor-200 rounded bg-themeColor-100 px-4 py-2 font-medium text-white transition-colors ease-in-out"
                                onClick={() => handleDelete(order.id)}
                              >
                                Cancel
                              </button>
                            </div>

                            {/* card */}
                            <div>
                              <dt className="font-bold text-gray-900">
                                Card Number
                              </dt>
                              <dd
                                className="mt-1 font-medium text-gray-900"
                                style={{ textAlign: "left" }}
                              >
                                {order.card.cardNumber}
                              </dd>
                            </div>

                            {/* placeholder to fix the grid */}
                            <div>
                              <dt></dt>
                              <dd></dd>
                            </div>
                            <div>
                              <dt></dt>
                              <dd></dd>
                            </div>
                            {/* Address */}
                            <div>
                              <dt className="font-bold text-gray-900">
                                Address
                              </dt>
                              <dd
                                className="mt-1 font-medium text-gray-900"
                                style={{ textAlign: "left" }}
                              >
                                {
                                  <span>
                                    {order.address.street},
                                    {order.address.postalCode},
                                    {order.address.city},
                                    {order.address.phoneNumber}
                                  </span>
                                }
                              </dd>
                            </div>
                          </dl>
                        </div>

                        {/* Products */}
                        <div class="scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-w-2 h-64 overflow-y-scroll">
                          <ul role="list" className="divide-y divide-gray-200">
                            {order.gift.map((gift) => (
                              <li key={gift.id} className="p-4 sm:p-6">
                                <div className="flex items-center sm:items-start">
                                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                                    <img
                                      src={
                                        "https://github.com/Ender-Wang/giftoday/blob/master/frontend/src/images/shopItems/" +
                                        gift.image +
                                        "?raw=true"
                                      }
                                      className="h-full w-full object-cover object-center"
                                      style={{ aspectRatio: "1/1" }}
                                    />
                                  </div>

                                  <div className="ml-6 flex-1 text-sm">
                                    <div className="font-medium text-gray-900">
                                      <h5 className="mt-6">
                                        Name: {gift.name}
                                      </h5>
                                      <h5 className="mt-4">
                                        Amount: {gift.quantity}
                                      </h5>
                                      <p className="mt-4">
                                        Price: {gift.price}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-6 sm:flex sm:justify-between">
                                  <div className="flex items-center">
                                    <CheckCircleIcon
                                      className="h-5 w-5 text-green-500"
                                      aria-hidden="true"
                                    />
                                    <p className="ml-2 text-sm font-medium text-gray-500">
                                      Shipping Date:{" "}
                                      {new Date(
                                        order.shippingDate
                                      ).toLocaleDateString("en-GB")}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
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
      </div>
    </div>
  );
}
