import express from 'express'
const app = express()
import cors from 'cors'
const port = 5000 || process.env.PORT
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import clientRoute from './routes/clientRoute.js'


app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
}));

//connecting database
import './config/db.js'

app.get('/',(req,res)=>{
    res.send("api is live")
})

app.use('/',userRoute)

app.listen(port,()=>console.log("Server is Running http://127.0.0.1:"+port))
