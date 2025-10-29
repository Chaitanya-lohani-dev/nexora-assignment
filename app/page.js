"use client"; 

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '@/app/context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("An Error occurred while fetching products: ", error);
        alert("Unable to fetch products. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    await addToCart(product);
  };

  if (loading) {
    return <main className="p-12"><p>Loading products...</p></main>;
  }

  return (
    <main className="p-12 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.productId} className="border rounded-lg p-4 shadow-lg bg-white text-black">
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-4" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-xl font-bold mt-2">₹{product.price}</p>
            <button 
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

