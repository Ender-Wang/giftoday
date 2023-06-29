import React from "react";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import { getSearchContent, getUserID } from "../states/GlobalState";

export default function ShopItem({ selectedTag }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [shopItems, setShopItems] = useState([]);
  const [isPremium, setPremium] = useState(false);
  const userID = getUserID();
  let searchContent = getSearchContent();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
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

  const filterOnSearch = (items, text) => {
    console.log(text);
    if (text === "" || text === null) return items;
    return items.filter(
      (item) =>
        item.tag.toLowerCase().includes(text.toLowerCase()) ||
        item.name.toLowerCase().includes(text.toLowerCase())
    );
  };

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
        console.log("Adding to cart succeeded!");
      } else {
        console.log("Putting into cart failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="relative p-2">
        <button
          className="rounded bg-white px-4 py-2 focus:outline-none"
          onClick={toggleFilter}
        >
          Filter
        </button>
        {isOpen && (
          <div className="p-min-[20px] ">
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="px-2">Electronics</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Electronics")}
                      onChange={() => handleCategorySelect("Electronics")}
                    />
                  </td>
                  <td className="px-2">Home Appliances</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Home Appliances")}
                      onChange={() => handleCategorySelect("Home Appliances")}
                    />
                  </td>
                </tr>
                {/* Add more rows for other categories */}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-8 ">
        {/* {filterTag(shopItems, selectedTag).map((item) => ( */}
        {filterTag(filterOnSearch(shopItems, searchContent), selectedTag).map(
          (item) => (
            <div
              key={item.id}
              className="h-[350px] w-[250px] transform rounded-xl px-3 py-1 shadow-md duration-300 hover:scale-105 hover:border-2 hover:shadow-none"
            >
              {/* product picture */}
              <div className="">
                <img
                  src={
                    "https://github.com/Ender-Wang/giftoday/blob/master/frontend/src/images/shopItems/" +
                    item.image +
                    "?raw=true"
                  }
                  className="aspect-square h-full w-full rounded-md object-cover"
                  alt={item.name}
                  title={item.description}
                />
              </div>

              {/* product name */}
              <div className="line-clamp-1 pt-2 font-bold">{item.name}</div>

              {/* product description */}
              <div className="text-lightFontColor line-clamp-2 pt-1 text-sm">
                {item.description}
              </div>

              {/* product price */}
              <div className="flex flex-row justify-between pt-2">
                {!isPremium && (
                  <span className="text-lightFontColor font-bold">
                    € {item.price}
                  </span>
                )}
                {isPremium && (
                  <div className="flex flex-1 justify-between pr-12 font-bold">
                    <span className=" pt-0.5 line-through">€{item.price}</span>
                    <span className=" text-xl text-red-600">-10%</span>
                    <span className=" text-orangeFontColor  text-xl  font-bold ">
                      €{item.price * 0.9}
                    </span>
                  </div>
                )}
                {isLoggedIn && (
                  <div
                    className="bg-normalPlusButton flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
                    onClick={() => {
                      handleCartButton(item);
                      // window.location.reload();
                    }}
                  >
                    <AiOutlinePlus className="text-2xl text-white" />
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
