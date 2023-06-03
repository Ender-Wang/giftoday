import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    button: "it is enough",
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
    button: "let us try",
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PremiumBenefit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePremiumUpgrade = (premium) => {
    setLoading(true);

    fetch("http://localhost:4000/user/:userID/premium", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ premium }),
    })
      .then((response) => {
        if (response.ok) {
          if (premium) {
            navigate("/checkout");
          } else {
            navigate("/");
          }
        } else {
          console.log("Premium upgrade failed");
        }
      })
      .catch((error) => {
        console.error("Error upgrading to premium:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-red-100 shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl",
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
                "mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
            >
              {tier.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}