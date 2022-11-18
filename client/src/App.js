import React from "react";
// importing Router, Route and Routes elements from the router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Profile from "./Profile";
import Navbar from "./Navbar";

// import "./styles.css";

export default function App() {
  return (
    <div className="App">
{/* Declaring the router which will hold al the routes/URLs*/}
      <Router>
{/* We need to use the Routes wrapper */}
				<Navbar />
        <Routes>
{/* For every URL we can render a separate component */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}