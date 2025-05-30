import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Cart from "./components/Cart";
import LandingPage from "./pages/LandingPage";
import MyOrders from "./pages/MyOrders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./components/Navbar";
import SignUp from "./pages/SignUp";

import AdminHome from "./pages/Admin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  let authenticated = false;
  const authenticate = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/api/validateToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    authenticated = res.json().response.success;
    return authenticated;
  };
  useEffect(() => {
    if (token !== null && authenticate()) {
      navigate("/home");
    }
  }, []);

  return (
    // <CartProvider >
    //  {/* <Router > */}
    <div>
      <Nav />
      <LandingPage />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/myorders" element={<MyOrders />} />
        <Route exact path="/adminHome" element={<AdminHome />} />
      </Routes>
      {/* <Footer /> */}
    </div>
    // </Router>
    // </CartProvider>
  );
}
