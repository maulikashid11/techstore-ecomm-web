import { connectDB } from "@/lib/db";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const GET = async (req) => {
    const token = req.cookies.get('token')?.value;
    try {
        await connectDB();
        if (!token) {
            return NextResponse.json({ success: false, messag: "User not logged in." })
        }
        const { email } = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return NextResponse.json({ success: false, message: "User not exists" });
        }

        const res = NextResponse.json({ success: true, message: "User fetched successfully" });
        return res;
    } catch (error) {
        return NextResponse.json({ success: false, message:error.message})
    }
}