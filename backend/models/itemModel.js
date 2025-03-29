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

    price : {
        type : Number,
        required : true
    },

    restaurant_name : {
        type : String,
        required : true
    },

    restaurant_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'restaurant',
        required : true
    },
    category : {
        type : String,
        required : true
    }
})

const itemModel = mongoose.models.item || mongoose.model('item',itemSchema)

export default itemModel;
