const mongoose = require("mongoose");
require("dotenv").config();//import dotenv to read .env file

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => {
        console.log("Error:" , err)
    })
}

module.exports = connectDB;