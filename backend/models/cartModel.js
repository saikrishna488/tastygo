import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    restaurant_name : {
        type : String,
        required : true
    },

    restaurant_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'restaurant',
        required : true
    },
    category: {
        type : String,
        required : true
    },
    
    user_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true
    }
})

const cartModel = mongoose.models.item || mongoose.model('cart',cartSchema)

export default cartModel;
