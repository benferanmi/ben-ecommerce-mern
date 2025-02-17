import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name: { type: String, requierd: true },
    email: { type: String, requierd: true, unique: true },
    role: { type: String },
    password: { type: String, requierd: true },
    cartData: { type: Object, default: {} },
}, { minimize: false })


const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel;