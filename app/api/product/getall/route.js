import { connectDB } from "@/lib/db"
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await connectDB();

        const products = await Product.find({});

        return NextResponse.json({ success: true, message: "Product fetched successfully", products });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
}