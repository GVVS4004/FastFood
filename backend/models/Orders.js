const mongoose =require('mongoose')
const {Schema}=mongoose;

const OrderSchema = new Schema({
    email:{
        type:String,
        required:true,
        // unique:true
    },
    orders:{
        type:Array,
    order_data:{
        type:Array,
        required:true,
    },
    order_date:{
        type: Date,
        required:true,
    },
    delivery_type:{
        type:String,
        required:true,
    },
    required:true,
}
})

module.exports =mongoose.model('order',OrderSchema)