import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const signUp = () => {
    if (
      userData.password === userData.confirmpassword &&
      userData.name !== "" &&
      userData.email !== "" &&
      userData.password !== "" &&
      userData.confirmpassword !== ""
    ) {
      axios
        .post("/api/register", { userData })
        .then((response) => {
          // Handle successful registration
          console.log(response.data);
        })
        .catch((error) => {
          // Handle registration errors
          console.error(error);
        });
      localStorage.setItem("data", JSON.stringify(userData));
      alert("You succesfully registered");
      navigate("/signin");

      console.log(userData);
    } else {
      alert("please give valid inputs in the field");
    }
  };
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <div className="register">
        <h2>SIGN UP</h2>
        <form className="form">
          <label>
            Name:
            <br />
            <input
              type="text"
              name="name"
              value={userData.name}
              className="inputfield"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <br />
            <input
              type="email"
              name="email"
              value={userData.email}
              className="inputfield"
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
              value={userData.password}
              className="inputfield"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </label>
          <label>
            Confirm Password:
            <br />
            <input
              type="password"
              name="confirmpassword"
              value={userData.confirmpassword}
              className="inputfield"
              placeholder="Re-enter your password"
              onChange={handleChange}
            />
          </label>
        </form>
        <button className="signup-btn" onClick={signUp}>
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <span
            className="span-pa"
            onClick={() => {
              navigate("/signin");
            }}
          >
            signin
          </span>
        </p>
      </div>
    </motion.div>
  );
};
export default Register;
