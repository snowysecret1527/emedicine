

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../router/api"; // Ensure your Axios instance is properly configured
import "../comp_css/Cart.css";// Ensure this file exists with relevant styles

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState({ cartItems: [] });
  const [totalAmount, setTotalAmount] = useState(0);

  const cartId = localStorage.getItem("cartid");
  const userId = localStorage.getItem("userid");

  // Fetch Cart Data
  const fetchCartData = async () => {
    if (!cartId || cartId === "null" || cartId === "undefined") {
      alert("Cart ID is missing. Please add a product to the cart first.");
      return;
    }

    try {
      const response = await api.get(`http://127.0.0.1:8081/emedicine/cart/products/${cartId}`);
      setCartData(response.data);
      setTotalAmount(response.data.totalAmount || 0);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      alert("Failed to fetch cart data. Please try again later.");
    }
  };

  useEffect(() => {
    document.title = "EMedicine | Cart";
    if (cartId) fetchCartData();
  }, [cartId]);

  // Place Order
  const placeOrder = async () => {
    if (!userId) {
      alert("User ID is missing. Please log in.");
      return;
    }

    try {
      await api.post(`http://127.0.0.1:8081/emedicine/orders/placed/${userId}`);
      alert("Order Placed Successfully!");
      setCartData({ cartItems: [] });
      setTotalAmount(0);
      navigate("/user/order-details");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // Remove a Product from Cart
  const removeProductFromCart = async (productId) => {
    if (!productId) {
      alert("Product ID is missing.");
      return;
    }

    try {
      await api.delete(`http://127.0.0.1:8081/emedicine/cart/remove-product/${cartId}/${productId}`);
      alert("Product removed from cart.");
      fetchCartData();
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Failed to remove product.");
    }
  };

  // Empty the Cart
  const emptyCart = async () => {
    try {
      await api.delete(`http://127.0.0.1:8081/emedicine/cart/empty-cart/${cartId}`);
      setCartData({ cartItems: [] });
      setTotalAmount(0);
      alert("All cart items removed.");
    } catch (error) {
      console.error("Error emptying cart:", error);
      alert("Cart is already empty or cannot be emptied.");
    }
  };

  // Increase Quantity
  const increaseCount = async (productId) => {
    try {
      await api.put(`http://127.0.0.1:8081/emedicine/cart/increase-productQty/${cartId}/${productId}`);
      fetchCartData();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // Decrease Quantity
  const decreaseCount = async (productId) => {
    try {
      await api.put(`http://127.0.0.1:8081/emedicine/cart/decrease-productQty/${cartId}/${productId}`);
      fetchCartData();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      alert("Quantity cannot be decreased further.");
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartData.cartItems.length > 0 ? (
        <div className="cart-list">
          {cartData.cartItems.map((item) => (
            <div className="cart-card" key={item.cartItemId}>
              <div className="cartproduct-image1">
                <img
                  src={item.medicine?.imageUrl || "default-image.jpg"}
                  alt={item.medicine?.name || "Product Image"}
                />
              </div>
              <div className="cartproduct-info">
                <h2>{item.medicine?.name || "Unnamed Product"}</h2>
                <p>Category: {item.medicine?.category || "N/A"}</p>
                <p>Description: {item.medicine?.description || "No description available"}</p>
                <h2 className="cartproduct-price">Price: ₹ {item.medicine?.price || 0}</h2>
                <div className="increaseBtn">
                  <button onClick={() => increaseCount(item.medicine?.id)}>+</button>
                  <span style={{ fontSize: "25px", color: "red", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button onClick={() => decreaseCount(item.medicine?.id)}>-</button>
                </div>
                <div>
                  <button onClick={() => removeProductFromCart(item.medicine?.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-cart-message">
          <h1>
            Your cart is empty. <Link to="/">Shop Now</Link>
          </h1>
        </div>
      )}

      <div className="cart-details">
        <h2>Total Cart Amount: ₹ {totalAmount}</h2>
        <div className="counter-box">
          <div>
            <button onClick={placeOrder}>Place Order</button>
          </div>
          <div>
            <button onClick={emptyCart} style={{ backgroundColor: "red" }}>
              Empty Cart
            </button>
          </div>
          <div>
            <button onClick={() => navigate("/user/order-details")}>Order Page</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;










