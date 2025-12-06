import { connectDB } from "@/lib/db"
import Order from "@/models/order";
import { auth } from "@clerk/nextjs/server";


export const GET = async (req) => {
    try {
        await connectDB();
        const { userId } = await auth();
        if(!userId){
            return Response.json({success:false,message:"User id not found"});
        }
        const orders = await Order.find({userId});
        
        return Response.json({success:true,message:"Order fetched successfully",orders});

    } catch (error) {
        return Response.json({success:false,message:error.message});
    }
}