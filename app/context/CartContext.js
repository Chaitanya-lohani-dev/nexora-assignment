"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get('/api/cart');
      setCartCount(res.data.cartItems ? res.data.cartItems.length : 0);
    } catch (error) {
      console.error("Failed to fetch cart count", error);
      setCartCount(0); 
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const addToCart = async (product) => {
    try {
      await axios.post('/api/cart', {
        productId: product.productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1 
      });
      fetchCartCount(); 
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("There was an error adding the item to the cart. Please try again.");
    }
  };

  
  return (
    <CartContext.Provider value={{ cartCount, addToCart, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

