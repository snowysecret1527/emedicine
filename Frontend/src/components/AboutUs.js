import React from 'react';
import "../comp_css/aboutus.css"

function AboutUs() {
  return (
    <div className='about-box'>
      <h2 className="about-title">About eMedicine Hub</h2>
      <div className="about-data">
        <div className="about-img">
          <img 
            src="/images/medicine1.jpg" 
            alt="Medical Hub" 
          />
        </div>
        <div>
          <p className="about-text">
            eMedicine Hub is dedicated to providing accurate, up-to-date medical information and resources to individuals worldwide. 
            Our mission is to empower patients and healthcare professionals by offering a platform where medical knowledge is 
            easily accessible.<br/><br/>
            We believe in the importance of health education and strive to bridge the gap between healthcare providers and the public. 
            Our platform offers expert advice, trusted resources, and the latest medical research to help you make informed health decisions.<br/><br/>
            At eMedicine Hub, we aim to create a community where healthcare is transparent and accessible to everyone. 
            From understanding symptoms to exploring treatment options, we are here to support your health journey.<br/><br/>
            Your health matters. Join us in making healthcare knowledge accessible for all!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
