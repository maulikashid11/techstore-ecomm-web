import { connectDB } from "@/lib/db";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export const POST = async (res) => {
    await connectDB();
    const { email, password } = await res.json();

    try {
        if (!email || !password) {
            return NextResponse.json({ success: false, message: "Please provide all details" })
        }

        const existingAdmin = await Admin.findOne({ email });

        if (!existingAdmin) {
            return NextResponse.json({ success: false, message: "invalid credentials" })
        }

        const result = await bcrypt.compare(password, existingAdmin.password);

        if (result) {
            const token = jwt.sign({ id: existingAdmin.id, email: existingAdmin.email }, process.env.JWT_SECRET);

            const res = NextResponse.json({ success: true, message: "User loggedin successfully" });
            res.cookies.set('token', token, {
                httpOnly: true
            })
            return res
        } else {
            return NextResponse.json({ success: false, message: "invalid credentials" })
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
}