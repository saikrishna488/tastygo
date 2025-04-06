import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    restaurant_name:{
        type: String,
        required: true
    },

    price : {
        type : Number,
        required : true
    },

    client_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    rating: {
        type: Number,
        default: 5
    },
    image_url: {
        type: String
    }
})

const itemModel = mongoose.models.item || mongoose.model('item',itemSchema)

export default itemModel;
