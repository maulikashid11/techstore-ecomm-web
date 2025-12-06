import { NextResponse } from "next/server";

export const GET = async (req) => {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json(
            { success: false, message: "Please Login" },
        );
    }

    const res = NextResponse.json({ success: true, message: "User logged out successful." })
    res.cookies.set("token", "", {
        httpOnly: true
    })
    return res;
}