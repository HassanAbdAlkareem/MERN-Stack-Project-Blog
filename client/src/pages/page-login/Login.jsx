import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UseGlobelContext } from "../../context/FunctionAlContext";

const Login = () => {
  const { setUser } = UseGlobelContext();
  const [error, setError] = useState(false);

  const userRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    setError(false);

    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      setUser(res.data);
      setError(false);
      //
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <span>Login</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            placeholder="usernmae"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="password"
          />

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <span>
          {error ? <p className="login-error">something is worng! </p> : null}
        </span>

        <Link className="link" to="register">
          <button className="login-register-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
