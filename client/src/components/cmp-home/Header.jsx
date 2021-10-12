import React from "react";
import imgBlog2 from "../../images/blog2.jpeg";

const header = () => {
  return (
    <div className="header">
      <div className="header-title">
        <span className="header-title-sm"> React, Node</span>
        <span className="header-title-lg">Blog</span>
      </div>
      <img src={imgBlog2} alt="" className="header-img" />
    </div>
  );
};

export default header;
