import React, { useEffect } from "react";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../comp_css/Slider.css";
import HomeProduct from "./HomeProduct";
import ImageSlider from "../components/ImageSlider";
import AboutUs from "../components/AboutUs";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();

  const styleFixedImg = {
    width: "100%",
    height: "75vh",
    marginTop: "10px",
    marginBottom: "10px",
  };

  useEffect(() => {
    document.title = "Emedicine | Home Page";
    return () => {
      document.title = "EMedicine App";
    };
  }, []);

  return (
    <>
    <Navbar/>
     <div className="header-text">
     <h1 className="welcome-heading">Immerse Yourself In EMedicine Hub</h1>
     <p className="subheading">Where you can buy any type of the Product</p>
   </div>
   
      {/* <div>
        <Slider images={slideImages} interval={4000} />
      </div> */}
      <div className="ImageFixed">
        <img
          style={styleFixedImg}
          src="/images/medicine5.jpg?im=Resize=(840,550)"
          alt="Image"
        />
        <div>
    
        </div>
      </div>
      <ImageSlider />
      <AboutUs/>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;


