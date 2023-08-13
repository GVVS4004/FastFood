const express = require("express");
const app=express();
const port=5000;
const mongoDB =require("./db");
require("dotenv").config({path:"../.env"})
mongoDB();

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin",process.env.REACT_APP_CROSS_ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();})
// app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OderData"));
app.use('/api',require('./Routes/UserCart'));
app.use('/api',require('./Routes/UserContact'));
app.use('/api',require("./Routes/AdminAuth"));
app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log('Example app listening on port',port);
})