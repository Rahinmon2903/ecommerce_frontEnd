import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";

import Login from "./Pages/Login";

import Cart from "./Pages/Cart";
import ProductList from "./Pages/ProductList";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";

import SellerDashboard from "./Pages/SellerDashboard";
import Footer from "./Components/Footer";
import SellerOrders from "./Pages/SellerOrders";
import MyOrders from "./Pages/MyOrders";
import RegisterChoice from "./Pages/RegisterChoice";
import RegisterBuyer from "./Pages/RegisterBuyer";
import RegisterSeller from "./Pages/RegisterSeller";
import ProtectedRoute from "./Components/ProtectedRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Wishlist from "./Pages/Wishlist";
import SellerStats from "./Pages/SellerStats";
import PageLoader from "./Components/PageLoader";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <PageLoader />
        <div>
          <Navbar />
        </div>
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/register-buyer" element={<RegisterBuyer />} />
          <Route path="/register-seller" element={<RegisterSeller />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute role="buyer">
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute role="buyer">
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute role="buyer">
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller-stats"
            element={
              <ProtectedRoute role="seller">
                <SellerStats />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller-dashboard"
            element={
              <ProtectedRoute role="seller">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller-Orders"
            element={
              <ProtectedRoute role="seller">
                <SellerOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-Orders"
            element={
              <ProtectedRoute role="buyer">
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<RegisterChoice />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
