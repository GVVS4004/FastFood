const mongoose = require('mongoose')
const {Schema} =mongoose;

const ContactSchema =Schema({
    Firstname:{
        type:String,
        required:true,
    },
    Lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    }
})

module.exports =mongoose.model('contacts',ContactSchema)
