"use client";
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Vibe Commerce</Link>
      
      <Link href="/cart">
        <div className="relative">
            <span className="text-3xl">🛒</span>
            <span className="absolute -top-2 -right-4 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
            </span>
        </div>
      </Link>
    </nav>
  );
}

