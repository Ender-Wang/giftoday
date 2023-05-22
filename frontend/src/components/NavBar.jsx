import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import filter from "../images/filter.png";

const Navbar = () => {
  return (
    <nav className="w-full h-16 fffff flex justify-between items-center">
      <div className="ml-4">
        <Link to="/" className="text-white text-xl font-bold">
          <img src={logo} alt="My Website Logo" className="h-8" />
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex mr-4 border-2 rounded-md">
          <div className="flex search-container ">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 text-white bg-gray-600 rounded-md"
            />
            <img
              src={filter}
              alt="Search Icon"
              className="flex search-icon rounded-md"
              style={{ marginLeft: "-34px",width: '30px', height: '30px'  }}
            />
          </div>
        </div>

        <div className="mr-4 border-2 rounded-md">
          <Link
            to="/loginpage"
            className="text-white font-bold border-2 rounded-md bg-pink-500"
          >
            Login
          </Link>
        </div>
        <div className="mr-4 border-2 rounded-md">
          <Link
            to="/registrationpage"
            className="text-white font-bold border-2 rounded-md bg-pink-500"
          >
            Registration
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
