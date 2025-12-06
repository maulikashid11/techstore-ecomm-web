import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
    await connectDB()
    const { userId  } = await auth();    
    console.log(userId)
    await User.findOneAndUpdate(
        { userId },
        { userId },
        { upsert: true, new: true }
    );

    return Response.json({ ok: true });
}
