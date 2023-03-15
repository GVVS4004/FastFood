const express =require("express")
const router = express.Router()
const Cart =require("../models/Carts")
const bodyParser = require("body-parser");
// const { create } = require("../models/User");

router.post('/UserCart',bodyParser.json(),async(req,res)=>{
    const reqJson=req.body
    // console.log(reqJson)
    try{
        let UserCart=await Cart.findOne({"email":reqJson.email})
        // console.log(UserCart);
        if (!UserCart){
            await Cart.create({
                email:reqJson.email,
                items:reqJson.newAr,
            })
        }
        else{
            // console.log("hi");
            const updateCart = await Cart.updateOne({'email':reqJson.email},{'items':reqJson.newAr});
            // console.log(updateCart);
        }
    }
    catch(error){
        console.log(error);
    }
})
router.post('/newCart',bodyParser.json(),async(req,res)=>{
    const response= await Cart.create({
        email:req.body.email,
        items:[]
    })
})
router.post('/getCart',bodyParser.json(),async(req,res)=>{
    // console.log(req.body.email);
    const response =await Cart.findOne({'email':req.body.email});
    return res.json({response});
})

module.exports =router;