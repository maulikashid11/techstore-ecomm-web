import { connectDB } from "@/lib/db";
import Product from "@/models/product";

export const DELETE = async (req)=>{
    const {id} = await req.json();
    
    try {   
        await connectDB();
        console.log(id);
        const product = await  Product.findById(id);
        console.log(product);
        if(!product){
            return Response.json({success:false,message:"Product not found"});
        }

        const deletedProduct = await Product.findOneAndDelete({_id:id});

        return Response.json({success:true,message:"Product deleted successfully"});
    } catch (error) {
        return Response.json({success:false,message:error.message});
    }
}