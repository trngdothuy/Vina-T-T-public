import React, { useState, useEffect } from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Home from "./containers/Home.js";
import Login from "./containers/Login.js";
import Register from "./containers/Register.js";
import Cart from "./containers/Cart.js";
import ContactUs from "./containers/ContactUs.js";
import FactoryTour from "./containers/FactoryTour.js";
import Products from "./containers/Products.js";
import Tips from "./containers/Tips.js";
import Internal from "./containers/Internal.js";
import Account from "./containers/Account.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import "./App.css";
import { URL } from "./config";
// import {useLocation, useNavigate} from 'react-router-dom';
import useStateWithCallback from "use-state-with-callback";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);// normal value is null

  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  const [admin, setAdmin] = useState(false)
  const [cart, setCart] = useStateWithCallback(JSON.parse(localStorage.getItem("cart")) || [], cart => {console.log(cart);});

  const [category, setCategory] = useState([])
  const [product, setProduct] = useState(null)
  const [singlecategory, setSinglecategory] = useState(null)
  const [user, setUser] = useState()
  const [userEmail, setUserEmail] = useStateWithCallback(JSON.parse(localStorage.getItem('userEmail')))
  const [newUser, setNewUser] = useStateWithCallback({...user},()=>{console.log(newUser)})


  // const location = useLocation();
  // console.log(location.state)

  useEffect(
    () => {
      const verify_token = async () => {
        // debugger
        try {
          if (!token) {
            setIsLoggedIn(false) // should be false
          }else {
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`${URL}/users/verify-token`);
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

  const login = (token,admin,email) => {
    // debugger
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
    if (admin) {
      setAdmin(true)
    }
  };
  const logout = () => {
    // debugger
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.removeItem("userEmail");
  };
  const findProduct = async product => {
    try {
      // debugger
        const res = await axios.get(`${URL}/product/${product}`);
    //  console.log(res)
        setProduct(res.data.data)
        let index = category.findIndex((element) => element.category === res.data.data.category) 
    setSinglecategory(category[index])
        // console.log(res.data.data)
    } catch (error) {
        console.log(error);
    }
    };
  const findUser = async user => {
    try {
      // debugger
        const res = await axios.get(`${URL}/users/${user}`);
        console.log('this is res after finding')
     console.log(res)
        setUser(res.data.data)
        console.log('this is user after finding')
        console.log(res.data.data)
    } catch (error) {
        console.log(error);
    }
    };
  const updateUser = async (user,newUser) => {
    try {
      // debugger
        const res = await axios.post(`${URL}/users/update`,{user,newUser});
        console.log('this is res after updating')
        console.log(res)
        setUser(res.data.data)
        console.log('this is user after updating')
        console.log(res.data.data)
    } catch (error) {
        console.log(error);
    }
    };

  return (
    <Router>
    <Navbar isLoggedIn={isLoggedIn} cart={cart}/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/products" 
    element={<Products cart={cart} setCart={setCart} findProduct={findProduct} setCategory={setCategory} category={category} singlecategory={singlecategory} product={product} />} />
    <Route path="/factorytour" element={<FactoryTour/>} />
    <Route path="/tips" element={<Tips/>} />
    <Route path="/contact-us" element={<ContactUs/>} />
    <Route
    path="/login"
    element ={ isLoggedIn ? <Navigate to='/cart' /> : <Login login={login} userEmail={userEmail} setUserEmail={setUserEmail} findUser={findUser} /> } 
    />
    <Route
    path="/register"
    element ={ isLoggedIn ? <Navigate to='/cart' /> : <Register  /> } 
    />
    <Route
    path="/cart"
    element ={<Cart cart={cart} setCart={setCart} singlecategory={singlecategory} /> } 
    />
    <Route
    path="/account"
    element ={ !isLoggedIn ? <Navigate to='/' /> : <Account logout={logout} findUser={findUser} user={user} setUser={setUser} userEmail={userEmail} updateUser={updateUser} newUser={newUser} setNewUser={setNewUser}/> } 
    />
    <Route
    path="/internal"
    element ={ !isLoggedIn || !admin ? <Navigate to='/' /> : <Internal logout={logout}  /> } 
    />
    </Routes>
    <Footer/>
    </Router>
    );
}

export default App;
