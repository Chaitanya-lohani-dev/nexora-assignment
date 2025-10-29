import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vibe Commerce",
  description: "Assignment for Vibe Commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="bg-gray-100 min-h-screen">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}

