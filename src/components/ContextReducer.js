import React, { useContext, createContext, useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
export const CartStateContext = createContext();
const CartDispatchContext = createContext();
let userEmail = localStorage.getItem("userEmail");
const token = localStorage.getItem("authToken");
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      var newAr = [...state];
      var exists = false;
      newAr.map((item, index) => {
        if (item.name === action.name && item.size === action.size) {
          item.qty += 1;
          exists = true;
          return item;
        }
        return item;
      });
      if (!exists) {
        newAr = [
          ...state,
          {
            id: action.id,
            name: action.name,
            size: action.size,
            qty: action.qty,
            price: action.price,
            img: action.img,
            description: action.description,
            itemPrice: action.itemPrice,
          },
        ];
      }
      var loadcart = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/secure/UserCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newAr, email: userEmail }),
        });
      };
      loadcart();
      return newAr;
    case "REMOVE":
      var newAr = [...state];
      newAr.splice(action.index, 1);

      var loadcart = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/secure/UserCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newAr, email: userEmail }),
        });
      };
      loadcart();
      return newAr;
    case "UPDATE":
      var newAr = [...state];
      newAr.find((food, index) => {
        if (food.id === action.id) {
          newAr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
      });
      var loadcart = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/secure/UserCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newAr, email: userEmail }),
        });
      };
      loadcart();

      return newAr;
    case "DROP":
      newAr = [];
      var loadcart = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/secure/UserCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newAr, email: userEmail }),
        });
      };
      loadcart();

      return newAr;
    case "CARTUPDATE":
      var newAr = [...state];
      newAr.find((food, index) => {
        if (food.id == action.id) {
          if (action.operation == "ADD") {
            newAr[index] = {
              ...food,
              qty: food.qty + 1,
              price: food.price + food.itemPrice,
            };
          } else if (action.operation == "SUB") {
            newAr[index] = {
              ...food,
              qty: food.qty - 1,
              price: food.price - food.itemPrice,
            };
          }
        }
      });
      var loadcart = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/secure/UserCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newAr, email: userEmail }),
        });
      };
      loadcart();
      return newAr;
    case "INITIAL":
      var newAr = action.items;

      if (action.items === null) {
        newAr = [];
      }
      return newAr;
    default:
      console.log("Error in reducer");
  }
};

export default function CartProvider({ children }) {
  var [newAr, setNewAr] = useState([]);
  var loadcart = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/api/secure/getCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });
    const data = await res.json();
    setNewAr(data.response.items);
    dispatch({ type: "INITIAL", items: data.response.items });
  };
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    loadcart();
  }, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
