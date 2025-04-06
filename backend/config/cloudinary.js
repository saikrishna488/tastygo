// cloudinary.js
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: "di8omhhiu",
  api_key: "679779374477235",
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary
