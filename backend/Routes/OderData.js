const express =require("express")
const router = express.Router()
const Order =require("../models/Orders")
const bodyParser = require("body-parser");

router.post ("/orderData",bodyParser.json(),async(req,res)=>{
    // console.log(req.body);
    // res.send(req.body);
    let data=req.body.order_data;
    const temp=await data.splice(0,1,{Order_data:req.body.order_data})
    console.log("temp",temp)
    let eId =await Order.findOne({'email':req.body.email})
    console.log("eid",eId);
    if(eId===null){
        try{
            await Order.create({
                email:(req.body.email),
                order_data:temp,
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
            await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:temp[0]}}).then(()=>{
                res.json({success:true})
            })
        }catch(error){
            console.log(error)
            // res.send({"Server Error"},error.message);
        }
    }
})

module.exports =router;