// const orders = [
//   {
//     number: "WU88191111",
//     deliveredDate: "July 12, 2021",
//     deliveredDatetime: "2021-07-12",
//     total: "$160.00",
//     products: [
//       {
//         id: 1,
//         name: "Micro Backpack",
//         amount: 1,
//         href: "#",
//         price: "$70.00",
//         imageSrc:
//           "https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg",
//         imageAlt:
//           "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
//       },
//       // More products...
//       {
//         id: 2,
//         name: "Micro Backpack",
//         amount: 1,
//         href: "#",
//         price: "$70.00",
//         imageSrc:
//           "https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg",
//         imageAlt:
//           "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
//       },
//     ],
//   },
//   {
//     number: "WU88191111",
//     href: "#",
//     invoiceHref: "#",
//     createdDate: "Jul 6, 2021",
//     createdDatetime: "2021-07-06",
//     deliveredDate: "July 12, 2021",
//     deliveredDatetime: "2021-07-12",
//     total: "$160.00",
//     products: [
//       {
//         id: 1,
//         name: "Micro Backpack",
//         amount: 1,
//         href: "#",
//         price: "$70.00",
//         imageSrc:
//           "https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg",
//         imageAlt:
//           "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
//       },
//       // More products...
//     ],
//   },

//   // More orders...
//   {
//     number: "WU88191111",
//     href: "#",
//     invoiceHref: "#",
//     createdDate: "Jul 6, 2021",
//     createdDatetime: "2021-07-06",
//     deliveredDate: "July 12, 2021",
//     deliveredDatetime: "2021-07-12",
//     total: "$160.00",
//     products: [
//       {
//         id: 1,
//         name: "Micro Backpack",
//         amount: 1,
//         href: "#",
//         price: "$70.00",
//         imageSrc:
//           "https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg",
//         imageAlt:
//           "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
//       },
//       // More products...
//     ],
//   },
// ];

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { getUserID } from "../states/GlobalState";

export default function UserInfo() {
  const [id] = useState(getUserID);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country] = useState("Germany");
  const [addressM, setAddressM] = useState(null);

  //get ready to fetch data from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user information from the backend
    fetch(`http://localhost:4000/user/${id}/info`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const user = data[0];
          setName(user.name);
          setEmail(user.email);
          setPassword(user.password);

          if (user.address && user.address.length > 0) {
            setAddressM(user.address);
          }
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

  return (
    // <div class=" h-128 overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-w-2">
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-md sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
          </div>
        </div>

        {/* give some blank between the top */}
        <div className="mt-16 ">
          <div className="mx-auto max-w-md ">
            {addressM !== null && (
              <div className="mx-auto max-w-md space-y-8  lg:px-0">
                {addressM.map((address) => (
                  <div
                    key={address.id}
                    className="border-radius: 30px border-gray-300 bg-white sm:rounded-lg sm:border hover:shadow-md"
                  >
                    <div className="flex items-center border-b border-gray-300 p-4">
                      <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div>
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="mt-1 text-gray-500">
                            {address.postalCode}
                          </dd>
                        </div>

                        {/* <div>
                        <dt className="font-medium text-gray-900">
                          Total amount
                        </dt>
                        <dd className="mt-1 font-medium text-gray-900">
                          {order.total}
                        </dd>
                      </div> */}

                        {/* Cancel button */}
                        {/* <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-themeColor-400 hover:bg-themeColor-200 text-white font-medium py-2 px-4 rounded transition-colors duration-600 ease-in-out"
                          onClick={handleLogin}
                        >
                          Cancel
                        </button>
                      </div> */}
                      </dl>
                    </div>

                    {/* Products */}
                    {/* <div class="h-64 overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-w-2">

                    <ul role="list" className="divide-y divide-gray-200">
                      {order.products.map((product) => (
                        <li key={product.id} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                              <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-6 flex-1 text-sm">
                              <div className="font-medium text-gray-900">
                                <h5 className="mt-6">Name: {product.name}</h5>
                                <h5 className="mt-4">
                                  Amount: {product.amount}
                                </h5>
                                <p className="mt-4">Price: {product.price}</p>
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
                                Delivered Date:{" "}
                                <time dateTime={order.deliveredDatetime}>
                                  {order.deliveredDate}
                                </time>
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                  </div> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
