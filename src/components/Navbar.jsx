import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navcss from "../css/Navbar.css";
import { useCart } from "./ContextReducer";

function Nav() {
  const [click, setClick] = React.useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setClick(!click);
  };
  const Close = () => setClick(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthenticated(false);
    navigate("/");
  };
  const showCart = () => {
    navigate("/cart");
  };

  const cartItems = useCart();
  const [data, setData] = useState(cartItems);
  // let userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("authToken");
  const authenticate = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/api/validateToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const x = await res.json();
    setAuthenticated(x.success);
  };
  if (token !== null) {
    authenticate();
  }
  useEffect(() => {
    setData(cartItems);
  }, [cartItems, click]);
  if (window.location.pathname !== "/adminHome") {
    return (
      <div>
        <div className={click ? "main-container" : ""} onClick={() => Close()} />
        <nav className="navbar" onClick={(e) => e.stopPropagation()}>
          <div className="nav-container">
            <div exact to="/" className="nav-logo">
              <h2>FastFood</h2>
            </div>
            {!authenticated ? (
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={click ? { handleClick } : null}
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-links" to="/login" onClick={click ? handleClick : null}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    exact
                    to="/contact"
                    activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            ) : (
              <div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                  <li className="nav-item">
                    <button
                      className="nav-links"
                      onClick={() => {
                        navigate("/home");
                        handleClick();
                      }}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        height: "",
                      }}
                    >
                      Home
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-links"
                      onClick={() => {
                        navigate("/myorders");
                        handleClick();
                      }}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        height: "",
                      }}
                    >
                      Myorders
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-links"
                      onClick={() => {
                        showCart();
                        handleClick();
                      }}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        height: "",
                      }}
                    >
                      <span class="fa-stack fa-1x has-badge" data-count={data !== null ? data.length : 0}>
                        <i class="fa fa-circle fa-stack-2x"></i>
                        <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
                      </span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-links"
                      onClick={() => {
                        handleLogout();
                        handleClick();
                      }}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        height: "",
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <div
              className="nav-icon"
              onClick={() => {
                handleClick();
              }}
            >
              <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
  }
}

export default Nav;
