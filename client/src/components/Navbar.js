import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({isLoggedIn}) => {

  return (
    <div className="navbar">
    <NavLink 
    to={"/"}
      style={ ({isActive}) => (
    isActive ? linkStyles.activeLink : linkStyles.defaultLink
  )}>
    Home
    </NavLink>

    <NavLink
      to="/products"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Products
      </NavLink>

      <NavLink
      to="/factorytour"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Factory Tour
      </NavLink>

      <NavLink
      to="/tips"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Tips
      </NavLink>

      <NavLink
      to="/contact-us"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Contact Us
      </NavLink>

    {isLoggedIn===false
      && <>
      <NavLink
      to="/register"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Register
      </NavLink>


      <NavLink
      to="/login"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Login
      </NavLink>
      </>
    }

    {isLoggedIn===true &&
      <NavLink  
      to="/account"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Account
      </NavLink>
        }
      </div>
      );
}

export default Navbar;

const linkStyles = {
  activeLink: {
    color: "gray",
  },
  defaultLink: {
    textDecoration: "none",
    color: "white",
  },
};
