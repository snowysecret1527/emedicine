// Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../comp_css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const name = localStorage.getItem("name");

  const handleLoginClick = () => navigate("/Login");
  const handleSignUpClick = () => navigate("/register-user");
  const handleLogoutClick = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("cartid");
    localStorage.removeItem("name");
    alert("Logout Successfully");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <h3>EMedicineHub</h3>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          onClick={() => navigate("/product")}
        />
        <span className="search-icon">Search</span>
      </div>

      <div className="nav-options">
        <div className="nav-item" onClick={() => navigate("/user/cart")}>
          <span>Cart</span>
        </div>

        {userId ? (
          <>
          <div className="nav-item" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => navigate("/user/upload")}>
  <span>Upload Prescription</span>
</div>
            <div className="nav-item" onClick={() => navigate("/user/order-details")}>
              <span>{name || "Profile"}</span>
            </div>
            
            <div className="nav-item logout" onClick={handleLogoutClick}>
              <span>Logout</span>
            </div>
          </>
        ) : (
          <>
            <div className="nav-item" onClick={handleLoginClick}>
              <span>Login</span>
            </div>
            <div className="nav-item" onClick={handleSignUpClick}>
              <span>Sign Up</span>
            </div>
            
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;