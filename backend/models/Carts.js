const mongoose = require('mongoose');
const {Schema}=mongoose;

const cartSchema= new Schema({
    email:String,
    items:{
        type:Array
    }
});

module.exports =mongoose.model('carts',cartSchema);
