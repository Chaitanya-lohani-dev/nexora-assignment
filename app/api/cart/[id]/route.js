import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import CartItem from "@/app/models/CartItem";

export async function DELETE(request, context) {

    const {id} = await context.params;
    
    if (isNaN(id)) { 
    return NextResponse.json({ success: false, message: `Invalid ID: ${id} is not a number.` }, { status: 400 });
  }

    try {
        await dbConnect();

        const deleteItem = await CartItem.findOneAndDelete({ productId : id});

        if (!deleteItem) {
            return NextResponse.json({success : false, message : "Item not found in cart"}, {status : 404});
        }

        return NextResponse.json({success : true, message : "Item removed from cart"}, {status : 200});
    } catch (error) {
        return NextResponse.json({success : false, error: error.message}, {status : 500});
    }
}
