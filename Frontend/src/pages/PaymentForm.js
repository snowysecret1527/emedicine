// import React, { useState } from "react";
// import "../comp_css/paymentForm.css";
// import { useNavigate } from "react-router-dom";
// // import paymentBg from "../picture/paymentbg.webp";

// const PaymentForm = () => {

//   const navigate=useNavigate();
//   // const bg = {
//   //   // backgroundImage: `url(${paymentBg})`,
//   //   backgroundSize: "cover",
//   //   backgroundRepeat: "no-repeat",
//   //   backgroundPosition: "center center",
//   // };
//   const [paymentData, setPaymentData] = useState({
//     cardNumber: "",
//     cardHolder: "",
//     expirationDate: "",
//     cvv: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentData({ ...paymentData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(paymentData)
//     navigate("/user/payment-success")
    
//   };

//   return (
//     // style={bg}
//     <div className="payment-form-container" >
//       <form className="payment-form" onSubmit={handleSubmit}>
//         <h2>Payment Information</h2>
//         <div className="form-group">
//           <label htmlFor="cardNumber">Card Number</label>
//           <input
//             type="text"
//             id="cardNumber"
//             name="cardNumber"
//             value={paymentData.cardNumber}
//             onChange={handleInputChange}
//             placeholder="Enter card number"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="cardHolder">Card Holder</label>
//           <input
//             type="text"
//             id="cardHolder"
//             name="cardHolder"
//             value={paymentData.cardHolder}
//             onChange={handleInputChange}
//             placeholder="Enter card holder's name"
//             required
//           />
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="expirationDate">Expiration Date</label>
//             <input
//               type="text"
//               id="expirationDate"
//               name="expirationDate"
//               value={paymentData.expirationDate}
//               onChange={handleInputChange}
//               placeholder="MM/YY"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="cvv">CVV</label>
//             <input
//               type="text"
//               id="cvv"
//               name="cvv"
//               value={paymentData.cvv}
//               onChange={handleInputChange}
//               placeholder="CVV"
//               required
//             />
//           </div>
//         </div>
//         <button type="submit">Make Payment</button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;



import React, { useState } from "react";
import "../comp_css/paymentForm.css";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Card Number validation (must be exactly 16 digits)
    if (!paymentData.cardNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(paymentData.cardNumber)) {
      newErrors.cardNumber = "Card number must be exactly 16 digits.";
    }

    // CVV validation (must be exactly 3 digits)
    if (!paymentData.cvv) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^\d{3}$/.test(paymentData.cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits.";
    }

    // Expiration Date validation (must be a valid future date in MM/YY format)
    if (!paymentData.expirationDate) {
      newErrors.expirationDate = "Expiration date is required.";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expirationDate)) {
      newErrors.expirationDate = "Expiration date must be in MM/YY format.";
    } else {
      const [month, year] = paymentData.expirationDate.split("/").map(Number);
      const currentDate = new Date();
      const expirationDate = new Date(`20${year}`, month - 1);

      if (expirationDate <= currentDate) {
        newErrors.expirationDate = "Expiration date must be in the future.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    console.log(paymentData);
    alert("Payment successful!");
    navigate("/user/payment-success");
  };

  return (
    <div className="payment-form-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Payment Information</h2>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            placeholder="Enter card number"
            required
          />
          {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cardHolder">Card Holder</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={paymentData.cardHolder}
            onChange={handleInputChange}
            placeholder="Enter card holder's name"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={paymentData.expirationDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              required
            />
            {errors.expirationDate && (
              <span className="error">{errors.expirationDate}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleInputChange}
              placeholder="CVV"
              required
            />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
          </div>
        </div>

        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
