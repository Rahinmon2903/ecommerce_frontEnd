import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import ProductCard from '../Components/ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts();

    },[])

    const fetchProducts = async () => {
        try {
          const response = await api.get('/products/getdata');
       
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    return (
        <div>
            <h1>Product List</h1>
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}

           
            
        </div>
    );
};

export default ProductList;