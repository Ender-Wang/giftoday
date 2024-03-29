import React, { useEffect } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserID } from "../states/GlobalState";
import PaymentDetail from "../components/PaymentDetail";

const tiers = [
  {
    name: "Normal User",
    id: "tier-normal",
    price: "€0",
    features: [
      "Find appropriate gifts for different festivals",
      "Record the important date",
      "Recommend related products for records",
    ],
    button: "Unsubscribe",
    featured: false,
  },
  {
    name: "Premium user",
    id: "tier-premium",
    price: "€60",
    features: [
      "Find appropriate gifts for different festivals",
      "Record the important date",
      "Recommend related products for records",
      "Get 10% discount for every product",
    ],
    button: "Subscribe",
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PremiumBenefit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userID = getUserID();
  const [selectedCard, setSelectedCard] = useState(null);

  const [isPremium, setPremium] = useState(false);
  useEffect(() => {
    const fetchPremium = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/user/" + userID + "/premium",
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
  }, [userID, isPremium]);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  const updateCart = async (updatedCart) => {
    // Store updated cart back to the user
    try {
      const response = await fetch(
        //"/user/:userID/cart/update"
        "http://localhost:4000/user/" + userID + "/cart/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: updatedCart }),
        }
      );
      if (response.ok) {
        navigate("/giftoday.com");
        window.location.reload(); // reload current page
      } else {
        alert("Updating data failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePremiumUpgrade = (premium) => {
    setLoading(true);
    // if user is not premium, then upgrade to premium when click subscribe, click unsubscribe will go back to home page
    // if user is premium, click unsubscribe button to unsubscribe, click subscribe will go back to home page
    if (!isPremium) {
      if (premium === false) {
        navigate("/giftoday.com");
      } else {
        if (premium === true && selectedCard !== null) {
          fetch(`http://localhost:4000/user/${userID}/premium`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ premium }),
          })
            // update the cart item price to premium price => 10% off
            .then((response) => {
              if (response.ok) {
                fetch("http://localhost:4000/user/" + userID + "/cart")
                  .then((response) => response.json())
                  .then((data) => {
                    // alert("Here data is: " + data.cart[0].price);
                    const updatedCart = data.cart.map((item) => ({
                      ...item,
                      price: item.price * 0.9,
                    }));
                    // setTimeout(async () => {
                    // }, 1000);
                    updateCart(updatedCart);

                    alert(
                      "Premium subscription successful! You will get 10% off for every product in your cart."
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.error("Error upgrading to premium:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          alert("Please select your payment method first");
          setLoading(false);
        }
      }
    } else {
      // if user is premium, click unsubscribe button to unsubscribe, click subscribe will go back to home page
      if (premium === true) {
        navigate("/giftoday.com");
      } else {
        fetch(`http://localhost:4000/user/${userID}/premium`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ premium }),
        })
          // update the cart item price to premium price => 10% off
          .then((response) => {
            if (response.ok) {
              fetch("http://localhost:4000/user/" + userID + "/cart")
                .then((response) => response.json())
                .then((data) => {
                  // alert("Here data is: " + data.cart[0].price);
                  const updatedCart = data.cart.map((item) => ({
                    ...item,
                    price: item.price / 0.9,
                  }));
                  // setTimeout(async () => {
                  // }, 1000);
                  updateCart(updatedCart);
                  alert(
                    "You have successfully unsubscribed from premium subscription. You will no longer get 10% off for every product in your cart."
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.error("Error upgrading to premium:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className=" mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-red-100 shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : "rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none",
              "rounded-3xl p-8 ring-1 ring-gray-400/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-black-400" : "text-black-600",
                "text-base font-semibold leading-7"
              )}
            >
              {tier.name}
            </h3>

            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? "text-gray-900" : "text-gray-900",
                  "text-5xl font-bold tracking-tight"
                )}
              >
                {tier.price}
              </span>
            </p>

            <ul
              className={classNames(
                tier.featured ? "text-gray-700" : "text-gray-600",
                "mt-8 space-y-3 text-sm leading-6 sm:mt-10"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className={classNames(
                      tier.featured ? "text-green-500" : "text-green-500",
                      "h-6 w-5 flex-none"
                    )}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePremiumUpgrade(tier.featured)}
              disabled={loading}
              className={classNames(
                tier.featured
                  ? "bg-red-300 text-black shadow-sm hover:bg-red-400 focus-visible:outline-red-500"
                  : "bg-gray-100 text-black shadow-sm hover:bg-gray-200 focus-visible:outline-gray-300",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
            >
              {tier.button}
            </button>
          </div>
        ))}
      </div>
      <div className="absolute right-10 top-20 mt-16 sm:mt-20 lg:mt-16 ">
        <PaymentDetail onSelectCard={handleSelectCard} />
      </div>
    </div>
  );
}
