import React, { useEffect, useState } from 'react';
import api from '../Services/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts();

    },[])

    const fetchProducts = async () => {
        try {
          const response = await api.get('/products/getdata');
       
          setProducts(response);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    return (
        <div>
            <h1>Product List</h1>
            
           
            
        </div>
    );
};

export default ProductList;