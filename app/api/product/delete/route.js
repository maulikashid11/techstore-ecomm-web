import { connectDB } from "@/lib/db";
import Product from "@/models/product";

export const DELETE = async (req)=>{
    const {id} = await req.json();
    
    try {   
        await connectDB();
        const product = await  Product.findById(id);
        if(!product){
            return Response.json({success:false,message:"Product not found"});
        }

        const deletedProduct = await Product.findOneAndDelete({_id:id});

        return Response.json({success:true,message:"Product deleted successfully"});
    } catch (error) {
        return Response.json({success:false,message:error.message});
    }
}