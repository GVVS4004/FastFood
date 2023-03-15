import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import "../css/Card.css";

export default function Card(props) {
  let options = props.options;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let priceOptions = [];
  if (options !== undefined) {
    priceOptions = Object.keys(options);
  }
  const priceRef = useRef();
  let finalPrice = qty * parseInt(options[size]);
  let dispatch = useDispatchCart();
  var authToken = localStorage.getItem("authToken");
  // console.log(authToken)
  // localStorage.removeItem(authToken)
  let data = JSON.parse(localStorage.getItem(String(authToken)));
  // console.log(data);
  const handleAddToCart = async () => {
    let food = [];
    // console.log('data',data)
    if (data === null) {
      // console.log(data);
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        img: props.foodItem.img,
        description: props.foodItem.description,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } else {
      for (const item of data) {
        if (item.id === props.foodItem._id) {
          food = item;
          break;
        }
      }
      if (food !== []) {
        if (food.size === size) {
          await dispatch({
            type: "UPDATE",
            index: props.index,
            id: props.foodItem._id,
            price: finalPrice,
            qty: qty,
          });
          return;
        } else if (food.size !== size) {
          await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            img: props.foodItem.img,
            description: props.foodItem.description,
            price: finalPrice,
            qty: qty,
            size: size,
          });
          return;
        }
        return;
      }

      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        img: props.foodItem.img,
        description: props.foodItem.description,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };
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
            {/* <option value='half' className='item'>Half</option>
            <option value='full' className='item'>Full</option> */}
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
