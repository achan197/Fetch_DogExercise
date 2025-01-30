import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav_container">
      <nav className="navbar">
        <div className="logo"></div>
        <div className="nav_menu">
          <ul className="nav_list">
            <li>
              <NavLink className="nav_link" to={"/"}>
                <h6>Home</h6>
              </NavLink>
            </li>
            {/* <li>
              <NavLink className="nav_link" to={"/dogs"}>
                <h6>Find Dogs</h6>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
