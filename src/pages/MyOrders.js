import React, { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
export default function MyOrders() {
    let userEmail = localStorage.getItem("userEmail");
    const [ordersData,setOrdersData]=useState([]);
    // const [orders,setOrders]=useState([]);
    const loadOrders= async()=>{
        // console.log("HE")
        const response= await fetch('http://localhost:5000/api/getOrders',{method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
            email:userEmail
        })
    });
    // console.log('hell')
    const data=await response.json()
    // console.log("orders",data.data.orders);
    setOrdersData(data.data.orders);
    }
    // loadOrders()
    useEffect(()=>{
        // console.log("hi")
        loadOrders()

    },[]);
    const authToken= localStorage.getItem('authToken');
  return (
    <div>
    {authToken!==null?<div className='container'>
      <div>
      {ordersData!==[null]?ordersData.map((orders,index)=>{
                return (<div className="row mb-3"><h1>Ordered On {orders.order_date}</h1><hr />
                {orders.order_data.map((items,index)=>{ return <div className="col-12 col-md-6 col-lg-3"><OrderCard order={items} /></div>})}
                <div className="d-flex flex-row bd-highlight mb-3" style={{position:'relative'}}><h2 className='p-2 bd'>Order type :{orders.delivery_type}</h2><h2 className='p-2 bd'>    </h2><h2 className='p-2 bd' >Order Total :{orders.order_total}   </h2></div>
                </div>)
      }):<div>kuygiytfur </div>}
      </div>
    </div>:<div  style={{display: "flex",
    justifyContent: "center",
    alignItems: "center",}}><h1>Login to view this page</h1></div>}
    </div>
  )
}
