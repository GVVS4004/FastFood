const express =require("express")
const router = express.Router()
const Order =require("../models/Orders")
const bodyParser = require("body-parser");

router.post ("/orderData",bodyParser.json(),async(req,res)=>{

    let data=req.body.order_data;
    let eId =await Order.findOne({'email':req.body.email})

    if(eId===null){
        try{
            await Order.create({
                email:(req.body.email),
                orders:[{
                order_data:data,
                order_date:req.body.order_date,
                delivery_type:req.body.delivery_type,
                order_total:req.body.order_total}]
            }).then(()=>{
                res.json({success:true})
            })
        }catch(error){
            console.log(error.message)
            res.send("Server Error",error.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},{$push:{orders:{order_data:data,order_date:req.body.order_date,
                delivery_type:req.body.delivery_type,order_total:req.body.order_total}}}).then(()=>{
                res.json({success:true})
            })
        }catch(error){
            console.log(error);
        }
    }
})

router.post('/getOrders',bodyParser.json(),async (req,res)=>{
    const email=req.body.email;
    const data= await Order.findOne({'email':email});
    if (data!=null){
        return res.json({success:true,data:data});
    }
    else{
        return res.json({success:false});
    }
    
})

module.exports =router;