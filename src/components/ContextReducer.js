import React, { useContext, createContext, useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();
let userEmail = localStorage.getItem("userEmail");
var set= false;
const reducer = (state, action) => {
  
  switch (action.type) {
    case "ADD":
      var newAr = [
        ...state,
        {
          id: action.id,
          name: action.name,
          size: action.size,
          qty: action.qty,
          price: action.price,
          img: action.img,
          description: action.description,
          itemPrice:action.itemPrice,
        },
      ];
      var loadcart = async () => {
        const response = await fetch("http://localhost:5000/api/UserCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        const response = await fetch("http://localhost:5000/api/UserCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        const response = await fetch("http://localhost:5000/api/UserCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newAr, email: userEmail }),
        });
      };
      loadcart();

      return newAr;
    case "DROP":
      newAr=[];
      var loadcart = async () => {
        const response = await fetch("http://localhost:5000/api/UserCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
              price: food.price+food.itemPrice,
            };
            console.log("ADD",newAr)
          } else if (action.operation == "SUB") {
            newAr[index] = {
              ...food,
              qty: food.qty-1  ,
              price: food.price - food.itemPrice,
            };
          }
        }
      });
      var loadcart = async () => {
        const response = await fetch("http://localhost:5000/api/UserCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newAr, email: userEmail }),
        });
      };
      loadcart();
      return newAr;
    case "INITIAL":
      var newAr=action.items;

      if (action.items===null){
        newAr=[]
      }
      return newAr;
    default:
      console.log("Error in reducer");
  }
};

export default function CartProvider({ children }) {
    var [newAr,setNewAr] = useState([]);
      var loadcart = async () => {
        const res = await fetch("http://localhost:3000/api/getCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        });
        const data = await res.json();
        // global.data
        // console.log("reddata",data.response.items);
    
        // const newState = [...state, data.res.items];
        setNewAr(data.response.items);
        dispatch({type:"INITIAL",items:data.response.items});
        // console.log("initial",state)

      };
      const [state, dispatch] = useReducer(reducer,[]);
  // if (set===false){
  
  useEffect(() => {
    // console.log(set);
    loadcart();

  }
, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
