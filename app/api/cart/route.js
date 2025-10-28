import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import CartItem from "@/app/models/CartItem";

let cart = [];

export async function GET(request) {
    try {
        await dbConnect();

        cart = await CartItem.find({});

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        return NextResponse.json({Success : true, status : 200, cartItems : cart, totalPrice : totalPrice});
    } catch (error) {
        return NextResponse.json({Success : false, status : 500, message : "Error fetching cart items"});
    }
}

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();

        let existingItem = await CartItem.findOne({ productId : body.Id});

        if (existingItem) {
            existingItem.quantity += 1;
            await existingItem.save();
            return NextResponse.json({Success : true, message: "Item quantity updated in cart"}, {status : 200});
        } else {
      const newItem = await CartItem.create(body);
      return NextResponse.json({ success: true, data: newItem }, { status: 201 });
    }
    } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}