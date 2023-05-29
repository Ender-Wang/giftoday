import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import filter from "../images/filter.png";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

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
    <nav className="w-full h-16 fffff flex justify-between items-center">
      <div className="ml-4">
        <Link to="/" className="text-white text-xl font-bold">
          <img src={logo} alt="My Website Logo" className="h-8" />
        </Link>
      </div>

      <div className="flex items-center">
        <div
          className="flex mr-4 border-2 rounded-md"
          style={{ position: "relative" }}
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
                  className="dropdown-menu-item"
                  style={{
                    wordWrap: "break-word",
                    lineHeight: "1",
                    marginTop: "0.5em",
                    marginLeft: "0.5em",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick("household")}
                >
                  household
                </li>
                <li
                  className="dropdown-menu-item"
                  style={{
                    wordWrap: "break-word",
                    lineHeight: "1",
                    marginTop: "0.5em",
                    marginLeft: "0.5em",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick("game")}
                >
                  game
                </li>
                <li
                  className="dropdown-menu-item"
                  style={{
                    wordWrap: "break-word",
                    lineHeight: "1",
                    marginTop: "0.5em",
                    marginLeft: "0.5em",
                    marginBottom: "0.5em",
                    cursor: "pointer",
                  }}
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
                    <li
                      className="dropdown-menu-item"
                      style={{
                        wordWrap: "break-word",
                        color: "#ffffff",
                        fontWeight: "bold",
                        lineHeight: "1",
                        marginTop: "0.5em",
                        marginLeft: "0.5em",
                        marginRight: "0.5em",
                        cursor: "pointer",
                      }}
                    >
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li
                      className="dropdown-menu-item"
                      style={{
                        wordWrap: "break-word",
                        color: "#ffffff",
                        fontWeight: "bold",
                        lineHeight: "1",
                        marginTop: "0.5em",
                        marginLeft: "0.5em",
                        marginRight: "0.5em",
                        marginBottom: "0.5em",
                        cursor: "pointer",
                      }}
                    >
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
