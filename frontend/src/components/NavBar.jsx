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
    <nav className="w-full h-16 fffff flex justify-between items-center shadow-lg mb-8">
      <div className="ml-4">
        <Link to="/" className="text-white text-xl font-bold">
          <img src={logo} alt="My Website Logo" className="h-8" />
        </Link>
      </div>

      <div className="flex items-center">
        <div
          className="flex mr-4 border-2 rounded-md relative"
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex search-container">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 text-black bg-white rounded-md"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <img
              src={filter}
              alt="Search Icon"
              className="flex search-icon rounded-md"
              style={{ marginLeft: "-30px", width: "30px", height: "30px" }}
              onClick={() => handleClick(searchText)}
              onMouseEnter={handleMouseEnter}
            />
          </div>
          {showDropdown && (
            <div
              className="dropdown-menu border-2 rounded-md"
              style={{
                backgroundColor: "#ffffff",
                position: "absolute",
                top: "110%",
                left: 90,
                right: 0,
                zIndex: 999,
              }}
            >
              <ul className="dropdown-menu-list" style={{ fontSize: "14px" }}>
                <li
                  className="dropdown-menu-item break-words leading-4 mt-2 ml-2 cursor-pointer"
                  onClick={() => handleClick("household")}
                >
                  household
                </li>
                <li
                  className="dropdown-menu-item break-words leading-4 mt-2 ml-2 cursor-pointer"
                  onClick={() => handleClick("game")}
                >
                  game
                </li>
                <li
                  className="dropdown-menu-item break-words leading-4 mt-2 ml-2 mb-2 cursor-pointer"
                  onClick={() => handleClick("electronic product")}
                >
                  electronic product
                </li>
              </ul>
            </div>
          )}
        </div>

        {!isLoggedIn && (
          <>
            <div
              className="mr-4 py-1 border-2 rounded-md"
              style={{ backgroundColor: "#892455" }}
            >
              <Link
                to="/login"
                className="text-white font-bold  rounded-md mr-2 ml-2"
              >
                Login
              </Link>
            </div>
            <div
              className="mr-4 py-1 border-2 rounded-md"
              style={{ backgroundColor: "#892455" }}
            >
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
            {premium ? (
              <div
                className="mr-4 py-1 border-2 rounded-md"
                style={{ backgroundColor: "#5D487F" }}
              >
                <Link
                  to="/premium-benefits"
                  className="text-yellow-400 font-bold rounded-md flex items-center mr-2 ml-2"
                >
                  <AiTwotoneCrown
                    size={24}
                    style={{ color: "yellow", marginRight: "0.5rem" }}
                  />
                  Premium User
                </Link>
              </div>
            ) : (
              <div
                className="mr-4 py-1 border-2 rounded-md"
                style={{ backgroundColor: "#5D487F" }}
              >
                <Link
                  to="/premium-benefits"
                  className="text-yellow-500 font-bold rounded-md mr-2 ml-2"
                >
                  Join Premium
                </Link>
              </div>
            )}

            <div
              className="mr-4 py-2.5 rounded-md"
              style={{
                border: "1px solid SteelBlue ",
                width: "50px",
                height: "50px",
                borderRadius: "80%",
                position: "relative",
              }}
            >
              <Link to="/checkout" className="rounded-md">
                <AiOutlineShoppingCart
                  size={30}
                  color="#4682B4"
                  style={{ marginLeft: "6.5px" }}
                />
              </Link>
              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  borderRadius: "80%",
                  backgroundColor: "FireBrick ",
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                3
              </div>
            </div>

            <div
              className="mr-4 py-1 rounded-md"
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="#"
                className="text-white font-bold rounded-md mr-2 ml-2"
                onClick={handleProfileClick}
              >
                <FaUser size={24} color="#892455" />
              </Link>
              {showProfileMenu && (
                <div
                  className="dropdown-menu rounded-md"
                  style={{
                    backgroundColor: "#892455",
                    position: "absolute",
                    top: "5%",
                    right: 5,
                    zIndex: 999,
                  }}
                >
                  <ul
                    className="dropdown-menu-list"
                    style={{ fontSize: "14px" }}
                  >
                    <li className="dropdown-menu-item break-words text-white font-bold leading-1 mt-0.5 ml-0.5 mr-0.5 cursor-pointer">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li className="dropdown-menu-item break-words text-white font-bold leading-1 mt-0.5 ml-0.5 mr-0.5 mb-0.5 cursor-pointer">
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
