import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";

export const POST = async (req) => {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);

    //check if razorpayOrderId is present on the server
    let p = await Order.findOne({ transactionId: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ success: false, message: "order id not found" })
    }
    
    //fetch the secret of user who is getting the payment
    //verify the payment
    let result = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, process.env.RAZORPAY_KEY_SECRET);

    if (result) {
        const updatedPayment = await Order.findOneAndUpdate({transactionId: body.razorpay_order_id }, { status: "paid" }, { new: true });
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/payment/success`)
    } else {
        return NextResponse.json({ success: false, message: "Payment verification failed." })
    }
}