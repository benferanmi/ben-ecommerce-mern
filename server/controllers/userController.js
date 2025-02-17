import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModels.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        } else {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//Route for user Registration 
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        //checking if user already exists or not by using the email to check 
        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid Email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a strong password" })
        }

        //hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            role: "subscriber",
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Routes for admin Login
const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body

        const mainAdminEmail = process.env.ADMIN_EMAIL;
        const mainAdminPassword = process.env.ADMIN_PASSWORD;

        if (email === mainAdminEmail) {
            // Verify main admin password
            if (password === mainAdminPassword) {
                const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '5h' });
                return res.json({ success: true, token, role: 'admin' });
            } else {
                return res.json({ success: false, message: "Invalid main admin password" });
            }
        }

        const user = await userModel.findOne({ email });

        if (!user || user.role !== 'admin') {
            return res.json({ success: false, message: "Admin account not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '5h' });
        return res.status(200).json({ success: true, token, role: 'admin' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//Routes for admin registration
const adminRegister = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        //checking if user already exists or not by using the email to check 
        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid Email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a strong password" })
        }

        //hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            role: "admin",
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { loginUser, registerUser, adminLogin, adminRegister }