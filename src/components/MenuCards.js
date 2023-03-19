import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";
import "../css/Card.css";

export default function MenuCard(props) {
  let options = props.options;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [data, setData] = useState([]);

  const navigate=useNavigate();
  let priceOptions = [];
  if (options !== undefined) {
    priceOptions = Object.keys(options);
  }
  const priceRef = useRef();
  let finalPrice = qty * parseInt(options[size]);
//   let dispatch = useDispatchCart();

  const handleAddToCart = () => {
    navigate('/login')
  }
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <figure class="snip1396 green">
      <img
        src={props.foodItem.img}
        alt="pr-sample13"
        style={{ height: "485px", width: "100%" }}
      />
      <div class="image">
        <img
          src={props.foodItem.img}
          alt="pr-sample13"
          style={{ height: "400px", width: "100%" }}
        />
      </div>
      <figcaption>
        <h3>{props.foodItem.name}</h3>
        <p>{props.foodItem.description.slice(0, 100)}</p>
        <div
          className="container w-100"
          style={{ paddingLeft: "0px", marginBottom: "0%" }}
        >
          <select
            className="m-2 h200 bg-warning rounded"
            style={{ marginRight: "0px" }}
            onChange={(e) => {
              setQty(e.target.value);
            }}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1} className="item">
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-3 h200 bg-danger rounded"
            ref={priceRef}
            style={{ marginLeft: "0px" }}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            {priceOptions !== []
              ? priceOptions.map((data) => {
                  return (
                    <option key={data} vlaue={data}>
                      {data}
                    </option>
                  );
                })
              : ""}
          </select>
          <div class="price">
            <div>{finalPrice}/-</div>
          </div>
        </div>
      </figcaption>

      <button
        class="add-to-cart"
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={handleAddToCart} 
      >
        Add to Cart<i class="ion-android-checkbox-outline"></i>
      </button>
    </figure>
  );
            }

