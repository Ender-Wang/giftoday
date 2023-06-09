import React, { useState } from "react";
import { useEffect } from "react";

export default function ShopItem() {
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
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
              <div>{item.name}</div>
              <div> € {item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
