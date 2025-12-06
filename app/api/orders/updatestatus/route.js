import { connectDB } from "@/lib/db";
import Order from "@/models/order";

export const POST = async (req) => {
    const { status,transactionId } = await req.json();
    try {
        await connectDB();

        const order = await Order.findOne({transactionId});
        if(!order){
            return Response.json({success:true,message:"Order not found"});
        }
        
        const updatedOrder = await Order.findOneAndUpdate   ({transactionId},{orderStatus:status},{new:true});
        
        return Response.json({success:true,message:"Status updated successfully."});
    
    } catch (error) {
        return Response.json({success:false,message:error.message})
    }
}