import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";
import "../css/Card.css";

export default function OrderCard(props) {
  let options = props.options;
  useEffect(() => {
  }, []);

  return (
    <figure class="snip1396 green">
      <img
        src={props.order.img}
        alt="pr-sample13"
        style={{ height: "485px", width: "100%" }}
      />
      <div class="image">
        <img
          src={props.order.img}
          alt="pr-sample13"
          style={{ height: "400px", width: "100%" }}
        />
      </div>
      <figcaption>
        <h3>{props.order.name}</h3>
        <p>{props.order.description}</p>
        <div
          className="container w-100"
          style={{ paddingLeft: "0px", marginBottom: "0%" }}
        >
          <select
            className="m-2 h200 bg-warning rounded"
            style={{ marginRight: "0px" }}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1} className="item">
                  {i + 1}
                </option>
              );
            })}
            <option>{props.order.qty}</option>
          </select>
          <select
            className="m-3 h200 bg-danger rounded"

            style={{ marginLeft: "0px" }}
          >
            
              <option value={props.order.size} >{props.order.size}</option>
          </select>
          <div class="price">
            <div>{props.order.price}/-</div>
          </div>
        </div>
      </figcaption>

    </figure>
  );
            }

