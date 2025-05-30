import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
export default function MyOrders() {
  let userEmail = localStorage.getItem("userEmail");
  const [ordersData, setOrdersData] = useState([]);
  const token = localStorage.getItem("authToken");
  // const [orders,setOrders]=useState([]);
  const loadOrders = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/secure/getOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });
    const data = await response.json();
    setOrdersData(data.data.orders);
  };
  // loadOrders()
  useEffect(() => {
    loadOrders();
  }, []);
  const authToken = localStorage.getItem("authToken");
  return (
    <div>
      {authToken !== null ? (
        <div className="container">
          <div>
            {ordersData.length !== 0 ? (
              ordersData.map((orders, index) => {
                return (
                  <div className="row mb-3">
                    <h1>Ordered On {orders.order_date}</h1>
                    <hr />
                    {orders.order_data.map((items, index) => {
                      return (
                        <div className="col-12 col-md-6 col-lg-3">
                          <OrderCard order={items} />
                        </div>
                      );
                    })}
                    <div className="d-flex flex-row bd-highlight mb-3" style={{ position: "relative" }}>
                      <h2 className="p-2 bd">Order type :{orders.delivery_type}</h2>
                      <h2 className="p-2 bd"> </h2>
                      <h2 className="p-2 bd">Order Total :{orders.order_total} </h2>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>NO orders yet. Please go to menu to order </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h1>Login to view this page</h1>
        </div>
      )}
    </div>
  );
}
