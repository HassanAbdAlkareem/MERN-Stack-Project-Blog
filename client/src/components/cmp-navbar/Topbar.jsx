import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseGlobelContext } from "../../context/FunctionAlContext";
import imgUser from "../../images/user.png";

const Topbar = () => {
  const { user, setUser } = UseGlobelContext();
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className={isScrolled ? "top scrolled" : "top"}>
      <div className="top-left">
        <p className="username">{user ? user.user.username : "welcome"}</p>
      </div>

      <div className="top-center">
        <ul className="top-list">
          <Link className="link" to="/">
            <li>Home</li>
          </Link>

          <Link className="link" to="/write">
            <li>Write</li>
          </Link>

          <Link className="link" to="/sidebar">
            <li>Sidebar</li>
          </Link>

          <Link className="link" to="/">
            {user && <li onClick={handleLogout}>logout</li>}
          </Link>
        </ul>
      </div>

      <div className="top-right">
        {user ? (
          <Link to="/settings">
            {user.user.profilePic ? (
              <img
                src={PF + user.user.profilePic}
                alt=""
                className="img-profile"
              />
            ) : (
              <img src={imgUser} alt="" className="img-profile" />
            )}
          </Link>
        ) : (
          <img src={imgUser} alt="" className="img-profile" />
        )}
      </div>
    </div>
  );
};

export default Topbar;
