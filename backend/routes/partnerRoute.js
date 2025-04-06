import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
const router = express.Router();


//register
router.post("/pregister", async(req, res)=>{


    try{

        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.status.json({
                res: false,
                msg: "Incomplete request"
            })
        }

        const puser = await userModel.findOne({email,type:"p"})

        if(puser){
            return res.status(200).json({
                res: false,
                msg: "Restaurant already found"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const partner = await userModel.create({
            name,
            email,
            password:hashedPassword,
            type: "p"
        })

        const {password:pwd, ...puserObj} = partner._doc

        return res.status(200).json({
            res:true,
            msg: "complete",
            puser:puserObj
        })

    }
    catch(err){

        console.log(err);
        return res.status(401).json({
            res: false,
            msg: "server error"
        })
    }
});

//login
router.post('/plogin', async(req,res)=>{

    try{

        const {email, password} = req.body;

        const puser = await userModel.findOne({email, type:'p'});

        if(!puser){
            return res.status(200).json({
                res: false,
                msg: "partner not found"
            })
        }

        const isMatch = await bcrypt.compare(password,puser.password)

        if(!isMatch){
            return res.status(200).json({
                res: false,
                msg: "Invalid password"
            })
        }

        const {password:pwd, ...puserObj} = puser._doc;

        return res.status(200).json({
            res: true,
            msg: "Successful",
            puser: puserObj

        })


    }
    catch(err){

        console.log(err)
        return res.status(500).json({
            res:false,
            msg: "server error"
        })
    }
})

export default router;