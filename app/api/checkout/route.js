import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import CartItem from "@/app/models/CartItem";

export async function POST(request) {
  try {
    const body = await request.json();
    const { cartItems } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    await dbConnect();

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await CartItem.deleteMany({});

    return NextResponse.json(
      {
        success: true,
        message: "Checkout successful",
        receipt: {
          totalAmount: totalPrice,
          itemsPurchased: cartItems.length,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
