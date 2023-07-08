import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const regData = JSON.parse(localStorage.getItem("data"));
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const signIn = () => {
    axios
      .post("/api/login", { email, password })
      .then((response) => {
        // Handle successful login
        console.log(response.data);
      })
      .catch((error) => {
        // Handle login errors
        console.error(error);
      });
    if (email === regData.email && password === regData.password) {
      alert("logged in successfully!");
      navigate("/dashboard");
    } else if (
      email !== regData.email ||
      email !== "" ||
      password !== regData.password ||
      password !== ""
    ) {
      alert("invalid mail and password !");
    } else {
      alert("please login first");
      navigate("/register");
    }
  };
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <div className="signin">
        <h1>SIGN IN </h1>
        <form className="form-signin">
          <label>
            Email:
            <br />
            <input
              type="email"
              name="email"
              className="inputfield-s"
              placeholder="Enter your email address"
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <br />
            <input
              type="password"
              name="password"
              className="inputfield-s"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </label>
        </form>
        <button className="signin-btn" onClick={signIn}>
          Sign in
        </button>
        <p>
          Don't have an account?{" "}
          <span
            className="span-pa"
            onClick={() => {
              navigate("/register");
            }}
          >
            signup
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
