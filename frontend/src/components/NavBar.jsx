import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { setSearchContent } from "../states/GlobalState";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "./AuthContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  AiTwotoneCrown,
  AiOutlineSearch,
  AiOutlineFilter,
} from "react-icons/ai";
import { getUserID } from "../states/GlobalState";

const Navbar = ({ onSearchClick, onFilterClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [premium, setPremium] = useState("");
  const [id] = useState(getUserID);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch user information from the backend
    if (isLoggedIn) {
      fetch(`http://localhost:4000/user/${id}/info`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const user = data[0];
            setPremium(user.premium);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching user info:", error);
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`http://localhost:4000/user/${id}/cart`)
        .then((response) => response.json())
        .then((data) => {
          // Retrieve the cart data from the response
          const cartData = data.cart;

          // Calculate the total quantity in the cart
          const totalCount = cartData.reduce(
            (total, gift) => total + gift.quantity,
            0
          );

          // Update the cart count with the total quantity
          setCartCount(totalCount);
        })
        .catch((error) => {
          console.log("Error fetching user cart:", error);
        });
    } else {
      setLoading(false);
    }
  }, [id, isLoggedIn]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
    setShowProfileMenu(false);
  };

  const handleClick = (result) => {
    setSearchText((prevText) => {
      if (prevText.length === 0) {
        return result;
      } else {
        const texts = prevText.split(";").map((text) => text.trim());
        if (texts.includes(result.trim())) {
          return prevText;
        } else {
          return `${prevText}; ${result}`;
        }
      }
    });
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    setShowProfileMenu(!showProfileMenu);
  };
  const handleSearchClick = (s) => {
    setSearchContent(s);
    onSearchClick(s);
  };
  return (
    <nav className="bg-themeColor-100 fixed z-50 h-[48px] w-full px-32 shadow-xl backdrop-blur-sm backdrop-invert backdrop-opacity-10">
      {/* Nav Bar */}
      <div className="mb-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex">
          <Link to="/giftoday.com">
            <img src={logo} alt="Giftoday Logo" className="h-8" />
          </Link>
        </div>

        {/* Search Bar */}
        <div
          className="relative flex rounded-sm border-b-[1px]"
          onMouseLeave={handleMouseLeave}
        >
          {/* filter */}
          <div className="flex">
            <button
              type="button"
              className="hover:scale-102 boarder boarder-lightButton hover:bg-normalButton transform rounded-lg pl-1 pr-1  text-white"
              onClick={onFilterClick}
            >
              <AiOutlineFilter className="text-2xl" />
            </button>
          </div>
          <div className="flex w-64">
            <input
              type="text"
              placeholder="Which gift for today?"
              className="bg-themeColor-100 w-full rounded px-2 py-1 italic text-white focus:not-italic focus:outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="button"
              className="hover:scale-102 boarder boarder-lightButton hover:bg-normalButton transform rounded-lg pl-1 pr-1  text-white"
              onClick={() => handleSearchClick(searchText)}
            >
              <AiOutlineSearch className="text-2xl" />
            </button>
          </div>
        </div>

        {/* {showDropdown && (
            <div className="left-90 absolute right-0 top-[110%] z-10">
              <div className="rounded-md bg-white p-2 shadow-lg">
                <ul className="text-14px">
                  <li onClick={() => handleClick("household")}>household</li>
                  <li onClick={() => handleClick("game")}>game</li>
                  <li onClick={() => handleClick("electronic product")}>
                    electronic product
                  </li>
                </ul>
              </div>
            </div>
          )}
        

        {/* Premium Status or Login/Registration, Cart, Profile*/}
        <div className="flex items-center justify-end">
          {!isLoggedIn && (
            <div className="flex pt-[8px]">
              <div className="bg-themeColor-60 mr-4 rounded-md py-1 transition duration-300 ease-in-out hover:scale-125">
                <Link
                  to="/giftoday.com/login"
                  className="ml-2 mr-2  rounded-md font-bold text-white transition duration-300 ease-in-out hover:text-black"
                >
                  Login
                </Link>
              </div>
              <div className="bg-themeColor-80 mr-4 rounded-md py-1 transition duration-300 ease-in-out hover:scale-125">
                <Link
                  to="/giftoday.com/registration"
                  className="ml-2 mr-2  rounded-md font-bold text-white transition duration-300 ease-in-out hover:text-black"
                >
                  Registration
                </Link>
              </div>
            </div>
          )}

          {isLoggedIn && (
            <>
              {/* Premium */}
              {premium ? (
                <div className="mr-4 rounded-md bg-purple-400 py-1">
                  <Link
                    to="/giftoday.com/premium-benefits"
                    className="ml-2 mr-2 flex items-center rounded-md font-bold text-yellow-400"
                  >
                    <AiTwotoneCrown
                      size={24}
                      className="animate-pulse justify-center text-yellow-400 hover:scale-125"
                    />
                    Premium User
                  </Link>
                </div>
              ) : (
                <div className="mr-4 rounded-md py-1 transition duration-300 ease-in-out hover:scale-125 hover:bg-yellow-400 hover:text-white">
                  <Link
                    to="/giftoday.com/premium-benefits"
                    className="ml-2 mr-2 animate-pulse rounded-md font-bold text-yellow-400 hover:text-white"
                  >
                    Join Premium
                  </Link>
                </div>
              )}

              {/* Cart */}
              <div className="relative mr-4 h-[50px] w-[50px] items-center pt-2.5">
                <Link to="/giftoday.com/checkout">
                  <AiOutlineShoppingCart
                    size={30}
                    className="ml-2 text-white transition duration-300 ease-in-out hover:scale-125 hover:text-black"
                  />
                </Link>
                <div className="absolute right-0 top-0 text-white">
                  {cartCount}
                </div>
              </div>

              {/* Profile */}
              <div className="mr-4">
                <Link
                  to="#"
                  className="text-white"
                  onClick={handleProfileClick}
                >
                  {/* Profile icon */}
                  <FaUser
                    size={24}
                    className="text-white transition duration-300 ease-in-out hover:scale-125 hover:text-black"
                  />
                </Link>
                {showProfileMenu && (
                  <div
                    className="bg-themeColor-100 absolute top-5 z-10 mr-32 mt-[20px] flex flex-col rounded-md p-0.5 shadow-xl"
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className=" rounded-md py-0.5 text-center font-bold text-white transition duration-300 ease-in-out hover:cursor-pointer hover:text-black">
                      <Link to="/giftoday.com/profile">Profile</Link>
                    </div>
                    <div className="mt-0.5 rounded-md px-1 text-center font-bold text-black transition duration-300 ease-in-out hover:cursor-pointer hover:text-red-500">
                      <button onClick={logout}>Logout</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
