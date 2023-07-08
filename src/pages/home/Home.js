import React from "react";
import "./Home.css";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <motion.div
        animate={{ y: 100 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <h1>UNICORN READY</h1>
        <p className="description">
          Unicornready is a commerce digital transformationn agency focusing and
          delivering world class Magento commerce development service from
          Banglore. We belive the best way to predict the future is to create
          it.Our expertise will help you to build solutions to connect with your
          future.
        </p>
        <p className="description">
          To create an account click on the registor button.
          <br />
          For login click on the login button.
        </p>
      </motion.div>
      <div className="home-btns">
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <button
            className="hm-bt"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </motion.div>
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <button
            className="hm-bt"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
