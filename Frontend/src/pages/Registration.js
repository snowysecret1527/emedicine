// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// //import "../comp_css/Registration.css";
// const Registration = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     userRoles: ["USER"]  // Default role
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8081/auth/signup", form);
//       if (response.status === 200) {
//         alert("Registration successful!");
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>First Name:</label>
//           <input type="text" name="firstName" onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input type="text" name="lastName" onChange={handleInputChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" onChange={handleInputChange} />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Registration;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userRoles: ["USER"], // Default role
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation (minimum 8 characters, at least one number and one special character)
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (
      form.password.length < 8 ||
      !/[0-9]/.test(form.password) ||
      !/[!@#$%^&*]/.test(form.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters long and include at least one number and one special character.";
    }

    // First name validation
    if (!form.firstName) {
      newErrors.firstName = "First name is required.";
    }

    // Phone number validation (must be digits and at least 10 characters)
    if (!form.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

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
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={form.email}
            required
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            value={form.password}
            required
          />
          {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
        </div>

        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            value={form.firstName}
            required
          />
          {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleInputChange}
            value={form.lastName}
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleInputChange}
            value={form.phoneNumber}
            required
          />
          {errors.phoneNumber && <span style={{ color: "red" }}>{errors.phoneNumber}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
