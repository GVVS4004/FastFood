import React, { useEffect, useState } from "react";
import MenuCard from "../components/MenuCards";
import Carousel from "../components/Carousel";
// import MenuCard from "../components/MenuCards";
function Menu() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const loaddata = async () => {
    let response = await fetch("/api/foodData", {
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
    <>
     
        
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
                                <MenuCard
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
      </div>
    </>
  );
}

export default Menu;
