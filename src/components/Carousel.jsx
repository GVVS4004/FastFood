import React, { useEffect, useState } from "react";

export default function Carousel({ onSubmit }) {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
    onSubmit(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
  };

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
            <button
              className="btn btn-outline"
              type="submit"
              style={{
                color: "#1f5156",
                borderStyle: "solid 13px ",
                borderWidth: "2px",
                borderColor: "green",
                backgroundColor: "#f5b921",
              }}
            >
              Search
            </button>
          </form>
        </div>
        <div className="carousel-item active">
          <img
            src="https://cdn.pixabay.com/photo/2024/02/16/20/13/burger-8578288_1280.jpg"
            className="d-block w-100"
            alt="First"
            style={{
              filter: "brightness(50%)",
              height: "600px",
              width: "600px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.pixabay.com/photo/2024/07/13/13/01/pizza-8892093_1280.jpg"
            className="d-block w-100"
            alt="Second"
            style={{
              filter: "brightness(50%)",
              height: "600px",
              width: "600px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.pixabay.com/photo/2024/02/20/15/19/ai-generated-8585693_1280.jpg"
            className="d-block w-100"
            alt="Third"
            style={{
              filter: "brightness(50%)",
              height: "600px",
              width: "600px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}
