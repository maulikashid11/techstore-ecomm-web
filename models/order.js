import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [
        {
            id: String,
            name: String,
            price: Number,
            image: String,
            category: String,
            productCount: Number,
        }
    ],
    status: {
        type: String,
        enum: ['pending', "paid", "failed"],
        default: "pending",
    },
    transactionId: {
        type: String,
        required: true,
    },
    shippingInfo: {
        firstname: String,
        lastname: String,
        email: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
    },
    orderStatus: {
        type: String,
        enum: [
            "pending",
            "processing",
            "packed",
            "shipped",
            "out_for_delivery",
            "delivered",
            "cancelled",
        ],
        default: "pending"
    },
    totalPrice: Number,

}, { timestamps: true });


const Order = mongoose.models?.order || mongoose.model("order", orderSchema);

export default Order;