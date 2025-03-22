import express from 'express'
const app = express()
import cors from 'cors'
const port = 5000 || process.env.PORT
import userRoute from './routes/user_auth.js'


app.use(express.json())
app.use(cors())

//connecting database
import './db/config.js'

app.get('/',(req,res)=>{
    res.send("api is live")
})

app.use('/',userRoute)

app.listen(port,()=>console.log("Server is Running http://127.0.0.1:"+port))
