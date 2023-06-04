import React, { useState } from "react";
import { useEffect } from "react";

export default function ShopItem() {
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("shopItems: " + shopItems);
    fetch("http://localhost:4000/shopItems", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setShopItems(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-600 ">
      <div className=" h-3/4 absolute bottom-16 right-20 w-3/5 border overflow-y-auto ">
        <div className="grid grid-cols-3 gap-20 grid-rows-2  ">
          {shopItems.map((item) => (
            <div
              key={item.id}
              className="border h-64 shadow-md rounded-lg transform hover:scale-105"
            >
              <div>{item.name}</div>
              <div>{item.description}</div>
              <div>{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
