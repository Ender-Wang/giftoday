import React, { useState } from "react";
import { useEffect } from "react";

export default function ShopItem() {
  // const [shopItems, setShopItems] = useState();
  const shopItems = [1, 2, 3, 4, 5, 6, 7, 8];
  // useEffect(() => {
  //   fetch("http://localhost:4000/user/registration", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     })});
  return (
    <div className="h-600 ">
      <div className=" h-3/4 absolute bottom-16 right-20 w-3/5 border overflow-y-auto ">
        <div className="grid grid-cols-3 gap-20 grid-rows-2  ">
          {shopItems.map((index, item) => (
            <div className="border h-64 shadow-md rounded-lg transform hover:scale-105">
              <div key={index}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
