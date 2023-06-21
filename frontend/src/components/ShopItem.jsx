import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import { getUserID } from "../states/GlobalState";

export default function ShopItem() {
  const { isLoggedIn } = useContext(AuthContext);
  const [shopItems, setShopItems] = useState([]);
  const [isPremium, setPremium] = useState(false);
  const userID = getUserID();
  useEffect(() => {
    const fetchShopItems = async () => {
      // console.log("shopItems: " + shopItems);
      try {
        const response = await fetch("http://localhost:4000/shopItems", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const responseData = await response.json();
          setShopItems([...responseData]);
        } else {
          console.log("Fetching data failed.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopItems();
  }, []);

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
    if (isLoggedIn) fetchPremium();
  }, [userID, isPremium, isLoggedIn]);

  const handleCartButton = async (item) => {
    const data = {
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price,
      tag: {
        id: 1,
        name: item.tag,
      },
    };
    try {
      const response = await fetch(
        "http://localhost:4000/user/" + userID + "/cart",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const result = await response.json();
        alert("successful put into cart!");
        window.location.reload();
        console.log(result);
      } else {
        alert("Putting into cart failed!");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while processing the request.");
    }
  };
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-16 p-10  ">
      {shopItems.map((item) => (
        <div
          key={item.id}
          className="h-64 min-w-[100px]  transform rounded-xl shadow-xl hover:scale-110"
        >
          {/* product picture */}
          <div className="pl-4 pr-4">
            <img
              src={
                "https://github.com/Ender-Wang/giftoday/blob/master/frontend/src/images/shopItems/" +
                item.image +
                "?raw=true"
              }
              className="h-full w-full object-cover"
              style={{ aspectRatio: "1/1" }}
              alt={item.name}
            />
          </div>
          {/* product name */}
          <div className="font-bold">{item.name}</div>
          {/* product price */}
          <div className="flex flex-row pl-2 ">
            {!isPremium && (
              <span className="basis-5/6 font-bold text-lightFontColor">
                € {item.price}
              </span>
            )}
            {isPremium && (
              <div className="basis-5/6 font-bold text-lightFontColor ">
                <span className="line-through">€ {item.price}</span>
                <span className=" ml-4 basis-5/6 text-xl font-bold text-orangeFontColor ">
                  € {item.price * 0.9}
                </span>
              </div>
            )}
            {isLoggedIn && (
              <div
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-normalPlusButton"
                onClick={() => handleCartButton(item)}
              >
                <AiOutlinePlus className="text-xl text-white" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
