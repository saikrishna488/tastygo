import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    location : {
        type : [Number],
    },

    type: {
        type: String,
        default: "u"
    },
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel;
