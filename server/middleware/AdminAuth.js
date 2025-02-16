import jwt from "jsonwebtoken"
import userModel from "../models/userModels.js    "

const AdminAuth = async (req, res, next) => {
    try {

        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "NOT AUTHORIZED TO PERFORM THIS ACTION" })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        const { email, role } = token_decode;


        if (email === process.env.ADMIN_EMAIL && role === 'admin') {
            return next();
        }

        const user = await userModel.findOne({ email });
        if (!user && user.role !== "admin") {
            res.json({ success: false, message: "NOT AUTHORIZED TO PERFORM THIS ACTION" })
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export default AdminAuth