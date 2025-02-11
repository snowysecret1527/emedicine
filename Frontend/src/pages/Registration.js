import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "../comp_css/Registration.css";
const Registration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userRoles: ["USER"]  // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/auth/signup", form);
      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleInputChange} required />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" onChange={handleInputChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" onChange={handleInputChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" onChange={handleInputChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
