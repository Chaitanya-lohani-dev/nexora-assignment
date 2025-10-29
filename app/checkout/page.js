"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext'; 

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState(''); 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [receipt, setReceipt] = useState(null);

  const { fetchCartCount } = useCart();
  const router = useRouter(); 

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data.cartItems);
        setTotalPrice(response.data.totalPrice);
        if (response.data.cartItems.length === 0) {
          setError("Your cart is empty. Redirecting to home...");
          setTimeout(() => router.push('/'), 3000);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Error fetching cart items.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email) {
      setError("Please fill in both name and email.");
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/checkout', { cartItems });
      
      setReceipt(response.data.receipt); 
      fetchCartCount(); 
      
      setTimeout(() => {
        router.push('/');
      }, 5000);

    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <main className="p-8 max-w-lg mx-auto">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Checkout Successful!</strong>
          <span className="block sm:inline"> Thank you for your purchase.</span>
          <div className="mt-4 p-4 bg-white rounded text-black">
            <h3 className="text-lg font-bold">Your Receipt</h3>
            <p><strong>Total Amount:</strong> ₹{receipt.totalAmount}</p>
            <p><strong>Items Purchased:</strong> {receipt.itemsPurchased}</p>
            <p><strong>Timestamp:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
          </div>
          <p className="mt-4 text-sm">You will be redirected to the homepage in 5 seconds...</p>
        </div>
      </main>
    );
  }

  if (loading || error) {
    return (
      <main className="p-8">
        <p>{loading ? "Loading checkout..." : error}</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-black">
        
        <div>
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black p-2"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Pay ₹${totalPrice}`}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border text-black">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.productId} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <hr className="my-6" />
          <div className="flex justify-between text-xl font-bold">
            <p>Total</p>
            <p>₹{totalPrice}</p>
          </div>
        </div>

      </div>
    </main>
  );
}

