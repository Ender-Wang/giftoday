import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import filter from "../images/filter.png";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "./AuthContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiTwotoneCrown } from "react-icons/ai";
import { getUserID } from "../states/GlobalState";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [premium, setPremium] = useState("");
  const [id] = useState(getUserID);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user information from the backend
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
  }, [id]);

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

  const handleClick = (text) => {
    setSearchText(text);
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="w-full px-32 bg-themeColor-100">
      {/* Nav Bar */}
      <div className="flex justify-between items-center mb-8">
        {/* Logo */}
        <div className="flex">
          <Link to="/">
            <img src={logo} alt="Giftoday Logo" className="h-8" />
          </Link>
        </div>

        {/* Search Bar */}
        <div
          className="flex border-b-[1px] rounded-sm relative"
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex w-64">
            <input
              type="text"
              placeholder="Which gift for today?"
              className="px-2 py-1 text-white w-full italic bg-themeColor-100 rounded focus:outline-none focus:not-italic"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <img
              src={filter}
              alt="Search Icon"
              className="rounded-md mr-0 w-7 h-7"
              onClick={() => handleClick(searchText)}
              onMouseEnter={handleMouseEnter}
            />
          </div>
          {showDropdown && (
            <div className="rounded-md bg-white shadow-lg absolute top-[110%] left-90 right-0 z-10">
              <ul className="text-14px">
                <li onClick={() => handleClick("household")}>household</li>
                <li onClick={() => handleClick("game")}>game</li>
                <li onClick={() => handleClick("electronic product")}>
                  electronic product
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Premium Status or Login/Registration, Cart, Profile*/}
        <div className="flex items-center justify-end">
          {!isLoggedIn && (
            <>
              <div className="mr-4 py-1 rounded-md bg-[#892455]">
                <Link
                  to="/login"
                  className="text-white font-bold  rounded-md mr-2 ml-2"
                >
                  Login
                </Link>
              </div>
              <div className="mr-4 py-1 rounded-md bg-[#892455]">
                <Link
                  to="/registration"
                  className="text-white font-bold  rounded-md mr-2 ml-2"
                >
                  Registration
                </Link>
              </div>
            </>
          )}

          {isLoggedIn && (
            <>
              {/* Premium */}
              {premium ? (
                <div className="mr-4 py-1 rounded-md bg-[#5D487F]">
                  <Link
                    to="/premium-benefits"
                    className="text-yellow-400 font-bold rounded-md flex items-center mr-2 ml-2"
                  >
                    <AiTwotoneCrown
                      size={24}
                      className="text-yellow-400 justify-center"
                    />
                    Premium User
                  </Link>
                </div>
              ) : (
                <div className="mr-4 py-1 rounded-md bg-[#5D487F]">
                  <Link
                    to="/premium-benefits"
                    className="text-yellow-500 font-bold rounded-md mr-2 ml-2"
                  >
                    Join Premium
                  </Link>
                </div>
              )}

              {/* Cart */}
              <div className="mr-4 pt-2.5 items-center relative w-[50px] h-[50px]">
                <Link to="/checkout">
                  <AiOutlineShoppingCart
                    size={30}
                    className="text-white ml-2"
                  />
                </Link>
                <div className="absolute top-0 right-0 text-white">3</div>
              </div>

              {/* Profile */}
              <div className="mr-4" onMouseLeave={handleMouseLeave}>
                <Link
                  to="#"
                  className="text-white"
                  onClick={handleProfileClick}
                >
                  <FaUser size={24} className="text-white" />
                </Link>
                {showProfileMenu && (
                  <div className="mr-32 bg-themeColor-100 absolute rounded-md p-0.5 shadow--white-2xl">
                    <div className="text-white font-bold mt-0.5 mx-0.5 cursor-pointer">
                      <Link to="/profile">Profile</Link>
                    </div>
                    <div className="text-black font-bold mt-0.5 mx-0.5 cursor-pointer">
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
