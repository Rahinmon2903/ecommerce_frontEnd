import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Services/api';

const ProductDetials = () => {
    const {id} = useParams();
    const[product, setProduct] = useState(null);




    useEffect(()=>{
        fetchingDetials();
    },[id])

    const fetchingDetials=async()=>{
        try {
             const response=await api.get(`/products/getById/${id}`);
        setProduct(response.data.product)
            
        } catch (error) {
              console.error("Error fetching product:", error);
      setProduct(null);
            
        }
       
    }

        const addToCart=async () => {
      try {
        await api.post("/cart/add", { productId: id ,quantity:1}); 
        alert("Product added to cart");
        
      } catch (error) {
        console.error("Error adding product to cart:", error);
        
      }
      
    }
    
      if (!product) {
    return <p className="p-6">no product Found</p>;
  }

    return (
        <div>
              <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-600">{product.description}</p>
      <p className="mt-2 font-semibold">₹ {product.price}</p>
      <p className="text-sm text-gray-500">
        Seller: {product.seller?.name}
      </p>
      <button onClick={addToCart} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
        Add to Cart
      </button>
    </div>
        
            
        </div>
    );
};

export default ProductDetials;