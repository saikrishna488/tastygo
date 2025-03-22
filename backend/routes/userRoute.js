import express from 'express'
const router = express.Router()
import userModel from '../models/userModel.js'


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

        await userModel.create({ name, email, password, phone : phone && phone, location : location && location })

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

        if (!user || user.password !== password) {
            return res.status(401).json({
                res: false,
                msg: "Invalid email or password"
            });
        }

        const { password: pwd, userObj } = user._doc

        return res.status(200).json({
            msg: "Login successful",
            res: true,
            userObj
        })
    }
    catch (err) {
        console.log(err)
    }

})

export default router;
