import React from "react";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import { getUserID } from "../states/GlobalState";

export default function ShopItem({
  selectedTag,
  searchContent,
  showFilter,
  selectedHoliday,
  selectedButton,
}) {
  const { isLoggedIn } = useContext(AuthContext);
  const [shopItems, setShopItems] = useState([]);
  const [isPremium, setPremium] = useState(false);
  const userID = getUserID();
  let search = searchContent;

  const categories = [
    "home_decor",
    "kitchen",
    "stationery",
    "beauty",
    "accessories",
    "books",
    "food",
    "electronics",
    "tools",
    "fitness",
    "travel",
  ];
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [filterCategories, setFilterCategories] = useState(categories);

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

  const filterOnHoliday = (items, text) => {
    if (text === "" || text === null) return items;
    if (text === "World Children's Day") {
      return items.filter(
        (item) =>
          item.tag.toLowerCase().includes("stationery") ||
          item.tag.toLowerCase().includes("electronics") ||
          item.tag.toLowerCase().includes("books")
      );
    }
    if (text === "Christmas Day" || text === "2nd Day of Christmas") {
      return items.filter(
        (item) =>
          item.tag.toLowerCase().includes("home_decor") ||
          item.tag.toLowerCase().includes("kitchen") ||
          item.tag.toLowerCase().includes("books") ||
          item.tag.toLowerCase().includes("food") ||
          item.tag.toLowerCase().includes("fitness")
      );
    }

    if (text === "Labour Day") {
      return items.filter(
        (item) =>
          item.tag.toLowerCase().includes("home_decor") ||
          item.tag.toLowerCase().includes("kitchen") ||
          item.tag.toLowerCase().includes("books") ||
          item.tag.toLowerCase().includes("food") ||
          item.tag.toLowerCase().includes("fitness") ||
          item.tag.toLowerCase().includes("tools")
      );
    }
    return items.filter(
      (item) =>
        item.tag.toLowerCase().includes("home_decor") ||
        item.tag.toLowerCase().includes("kitchen") ||
        item.tag.toLowerCase().includes("books") ||
        item.tag.toLowerCase().includes("travel")
    );
  };

  const filterOnSearch = (items, text) => {
    if (text === "" || text === null) return items;
    return items.filter(
      (item) =>
        item.tag.toLowerCase().includes(text.toLowerCase()) ||
        item.name.toLowerCase().includes(text.toLowerCase())
    );
  };

  const filterOnCategories = (items, categories) => {
    if (categories === "" || categories === null) return items;
    return items.filter((item) => categories.includes(item.tag.toLowerCase()));
  };
  const applyFilter = () => {
    setFilterCategories(selectedCategories);
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
        window.location.reload();
      } else {
        console.log("Putting into cart failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deselectAll = () => {
    setFilterCategories([]);
    setSelectedCategories([]);
  };

  const selectAll = () => {
    setFilterCategories(categories);
    setSelectedCategories(categories);
  };

  return (
    <div>
      {/* category filter */}
      <div className="relative p-2 ">
        {showFilter && (
          <div className="pt-10">
            <button
              className="hover:scale-102 text-gray-250 mr-2 transform rounded-lg   text-sm"
              onClick={deselectAll}
            >
              Deselect all
            </button>
            <button
              className="hover:scale-102 text-gray-250 ml-2 transform rounded-lg text-sm"
              onClick={selectAll}
            >
              Select all
            </button>
            <table className="table-auto">
              <thead>
                <tr>
                  {categories.map((item) => (
                    <th className="px-2" key={item}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {categories.map((item) => (
                    <td key={item} className="text-center">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        checked={selectedCategories.includes(item)}
                        onChange={() => handleCategorySelect(item)}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <span className="flex justify-center">
              <button
                className="hover:scale-102 transform rounded-lg bg-lightButton px-2  py-1 text-sm hover:bg-normalButton"
                onClick={applyFilter}
              >
                Apply Filter
              </button>
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-x-20 gap-y-8 py-8">
        {/* {filterTag(shopItems, selectedTag).map((item) => ( */}
        {selectedButton === "Button 1"
          ? filterOnHoliday(
              filterOnCategories(
                filterOnSearch(shopItems, search),
                filterCategories
              ),
              selectedHoliday
            ).map((item) => (
              <div
                key={item.id}
                className="h-auto max-h-[350px] min-h-[320px] w-auto min-w-[220px] max-w-[250px] transform rounded-xl px-3 py-1 shadow-md duration-300 hover:scale-105 hover:border-2 hover:shadow-none"
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
                <div className="line-clamp-2 pt-1 text-sm text-lightFontColor">
                  {item.description}
                </div>

                {/* product price */}
                <div className="flex flex-row justify-around pt-2">
                  {!isPremium && (
                    <span className="font-bold text-lightFontColor">
                      € {item.price}
                    </span>
                  )}
                  {isPremium && (
                    <div className="flex flex-1 justify-between pr-12 font-bold">
                      <span className=" pt-0.5 line-through">
                        €{item.price}
                      </span>
                      <span className=" text-sm text-red-600">-10%</span>
                      <span className=" text-xl  font-bold  text-orangeFontColor ">
                        €{item.price * 0.9}
                      </span>
                    </div>
                  )}
                  {isLoggedIn && (
                    <div
                      className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-normalPlusButton"
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
            ))
          : filterTag(
              filterOnCategories(
                filterOnSearch(shopItems, search),
                filterCategories
              ),
              selectedTag
            ).map((item) => (
              <div
                key={item.id}
                className="h-auto max-h-[350px] min-h-[320px] w-auto min-w-[220px] max-w-[250px] transform rounded-xl px-3 py-1 shadow-md duration-300 hover:scale-105 hover:border-2 hover:shadow-none"
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
                <div className="line-clamp-2 pt-1 text-sm text-lightFontColor">
                  {item.description}
                </div>

                {/* product price */}
                <div className="flex flex-row justify-around pt-2">
                  {!isPremium && (
                    <span className="font-bold text-lightFontColor">
                      € {item.price}
                    </span>
                  )}
                  {isPremium && (
                    <div className="flex flex-1 justify-between pr-12 font-bold">
                      <span className=" pt-0.5 line-through">
                        €{item.price}
                      </span>
                      <span className=" text-sm text-red-600">-10%</span>
                      <span className=" text-xl  font-bold  text-orangeFontColor ">
                        €{item.price * 0.9}
                      </span>
                    </div>
                  )}
                  {isLoggedIn && (
                    <div
                      className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-normalPlusButton"
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
            ))}
      </div>
    </div>
  );
}
