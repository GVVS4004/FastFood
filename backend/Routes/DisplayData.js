const express = require("express");
const router = express.Router();
// const User = require('../models/User');
const bodyParser = require("body-parser");

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.foodItems,global.foodCategory]);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;