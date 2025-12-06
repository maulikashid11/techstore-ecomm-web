import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    cart: [
        {
            productId: String,
            count: Number,
        }
    ]
},{timestamps:true})

 const User = mongoose.models?.user || mongoose.model('user',userSchema);
export default User