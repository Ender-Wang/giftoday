import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import { getUserID } from "../states/GlobalState";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export default function ShopItem() {
=======
export default function ShopItem({ selectedTag, searchContent }) {
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
export default function ShopItem({ selectedTag, searchContent }) {
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
export default function ShopItem({ selectedTag, searchContent }) {
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
  const { isLoggedIn } = useContext(AuthContext);
  const [shopItems, setShopItems] = useState([]);
  const [isPremium, setPremium] = useState(false);
  const userID = getUserID();
  useEffect(() => {
    const fetchShopItems = async () => {
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

  const filterTag = (items, tag) => {
    // console.log(searchContent);
    if (tag === "home")
      return items.filter(
        (item) => item.tag === "home_decor" || item.tag === "kitchen"
      );
    if (tag === "beauty") return items.filter((item) => item.tag === "beauty");
    if (tag === "lifestyle")
      return items.filter(
        (item) =>
          item.tag === "accessories" ||
          item.tag === "stationery" ||
          item.tag === "books" ||
          item.tag === "travel"
      );
    if (tag === "technology")
      return items.filter(
        (item) => item.tag === "tools" || item.tag === "electronics"
      );
    if (tag === "health")
      return items.filter(
        (item) => item.tag === "fitness" || item.tag === "food"
      );
    return items;
  };

  // const filterOnSearch = (items, text) => {
  //   console.log(text);
  //   if (text === "") return items;
  //   return items.filter(
  //     (item) =>
  //       item.tag.toLowerCase().includes(text.toLowerCase()) ||
  //       item.name.toLowerCase().includes(text.toLowerCase())
  //   );
  // };

  // const filteredItems = filterTag(shopItems, selectedTag);
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
        console.log("Adding to cart succeeded!");
      } else {
        console.log("Putting into cart failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-16 p-10  ">
<<<<<<< HEAD
      {shopItems.map((item) => (
        <div
          key={item.id}
          className="h-64 min-w-[100px]  transform rounded-xl shadow-xl hover:scale-110"
=======
      {/* {filterTag(shopItems, selectedTag).map((item) => ( */}
      {filterTag(shopItems, selectedTag).map((item) => (
        <div
          key={item.id}
          className="h-[300px] w-[250px] transform rounded-xl shadow-xl duration-300 hover:scale-110"
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            />
          </div>
          {/* product name */}
          <div className="font-bold">{item.name}</div>
          {/* product price */}
          <div className="flex flex-row pl-2 ">
            {!isPremium && (
              <span className="basis-5/6 font-bold text-lightFontColor">
=======
              title={item.description}
            />
          </div>
          {/* product name */}
=======
              title={item.description}
            />
          </div>
          {/* product name */}
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
              title={item.description}
            />
          </div>
          {/* product name */}
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
          <div className="ml-2 font-bold">{item.name}</div>
          {/* product price */}
          <div className="flex flex-row pl-2 ">
            {!isPremium && (
              <span className="ml-2 basis-5/6 font-bold text-lightFontColor">
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                onClick={() => {
                  handleCartButton(item);
                  // window.location.reload();
                }}
=======
                onClick={() => handleCartButton(item)}
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
                onClick={() => handleCartButton(item)}
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
                onClick={() => handleCartButton(item)}
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
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
