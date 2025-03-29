import express from 'express'
const router = express.Router()
import restaurantModel from '../models/restaurantModel.js'


router.post('/restaurant', async (req, res)=>{
    try{

        const {name, description, client_id, image} = req.body

        if(!name || !description || !client_id ){
            return res.status(401).json({
                res : false,
                msg: "Incomplete request"
            })
        }

        const restaurant = await restaurantModel.findOne({client_id})

        if(restaurant){
            return res.status(401).json({
                res : false,
                msg : "Cannot Add multiple restraurants"
            })
        }

        const newRestaurant = await restaurantModel.create({
            name,
            description,
            client_id,
        })

        return res.status(200).json({
            res : true,
            msg : "successful",
            restaurant : newRestaurant
        })


    }
    catch(err){
        console.log(err)

        return res.status(404).json({
            res: false,
            msg : "server error"
        })
    }
})


export default router;