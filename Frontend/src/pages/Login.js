
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Fixed import
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplate } from "react-simple-captcha";
import "../comp_css/Login.css";

const formData = { username: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(formData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "EMedicine App";
    loadCaptchaEnginge(6, "red", "black", "upper");
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.username) {
      newErrors.username = "Email is required.";
    } else if (!emailPattern.test(form.username)) {
      newErrors.username = "Please enter a valid email.";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setHandlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    let userCaptcha = document.getElementById("user_captcha_input").value;

    if (!validateCaptcha(userCaptcha)) {
      alert("Captcha does not match! Please enter the correct captcha.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        {
          email: form.username,
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        console.log("Decoded Token:", decodedToken);

        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("userid", response.data.userId);
        if (decodedToken.sub === "komal2525sahu@gmail.com") {
          alert("Admin login successful");
          navigate("/admin/admin");
        } else {
          alert("User login successful");
          navigate("/");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", color: "white", margin: "10px" }}>
        WELCOME TO LOGIN PAGE
      </h2>

      <div className="loginContainer">
        <div className="login-form">
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="username">Email:</label>
              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={setHandlerChange}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
            <br />
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={setHandlerChange}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group" style={{ marginTop: "20px", marginLeft: "30px" }}>
              <LoadCanvasTemplate />
            </div>
            <div className="form-group">
              <label>Enter Captcha:</label>
              <input
                type="text"
                placeholder="Enter Captcha"
                id="user_captcha_input"
                name="user_captcha_input"
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Login" />
            </div>
          </form>
          <div>
            <p>
              <Link to="/forgotpassword">Forgot Password</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
