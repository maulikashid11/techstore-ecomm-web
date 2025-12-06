import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { auth } from "@clerk/nextjs/server";
import Razorpay from "razorpay";

export const POST = async (req) => {
    await connectDB();
    const { cartItems, shippingInfo, totalPrice } = await req.json();
    const { userId } = await auth();
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const options = {
        amount: Number.parseInt(totalPrice) * 100,
        currency: "INR"
    }

    const order =await razorpay.orders.create(options);
    await Order.create({
        userId,
        items: cartItems,
        shippingInfo,
        totalPrice,
        transactionId: order.id,
    })
    return Response.json({ success: true, message: "Payment initiated", order });
}

