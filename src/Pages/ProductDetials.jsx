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
    </div>
        
            
        </div>
    );
};

export default ProductDetials;