import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';

import Cart from './Pages/Cart';
import ProductList from './Pages/ProductList';
import ProductDetials from './Pages/ProductDetials';
import CheckOut from './Pages/CheckOut';

import SellerDashboard from './Pages/SellerDashboard';
import Footer from './Components/Footer';
import SellerOrders from './Pages/SellerOrders';
import MyOrders from './Pages/MyOrders';
import RegisterChoice from './Pages/RegisterChoice';
import RegisterBuyer from './Pages/RegisterBuyer';
import RegisterSeller from './Pages/RegisterSeller';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <div>
      <Navbar/>
    </div>
    <Routes>
     <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register-buyer' element={<RegisterBuyer />} />
      <Route path='/register-seller' element={<RegisterSeller />} />
      <Route path='/cart' element={<ProtectedRoute role="buyer"><Cart /></ProtectedRoute>} />
     <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetials />} />
         <Route path="/checkout" element={<ProtectedRoute role="buyer"><CheckOut /></ProtectedRoute>} />
    
        <Route path="/seller-dashboard" element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>} />
        <Route path="/seller-Orders" element={<ProtectedRoute role="seller"><SellerOrders /></ProtectedRoute>} />
        <Route path="/my-Orders" element={<ProtectedRoute role="buyer"><MyOrders /></ProtectedRoute>} />
        <Route path="/register-choice" element={<RegisterChoice />} />
    </Routes>
    <div>
      <Footer/>
    </div>
    
    
    
    
    </BrowserRouter>
  
      
    </>
  );
};

export default App;