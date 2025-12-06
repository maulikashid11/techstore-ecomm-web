import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    
}, { timestamps: true })

const Admin = mongoose.models?.admin || mongoose.model('admin', adminSchema);
export default Admin