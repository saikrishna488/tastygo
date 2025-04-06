import express from 'express'
const app = express()
import cors from 'cors'
const port = process.env.PORT || 5000
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import clientRoute from './routes/clientRoute.js'
import partnerRoute from './routes/partnerRoute.js'



app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "https://express-backend-584904539504.us-central1.run.app", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
}));

//connecting database
import './config/db.js'

app.get('/',(req,res)=>{
    res.send("api is live")
})

app.use('/',userRoute)
app.use('/',clientRoute)
app.use('/',partnerRoute)

app.listen(port,()=>console.log("Server is Running http://127.0.0.1:"+port))
