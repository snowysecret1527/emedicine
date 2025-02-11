import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom' 
import Login from '../pages/Login.js'
import Product from '../pages/Product.js'
import Cart from '../pages/Cart.js'
import Home from '../pages/Home.js'
import {Privateroute} from '../router/ProtectedRoute.js'

import OrderDetails from '../pages/OrderDetails.js'
import Payment from '../pages/Payment.js'
import PaymentForm from '../pages/PaymentForm.js'
import Profile from '../components/Profile.js'
import Admin from '../pages/Admin.js'
import Registration from '../pages/Registration.js'
import SingleProduct from '../pages/SingleProduct.js'
import NotFound from '../components/NotFound.js'
import AdminLogin from '../pages/AdminLogin.js'
import UploadPrescription from "../components/UploadPrescription.js"
import { Privaterouteadmin } from '../router/ProtectedRoute.js'
import ForgotPassword from '../components/ForgetPassword.js'
export default function RouterPage() {
  return (
    <>
      <Routes>


      <Route path="/" element={<Home />} />
      
    
        <Route path="/product" element={<Product />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/user" element={<Privateroute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="upload" element={<UploadPrescription />} />
        
          <Route path="order-details" element={<OrderDetails />} />
          <Route path="payment-success" element={<Payment />} />
          <Route path="make-payment" element={<PaymentForm />} />
          <Route path="profile/:userid" element={<Profile />} />
        </Route>
{/* 
        <Route path="/admin" element={<Privaterouteadmin />}>
          <Route path="admin" element={<Admin />} />
        </Route> */}
         <Route path="/admin/admin" element={<Admin />} /> 
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register-user" element={<Registration />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/products" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      
      </Routes>
    </>
  )
}