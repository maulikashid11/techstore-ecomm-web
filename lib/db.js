import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI not found");


let cached = (global).mongoose;

if (!cached) {
    cached = (global).mongoose = {
        conn: null,
        promise: null,
    }
}

export async function connectDB() {
    if (cached.conn) return cached.conn;
    console.log(cached);
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => mongoose)
    }
    console.log(cached)
    cached.conn = await cached.promise;
    return cached.conn;
}