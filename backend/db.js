const mongoose = require("mongoose");
// import { mongoKey } from "./secret";
// const mongoKey = require('./secret.js');
require("dotenv").config({ path: "../.env" });
const url = process.env.REACT_APP_MONGO_SERVER;
const url1 = "mongodb://localhost:27017/FastFood";
const mongoDB = async () => {
  mongoose.connect(url1, { useNewUrlParser: true }, async (err, res) => {
    if (err) console.log("---", err);
    else {
      console.log("connected");
    }
  });
};

module.exports = mongoDB;
