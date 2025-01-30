import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import "./Login.css";

const Login = ({
  onLogin,
  isAuth,
}: {
  onLogin: (token: string) => void;
  isAuth: boolean;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //const { login } = useContext(AuthContext);

  const baseUrl = "https://frontend-take-home-service.fetch.com";

  //Handles login button logic
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      //using email as a password placeholder for this implementation
      // const response = await login({ name: name, email: email });
      const response = await axios.post(
        baseUrl + "/auth/login",
        {
          name: name,
          email: email,
        },
        {
          withCredentials: true,
        }
      );
      // on success, go to home page
      if (response.status === 200) {
        console.log("login success!");
      }
      const token = "templogintoken";
      onLogin(token);
    } catch (error) {
      console.log("failed to login", error);
    }
  };

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login_page">
      <div className="login_box">
        <h1>Login</h1>
        <form className="login_content">
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <span style={{ fontSize: "small", marginBottom: "10px" }}>
            Use your name as username
          </span>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <span style={{ fontSize: "small", marginBottom: "10px" }}>
            Use your email as your password
          </span>
          <button onClick={handleSubmit}>Login</button>
          {/* <span>
          No account? Register <Link to="/register">Here</Link>
        </span> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
