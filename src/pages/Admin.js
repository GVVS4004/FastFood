import React, { useEffect } from "react";
// import useNavigate from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [click, setClick] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const handleLogout = () => {
    // let authToken=localStorage.getItem('authAdminToken')
    localStorage.removeItem("authAdminToken");
    // localStorage.removeItem(authToken);
    navigate("/");
  };
  const loaddata = async () => {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/api/adminOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  useEffect(() => {
    loaddata();
  }, []);
  return (
    <div>
      {/* <button onClick={localStorage.removeItem("authAdminToken")}>logout</button> */}
      <div>
        <div className={click ? "main-container" : ""} onClick={() => Close()} />
        <nav className="navbar" onClick={(e) => e.stopPropagation()}>
          <div className="nav-container">
            <div className="nav-logo">
              <h2>FastFood</h2>
            </div>
            <div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                {/* <li className="nav-item">
              <button
             
                className="nav-links"
                onClick={()=> navigate('/home')} style={{backgroundColor:"transparent",border:"none", height:""}}
              >
                Home
              </button>
            </li> */}
                <li className="nav-item">
                  <button
                    className="nav-links"
                    onClick={() => {
                      navigate("/adminHome");
                    }}
                    style={{ backgroundColor: "transparent", border: "none", height: "" }}
                  >
                    Myorders
                  </button>
                </li>
                {/* <li className="nav-item">
              <button
                className="nav-links"
                onClick={showCart} style={{backgroundColor:"transparent",border:"none", height:""}}
              >
                
              
              <span class="fa-stack fa-1x has-badge" data-count={data!==null?data.length:0}>
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
</span>
</button>
            </li> */}
                <li className="nav-item">
                  <button
                    className="nav-links"
                    onClick={handleLogout}
                    style={{ backgroundColor: "transparent", border: "none", height: "" }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <div className="nav-icon" onClick={handleClick}>
              <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
          </div>
        </nav>
      </div>
      <div></div>
    </div>
  );
}
