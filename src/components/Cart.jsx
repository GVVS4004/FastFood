import React, { useEffect, useState } from "react";
import "../css/Cart.css";
import { useCart } from "./ContextReducer";
import { useDispatchCart } from "./ContextReducer";
import { useReducer } from "react";

export default function Cart(props) {
  // let data=useCart()
  // console.log(data[0],data[1])
  // let authToken=localStorage.getItem('authToken')
  // console.log(authToken);
  // let data=JSON.parse(localStorage.getItem(authToken))
  //   localStorage.setItem(authToken,JSON.stringify(data))
  //   console.log('hi',JSON.parse(localStorage.getItem(authToken)))
  // console.log(data);
  const [data,setData] =useState([])
  let userEmail = localStorage.getItem("userEmail");
  const loadcart = async () => {
    // console.log('async');
    const res = await fetch("http://localhost:3000/api/getCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });
    const data= await res.json()
    // global.data
    console.log(data.res.items);
    setData(data.res.items)
  };
  useEffect(()=>{loadcart()},[]);
  
  var authToken = localStorage.getItem("authToken");
  // var data = JSON.parse(localStorage.getItem(authToken));
  // console.log("data", data);
  let dispatch = useDispatchCart();

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleRemove = async (index) => {
    await dispatch({ type: "REMOVE", index: index });
    forceUpdate();
  };
  const add = async (index) => {};
  const sub = () => {};
  const handleCheckOut = async () => {
    // console.log(userEmail);
    let response = await fetch("http://localhost:3000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      forceUpdate();
    }
  };
  const isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}";
  };
  console.log('data',data);
  // localStorage.removeItem(authToken)
  // console.log(data)
  return (
    <div>
      {data!==null ? (
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px", border: "none" }}
              >
                <div
                  className="card-body p-0"
                  style={{ backgroundColor: "white", borderRadius: "15px" }}
                >
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </h1>
                          <h6 className="mb-0 text-muted">
                            {data !== null ? data.length : 0} items
                          </h6>
                        </div>
                        {data == null
                          ? ""
                          : !isObjectEmpty(data[0])
                          ? data.map((food, index) => {
                              return (
                                <div>
                                  <hr className="my-4" />

                                  <div className="row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                      <img
                                        src={food.img}
                                        className="img-fluid rounded-3"
                                        alt="Cotton T-shirt"
                                        style={{ height: "50px" }}
                                      />
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-xl-3">
                                      <h6 className="text-muted">
                                        {food.name}
                                      </h6>
                                      <h6 className="text-black mb-0">
                                        {food.size}
                                      </h6>
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                      <button
                                        className="btn btn-link px-2"
                                        onClick={(index) => {
                                          sub(index);
                                        }}
                                      >
                                        <i className="fas fa-minus"></i>
                                      </button>

                                      <input
                                        id="form1"
                                        min="0"
                                        name="quantity"
                                        value={food.qty}
                                        type="number"
                                        disabled={true}
                                        className="form-control form-control-sm"
                                      />

                                      <button
                                        className="btn btn-link px-2"
                                        onClick={(index) => {
                                          add(index);
                                        }}
                                      >
                                        <i className="fas fa-plus"></i>
                                      </button>
                                    </div>
                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                      <h6 className="mb-0">{food.price}</h6>
                                    </div>
                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                      <button
                                        style={{
                                          border: "none",
                                          backgroundColor: "transparent",
                                        }}
                                        className="text-muted"
                                        onClick={(index) => {
                                          handleRemove(index);
                                        }}
                                      >
                                        <i className="fas fa-times"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : <div>hello</div>}

                        <hr className="my-4" />

                        <div className="pt-5">
                          <h6 className="mb-0" style={{ color: "black" }}>
                            <a href="#!" style={{ color: "black" }}>
                              <i className="fas fa-long-arrow-alt-left me-2"></i>
                              Back to shop
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 bg-grey"
                      style={{ color: "black" }}
                    >
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">
                            items {data !== null ? data.length : 0}
                          </h5>
                          <h5>{data != null ? "" : 0}</h5>
                        </div>

                        <h5 className="text-uppercase mb-3">Shipping</h5>

                        <div className="mb-4 pb-2">
                          <select className="select">
                            <option value="1">Standard-Delivery- €5.00</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                          </select>
                        </div>
                        {/* 
                  <h5 className="text-uppercase mb-3">Give code</h5>

                  <div className="mb-5">
                    <div className="form-outline">
                      <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                      <label className="form-label" for="form3Examplea2">Enter your code</label>
                    </div>
                  </div> */}
                        <div>
                          <hr className="my-4" />

                          <div className="d-flex justify-content-between mb-5">
                            <h5 className="text-uppercase">Total price</h5>
                            <h5>€ 137.00</h5>
                          </div>

                          <button
                            type="button"
                            className="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark"
                            onClick={handleCheckOut}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
