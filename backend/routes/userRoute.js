import express from 'express'
const router = express.Router()
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'



// register
router.post("/register", async (req, res) => {

    try {

        const { email, name, password, phone, location } = req.body

        if (!email || !name || !password) {
            return res.status(400).json({
                res: false,
                msg: "Incomplete Data"
            })
        }

        const user = await userModel.findOne({ email })

        if (user) {
            return res.status(500).json({
                res: false,
                msg: "User already Registered"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await userModel.create({ name, email, password : hashedPassword, phone: phone && phone, location: location && location })

        return res.status(200).json({
            res: true,
            msg: "Registration Successful"
        })


    }
    catch (err) {
        console.log(err)
    }
})

//login
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                res: false,
                msg: "Incomplete Data"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                res: false,
                msg: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                res: false,
                msg: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "fallbackSecret",
            { expiresIn: "30d" }
        );


        const { password: pwd, ...userObj } = user._doc;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure flag in production
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: "/", // Available in all routes
        });


        return res.status(200).json({
            msg: "Login successful",
            res: true,
            user: userObj
        })
    }
    catch (err) {
        console.log(err)
    }

})


router.get("/jwt", async (req, res) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ res: false, msg: "No token found in cookies" });
        }

        // Verify & Decode token
        const secret = process.env.JWT_SECRET || "fallbackSecret";

        const decoded = jwt.verify(token, secret);

        const user = await userModel.findById(decoded.id)

        const { password: pwd, ...data } = user._doc


        return res.status(200).json({ res: true, msg: "Token verified", user: data });
    } catch (err) {
        return res.status(401).json({ res: false, msg: "Invalid or expired token" });
        
    }
})

export default router;
