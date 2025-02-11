// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import api from "../router/api";
// import "../comp_css/order.css";

// const OrderDetails = () => {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userid");
//   const [allOrder, setAllOrder] = useState([]);
//   const [deleted, setDeleted] = useState(false);

//   const handleMakePayment = (orderId) => {
//     localStorage.setItem("orderid", orderId);
//     navigate("/user/make-payment");
//   };

//   const handleProfileSection = (userId) => {
//     navigate(`/user/profile/${userId}`);
//   };

//   const handleDeleteOrder = (orderId) => {
//     axios
//       .delete(`http://127.0.0.1:8081/emedicine/orders/users/${userId}/${orderId}`)
//       .then((response) => {
//         alert(response.data);
//         const updatedOrders = allOrder.filter((order) => order.orderId !== orderId);
//         setAllOrder(updatedOrders);
//         setDeleted(true);
//       })
//       .catch((error) => {
//         console.error("Error deleting order: ", error);
//       });
//   };

//   useEffect(() => {
//     document.title = "E-commerce | Order Details";
//     api
//       .get(`http://127.0.0.1:8081/emedicine/orders/orders/${userId}`)
//       .then((response) => {
//         console.log("API Response:", response.data);  // Debugging
//         if (response.data && Array.isArray(response.data)) {
//           const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
//           setAllOrder(sortedOrders);
//         } else {
//           setAllOrder([]);
//         }
//         setDeleted(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data from the API: ", error);
//         setAllOrder([]);
//       });
//   }, [deleted, userId]);

//   return (
//     <div className="container">
//       <div className="orderContainer">
//         {allOrder.length > 0 ? (
//           allOrder.map((order, index) => (
//             <div key={index} className="order">
//               <div className="odr1">
//                 <h3>Order Number: {index + 1}</h3>
//                 <p>Order ID: {order.orderId}</p>
//                 <p>Status: {order.status}</p>
//                 <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
//                 <h3 style={{ color: "green" }}>Total Amount: ${order.totalAmount}</h3>
                
//                 {order.status === "SHIPPED" ? (
//                   <button style={{ backgroundColor: "green" }} disabled>
//                     SHIPPED
//                   </button>
//                 ) : (
//                   <>
//                     <button
//                       style={{ backgroundColor: "red" }}
//                       onClick={() => handleDeleteOrder(order.orderId)}
//                     >
//                       Cancel Order
//                     </button>
//                     <button onClick={() => handleMakePayment(order.orderId)}>
//                       Make Payment
//                     </button>
//                   </>
//                 )}
//               </div>

//               <div className="odr2">
//                 <h3>Order Items</h3>
//                 {order.orderItem.map((item) => (
//                   <li key={item.orderItemId}>
//                     {item.medicine.name} - Quantity: {item.quantity}
//                   </li>
//                 ))}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div
//             style={{
//               color: "green",
//               fontSize: "20px",
//               border: "2px solid grey",
//               height: "50vh",
//               textAlign: "center",
//             }}
//           >
//             <h1 style={{ marginTop: "50px" }}>No items present</h1>
//           </div>
//         )}
//       </div>

//       <div className="box">
//         <h3>Order History</h3>
//         <button onClick={() => handleProfileSection(userId)}>View Profile</button>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;














import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../router/api";
import "../comp_css/order.css";

const OrderDetails = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const [allOrder, setAllOrder] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const handleMakePayment = (orderId) => {
    localStorage.setItem("orderid", orderId);
    navigate("/user/make-payment");
  };

  const handleProfileSection = (userId) => {
    navigate(`/user/profile/${userId}`);
  };

  const handleDeleteOrder = (orderId) => {
    axios
      .delete(`http://127.0.0.1:8081/emedicine/orders/users/${userId}/${orderId}`)
      .then((response) => {
        alert(response.data);
        const updatedOrders = allOrder.filter((order) => order.orderId !== orderId);
        setAllOrder(updatedOrders);
        setDeleted(true);
      })
      .catch((error) => {
        console.error("Error deleting order: ", error);
      });
  };

  useEffect(() => {
    document.title = "E-commerce | Order Details";
    api
      .get(`http://127.0.0.1:8081/emedicine/orders/orders/${userId}`)
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        if (response.data && Array.isArray(response.data)) {
          const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
          setAllOrder(sortedOrders);
        } else {
          setAllOrder([]);
        }
        setDeleted(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
        setAllOrder([]);
      });
  }, [deleted, userId]);

  return (
    <div className="container">
      <div className="orderContainer">
        {allOrder.length > 0 ? (
          allOrder.map((order, index) => (
            <div key={index} className="order">
              <div className="odr1">
                <h3>Order Number: {index + 1}</h3>
                <p>Order ID: {order.orderId}</p>
                <p>Status: {order.status}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                <h3 style={{ color: "green" }}>Total Amount: ${order.totalAmount}</h3>

                {order.status === "SHIPPED" ? (
                  <button style={{ backgroundColor: "green" }} disabled>
                    SHIPPED
                  </button>
                ) : (
                  <>
                    <button
                      style={{ backgroundColor: "red" }}
                      onClick={() => handleDeleteOrder(order.orderId)}
                    >
                      Cancel Order
                    </button>
                    <button onClick={() => handleMakePayment(order.orderId)}>
                      Make Payment
                    </button>
                  </>
                )}
              </div>

              <div className="odr2">
                <h3>Order Items</h3>
                {order.orderItem.length > 0 ? (
                  order.orderItem.map((item) => (
                    <li key={item.orderItemId}>
                      {item.medicine ? `${item.medicine.name} - Quantity: ${item.quantity}` : "Unknown Item"}
                    </li>
                  ))
                ) : (
                  <p>No items in this order</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              color: "green",
              fontSize: "20px",
              border: "2px solid grey",
              height: "50vh",
              textAlign: "center",
            }}
          >
            <h1 style={{ marginTop: "50px" }}>No items present</h1>
          </div>
        )}
      </div>

      <div className="box">
        <h3>Order History</h3>
        <button onClick={() => handleProfileSection(userId)}>View Profile</button>
      </div>
    </div>
  );
};

export default OrderDetails;
