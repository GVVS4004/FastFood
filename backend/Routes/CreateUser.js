const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator');
const   bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret= 'ThisisVijayVenkataSai';

router.post('/createUser',[body('name').isLength({min:1})],bodyParser.json(),async(req,res)=>{
        // const errors= validationResult(req);
        // if (!errors.isEmpty()){
        //     return res.status(400).json({errors:errors.array()});
        // }
        // console.log(req.body.name);
        // console.log("dhrtnn",body('name').isLength({min:1}));
        const salt= await bcrypt.genSalt(10);
        let secPassword =await bcrypt.hash(req.body.password,salt)
        try{
            // console.log(req.body.name);
            await User.create({
                name:req.body.name,
                password:secPassword,
                email:req.body.email,
                location:req.body.location,
            });
            res.json({success:true});
        }
        catch(error){
            console.log(error);
            res.json({success:false});
        }
});

router.post('/authUser',[body('email').isEmail({min:5})],bodyParser.json(),async(req,res)=>{
    // const errors =validationResult(req);
    // if (!errors.isEmpty()){
    //     return res.status(400).json({errors:errors.array()});
    // }

    try{
        let userData = await User.findOne({"email":req.body.email})
        // console.log(userData.password,req.body.password);
        const pwdCompare= await bcrypt.compare(req.body.password,userData.password);
        if (!userData){
            return res.status(400).json({errors:"Not a valid email"});
        }
        if (!pwdCompare){
            // console.log(pwdCompare);

            return res.status(400).json({errors:"Not a valid password"});
        }
        const data={
            user:{
                id:userData.id,
            }
        }
        const authToken = jwt.sign(data,jwtSecret);
        // console.log()
        return res.json({success:true,authToken:authToken});
    }
    catch(err){
        console.log(err);
        res.json({success:false});
    }
})

module.exports = router;