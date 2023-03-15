import React, { useContext, createContext, useReducer } from "react";
import { useEffect } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();
let userEmail = localStorage.getItem("userEmail");

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
        },
      ];
      var authToken = localStorage.getItem("authToken");
      let data = newAr;
      // var authToken = localStorage.getItem(authToken)
      localStorage.setItem(authToken, JSON.stringify(data));
      var loadcart = async () => {
        const response = await fetch("http://localhost:5000/api/UserCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newAr, email: userEmail }),
        });
        // console.log(response.json());
      };
      loadcart();

      // console.log(localStorage.getItem(authToken))
      // return [...state,{id:action.id,name:action.name,size:action.size,qty:action.qty,price:action.price,img:action.img,description:action.description}]
      // localStorage.removeItem(authToken)
      return newAr;
    case "REMOVE":
      var newAr = [...state];
      newAr.splice(action.index, 1);
      // var authToken = localStorage.getItem(authToken)
      let data1 = newAr;
      var authToken = localStorage.getItem("authToken");
      localStorage.setItem(authToken, JSON.stringify(data1));
      var loadcart = async () => {
        const response = await fetch("http://localhost:5000/api/UserCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newAr, email: userEmail }),
        });
        // console.log(response.json());
      };
      loadcart();
      return newAr;
    case "UPDATE":
      var newAr = [...state];
      newAr.find((food, index) => {
        if (food.id === action.id) {
          // console.log(food.qty,parseInt(action.qty),action.price+food.price)
          newAr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        var authToken = localStorage.getItem("authToken");
        localStorage.setItem(authToken, JSON.stringify(newAr));
        var loadcart = async () => {
          const response = await fetch("http://localhost:5000/api/UserCart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newAr, email: userEmail }),
          });
          // console.log(response.json());
        };
        loadcart();
        // console.log(arr)
        return newAr;
      });
      var authToken = localStorage.getItem("authToken");
      localStorage.setItem(authToken, JSON.stringify(newAr));
      return newAr;
    // case "ADD":
    //   let newA=[...state]
    //   arr.find((food,index)=>{
    //       if (food.id === action.id){
    //           arr[index]={...food,qty:food.qty+1,price:action.price.food.price}
    //       }
    //   })
    //   var authToken=localStorage.getItem('authToken')
    //     localStorage.setItem(authToken,JSON.stringify(newA))
    //     console.log(newA);
    //     return newA
    case "DROP":
      var authToken = localStorage.getItem("authToken");
      localStorage.setItem(authToken, JSON.stringify([{}]));
      return {};
    default:
      console.log("Error in reducer");
  }
};

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);
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
    const newState=[...state,data.res.items]
  
  };
  useEffect(()=>{loadcart()},[]);
  console.log('state',state);
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
