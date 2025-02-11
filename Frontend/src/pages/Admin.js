import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddProduct from "../components/AddProduct";
import AddCustomerAdmin from "../components/AdminUserDetails"
import AddOrderAdmin from "../components/AllOrderAdmin"
import AllProductAdmin from "../components/AllProductAdmin"
import "../comp_css/Admin.css"
const Admin=()=> {

    const[selectedComponent ,setSelectedComponent]=useState("all-product");
    const navigate =useNavigate();

    const renderSelectedComponent =() =>{
        switch(selectedComponent)
        {
            case "add-product":
                return <AddProduct/>;
            case "all-orders":
                return <AddOrderAdmin/>
            case "add-customer":
                return <AddCustomerAdmin/>;
                case "all-products": // Corrected case name
                return <AllProductAdmin />;
            default:
                return <AllProductAdmin/>;

        }
    };
  return (
    <>
    <div className="admin-navbar">
        <h3 onClick={()=>{setSelectedComponent("all-product");}}>ADMIN HOME</h3>
        <h1 style={{textAlign:"center",color:"black"}}>ADMIN PAGE</h1>
        <h3 onClick={()=>{localStorage.removeItem("adminid");
            localStorage.removeItem("jwt Token");
            navigate("/admin-login");
        }}>Logout</h3>
    </div>
    <div className="admincontainer">
                <div className="productContainer">{renderSelectedComponent()}</div>
                <div className="bocContainer">
                    <ul>
                        <li onClick={() => setSelectedComponent("add-product")}>Add new Medicine</li>
                        <li onClick={() => setSelectedComponent("all-orders")}>View All Orders</li>
                        <li onClick={() => setSelectedComponent("add-customer")}>View All Customers</li>
                        <li onClick={() => setSelectedComponent("all-product")}>View All Medicines</li> {/* Added this */}
                    </ul>
                </div>
            </div>

    </>
  );
};

export default Admin