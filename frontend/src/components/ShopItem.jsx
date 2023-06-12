import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import { getUserID } from "../states/GlobalState";

export default function ShopItem() {
  const { isLoggedIn } = useContext(AuthContext);
  const [shopItems, setShopItems] = useState([]);
  const [cart, setCart] = useState([]);
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
    const fetchPremium = async () => {
      // console.log("shopItems: " + shopItems);
      try {
        const response = await fetch(
          "http://localhost:4000/user/" + userID + "/premium",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          setPremium(response.json());
        } else {
          console.log("Fetching data failed.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchShopItems();
    fetchPremium();
  }, []);

  return (
    <div className="h-600 ">
      <div className=" absolute bottom-16 right-20 h-3/4 w-3/5 overflow-y-auto ">
        <div className="grid grid-cols-3 grid-rows-2 gap-16 p-10  ">
          {shopItems.map((item) => (
            <div
              key={item.id}
              className="h-64  transform rounded-xl shadow-xl hover:scale-110"
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
                    onClick={setCart}
                  >
                    <AiOutlinePlus className="text-xl text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
