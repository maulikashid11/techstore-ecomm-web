import { connectDB } from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export const POST = async (req) => {
    await connectDB();
    const { fullname, email, password, adminAccessKey } = await req.json();

    if (!fullname || !email || !password || !adminAccessKey) {
        return NextResponse.json({ success: false, message: "Provide all details" })
    }
    try {

        const exitingAdmin = await Admin.findOne({ email });

        if (adminAccessKey !== process.env.ADMIN_ACCESS_KEY) {
            return NextResponse.json({ success: false, message: "Please Provide the correct access key" })

        }

        if (exitingAdmin) {
            return NextResponse.json({ success: false, message: "User already registered" })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const createdAdmin = await Admin.create({
            fullname, email, password: hashedPass,
        })

        const token = jwt.sign({ id: createdAdmin.id, email: createdAdmin.email }, process.env.JWT_SECRET);

        const res = NextResponse.json({ success: true, message: 'Admin created successfully' });
        res.cookies.set('token', token, { httpOnly: true });
        return res;

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message})
    }
}   