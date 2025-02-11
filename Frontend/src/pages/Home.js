import React, { useEffect } from "react";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../comp_css/Slider.css";
import HomeProduct from "./HomeProduct";
import ImageSlider from "../components/ImageSlider";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();
  const slideImages = [
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1691935239_Freedom_Finds.jpg?im=Resize=(1680,320)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1691950461_Handloom_Sarees_in_Colors_of_India.jpg?im=Resize=(1680,320)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1691612739_Aaj_Ki_Deals_Desktop.jpg?im=Resize=(1680,320)",
  ];

  const styleFixedImg = {
    width: "100%",
    height: "25vh",
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
          src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1691749079_Aaj_Ki_Deals.jpg?im=Resize=(1240,150)"
          alt="Image"
        />
        <div>
    
        </div>
      </div>
      <ImageSlider />
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;




// import React from 'react';
// import ImageSlider from "../components/ImageSlider";
// import "../comp_css/Home1.css"; // Import global CSS
// // import logo from "./Artify1.png"; // Adjust the path to your logo image

// const Home = () => {
//   return (
//     <div className="container mt-4">
//       {/* Header Section with Logo and Welcome Heading */}
//       <header className="header">
//   {/* <img src={logo} alt="Artify Logo" className="logo" /> */}
//   <div className="header-text">
//     <h1 className="welcome-heading">Immerse Yourself in the World of Art</h1>
//     <p className="subheading">Where creativity meets inspiration</p>
//   </div>
// </header>
      
//       <ImageSlider />

//       {/* Blocks Section */}
//       <div className="blocks-container">
//         <div className="block">
//           <h3>Visit Our Gallery in Pune</h3>
//           <p>Come and explore the finest collection of art pieces in Pune.</p>
//         </div>
//         <div className="block">
//           <h3>Art Events & Exhibitions</h3>
//           <p>Join us for exciting events and exhibitions hosted regularly.</p>
//         </div>
//         <div className="block">
//           <h3>Affordable for All !!</h3>
//           <p>Explore art that fits your budget. Everyone deserves a piece of beauty.</p>
//         </div>
//       </div>

//       {/* Gallery Information Section */}
//       <div className="gallery-info">
//         <div className="info-item">
//           <h3>Established</h3>
//           <p>
//             Our gallery was established in 2010 with a vision to make art accessible to everyone.
//           </p>
//         </div>
//         <div className="info-item">
//           <h3>Available Arts</h3>
//           <p>
//             Explore a diverse collection of contemporary, traditional, and digital artworks from artists around the world.
//           </p>
//         </div>
//         <div className="info-item">
//           <h3>Years of Experience</h3>
//           <p>
//             With over 15 years of experience, we bring you the finest collection of exclusive art pieces.
//           </p>
//         </div>
//         <div className="info-item">
//           <h3>Exclusive Art</h3>
//           <p>
//             Our collection features exclusive artworks that you won't find anywhere else, bringing you unique pieces from renowned artists.
//           </p>
//         </div>
//         <div className="info-item">
//           <h3>Our Vision</h3>
//           <p>
//             Our vision is to create an art community where everyone can appreciate and engage with beautiful, meaningful art.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;