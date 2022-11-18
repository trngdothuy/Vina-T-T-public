import React, { useState, useEffect } from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Home from "./containers/Home.js";
import Login from "./containers/Login.js";
import Register from "./containers/Register.js";
import Account from "./containers/Account.js";
import ContactUs from "./containers/ContactUs.js";
import FactoryTour from "./containers/FactoryTour.js";
import Products from "./containers/Products.js";
import Tips from "./containers/Tips.js";
import Navbar from "./components/Navbar.js";

import { URL } from "./config";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  useEffect(
    () => {
      const verify_token = async () => {
        debugger
        try {
          if (!token) {
            setIsLoggedIn(false)
          }else {
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`${URL}/users/verify_token`);
          return response.data.ok ? login(token) : logout();
          }
        } catch (error) {
          console.log(error);
        }
      };
      verify_token();
    },
    [token]
    );

  const login = (token) => {
    debugger
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
  };
  const logout = () => {
    debugger
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <Router>
    <Navbar  isLoggedIn={isLoggedIn}/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/products" element={<Products/>} />
    <Route path="/factory-tour" element={<FactoryTour/>} />
    <Route path="/tips" element={<Tips/>} />
    <Route path="/contact-us" element={<ContactUs/>} />
    <Route
    path="/login"
    element ={ isLoggedIn ? <Navigate to='/account' /> : <Login login={login} /> } 
    />
    <Route
    path="/register"
    element ={ isLoggedIn ? <Navigate to='/account' /> : <Register  /> } 
    />
    <Route
    path="/account"
    element ={ !isLoggedIn ? <Navigate to='/' /> : <Account logout={logout}  /> } 
    />
    </Routes>
    </Router>
    );
}

export default App;
