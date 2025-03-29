import { NextResponse as res, NextRequest } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";
import userModel from "@/app/models/userModel";


export async function GET(req: NextRequest) {
    try {
        // Extract token from cookies
        connectToDB()
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return res.json({ res: false, msg: "No token found in cookies" }, { status: 401 });
        }

        // Verify & Decode token
        const secret = "SAI"; // Use process.env.JWT_SECRET in production
        const decoded:any = jwt.verify(token, secret);

        const user = await userModel.findById(decoded.id)

        const {password:pwd, ...data} = user._doc


        return res.json({ res: true, msg: "Token verified", user: data }, { status: 200 });
    } catch (err) {
        return res.json({ res: false, msg: "Invalid or expired token" }, { status: 401 });
    }
}
