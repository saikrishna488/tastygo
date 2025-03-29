import { connectToDB } from "@/app/lib/mongodb";
import { NextResponse as res, NextRequest } from "next/server";
import userModel from '@/app/models/userModel.js'
import jwt from 'jsonwebtoken';


interface User {
    email: string,
    password: string
}

export async function POST(req: Request) {
    try {

        await connectToDB();
        const { email, password }: User = await req.json();

        if (!email || !password) {
            return res.json({
                res: false,
                msg: "Incomplete data"
            }, { status: 400 })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({
                res: false,
                msg: "User doesn't exist"
            }, { status: 404 })
        }

        const { password: pwd, ...userObj } = user._doc;

        if (user.password === password) {

            const token = jwt.sign({ id: user._id, email: user.email }, "SAI", {
                expiresIn: "30d",
            });


            const response = res.json({
                res: true,
                msg: "Login Successful",
                user: userObj,
                token
            }, { status: 200 })

            response.headers.set(
                "Set-Cookie",
                `token=${token}; HttpOnly; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Strict;`
            );

            return response;
        }

    }
    catch (err) {
        console.log(err)

        return res.json({
            res: false,
            msg: "Server error",
        }, { status: 500 })
    }
}