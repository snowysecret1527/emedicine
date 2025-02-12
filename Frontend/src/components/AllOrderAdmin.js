// // import React, { useEffect, useState } from "react";
// // import axios from "axios"; // Import Axios
// // import "../comp_css/AllOrderAdmin.css";
// // import api from "../router/api";

// // const AddOrderAdmin = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     api
// //       .get("emedicine/orders/all")
// //       .then((response) => {
// //         setOrders(response.data);
// //         setLoading(false);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //         setLoading(false);
// //       });
// //   }, []);

// //   return (
// //     <>
// //       <h2 style={{textAlign:"center",margin:"10px"}}>All Orders Details</h2>
// //       <div className="admin-orders">
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : (
// //           orders.map((order) => (
// //             <div className="order-card" key={order.orderId}>
// //               <div className="orderpart">
// //                 <h3>Order Details</h3>
// //                 <p>Order ID: {order.orderId}</p>
// //                 <p>Status: {order.status}</p>
// //                 <p>Order Date: {order.orderDate}</p>
// //                 <hr />
// //                 {order.orderItem.map((item) => (
// //                   <div className="order-item" key={item.orderItemId}>
// //                     <p>Product: {item.product.name}</p>
// //                     <p>Price: {item.product.price}</p>
// //                     <p>Quantity: {item.quantity}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //               <div className="customerdetails">
// //                 <h3>Customer Details</h3>
// //                 <p>User ID: {order.user.userId}</p>
// //                 <p>
// //                   Name: {order.user.firstName} {order.user.lastName}
// //                 </p>
// //                 <p>Phone Number: {order.user.phoneNumber}</p>

// //                 <h3>Payment Details</h3>
// //                 {order.payment ? (
// //                   <>
// //                     <p>Payment ID: {order.payment.paymentId}</p>
// //                     <p>Payment Date: {order.payment.paymentDate}</p>
// //                     <p>Payment Amount: {order.payment.paymentAmount}</p>
// //                     <p>Payment Method: {order.payment.paymentMethod}</p>
// //                     <p>Payment Status: {order.payment.paymentStatus}</p>
// //                   </>
// //                 ) : (
// //                   <p>No payment information available</p>
// //                 )}
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default AddOrderAdmin;
// import React, { useEffect, useState } from "react";
// import "../comp_css/AllOrderAdmin.css";
// import api from "../router/api";

// const AddOrderAdmin = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("emedicine/orders/all")
//       .then((response) => {
//         console.log("API Response:", response.data); // Log the API response for debugging
//         setOrders(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       <h2 style={{ textAlign: "center", margin: "10px" }}>All Orders Details</h2>
//       <div className="admin-orders">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           orders.map((order) => (
//             <div className="order-card" key={order.orderId}>
//               <div className="orderpart">
//                 <h3>Order Details</h3>
//                 <p>Order ID: {order.orderId}</p>
//                 <p>Status: {order.status}</p>
//                 <p>Order Date: {order.orderDate}</p>
//                 <hr />
//                 {order.orderItem && order.orderItem.length > 0 ? (
//                   order.orderItem.map((item) => (
//                     <div className="order-item" key={item.orderItemId}>
//                       <p>Product: {item.product?.name || "N/A"}</p>
//                       <p>Price: {item.product?.price || "N/A"}</p>
//                       <p>Quantity: {item.quantity || 0}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No order items available</p>
//                 )}
//               </div>
//               <div className="customerdetails">
//                 <h3>Customer Details</h3>
//                 {order.user ? (
//                   <>
//                     <p>User ID: {order.user.userId}</p>
//                     <p>
//                       Name: {order.user.firstName} {order.user.lastName}
//                     </p>
//                     <p>Phone Number: {order.user.phoneNumber}</p>
//                   </>
//                 ) : (
//                   <p>No customer information available</p>
//                 )}

//                 <h3>Payment Details</h3>
//                 {order.payment ? (
//                   <>
//                     <p>Payment ID: {order.payment.paymentId}</p>
//                     <p>Payment Date: {order.payment.paymentDate}</p>
//                     <p>Payment Amount: {order.payment.paymentAmount}</p>
//                     <p>Payment Method: {order.payment.paymentMethod}</p>
//                     <p>Payment Status: {order.payment.paymentStatus}</p>
//                   </>
//                 ) : (
//                   <p>No payment information available</p>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default AddOrderAdmin;
// import React, { useEffect, useState } from "react";
// import "../comp_css/AllOrderAdmin.css";
// import api from "../router/api";

// const AddOrderAdmin = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("emedicine/orders/all")
//       .then((response) => {
//         console.log("API Response:", response.data); // Log the API response for debugging
//         setOrders(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       <h2 style={{ textAlign: "center", margin: "10px" }}>All Orders Details</h2>
//       <div className="admin-orders">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           orders.map((order) => (
//             <div className="order-card" key={order.orderId}>
//               <div className="orderpart">
//                 <h3>Order Details</h3>
//                 <p>Order ID: {order.orderId}</p>
//                 <p>Status: {order.status}</p>
//                 <p>Order Date: {order.orderDate}</p>
//                 <hr />
//                 <h4>Medicines Ordered</h4>
//                 {order.orderItem && order.orderItem.length > 0 ? (
//                   order.orderItem.map((item) => (
//                     <div className="order-item" key={item.orderItemId}>
//                       <p><strong>Medicine Name:</strong> {item.product?.name || "Not Available"}</p>
//                       <p><strong>Price:</strong> ₹{item.product?.price || "N/A"}</p>
//                       <p><strong>Quantity:</strong> {item.quantity || 0}</p>
//                       <p><strong>Description:</strong> {item.product?.description || "No description available"}</p>
//                       <p><strong>Manufacturer:</strong> {item.product?.manufacturer || "Not specified"}</p>
//                       <hr />
//                     </div>
//                   ))
//                 ) : (
//                   <p>No medicines available for this order</p>
//                 )}
//               </div>
//               <div className="customerdetails">
//                 <h3>Customer Details</h3>
//                 {order.user ? (
//                   <>
//                     <p><strong>User ID:</strong> {order.user.userId}</p>
//                     <p>
//                       <strong>Name:</strong> {order.user.firstName} {order.user.lastName}
//                     </p>
//                     <p><strong>Phone Number:</strong> {order.user.phoneNumber}</p>
//                   </>
//                 ) : (
//                   <p>No customer information available</p>
//                 )}

//                 <h3>Payment Details</h3>
//                 {order.payment ? (
//                   <>
//                     <p><strong>Payment ID:</strong> {order.payment.paymentId}</p>
//                     <p><strong>Payment Date:</strong> {order.payment.paymentDate}</p>
//                     <p><strong>Payment Amount:</strong> ₹{order.payment.paymentAmount}</p>
//                     <p><strong>Payment Method:</strong> {order.payment.paymentMethod}</p>
//                     <p><strong>Payment Status:</strong> {order.payment.paymentStatus}</p>
//                   </>
//                 ) : (
//                   <p>No payment information available</p>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default AddOrderAdmin;



// import React, { useEffect, useState } from "react";
// import "../comp_css/AllOrderAdmin.css";
// import api from "../router/api";

// const AddOrderAdmin = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("emedicine/orders/all")
//       .then((response) => {
//         console.log("API Response:", response.data); // Log the API response for debugging
//         setOrders(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       <h2 style={{ textAlign: "center", margin: "10px" }}>All Orders Details</h2>
//       <div className="admin-orders">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           orders.map((order) => (
//             <div className="order-card" key={order.orderId}>
//               <div className="orderpart">
//                 <h3>Order Details</h3>
//                 <p><strong>Order ID:</strong> {order.orderId}</p>
//                 <p><strong>Status:</strong> {order.status}</p>
//                 <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
//                 <hr />
//                 <h4>Medicines Ordered</h4>
//                 {order.orderItem && order.orderItem.length > 0 ? (
//                   order.orderItem.map((item) => (
//                     <div className="order-item" key={item.orderItemId}>
//                       <p><strong>Medicine Name:</strong> {item.medicine?.name || "Not Available"}</p>
//                       <p><strong>Price:</strong> ₹{item.medicine?.price || "N/A"}</p>
//                       <p><strong>Quantity:</strong> {item.quantity || 0}</p>
//                       <p><strong>Description:</strong> {item.medicine?.description || "No description available"}</p>
//                       <p><strong>Category:</strong> {item.medicine?.category || "Not specified"}</p>
//                       <hr />
//                     </div>
//                   ))
//                 ) : (
//                   <p>No medicines available for this order</p>
//                 )}
//               </div>
//               <div className="customerdetails">
//                 <h3>Customer Details</h3>
//                 {order.user ? (
//                   <>
//                     <p><strong>User ID:</strong> {order.user.id}</p>
//                     <p><strong>Name:</strong> {order.user.firstName} {order.user.lastName}</p>
//                     <p><strong>Phone Number:</strong> {order.user.phoneNumber}</p>
//                     <p><strong>Email:</strong> {order.user.email}</p>
//                   </>
//                 ) : (
//                   <p>No customer information available</p>
//                 )}

//                 <h3>Payment Details</h3>
//                 {order.payment ? (
//                   <>
//                     <p><strong>Payment ID:</strong> {order.payment.paymentId}</p>
//                     <p><strong>Payment Date:</strong> {new Date(order.payment.paymentDate).toLocaleString()}</p>
//                     <p><strong>Payment Amount:</strong> ₹{order.payment.paymentAmount}</p>
//                     <p><strong>Payment Method:</strong> {order.payment.paymentMethod}</p>
//                     <p><strong>Payment Status:</strong> {order.payment.paymentStatus}</p>
//                   </>
//                 ) : (
//                   <p>No payment information available</p>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default AddOrderAdmin;



import React, { useEffect, useState } from "react";
import "../comp_css/AllOrderAdmin.css";
import api from "../router/api";

const AddOrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("emedicine/orders/all")
      .then((response) => {
        console.log("API Response:", response.data); // Log the API response for debugging
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "10px" }}>All Orders Details</h2>
      <div className="admin-orders">
        {loading ? (
          <p>Loading...</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="orderpart">
                <h3>Order Details</h3>
                <p>Order ID: {order.orderId}</p>
                <p>Status: {order.status}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                <hr />
                <h4>Medicines Ordered</h4>
                {order.orderItem && order.orderItem.length > 0 ? (
                  order.orderItem.map((item) => (
                    <div className="order-item" key={item.orderItemId}>
                      <p><strong>Medicine Name:</strong> {item.medicine?.name || "Not Available"}</p>
                      <p><strong>Price:</strong> ₹{item.medicine?.price || "N/A"}</p>
                      <p><strong>Quantity:</strong> {item.quantity || 0}</p>
                      <p><strong>Description:</strong> {item.medicine?.description || "No description available"}</p>
                      <p><strong>Category:</strong> {item.medicine?.category || "Not specified"}</p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No medicines available for this order</p>
                )}
              </div>
              <div className="customerdetails">
                <h3>Customer Details</h3>
                {console.log("User Details:", order.customer)}
                {order.user ? (
                  <>
                    <p><strong>User ID:</strong> {order.user.id}</p>
                    <p><strong>Name:</strong> {order.user.firstName} {order.user.lastName}</p>
                    <p><strong>Email:</strong> {order.user.email}</p>
                    <p><strong>Phone Number:</strong> {order.user.phoneNumber}</p>
                  </>
                ) : (
                  <p>No customer information available</p>
                )}

                <h3>Payment Details</h3>
                {order.payment ? (
                  <>
                    <p><strong>Payment ID:</strong> {order.payment.paymentId}</p>
                    <p><strong>Payment Date:</strong> {new Date(order.payment.paymentDate).toLocaleString()}</p>
                    <p><strong>Payment Amount:</strong> ₹{order.payment.paymentAmount}</p>
                    <p><strong>Payment Method:</strong> {order.payment.paymentMethod}</p>
                    <p><strong>Payment Status:</strong> {order.payment.paymentStatus}</p>
                  </>
                ) : (
                  <p>No payment information available</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AddOrderAdmin;
