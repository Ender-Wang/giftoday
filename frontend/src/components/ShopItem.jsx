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
          console.log(responseData);
        } else {
          console.log("Fetching data failed.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const loadImage = async (picture) => {
    try {
      const image = await import(`${picture}`);
      return image.default;
    } catch (error) {
      console.log(error);
    }
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
              <div>
                <img src={loadImage(item.picture)} alt="Product" />
              </div>

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
