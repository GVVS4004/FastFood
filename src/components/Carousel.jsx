import React, { useEffect, useState } from "react";

export default function Carousel(props) {
  const [name,setName]= useState('');
  const handleChange =(e)=>{
    setName(e.target.value);
    props.onSubmit(name);

  }
  const handleSubmit= (e)=>{
    e.preventDefault();
    props.onSubmit(name);
  }



  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner">
  <div className="carousel-caption" style={{ zIndex: "2" }}>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
            />
            <button className="btn btn-outline" type="submit" style={{color:"#1f5156", borderStyle:"solid 13px ",borderWidth:"2px",borderColor:"green", backgroundColor:"#f5b921"}} >
              Search
            </button>
          </form>
        </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/300×300?buger" className="d-block w-100" alt="First" style={{filter:"brightness(50%)" ,height:"600px",width:"600px",objectFit:"cover"}} />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300?pizza" className="d-block w-100" alt="Second" style={{filter:"brightness(50%)",height:"600px",width:"600px",objectFit:"cover"}} />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300?momos" className="d-block w-100" alt="Third" style={{filter:"brightness(50%)",height:"600px",width:"600px",objectFit:"cover"}} />
    </div>
  </div>
  {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button> */}
</div>
  )
}
