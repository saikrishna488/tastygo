import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    image_url : {
        type : String
    },

    client_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
})

const restaurantModel = mongoose.models.restaurant || mongoose.model('restaurant',restaurantSchema)

export default restaurantModel;
