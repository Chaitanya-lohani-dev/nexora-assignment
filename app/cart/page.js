"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext'; 

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const { fetchCartCount } = useCart();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCartItems(response.data.cartItems);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Error fetching cart items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/cart/${productId}`);
      alert("Item removed from cart.");
      fetchCart();
      fetchCartCount();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error removing item.");
    }
  };

  if (loading) {
    return <main className="p-8"><p>Loading your cart...</p></main>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Your Cart 🛒</h1>
      
      {cartItems.length === 0 ? (
        <p className='text-black'>Your cart is empty. <Link href="/" className="text-blue-500 hover:underline">Continue shopping</Link></p>
      ) : (
        <div>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-black">
                {cartItems.map((item) => (
                  <tr key={item.productId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">₹{item.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleDelete(item.productId)}
                        className="bg-red-600 text-white py-1 px-3 text-xs rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end items-center">
            <div className="text-2xl font-bold text-black">
              Total: ₹{totalPrice}
            </div>
            <Link 
              href="/checkout" 
              className="ml-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>

        </div>
      )}
    </main>
  );
}
