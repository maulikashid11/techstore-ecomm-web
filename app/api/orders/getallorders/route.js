import { connectDB } from "@/lib/db"
import Order from "@/models/order";

export const GET = async (req) => {
    try {
        await connectDB();

        const orders = await Order.find();

        return Response.json({ success: true, message: "Order fetched successfully", orders });

    } catch (error) {
        return Response.json({ success: false, message: error.message });
    }
}