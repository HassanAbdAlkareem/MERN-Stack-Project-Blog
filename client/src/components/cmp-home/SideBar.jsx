import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgMy from "../../images/my-black.jpg";

const SideBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };

    getCategories();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">About me</span>
        <img src={imgMy} alt="" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam ea
          repellendus nisi perferendis obcaecati incidunt ex, odio, voluptates
          voluptatem non,
        </p>
      </div>

      <div className="sidebar-item">
        <span className="sidebar-title">categories</span>
        <ul className="lists">
          {categories.map((cate) => (
            <li key={cate._id}>
              <Link className="link" to={"/?cat=" + cate.name}>
                {cate.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-item">
        <span className="sidebar-title">follow us </span>
        <ul className="follow-us">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-pinterest"></i>
          <i className="fab fa-instagram-square"></i>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
