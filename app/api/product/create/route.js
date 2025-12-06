import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const formData = await req.formData();

    const imageFile = formData.get("image")

    if (!(imageFile instanceof Blob)) {
        return {
            success: false, message: "Image file is required",
        };
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult= await new Promise(
        (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(buffer);
        }
    );

    const imageUrl = uploadResult?.secure_url;
    try {
        await connectDB();
        const product = await Product.create({
            name: formData.get("name"),
            price: formData.get("price"),
            category: formData.get("category"),
            image: imageUrl,
            stock: formData.get("stock"),
            status: formData.get("status"),
        });
        return NextResponse.json({ success: true, message: "Product created successfully", product })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}