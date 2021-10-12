import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="register">
      <div className="wrapper">
        <span>Register</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Your Username..."
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="Email"
            placeholder="Enter Your Email..."
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password..."
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="register-button">Register</button>
        </form>
        <Link className="link" to="login">
          <button className="login-button">Log in</button>
        </Link>
        {error && <p className="error-register">Something went wrong!</p>}
      </div>
    </div>
  );
};

export default Register;
