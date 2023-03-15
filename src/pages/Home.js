import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const loaddata = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodCat(response[1]);
    setFoodItems(response[0]);

    // await foodItems.map(data=>{console.log(data.options[0])});
  };
  useEffect(() => {
    loaddata();
  }, []);
  const getSearch = (data) => {
    setSearch(data);
  };
  return (
    <div>
      {(localStorage.getItem('authToken'))?<div>
        
      <Carousel onSubmit={getSearch} />
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
            var temp=foodItems!==[]?foodItems.filter(
              (item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))):''
              // console.log(temp);
              return (
                
                <div className="row mb-3">
                    <div className="fs-3 m-3"> 

                  {
                    temp!==[]?temp[0]&&temp[0].CategoryName:''
                  

                      }
                      </div>
                  <hr />
          
                  {
                    // console.log(foodItems.options[0]);

                    foodItems !== []
                      ? foodItems
                          .filter(
                            (item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                          )
                          .map((filterItems,index) => {
                            // console.log(filterItems.options[0])
                            return (
                              <div
                                key={filterItems._id}
                                className="col-12 col-md-6 col-lg-3"
                              >
                                <Card
                                  key={filterItems._id}
                                  foodItem={filterItems}
                                  options={filterItems.options[0]}
                                  index={index}
                                />
                              </div>
                            );
                          })
                      : ""
                  }
                </div>
              );
            })
          : ""}
        {/* <Card /> */}
      </div>
      </div>:<div>
      </div>
      }
    </div>
  );
}

export default Home;
