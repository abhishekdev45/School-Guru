import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Unlock Your <i>Potential</i>. <br /> Discover a World of Student{" "}
            <i>Talent</i> and <i>Services</i>.
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "Science Project"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>popular:</span>
            <button>Tutor</button>
            <button>Science Projects</button>
            <button>Essay Writing</button>
            <button>Maths Assignment</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/girl.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
