import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const formData ={
    username : "",
    password : "",
};

const AdminLogin =() =>{
    const navigate =useNavigate();
    const [form , setForm] =useState(formData);

    useEffect(()=>{
        return() =>{
    document.title = "Medicine App";
        };
    },[]);

    const setHandlerChange =(e) =>{
        const val =e.target.value;
        setForm({...form,[e.target.name]:val});
    };

    const submitHandler = async (e)=>{
        e.preventDefault();

        try {
          const response = await axios.post("http://localhost:8081/auth/login", {
            email: form.username,
            password: form.password
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          });
            if(response.data.token )
            {
                localStorage.setItem("jwt Token",response.headers.authorization);
                localStorage.setItem("adminid",response.data.id);
                alert("Admin login successfully");
                navigate("/admin/admin");
            }
            else{
                alert("Invalid cerendtial");
                console.log("JWT Retreival failed");
            }
        }
        catch(error)
        {
        if(error.response && error.response.status== 401)

            {
                alert("Invalid ceredentials.Please try again");
            }
            else{
                alert("Error during login.Pease try again later.");
                console.error("Error during login :",error);
            }
        }
        
    };

    const { username, password } = form;

    return (
      <>
        <h2 style={{ textAlign: "center", color: "White", margin: "10px" }}>
          WELCOME TO ADMIN LOGIN PAGE
        </h2>
  
        <div className="loginConatiner">
          <div className="login-form">
            <h2 style={{ textAlign: "center" }}>Admin LogIn </h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={setHandlerChange}
                />
              </div>
              <br />
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={setHandlerChange}
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

export default AdminLogin;


