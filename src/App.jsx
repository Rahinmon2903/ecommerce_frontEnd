import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Cart from '../Pages/Cart';
import ProductList from '../Pages/ProductList';
import ProductDetials from '../Pages/ProductDetials';
import CheckOut from '../Pages/CheckOut';
import BuyerDashboard from '../Pages/BuyerDashboard';
import SellerDashboard from '../Pages/SellerDashboard';
import Footer from '../Components/Footer';

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
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
     <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetials />} />
         <Route path="/checkout" element={<CheckOut />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
    </Routes>
    <div>
      <Footer/>
    </div>
    
    
    
    
    </BrowserRouter>
  
      
    </>
  );
};

export default App;