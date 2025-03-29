import userModel from "@/app/models/userModel";
import { connectToDB } from "@/app/lib/mongodb";
import { NextResponse as res } from "next/server";

export async function POST(req: Request) {
    try {

        const { name, email, password, phone } = await req.json()

        if (!name || !email || !password) {
            return res.json({
                res: false,
                msg: "Incomplete request"
            }, {
                status: 400
            })
        }

        const user = await userModel.findOne({email})

        if(user){
            return res.json({
                res: false,
                msg: "User Already Exist"
            }, {
                status: 500
            })
        }

        await userModel.create({name,email,phone,password})

        return res.json({
            res: true,
            msg: "Success"
        }, {
            status: 200
        })

    }
    catch (err) {
        console.log(err)
    }
}